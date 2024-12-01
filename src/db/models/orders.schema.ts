import mongoose, { Schema, Document, Model } from "mongoose";
import { IGrocery } from "./grocery.schema";

export interface IOrderItem {
  grocery: IGrocery["_id"];
  quantity: number;
}

export interface IOrder extends Document {
  user: string;
  items: IOrderItem[];
  total: number;
}

const OrderItemSchema: Schema = new Schema({
  grocery: { type: Schema.Types.ObjectId, ref: "Grocery", required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Orders: Model<IOrder> = mongoose.model<IOrder>(
  "Order",
  OrderSchema
);
