import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true
  },
  orderId: { type: String, required: true, unique: true }, // Razorpay Order ID
  paymentMethod: {
    type: String,
    default: "Razorpay",
    required: true
  },
  paymentStatus: {
    type: String,
    enum: [
      "created",
      "completed",
      "failed",
      "refunded",
      "pending",
      "cancelled",
      "not_purchased"
    ],
    default: "not_purchased"
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  nextPaymentDate: { type: Date, required: true },
  transactionId: { type: String, required: true, unique: true },
  billingCycle: {
    type: String,
    enum: ["monthly", "annually", "3 months"],
    default: "monthly"
  },
  paymentHistory: [
    {
      amount: { type: Number },
      paymentDate: { type: Date },
      status: {
        type: String,
        enum: ["successful", "failed", "pending"],
        default: "successful"
      }
    }
  ],
  subscriptionExpiry: { type: Date, required: true },
  cancellationDate: { type: Date },
  upgradeDate: { type: Date }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
