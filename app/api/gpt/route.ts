import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import openai from "@/lib/openai";
import { countTokens } from "@/utils/tokenizer";
import { isValidText } from "@utils/isValidText";
import { isCleanText, removeEmojis } from "@/utils/isCleanText";
import Subscription from "@/models/Subscription";
import connectDB from "@/lib/database";
// import { customerFeedbackPrompt } from "@/lib/constants.ts/prompt";
import {
  promptBatch01,
  promptBatch02,
  promptBatch03,
} from "@/lib/constants.ts/prompt";
import { z } from "zod";

//Implement the prompts one by one (figure out)

//Pending tasks : rate limiting, allow only 15000 tokens per user in free tier
const validInput = z.object({
  productName: z.string(),
  productCategory: z.string(),
  countryOfSale: z.string(),
  messages: z.string().min(1, "Reviews must be a non-empty string")
});

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
      "USed : " +
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

    if (count + subDetails.tokenUsed > subDetails.tokenLimit) {
      return NextResponse.json({
        message:
          "Your request exceeds the token limit . Please Upgrade your free tier plan."
      });
    }

    // const prompt = customerFeedbackPrompt(
    //   productName,
    //   productCategory,
    //   countryOfSale
    // );

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: cleanedReviews }
      ],
      temperature: 0.7,
      max_tokens: 1300,
      frequency_penalty: 0.5
    });
    if (
      !response.choices ||
      !response.choices[0]?.message?.content ||
      typeof response.choices[0].message.content !== "string"
    ) {
      return NextResponse.json({
        message:
          "OpenAI API returned an unexpected response. Please try again later.",
        error: "Invalid or missing content in OpenAI response"
      });
    }

    //Get response
    const aiResponse = response.choices[0].message.content.trim();

    console.log("Response : " + aiResponse);

    // let parsedResponse;

    // try {
    //   const cleanedResponse = cleanJsonResponse(aiResponse);

    //   parsedResponse = cleanedResponse;
    // } catch (err) {
    //   console.error("Failed to parse AI response:", err);
    //   return NextResponse.json({
    //     message: "Failed to parse AI response",
    //     error: err
    //   });
    // }

    //Here add the token value only if the reportStatus = "success" **Need to implement still based on the response**
    const tokensUsedInThisRequest = countTokens(aiResponse || "");
    const totalTokens = tokensUsedInThisRequest + count;
    console.log("Total tokens : " + totalTokens);

    //Update
    await Subscription.updateOne(
      { user: "67962901935d078e1488921f" }, // Replace with actual user ID
      {
        $inc: {
          tokenUsed: totalTokens, // Increment tokenUsed
          tokenLimit: -totalTokens // Decrement tokenLimit
        }
      }
    );
    // While efforts are made to handle sarcasm, accuracy may vary depending on context. ( add in  Sentiment Analysis  )
    return NextResponse.json({
      data: aiResponse,
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
