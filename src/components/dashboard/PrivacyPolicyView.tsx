"use client";

import React from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";

/**
 * PrivacyPolicyView: 공통 SubPageHeader를 적용한 개인정보 처리방침 전용 서브 페이지 컴포넌트
 */
export function PrivacyPolicyView() {
  const { closeModal } = useModalStore();

  return (
    <div className="w-full min-h-screen bg-white text-left select-text flex flex-col font-sans">
      {/* 공통 표준 서브페이지 헤더 (leftType="close" ✕ 아이콘 닫기) */}
      <SubPageHeader title="개인정보 처리방침" leftType="close" onLeftClick={closeModal} />

      {/* 개인정보 처리방침 본문 상세 */}
      <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6 text-xs text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">1. 개인정보의 수집 및 이용 목적</h2>
            <p>
              (주)웰비아이는 맞춤형 마음건강 리추얼 세션 제공, 서비스 이용 분석 및 고객 문의 대응을 위해 최소한의 개인정보를 수집합니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">2. 수집하는 개인정보 항목</h2>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>필수항목: 이름(닉네임), 마음건강 진단 결과, 완성 리추얼 내역</li>
              <li>자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">3. 개인정보의 보유 및 이용기간</h2>
            <p>
              회원 탈퇴 시 또는 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">4. 개인정보의 파기절차 및 방법</h2>
            <p>
              수집 및 이용목적이 달성된 개인정보는 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
