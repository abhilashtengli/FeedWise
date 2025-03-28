"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, BarChart } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-8 w-8 text-violet-400" />,
    title: "Upload Reviews",
    description:
      "Paste your product reviews or connect to your e-commerce platform to import reviews automatically."
  },
  {
    icon: <Cpu className="h-8 w-8 text-cyan-400" />,
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes the reviews, extracting sentiment, key features, and trends."
  },
  {
    icon: <BarChart className="h-8 w-8 text-pink-400" />,
    title: "Get Insights",
    description:
      "Receive comprehensive reports with actionable insights to improve your products."
  }
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Transform your product reviews into actionable insights in three
            simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              {steps.map((step, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start gap-4 mb-12 relative group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/5 group-hover:scale-110 group-hover:border-violet-500/30">
                    <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-violet-400">
                      {step.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-violet-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 &&
                    <div className="absolute left-6 top-12 h-12 w-px bg-gradient-to-b from-violet-500/30 to-cyan-500/30" />}
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl overflow-hidden shadow-2xl shadow-white/10 border border-white/10 hover:shadow-white/20 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group backdrop-blur-sm"
          >
            <div className="w-full aspect-video bg-gradient-to-br from-violet-900/20 to-cyan-900/20 flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-6 w-full">
                <motion.div
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Sentiment</h4>
                    <span className="text-green-400 font-bold">72%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-white/10 rounded-full">
                      <motion.div
                        className="h-full bg-green-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "72%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Positive</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Features</h4>
                    <span className="text-violet-400 font-bold">12</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      Quality
                    </span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      Price
                    </span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      Design
                    </span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      +9
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Trends</h4>
                    <span className="text-cyan-400 font-bold">↑ 14%</span>
                  </div>
                  <div className="h-10 flex items-end space-x-1">
                    {[40, 65, 45, 60, 55, 75, 85].map((height, i) =>
                      <motion.div
                        key={i}
                        className="flex-1 bg-cyan-400/70 rounded-t"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                      />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Satisfaction</h4>
                    <span className="text-pink-400 font-bold">8.7/10</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-white/10 rounded-full">
                      <motion.div
                        className="h-full bg-pink-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "87%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
