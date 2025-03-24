import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Report from "@/models/Reports";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        data: {
          message: "Please login!"
        }
      });
    }
    const { id } = await params;
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: "Report ID is required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Report ID" },
        { status: 400 }
      );
    }
    // const userId = session.user.id;
    const objectId = new mongoose.Types.ObjectId(id);

    const report = await Report.findOne({
      _id: objectId
    });

    if (!report) {
      return NextResponse.json({
        data: {
          message: "No reports found with this Id"
        }
      });
    }

    return NextResponse.json({
      data: {
        report: report,
        message: "successfull"
      }
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        message: "Could not fetch the Report",
        error: error
      }
    });
  }
}
