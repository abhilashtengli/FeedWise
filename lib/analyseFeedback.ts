import openai from "@/lib/openai";
import { AnalysisResponse } from "@/types/AnalysisReport";
// Modified lib function
export async function analyseFeedback(
  prompt: string,
  cleanedReviews: string,
  jsonSchemaB1: {
    name: string;
    type: string;
    properties: {
      reportStatus: { type: string; enum: string[] };
      reportMessage: { type: string };
      reports: {
        type: string;
        items: {
          type: string;
          oneOf: (
            | {
                properties: {
                  report: { type: string; enum: string[] };
                  positive: { type: string; pattern: string };
                  neutral: { type: string; pattern: string };
                  negative: { type: string; pattern: string };
                  mostMentionedTopics?: undefined;
                  suggestions?: undefined;
                };
                required: string[];
              }
            | {
                properties: {
                  report: { type: string; enum: string[] };
                  mostMentionedTopics: {
                    type: string;
                    items: {
                      type: string;
                      properties: {
                        topic: { type: string };
                        percentage: { type: string; pattern: string };
                      };
                      required: string[];
                    };
                  };
                  positive?: undefined;
                  neutral?: undefined;
                  negative?: undefined;
                  suggestions?: undefined;
                };
                required: string[];
              }
            | {
                properties: {
                  report: { type: string; enum: string[] };
                  suggestions: { type: string; items: { type: string } };
                  positive?: undefined;
                  neutral?: undefined;
                  negative?: undefined;
                  mostMentionedTopics?: undefined;
                };
                required: string[];
              }
          )[];
        };
      };
    };
    required: string[];
  }
): Promise<AnalysisResponse | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: {
        type: "json_schema",
        json_schema: jsonSchemaB1
      },
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: cleanedReviews }
      ],
      temperature: 0.7,
      max_tokens: 1300,
      frequency_penalty: 0.5
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error("Invalid OpenAI response structure");
    }

    const analysisContent = response.choices[0].message.content;

    return analysisContent as unknown as AnalysisResponse;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return null;
  }
}
