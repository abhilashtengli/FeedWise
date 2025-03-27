// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// import ClientLayout from "@/components/ClientLayout";
import MainAppSidebar from "@/components/sidebar/mainAppSidbar";
import MainNavBar from "@/components/navbar/MainNavBar";

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
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-black text-white`}
      >
        <Toaster />
        <div className="flex h-screen w-full justify-between">
          <div className="w-[18%] h-full fixed left-0 top-0 z-20 bg-black">
            <MainAppSidebar />
          </div>
          <div className="w-full">
            <div className="h-[8%]  sticky top-0 shadow-md z-10">
              <MainNavBar />
            </div>

            <div className="w-full h-full ">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
