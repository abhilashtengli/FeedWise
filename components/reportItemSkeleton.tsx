"use client";

import { motion } from "framer-motion";

export function ReportItemSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-2 text-sm">
      <div className="h-4 w-4 shrink-0 bg-white/20 rounded-sm" />
      <div className="h-4 w-full bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear"
          }}
          style={{
            width: "150%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
}
