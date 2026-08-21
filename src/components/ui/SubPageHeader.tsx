"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, CaretLeft } from "@phosphor-icons/react";
import { useModalStore } from "@/store/useModalStore";

export interface SubPageHeaderProps {
  /** 중앙 타이틀 텍스트 */
  title?: React.ReactNode;
  /** 좌측 버튼 유형: "close"(✕) | "back"(←) | "none"(없음) */
  leftType?: "close" | "back" | "none";
  /** 좌측 커스텀 클릭 핸들러 */
  onLeftClick?: () => void;
  /** 좌측 클릭 시 이동할 커스텀 href */
  leftHref?: string;
  /** 좌측 액션 영역 커스텀 ReactNode */
  leftAction?: React.ReactNode;
  /** 우측 액션 영역 커스텀 ReactNode (rightAction 또는 rightContent 지원) */
  rightAction?: React.ReactNode;
  rightContent?: React.ReactNode;
  /** 추가 컨테이너 클래스 */
  className?: string;
}

/**
 * SubPageHeader: 전역 공통 서브 헤더 컴포넌트
 * - 오버레이 모달 닫기(closeModal) 및 라우트 이동(router.back) 통합 지원
 */
export function SubPageHeader({
  title = "",
  leftType = "close",
  onLeftClick,
  leftHref,
  leftAction,
  rightAction,
  rightContent,
  className = "",
}: SubPageHeaderProps) {
  const finalRightAction = rightAction || rightContent;
  const router = useRouter();
  const { isOpen, closeModal } = useModalStore();

  const handleLeftClick = () => {
    if (onLeftClick) {
      onLeftClick();
      return;
    }

    // 전역 오버레이 모달이 켜져 있는 상태라면 모달 닫기 실행
    if (isOpen) {
      closeModal();
      return;
    }

    // 일반 라우터 페이지일 경우 대시보드(/dashboard)로 안전 이탈 이동
    if (leftHref) {
      router.push(leftHref);
    } else {
      router.push("/dashboard");
    }
  };

  const renderLeftAction = () => {
    if (leftAction) return leftAction;
    if (leftType === "none") return <div className="w-8" />;

    return (
      <button
        type="button"
        onClick={handleLeftClick}
        className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors active:scale-95 outline-none cursor-pointer"
        title={leftType === "close" ? "닫기" : "뒤로가기"}
      >
        {leftType === "close" ? (
          <X size={22} weight="bold" />
        ) : (
          <CaretLeft size={24} weight="bold" />
        )}
      </button>
    );
  };

  return (
    <div
      className={`w-full h-[56px] min-h-[56px] flex items-center justify-between px-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-30 select-none relative ${className}`}
    >
      {/* 1. 좌측 버튼 영역 */}
      <div className="flex items-center justify-start z-10 min-w-[40px] h-full">
        {renderLeftAction()}
      </div>

      {/* 2. 중앙 타이틀 (좌우 아이콘 크기/유무와 관계없이 무조건 화면 100% 절대 정중앙 absolute center) */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-900 tracking-tight text-center truncate max-w-[60%] pointer-events-none z-0">
        {title}
      </h1>

      {/* 3. 우측 액션 영역 */}
      <div className="flex items-center justify-end z-10 min-w-[40px] h-full">
        {finalRightAction || <div className="w-8" />}
      </div>
    </div>
  );
}
