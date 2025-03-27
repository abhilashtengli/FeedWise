"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/dashboard/dashboard"), {
  ssr: false
});
const page = () => {
  return (
    <div>
      <div className=" h-screen lg:ml-[18%] lg:w-[82%] overflow-hidden">
        <div className=" h-full w-full fixed">
          <Canvas style={{ width: "100%", height: "100%" }}>
            <Stars radius={70} count={1500} factor={3} fade speed={1} />
          </Canvas>
        </div>

        <SessionProvider>
          <Dashboard />
        </SessionProvider>
      </div>
    </div>
  );
};

export default page;
