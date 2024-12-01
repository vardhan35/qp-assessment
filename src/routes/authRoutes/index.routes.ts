import express, { Request, Response } from "express";
import { User } from "../../db/models/user.schema";
import bcrypt from "bcryptjs";

const router = express.Router();

// Create User or SignUp
router.post("/users", async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const useerResponse = await User.create({
      username: username,
      password: hash,
      role: role,
    });
    res.status(201).json({ data: useerResponse });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// User Login
router.post("/users/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({
      username: username,
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (isMatch) {
        res.status(201).json({ username: user[0], login: true });
      } else {
        res
          .status(401)
          .json({ data: {}, login: false, message: "Password is Wrong!!" });
      }
    } else {
      res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// to get all users with role of user
router.get("/users/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ username: users });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

// delete user
router.delete("/users/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const resb = await User.deleteOne({ username: username });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
  res.json({ message: `User with username ${username} deleted successfully` });
});

export default router;
