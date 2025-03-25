"use client"
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/dashboard/dashboard"), {
  ssr: true // Ensures it only loads on the client
});

export default function Home() {
  return (
    <div className="h-full">
      
      <Dashboard />
    </div>
  );
}
