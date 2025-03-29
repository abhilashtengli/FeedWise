"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  MessageSquareText,
  TrendingUp,
  Zap,
  Search,
  LineChart
} from "lucide-react";
import BgBox from "./bg-box";

const features = [
  {
    icon: <MessageSquareText className="h-10 w-10 text-violet-400" />,
    title: "Sentiment Analysis",
    description:
      "Understand customer sentiment with AI-powered analysis that categorizes reviews as positive, neutral, or negative."
  },
  {
    icon: <Search className="h-10 w-10 text-cyan-400" />,
    title: "Feature Extraction",
    description:
      "Automatically identify key product features mentioned in reviews to understand what matters most to customers."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-pink-400" />,
    title: "Trend Detection",
    description:
      "Spot emerging patterns and trends in customer feedback to stay ahead of market demands."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-indigo-400" />,
    title: "Comprehensive Reports",
    description:
      "Get detailed analysis reports with visual charts and actionable insights to improve your products."
  },
  {
    icon: <Zap className="h-10 w-10 text-amber-400" />,
    title: "Real-time Processing",
    description:
      "Process thousands of reviews in seconds with our powerful AI engine for immediate insights."
  },
  {
    icon: <LineChart className="h-10 w-10 text-emerald-400" />,
    title: "Competitive Analysis",
    description:
      "Compare your product reviews against competitors to identify strengths and opportunities."
  }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return <section id="features" className="relative py-24 bg-black">
      <div className="lg:block hidden">
          <BgBox rowNum={5} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl z-50">
        <div className="text-center mb-16 z-50">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            Powerful Features
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xl text-white/70 max-w-2xl mx-auto">
            Unlock the full potential of your product reviews with our advanced AI tools
          </motion.p>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) =>
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black border z-50 border-white/10 rounded-xl p-6 hover:bg-white/[0.02] transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-1 group"
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-violet-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-violet-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>;
}
