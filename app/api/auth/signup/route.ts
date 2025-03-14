import Subscription from "@/models/Subscription";
import User from "@/models/User";
import connectDB from "@lib/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

const userSafeDataToSend = ["_id", "name", "email"];
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exists with email: " + body.email
        },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    const subscription = new Subscription({
      user: newUser._id,
      plan: "free",
      tokensUsed: 0,
      tokenLimit: 15000
    });
    await subscription.save();

    const dataToSend = userSafeDataToSend.reduce(
      (obj: { [key: string]: string }, key: string) => {
        if (savedUser[key] !== undefined) {
          obj[key] = savedUser[key];
        }
        return obj;
      },
      {}
    );
    return NextResponse.json(
      { data: dataToSend, message: "User saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({
      message: "Error saving user the user : " + e.message,
      error: e
    });
  }
}
