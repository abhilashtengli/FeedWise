"use client";

import { motion } from "framer-motion";
import { LogOut, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <motion.header
      className="flex h-full  border-b border-border items-center justify-between px-4 py-2"
      // initial={{ y: -20, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center gap-2"
        // initial={{ opacity: 0, x: -20 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="font-medium"
        // initial={{ y: -20, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ delay: 0.3, duration: 0.3 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="gap-2">
                Feedwise
                <motion.div
                // animate={{ rotate: [0, 180] }}
                // transition={{ duration: 0.5, delay: 1 }}
                >
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>New Analysis</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div
        className="flex items-center"
        // initial={{ opacity: 0, x: 20 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.5, duration: 0.3 }}
        // whileHover={{ scale: 1.05 }}
        // whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" className="mr-2">
            Temporary
          </Button>
        </motion.div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
            // initial={{ scale: 0 }}
            // animate={{ scale: 1 }}
            // transition={{
            //   delay: 0.6,
            //   duration: 0.5,
            //   type: "spring",
            //   stiffness: 400,
            //   damping: 10
            // }}
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                  JD
                </div>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">
                  john.doe@example.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col w-full">
                <span>Credits</span>
                <span className="text-xs text-muted-foreground">
                  150 credits remaining
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.header>
  );
}
