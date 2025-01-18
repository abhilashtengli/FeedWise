
How to Automatically Deactivate Subscriptions After Expiry in Next.js 🚀
Once a subscription is marked "active" after payment, it should automatically become "inactive" when it expires. To achieve this, we need a mechanism to periodically check and update expired subscriptions.

✅ Step 1: Implement a Background Job (Cron Job)
Since we cannot rely on users always visiting our site to trigger updates, we need a server-side background job that periodically checks subscriptions and updates their status.

Option 1: Use a Cron Job with a Serverless Scheduler (Best for Vercel, Railway, etc.)
We can set up an API route /api/check-subscriptions that checks for expired subscriptions and updates them.

📂 Create a Cron Job API Route
📌 app/api/check-subscriptions/route.ts

ts
Copy
Edit
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Subscription from "@/models/Subscription";
import { subDays } from "date-fns";

export async function GET() {
  try {
    await connectDB();

    const today = new Date();

    // Find subscriptions that have expired
    const expiredSubscriptions = await Subscription.find({
      status: "active",
      renewalDate: { $lt: today } // renewalDate is in the past
    });

    if (expiredSubscriptions.length === 0) {
      return NextResponse.json({ message: "No expired subscriptions" });
    }

    // Update expired subscriptions
    await Subscription.updateMany(
      { _id: { $in: expiredSubscriptions.map(sub => sub._id) } },
      { $set: { status: "inactive" } }
    );

    return NextResponse.json({
      message: "Updated expired subscriptions",
      count: expiredSubscriptions.length
    });

  } catch (error) {
    console.error("Error checking subscriptions:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
✅ Step 2: Schedule the API Route to Run Periodically
Since Next.js does not have built-in cron jobs, we need a scheduler to call this API automatically.

A) Use GitHub Actions (For Production)
Go to your GitHub Repo → Click "Actions" → "New Workflow"
Add a cron job to call your API every 24 hours
📌 .github/workflows/subscription-check.yml

yaml
Copy
Edit
name: Check Expired Subscriptions

on:
  schedule:
    - cron: "0 0 * * *" # Runs every day at midnight UTC

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - name: Call Subscription Check API
        run: curl -X GET "https://yourdomain.com/api/check-subscriptions"