"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Prevents Next.js hydration issues

  const isAuthPage = ["/signin", "/signup"].includes(pathname);
  const isDashboard = pathname === "/";

  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          {!isAuthPage && (
            <div className="w-[18%] h-full fixed left-0 top-0 z-20 bg-black">
              <AppSidebar />
            </div>
          )}
          <div
            className={`h-full ${
              isAuthPage ? "w-full" : "ml-[18%] w-[82%]"
            } flex flex-col`}
          >
            {!isAuthPage && (
              <div className="h-[8%] w-full sticky top-0 shadow-md z-10">
                <Navbar />
              </div>
            )}
            <div
              className={`w-full h-full ${
                isDashboard ? "overflow-hidden" : "overflow-auto"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
