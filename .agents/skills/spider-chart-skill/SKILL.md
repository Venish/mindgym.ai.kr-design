---
name: spider-chart-skill
description: KOSS 및 마음건강 지표 진단용 5단계 파스텔 레벨 링 SVG 스파이더(레이더) 차트 디자인 스킬
---

# Spider Chart (Radar Chart) Design & Engineering Skill

이 스킬은 한국형 직무 스트레스(KOSS) 및 마음건강 8대 지표를 5단계 파스텔 틴트 가이드와 호버 인터랙티브 툴팁으로 시각화하는 SVG 스파이더 차트 표준 스펙을 정의합니다.

## 핵심 가이드라인

1. **5단계 Zone Fill 파스텔 틴트**:
   - Level 1 (0~2점, 최상/안전): `rgba(0, 196, 116, 0.10)`
   - Level 2 (2~4점, 양호): `rgba(0, 196, 116, 0.04)`
   - Level 3 (4~6점, 보통): `rgba(251, 140, 0, 0.05)`
   - Level 4 (6~8점, 주의): `rgba(251, 140, 0, 0.09)`
   - Level 5 (8~10점, 고위험/경고): `rgba(229, 57, 53, 0.08)`

2. **Border-less 맑은 시각화**:
   - 각 레벨 링 다각형의 기본 border는 `stroke="none"`으로 최소화하여 맑고 넓은 필(Fill) 감성을 구현합니다.
   - 데이터 라인은 `#00C474` 에메랄드 2.8px 선과 흰색 보더가 들어간 정점으로 투명하고 또렷하게 표출합니다.

3. **전역 재사용**:
   - `src/components/ui/BklitRadarChart.tsx` (또는 `SpiderChart.tsx`)에서 공통 제공하며, 온보딩 결과 뷰(`KossResultView.tsx`)와 내 정보 뷰(`MyPageSheet.tsx`)에 동기화 적용됩니다.
