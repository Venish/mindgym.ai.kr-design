import React from "react";
import { RT018_StressShredder } from "./RT018_StressShredder";
import { RT001_SmileMeditation } from "./RT001_SmileMeditation";

export interface RitualExecutionComponentProps {
  onComplete?: () => void;
}

export type RitualExecutionComponent = React.ComponentType<RitualExecutionComponentProps>;

// 26개 독립 실천 컴포넌트 레지스트리 맵
const RITUAL_COMPONENTS_MAP: Record<string, RitualExecutionComponent> = {
  "RT-001": RT001_SmileMeditation,
  "미소 명상": RT001_SmileMeditation,

  "RT-018": RT018_StressShredder,
  "스트레스 분쇄": RT018_StressShredder,
};

/**
 * ritualId 또는 ritualTitle을 받아 해당 독립 실천 컴포넌트를 반환하는 오케스트레이터 유틸
 */
export function getRitualExecutionComponent(
  idOrTitle?: string
): RitualExecutionComponent | null {
  if (!idOrTitle) return null;
  const key = idOrTitle.trim();
  return RITUAL_COMPONENTS_MAP[key] || null;
}
