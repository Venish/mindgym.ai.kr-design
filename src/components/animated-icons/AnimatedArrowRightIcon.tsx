"use client";

import React from "react";

interface AnimatedIconProps {
  className?: string;
  size?: number;
}

export function AnimatedArrowRightIcon({ className = "", size = 18 }: AnimatedIconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <style>{`
        @keyframes ai-arrow-pulse-loop {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3.5px); }
        }
        .ai-arrow-path {
          animation: ai-arrow-pulse-loop 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <svg
        className="ai-arrow-svg overflow-visible"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ai-arrow-path"
          d="M6 3.5L10.5 8L6 12.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
