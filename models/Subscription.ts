import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  plan: {
    type: String,
    enum: ["free", "paid", "premium"],
    default: "free",
    required: true
  },
  tokenUsed: {
    type: Number,
    default: 0
  },
  tokenLimit: {
    type: Number,
    default: 15000
  },
  renewalDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["active", "expired", "canceled", "pending", "not_subscribed"],
    default: "not_subscribed"
  }
});

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
