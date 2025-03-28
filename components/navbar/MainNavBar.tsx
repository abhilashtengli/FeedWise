"use client";

import React from "react";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const MainNavBar = () => {
  const pathname = usePathname();
  const isAuthPage = ["/", "/signin", "/signup"].includes(pathname);
  return (
    <div>
      <SessionProvider>
        {!isAuthPage && (
          <div className="w-[82%] ml-[18%] bg-black bg-opacity-65">
            <Navbar />
          </div>
        )}
      </SessionProvider>
    </div>
  );
};

export default MainNavBar;
