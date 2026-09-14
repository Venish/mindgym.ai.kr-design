# PWA & 모바일 라우팅 / 히스토리 제어 기술 계획서 (Mobile Navigation & History Lock Plan)

본 문서는 PWA 및 모바일 브라우저 환경에서 모달/서브 뷰 열림 상태 시 발생할 수 있는 **iOS Edge Swipe 이탈** 및 **Android 물리 뒤로가기 클릭 시 빈 페이지(Blank Page) 이동 현상**을 원천 차단하기 위한 3중 방어 기술 아키텍처 계획서입니다.

---

## 1. 문제 원인 분석 (Root Cause)

1. **Browser History Stack 불일치**:
   - 모달/바텀시트/서브 뷰가 열릴 때 DOM/React State만 변경되고 Browser `window.history`에는 아무런 스택이 쌓이지 않음.
   - 사용자가 뒤로가기/스와이프를 실행하면 브라우저는 실제 라우터 이전 페이지(혹은 Unmatched Route)로 이동하여 **빈 화면(Blank View)**이 렌더링됨.
2. **iOS Edge Swipe 백스텝 제스처**:
   - iOS Safari 및 iOS PWA 환경에서 좌측 테두리를 우측으로 드래그할 때 네이티브 브라우저의 뒤로가기 이벤트를 강제로 발생시킴.

---

## 2. 3중 방어 아키텍처 (Triple-Lock Strategy)

```text
[ User Back Action (Swipe / Android Back Button) ]
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │ Layer 1: CSS Touch/Overscroll Lock      │ ➔ iOS 테두리 스와이프 이탈 차단
  └────────────────────┬────────────────────┘
                       │
                       ▼
  ┌─────────────────────────────────────────┐
  │ Layer 2: JS History PopState Interceptor│ ➔ pushState 가짜 스택 + popstate 낚아채기
  └────────────────────┬────────────────────┘
                       │
                       ▼
  ┌─────────────────────────────────────────┐
  │ Layer 3: Modal Store & Overlay Close    │ ➔ 실제 페이지 이동 차단 후 모달만 안전 종료
  └─────────────────────────────────────────┘
```

---

## 3. 파일별 구현 명세 (Implementation Details)

### 3.1 [Layer 1] CSS 전역 제스처 차단 (`src/app/globals.css`)

모바일 테두리 스와이프 시 브라우저 통째로 밀리는 바운스 및 백스텝 동작을 차단합니다.

```css
/* iOS / Android 브라우저 좌우 edge swipe 백스텝 비활성화 */
html, body {
  overscroll-behavior-x: none;
  touch-action: pan-y; /* 상하 스크롤만 허용, 좌우 제스처 이탈 차단 */
}

/* 모달 팝업 내부 스크롤 영역에만 정상 스크롤 보장 */
.modal-scroll-viewport {
  overscroll-behavior-y: contain;
}
```

---

### 3.2 [Layer 2] History Lock 커스텀 훅 (`src/hooks/useModalHistory.ts`)

모달이 열릴 때 가짜 히스토리 스택(`pushState`)을 쌓아 뒤로가기 시 실제 라우트 이동 대신 모달만 닫히도록 제어합니다.

```typescript
import { useEffect, useRef } from 'react';

interface UseModalHistoryOptions {
  isOpen: boolean;
  onClose: () => void;
  modalId?: string;
}

export function useModalHistory({ isOpen, onClose, modalId = 'global-modal' }: UseModalHistoryOptions) {
  const isPushedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      isPushedRef.current = false;
      return;
    }

    // 1. 모달 오픈 시 브라우저 히스토리에 Dummy State 추가
    window.history.pushState({ modalOpen: true, modalId }, '');
    isPushedRef.current = true;

    // 2. 뒤로가기(popstate) 이벤트 핸들러
    const handlePopState = (event: PopStateEvent) => {
      // 뒤로가기가 실행되었으므로 모달만 닫아주고 라우트 이동 차단
      isPushedRef.current = false;
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // 사용자가 X 버튼이나 딤 배경을 직접 클릭해서 모달을 닫은 경우, 쌓았던 dummy state 제거
      if (isPushedRef.current && window.history.state?.modalOpen) {
        isPushedRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen, onClose, modalId]);
}
```

---

### 3.3 [Layer 3] 전역 오버레이 연동 (`src/components/providers/GlobalOverlayProvider.tsx`)

Zustand 기반 `useModalStore` 및 `GlobalOverlayProvider`에 히스토리 락을 연동하여 서비스 전체 모달에 일괄 적용합니다.

```tsx
'use client';

import { useModalStore } from '@/stores/useModalStore';
import { useModalHistory } from '@/hooks/useModalHistory';

export function GlobalOverlayProvider() {
  const { isOpen, modalType, closeModal } = useModalStore();

  // 모달 오픈 시 자동 히스토리 락 가두기
  useModalHistory({
    isOpen,
    onClose: closeModal,
    modalId: modalType || 'overlay-modal',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
      {/* Modal Content */}
    </div>
  );
}
```

---

## 4. 모바일/PWA 검증 시나리오 (Verification Plan)

### 4.1 iOS PWA / Safari 환경
1. 대시보드에서 리추얼 상세 모달 또는 체크인 바텀시트 호출.
2. 디바이스 화면 맨 좌측 테두리에서 우측으로 핑거 스와이프(Edge Swipe) 실행.
3. **Pass 조건**: 브라우저 뒤로가기(빈 화면)가 발생하지 않고, **열려 있던 모달만 닫히며 대시보드가 100% 렌더링 유지**되는지 검증.

### 4.2 Android PWA / Chrome 환경
1. 모달 내부 3단계 스텝(Step 1 ➔ Step 2) 이동.
2. Android 디바이스 하단 네비게이션 바의 '물리 뒤로가기' 버튼 클릭.
3. **Pass 조건**: 대시보드 이전 라우트로 이탈하지 않고 **Step 2 ➔ Step 1 ➔ 모달 닫힘** 순으로 안전하게 닫히는지 검증.
