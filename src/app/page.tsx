"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedLogoIcon } from "@/components/animated-icons/AnimatedLogoIcon";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 min-h-screen">
      {/* 상단: 5개 잎 순차 모션 AnimatedLogoIcon, 하단: 정적 logo_text.svg */}
      <div className="flex flex-col items-center gap-3">
        <AnimatedLogoIcon size={64} />
        <img
          src="/images/logo_text.svg"
          alt="마인드짐"
          className="h-7 w-auto object-contain mt-1"
        />
      </div>
    </div>
  );
}
