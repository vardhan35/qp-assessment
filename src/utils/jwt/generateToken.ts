import jwt from "jsonwebtoken";

const SECRET_KEY = "DON_KEY_HOTE_DOFLAMINGO";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};
