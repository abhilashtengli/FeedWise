interface ReportDetails {
  report: "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7" | "R8" | "R9"; // ✅ Define valid values
  positive?: string;
  neutral?: string;
  negative?: string;
  mostMentionedTopics?: { topic: string; percentage: string }[];
  suggestions?: string[];
  satisfactionScore?: string;
  confidenceLevel?: string;
  trendingPositive?: { trend: string; mentions: string }[];
  trendingNegative?: { trend: string; mentions: string }[];
  recommendedActions?: {
    negative: string[];
    neutral: string[];
    positive: string[];
  };
  customerComplaints?: string[];
  featureRequests?: { feature: string; percentage: string }[];
  emotionalTone?: { tone: string; percentage: string }[];
}

export interface AnalysisResponse {
  reportStatus: string;
  reportMessage: string;
  reports: ReportDetails[];
}
