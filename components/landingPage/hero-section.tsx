"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import CanvasBackground from "./canvas-background";

export default function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <CanvasBackground />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none z-0" />

      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-24 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
          >
            <span className="text-sm text-violet-300 font-medium">
              AI-Powered Product Review Analysis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Your Personal</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
              Review Advisor
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12"
          >
            Transform product reviews into actionable insights with our
            AI-powered analysis platform. Understand customer sentiment, extract
            key features, and detect trends in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white group relative overflow-hidden backdrop-blur-sm"
              onClick={() => (window.location.href = "/signup")}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 hover:bg-white/5 group relative overflow-hidden backdrop-blur-sm"
              onClick={() => setShowDemo(!showDemo)}
            >
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                See Demo
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {showDemo &&
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden shadow-2xl shadow-white/5 border border-white/10 max-w-4xl mx-auto mt-16 backdrop-blur-sm"
            >
              <div className="w-full aspect-video bg-gradient-to-br from-violet-900/20 to-cyan-900/20 flex items-center justify-center">
                <div className="text-white/70 text-center p-8">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="space-y-6 w-full max-w-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-white/70">
                            Sentiment Analysis
                          </span>
                          <span className="text-sm font-medium text-white">
                            72%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-white/70">
                            Feature Extraction
                          </span>
                          <span className="text-sm font-medium text-white">
                            85%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-violet-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{
                              duration: 1.5,
                              delay: 0.2,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-white/70">
                            Customer Satisfaction
                          </span>
                          <span className="text-sm font-medium text-white">
                            8.7/10
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "87%" }}
                            transition={{
                              duration: 1.5,
                              delay: 0.4,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-violet-500/10 to-transparent blur-xl"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/10 to-transparent blur-xl"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}
