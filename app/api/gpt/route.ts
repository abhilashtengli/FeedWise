import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { countTokens } from "@/utils/tokenizer";
import { isValidText } from "@utils/isValidText";
import { isCleanText, removeEmojis } from "@/utils/isCleanText";
import Subscription from "@/models/Subscription";
import connectDB from "@/lib/database";
// import { customerFeedbackPrompt } from "@/lib/constants.ts/prompt";
import {
  promptBatch01,
  promptBatch02,
  promptBatch03
} from "@/lib/constants/prompt";
import { z } from "zod";
import { analyseFeedback } from "@/lib/analyseFeedback";
import { AnalysisResponse } from "@/types/AnalysisReport";
import Report from "@/models/Reports";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
// import { Types } from "mongoose";
// import { normalizeAIResponse } from "@/lib/constants.ts/normalizeAIResponse";

//Pending tasks : rate limiting, allow only 15000 tokens per user in free tier
interface ReportType {
  positive?: string;
  neutral?: string;
  negative?: string;
  mostMentionedTopics?: { topic: string; percentage: string }[];
  suggestions?: string[];
  satisfactionScore?: string;
  confidenceLevel?: string;
  trendingPositive?: { trend: string; mentions: string }[];
  trendingNegative?: { trend: string; mentions: string }[];
  recommendedActions?: {
    negative?: string[];
    neutral?: string[];
    positive?: string[];
  };
  customerComplaints?: string[];
  featureRequests?: { feature: string; percentage: string }[];
  emotionalTone?: { tone: string; percentage: string }[];
}

interface ReportData {
  user: string;
  productName: string;
  productCategory: string;
  countryOfSale: string;
  reportStatus: "success" | "error";
  reportMessage: string;
  report: ReportType;
}
const validInput = z.object({
  productName: z.string(),
  productCategory: z.string(),
  countryOfSale: z.string(),
  message: z.string().min(1, "Reviews must be a non-empty string")
});
let newReportId: string;

const batchConfigurations = [
  { promptFunction: promptBatch01, jsonSchema: "jsonSchemaB1" },
  { promptFunction: promptBatch02, jsonSchema: "jsonSchemaB2" },
  { promptFunction: promptBatch03, jsonSchema: "jsonSchemaB3" }
];

async function updateTokenUsage(userId: string, tokensUsed: number) {
  await Subscription.updateOne(
    { user: userId },
    { $inc: { tokenUsed: tokensUsed, tokenLimit: -tokensUsed } }
  );
}

async function saveReport(
  userId: string,
  response: AnalysisResponse,
  productName: string,
  productCategory: string,
  countryOfSale: string
) {
  if (response?.reportStatus === "success" && !newReportId) {
    // Initialize reportData with required structure
    const reportData: ReportData = {
      user: userId,
      productName,
      productCategory,
      countryOfSale,
      reportStatus: response.reportStatus,
      reportMessage: response.reportMessage,
      report: {
        positive: "",
        neutral: "",
        negative: "",
        mostMentionedTopics: [],
        suggestions: [],
        satisfactionScore: "",
        confidenceLevel: "",
        trendingPositive: [],
        trendingNegative: [],
        recommendedActions: { negative: [], neutral: [], positive: [] },
        customerComplaints: [],
        featureRequests: [],
        emotionalTone: []
      }
    };

    // Merge reports data
    if (response.reports?.length) {
      response.reports.forEach((report) => {
        if (report.report === "R1") {
          reportData.report.positive = report.positive || "";
          reportData.report.neutral = report.neutral || "";
          reportData.report.negative = report.negative || "";
        }
        if (report.report === "R2") {
          reportData.report.mostMentionedTopics =
            report.mostMentionedTopics || [];
        }
        if (report.report === "R3") {
          reportData.report.suggestions = report.suggestions || [];
        }
      });
    }

    // Save new report
    const newReport = await new Report(reportData).save();
    newReportId = newReport._id.toString();
    // console.log("New Report Id is here : " + newReportId); // Store the report ID for further updates
    // console.log("✅ Batch 1 Report saved successfully:", newReport);
    return newReport;
  }

  if (!newReportId) {
    return NextResponse.json({ message: "Invalid report ID" });
  }
  if (newReportId) {
    // console.log("Here is the new Id for BATCH 2 and 3 : " + newReportId);
    const existingReport = await Report.findById(newReportId);

    // console.log("Existing Report : " + existingReport);
    if (!existingReport) {
      return NextResponse.json({
        message: "The Schema for the report is not generated"
      });
    }
    // if (existingReport && response.reports?.length) {
    // Ensure `existingReport.report` is properly initialized
    response.reports.forEach((report) => {
      if (report.report === "R4") {
        existingReport.report.satisfactionScore =
          report.satisfactionScore || "";
        existingReport.report.confidenceLevel = report.confidenceLevel || "";
      }
      if (report.report === "R5") {
        existingReport.report.trendingPositive = report.trendingPositive || "";
        existingReport.report.trendingNegative = report.trendingNegative || "";
      }
      if (report.report === "R6") {
        existingReport.report.recommendedActions.negative =
          report.recommendedActions?.negative || "";
        existingReport.report.recommendedActions.neutral =
          report.recommendedActions?.neutral || "";
        existingReport.report.recommendedActions.positive =
          report.recommendedActions?.positive || "";
      }
      if (report.report === "R7") {
        existingReport.report.customerComplaints =
          report.customerComplaints || "";
      }
      if (report.report === "R8") {
        existingReport.report.featureRequests = report.featureRequests || "";
      }
      if (report.report === "R9") {
        existingReport.report.emotionalTone = report.emotionalTone || "";
      }
    });
    existingReport.markModified("report"); // ✅ Tell Mongoose that "report" has changed
    const finalSaved = await existingReport.save();
    // console.log("✅ Batch 2 and 3 Report updated successfully:", finalSaved);
    return finalSaved;
  }

  // Save the updated report

  return null;
}

async function processBatch(
  batchIndex: number,
  productName: string,
  productCategory: string,
  countryOfSale: string,
  cleanedReviews: string,
  userId: string,
  count: number
) {
  const { promptFunction, jsonSchema } = batchConfigurations[batchIndex];
  const prompt = promptFunction(productName, productCategory, countryOfSale);
  // console.log(`Batch ${batchIndex + 1} - Generated Prompt:`, prompt);

  const response = (await analyseFeedback(
    prompt,
    cleanedReviews,
    jsonSchema
  )) as AnalysisResponse;
  // console.log(`Batch ${batchIndex + 1} - Response:`, response);

  if (response?.reportStatus === "success") {
    const tokensUsed = countTokens(response.toString()) + count;
    await updateTokenUsage(userId, tokensUsed);
    const savedReport = await saveReport(
      userId,
      response,
      productName,
      productCategory,
      countryOfSale
    );
    return savedReport;
  }

  return null; // ✅ Explicitly return null if no report was saved
}
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session : " + session);
    if (!session) {
      return NextResponse.json({data :{ message: "Please login!" }});
    }

    const userId = session.user.id;
    console.log("UserId : " + userId, session.user.email);
    await connectDB();
    const text = await req.text();
    const sanitizedText = text.replace(/[\u0000-\u001F]+/g, " ");
    const body = JSON.parse(sanitizedText);

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Invalid request: 'reviews' must be a non-empty string" },
        { status: 400 }
      );
    }
    const result = validInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Please provide valid Input",
        error: result.error.errors
      });
    }
    const productName = body.productName as string;
    const productCategory = body.productCategory as string;
    const countryOfSale = body.countryOfSale as string;

    const cleanedReviews = body.message.replace(/\s+/g, " ").trim();
    if (cleanedReviews.length === 0) {
      return NextResponse.json({
        data: {
          reportStatus: "error",
          reportMessage:
            "Invalid input. Please provide actual customer reviews for analysis.",
          reports: null
        }
      });
    }

    if (!isValidText(cleanedReviews) || !isCleanText(cleanedReviews)) {
      return NextResponse.json({
        data: {
          reportStatus: "error",
          reportMessage:
            "Invalid input. Please provide actual customer reviews for analysis.",
          reports: null
        }
      });
    }

    const cleanedReviewsWithoutEmoji = removeEmojis(cleanedReviews);
    const count = countTokens(cleanedReviewsWithoutEmoji);

    if (count > 2500) {
      return NextResponse.json({
        data: {
          message:
            "Your request exceeds the token limit (2500). Please reduce the input size and try again."
        }
      });
    }

    const subDetails = await Subscription.findOne({
      user: userId //Replace with Id
    }).select("tokenUsed tokenLimit");

    // console.log(
    //   "Used : " +
    //     subDetails.tokenUsed +
    //     " " +
    //     "Limit : " +
    //     subDetails.tokenLimit
    // );

    if (!subDetails) {
      return NextResponse.json({
        data: {
          message:
            "Subscription details not found. Please ensure the user has a valid subscription."
        }
      });
    }

    if (count > subDetails.tokenLimit) {
      return NextResponse.json({
        data: {
          message:
            "Your request exceeds the token limit . Please Upgrade your free tier plan."
        }
      });
    }

    let finalReport = null;
    for (let i = 0; i < batchConfigurations.length; i++) {
      finalReport = await processBatch(
        i,
        productName,
        productCategory,
        countryOfSale,
        cleanedReviews,
        userId,
        count
      );
    }

    console.log("Final Report : " + finalReport);

    return NextResponse.json({
      // While efforts are made to handle sarcasm, accuracy may vary depending on context. ( add in  Sentiment Analysis  )
      data: {
        report: finalReport,
        message: "successfull",
        TokenCount: count
      }
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message
        },
        { status }
      );
    } else {
      return NextResponse.json({ message: "An error Occured", error: error });
    }
  }
}
