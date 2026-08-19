"use client";

import React from "react";

interface AnimatedLogoIconProps {
  className?: string;
  size?: number;
}

export function AnimatedLogoIcon({ className = "", size = 64 }: AnimatedLogoIconProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <style>{`
        @keyframes leafPulse {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.96);
          }
          30%, 65% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .animated-logo-path {
          transform-origin: center;
          transform-box: fill-box;
          animation: leafPulse 1.6s ease-in-out infinite;
        }
        .leaf-1 { animation-delay: 0.0s; }
        .leaf-2 { animation-delay: 0.32s; }
        .leaf-3 { animation-delay: 0.64s; }
        .leaf-4 { animation-delay: 0.96s; }
        .leaf-5 { animation-delay: 1.28s; }
      `}</style>
      <svg
        width={size}
        height={Math.round(size * (140 / 123))}
        viewBox="0 0 123 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* 1. 상단/좌상 잎사귀 */}
        <path
          className="animated-logo-path leaf-1"
          d="M49.6913 67.24C46.7113 67.24 43.7313 66.45 41.0113 64.88L2.95126 42.91C0.131264 41.28 -0.83877 37.67 0.79123 34.85C2.42123 32.03 6.03123 31.05 8.85123 32.69L46.9112 54.66C49.4212 56.11 51.6412 55.15 52.4712 54.66C53.3112 54.18 55.2513 52.74 55.2513 49.85V5.90001C55.2513 2.64001 57.8912 0 61.1512 0C64.4112 0 67.0512 2.64001 67.0512 5.90001V49.85C67.0512 56.12 63.8112 61.74 58.3712 64.88C55.6512 66.45 52.6713 67.24 49.6913 67.24Z"
          fill="#00C474"
        />
        {/* 2. 우상 잎사귀 */}
        <path
          className="animated-logo-path leaf-2"
          d="M80.5713 64.39C78.5313 64.39 76.5513 63.33 75.4613 61.44C73.8313 58.62 74.7913 55.01 77.6213 53.38L113.451 32.69C116.271 31.06 119.881 32.03 121.511 34.85C123.141 37.67 122.171 41.28 119.351 42.91L83.5213 63.6C82.5913 64.14 81.5713 64.39 80.5713 64.39Z"
          fill="#00C474"
        />
        {/* 3. 우하 잎사귀 */}
        <path
          className="animated-logo-path leaf-3"
          d="M116.401 107.5C115.401 107.5 114.381 107.24 113.451 106.71L77.6213 86.02C74.7913 84.39 73.8313 80.78 75.4613 77.96C77.0813 75.13 80.6913 74.16 83.5213 75.8L119.351 96.49C122.171 98.12 123.141 101.72 121.511 104.55C120.421 106.44 118.441 107.5 116.401 107.5Z"
          fill="#00C474"
        />
        {/* 4. 하단 줄기 */}
        <path
          className="animated-logo-path leaf-4"
          d="M61.1512 139.4C57.8912 139.4 55.2512 136.75 55.2512 133.5V92.11C55.2512 88.86 57.8912 86.21 61.1512 86.21C64.4112 86.21 67.0512 88.86 67.0512 92.11V133.5C67.0512 136.75 64.4112 139.4 61.1512 139.4Z"
          fill="#00C474"
        />
        {/* 5. 좌하 잎사귀 */}
        <path
          className="animated-logo-path leaf-5"
          d="M5.91123 107.5C3.87123 107.5 1.88123 106.44 0.79123 104.55C-0.83877 101.73 0.38123 98.12 2.95126 96.49L38.7912 75.8C41.6112 74.16 45.2212 75.14 46.8512 77.96C48.4812 80.78 47.5113 84.39 44.6913 86.02L8.85123 106.71C7.92123 107.24 6.91123 107.5 5.91123 107.5Z"
          fill="#00C474"
        />
      </svg>
    </div>
  );
}
