import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Payment from "@/models/Payment";
import { addMonths } from "date-fns";
import Subscription from "@/models/Subscription";

import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") as string;

    // const expectedsignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    //   .update(body)
    //   .digest("hex");
    // if (signature !== expectedsignature) {
    //   return NextResponse.json(
    //     {
    //       message: "Invalid signature"
    //     },
    //     { status: 400 }
    //   );
    // }
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET as string
    );
    if (!isWebhookValid) {
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 400 }
      );
    }
    const event = JSON.parse(body);
    if (event.event == "payment_captured") {
      const payment = event.payload.payment.entity;
      const paymentRecord = await Payment.findOne({
        orderId: payment.order_id
      });

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
        { orderId: payment.order_id },
        {
          $set: {
            paymentStatus: payment.status,
            paymentId: payment.id,
            nextPaymentDate,
            subscriptionExpiry,
            paymentDate
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

      const subId = paymentRecord.subscription; //Look into it in the future

      await Subscription.findOneAndUpdate(
        { _id: subId },
        {
          $set: {
            tokenUsed: setTokenUsed,
            tokenLimit: setTokenLimit,
            renewalDate: nextPaymentDate,
            status: "active"
          }
        }
      );

      if (!paymentOrderUpdate) {
        console.error("Failed to update payment order");
      } else {
        console.log("Payment order updated successfully");
      }
    }
    return NextResponse.json({
      message: "Success"
    });
  } catch (error) {
    console.log(error);
  }
}
