import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  subsciption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["debit_card", "paypal", "phonePay", "other"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["active", "failed", "pending", "cancelled", "not_purchased"],
    default: "not_purchased"
  },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  nextPaymentDate: { type: Date, required: true },
  transactionId: { type: String, required: true, unique: true },
  billingCycle: {
    type: String,
    enum: ["monthly", "annually"],
    default: "monthly"
  },
  invoiceNumber: { type: String, unique: true },
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
