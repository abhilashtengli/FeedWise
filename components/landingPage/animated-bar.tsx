"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBarProps {
  percentage: number;
  color: string;
  duration?: number;
  delay?: number;
  label?: string;
  showPercentage?: boolean;
  height?: string;
}

export default function AnimatedBar({
  percentage,
  color,
  duration = 1.5,
  delay = 0,
  label,
  showPercentage = true,
  height = "h-1.5"
}: AnimatedBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    },
    [delay]
  );

  return (
    <div className="w-full">
      {label &&
        <div className="flex justify-between mb-0.5">
          <span className="text-xs text-white/70">
            {label}
          </span>
          {showPercentage &&
            <span className="text-xs font-medium text-white">
              {percentage}%
            </span>}
        </div>}
      <div
        className={`w-full ${height} bg-white/10 rounded-full overflow-hidden`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
