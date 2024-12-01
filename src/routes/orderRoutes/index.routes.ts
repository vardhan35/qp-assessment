import express, { Request, Response } from "express";
import { getAllOrders } from "../../services/orders/orders.service";
const router = express.Router();

let orders: { id: number; item: string; quantity: number; price: number }[] =
  [];

router.get("/orders", (req: Request, res: Response) => {
  res.json({ orders });
});

router.get("/orders/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const order = orders.find((order) => order.id === parseInt(id));
  if (order) {
    res.json({ order });
  } else {
    res.status(404).json({ message: `Order with ID ${id} not found` });
  }
});

router.post("/orders", (req: Request, res: Response) => {
  const { item, quantity, price } = req.body;

  res.status(201).json({ message: "Order created successfully" });
});

router.put("/orders/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { item, quantity, price } = req.body;

  res.json({ message: `Order with ID ${id} updated successfully` });
});

router.delete("/orders/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ message: `Order with ID ${id} deleted successfully` });
});

export default router;
