import { Grocery } from "../../db/models/grocery.schema";
import { Request, Response } from "express";

/**
 * Retrieves all groceries from the database.
 * @param {Request} req - Express request object (not used in this function).
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<any>} A promise that resolves to an array of grocery objects, or an error if the query fails.
 */
export async function getAllgroceries(
  req: Request,
  res: Response
): Promise<any> {
  const response = await Grocery.find();
  return response;
}

/**
 * Creates a new grocery item in the database.
 * @param {Request} req - Express request object containing `name`, `price`, and `stock` in the body.
 * @param {Response} res - Express response object used to return a validation error if any field is missing.
 * @returns {Promise<Object>} The newly created grocery object if successful.
 */
export async function postGroceries(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res
        .status(400)
        .json({ message: "All fields are required: name, price, stock" });
    }
    const newGrocery = new Grocery({ name, price, stock });
    const savedGrocery = await newGrocery.save();
    return savedGrocery;
  } catch (error) {
    return error;
  }
}

/**
 * Retrieves a grocery item from the database by its ID.
 * @param {Request} req - Express request object containing the `id` parameter in the route.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object|null>} The grocery item object if found, or `null` if no item matches the ID.
 */
export async function getGroceriesByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const grocery = await Grocery.findById(id);
    return grocery;
  } catch (error) {
    return error;
  }
}

/**
 * Updates a grocery item in the database by its ID.
 * @param {Request} req - Express request object containing the `id` parameter in the route and updated `name`, `price`, and `stock` in the body.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object|null>} The updated grocery item object, or `null` if no item was found with the provided ID.
 */
export async function updateGroceriesByID(req: Request, res: Response) {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const updatedGrocery = await Grocery.findByIdAndUpdate(
    id,
    { $set: { name, price, stock } },
    { new: true, runValidators: true }
  );
  return updatedGrocery;
}

/**
 * Deletes a grocery item from the database by its ID.
 * @param {Request} req - Express request object containing the `id` parameter in the route.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object|null>} The deleted grocery item object, or `null` if no item was found with the provided ID.
 */
export async function deleteGroceriesByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedGrocery = await Grocery.findByIdAndDelete(id);
    return deletedGrocery;
  } catch (error) {
    return error;
  }
}
