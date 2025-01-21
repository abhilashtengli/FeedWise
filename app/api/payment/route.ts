// import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Payment from "@/models/Payment";
import Subscription from "@/models/Subscription";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import plans from "@/utils/constants";
import razorPay from "@/utils/razorpay";
import mongoose from "mongoose";

const requestBodySchema = z.object({
  planType: z.enum(["paid", "premium"]) // Restrict planType to "paid" or "premium"
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const result = requestBodySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        message: "Invalid Type",
        error: result.error.errors
      });
    }
    const { planType } = result.data;

    if (!plans[planType]) {
      return NextResponse.json({ message: "Invalid plan" });
    }
    const order = await razorPay.orders.create({
      amount: plans[planType].amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        // userId: "session.id",
        // name: "session.name",
        planType: planType
      }
    });
    const userId = new mongoose.Types.ObjectId(); // for testing purposes ponly remove after that
    const subData = {
      user: userId /*change in production*/,
      plan: planType,
      status: "pending"
    }; //session.id
    const subscription = await new Subscription(subData).save();

    const payment = {
      user: userId,
      subscription: subscription._id,
      orderId: order.id,
      paymentStatus: "pending",
      amount: order.amount,
      billingCycle: plans[planType].billingCycle,
      receipt: order.receipt,
      notes: order.notes
    }; // change in production //session.id
    const savedPayment = await new Payment(payment).save();

    console.log("SavedPayment : " + savedPayment);
    console.log("SubData : " + subscription);

    return NextResponse.json({
      data: {
        paymentData: savedPayment,
        subData: subscription,
        key_id: process.env.RazorPay_Key_ID
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
