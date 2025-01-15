import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      email: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false
    },
    userType: {
      type: String,
      enum: ["free", "paid", "premium"],
      default: "free",
      required: true
    },
    tokensUsed: {
      type: Number,
      default: 0
    },
    tokenLimit: {
      type: Number,
      default: 15000
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
