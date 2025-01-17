import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/database";
import Payment from "@/models/Payment";
import { addMonths } from "date-fns";
import Subscription from "@/models/Subscription";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedsignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");
    if (signature !== expectedsignature) {
      return NextResponse.json(
        {
          message: "Invalid signature"
        },
        { status: 400 }
      );
    }
    const event = JSON.parse(body);
    if (event.event == "payment_captured") {
      const payment = event.payload.payment.entity;
      const paymentRecord = await Payment.findOne({ orderId: payment.orderId });

      if (!paymentRecord) {
        return NextResponse.json(
          { message: "Payment not found" },
          { status: 404 }
        );
      }
      const { billingCycle } = paymentRecord;

      // Get the current payment date
      const paymentDate = new Date();
      let nextPaymentDate;
      let subscriptionExpiry;
      let setTokenUsed;
      let setTokenLimit;

      if (billingCycle === "monthly") {
        nextPaymentDate = addMonths(paymentDate, 1);
        subscriptionExpiry = addMonths(paymentDate, 1);
        setTokenUsed = 0;
        setTokenLimit = 100000;
      } else if (billingCycle === "3 months") {
        nextPaymentDate = addMonths(paymentDate, 3);
        subscriptionExpiry = addMonths(paymentDate, 3);
        setTokenUsed = 0;
        setTokenLimit = 300000;
      }

      const paymentOrderUpdate = await Payment.findOneAndUpdate(
        { orderId: payment.orderId },
        {
          $set: {
            paymentStatus: "completed",
            transactionId: payment.id,
            nextPaymentDate,
            subscriptionExpiry
          },
          $push: {
            paymentHistory: {
              // Push new entry to paymentHistory array
              amount: payment.amount / 100,
              paymentDate: new Date(),
              status: "successful"
            }
          }
        },
        { new: true }
      ).populate([{ path: "user", select: "name email" }]);

      const subId = paymentRecord.subscription;

      await Subscription.findOneAndUpdate(subId, {
        $set: {
          tokenUsed: setTokenUsed,
          tokenLimit: setTokenLimit,
          renewalDate: nextPaymentDate,
          status: "active"
        }
      });

      if (!paymentOrderUpdate) {
        console.error("Failed to update payment order");
      } else {
        console.log("Payment order updated successfully");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
