import openai from "@/lib/openai";
import { AnalysisResponse } from "@/types/AnalysisReport";
// Modified lib function
export async function analyseFeedback(
  prompt: string,
  cleanedReviews: string,
  jsonSchema: string
): Promise<AnalysisResponse | null> {
  try {
    let schema;
    if (jsonSchema === "jsonSchemaB1") {
      schema = jsSchemaB1;
    }
    if (!schema) {
      throw new Error("Schema is not defined.");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: schema
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
    const response_json = JSON.parse(analysisContent);

    return response_json;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return null;
  }
}

const jsSchemaB1 = {
  name: "Feedback_analyser01",
  schema: {
    type: "object",
    properties: {
      reportStatus: { type: "string", enum: ["success", "error"] },
      reportMessage: { type: "string" },
      reports: {
        type: "array",
        items: {
          type: "object",
          oneOf: [
            {
              properties: {
                report: { type: "string", enum: ["R1"] },
                positive: { type: "string", pattern: "^[0-9]+%$" },
                neutral: { type: "string", pattern: "^[0-9]+%$" },
                negative: { type: "string", pattern: "^[0-9]+%$" }
              },
              required: ["report", "positive", "neutral", "negative"]
            },
            {
              properties: {
                report: { type: "string", enum: ["R2"] },
                mostMentionedTopics: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      topic: { type: "string" },
                      percentage: {
                        type: "string",
                        pattern: "^[0-9]+%$"
                      }
                    },
                    required: ["topic", "percentage"]
                  }
                }
              },
              required: ["report", "mostMentionedTopics"]
            },
            {
              properties: {
                report: { type: "string", enum: ["R3"] },
                suggestions: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["report", "suggestions"]
            }
          ]
        }
      }
    },
    required: ["reportStatus", "reportMessage", "reports"]
  }
};
