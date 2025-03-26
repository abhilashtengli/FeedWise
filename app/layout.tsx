// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// import ClientLayout from "@/components/ClientLayout";
import { headers } from "next/headers";
import { Navbar } from "@/components/navbar";
import connectDB from "@/lib/database";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import axios from "axios";
import { baseUrl } from "@/lib/config";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Feedwise",
  description: "Feedwise helps to analyze product feedback and reviews."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAuthPage = ["/signin", "/signup"].includes(pathname);
   await connectDB();
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

   let reports = [];
  if (session?.accessToken) {
    try {
      const response = await axios.get(baseUrl + "/reports", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      reports = response.data?.data?.reports;
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  }


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-black text-white`}
      >
        <Toaster />
        <div className="flex h-screen w-screen">
          {!isAuthPage && (
            <div className="w-[18%] h-full fixed left-0 top-0 z-20 bg-black">
              <AppSidebar initialReports={reports} session={session} />
            </div>
          )}
          <div
            className={`${
              isAuthPage ? "w-full" : "ml-[18%] w-[82%]"
            } flex flex-col`}
          >
            {!isAuthPage && (
              <div className="h-[8%] w-full sticky top-0 shadow-md z-10">
                <Navbar />
              </div>
            )}
            <div className="w-full h-full overflow-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
