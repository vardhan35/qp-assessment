import { User } from "../../db/models/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt/generateToken";

/**
 * Creates a new user in the database.
 * @param {Request} req - Express request object containing `username`, `password`, and `role` in the body.
 * @param {Response} res - Express response object (not used for returning in this function but typically for API responses).
 * @returns {Promise<Object>} The newly created user object.
 */
export async function createUser(req: Request, res: Response) {
  const { username, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const useerResponse = await User.create({
    username: username,
    password: hash,
    role: role,
  });
  return useerResponse;
}

/**
 * Authenticates a user and generates a JWT token upon successful login.
 * @param {Request} req - Express request object containing `username` and `password` in the body.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<{login: boolean, token: string}>} An object containing the login status and JWT token if successful.
 *
 * @throws {Error} If the username is not found or the password does not match.
 *
 * @example
 * // Request body:
 * // {
 * //   "username": "john_doe",
 * //   "password": "securePassword123"
 * // }
 */
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
  });
  if (user.length) {
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (isMatch) {
      const token = generateToken({
        id: user[0]._id,
        username: username,
      });
      return { login: true, token };
    } else {
      throw new Error("Password Does Not Match");
    }
  } else {
    throw new Error("User name Not Found");
  }
}

/**
 * Retrieves users filtered by their role.
 * @param {Request} req - Express request object containing the role parameter in the route.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Array<Object>>} An array of user objects with the specified role.
 */

export async function getUsersByRole(req: Request, res: Response) {
  const users = await User.find({ role: req.params.role });
  return users;
}

/**
 * Deletes a user from the database by their username.
 * @param {Request} req - Express request object containing the username parameter in the route.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object>} The result of the deletion operation, including the number of documents deleted.

 */
export async function deleteUserByUserId(req: Request, res: Response) {
  const { username } = req.params;
  const resb = await User.deleteOne({ username: username });
  return resb;
}

/**
 * Retrieves all users from the database.
 * @param {Request} req - Express request object (not used in this function).
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Array<Object>>} An array of user objects.
 */
export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find();
  return users;
}
