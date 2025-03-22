import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productCategory: {
      type: String,
      required: true
    },
    countryOfSale: {
      type: String,
      required: true
    },
    reportStatus: {
      type: String,
      enum: ["success", "error"],
      required: true
    },
    reportMessage: {
      type: String,
      required: true
    },
    report: {
      type: Object,
      properties: {
        positive: { type: String }, // For R1
        neutral: { type: String },
        negative: { type: String },
        mostMentionedTopics: [
          {
            topic: { type: String },
            percentage: { type: String }
          }
        ],
        suggestions: [{ type: String }],
        satisfactionScore: { type: String },
        confidenceLevel: { type: String },
        trendingPositive: [
          {
            trend: { type: String },
            mentions: { type: String }
          }
        ],
        trendingNegative: [
          {
            trend: { type: String },
            mentions: { type: String }
          }
        ],
        recommendedActions: {
          negative: [{ type: String }],
          neutral: [{ type: String }],
          positive: [{ type: String }]
        },
        customerComplaints: [{ type: String }],
        featureRequests: [
          {
            feature: { type: String },
            percentage: { type: String }
          }
        ],
        emotionalTone: [
          {
            tone: { type: String },
            percentage: { type: String }
          }
        ]
      }
    }
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
