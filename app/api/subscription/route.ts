import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        data: {
          message: "Please login!"
        }
      });
    }

    const userId = session?.user.id;
    const response = await Subscription.findOne({ user: userId });
    if (!response) {
      return NextResponse.json({
        data: {
          message: "No subcription details found"
        }
      });
    }

    return NextResponse.json({
      data: {
        subscription: response,
        message: "successfull"
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: "Could not fetch subcription details",
      error: error
    });
  }
}
