import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import openai from "@/lib/openai";
import { countTokens } from "@/utils/tokenizer";
import { isValidText } from "@utils/isValidText";
import { isCleanText, removeEmojis } from "@/utils/isCleanText";
import Subscription from "@/models/Subscription";
import connectDB from "@/lib/database";
import { customerFeedbackPrompt } from "@/lib/constants.ts/prompt";

//Pending tasks : rate limiting, allow only 15000 tokens per user in free tier

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
    const cleanedReviews = body.messages.replace(/\s+/g, " ").trim();

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

    if (count > 5000) {
      return NextResponse.json({
        message:
          "Your request exceeds the token limit (5000). Please reduce the input size and try again."
      });
    }

    const subDetails = await Subscription.findOne({
      user: "6788977ee000348f4e99e31f" //Replace with Id
    }).select("tokenUsed tokenLimit");

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

    const prompt = customerFeedbackPrompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: cleanedReviews }
      ],
      temperature: 0.7,
      max_tokens: 950,
      frequency_penalty: 0.5
    });

    //Get response
    const aiResponse = response.choices[0]?.message?.content?.trim(); //PENDING...
    //Here add the token value only if the reportStatus = "success" **Need to implement still based on the response**
    console.log("RESPONSE : ", aiResponse);
    const tokensUsedInThisRequest = countTokens(aiResponse || ""); //PENDING...

    //Update
    Subscription.updateOne(
      { user: "6788977ee000348f4e99e31f" }, //Replace with Id
      { $set: { tokenUsed: tokensUsedInThisRequest } }
    );

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
