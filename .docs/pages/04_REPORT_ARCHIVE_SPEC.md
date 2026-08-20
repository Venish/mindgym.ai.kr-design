# 📊 [PAGE-SPEC 04] KOSS 분석 리포트 & 과거 정원 아카이브 (`/report`) 상세 구현 명세서

본 문서는 KOSS 8대 영역 분석 다이어그램 차트 및 과거 가꾸었던 정원 컬렉션을 **`src/app/(main)/report/page.tsx`**에 구축하기 위한 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/report` (Next.js App Router `src/app/(main)/report/page.tsx`)
* **디자인 컨셉**: 고풍스러운 명예 서재 트로피 아카이브 & 정밀 다이어그램 데이터 뷰.
* **핵심 역할**:
  * KOSS 8대 영역(물리적 환경, 직무 요구, 자율성 등) 다이어그램 렌더링 및 3단계 평가(🟢안정 / 🟡주의 / 🔴위험).
  * `[이달의 나 지향 감정어 변경]` 위저드 모달(`P-03, P-04`) 연동.
  * `[체크인 알림 시간 설정]` 바텀시트(`P-05`) 연동.
  * 지난 달(6월, 7월 등) 가꾸었던 마음 정원 달력 축소판 컬렉션(`P-19`) 서재 표출.

---

## 2. 🧩 컴포넌트 모듈 구조

```text
src/app/(main)/report/
├── page.tsx                           # 리포트 메인 컨테이너
└── _components/
    ├── KossRadarChart.tsx             # KOSS 8대 영역 레이더 차트 (Recharts 또는 커스텀 SVG)
    ├── KossDiagnosisBadge.tsx         # 🟢안정 / 🟡주의 / 🔴위험 3단계 종합 평가 뱃지
    ├── IntentionWizardModal.tsx       # 이달의 나 지향 감정어 선택 마법사 모달
    ├── NotificationTimeBottomSheet.tsx# 아침/저녁 알림 시간 스크롤 룰 피커 바텀시트
    └── PastGardenArchiveAlbum.tsx     # 지난 달 정원 달력 축소판 & 누적 트로피 컬렉션
```

---

## 3. 🧠 KOSS 점수 환산 산식 (`sheets/03_KOSS_점수_산정_로직.md`)

```typescript
// 영역별 100점 환산 표준 산식
// 환산점수 = (실제점수 - 문항수) / (최고가능점수 - 문항수) * 100
export const calculateKossDomainScore = (rawScore: number, itemLength: number): number => {
  const maxScore = itemLength * 4;
  return Math.round(((rawScore - itemLength) / (maxScore - itemLength)) * 100);
};

export const getKossEvaluationGrade = (score: number): "STABLE" | "WARNING" | "DANGER" => {
  if (score <= 33) return "STABLE";  // 🟢 안정
  if (score <= 66) return "WARNING"; // 🟡 주의
  return "DANGER";                   // 🔴 위험
};
```

---

## 4. 🎨 디자인 & 심리학적 지침

* **게임형 가방/방패 제거**: 방패 수량 소모나 강박적인 아이템 창고 비주얼을 배제하고, "내가 가꾼 정원 기록물"로서 서재 스타일로 정화하여 렌더링.
* **차트 컬러링**: OKLCH Primary Green(`oklch(0.68 0.18 165)`)과 Soft Mint Fill 적용.
