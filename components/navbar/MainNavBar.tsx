"use client";

import React from "react";
import { Navbar } from "./navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const MainNavBar = () => {
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup"].includes(pathname);
  return (
    <SessionProvider>
      {!isAuthPage &&
        <div>
          <Navbar />
        </div>}
    </SessionProvider>
  );
};

export default MainNavBar;
