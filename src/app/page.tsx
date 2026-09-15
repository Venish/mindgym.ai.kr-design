"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 최초 진입 시 온보딩(스플래시 슬라이드)으로 즉시 라우팅 연계
    // 스플래시 로고 표시는 최상위 GlobalSplashProvider가 단일 전담
    router.replace("/onboarding");
  }, [router]);

  return null;
}



