"use client";
import Dashboard from "@/components/dashboard/dashboard";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-full ml-[18%] w-[82%] overflow-hidden">
      <SessionProvider>
        <Dashboard />
      </SessionProvider>
    </div>
  );
}
