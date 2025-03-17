import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import Dashboard from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <>
      <div className="max-h-screen w-full flex justify-between">
        <AppSidebar />
        <div className="h-full w-[82%] ">
          <Navbar />
          <Dashboard />
        </div>
      </div>
    </>
  );
}
