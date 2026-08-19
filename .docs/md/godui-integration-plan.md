# GodUI 컴포넌트 전면 적용 및 확장 기술 계획서 (Integration Plan)

본 문서는 GodUI 라이브러리(기존 보유 11종 + 레지스트리 확장 컴포넌트 6선)를 마인드짐 서비스의 각 라우트 및 기능 위젯에 적용하기 위한 상세 기술 디자인 계획서입니다.

---

## 1. 기본 보유 11종 GodUI 컴포넌트 라우트별 대입 매핑표

| GodUI 컴포넌트 | 핵심 기능 및 비주얼 | 마인드짐 사이트 내 전용 적용 위치 |
| --- | --- | --- |
| **`AuroraText`** | 오로라 그라데이션 애니메이션 텍스트 | • 대시보드 메인 웰컴 인사말 (`<AuroraText>마인드짐</AuroraText>`)<br>• 온보딩 및 KOSS 진단 타이틀 강조 |
| **`SpotlightCard`** | 마우스/터치 추적 3D 렌즈 글로우 카드 | • 대시보드 "지금 나에게 맞는 이야기" 아티클 추천 카드<br>• 리포트 "마음 명예 트로피" 종합 스탯 카드<br>• 온보딩 스텝별 진단 질문 카드 |
| **`NeumorphCard`** | 은은하고 입체적인 무테 음각/양각 카드 | • 대시보드 "이달의 나" 뱃지 카드<br>• 리추얼 72종 보관소 3열 아이콘 카드<br>• 과월호 매거진 서재 카드 |
| **`MagicButton`** | 햅틱 피드백(`scale-[0.96]`) & 글로우 액션 | • 로그인 / 비밀번호 재설정 제출 CTA<br>• 온보딩 스텝 시작 / 다음 진행 버튼<br>• 리추얼 시작 및 매거진 정독 액션 버튼 |
| **`NumberTicker`** | 부드러운 수치 롤링 카운팅 애니메이션 | • 대시보드 연속 실천일 카운터 (`<NumberTicker value={14} />일째`)<br>• 리포트 KOSS 영역별 점수 및 누적 덤벨 개수<br>• 온보딩 최종 진단 완료 점수 롤링 |
| **`SegmentedControl`** | 슬라이딩 백그라운드 탭 스위치 | • 리추얼 보관소 카테고리 필터 ("전체", "불안", "자책", "감정", "즐겨찾기")<br>• 온보딩 "이달의 나" 키워드 선택 탭 |
| **`GodSelect`** | 커스텀 드롭다운 선택 휠 | • 온보딩 및 마이페이지 직무/부서 선택 ("개발팀", "마케팅팀")<br>• 리추얼 보관소 정렬 옵션 ("최신순", "인기순", "난이도순") |
| **`GodTimePicker`** | 휠 기반 감성 타임 피커 | • 온보딩 알림 시간 설정 (`CheckinTimeSetupView`) 아침 08:00 / 저녁 21:00 타임피커 |
| **`FloatingToolbar`** | 화면 하단 부유형 퀵 컨트롤 바 | • 메인 대시보드 하단 퀵 메뉴 바 (체크인, 재생 중인 리추얼 퀵 조작, 홈)<br>• 리추얼 수련 플레이어 하단 조작 바 |
| **`AnimatedTooltip`** | 마우스 호버 시 pop-up 마이크로 툴팁 | • 리포트 KOSS 8대 영역 수치 옆 `Info` 아이콘 호버 툴팁<br>• 덤벨 레벨(Lv.2) 뱃지 호버 시 다음 승급 조건 가이드 |
| **`MorphingDialog`** | 카드가 부드럽게 전체 팝업 창으로 확장 | • 대시보드 "이달의 나 지향점 설정" 상세 다이얼로그<br>• 리추얼 카드 클릭 시 상세 수련 방법 모핑 팝업 |

---

## 2. GodUI 레지스트리 추가 확장 추천 컴포넌트 6선

| 추가 컴포넌트 | 기능 및 비주얼 | 마인드짐 적용 추천 위치 |
| --- | --- | --- |
| **`DynamicIsland`** | 상단에 뜨는 아이폰 스타일의 부드러운 캡슐 상태 바 | • 현재 실천 중인 **리추얼 타이머 진행 상황** 및 **덤벨 획득 실시간 알림** |
| **`BentoGrid`** | 트렌디한 모던 그리드 레이아웃 시스템 | • 대시보드 메인 위젯들(오늘의 루틴, 이달의 나, 수치 스탯)을 벤토 스타일로 통합 |
| **`CommandPalette`** | `Cmd + K` 퀵 커맨드 파렛트 | • 72종 리추얼 및 매거진 아티클 **전역 퀵 검색/이동창** |
| **`HoldConfirmButton`** | 1~2초간 길게 눌러야 동작하는 확정 버튼 | • "리추얼 기록 초기화" 또는 "지향점 리셋" 등 **실수 방지용 액션** |
| **`OrbitingCircles`** | 중심축 주변을 원형 궤도로 회전하는 노드 애니메이션 | • 리포트 상단 **마음 근력 레벨(Lv.2) 및 8대 영역 궤도 시각화** |
| **`CardSwap` / `ScrollStack`** | 카드가 쌓이거나 3D로 스와이프되는 카드 스택 | • **과월호 매거진 책장** 및 추천 리추얼 카드 스와이프 모션 |

---

## 3. 신규 컴포넌트 CLI 설치 방법

추가 컴포넌트 도입 시 아래 명령어를 통해 단 1초만에 프로젝트에 소스 코드를 유치할 수 있습니다.

```bash
# 예시: DynamicIsland 추가 설치
npx shadcn@latest add "https://godui.design/r/dynamic-island.json"

# 예시: BentoGrid 추가 설치
npx shadcn@latest add "https://godui.design/r/bento-grid.json"
```

---

## 4. AGENTS.md UI 구현 규칙 체크리스트

모든 GodUI 컴포넌트 대입 및 개발 시 아래 규칙을 필수 반영합니다:

- [x] **Static Tailwind Classes Only**: `grid-cols-${n}` 동적 조합 금지 (명시적 룩업 Map 사용)
- [x] **Inline Utilities over CSS Blocks**: `@layer components` 생성 대신 inline Tailwind 유틸리티 우선
- [x] **Concentric Border Radius**: 내부 `radius = outerRadius - padding` 계산 규칙 준수
- [x] **Tabular Numbers**: 숫자가 변경되거나 롤링할 때 레이아웃 시프트 방지를 위해 `.tabular-nums` 적용
- [x] **Micro-Interactions**: 클릭/터치 반응 시 `scale(0.96)` tactile feedback 및 `transition-transform` 명시
- [x] **Z-Index Scale**: `z-base`, `z-overlay`, `z-modal` 사전 정의 수치 활용
