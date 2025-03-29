"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
        : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between px-8">
          <Link href="/" className="flex items-center group">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:from-violet-300 group-hover:to-cyan-300"
            >
              Feedwise
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) =>
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <Link
                  href={link.href}
                  className="text-white/70 font-medium text-sm hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden md:block"
          >
            <Button
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white group relative overflow-hidden"
              onClick={() => (window.location.href = "/signup")}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 border-b border-white/10"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link =>
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
              <Button
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white w-full mt-2"
                onClick={() => (window.location.href = "/signup")}
              >
                Get Started
              </Button>
            </nav>
          </div>
        </motion.div>}
    </motion.header>
  );
}
