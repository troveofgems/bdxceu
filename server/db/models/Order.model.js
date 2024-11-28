import mongoose from "mongoose";
const timestamps = {
  timestamps: true,
};

const OrderModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      payerId: { type: String },
      orderId: { type: String },
      status: { type: String, default: "pending" },
      updateTime: { type: String },
      emailAddress: { type: String },
    },
    orderItem: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
    productName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  timestamps,
);

export default mongoose.model("Order", OrderModel);
