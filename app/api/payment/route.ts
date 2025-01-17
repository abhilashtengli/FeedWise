import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Payment from "@/models/Payment";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import z from "zod";

const requestBodySchema = z.object({
  planType: z.enum(["paid", "premium"]) // Restrict planType to "paid" or "premium"
});

const razorPay = new Razorpay({
  key_id: process.env.RazorPay_Key_ID!,
  key_secret: process.env.RazorPay_Secret_Key!
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const result = requestBodySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        message: "Invalid Type",
        error: result.error.errors
      });
    }
    const { planType } = result.data;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const plans: Record<
      "paid" | "premium",
      { amount: number; tokens: number; billingCycle: string }
    > = {
      paid: { amount: 799, tokens: 100000, billingCycle: "monthly" },
      premium: { amount: 2499, tokens: 300000, billingCycle: "3 months" }
    };
    if (!plans[planType]) {
      return NextResponse.json({ message: "Invalid plan" });
    }
    const order = await razorPay.orders.create({
      amount: plans[planType].amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        // user_id : session.id
        plan_Type: planType,
        info: "Subcription for FeedWise"
      }
    });
    const sub = await Subscription.create({
      user: "userId", //session.id
      plan: planType,
      status: "pending"
    });
    const newOrder = await Payment.create({
      user: "userId", //session.id
      subsciption: sub._id,
      orderId: order.id,
      paymentStatus: "pending",
      amount: plans[planType].amount * 100,
      billingCycle: plans[planType].billingCycle
    });
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: newOrder._id
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
