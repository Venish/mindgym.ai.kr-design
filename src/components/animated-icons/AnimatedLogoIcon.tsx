"use client";

import React from "react";

interface AnimatedLogoIconProps {
  className?: string;
  size?: number;
}

/**
 * AnimatedLogoIcon: 마인드짐 잎사귀 순차 등장 로고 애니메이션
 * - leaf-2 ➔ leaf-3 ➔ leaf-4 ➔ leaf-5: 0.85s ease-in-out opacity 페이드인
 * - leaf-1: 딜레이를 0.95s로 조율하여 5번 피어남과 자연스럽게 이어지며 0.38s Snap-In 꽂힘
 */
export function AnimatedLogoIcon({ className = "", size = 64 }: AnimatedLogoIconProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <style>{`
        /* 기본 초기 상태: 100% 투명 보장 */
        .animated-logo-path {
          opacity: 0;
          transform-origin: center;
          transform-box: fill-box;
          animation-fill-mode: forwards;
        }

        /* 2,3,4,5번 잎사귀: Opacity 흐름에 ease-in-out 가감속 곡선 적용 */
        @keyframes leafFadeInEase {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 0.35;
          }
          80% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
          }
        }

        /* 1번 잎사귀 전용: 빠른 속도로 착! 꽂히는 스피디 Snap-In 키프레임 */
        @keyframes leaf1SnapIn {
          0% {
            opacity: 0;
            transform: translate(-16px, -30px) scale(1.15);
          }
          75% {
            opacity: 1;
            transform: translate(1px, 1px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        /* 등장 완료 후 은은한 지속 펄스 */
        @keyframes leafSubtlePulse {
          0%, 100% {
            opacity: 0.88;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        /* 2 ➔ 3 ➔ 4 ➔ 5 번 순차 등장 */
        .leaf-2 {
          animation: leafFadeInEase 0.85s ease-in-out forwards,
                     leafSubtlePulse 2.4s ease-in-out 1.9s infinite;
          animation-delay: 0.05s, 1.9s;
        }
        .leaf-3 {
          animation: leafFadeInEase 0.85s ease-in-out forwards,
                     leafSubtlePulse 2.4s ease-in-out 1.9s infinite;
          animation-delay: 0.20s, 1.9s;
        }
        .leaf-4 {
          animation: leafFadeInEase 0.85s ease-in-out forwards,
                     leafSubtlePulse 2.4s ease-in-out 1.9s infinite;
          animation-delay: 0.35s, 1.9s;
        }
        .leaf-5 {
          animation: leafFadeInEase 0.85s ease-in-out forwards,
                     leafSubtlePulse 2.4s ease-in-out 1.9s infinite;
          animation-delay: 0.50s, 1.9s;
        }

        /* 1번 잎사귀: 딜레이 0.95s 로 조율 (5번 피어남과 자연스럽게 연동되어 착! 꽂힘) */
        .leaf-1 {
          animation: leaf1SnapIn 0.38s cubic-bezier(0.16, 1.35, 0.4, 1) forwards,
                     leafSubtlePulse 2.4s ease-in-out 1.9s infinite;
          animation-delay: 0.95s, 1.9s;
        }
      `}</style>
      <svg
        width={size}
        height={Math.round(size * (140 / 123))}
        viewBox="0 0 123 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* 1. 상단/좌상 잎사귀 (0.95s 딜레이 후 0.38s 고속 Snap-In 꽂힘) */}
        <path
          className="animated-logo-path leaf-1"
          d="M49.6913 67.24C46.7113 67.24 43.7313 66.45 41.0113 64.88L2.95126 42.91C0.131264 41.28 -0.83877 37.67 0.79123 34.85C2.42123 32.03 6.03123 31.05 8.85123 32.69L46.9112 54.66C49.4212 56.11 51.6412 55.15 52.4712 54.66C53.3112 54.18 55.2513 49.85 55.2513 49.85V5.90001C55.2513 2.64001 57.8912 0 61.1512 0C64.4112 0 67.0512 2.64001 67.0512 5.90001V49.85C67.0512 56.12 63.8112 61.74 58.3712 64.88C55.6512 66.45 52.6713 67.24 49.6913 67.24Z"
          fill="#00C474"
        />
        {/* 2. 우상 잎사귀 (1번째 등장: 0.05s) */}
        <path
          className="animated-logo-path leaf-2"
          d="M80.5713 64.39C78.5313 64.39 76.5513 63.33 75.4613 61.44C73.8313 58.62 74.7913 55.01 77.6213 53.38L113.451 32.69C116.271 31.06 119.881 32.03 121.511 34.85C123.141 37.67 122.171 41.28 119.351 42.91L83.5213 63.6C82.5913 64.14 81.5713 64.39 80.5713 64.39Z"
          fill="#00C474"
        />
        {/* 3. 우하 잎사귀 (2번째 등장: 0.20s) */}
        <path
          className="animated-logo-path leaf-3"
          d="M116.401 107.5C115.401 107.5 114.381 107.24 113.451 106.71L77.6213 86.02C74.7913 84.39 73.8313 80.78 75.4613 77.96C77.0813 75.13 80.6913 74.16 83.5213 75.8L119.351 96.49C122.171 98.12 123.141 101.72 121.511 104.55C120.421 106.44 118.441 107.5 116.401 107.5Z"
          fill="#00C474"
        />
        {/* 4. 하단 줄기 (3번째 등장: 0.35s) */}
        <path
          className="animated-logo-path leaf-4"
          d="M61.1512 139.4C57.8912 139.4 55.2512 136.75 55.2512 133.5V92.11C55.2512 88.86 57.8912 86.21 61.1512 86.21C64.4112 86.21 67.0512 88.86 67.0512 92.11V133.5C67.0512 136.75 64.4112 139.4 61.1512 139.4Z"
          fill="#00C474"
        />
        {/* 5. 좌하 잎사귀 (4번째 등장: 0.50s) */}
        <path
          className="animated-logo-path leaf-5"
          d="M5.91123 107.5C3.87123 107.5 1.88123 106.44 0.79123 104.55C-0.83877 101.73 0.38123 98.12 2.95126 96.49L38.7912 75.8C41.6112 74.16 45.2212 75.14 46.8512 77.96C48.4812 80.78 47.5113 84.39 44.6913 86.02L8.85123 106.71C7.92123 107.24 6.91123 107.5 5.91123 107.5Z"
          fill="#00C474"
        />
      </svg>
    </div>
  );
}
