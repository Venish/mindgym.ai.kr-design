"use client";

import React from "react";

interface AnimatedLogoTextProps {
  className?: string;
  height?: number;
}

/**
 * AnimatedLogoText: mindgym 텍스트 글자(7자)가 바닥에서 한 자씩 순차적으로 솟아오르는 SVG 애니메이션
 * - 로고 1번 잎사귀가 착 꽂히는 시점(1.00s)과 완벽 연동되어 끊김 없이 차르륵 이어서 솟구침
 */
export function AnimatedLogoText({ className = "", height = 28 }: AnimatedLogoTextProps) {
  // viewBox: 399 x 110 (Aspect ratio ~3.62)
  const width = Math.round(height * (399 / 110));

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <style>{`
        /* 초기 상태: 100% 안 보이게 숨김 */
        .text-char-path {
          opacity: 0;
          transform-origin: center bottom;
          transform-box: fill-box;
          animation-fill-mode: forwards;
        }

        /* 한 자씩 바닥에서 솟아오르는 팝업 페이드인 모션 */
        @keyframes charRiseUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* m-i-n-d-g-y-m 7자 순차 솟구침 (1번 잎사귀가 착 꽂히는 1.00s 시점과 즉시 연결) */
        .char-m1 {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.00s;
        }
        .char-i {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.08s;
        }
        .char-n {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.16s;
        }
        .char-d {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.24s;
        }
        .char-g {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.32s;
        }
        .char-y {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.40s;
        }
        .char-m2 {
          animation: charRiseUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.48s;
        }
      `}</style>
      <svg
        width={width}
        height={height}
        viewBox="0 0 399 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* 1자: m */}
        <path
          className="text-char-path char-m1"
          d="M53 25.04C46.83 25.04 41.26 27.66 37.31 31.82C33.37 27.66 27.8 25.04 21.63 25.04C9.7 25.04 0 34.74 0 46.66V75.84H11.88V46.66C11.88 41.29 16.25 36.91 21.63 36.91C27 36.91 31.38 41.29 31.38 46.66V75.84H43.25V46.66C43.25 41.29 47.63 36.91 53 36.91C58.38 36.91 62.75 41.29 62.75 46.66V75.84H74.63V46.66C74.63 34.74 64.93 25.04 53 25.04Z"
          fill="#18181b"
        />
        {/* 2자: i */}
        <path
          className="text-char-path char-i"
          d="M81.41 75.85H93.28V25.01H81.41V75.85Z"
          fill="#18181b"
        />
        {/* 3자: n */}
        <path
          className="text-char-path char-n"
          d="M125.02 25.04C111.18 25.04 99.9301 36.29 99.9301 50.12V75.84H111.8V50.12C111.8 42.84 117.73 36.91 125.02 36.91C132.3 36.91 138.23 42.84 138.23 50.12V75.84H150.1V50.12C150.1 36.29 138.85 25.04 125.02 25.04Z"
          fill="#18181b"
        />
        {/* 4자: d */}
        <path
          className="text-char-path char-d"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M197.59 0H209.46V75.85H197.59V72.15C193.2 75.24 187.87 77.08 182.11 77.08C167.28 77.08 155.21 65.02 155.21 50.19C155.21 35.36 167.28 23.29 182.11 23.29C187.87 23.29 193.2 25.13 197.59 28.23V0ZM197.13 50.18C197.13 41.9 190.39 35.16 182.11 35.16C173.82 35.16 167.08 41.9 167.08 50.18C167.08 58.47 173.82 65.21 182.11 65.21C190.39 65.21 197.13 58.47 197.13 50.18Z"
          fill="#18181b"
        />
        {/* 5자: g */}
        <path
          className="text-char-path char-g"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M269.4 25.05H269.94V36.78C267.84 36.79 266.54 36.91 264.79 37.96C266.63 41.57 267.68 45.64 267.68 49.96C267.68 57.54 264.48 64.37 259.38 69.22C264.2 72.99 267.3 78.84 267.3 85.41V88.9C267.3 100.25 258.07 109.49 246.71 109.49H235.62C224.27 109.49 215.03 100.25 215.03 88.9V85.41C215.037 84.1433 215.157 82.89 215.39 81.65H227.65C227.1 82.83 226.78 84.1 226.78 85.41V88.9C226.78 93.78 230.75 97.75 235.62 97.75H246.71C251.59 97.75 255.56 93.78 255.56 88.9V85.41C255.56 80.54 251.59 76.57 246.71 76.57H241.49V76.55C241.357 76.5567 241.217 76.5633 241.07 76.57C226.4 76.57 214.47 64.63 214.47 49.96C214.47 35.29 226.4 23.35 241.07 23.35C247.17 23.35 252.78 25.44 257.28 28.9C261.9 25.7 265.36 25.12 269.4 25.05ZM255.94 49.96C255.94 41.77 249.27 35.1 241.07 35.1C232.88 35.1 226.21 41.77 226.21 49.96C226.21 58.16 232.88 64.82 241.07 64.82C249.27 64.82 255.94 58.16 255.94 49.96Z"
          fill="#18181b"
        />
        {/* 6자: y */}
        <path
          className="text-char-path char-y"
          d="M311.98 25.05L297.69 52.46L285.76 25.05H274.68H272.95L274.68 29.03L290.71 65.85L274.4 97.15H287.64L325.22 25.05H311.98Z"
          fill="#18181b"
        />
        {/* 7자: m */}
        <path
          className="text-char-path char-m2"
          d="M376.64 24.97C370.46 24.97 364.9 27.59 360.95 31.75C357.01 27.59 351.44 24.97 345.27 24.97C333.34 24.97 323.64 34.67 323.64 46.59V75.77H335.51V46.59C335.51 41.22 339.89 36.84 345.27 36.84C350.64 36.84 355.02 41.22 355.02 46.59V75.77H366.89V46.59C366.89 41.22 371.26 36.84 376.64 36.84C382.02 36.84 386.39 41.22 386.39 46.59V75.77H398.27V46.59C398.27 34.67 388.57 24.97 376.64 24.97Z"
          fill="#18181b"
        />
      </svg>
    </div>
  );
}
