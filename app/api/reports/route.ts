import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Report from "@/models/Reports";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ data: { message: "Please login!" } });
    }
    const userId = session.user.id;
    const objectId = new mongoose.Types.ObjectId(userId);

    const reports = await Report.find({ user: objectId });

    if (!reports) {
      return NextResponse.json({
        data: {
          message: "No reports found"
        }
      });
    }

    return NextResponse.json({
      data: {
        reports: reports,
        message: "successfull"
      }
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        message: "Could not fetch reports",
        error: error
      }
    });
  }
}
