import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderId: { type: String, required: true, unique: true },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true
    },
    paymentStatus: {
      type: String,
      enum: [
        "created",
        "captured",
        "failed",
        "refunded",
        "pending",
        "cancelled",
        "not_purchased"
      ],
      default: "not_purchased"
    },
    amount: { type: Number, required: true },
    paymentDate: { type: Date },
    nextPaymentDate: { type: Date },
    paymentId: { type: String, unique: true, default: null, sparse: true },
    billingCycle: {
      type: String,
      enum: ["monthly", "annually", "3 months"],
      default: "monthly"
    },
    currency: {
      type: String,
      default: "INR",
      required: true
    },
    receipt: {
      type: String,
      required: true
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
    subscriptionExpiry: { type: Date },
    cancellationDate: { type: Date },
    upgradeDate: { type: Date },
    notes: {
      userId: {
        type: String
      },
      name: {
        type: String
      },
      planType: {
        type: String
      }
    }
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
