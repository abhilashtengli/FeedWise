"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Testimonials", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Github className="h-5 w-5" />, href: "#" }
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Link href="/" className="inline-block group">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:from-violet-300 group-hover:to-cyan-300">
                  Feedwise
                </h3>
              </Link>
              <p className="text-white/70 max-w-md group-hover:text-white/90 transition-colors duration-300">
                Transform product reviews into actionable insights with our
                AI-powered analysis platform. Understand what your customers
                really think.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) =>
                  <a
                    key={index}
                    href={link.href}
                    className="h-10 w-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300 hover:scale-110 hover:border-violet-500/30"
                  >
                    {link.icon}
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((group, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) =>
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-violet-300 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Feedwise. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-white/50 hover:text-violet-300 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-violet-300 text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-violet-300 text-sm transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
