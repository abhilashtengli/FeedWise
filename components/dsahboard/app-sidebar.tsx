"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  CalendarIcon,
  FileText,
  MessageSquarePlus,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

// Sample data for past reports
const pastReports = [
  {
    id: "1",
    productName: "Wireless Headphones",
    date: new Date(2025, 2, 15)
  },
  {
    id: "2",
    productName: "Smart Watch",
    date: new Date(2025, 2, 10)
  },
  {
    id: "3",
    productName: "Bluetooth Speaker",
    date: new Date(2025, 2, 5)
  },
  {
    id: "4",
    productName: "Fitness Tracker",
    date: new Date(2025, 1, 28)
  },
  {
    id: "5",
    productName: "Wireless Earbuds",
    date: new Date(2025, 1, 20)
  }
];

export function AppSidebar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = pastReports.filter(report =>
    report.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    // In a real app, this would create a new chat session
    console.log("Creating new chat");
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-2"
        >
          <Button
            variant="default"
            className="w-full justify-start gap-2"
            onClick={handleNewChat}
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </Button>
        </motion.div>
        <div className="relative px-2 pb-2">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Past Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredReports.length > 0
                ? filteredReports.map((report, index) =>
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton className="justify-start gap-2">
                          <FileText className="h-4 w-4" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm">
                              {report.productName}
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {format(report.date, "MMM d, yyyy")}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  )
                : <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No reports found
                  </div>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
