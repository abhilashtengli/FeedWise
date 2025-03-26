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
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export function Navbar() {
  const [user, setUser] = useState();
  const [subDetails, setSubDetails] = useState();

  const fetchUser = () => {
    const response = axios.get();
  };
  return (
    <div>
      <header className="flex  items-center justify-between h-full  border-b border-border  px-4 py-2">
        <div className="flex items-center gap-2 invisible">
          <div>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="font-medium  justify-self-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="gap-2">
                  Feedwise
                  <div>
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
                  </div>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <Link href="/">
                <DropdownMenuItem>New Analysis</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-self-end  ">
          <div>
            <Button variant="ghost" size="sm" className="mr-2">
              Temporary
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    JD
                  </div>
                </Button>
              </div>
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
        </div>
      </header>
    </div>
  );
}
