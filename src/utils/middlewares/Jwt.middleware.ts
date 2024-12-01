import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const SECRET_KEY = "DON_KEY_HOTE_DOFLAMINGO";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });
      }
      req.body.user = decoded; // Attach decoded token payload to the request
      next();
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
