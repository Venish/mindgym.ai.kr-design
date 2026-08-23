"use client";

import { useEffect } from "react";

/**
 * useBodyScrollLock: 전역 팝업/모달 활성화 시 body 및 html 스크롤을 100% 중앙집중 제어하는 공통 훅
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLocked]);
}
