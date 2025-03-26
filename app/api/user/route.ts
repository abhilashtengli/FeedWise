import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ data: { message: "Please login" } });
    }

    const userId = session.user.id;

    const response = await User.findById(userId).select("name email");
    if (!response) {
      return NextResponse.json({ data: { message: "User not found" } });
    }

    return NextResponse.json({
      data: {
        user: response,
        message: "successfull"
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: "Could Not fetch User",
      error: error
    });
  }
}
