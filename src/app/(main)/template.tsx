"use client";

import React from "react";

/**
 * (main) 라우트 템플릿
 */
export default function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col">
      {children}
    </div>
  );
}
