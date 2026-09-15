// 엑셀 지표 기반 통계 데이터 목업
// .docs/마인드짐_대시보드지표_0910.xlsx 내 48개 지표 반영

export interface MetricSummary {
  totalEmployees: number;
  installedCount: number;
  accountIssuedCount: number;
  joinedCount: number;
  monthlyActiveUsers: number;
  monthlyRitualCompletions: number;
  avgCompletionRate: number;
  orgWellnessScore: number;
  wellnessScoreDelta: number;
}

export const mockSummaryKPI: MetricSummary = {
  totalEmployees: 1250,
  installedCount: 1180,
  accountIssuedCount: 1250,
  joinedCount: 1054,
  monthlyActiveUsers: 892,
  monthlyRitualCompletions: 14820,
  avgCompletionRate: 88.4,
  orgWellnessScore: 78.2,
  wellnessScoreDelta: 4.8,
};

// 1. 도입 및 온보딩 퍼널 (엑셀: 도입 탭 지표)
export const mockFunnelData = [
  { step: "1. 앱 설치", count: 1180, rate: 100, dropRate: 0, fill: "#6366f1" },
  { step: "2. 계정 발급", count: 1120, rate: 94.9, dropRate: 5.1, fill: "#818cf8" },
  { step: "3. 가입/약관 완료", count: 1054, rate: 89.3, dropRate: 5.9, fill: "#a5b4fc" },
  { step: "4. 온보딩 완료", count: 980, rate: 83.1, dropRate: 7.0, fill: "#38bdf8" },
  { step: "5. 첫 리추얼 실행", count: 864, rate: 73.2, dropRate: 11.8, fill: "#10b981" },
];

export const mockOnboardingKPIs = {
  adoptionSettlementRate: 82.3, // 도입 정착률 (첫 주 3회 이상 실행)
  firstRitualConversion: 82.0,  // 가입 후 첫 리추얼 전환율
  day1Retention: 68.5,          // Day 1 재방문율
  day7Retention: 52.4,          // Day 7 재방문율
};

// 2. 활성 및 잔존 (엑셀: 활성, 지속 탭 지표)
export const mockActiveTrendData = [
  { month: "4월", mau: 580, wau: 390, ritualUsers: 420 },
  { month: "5월", mau: 640, wau: 440, ritualUsers: 490 },
  { month: "6월", mau: 720, wau: 510, ritualUsers: 560 },
  { month: "7월", mau: 810, wau: 590, ritualUsers: 650 },
  { month: "8월", mau: 850, wau: 630, ritualUsers: 710 },
  { month: "9월", mau: 892, wau: 678, ritualUsers: 764 },
];

export const mockRetentionCohort = [
  { cohort: "7일 내 재실행률", rate: 64.2, benchmark: 50.0 },
  { cohort: "2주 연속 실행률", rate: 51.8, benchmark: 40.0 },
  { cohort: "4주 연속 실행률", rate: 42.5, benchmark: 30.0 },
  { cohort: "3개월 방문 잔존율", rate: 58.7, benchmark: 45.0 },
  { cohort: "3개월 활성 잔존율", rate: 46.2, benchmark: 35.0 },
  { cohort: "이달의 나 설정률", rate: 78.4, benchmark: 60.0 },
];

// 3. 실행량 및 패턴 (엑셀: 실행, 패턴, 안전망 지표)
export const mockVolumeKPIs = {
  totalRitualRuns: 14820,
  totalCheckins: 19430,
  avgRunsPerUserMonth: 16.6,
  avgRunsPerUserWeek: 4.2,
  avgCompletionTimeMinutes: "4분 32초",
  avgStreakDays: 5.8,
};

export const mockUserVolumeSegments = [
  { name: "라이트 (월 1~5회)", count: 245, percentage: 27.5, color: "#94a3b8" },
  { name: "미디엄 (월 6~15회)", count: 388, percentage: 43.5, color: "#38bdf8" },
  { name: "헤비 (월 16회 이상)", count: 259, percentage: 29.0, color: "#10b981" },
];

// 요일별/시간대별 실행 분포 (피크 시간대 시각화)
export const mockTimeOfDayData = [
  { time: "06:00", runs: 280, label: "기상" },
  { time: "08:00", runs: 950, label: "출근/아침" },
  { time: "10:00", runs: 320, label: "오전 업무" },
  { time: "12:00", runs: 710, label: "점심/휴식" },
  { time: "14:00", runs: 410, label: "오후 리프레시" },
  { time: "16:00", runs: 350, label: "오후 업무" },
  { time: "18:00", runs: 580, label: "퇴근" },
  { time: "20:00", runs: 640, label: "저녁 정리" },
  { time: "22:00", runs: 1240, label: "수면/취침 루틴" },
  { time: "24:00", runs: 310, label: "심야" },
];

// 4. 리추얼 & 콘텐츠 분석 (엑셀: 리추얼 분석, 알림 탭)
export const mockTopRituals = [
  { name: "4-7-8 이완 호흡", runs: 2480, completionRate: 94.2, category: "수면/이완" },
  { name: "스트레스 분쇄기", runs: 2150, completionRate: 91.0, category: "스트레스" },
  { name: "아침 에너지 기상 리추얼", runs: 1890, completionRate: 88.5, category: "활력" },
  { name: "오후 3분 감정 리셋", runs: 1640, completionRate: 89.2, category: "감정조절" },
  { name: "취침 전 감사 일기", runs: 1420, completionRate: 85.0, category: "성찰" },
  { name: "거북목 해소 스트레칭", runs: 1280, completionRate: 92.4, category: "신체회복" },
  { name: "퇴근 후 모드 스위치", runs: 1110, completionRate: 86.8, category: "경계설정" },
  { name: "집중력 몰입 타이머", runs: 980, completionRate: 79.5, category: "집중" },
  { name: "마음챙김 바디스캔", runs: 850, completionRate: 83.1, category: "마음챙김" },
  { name: "부정적 자동사고 멈춤", runs: 740, completionRate: 84.7, category: "인지치료" },
];

export const mockRitualThemeDistribution = [
  { theme: "스트레스 해소", value: 28, color: "#f87171" },
  { theme: "수면 및 숙면", value: 24, color: "#818cf8" },
  { theme: "활력 & 아침루틴", value: 18, color: "#fbbf24" },
  { theme: "감정 및 회복탄력", value: 14, color: "#34d399" },
  { theme: "집중 및 업무몰입", value: 10, color: "#38bdf8" },
  { theme: "마음챙김 명상", value: 6, color: "#c084fc" },
];

export const mockContentEngagement = {
  pushClickRate: 34.8,     // 푸시 클릭률
  pushReturnRate: 26.2,    // 푸시 후 30분 내 복귀율
  pushActionRate: 19.5,    // 푸시 후 리추얼 즉시 실행률
  magazineReadRate: 48.2,  // 월간 마음건강 매거진 열람률
  sosUsageRatio: 4.8,      // 전체 실행 중 SOS 긴급케어 비중
  onSiteCareRequests: 14,  // 이번 달 EAP 현장 케어 신청 건수
};

// 5. [B2B] 조직 마음 리포트 & 부서 분석 (엑셀: 조직 상태, 부서 탭)
export const mockOrgWellnessHistory = [
  { month: "4월", score: 71.2, stressIndex: 62.4 },
  { month: "5월", score: 72.8, stressIndex: 60.1 },
  { month: "6월", score: 74.0, stressIndex: 58.2 },
  { month: "7월", score: 75.6, stressIndex: 56.4 },
  { month: "8월", score: 76.9, stressIndex: 55.0 },
  { month: "9월", score: 78.2, stressIndex: 53.1 },
];

// KOSS(한국인 직무스트레스) 7대 영역 방사형 레이더 점수 (100점 만점 환산)
export const mockKossRadarData = [
  { area: "직무요구", score: 68, orgAvg: 65, benchmark: 60, fullMark: 100 },
  { area: "직무자율", score: 74, orgAvg: 70, benchmark: 65, fullMark: 100 },
  { area: "관계갈등", score: 82, orgAvg: 78, benchmark: 72, fullMark: 100 },
  { area: "직무불안정", score: 79, orgAvg: 75, benchmark: 70, fullMark: 100 },
  { area: "조직체계", score: 71, orgAvg: 68, benchmark: 64, fullMark: 100 },
  { area: "보상부적절", score: 69, orgAvg: 66, benchmark: 62, fullMark: 100 },
  { area: "직장문화", score: 84, orgAvg: 80, benchmark: 75, fullMark: 100 },
];

export const mockRiskDistribution = [
  { level: "안정군 (75점 이상)", count: 546, rate: 51.8, color: "#10b981" },
  { level: "주의군 (60~74점)", count: 322, rate: 30.5, color: "#38bdf8" },
  { level: "경계군 (45~59점)", count: 142, rate: 13.5, color: "#fbbf24" },
  { level: "고위험군 (44점 이하)", count: 44, rate: 4.2, color: "#f87171" },
];

export const mockDepartmentStats = [
  { dept: "개발본부", employees: 340, avgScore: 76.4, delta: "+3.2", activeRate: 88.2, riskRate: 4.1 },
  { dept: "마케팅팀", employees: 120, avgScore: 79.8, delta: "+5.4", activeRate: 91.5, riskRate: 2.5 },
  { dept: "영업/사업팀", employees: 210, avgScore: 72.1, delta: "+6.1", activeRate: 84.0, riskRate: 6.8 },
  { dept: "디자인/기획", employees: 95, avgScore: 81.5, delta: "+2.8", activeRate: 94.2, riskRate: 1.8 },
  { dept: "고객경험(CX)", employees: 180, avgScore: 69.5, delta: "+4.5", activeRate: 82.6, riskRate: 8.2 },
  { dept: "경영지원/HR", employees: 85, avgScore: 82.0, delta: "+1.9", activeRate: 89.0, riskRate: 2.1 },
  { dept: "연구소(R&D)", employees: 220, avgScore: 77.3, delta: "+3.8", activeRate: 86.4, riskRate: 3.9 },
];
