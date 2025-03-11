import connectDB from "@/lib/database";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const today = new Date();

    const expiredSubscriptions = await Subscription.find({
      status: "active",
      renewalDate: { $lt: today }
    });

    if (expiredSubscriptions.length === 0) {
      return NextResponse.json({ message: "No subscription expired" });
    }

    await Subscription.updateMany(
      {
        _id: { $in: expiredSubscriptions.map((sub) => sub._id) }
      },
      { $set: { status: "expired" } }
    );
    return NextResponse.json({
      message: "Updated expired subscriptions",
      count: expiredSubscriptions.length
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
