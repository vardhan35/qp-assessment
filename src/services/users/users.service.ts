import { User } from "../../db/models/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

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

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
  });
  if (user.length) {
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (isMatch) {
      return user[0];
    } else {
      throw new Error("Password Does Not Match");
    }
  } else {
    throw new Error("User name Not Found");
  }
}

export async function getUsersByRole(req: Request, res: Response) {
  const users = await User.find({ role: req.params.role });
  return users;
}

export async function deleteUserByUserId(req: Request, res: Response) {
  const { username } = req.params;
  const resb = await User.deleteOne({ username: username });
  return resb;
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await User.find();
  return users;
}
