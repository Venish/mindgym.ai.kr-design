"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedLogoIcon } from "@/components/animated-icons/AnimatedLogoIcon";
import { AnimatedLogoText } from "@/components/animated-icons/AnimatedLogoText";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== "/" && currentPath !== "/index.html") {
        router.replace(currentPath + window.location.search);
        return;
      }
    }

    // 로고 & 텍스트 애니메이션 완성 직후 온보딩 페이지로 이동 (2000ms)
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 min-h-screen">
      {/* 상단: 5개 잎 순차 모션 AnimatedLogoIcon, 하단: 한 자씩 솟구치는 AnimatedLogoText */}
      <div className="flex flex-col items-center gap-3">
        <AnimatedLogoIcon size={64} />
        <AnimatedLogoText height={28} className="mt-1" />
      </div>
    </div>
  );
}



