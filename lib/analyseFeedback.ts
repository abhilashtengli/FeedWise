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
    console.log({ ...jsonSchemaB1 });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: {
        type: "json_schema",
        json_schema: {
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
        }
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
