"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, MessageSquare, PanelLeft, Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Sample data for past reports
const reports = [
  {
    id: "1",
    title: "Wireless Headphones Review",
    date: new Date(2025, 2, 15),
    category: "today",
  },
  {
    id: "2",
    title: "Smart Watch Analysis",
    date: new Date(2025, 2, 15),
    category: "today",
  },
  {
    id: "3",
    title: "Bluetooth Speaker Feedback",
    date: new Date(2025, 2, 14),
    category: "yesterday",
  },
  {
    id: "4",
    title: "Fitness Tracker Ratings",
    date: new Date(2025, 2, 14),
    category: "yesterday",
  },
  {
    id: "5",
    title: "Wireless Earbuds Comparison",
    date: new Date(2025, 2, 10),
    category: "previous",
  },
  {
    id: "6",
    title: "Smartphone Camera Reviews",
    date: new Date(2025, 2, 9),
    category: "previous",
  },
  {
    id: "7",
    title: "Gaming Mouse Feedback",
    date: new Date(2025, 2, 8),
    category: "previous",
  },
]

// Group reports by category
const groupedReports = reports.reduce(
  (acc, report) => {
    if (!acc[report.category]) {
      acc[report.category] = []
    }
    acc[report.category].push(report)
    return acc
  },
  {} as Record<string, typeof reports>,
)

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeReport, setActiveReport] = useState<string | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: -5 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 0 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("relative flex h-full flex-col border-r border-border bg-card", isCollapsed && "w-0")}
    >
      <motion.div className="absolute right-0 top-4 z-10 -mr-3" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <PanelLeft className="h-3 w-3" />
        </Button>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 border-b border-border p-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <MessageSquare className="h-5 w-5" />
        </motion.div>
        <motion.span
          className="font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Feedwise
        </motion.span>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 p-3"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button variant="outline" className="w-full justify-start gap-2 text-sm">
            <Plus className="h-4 w-4" />
            New Analysis
          </Button>
        </motion.div>
      </motion.div>

      <div className="flex-1 overflow-auto">
        <motion.nav className="flex flex-col gap-1 p-2" variants={containerVariants} initial="hidden" animate="show">
          <motion.div
            className="flex items-center gap-2 px-3 py-1"
            variants={itemVariants}
            whileHover={{ x: 3, transition: { duration: 0.2 } }}
          >
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Explore GPTs</span>
          </motion.div>

          {/* Today's reports */}
          {groupedReports.today && groupedReports.today.length > 0 && (
            <>
              <motion.div className="sidebar-section mt-4" variants={sectionVariants}>
                Today
              </motion.div>
              {groupedReports.today.map((report, index) => (
                <motion.button
                  key={report.id}
                  variants={itemVariants}
                  whileHover={{
                    x: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn("sidebar-item", activeReport === report.id && "active")}
                  onClick={() => setActiveReport(report.id)}
                >
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                    <FileText className="h-4 w-4 shrink-0" />
                  </motion.div>
                  <span className="truncate text-left">{report.title}</span>
                </motion.button>
              ))}
            </>
          )}

          {/* Yesterday's reports */}
          {groupedReports.yesterday && groupedReports.yesterday.length > 0 && (
            <>
              <motion.div className="sidebar-section mt-4" variants={sectionVariants}>
                Yesterday
              </motion.div>
              {groupedReports.yesterday.map((report, index) => (
                <motion.button
                  key={report.id}
                  variants={itemVariants}
                  whileHover={{
                    x: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn("sidebar-item", activeReport === report.id && "active")}
                  onClick={() => setActiveReport(report.id)}
                >
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                    <FileText className="h-4 w-4 shrink-0" />
                  </motion.div>
                  <span className="truncate text-left">{report.title}</span>
                </motion.button>
              ))}
            </>
          )}

          {/* Previous reports */}
          {groupedReports.previous && groupedReports.previous.length > 0 && (
            <>
              <motion.div className="sidebar-section mt-4" variants={sectionVariants}>
                Previous 7 Days
              </motion.div>
              {groupedReports.previous.map((report, index) => (
                <motion.button
                  key={report.id}
                  variants={itemVariants}
                  whileHover={{
                    x: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn("sidebar-item", activeReport === report.id && "active")}
                  onClick={() => setActiveReport(report.id)}
                >
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                    <FileText className="h-4 w-4 shrink-0" />
                  </motion.div>
                  <span className="truncate text-left">{report.title}</span>
                </motion.button>
              ))}
            </>
          )}
        </motion.nav>
      </div>

      <motion.div
        className="border-t border-border p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full justify-start gap-2 text-sm">
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            <div className="flex flex-col items-start">
              <span>Upgrade plan</span>
              <span className="text-xs text-muted-foreground">More access to the best models</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </motion.aside>
  )
}

