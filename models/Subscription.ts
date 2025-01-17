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
    type: Date,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    required: function(this: any) {
      return this.plan !== "free"; // Only required for paid/premium plans
    }
  },
  status: {
    type: String,
    enum: ["active", "expired", "canceled", "pending"],
    default: "active"
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
