import Razorpay from "razorpay";

const razorPay = new Razorpay({
  key_id: process.env.RazorPay_Key_ID!,
  key_secret: process.env.RazorPay_Secret_Key!
});

export default razorPay;
