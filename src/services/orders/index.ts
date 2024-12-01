import express, { Request, Response } from "express";
import { Orders } from "../../db/models/orders.schema";

export async function getAllOrders(req: Request, res: Response) {
  try {
    const response = await Orders.find();
    return response;
  } catch (error) {
    console.error("Error fetching groceries:", error);
    res.status(500).json({ message: "Failed to fetch groceries", error });
  }
}
