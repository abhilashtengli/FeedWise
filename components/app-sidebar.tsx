"use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FileText, MessageSquare, Plus, Sparkles } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader
// } from "@/components/ui/sidebar";
// import Link from "next/link";

// // Sample data for past reports
// const reports = [
//   {
//     id: "1",
//     title: "Wireless Headphones Review",
//     date: new Date(2025, 2, 15),
//     category: "today"
//   },
//   {
//     id: "2",
//     title: "Smart Watch Analysis",
//     date: new Date(2025, 2, 15),
//     category: "today"
//   },
//   {
//     id: "3",
//     title: "Bluetooth Speaker Feedback",
//     date: new Date(2025, 2, 14),
//     category: "yesterday"
//   },
//   {
//     id: "4",
//     title: "Fitness Tracker Ratings",
//     date: new Date(2025, 2, 14),
//     category: "yesterday"
//   },
//   {
//     id: "5",
//     title: "Wireless Earbuds Comparison",
//     date: new Date(2025, 2, 10),
//     category: "previous"
//   },
//   {
//     id: "6",
//     title: "Smartphone Camera Reviews",
//     date: new Date(2025, 2, 9),
//     category: "previous"
//   },
//   {
//     id: "7",
//     title: "Gaming Mouse Feedback",
//     date: new Date(2025, 2, 8),
//     category: "previous"
//   }
// ];

// // Group reports by category
// const groupedReports = reports.reduce((acc, report) => {
//   if (!acc[report.category]) {
//     acc[report.category] = [];
//   }
//   acc[report.category].push(report);
//   return acc;
// }, {} as Record<string, typeof reports>);

// export function AppSidebar() {
//   const [activeReport, setActiveReport] = useState<string | null>(null);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     show: { opacity: 1, x: 0 }
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: -5 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <Sidebar className="border border-border  w-[18%] bg-black">
//       <SidebarHeader>
//         <motion.div className="flex items-center gap-2 p-3">
//           <motion.div>
//             <MessageSquare className="h-5 w-5" />
//           </motion.div>
//           <motion.span className="font-semibold">Feedwise</motion.span>
//         </motion.div>

//         <motion.div className="flex items-center gap-2 p-3">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full"
//           >
//             <Link href="/">
//               <Button
//                 variant="outline"
//                 className="w-full justify-start gap-2 text-sm"
//               >
//                 <Plus className="h-4 w-4" />
//                 New Analysis
//               </Button>
//             </Link>
//           </motion.div>
//         </motion.div>
//       </SidebarHeader>

//       <SidebarContent>
//         <motion.nav className="flex flex-col gap-1 p-2">
//           {/* Today's reports */}
//           {groupedReports.today && groupedReports.today.length > 0 && (
//             <>
//               <motion.div
//                 className="sidebar-section mt-4"
//                 variants={sectionVariants}
//               >
//                 Today
//               </motion.div>
//               {groupedReports.today.map((report, index) => (
//                 <motion.button
//                   key={report.id}
//                   variants={itemVariants}
//                   whileHover={{
//                     x: 3,
//                     backgroundColor: "rgba(255, 255, 255, 0.06)",
//                     transition: { duration: 0.2 }
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={cn(
//                     "sidebar-item",
//                     activeReport === report.id && "active"
//                   )}
//                   onClick={() => setActiveReport(report.id)}
//                 >
//                   <motion.div
//                     initial={{ rotate: 0 }}
//                     whileHover={{ rotate: 5 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <FileText className="h-4 w-4 shrink-0" />
//                   </motion.div>
//                   <span className="truncate text-left">{report.title}</span>
//                 </motion.button>
//               ))}
//             </>
//           )}

//           {/* Yesterday's reports */}
//           {groupedReports.yesterday && groupedReports.yesterday.length > 0 && (
//             <>
//               <motion.div
//                 className="sidebar-section mt-4"
//                 variants={sectionVariants}
//               >
//                 Yesterday
//               </motion.div>
//               {groupedReports.yesterday.map((report, index) => (
//                 <motion.button
//                   key={report.id}
//                   variants={itemVariants}
//                   whileHover={{
//                     x: 3,
//                     backgroundColor: "rgba(255, 255, 255, 0.06)",
//                     transition: { duration: 0.2 }
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={cn(
//                     "sidebar-item",
//                     activeReport === report.id && "active"
//                   )}
//                   onClick={() => setActiveReport(report.id)}
//                 >
//                   <motion.div
//                     initial={{ rotate: 0 }}
//                     whileHover={{ rotate: 5 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <FileText className="h-4 w-4 shrink-0" />
//                   </motion.div>
//                   <span className="truncate text-left">{report.title}</span>
//                 </motion.button>
//               ))}
//             </>
//           )}

//           {/* Previous reports */}
//           {groupedReports.previous && groupedReports.previous.length > 0 && (
//             <>
//               <motion.div
//                 className="sidebar-section mt-4"
//                 variants={sectionVariants}
//               >
//                 Previous 7 Days
//               </motion.div>
//               {groupedReports.previous.map((report, index) => (
//                 <motion.button
//                   key={report.id}
//                   variants={itemVariants}
//                   whileHover={{
//                     x: 3,
//                     backgroundColor: "rgba(255, 255, 255, 0.06)",
//                     transition: { duration: 0.2 }
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={cn(
//                     "sidebar-item",
//                     activeReport === report.id && "active"
//                   )}
//                   onClick={() => setActiveReport(report.id)}
//                 >
//                   <motion.div
//                     initial={{ rotate: 0 }}
//                     whileHover={{ rotate: 5 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <FileText className="h-4 w-4 shrink-0" />
//                   </motion.div>
//                   <span className="truncate text-left">{report.title}</span>
//                 </motion.button>
//               ))}
//             </>
//           )}
//         </motion.nav>
//       </SidebarContent>

//       <SidebarFooter>
//         <motion.div className="p-3">
//           <motion.div
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <Button
//               variant="outline"
//               className="w-full justify-start gap-2 text-sm"
//             >
//               <motion.div>
//                 <Sparkles className="h-4 w-4" />
//               </motion.div>
//               <div className="flex flex-col items-start">
//                 <span>Upgrade plan</span>
//                 <span className="text-xs text-muted-foreground">
//                   More access to the best models
//                 </span>
//               </div>
//             </Button>
//           </motion.div>
//         </motion.div>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { baseUrl } from "@/lib/config";
import axios from "axios";

// Define the report type based on the API response
interface Report {
  _id: string;
  productName: string;
  createdAt: string;
}

export function AppSidebar() {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Function to fetch reports
  const fetchReports = async () => {
    try {
      if (status !== "authenticated" || !session?.accessToken) {
        setLoading(false);
        return;
      }

      const token = session.accessToken;

      const response = await axios.get(baseUrl + "/reports", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.data && response.data.data.reports) {
        setReports(response.data.data.reports);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setReports([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
      setLoading(false);
    }
  };

  // Fetch reports when session changes
  useEffect(() => {
    if (status === "authenticated") {
      fetchReports();

      // Clean up interval on component unmount or session change
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  // Function to check if a date is today
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Group reports into "Today" and "Past"
  const todayReports = reports.filter((report) => isToday(report.createdAt));
  const pastReports = reports.filter((report) => !isToday(report.createdAt));

  // Handle report click
  const handleReportClick = (reportId: string) => {
    setActiveReport(reportId);
    router.push(`/report/${reportId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: -5 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Sidebar className="border border-border w-[18%] bg-black">
      <SidebarHeader>
        <motion.div className="flex items-center gap-2 p-3">
          <motion.div>
            <MessageSquare className="h-5 w-5" />
          </motion.div>
          <motion.span className="font-semibold">Feedwise</motion.span>
        </motion.div>

        <motion.div className="flex items-center gap-2 p-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                New Analysis
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <motion.nav
          className="flex flex-col gap-1 p-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {status === "loading" || loading ? (
            <div className="flex justify-center items-center h-20 text-muted-foreground">
              Loading reports...
            </div>
          ) : status === "unauthenticated" ? (
            <div className="text-center py-8 text-muted-foreground">
              Please sign in to view reports
            </div>
          ) : (
            <>
              {/* Today's reports */}
              {todayReports.length > 0 && (
                <>
                  <motion.div
                    className="text-xs uppercase text-muted-foreground font-medium tracking-wider px-2 pt-4 pb-2"
                    variants={sectionVariants}
                  >
                    Today
                  </motion.div>
                  {todayReports.map((report) => (
                    <motion.button
                      key={report._id}
                      variants={itemVariants}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                        activeReport === report._id
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:text-white"
                      )}
                      onClick={() => handleReportClick(report._id)}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                      </motion.div>
                      <span className="truncate text-left">
                        {report.productName}
                      </span>
                    </motion.button>
                  ))}
                </>
              )}

              {/* Past reports */}
              {pastReports.length > 0 && (
                <>
                  <motion.div
                    className="text-xs uppercase text-muted-foreground font-medium tracking-wider px-2 pt-4 pb-2"
                    variants={sectionVariants}
                  >
                    Past
                  </motion.div>
                  {pastReports.map((report) => (
                    <motion.button
                      key={report._id}
                      variants={itemVariants}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                        activeReport === report._id
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:text-white"
                      )}
                      onClick={() => handleReportClick(report._id)}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                      </motion.div>
                      <span className="truncate text-left">
                        {report.productName}
                      </span>
                    </motion.button>
                  ))}
                </>
              )}

              {reports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No reports found
                </div>
              )}
            </>
          )}
        </motion.nav>
      </SidebarContent>

      <SidebarFooter>
        <motion.div className="p-3">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-sm"
            >
              <motion.div>
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <div className="flex flex-col items-start">
                <span>Upgrade plan</span>
                <span className="text-xs text-muted-foreground">
                  More access to the best models
                </span>
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}
