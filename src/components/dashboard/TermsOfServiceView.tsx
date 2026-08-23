"use client";

import React from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";

/**
 * TermsOfServiceView: 공통 SubPageHeader를 적용한 이용약관 전용 서브 페이지 컴포넌트
 */
export function TermsOfServiceView() {
  const { closeModal } = useModalStore();

  return (
    <div className="w-full min-h-screen bg-white text-left select-text flex flex-col font-sans">
      {/* 공통 표준 서브페이지 헤더 (leftType="close" ✕ 아이콘 닫기) */}
      <SubPageHeader title="이용약관" leftType="close" onLeftClick={closeModal} />

      {/* 이용약관 본문 상세 */}
      <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6 text-xs text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">제1조 (목적)</h2>
            <p>
              본 약관은 (주)웰비아이가 제공하는 e월간 마음건강 마인드짐 서비스의 이용조건 및 절차, 이용자와 당사의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">제2조 (용어의 정의)</h2>
            <ol className="list-decimal list-inside space-y-1.5 pl-1">
              <li>"서비스"란 당사가 제공하는 마음건강 진단, 리추얼 세션, 30초 체크인 및 관련 제반 서비스를 의미합니다.</li>
              <li>"회원"이란 본 약관에 동의하고 서비스를 이용하는 고객을 말합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-900 mb-2">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal list-inside space-y-1.5 pl-1">
              <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.</li>
              <li>당사는 필요하다고 인정되는 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
