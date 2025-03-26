"use client";
import Dashboard from "@/components/dashboard/dashboard";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-full">
      <SessionProvider>
        <Dashboard />
      </SessionProvider>
    </div>
  );
}
