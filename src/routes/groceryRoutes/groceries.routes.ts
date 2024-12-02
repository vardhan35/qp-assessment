import express, { Request, Response } from "express";
import {
  getAllgroceries,
  postGroceries,
  getGroceriesByID,
  updateGroceriesByID,
  deleteGroceriesByID,
} from "../../services/grocery/groceries.service";

const router = express.Router();

/**
 * @route GET /groceries
 * @desc Get All Groceries
 */
router.get("/groceries", async (req: Request, res: Response) => {
  try {
    const groceries = await getAllgroceries(req, res);
    res.status(200).json({ data: groceries });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route GET /groceries/:id
 * @desc Get Grocery By id
 */
router.get("/groceries/:id", async (req: Request, res: Response) => {
  try {
    const groceries = await getGroceriesByID(req, res);
    res.status(200).json({ data: groceries });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route POST /groceries/:id
 * @desc Create a grocery
 */
router.post("/groceries", async (req: Request, res: Response) => {
  try {
    const groceries = await postGroceries(req, res);
    res.status(200).json({ data: groceries });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route PUT /groceries/:id
 * @desc Update User Id
 */
router.put("/groceries/:id", async (req: Request, res: Response) => {
  try {
    const groceries = await updateGroceriesByID(req, res);
    res.status(200).json({ data: groceries });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route DELETE /groceries/:id
 * @desc Delete Grocery By Id
 */
router.delete("/groceries/:id", async (req: Request, res: Response) => {
  try {
    const groceries = await deleteGroceriesByID(req, res);
    res.status(200).json({ data: groceries });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

export default router;
