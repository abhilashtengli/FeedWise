"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar & Sidebar on authentication pages
  const isAuthPage = ["/signin", "/signup"].includes(pathname);
  const isDashboard = pathname === "/";

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        {!isAuthPage && (
          <div className="w-[18%] h-full fixed left-0 top-0">
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
            className={` w-full h-full ${
              isDashboard ? "overflow-hidden" : "overflow-auto"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
