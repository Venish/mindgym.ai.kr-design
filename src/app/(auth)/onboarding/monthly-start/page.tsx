"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MonthlyRitualStartView } from "@/components/onboarding/MonthlyRitualStartView";

function MonthlyStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ?step=5 형태의 쿼리 파라미터 읽기
  const paramStep = searchParams.get("step");
  const parsedStep = paramStep ? (Math.min(Math.max(Number(paramStep), 1), 5) as 1 | 2 | 3 | 4 | 5) : 1;

  const [nickname] = useState("보노보노");
  const [selectedKeyword, setSelectedKeyword] = useState("차분한 8월");

  return (
    <div className="w-full flex-1 flex flex-col justify-between relative px-5 py-4 min-h-[580px]">
      {/* 상단 볼드 텍스트 로고 헤더 */}
      <div className="w-full flex justify-center items-center py-2 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <img src="/images/logo_icon.svg" alt="MindGym Logo" className="w-7 h-7 object-contain shrink-0" />
          <span className="text-base font-bold text-gray-900">
            이달의 나 · <span className="text-[#00C474] font-bold">8월</span>
          </span>
        </div>
      </div>

      <MonthlyRitualStartView
        nickname={nickname}
        selectedKeyword={selectedKeyword}
        initialStep={parsedStep}
        onSelectKeyword={(kw) => setSelectedKeyword(kw)}
        onNext={() => router.push("/dashboard?execute_ritual=true")}
      />
    </div>
  );
}

export default function MonthlyStartDirectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">로딩 중...</div>}>
      <MonthlyStartContent />
    </Suspense>
  );
}
