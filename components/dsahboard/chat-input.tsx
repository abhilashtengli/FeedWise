"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Plus, Search, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
      className="w-full px-4 pb-8 md:px-8 lg:px-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4">
        <Input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="border border-border p-2 rounded-md"
        />
        <Input
          name="productCategory"
          placeholder="Product Category"
          value={formData.productCategory}
          onChange={handleChange}
          className="border  border-border p-2 rounded-md"
        />
        <Input
          name="countryOfSale"
          placeholder="Country of Sale"
          value={formData.countryOfSale}
          onChange={handleChange}
          className="border border-border p-2 rounded-md"
        />
        <motion.div
          className="relative rounded-xl border border-border bg-background shadow-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <Textarea
            name="message"
            placeholder="Ask anything"
            className="min-h-24 resize-none border-0 bg-transparent p-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 md:min-h-16 md:py-3"
            value={formData.message}
            onChange={handleChange}
          />
          <motion.div
            className="absolute bottom-3 right-3 flex items-center gap-2"
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
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {[
              { icon: Plus, delay: 1.1 },
              { icon: Search, delay: 1.2 },
              { icon: Mic, delay: 1.3 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: item.delay,
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg text-muted-foreground"
                >
                  <item.icon className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}
