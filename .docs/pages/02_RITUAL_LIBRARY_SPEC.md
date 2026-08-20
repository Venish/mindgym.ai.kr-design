# 🧘 [PAGE-SPEC 02] 자율 리추얼 라이브러리 (`/ritual`) 상세 구현 명세서

본 문서는 72가지 마음 단련 리추얼 데이터베이스를 기반으로 **`src/app/(main)/ritual/page.tsx`**를 구축하기 위한 실전 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/ritual` (Next.js App Router `src/app/(main)/ritual/page.tsx`)
* **디자인 컨셉**: 파스텔 아이콘 중심의 3열 컴팩트 그리드 레이아웃.
* **핵심 역할**:
  * 72가지 리추얼 데이터 탐색, 검색, 카테고리 필터링.
  * 즐겨찾기(`❤️`) 토글 및 LocalStorage 동기화.
  * 아이콘 터치 시 [상세 정보 바텀시트] 슬라이드업 및 오디오 플레이어(`/player/[id]`) 전환.

---

## 2. 🧩 컴포넌트 모듈 구조

```text
src/app/(main)/ritual/
├── page.tsx                           # 자율 리추얼 메인 컨테이너
└── _components/
    ├── RitualHeader.tsx               # 검색 바 & 카테고리 가로 스크롤 칩 (호흡·명상, 일기, 산책, 수면)
    ├── RitualGridList.tsx             # 3열 그리드 카드 배치 컨테이너
    ├── RitualGridItem.tsx             # 파스텔 원형 아이콘 + 리추얼 타이틀 3열 단품 아이템
    └── RitualDetailDrawer.tsx         # 리추얼 상세 설명, 덤벨 수량, 즐겨찾기 토글, 시작하기 바텀시트
```

---

## 3. 📊 데이터 스키마 & 인터페이스 (`sheets/04_리추얼_목록_72개.md`)

```typescript
export interface RitualItemData {
  id: string;          // 예: "RT-001"
  title: string;       // 예: "미소 명상"
  category: "MEDITATION" | "JOURNAL" | "WALK" | "SLEEP" | "RECOVERY";
  type: "SHORT" | "HYBRID" | "LONG"; // 3분 / 7분 / 15분
  timeText: string;    // 예: "3분 코스"
  dumbbell: number;    // 예: 3 (획득 덤벨 수량)
  description: string; // 예: "얼굴 근육을 이완하며 마음의 미소를 되찾는 명상"
  icon: string;        // 예: "smiley"
}
```

---

## 4. ⚙️ 기능 & 인터랙션 세부 명세

1. **3열 그리드 인터랙션**:
   * 각 아이템은 3열 정사각형 비율 카드(`aspect-square`)로 나열.
   * 터치 시 `scale(0.95)` 스프링 모션과 함께 하단에서 `RitualDetailDrawer` 바텀시트 슬라이드업.
2. **즐겨찾기 토글 (`favorites`)**:
   * 바텀시트 상단 하트(`❤️`) 버튼 터치 시 전역 `toggleFavorite(ritualId)` 실행.
   * 즐겨찾기 등록된 아이템은 그리드 좌측 상단에 미세한 핑키 닷 표시.
3. **`[▶ 지금 시작하기]` 액션**:
   * 클릭 시 `router.push(/player/${ritualId})`로 부드럽게 라우팅 이동.
