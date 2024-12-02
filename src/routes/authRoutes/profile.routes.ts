import express, { Request, Response } from "express";
import {
  deleteUserByUserId,
  getAllUsers,
  getUsersByRole,
} from "../../services/users/users.service";
const router = express.Router();

/**
 * @route GET /users/get-by-role/:role
 * @desc Get all the users according to a specific role
 */
router.get("/users/get-by-role/:role", async (req: Request, res: Response) => {
  try {
    const users = await getUsersByRole(req, res);
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route GET /users/get-all
 * @desc Get all users
 */
router.get("/users/get-all", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers(req, res);
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/**
 * @route DELETE /users/:username
 * @desc Delete a users by username
 */
router.delete("/users/:username", async (req: Request, res: Response) => {
  try {
    const resb = await deleteUserByUserId(req, res);
    res.status(200).json({ message: resb });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});
export default router;
