"use client";

import React from "react";
import { CommonErrorTemplate } from "@/components/common/CommonErrorTemplate";

/**
 * 404 Not Found 커스텀 예외 페이지 (공통 템플릿 사용)
 */
export default function NotFoundPage() {
  return (
    <CommonErrorTemplate
      badgeCode="404 · Page Not Found"
      badgeColor="amber"
      title="길을 잃으셨나요?"
      description={
        <>
          찾으시려는 페이지가 이동되었거나 존재하지 않습니다.
          <br />
          잠시 쉼표를 찍고 안내받아 홈으로 돌아가세요.
        </>
      }
      showBackButton={true}
    />
  );
}
