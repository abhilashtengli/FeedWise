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
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
