"use client";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { SessionProvider } from "next-auth/react";

const MainAppSidbar = () => {
  return (
    <div>
        <SessionProvider>
          <AppSidebar />
        </SessionProvider>
    </div>
  );
};

export default MainAppSidbar;
