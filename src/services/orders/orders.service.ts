import { Request, Response } from "express";
import { Orders } from "../../db/models/orders.schema";

export async function createOrders(req: Request, res: Response) {
  const order = await Orders.create(req.body);
  return order;
}

export async function getAllOrders(req: Request, res: Response) {
  const AllOrders = await Orders.find()
    .populate({
      path: "items.grocery",
      model: "Grocery",
    })
    .exec();
  return AllOrders;
}

export async function deleteOrder(req: Request, res: Response) {
  const order = await Orders.findByIdAndDelete(req.params.id);
  return order;
}

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
