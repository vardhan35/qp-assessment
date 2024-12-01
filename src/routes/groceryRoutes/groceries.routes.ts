import express, { Request, Response } from "express";
import {
  getAllgroceries,
  postGroceries,
  getGroceriesByID,
  updateGroceriesByID,
  deleteGroceriesByID,
} from "../../services/grocery/groceries.service";

const router = express.Router();

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

// Update API Not working
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
