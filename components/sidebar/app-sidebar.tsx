"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/config";
import axios from "axios";
import { ReportListSkeleton } from "../reportListSkeleton";
import { useSession } from "next-auth/react";

interface Report {
  _id: string;
  productName: string;
  createdAt: string;
}

interface AppSidebarProps {
  initialReports?: Report[];
}

export function AppSidebar({ initialReports = [] }: AppSidebarProps) {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  // const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedReports = localStorage.getItem("reports");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
      setLoading(false);
    } else {
      fetchReports();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      if (status !== "authenticated" || !session?.accessToken) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${baseUrl}/reports`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });

      if (response.data?.data?.reports) {
        setReports(response.data.data.reports);
        localStorage.setItem(
          "reports",
          JSON.stringify(response.data.data.reports)
        );
      } else {
        console.error("Unexpected API response structure:", response.data);
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (initialReports.length === 0 && status === "authenticated") {
  //     fetchReports();
  //   }

  //   // if (pathname.startsWith("/report")) {
  //   //   fetchReports();
  //   // }
  // }, [status, pathname]);

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const todayReports = sortedReports.filter((report) =>
    isToday(report.createdAt)
  );
  const pastReports = sortedReports.filter(
    (report) => !isToday(report.createdAt)
  );

  const handleReportClick = (reportId: string) => {
    setActiveReport(reportId);
    setTimeout(() => {
      router.replace(`/report/${reportId}`);
    }, 10);
  };

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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: -2 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <SidebarProvider>
      <div>
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
              className={cn(
                "flex flex-col gap-1 p-2",
                status === "loading" || loading
                  ? "overflow-hidden h-full"
                  : "overflow-auto"
              )}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {status === "loading" || loading ? (
                <div className="flex justify-center items-start text-muted-foreground h-full max-h-full overflow-hidden">
                  <ReportListSkeleton todayCount={4} pastCount={10} />
                </div>
              ) : status === "unauthenticated" ? (
                <div className="text-center py-8 text-muted-foreground">
                  Please sign in to view reports
                </div>
              ) : (
                <>
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
      </div>
    </SidebarProvider>
  );
}
