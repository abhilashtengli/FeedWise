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
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/config";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [subDetails, setSubDetails] = useState({
    tokenLimit: 0,
    plan: ""
  });
  const { data: session } = useSession();

  const fetchUserAnsSubDetails = async () => {
    const response = await axios.get(baseUrl + "/user", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });
    const userData = response?.data?.data;
    if (!userData) {
      setUser("user Name");
      setEmail("user@gmail.com");
    }
    setUser(userData.user?.name);
    setEmail(userData.user?.email);
    const subResponse = await axios.get(baseUrl + "/subscription", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });
    const subResponseData = subResponse.data.data;

    setSubDetails((prevDetails) => ({
      ...prevDetails,
      tokenLimit: subResponseData.subscription.tokenLimit,
      plan: subResponseData.subscription.plan
    }));
  };
  useEffect(() => {
    fetchUserAnsSubDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                  <div className="flex h-8 w-8 items-center justify-center  rounded-full bg-purple-600 text-white">
                    {user.slice(0, 2).toUpperCase()}
                  </div>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center pr-2">
                    <span className="font-medium">{user} </span>
                    <span
                      className={`font-medium text-xs ${
                        subDetails.plan === "free"
                          ? "text-purple-500"
                          : "text-green-500"
                      }`}
                    >
                      {subDetails.plan.charAt(0).toUpperCase() +
                        subDetails.plan.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col w-full">
                  <span>Credits</span>
                  <span className="text-xs text-muted-foreground">
                    {subDetails.tokenLimit} credits remaining
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
