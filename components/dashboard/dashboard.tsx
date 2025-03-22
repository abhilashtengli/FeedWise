"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChatInput } from "./chat-input";
import { SessionProvider } from "next-auth/react";

export default function Dashboard() {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className=" w-full h-full overflow-hidden  ">
      <main className="relative  w-full h-full flex flex-col overflow-hidden">
        <motion.div
          className="flex flex-1 flex-col items-center justify-center overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* <motion.div
            className="w-full max-w-5xl flex-1 px-4 pt-4 md:px-8 lg:px-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex h-full flex-col items-center justify-center" />
          </motion.div> */}
          <motion.div variants={itemVariants} className="relative">
            <motion.h1
              className="mb-2 text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
                delay: 0.5
              }}
            >
              Feedwise
            </motion.h1>
            <motion.div
              className="absolute -left-10 -top-10 h-20 w-20 rounded-full bg-purple-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.div
              className="absolute -bottom-5 -right-10 h-16 w-16 rounded-full bg-blue-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            className="mb-2 text-center text-lg text-muted-foreground"
            variants={itemVariants}
          >
            What product reviews would you like to analyze?
          </motion.p>
          <motion.div
            className="grid grid-cols-1  gap-4  w-full max-w-3xl mb-2 sm:grid-cols-2 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: "Product Reviews",
                description: "Analyze customer reviews"
              },
              {
                title: "Sentiment Analysis",
                description: "Understand customer sentiment"
              },
              {
                title: "Feature Extraction",
                description: "Identify key product features"
              }
            ].map((item, index) =>
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)"
                }}
                className="rounded-lg border border-border bg-card p-4 transition-all"
              >
                <h3 className="mb-2 font-medium">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            )}
          </motion.div>
          <SessionProvider>
            <ChatInput />
          </SessionProvider>
        </motion.div>
      </main>
    </div>
  );
}
