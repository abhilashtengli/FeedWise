"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SendHorizontal } from "lucide-react";

export function ChatInput() {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    countryOfSale: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would send all formData fields to your backend
      console.log("Submitting data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast("Review submitted. Your review is being analyzed.");
      setFormData({
        productName: "",
        productCategory: "",
        countryOfSale: "",
        message: ""
      });
    } catch (error) {
      toast("Error: Failed to submit review. Please try again." + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full  mt-8  max-w-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-4">
        {/* Product details grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          {/* Product Name Input */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={formData.productName}
              onChange={handleChange}
              className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </motion.div>

          {/* Product Category Input */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="text"
              name="productCategory"
              placeholder="Enter Product Category"
              value={formData.productCategory}
              onChange={handleChange}
              className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </motion.div>

          {/* Country of Sale Input */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="text"
              name="countryOfSale"
              placeholder="Enter Country of Sale"
              value={formData.countryOfSale}
              onChange={handleChange}
              className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </motion.div>
        </motion.div>

        {/* Message Textarea */}
        <motion.div
          className="relative rounded-xl border border-border bg-background shadow-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <Textarea
            name="message"
            placeholder="Enter product reviews here..."
            className="max-h-72 overflow-y-auto  min-h-24 resize-none border-0 bg-transparent p-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 md:min-h-16 md:py-3"
            value={formData.message}
            onChange={handleChange}
            onInput={(e) => {
              e.currentTarget.style.height = "auto"; // Reset height
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set to scroll height
            }}
            required
          />
          <motion.div
            className="absolute bottom-3 right-5 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                size="icon"
                disabled={isSubmitting || !formData.message.trim()}
                className="h-8 w-8 rounded-lg bg-primary text-primary-foreground"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
}
