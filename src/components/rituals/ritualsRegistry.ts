import React from "react";
import { RT018_StressShredder } from "./RT018_StressShredder";
import { RT001_SmileMeditation } from "./RT001_SmileMeditation";

export interface RitualExecutionComponentProps {
  onComplete?: () => void;
  onStateChange?: (state: string) => void;
  registerResetHandler?: (fn: () => void) => void;
}

export type RitualExecutionComponent = React.ComponentType<RitualExecutionComponentProps>;

export interface RitualMetaConfig {
  component: RitualExecutionComponent;
  hasIntroCover: boolean; // false이면 소개 커버 없이 즉시 실행 페이지로 0ms 직행
  detailGuideText?: string; // 리추얼 상세 가이드 텍스트
  externalLinkUrl?: string; // 개별 외부 연결 URL (선택)
}

// 26개 독립 실천 컴포넌트 및 메타 설정 레지스트리 맵
const RITUAL_REGISTRY_MAP: Record<string, RitualMetaConfig> = {
  // RT-001: 미소 명상 (가이드/몰입형 -> Intro 커버 필요)
  "RT-001": { component: RT001_SmileMeditation, hasIntroCover: true },
  "미소 명상": { component: RT001_SmileMeditation, hasIntroCover: true },

  // RT-018: 스트레스 분쇄 (개별 시작하기 직행 모드 -> hasIntroCover: false)
  "RT-018": { component: RT018_StressShredder, hasIntroCover: false },
  "스트레스 분쇄": { component: RT018_StressShredder, hasIntroCover: false },
};

/**
 * ritualId 또는 ritualTitle을 받아 해당 독립 실천 컴포넌트를 반환
 */
export function getRitualExecutionComponent(
  idOrTitle?: string
): RitualExecutionComponent | null {
  if (!idOrTitle) return null;
  const key = idOrTitle.trim();
  return RITUAL_REGISTRY_MAP[key]?.component || null;
}

/**
 * 해당 리추얼이 시작(Intro) 커버 페이지를 띄워야 하는지 여부를 반환 (기본값: true)
 */
export function shouldShowRitualIntroCover(idOrTitle?: string): boolean {
  if (!idOrTitle) return true;
  const key = idOrTitle.trim();
  const config = RITUAL_REGISTRY_MAP[key];
  if (config) {
    return config.hasIntroCover;
  }
  return true;
}
