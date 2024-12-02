import express, { Request, Response } from "express";
import { createUser, login } from "../../services/users/users.service";

const router = express.Router();

/**
 * @route POST /user
 * @desc Create account or User
 */
router.post("/users", async (req: Request, res: Response) => {
  try {
    const response = await createUser(req, res);
    res.status(201).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route POST /user/login
 * @desc User Login
 */
router.post("/users/login", async (req: Request, res: Response) => {
  try {
    const response = await login(req, res);
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

export default router;
