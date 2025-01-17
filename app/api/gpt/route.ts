import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import openai from "@/lib/openai";
import { countTokens } from "@/utils/tokenizer";
import { isValidText } from "@utils/isValidText";
import { isCleanText, removeEmojis } from "@/utils/isCleanText";
import Subscription from "@/models/Subscription";
import connectDB from "@/lib/database";

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

    const prompt = `
        Act as **Customer Feedback Analyst** expert and Your task is to analyze bulk customer reviews :

    **Customer Reviews:**
          ${cleanedReviews}
      Note : You must return a valid JSON object as I mentioned without extra text or formatting.
        Now generate structured reports based on these categories:
    ### **Input Validation:**
    Before processing, check if the input contains meaningful customer reviews.
    If the input lacks valid feedback (e.g., random characters, empty text, gibberish or irrelevant data), return:
    {
      "reportStatus": "error",
      "reportMessage": "Invalid input. Please provide actual customer reviews for analysis.",
      "reports": null
    }
    ### **Reports to Generate (if input is valid):**
    - If the input is valid, generate reports in JSON format as follows:
    {
      "reportStatus": "success",
      "reportMessage": "Here is the report",
      "reports": [] //In this add all the below 9 reports with their key & value
    },
    1. **Sentiment Analysis Report (R1)**
       - Output positive, neutral, and negative feedback percentages.
     Example :
    {
      "report": "R1",
      "positive": "62%",
      "neutral": "25%",
      "negative": "13%"
    }
    2. **Key Themes and Topics Extraction (R2)**
    - Extract the most mentioned topics and their percentage of occurrence.
    Example :
     {
      "report": "R2",
      "most_mentioned_topics": [
        {"topic": "Topic name", "percentage": "45%"},
        {"topic": "Topic name", "percentage": "30%"},
        {"topic": "Topic name", "percentage": "15%"},
        {"topic": "Topic name", "percentage": "10%"}
      ]
    }
    3. **Improvement Suggestions Report (R3)**
    - Provide key actionable suggestions.
    Example :
    {
      "report": "R3",
      "suggestions": [
        "Improve delivery speed",
        "Offer better post-purchase support",
        "Enhance product durability"
      ]
    }
    4. **Comparative Analysis Report (R4)**
    - Compare product ratings and highlight strengths/weaknesses.
    Example :
    {
      "report": "R4",
      "myProductRating": 4.2,
      "overAllCompetitorRating": 4.5,
      "MyProductStrengths": ["Better quality", "User-friendly design"],
      "Needs Improvement": ["Pricing slightly higher than competitors", "Better packaging"]
    }
    5. **Customer Satisfaction Score (R5)**
    - Calculate and display the satisfaction score.
    Example :
    {
      "report": "R5",
      "Satisfaction Score": "8.1/10"
    }
    6. **Trend Analysis Report (R6)**
    - Identify trending positive and negative feedback.
    Example :
    {
      "report": "R6",
      "trending_positive": [
        {"Customers love the new design": "15%"},
        {"Customers satisfied with packaging": "46%"}
      ],
      "trending_negative": [
        {"Delivery delays have increased complaints": "8%"},
        {"Too expensive": "14%"}
      ]
    }
    7. **Competitive Benchmarking Report (R7)**
    - Compare product ratings and key performance indicators.
    Example :
    {
      "report": "R7",
      "marketAvgRating": "4.0/5",
      "your Product": "4.2/5",
      "points": [
        "You are **above average** in product quality",
        "Below competitors in **customer service response time**"
      ]
    }
    8. **Response Strategy Development (R8)**
    - Provide strategies for different types of reviews.
    Example :
    {
      "report": "R8",
      "Recommended Actions": {
        "negativeReviews": "Apologize, offer compensation, and improve issue resolution speed.",
        "positiveReviews": "Encourage customer advocacy & referrals.",
        "neutralReviews": "Seek more feedback to understand concerns."
      }
    }
    9. **Customer Complaints List (R9)**
    - Generate a list of customer complaints (maximum 5).
    - If no complaints exist, return an empty list.
    Example :
    {
      "customer_complaints": [
        "Complaint 1",
        "Complaint 2",
        "Complaint 3"
      ]
    }
    Note : If there are any personal or sensitive topics please avoid answering those questions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
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
      data: cleanedReviewsWithoutEmoji,
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
