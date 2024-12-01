import { Grocery } from "../../db/models/grocery.schema";
import express, { Request, Response } from "express";

export async function getAllgroceries(req: Request, res: Response): Promise<any> {
  try {
    const response = await Grocery.find();
    return response;
  } catch (error) {
    return error
  }
}

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
    return savedGrocery
  } catch (error) {
    return error
  }
}

export async function getGroceriesByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const grocery = await Grocery.findById(id);
    return grocery
  } catch (error) {
    return error
  }
}

export async function updateGroceriesByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    // if (!id) {
    //   return res.status(400).json({ message: "Grocery ID is required" });
    // }
    // if (!name && !price && !stock) {
    //   return res.status(400).json({
    //     message: "At least one field (name, price, stock) must be updated",
    //   });
    // }
    const updatedGrocery = await Grocery.findByIdAndUpdate(
      id,
      { $set: { name, price, stock } },
      { new: true, runValidators: true }
    );
    return updatedGrocery
  } catch (error) {
    return error
  }
}

export async function deleteGroceriesByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // if (!id) {
    //   return res.status(400).json({ message: "Grocery ID is required" });
    // }
    const deletedGrocery = await Grocery.findByIdAndDelete(id);

    // if (!deletedGrocery) {
    //   return res.status(404).json({ message: "Grocery item not found" });
    // }
    return deletedGrocery
  } catch (error) {
    return error
  }
}
