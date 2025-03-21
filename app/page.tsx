import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/components/dashboard/dashboard";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar - Fixed on the left */}
        <div className="w-[18%] h-full fixed left-0 top-0 z-10">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <div className="ml-[18%] w-[82%] h-full flex flex-col">
          {/* Navbar - Fixed at the top of the content area */}
          <div className="h-[8%] w-full sticky top-0 z-10">
            <Navbar />
          </div>

          {/* Dashboard content - Takes remaining space */}
          <div className="w-full h-full overflow-auto ">
            <Dashboard />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
