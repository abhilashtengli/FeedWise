import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Report from "@/models/Reports";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ data: { message: "Please login!" } });
    }
    const userId = session.user.id;

    const reports = await Report.findById({ user: userId });

    if (!reports) {
      return NextResponse.json({
        data: {
          message: "No reports found"
        }
      });
    }
  } catch (error) {
    return NextResponse.json({
      data: {
        message: "Could not fetch reports",
        error: error
      }
    });
  }
}
