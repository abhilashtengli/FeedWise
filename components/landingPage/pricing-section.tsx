"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out Feedwise",
    features: [
      "100 reviews per month",
      "Basic sentiment analysis",
      "Feature extraction",
      "1 project",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "1,000 reviews per month",
      "Advanced sentiment analysis",
      "Feature extraction & categorization",
      "Trend detection",
      "10 projects",
      "Priority support",
      "Export reports (PDF, CSV)"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited reviews",
      "All Pro features",
      "Custom AI model training",
      "API access",
      "Unlimited projects",
      "Dedicated account manager",
      "Custom integrations",
      "SSO & advanced security"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Choose the plan thats right for your business
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                rounded-xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                ${plan.popular
                  ? "bg-black border-violet-500/20 hover:shadow-white/15"
                  : "bg-black border-white/10 hover:border-white/20 hover:shadow-white/10"}
                relative group
              `}
            >
              {plan.popular &&
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-xs font-medium">
                  Most Popular
                </div>}

              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-violet-300 transition-colors duration-300">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
                  {plan.price}
                </span>
                {plan.period &&
                  <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {plan.period}
                  </span>}
              </div>
              <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors duration-300">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) =>
                  <li
                    key={i}
                    className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                )}
              </ul>

              <Button
                className={`w-full relative overflow-hidden group ${plan.popular
                  ? "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"}`}
                onClick={() => (window.location.href = "/signup")}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${plan.popular
                    ? "bg-gradient-to-r from-violet-700 to-cyan-700"
                    : "bg-white/20"}`}
                />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
