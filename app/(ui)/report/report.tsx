"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Lightbulb,
  Heart,
  ThumbsUp,
  ThumbsDown,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/lib/config";
import { Button } from "@/components/ui/button";

// Define the report type structure based on the API response
interface ReportData {
  _id: string;
  user: string;
  productName: string;
  productCategory: string;
  countryOfSale: string;
  reportStatus: string;
  reportMessage: string;
  report: {
    positive: string;
    neutral: string;
    negative: string;
    mostMentionedTopics: Array<{
      topic: string;
      percentage: string;
    }>;
    suggestions: string[];
    satisfactionScore: string;
    confidenceLevel: string;
    trendingPositive: Array<{
      trend: string;
      mentions: string;
    }>;
    trendingNegative: Array<{
      trend: string;
      mentions: string;
    }>;
    recommendedActions: {
      negative: string[];
      neutral: string[];
      positive: string[];
    };
    customerComplaints: string[];
    featureRequests: Array<{
      feature: string;
      percentage: string;
    }>;
    emotionalTone: Array<{
      tone: string;
      percentage: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Report() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [confidence, setConfidence] = useState(0);

  const { id } = useParams();
  const router = useRouter();

  // Function to fetch report data
  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${baseUrl}/reports/${id}`);
      const reportData = response.data.data;
      console.log("ReportData", reportData);
      if (response.data?.data?.report) {
        setReport(response.data.data.report);

        // Set progress and confidence values
        if (response.data.data.report.report) {
          const satisfactionScore = Number.parseFloat(
            response.data.data.report.report.satisfactionScore
          );
          const confidenceLevel = Number.parseInt(
            response.data.data.report.report.confidenceLevel
          );

          setProgress(isNaN(satisfactionScore) ? 0 : satisfactionScore * 10);
          setConfidence(isNaN(confidenceLevel) ? 0 : confidenceLevel);
        }
      } else {
        setError("Invalid report data structure");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("Failed to load report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch report on component mount
  useEffect(() => {
    if (id) {
      fetchReport();
    } else {
      setError("No report ID provided");
      setLoading(false);
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <RefreshCcw className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Loading Report</h2>
        <p className="text-gray-400">
          Please wait, retrieving analysis data...
        </p>
      </div>
    );
  }

  // Error state
  if (error || !report) {
    return (
      <div className="min-h-screen bg-black  text-white flex flex-col items-center justify-center p-6">
        <div className="bg-opacity-20  p-8 rounded-xl border border-white max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Report</h2>
          <p className="text-gray-300 mb-6">{error || "Report not found"}</p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-gray-700 hover:bg-gray-800"
            >
              Go Home
            </Button>
            <Button
              onClick={fetchReport}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const sentimentData = [
    {
      name: "Positive",
      value: Number.parseInt(report.report.positive),
      color: "#10b981"
    },
    {
      name: "Neutral",
      value: Number.parseInt(report.report.neutral),
      color: "#6366f1"
    },
    {
      name: "Negative",
      value: Number.parseInt(report.report.negative),
      color: "#ef4444"
    }
  ];

  const topicsData = report.report.mostMentionedTopics.map((topic) => ({
    name: topic.topic,
    value: Number.parseInt(topic.percentage)
  }));

  // Update the emotionalToneData to include emoji mappings
  const emotionalToneData = report.report.emotionalTone.map((tone) => {
    // Add emoji mapping for each emotional tone
    let emoji = "🔍";
    switch (tone.tone) {
      case "Joy":
      case "joy":
        emoji = "😊";
        break;
      case "Trust":
      case "trust":
        emoji = "🤝";
        break;
      case "Disgust":
      case "disgust":
        emoji = "🤢";
        break;
      case "Anticipation":
      case "anticipation":
        emoji = "🔮";
        break;
      case "Anger":
      case "anger":
        emoji = "😡";
        break;
      default:
        emoji = "🔍";
    }

    return {
      subject: tone.tone,
      A: Number.parseInt(tone.percentage),
      fullMark: 100,
      emoji: emoji
    };
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          FeedWise AI Analysis Report
        </h1>
        <div className="flex items-center mt-2">
          <h2 className="text-xl font-semibold text-gray-200">
            {report.productName}
          </h2>
          <Badge className="ml-3 bg-indigo-600">{report.productCategory}</Badge>
          <Badge className="ml-2 bg-purple-700">{report.countryOfSale}</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-gray-900 to-cyan-950 border-gray-800 p-6 rounded-xl shadow-glow">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Satisfaction Score</h3>
            <span className="text-2xl font-bold text-cyan-400">
              {report.report.satisfactionScore}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative w-full h-2 mt-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-cyan-400 rounded-full"
            />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-purple-950 border-gray-800 p-6 rounded-xl shadow-glow">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Confidence Level</h3>
            <span className="text-2xl font-bold text-purple-400">
              {report.report.confidenceLevel}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative w-full h-2 mt-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-purple-400 rounded-full"
            />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-indigo-950 border-gray-800 p-6 rounded-xl shadow-glow">
          <div className="flex flex-col">
            <h3 className="text-gray-400 font-medium mb-2">
              Sentiment Analysis
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                <span className="text-sm font-medium text-emerald-400">
                  Positive: {report.report.positive}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2" />
                <span className="text-sm font-medium text-indigo-400">
                  Neutral: {report.report.neutral}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span className="text-sm font-medium text-red-400">
                  Negative: {report.report.negative}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sentiment Donut Chart */}
        <Card className="bg-gradient-to-br from-gray-900 to-indigo-950 border-gray-800 p-6 rounded-xl shadow-glow col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Sentiment Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Topics Bar Chart */}
        <Card className="bg-gradient-to-br from-gray-900 to-blue-950 border-gray-800 p-6 rounded-xl shadow-glow col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Most Mentioned Topics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topicsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#888" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  stroke="#888"
                  tick={{ fill: "#ccc" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#444"
                  }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[0, 4, 4, 0]}
                  background={{ fill: "#444" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Trending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-gray-900 to-emerald-950 border-gray-800 p-6 rounded-xl shadow-glow">
          <div className="flex items-center mb-4">
            <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-semibold text-gray-200">
              Trending Positive
            </h3>
          </div>
          <div className="space-y-4">
            {report.report.trendingPositive.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-gray-300">{item.trend}</span>
                </div>
                <Badge className="bg-emerald-900 text-emerald-300">
                  {item.mentions}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-red-950 border-gray-800 p-6 rounded-xl shadow-glow">
          <div className="flex items-center mb-4">
            <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-200">
              Trending Negative
            </h3>
          </div>
          <div className="space-y-4">
            {report.report.trendingNegative.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center">
                  <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-gray-300">{item.trend}</span>
                </div>
                <Badge className="bg-red-900 text-red-300">
                  {item.mentions}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Emotional Tone Radar Chart */}
      <Card className="bg-gray-900 border-gray-800 p-6 rounded-xl shadow-glow mb-8 bg-gradient-to-br from-gray-900 to-indigo-950">
        <h3 className="text-xl font-semibold mb-4 text-gray-200">
          Emotional Tone Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {emotionalToneData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="text-3xl mb-1">{item.emoji}</div>
                <div className="text-sm font-medium text-gray-300">
                  {item.subject}
                </div>
                <div className="text-lg font-bold text-indigo-400">
                  {item.A}%
                </div>
              </div>
            ))}
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={emotionalToneData}
              >
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#ccc" }} />
                <PolarRadiusAxis
                  angle={17.5}
                  domain={[0, 100]}
                  tick={{ fill: "#ccc" }}
                />
                <Radar
                  name="Emotional Tone"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#444"
                  }}
                  formatter={(value, name, props) => [
                    `${value}%`,
                    <span key={name}>
                      {props.payload.emoji} {props.payload.subject}
                    </span>
                  ]}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Recommendations and Suggestions */}
      <Tabs defaultValue="suggestions" className="mb-8">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger
            value="suggestions"
            className="data-[state=active]:bg-indigo-600"
          >
            Suggestions
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="data-[state=active]:bg-indigo-600"
          >
            Recommended Actions
          </TabsTrigger>
          <TabsTrigger
            value="complaints"
            className="data-[state=active]:bg-indigo-600"
          >
            Customer Complaints
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-6 rounded-xl shadow-glow bg-gradient-to-br from-gray-900 to-purple-950">
            <div className="flex items-center mb-4">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-200">
                Improvement Suggestions
              </h3>
            </div>
            <ul className="space-y-3">
              {report.report.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex-shrink-0 mr-3 text-yellow-500">•</div>
                  <span className="text-gray-300">{suggestion}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-6 rounded-xl shadow-glow bg-gradient-to-br from-gray-900 to-blue-950">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-800">
                <div className="flex items-center mb-3">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <h4 className="font-medium text-green-300">
                    Positive Actions
                  </h4>
                </div>
                <ul className="space-y-2">
                  {report.report.recommendedActions.positive.map(
                    (action, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2 text-green-500">
                          •
                        </div>
                        <span className="text-green-200 text-sm">{action}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800">
                <div className="flex items-center mb-3">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                  <h4 className="font-medium text-blue-300">Neutral Actions</h4>
                </div>
                <ul className="space-y-2">
                  {report.report.recommendedActions.neutral.map(
                    (action, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2 text-blue-500">
                          •
                        </div>
                        <span className="text-blue-200 text-sm">{action}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-red-900/30 p-4 rounded-lg border border-red-800">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <h4 className="font-medium text-red-300">Negative Actions</h4>
                </div>
                <ul className="space-y-2">
                  {report.report.recommendedActions.negative.map(
                    (action, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2 text-red-500">•</div>
                        <span className="text-red-200 text-sm">{action}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-6 rounded-xl shadow-glow bg-gradient-to-br from-gray-900 to-orange-950">
            <div className="flex items-center mb-4">
              <MessageSquare className="mr-2 h-5 w-5 text-orange-500" />
              <h3 className="text-xl font-semibold text-gray-200">
                Customer Complaints
              </h3>
            </div>
            <ul className="space-y-3">
              {report.report.customerComplaints.map((complaint, index) => (
                <li
                  key={index}
                  className="flex items-start p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center">
                      <span className="text-orange-100 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-300">{complaint}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature Requests */}
      <Card className="bg-gray-900 border-gray-800 p-6 rounded-xl shadow-glow mb-8 bg-gradient-to-br from-gray-900 to-pink-950">
        <div className="flex items-center mb-4">
          <Heart className="mr-2 h-5 w-5 text-pink-500" />
          <h3 className="text-xl font-semibold text-gray-200">
            Feature Requests
          </h3>
        </div>
        <ul className="space-y-3">
          {report.report.featureRequests.map((request, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 text-pink-500">•</div>
                <span className="text-gray-300">{request.feature}</span>
              </div>
              <Badge className="bg-pink-900 text-pink-300">
                {request.percentage}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12">
        <p>
          Generated by FeedWise AI • Confidence Level:{" "}
          {report.report.confidenceLevel}
        </p>
      </div>
    </div>
  );
}
