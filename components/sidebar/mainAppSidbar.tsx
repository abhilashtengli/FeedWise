"use client";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const MainAppSidebar = () => {
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup"].includes(pathname);

  return (
    <div>
      <SidebarProvider>
        <SessionProvider>
          {!isAuthPage &&
            <div>
              <AppSidebar />
            </div>}
        </SessionProvider>
      </SidebarProvider>
    </div>
  );
};

export default MainAppSidebar;
