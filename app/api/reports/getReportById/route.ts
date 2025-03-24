import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import Report from "@/models/Reports";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  reportId: z.string().min(1, "Report Id is required")
});

export async function GET(req: NextRequest) {
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
    const body = await req.json();
    const reportId = body.reportId;

    const result = validateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Inavalid Report Id",
        error: result.error.errors
      });
    }

    const report = await Report.findById({ _id: reportId });

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
