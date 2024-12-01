import { User } from "../../db/models/user.schema";
import { Request,Response } from "express";

export async function createUser(req : Request, res : Response) {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Failed to Create a New User", error });
    }
}