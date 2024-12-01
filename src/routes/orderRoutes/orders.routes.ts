import express, { Request, Response } from "express";
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getAllOrdersByUser,
} from "../../services/orders/orders.service";
const router = express.Router();

let orders: { id: number; item: string; quantity: number; price: number }[] =
  [];

// create order
router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await createOrders(req, res);
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// Get all orders
router.get("/all", async (req: Request, res: Response) => {
  try {
    const response = await getAllOrders(req, res);
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// Get orders by userid
router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const response = await getAllOrdersByUser(req, res);
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const response = await deleteOrder(req, res);
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

export default router;
