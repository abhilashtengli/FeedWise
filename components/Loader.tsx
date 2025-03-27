"use client";

import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function CircularSpringLoader() {
  return (
    <div className="flex flex-col gap-y-8 h-screen  items-center justify-center bg-black ml-[18%] w-[82%]">
      <RefreshCcw className="h-12 w-12 text-indigo-500 animate-spin" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <motion.div className="relative text-lg font-light tracking-wide text-zinc-500 py-1 pl-3 rounded-md overflow-hidden">
          Please wait, product reviews are being analyzed
          <motion.span
            className="inline-block text-white text-lg"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.span>
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-700/40 to-transparent "
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              width: "150%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
