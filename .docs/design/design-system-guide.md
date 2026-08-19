# 🎨 마인드짐(MindGym) Next.js & Tailwind CSS 디자인 시스템 가이드 (v5)

본 문서는 **마인드짐 모바일 앱**의 정갈하고 차분한 브랜드 가치(Self-Compassion)를 일관되게 적용하기 위해, 기존의 자극적인 붉은색 경고 위주의 게임형 요소들을 완전히 배제하고 설계한 **최종 통합 디자인 시스템 규격서**입니다.

특히 본 v5 버전에서는 **Vercel 스타일의 동적 SVG 애니메이션 아이콘용 Tailwind 확장 설정 및 키프레임 프리셋**이 정밀하게 통합되었습니다.

---

## 🎨 PART 1. 브랜드 시그니처 컬러 테마 (Gently Cooled Palette)

⚠️ **절대 금지 컬러**: `#015A35`는 어둡고 강박적인 느낌을 주므로 서비스 전체에서 **절대 사용하지 마십시오**.
⚠️ **무테(Borderless) & Spacing-First 정책**: UI 간격 및 레이션 구분을 위해 `border` 계열 테두리를 최대한 쓰지 마십시오. 대신, 넉넉한 여백(padding/margin)과 매우 부드러운 소프트 그림자(Drop Shadow)를 활용하여 레이어를 우아하게 구분합니다.
⚠️ **순수 흰색(White) 테마 가이드**: 다크모드나 어두운 미색 계열 배경을 배제하고, 배경은 오직 순수 흰색(`bg-white`, `#FFFFFF`, `oklch(1 0 0)`) 버전만 고수합니다.

기존 시스템의 Warning Red를 배제하고 싱그러움과 차분함의 조화로 재수립했습니다.

```javascript
// tailwind.config.js 확장 컬러 팔레트 예시
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00C474',      // 대표 초록 불꽃, 새싹 및 마스터 완료 메인 강조 컬러
          mint: '#55DFA0',       // 보조 새싹 줄기 및 아침 가벼운 처방 뱃지
          'mint-light': '#EBFBF4', // 체크인 성공 날짜 타일 및 완료 바텀시트 배경
          tea: '#A0AEC0',        // 자연스러운 휴식일(Rest Day)의 보조 라인아트 그레이
          'tea-light': '#FFFFFF', // 휴식일 타일 및 대시보드 웰컴 위로 카드 배경
          clay: '#4E5968',       // 지지형 스토리텔링 본문 서체 전용 토스형 딥그레이
          ink: '#191F28',        // 최상위 굵은 타이틀 전용 세련된 다크 블랙
        },
      },
    },
  },
}
```

---

## 📐 PART 2. 모바일 반응형 타이포그래피 비율 (Typography Scale)

*   **최상위 메인 타이틀**: `text-xl` (20px) | `font-extrabold` | `tracking-tight` (안정된 대시보드 웰컴용)
*   **컴포넌트 카드 헤더**: `text-base` (16px) | `font-bold` | `leading-snug` (추천 리추얼 타이틀용)
*   **스토리 본문 / 묘사**: `text-sm` (14px) | `font-medium` | `leading-relaxed` | `text-brand-clay` (자비형 위로 문구)
*   **초소형 날짜 / 마크**: `text-[10px]` (10px) | `font-semibold` | `text-gray-400` (달력 타일 번호)

---

## 🎭 PART 3. 동적 SVG 아이콘용 Tailwind 확장 설정 및 모션 프리셋

Framer Motion의 물리 엔진 동작을 더욱 풍성하고 가볍게 만들기 위해, 로컬 CSS의 `globals.css` 및 `tailwind.config.js`에 주입해야 할 물리 키프레임 명세입니다.

### 1. `tailwind.config.js` 애니메이션 확장
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'sprout-grow': 'sprout-grow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
        'steam-rise': 'steam-rise 2s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
      },
      keyframes: {
        'sprout-grow': {
          '0%': { transform: 'scale(0) translateY(10px)', opacity: '0' },
          '70%': { transform: 'scale(1.15) translateY(-2px)', opacity: '0.8' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'steam-rise': {
          '0%': { transform: 'translateY(2px) translateX(0) scaleY(0.8)', opacity: '0.2' },
          '50%': { transform: 'translateY(-3px) translateX(1px) scaleY(1.1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-8px) translateX(-1px) scaleY(0.9)', opacity: '0' },
        },
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.95' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        }
      }
    }
  }
}
```

### 2. `globals.css` 전역 데코 모션 클래스
```css
/* src/app/globals.css */
@layer utilities {
  /* 오늘 날짜 타일을 탭하거나 활성화 시 피어오르는 미세 링 아웃라인 글로우 이펙트 */
  .active-ring-glow {
    box-shadow: 0 0 0 4px rgba(0, 196, 115, 0.15);
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 휴식일 타일 테두리 소프트 아웃라인 */
  .rest-ring-glow {
    box-shadow: 0 0 0 4px rgba(160, 174, 192, 0.1);
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

---

## 🧩 PART 4. GodUI 테마 토큰 및 CSS 변수 통합 가이드 (Tailwind v4 & OKLCH)

마인드짐은 전체 UI 컴포넌트 프레임워크로 **GodUI (by Lucas Bassetti)**를 채택합니다. GodUI는 Tailwind CSS v4와 Motion을 기저에 두고 작동하며, 모든 테마 토큰을 CSS 변수 기반으로 제어하므로 마인드짐 고유의 컬러 스페이스(OKLCH) 및 테마 커스텀과 완벽히 동기화됩니다.

### 1. `components.json` 설정 (GodUI 레지스트리 추가)
기본 shadcn CLI 워크플로우를 활용하여 GodUI의 고품질 컴포넌트들을 소스 레벨로 복사-붙여넣기 하기 위해 프로젝트 설정 파일에 레지스트리를 아래와 같이 연동합니다.

```json
{
  "registries": {
    "@godui": "https://godui.design/r/{name}.json"
  }
}
```

### 2. 테마 CSS 변수 매핑 (Tailwind v4 OKLCH 토큰)
GodUI는 라이트 모드와 다크 모드가 무설정(Zero-config)으로 반응하는 CSS 변수 기반 테마를 사용합니다. 마인드짐의 싱그럽고 정갈한 초록새싹 아이덴티티를 이식하기 위해 글로벌 CSS에 아래 변수들을 정밀 정의합니다.

```css
@theme {
  --color-background: oklch(1 0 0); /* 매우 연한 허브차백 배경 */
  --color-foreground: oklch(0.15 0.015 140); /* 세련된 딥그레이 서체 */
  
  --color-primary: oklch(0.72 0.18 145);      /* 마인드짐 시그니처 초록 (#00C474 상당) */
  --color-primary-foreground: oklch(1 0 0);
  
  --color-muted: oklch(0.96 0.005 140);
  --color-muted-foreground: oklch(0.45 0.01 140);
  
  --color-accent: oklch(0.94 0.02 145);       /* 자연스러운 휴식일 민트 (#55DFA0) */
  --color-accent-foreground: oklch(0.25 0.08 145);
  
  --color-border: oklch(0.92 0.005 140);
  
  /* 마인드짐 전용 스프링 텐션 키프레임 */
  --animate-sprout: sprout-grow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
```
