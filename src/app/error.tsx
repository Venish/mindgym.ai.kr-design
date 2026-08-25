"use client";

import React, { useEffect } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";
import { CommonErrorTemplate } from "@/components/common/CommonErrorTemplate";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 500 Internal Server Error 커스텀 예외 페이지 (공통 템플릿 사용)
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("500 Server Error caught:", error);
  }, [error]);

  return (
    <CommonErrorTemplate
      badgeCode="500 · Server Error"
      badgeColor="rose"
      title="잠시 문제가 발생했습니다"
      description={
        <>
          시스템 일시적인 오류로 요청을 처리하지 못했습니다.
          <br />
          마음을 가다듬고 다시 시도해 주세요.
        </>
      }
      mainButtonLabel="다시 시도하기"
      onMainButtonClick={reset}
      mainButtonIcon={<ArrowClockwise size={18} weight="bold" />}
    />
  );
}
