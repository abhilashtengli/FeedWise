// app/components/app-sidebar-server.tsx
import { getServerSession } from "next-auth/next";
import { AppSidebar } from "./app-sidebar";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/database";
import axios from "axios";
import { baseUrl } from "@/lib/config";

export async function AppSidebarServer() {
  await connectDB();
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!session) {
    return <AppSidebar initialReports={[]} />;
  }

  try {
    const response = await axios.get(baseUrl + "/reports", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.data?.data?.reports) {
      return <AppSidebar initialReports={[]} />;
    }

    const reports = response.data?.data?.reports;

    return <AppSidebar initialReports={reports} />;
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return <AppSidebar initialReports={[]} />;
  }
}
