export type EyeFocusMode = 'transit' | 'flash' | 'saccade' | 'peripheral';
export type SessionType = 'routine' | 'individual';
export type TargetSymbolType = 'number' | 'arrow';
export type DifficultyLevel = 'easy' | 'normal' | 'hard';

export interface DifficultyConfig {
  key: DifficultyLevel;
  label: string;
  subLabel: string;
  transitDurationSec: number; // 원본 HTML: 초급 1.3초, 표준 0.85초, 고급 0.6초
  flashExposureMs: number;    // 원본 HTML: 초급 300ms, 표준 180ms, 고급 90ms
  targetRadius: number;       // 원본 HTML: 초급 32, 표준 26, 고급 22
  saccadeDurationMs: number;  // 도약 터치 제한 시간
  peripheralFlashMs: number;  // 원본 HTML: 초급 320ms, 표준 240ms, 고급 140ms
}

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    key: 'easy',
    label: '초급',
    subLabel: '초급 (안구 피로 완화 및 편안한 추적)',
    transitDurationSec: 0.9, // 0.9초 횡단
    flashExposureMs: 200,     // 200ms 플래시
    targetRadius: 32,
    saccadeDurationMs: 900,   // 0.9초 신속 도약 터치 (기존 1.4s ➔ 0.9s)
    peripheralFlashMs: 220,   // 220ms 주변시 노출
  },
  normal: {
    key: 'normal',
    label: '중급',
    subLabel: '중급 (임상 표준 시지각 자극)',
    transitDurationSec: 0.6,  // 0.6초 횡단 (경쾌한 속도감)
    flashExposureMs: 120,     // 120ms 순간 포착
    targetRadius: 26,
    saccadeDurationMs: 600,   // 0.6초 순간 도약 터치 (기존 0.95s ➔ 0.6s)
    peripheralFlashMs: 140,   // 140ms 주변시 노출
  },
  hard: {
    key: 'hard',
    label: '고급',
    subLabel: '고급 (고속 반응 및 순발력 강화)',
    transitDurationSec: 0.38, // 0.38초 횡단 (고속 순발력)
    flashExposureMs: 65,      // 65ms 초고속 포착
    targetRadius: 22,
    saccadeDurationMs: 380,   // 0.38초 초고속 반사 터치 (기존 0.6s ➔ 0.38s)
    peripheralFlashMs: 80,    // 80ms 고속 주변시
  },
};

export interface TargetEntity {
  x: number;
  y: number;
  startX?: number;
  startY?: number;
  targetEndX?: number;
  targetEndY?: number;
  durationMs?: number;
  vx: number;
  vy: number;
  radius: number;
  value: number | string;
  label: string;
  visible: boolean;
  birthTime: number;
  color: string;
  isPeripheralFlashed?: boolean;
}

export interface RoutineSummary {
  totalHits: number;
  totalMisses: number;
  totalScore: number;
  allReactionTimes: number[];
}

export interface ModeMetaItem {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  showExposure: boolean;
}

export interface RT073EyeFocusProps {
  onComplete?: () => void;
  onStateChange?: (state: string) => void;
  registerResetHandler?: (fn: () => void) => void;
}

export interface CourseItem {
  mode: EyeFocusMode;
  title: string;
  shortTitle: string;
  subtitle: string;
  badgeColor: string;
  accentColor: string;
}

export const COURSES: CourseItem[] = [
  {
    mode: "transit",
    title: "고속 횡단 추적",
    shortTitle: "횡단 추적",
    subtitle: "좌우 이동 안구 부드러운 추종 (Smooth Pursuit)",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300",
    accentColor: "#0284C7",
  },
  {
    mode: "flash",
    title: "순간 번호 포착",
    shortTitle: "순간 플래시",
    subtitle: "초단기 시각 작업기억 (Tachistoscopic Flash)",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    accentColor: "#D97706",
  },
  {
    mode: "saccade",
    title: "동적 안구 도약",
    shortTitle: "안구 도약",
    subtitle: "목표 지점 급속 이동 (Voluntary Saccade)",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
    accentColor: "#00C474",
  },
  {
    mode: "peripheral",
    title: "주변 시야 확장",
    shortTitle: "주변 시야",
    subtitle: "주변부 시각 주의 분할 (Useful Field of View)",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
    accentColor: "#9333EA",
  },
];


