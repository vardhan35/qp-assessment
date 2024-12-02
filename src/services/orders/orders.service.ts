import { Request, Response } from "express";
import { Orders } from "../../db/models/orders.schema";

/**
 * Creates a new order in the database.
 * @param {Request} req - Express request object containing the order details in the body.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object>} The newly created order object.
 */
export async function createOrders(req: Request, res: Response) {
  const order = await Orders.create(req.body);
  return order;
}

/**
 * Retrieves all orders from the database with populated grocery item details.
 * @param {Request} req - Express request object (not used in this function).
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Array<Object>>} An array of order objects with populated grocery details.
 */
export async function getAllOrders(req: Request, res: Response) {
  const AllOrders = await Orders.find()
    .populate({
      path: "items.grocery",
      model: "Grocery",
    })
    .exec();
  return AllOrders;
}

/**
 * Deletes an order from the database by its ID.
 * @param {Request} req - Express request object containing the `id` parameter in the route.
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Object|null>} The deleted order object, or `null` if no order was found.
 */
export async function deleteOrder(req: Request, res: Response) {
  const order = await Orders.findByIdAndDelete(req.params.id);
  return order;
}

/**
 * Retrieves all orders for a specific user from the database, with populated grocery item details.
 * @param {Request} req - Express request object containing the `id` parameter in the route (user ID).
 * @param {Response} res - Express response object (not used for returning but typically for API responses).
 * @returns {Promise<Array<Object>>} An array of order objects for the specified user, with populated grocery details.
 */
export async function getAllOrdersByUser(req: Request, res: Response) {
  const AllOrders = await Orders.find({
    user: req.params.id,
  })
    .populate({
      path: "items.grocery",
      model: "Grocery",
    })
    .exec();
  return AllOrders;
}
