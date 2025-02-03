import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function analyseFeedback(prompt: string, cleanedReviews: string) {
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
}
