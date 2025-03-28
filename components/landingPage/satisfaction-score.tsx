"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SatisfactionScoreProps {
  score: number;
  maxScore?: number;
  duration?: number;
  delay?: number;
}

export default function SatisfactionScore({
  score,
  maxScore = 10,
  duration = 2,
  delay = 0
}: SatisfactionScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = score / maxScore * 100;

  useEffect(
    () => {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayScore(prev => {
            const next = prev + 0.1;
            if (next >= score) {
              clearInterval(interval);
              return score;
            }
            return Number.parseFloat(next.toFixed(1));
          });
        }, duration * 1000 / (score * 10));

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    },
    [score, duration, delay]
  );

  return (
    <div className="w-full">
      <div className="flex justify-between mb-0.5">
        <span className="text-xs text-white/70">Satisfaction</span>
        <span className="text-xs font-bold text-white">
          {displayScore.toFixed(1)}/{maxScore}
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
