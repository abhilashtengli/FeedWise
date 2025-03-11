// export const jsonSchemaB1 = {
//   name: "Feedback_analyser01",
//   schema: {
//     type: "object",
//     properties: {
//       reportStatus: { type: "string", enum: ["success", "error"] },
//       reportMessage: { type: "string" },
//       reports: {
//         type: "array",
//         items: {
//           type: "object",
//           oneOf: [
//             {
//               properties: {
//                 report: { type: "string", enum: ["R1"] },
//                 positive: { type: "string", pattern: "^[0-9]+%$" },
//                 neutral: { type: "string", pattern: "^[0-9]+%$" },
//                 negative: { type: "string", pattern: "^[0-9]+%$" }
//               },
//               required: ["report", "positive", "neutral", "negative"]
//             },
//             {
//               properties: {
//                 report: { type: "string", enum: ["R2"] },
//                 mostMentionedTopics: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       topic: { type: "string" },
//                       percentage: { type: "string", pattern: "^[0-9]+%$" }
//                     },
//                     required: ["topic", "percentage"]
//                   }
//                 }
//               },
//               required: ["report", "mostMentionedTopics"]
//             },
//             {
//               properties: {
//                 report: { type: "string", enum: ["R3"] },
//                 suggestions: { type: "array", items: { type: "string" } }
//               },
//               required: ["report", "suggestions"]
//             }
//           ]
//         }
//       }
//     },
//     required: ["reportStatus", "reportMessage", "reports"]
//   }
// };

// export const jsonSchemaB2 = {
//   name: "Feedback_analyser02",
//   schema: {
//     type: "object",
//     properties: {
//       reportStatus: { type: "string", enum: ["success", "error"] },
//       reportMessage: { type: "string" },
//       reports: {
//         type: "array",
//         items: {
//           oneOf: [
//             {
//               type: "object",
//               properties: {
//                 report: { type: "string", enum: ["R4"] },
//                 satisfactionScore: {
//                   type: "string",
//                   pattern: "^[0-9]+(\\.[0-9])?/10$"
//                 },
//                 confidenceLevel: { type: "string", pattern: "^[0-9]+%$" }
//               },
//               required: ["report", "satisfactionScore", "confidenceLevel"]
//             },
//             {
//               type: "object",
//               properties: {
//                 report: { type: "string", enum: ["R5"] },
//                 trendingPositive: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       trend: { type: "string" },
//                       mentions: { type: "string", pattern: "^[0-9]+%$" }
//                     },
//                     required: ["trend", "mentions"]
//                   }
//                 },
//                 trendingNegative: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       trend: { type: "string" },
//                       mentions: { type: "string", pattern: "^[0-9]+%$" }
//                     },
//                     required: ["trend", "mentions"]
//                   }
//                 }
//               },
//               required: ["report", "trendingPositive", "trendingNegative"]
//             },
//             {
//               type: "object",
//               properties: {
//                 report: { type: "string", enum: ["R6"] },
//                 recommendedActions: {
//                   type: "object",
//                   properties: {
//                     negative: { type: "array", items: { type: "string" } },
//                     neutral: { type: "array", items: { type: "string" } },
//                     positive: { type: "array", items: { type: "string" } }
//                   },
//                   required: ["negative", "neutral", "positive"]
//                 }
//               },
//               required: ["report", "recommendedActions"]
//             }
//           ]
//         }
//       }
//     },
//     required: ["reportStatus", "reportMessage", "reports"]
//   }
// };

// export const jsonSchemaB3 = {
//   name: "Feedback_analyser03",
//   schema: {
//     type: "object",
//     properties: {
//       reportStatus: { type: "string", enum: ["success"] },
//       reportMessage: { type: "string" },
//       reports: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             report: { type: "string", enum: ["R7", "R8", "R9"] },
//             customerComplaints: { type: "array", items: { type: "string" } },
//             featureRequests: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   feature: { type: "string" },
//                   percentage: { type: "string", pattern: "^[0-9]+%$" }
//                 },
//                 required: ["feature", "percentage"]
//               }
//             },
//             emotionalTone: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   tone: { type: "string" },
//                   percentage: { type: "string", pattern: "^[0-9]+%$" }
//                 },
//                 required: ["tone", "percentage"]
//               }
//             }
//           },
//           required: ["report"]
//         }
//       }
//     },
//     required: ["reportStatus", "reportMessage", "reports"]
//   }
// };

export const jsSchemaB1 = {
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

export const jsSchemaB2 = {
  name: "Feedback_analyser02",
  schema: {
    type: "object",
    properties: {
      reportStatus: { type: "string", enum: ["success", "error"] },
      reportMessage: { type: "string" },
      reports: {
        type: "array",
        items: {
          oneOf: [
            {
              type: "object",
              properties: {
                report: { type: "string", enum: ["R4"] },
                satisfactionScore: {
                  type: "string",
                  pattern: "^[0-9]+(\\.[0-9])?/10$"
                },
                confidenceLevel: { type: "string", pattern: "^[0-9]+%$" }
              },
              required: ["report", "satisfactionScore", "confidenceLevel"]
            },
            {
              type: "object",
              properties: {
                report: { type: "string", enum: ["R5"] },
                trendingPositive: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      trend: { type: "string" },
                      mentions: { type: "string", pattern: "^[0-9]+%$" }
                    },
                    required: ["trend", "mentions"]
                  }
                },
                trendingNegative: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      trend: { type: "string" },
                      mentions: { type: "string", pattern: "^[0-9]+%$" }
                    },
                    required: ["trend", "mentions"]
                  }
                }
              },
              required: ["report", "trendingPositive", "trendingNegative"]
            },
            {
              type: "object",
              properties: {
                report: { type: "string", enum: ["R6"] },
                recommendedActions: {
                  type: "object",
                  properties: {
                    negative: { type: "array", items: { type: "string" } },
                    neutral: { type: "array", items: { type: "string" } },
                    positive: { type: "array", items: { type: "string" } }
                  },
                  required: ["negative", "neutral", "positive"]
                }
              },
              required: ["report", "recommendedActions"]
            }
          ]
        }
      }
    },
    required: ["reportStatus", "reportMessage", "reports"]
  }
};

export const jsSchemaB3 = {
  name: "Feedback_analyser03",
  schema: {
    type: "object",
    properties: {
      reportStatus: { type: "string", enum: ["success"] },
      reportMessage: { type: "string" },
      reports: {
        type: "array",
        items: {
          type: "object",
          properties: {
            report: { type: "string", enum: ["R7", "R8", "R9"] },
            customerComplaints: { type: "array", items: { type: "string" } },
            featureRequests: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  feature: { type: "string" },
                  percentage: { type: "string", pattern: "^[0-9]+%$" }
                },
                required: ["feature", "percentage"]
              }
            },
            emotionalTone: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tone: { type: "string" },
                  percentage: { type: "string", pattern: "^[0-9]+%$" }
                },
                required: ["tone", "percentage"]
              }
            }
          },
          required: ["report"]
        }
      }
    },
    required: ["reportStatus", "reportMessage", "reports"]
  }
};
