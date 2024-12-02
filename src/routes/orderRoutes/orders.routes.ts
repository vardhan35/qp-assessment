import express, { Request, Response } from "express";
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getAllOrdersByUser,
} from "../../services/orders/orders.service";
const router = express.Router();

/**
 * @route POST /user
 * @desc Create account or User
 */
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

/**
 * @route GET /all
 * @desc Get all groceries
 */
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

/**
 * @route GET /all
 * @desc Get all groceries
 */
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

/**
 * @route DELETE /:id
 * @desc Delete Grocery By Id
 */
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
