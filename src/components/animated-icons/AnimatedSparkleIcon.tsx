"use client";

import React from "react";

interface AnimatedIconProps {
  className?: string;
  size?: number;
}

export function AnimatedSparkleIcon({ className = "", size = 24 }: AnimatedIconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <style>{`
        @keyframes ai-gradient-wave-1 {
          0% { stop-color: #00C474; }
          33% { stop-color: #55DFA0; }
          66% { stop-color: #0D9488; }
          100% { stop-color: #00C474; }
        }
        @keyframes ai-gradient-wave-2 {
          0% { stop-color: #0D9488; }
          33% { stop-color: #00C474; }
          66% { stop-color: #55DFA0; }
          100% { stop-color: #0D9488; }
        }
        @keyframes ai-wave-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .ai-wave-stop1 {
          animation: ai-gradient-wave-1 4s ease-in-out infinite;
        }
        .ai-wave-stop2 {
          animation: ai-gradient-wave-2 4s ease-in-out infinite;
        }
        .ai-wave-path {
          animation: ai-wave-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
      <svg
        className="ai-sparkle-svg overflow-visible"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sparkle-grad-wave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="ai-wave-stop1" />
            <stop offset="100%" className="ai-wave-stop2" />
          </linearGradient>
        </defs>

        {/* 대형 중앙 메인 별 (Scale / Rotate 제거, Gradient Wave 전용) */}
        <path
          className="ai-wave-path"
          d="M12 1.5L14.7 9.3L22.5 12L14.7 14.7L12 22.5L9.3 14.7L1.5 12L9.3 9.3L12 1.5Z"
          fill="url(#sparkle-grad-wave)"
        />

        {/* 보조 물결 스파클 1 */}
        <path
          className="ai-wave-path"
          style={{ animationDelay: "0.8s" }}
          d="M19.5 2.5L20.7 6L24.2 7.2L20.7 8.4L19.5 11.9L18.3 8.4L14.8 7.2L18.3 6L19.5 2.5Z"
          fill="url(#sparkle-grad-wave)"
          opacity="0.85"
        />

        {/* 보조 물결 스파클 2 */}
        <path
          className="ai-wave-path"
          style={{ animationDelay: "1.5s" }}
          d="M4.5 16.5L5.4 19L7.9 19.9L5.4 20.8L4.5 23.3L3.6 20.8L1.1 19.9L3.6 19L4.5 16.5Z"
          fill="url(#sparkle-grad-wave)"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}
