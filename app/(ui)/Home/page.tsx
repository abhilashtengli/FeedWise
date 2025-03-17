"use client";

import React from "react";
import Report from "./report";

const page = () => {
  return (
    <div className="max-h-screen w-full flex justify-between">
      <div className="h-full w-full">
        <Report />
      </div>
    </div>
  );
};

export default page;
