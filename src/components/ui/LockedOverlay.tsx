"use client";

import React from "react";
import { LockKey } from "@phosphor-icons/react";

export interface LockedOverlayProps {
  /** 자물쇠 아이콘 크기 (기본값: 18) */
  iconSize?: number;
  /** 오버레이 둥근 모서리 클래스 (기본값: "rounded-[inherit]") */
  roundedClass?: string;
  /** 추가 커스텀 클래스 */
  className?: string;
}

/**
 * LockedOverlay: 박스/카드/아이콘 정중앙(Center)에 렌더링되는 전역 공통 잠금 오버레이 컴포넌트
 * (맑고 적절한 화이트 글래스모피즘 bg-white/50 backdrop-blur-sm)
 */
export function LockedOverlay({
  iconSize = 18,
  roundedClass = "rounded-[inherit]",
  className = "",
}: LockedOverlayProps) {
  return (
    <div
      className={`absolute inset-0 z-30 flex items-center justify-center bg-white/50 backdrop-blur-sm ${roundedClass} ${className} pointer-events-none select-none`}
    >
      <LockKey
        size={iconSize}
        weight="regular"
        className="text-slate-800 drop-shadow-2xs"
      />
    </div>
  );
}
