"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AppSplashScreen } from "@/components/common/AppSplashScreen";

/**
 * GlobalSplashProvider:
 * 브라우저 새로고침(F5) 및 페이지 진입 시 무조건 브랜드 로고 스플래시 로딩 화면을 띄워주는 전역 프로바이더
 */
export function GlobalSplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    // 잎사귀 + 텍스트 초고속 완성(0.93s) 직후 1000ms에 딜레이 없이 즉시 화면 전환
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <AppSplashScreen key="global-app-splash" />}
      </AnimatePresence>
      {children}
    </>
  );
}
