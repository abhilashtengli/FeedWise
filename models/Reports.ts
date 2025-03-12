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
    type: Object, // ✅ Explicitly define `report` as an object
    // default: {
    //   positive: "",
    //   neutral: "",
    //   negative: "",
    //   mostMentionedTopics: [],
    //   suggestions: [],
    //   satisfactionScore: "",
    //   confidenceLevel: "",
    //   trendingPositive: [],
    //   trendingNegative: [],
    //   recommendedActions: { negative: [], neutral: [], positive: [] },
    //   customerComplaints: [],
    //   featureRequests: [],
    //   emotionalTone: []
    // },
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
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
