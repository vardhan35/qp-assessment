import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * This interface should be the same as JWTPayload declared in types/global.d.ts file
 */
export interface IUser extends Document {
  role: string;
  email: string;
  password: string;
  // confirmed: boolean;
  // hashPassword: () => void;
  // checkPassword: (password: string) => boolean;
}

// User schema
const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", schema, "users");
