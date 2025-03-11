import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
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
    positive: { type: String }, // For R1
    neutral: { type: String }, // For R1
    negative: { type: String }, // For R1
    mostMentionedTopics: [
      {
        topic: { type: String },
        percentage: { type: String }
      }
    ], // For R2
    suggestions: [{ type: String }], // For R3
    satisfactionScore: { type: String }, // For R4
    confidenceLevel: { type: String }, // For R4
    trendingPositive: [
      {
        trend: { type: String },
        mentions: { type: String }
      }
    ], // For R5
    trendingNegative: [
      {
        trend: { type: String },
        mentions: { type: String }
      }
    ], // For R5
    recommendedActions: {
      negative: [{ type: String }],
      neutral: [{ type: String }],
      positive: [{ type: String }]
    }, // For R6
    customerComplaints: [{ type: String }], // For R7
    featureRequests: [
      {
        feature: { type: String },
        percentage: { type: String }
      }
    ], // For R8
    emotionalTone: [
      {
        tone: { type: String },
        percentage: { type: String }
      }
    ]
  }
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
