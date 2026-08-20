# 📖 [PAGE-SPEC 03] 월간 마음건강 매거진 서재 (`/magazine`) 상세 구현 명세서

본 문서는 월간 매거진 서재 및 타이포그래피 모달 뷰어를 **`src/app/(main)/magazine/page.tsx`**에 구현하기 위한 개발 명세서입니다.

---

## 1. 🎯 페이지 개요 & 베이스 구조

* **라우트 경로**: `/magazine` (Next.js App Router `src/app/(main)/magazine/page.tsx`)
* **디자인 컨셉**: 고풍스럽고 세련된 에디토리얼 매거진 서재 (Warm Editorial Style).
* **핵심 역할**:
  * 이번 달 대표 이슈 매거진 메인 커버 노출.
  * 과월호(1월~7월호) 아카이브 책장 그리드 제공.
  * 매거진 터치 시 전체화면 타이포그래피 모달 뷰어 활성화.
  * 최하단 스크롤 센싱 + 1분 체류 시 `+10 덤벨 획득! 🏆` 완료 토스트 출력 및 완독 아카이빙.

---

## 2. 🧩 컴포넌트 모듈 구조

```text
src/app/(main)/magazine/
├── page.tsx                           # 매거진 서재 메인 컨테이너
└── _components/
    ├── FeaturedMagazineHero.tsx       # 이번 달 스페셜 일러스트형 메인 이슈 커버 배너
    ├── PastIssuesGrid.tsx             # 과월호 아카이브 책장 그리드 (2열 카드)
    └── MagazineViewerModal.tsx        # 타이포그래피 뷰어 모달 & 완독 센서 토스트
```

---

## 3. 🧠 완독 감지 센서 & 보상 로직 명세

```typescript
// MagazineViewerModal.tsx 내부 완독 센서 구현 예시
useEffect(() => {
  if (!isOpen) return;

  const timer = setTimeout(() => {
    setHasDwellTime(true); // 1분 체류 완료
  }, 60000);

  return () => clearTimeout(timer);
}, [isOpen]);

const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
  if (scrollTop + clientHeight >= scrollHeight - 40) {
    if (hasDwellTime && !isCompleted) {
      setIsCompleted(true);
      readMagazine(magazine.id); // Context 상태 갱신
      addDumbbells(10);           // +10 덤벨 보상 지급
      showToast("🏆 매거진 완독 완료! +10 덤벨이 적립되었습니다.");
    }
  }
};
```

---

## 4. 🎨 디자인 & 에디토리얼 가이드

* **타이포그래피 위계**: 제목 폰트 크기 `text-2xl font-black`, 본문 `text-sm font-normal text-gray-700 leading-relaxed`.
* **여백 규칙**: 아티클 섹션 간 여백 `gap-6`, 좌우 패딩 `px-6` 지정하여 읽기 편한 서재 분위기 연출.
