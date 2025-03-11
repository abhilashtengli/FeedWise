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
// import { normalizeAIResponse } from "@/lib/constants.ts/normalizeAIResponse";

//Pending tasks : rate limiting, allow only 15000 tokens per user in free tier
const validInput = z.object({
  productName: z.string(),
  productCategory: z.string(),
  countryOfSale: z.string(),
  messages: z.string().min(1, "Reviews must be a non-empty string")
});
const userId = "67962901935d078e1488921f"; // Replace with actual user ID

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
  console.log(
    `Token usage updated for user: ${userId}, Tokens used: ${tokensUsed}`
  );
}

async function saveReport(
  userId: string,
  response: AnalysisResponse,
  productName: string,
  productCategory: string,
  countryOfSale: string
) {
  if (response?.reportStatus === "success") {
    const reportData = {
      user: userId,
      productName,
      productCategory,
      countryOfSale,
      reportStatus: response.reportStatus,
      reportMessage: response.reportMessage,
      report: response.reports?.length
        ? {
            positive: response.reports[0]?.positive || "",
            neutral: response.reports[0]?.neutral || "",
            negative: response.reports[0]?.negative || "",
            mostMentionedTopics: response.reports[1]?.mostMentionedTopics || [],
            suggestions: response.reports[2]?.suggestions || []
          }
        : {}
    };

    const newReport = await Report.create(reportData);
    console.log("Report saved successfully:", newReport);
    return newReport;
  }
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
  console.log(`Batch ${batchIndex + 1} - Generated Prompt:`, prompt);

  const response = (await analyseFeedback(
    prompt,
    cleanedReviews,
    jsonSchema
  )) as AnalysisResponse;
  console.log(`Batch ${batchIndex + 1} - Response:`, response);

  if (response?.reportStatus === "success") {
    const tokensUsed = countTokens(response.toString()) + count;
    await updateTokenUsage(userId, tokensUsed);
    return await saveReport(
      userId,
      response,
      productName,
      productCategory,
      countryOfSale
    ); // ✅ Return the saved report
  }

  return null; // ✅ Explicitly return null if no report was saved
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const text = await req.text();
    const sanitizedText = text.replace(/[\u0000-\u001F]+/g, " ");
    const body = JSON.parse(sanitizedText);

    if (!body.messages || typeof body.messages !== "string") {
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

    const cleanedReviews = body.messages.replace(/\s+/g, " ").trim();
    if (cleanedReviews.length === 0) {
      return NextResponse.json({
        reportStatus: "error",
        reportMessage:
          "Invalid input. Please provide actual customer reviews for analysis.",
        reports: null
      });
    }

    if (!isValidText(cleanedReviews) || !isCleanText(cleanedReviews)) {
      return NextResponse.json({
        reportStatus: "error",
        reportMessage:
          "Invalid input. Please provide actual customer reviews for analysis.",
        reports: null
      });
    }

    const cleanedReviewsWithoutEmoji = removeEmojis(cleanedReviews);
    const count = countTokens(cleanedReviewsWithoutEmoji);

    if (count > 2500) {
      return NextResponse.json({
        message:
          "Your request exceeds the token limit (2500). Please reduce the input size and try again."
      });
    }

    const subDetails = await Subscription.findOne({
      user: "67962901935d078e1488921f" //Replace with Id
    }).select("tokenUsed tokenLimit");

    console.log(
      "Used : " +
        subDetails.tokenUsed +
        " " +
        "Limit : " +
        subDetails.tokenLimit
    );

    if (!subDetails) {
      return NextResponse.json({
        message:
          "Subscription details not found. Please ensure the user has a valid subscription."
      });
    }

    if (count > subDetails.tokenLimit) {
      return NextResponse.json({
        message:
          "Your request exceeds the token limit . Please Upgrade your free tier plan."
      });
    }
    const savedReports: unknown[] = []; // ✅ Ensure it's an array

    for (let i = 0; i < batchConfigurations.length; i++) {
      const report = await processBatch(
        i,
        productName,
        productCategory,
        countryOfSale,
        cleanedReviews,
        userId,
        count
      );
      if (report) savedReports.push(report);
    }

    // Here loop all 3 batches and save each bath report in the Database.
    //------------------------------------------------------------------------------------------------
    //1st batch starts here :
    // const prompt1 = promptBatch01(productName, productCategory, countryOfSale);
    // console.log("Prompt1: " + prompt1);
    // const jsonSchema = "jsonSchemaB1";
    // const response = (await analyseFeedback(
    //   prompt1,
    //   cleanedReviews,
    //   jsonSchema
    // )) as AnalysisResponse;

    // console.log("Response : ", response);

    // //Here add the token value only if the reportStatus = "success" **Need to implement still based on the response**
    // const tokensUsedInThisRequest = countTokens(response.toString());
    // const totalTokens = tokensUsedInThisRequest + count;

    // //Update
    // await Subscription.updateOne(
    //   { user: "67962901935d078e1488921f" }, // Replace with actual user ID
    //   {
    //     $inc: {
    //       tokenUsed: totalTokens, // Increment tokenUsed
    //       tokenLimit: -totalTokens // Decrement tokenLimit
    //     }
    //   }
    // );
    // // Save batch-1 data

    // if (response?.reportStatus === "success") {
    //   const reportData = {
    //     user: "67962901935d078e1488921f", // Replace with actual user ID
    //     productName,
    //     productCategory,
    //     countryOfSale,
    //     reportStatus: response.reportStatus,
    //     reportMessage: response.reportMessage,
    //     report: {
    //       positive: response.reports[0]?.positive || "",
    //       neutral: response.reports[0]?.neutral || "",
    //       negative: response.reports[0]?.negative || "",
    //       mostMentionedTopics: response.reports[1]?.mostMentionedTopics || [],
    //       suggestions: response.reports[2]?.suggestions || []
    //       // Add any other report sections based on the structure of your response
    //     }
    //   };
    // const newReport = new Report(reportData);
    // newReport.save();
    //   console.log("Data saved successfully to the database :", reportData);
    // }
    // 1st batch ends here
    // -----------------------------------------------------------------------------------------------
    //2nd Batch
    // const prompt2 = promptBatch02(productName, productCategory, countryOfSale);
    // console.log("Prompt1: " + prompt1);
    // const jsonSchema = "jsonSchemaB2";
    // const response = (await analyseFeedback(
    //   prompt2,
    //   cleanedReviews,
    //   jsonSchema
    // )) as AnalysisResponse;

    // console.log("Response : ", response);

    // //Here add the token value only if the reportStatus = "success" **Need to implement still based on the response**
    // const tokensUsedInThisRequest = countTokens(response.toString());
    // const totalTokens = tokensUsedInThisRequest + count;

    // //Update
    // await Subscription.updateOne(
    //   { user: "67962901935d078e1488921f" }, // Replace with actual user ID
    //   {
    //     $inc: {
    //       tokenUsed: totalTokens, // Increment tokenUsed
    //       tokenLimit: -totalTokens // Decrement tokenLimit
    //     }
    //   }
    // );
    // // Save batch-1 data

    // if (response?.reportStatus === "success") {
    //   const reportData = {
    //     user: "67962901935d078e1488921f", // Replace with actual user ID
    //     productName,
    //     productCategory,
    //     countryOfSale,
    //     reportStatus: response.reportStatus,
    //     reportMessage: response.reportMessage,
    //     report: {}
    //   };
    //   // const newReport = new Report(reportData);
    //   // newReport.save();
    //   console.log("Data saved successfully to the database :", reportData);
    // }
    // @2nd batch ends here
    // -----------------------------------------------------------------------------------------------------

    // 3rd batch starts here
    // const prompt1 = promptBatch03(productName, productCategory, countryOfSale);
    // console.log("Prompt1: " + prompt1);
    // const jsonSchema = "jsonSchemaB3";
    // const response = (await analyseFeedback(
    //   prompt1,
    //   cleanedReviews,
    //   jsonSchema
    // )) as AnalysisResponse;

    // console.log("Response : ", response);

    // //Here add the token value only if the reportStatus = "success" **Need to implement still based on the response**
    // const tokensUsedInThisRequest = countTokens(response.toString());
    // const totalTokens = tokensUsedInThisRequest + count;

    // //Update
    // await Subscription.updateOne(
    //   { user: "67962901935d078e1488921f" }, // Replace with actual user ID
    //   {
    //     $inc: {
    //       tokenUsed: totalTokens, // Increment tokenUsed
    //       tokenLimit: -totalTokens // Decrement tokenLimit
    //     }
    //   }
    // );
    // // Save batch-1 data

    // if (response?.reportStatus === "success") {
    //   const reportData = {
    //     user: "67962901935d078e1488921f", // Replace with actual user ID
    //     productName,
    //     productCategory,
    //     countryOfSale,
    //     reportStatus: response.reportStatus,
    //     reportMessage: response.reportMessage,
    //     report: {}
    //   };
    //   // const newReport = new Report(reportData);
    //   // newReport.save();
    //   console.log("Data saved successfully to the database :", reportData);
    // }
    // 3rd batch ends here

    return NextResponse.json({
      // While efforts are made to handle sarcasm, accuracy may vary depending on context. ( add in  Sentiment Analysis  )
      data: savedReports,
      message: "Successfull",
      TokenCount: count
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
