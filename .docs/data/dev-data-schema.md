# 🏋️ 마인드짐(MindGym) Next.js 실전 연동용 정적 데이터셋 및 헬퍼 함수 명세 (v2-Updated)

본 문서는 마인드짐(MindGym)의 원본 데이터베이스인 **「MindGym_개발데이터」**를 Next.js App Router 프로젝트 환경에서 즉각 `import`하여 사용할 수 있도록 TypeScript 파일 규격으로 원천 추출한 최종 가이드라인입니다.

---

## ⚙️ 0. 전역 상태 인터페이스 규격 (`src/context/MindGymContext.tsx`)

```typescript
export type GardenDayState = "COMPLETED" | "REST_DAY";

export interface MindGymStateContextType {
  userName: string;
  totalDumbbells: number;
  completedDays: string[]; // 실천 완료 날짜 (예: ["2026-08-01", "2026-08-02"])
  restDays: string[];      // 자연스러운 휴식일 (예: ["2026-08-03"])
  currentIntention: string;
  favorites: string[];     // 즐겨찾기 리추얼 ID 목록
  readMagazines: string[]; // 완독 매거진 ID 목록
  addDumbbells: (amount: number) => void;
  markTodayCompleted: () => void;
  markTodayRest: () => void;
  toggleFavorite: (id: string) => void;
  readMagazine: (id: string) => void;
  getLevelName: (dumbbells?: number) => string;
  getNextLevelDiff: () => number;
}
```

---

## 📂 1. KOSS 직무 스트레스 36개 설문 문항 및 역문항 데이터 (`/src/data/koss.ts`)

KOSS 표준 8대 스트레스 영역의 36개 실제 질문과, 백엔드 연산 시 반드시 역배점 환산(`[1점➔4점, 2점➔3점, 3점➔2점, 4점➔1점]`)을 거쳐야 하는 **★ 역문항 타겟 정보**를 완전하게 수록한 데이터 구조입니다.

```typescript
export interface KOSSQuestion {
  id: number;
  domain: "물리환경" | "직무요구" | "직무자율" | "관계갈등" | "직업불안정" | "조직체계" | "보상부적절" | "직장문화";
  domainId: number; // 영역 내 고유 번호
  question: string;
  isReverse: boolean; // ★ 역문항 여부
}

export const kossQuestions: KOSSQuestion[] = [
  {
    "id": 1,
    "domain": "물리환경",
    "domainId": 1,
    "question": "나는 업무 중에 근골격계에 부담을 주는 작업(반복 동작, 중량물 취급 등)을 한다.",
    "isReverse": false
  },
  {
    "id": 2,
    "domain": "물리환경",
    "domainId": 2,
    "question": "나는 업무 중에 소음, 진동, 온도 등 나쁜 물리적 환경에 노출된다.",
    "isReverse": false
  },
  {
    "id": 3,
    "domain": "물리환경",
    "domainId": 3,
    "question": "나는 업무 중에 유해물질(분진, 화학물질, 방사선 등)에 노출된다.",
    "isReverse": false
  },
  {
    "id": 4,
    "domain": "직무요구",
    "domainId": 1,
    "question": "나는 일이 많아 항상 시간에 쫓기며 일한다.",
    "isReverse": false
  },
  {
    "id": 5,
    "domain": "직무요구",
    "domainId": 2,
    "question": "업무량이 현저하게 증가하였다.",
    "isReverse": false
  },
  {
    "id": 6,
    "domain": "직무요구",
    "domainId": 3,
    "question": "업무를 수행하기 위해 충분한 시간적 여유가 없다.",
    "isReverse": false
  },
  {
    "id": 7,
    "domain": "직무요구",
    "domainId": 4,
    "question": "나는 여러 가지 일을 동시에 해야 한다.",
    "isReverse": false
  },
  {
    "id": 8,
    "domain": "직무요구",
    "domainId": 5,
    "question": "업무가 끝난 후에도 업무에 관한 생각을 멈출 수가 없다.",
    "isReverse": false
  },
  {
    "id": 9,
    "domain": "직무요구",
    "domainId": 6,
    "question": "나는 업무 중에 타인의 신체적·언어적 폭력에 노출된다.",
    "isReverse": false
  },
  {
    "id": 10,
    "domain": "직무요구",
    "domainId": 7,
    "question": "내 업무는 감정적으로 힘든 상황을 자주 경험하게 한다.",
    "isReverse": false
  },
  {
    "id": 11,
    "domain": "직무요구",
    "domainId": 8,
    "question": "내 업무는 신체적 노력(힘, 속도, 지구력)이 매우 많이 필요하다.",
    "isReverse": false
  },
  {
    "id": 12,
    "domain": "직무자율",
    "domainId": 1,
    "question": "나의 업무는 내가 직접 결정할 수 있는 것이 별로 없다.",
    "isReverse": false
  },
  {
    "id": 13,
    "domain": "직무자율",
    "domainId": 2,
    "question": "나의 업무에서 창의적인 생각이나 의견을 내기가 어렵다.",
    "isReverse": false
  },
  {
    "id": 14,
    "domain": "직무자율",
    "domainId": 3,
    "question": "나의 업무수행에 필요한 전문지식이나 기술이 부족하다.",
    "isReverse": false
  },
  {
    "id": 15,
    "domain": "직무자율",
    "domainId": 4,
    "question": "내 업무는 단조롭고 반복적이다.",
    "isReverse": false
  },
  {
    "id": 16,
    "domain": "직무자율",
    "domainId": 5,
    "question": "내 업무의 양 and 속도를 스스로 조절할 수 있다.",
    "isReverse": true
  },
  {
    "id": 17,
    "domain": "관계갈등",
    "domainId": 1,
    "question": "나는 직장에서 상사(팀장, 임원 등)와 불화가 있다.",
    "isReverse": false
  },
  {
    "id": 18,
    "domain": "관계갈등",
    "domainId": 2,
    "question": "직장에서 내 의견을 반영할 기회가 거의 없다.",
    "isReverse": false
  },
  {
    "id": 19,
    "domain": "관계갈등",
    "domainId": 3,
    "question": "나의 업무가 다른 부서 업무와 갈등을 일으킨다.",
    "isReverse": false
  },
  {
    "id": 20,
    "domain": "관계갈등",
    "domainId": 4,
    "question": "직장에서 동료 또는 상하 간의 관계가 불편하고 어렵다.",
    "isReverse": false
  },
  {
    "id": 21,
    "domain": "직업불안정",
    "domainId": 1,
    "question": "나의 현재 고용 상태가 안정적이지 않다.",
    "isReverse": false
  },
  {
    "id": 22,
    "domain": "직업불안정",
    "domainId": 2,
    "question": "나는 현재 직장을 계속 다닐 수 있을지 모르겠다.",
    "isReverse": false
  },
  {
    "id": 23,
    "domain": "조직체계",
    "domainId": 1,
    "question": "우리 직장에서 내가 하는 일은 인정받고 있다.",
    "isReverse": true
  },
  {
    "id": 24,
    "domain": "조직체계",
    "domainId": 2,
    "question": "나의 업무량이 다른 직원과 비교해 크게 다르지 않다.",
    "isReverse": true
  },
  {
    "id": 25,
    "domain": "조직체계",
    "domainId": 3,
    "question": "우리 부서와 다른 부서 간에 마찰이 없다.",
    "isReverse": true
  },
  {
    "id": 26,
    "domain": "조직체계",
    "domainId": 4,
    "question": "나의 근무환경에 만족한다.",
    "isReverse": true
  },
  {
    "id": 27,
    "domain": "조직체계",
    "domainId": 5,
    "question": "인사제도(승진, 고과, 업무배정 등)가 공정하고 합리적이다.",
    "isReverse": true
  },
  {
    "id": 28,
    "domain": "조직체계",
    "domainId": 6,
    "question": "우리 직장에는 근로자 건강을 위한 제도적 장치가 마련되어 있다.",
    "isReverse": true
  },
  {
    "id": 29,
    "domain": "조직체계",
    "domainId": 7,
    "question": "우리 직장의 경영방침이 근로자에게 잘 전달되고 있다.",
    "isReverse": true
  },
  {
    "id": 30,
    "domain": "보상부적절",
    "domainId": 1,
    "question": "나의 직업은 내가 기대하는 만큼의 보상(급여, 승진, 명예 등)이 주어지지 않는다.",
    "isReverse": false
  },
  {
    "id": 31,
    "domain": "보상부적절",
    "domainId": 2,
    "question": "나의 능력을 개발하고 발휘할 기회가 부족하다.",
    "isReverse": false
  },
  {
    "id": 32,
    "domain": "보상부적절",
    "domainId": 3,
    "question": "업무의 내용이 실제 직위나 직급에 어울리지 않는다.",
    "isReverse": false
  },
  {
    "id": 33,
    "domain": "직장문화",
    "domainId": 1,
    "question": "직장의 분위기가 권위적이고 수직적이다.",
    "isReverse": false
  },
  {
    "id": 34,
    "domain": "직장문화",
    "domainId": 2,
    "question": "내가 얼마나 열심히 일하는지 직장에서 잘 인정받지 못하는 것 같다.",
    "isReverse": false
  },
  {
    "id": 35,
    "domain": "직장문화",
    "domainId": 3,
    "question": "성별(남성 또는 여성)이라는 이유로 직장에서 불이익을 받는다.",
    "isReverse": false
  },
  {
    "id": 36,
    "domain": "직장문화",
    "domainId": 4,
    "question": "회식 또는 직장 모임에서 술을 마시도록 강요받는다.",
    "isReverse": false
  }
];

/**
 * 1. 유저 응답 원본 점수를 역문항 처리하여 보정 점수를 반환하는 함수
 */
export function getAdjustedScore(questionId: number, rawValue: number): number {
  const question = kossQuestions.find(q => q.id === questionId);
  if (!question) return rawValue;
  if (question.isReverse) {
    // 1->4, 2->3, 3->2, 4->1 치환
    return 5 - rawValue;
  }
  return rawValue;
}

/**
 * 2. KOSS 8대 영역별 표준화 환산 점수 계산 함수 (0 ~ 100점 범위)
 * 표준화 공식: (실제 획득 합산 점수 - 영역 문항 수) / (영역 문항 수 * 3) * 100
 */
export function calculateDomainScore(domainName: string, adjustedAnswers: { [qId: number]: number }): number {
  const domainQuestions = kossQuestions.filter(q => q.domain === domainName);
  const qCount = domainQuestions.length;
  
  let sum = 0;
  domainQuestions.forEach(q => {
    sum += adjustedAnswers[q.id] || 1; // 미응답 시 최소 점수 1점 처리
  });

  // 표준화 환산식 실행
  const standardized = ((sum - qCount) / (qCount * 3)) * 100;
  return Math.round(standardized * 10) / 10; // 소수점 첫째짜리 반올림
}

/**
 * 3. KOSS 종합 점수 평균 기반의 종합 번아웃 위험 등급 판정 함수
 * - 양호(🟢): 0 ~ 43점
 * - 주의(🟡): 44 ~ 66점
 * - 위험(🔴): 67점 이상
 */
export function evaluateBurnoutRisk(averageStandardScore: number): {
  status: "NORMAL" | "WARNING" | "DANGER";
  label: "양호" | "주의" | "위험";
  color: string;
  description: string;
} {
  if (averageStandardScore < 44) {
    return {
      status: "NORMAL",
      label: "양호",
      color: "#43A047", // Green
      description: "지금은 비교적 안정된 상태예요 😊"
    };
  } else if (averageStandardScore < 67) {
    return {
      status: "WARNING",
      label: "주의",
      color: "#FB8C00", // Orange
      description: "조금씩 지쳐가고 있어요"
    };
  } else {
    return {
      status: "DANGER",
      label: "위험",
      color: "#E53935", // Red
      description: "번아웃이 상당히 진행되고 있어요 😔"
    };
  }
}
```

---

## 🧘 2. 대표 리추얼 19종 상세 스펙 데이터 (`/src/data/rituals.ts`)

원천 72종 리추얼 DB 중 핵심 설계서(P-01 ~ P-20) 전 영역에 동적 매핑되어 사용자의 힐링 플레이를 유도하는 **대표 리추얼 메타 데이터**입니다.

```typescript
export interface Ritual {
  id: string; // 예: RT-030
  title: string;
  category: string; // 불안, 자책, 감정, 자기탐색, 무기력, 외로움 등
  time: string; // 예: 3분
  type: "SHORT" | "HYBRID" | "LONG";
  dumbbell: number; // 획득 포인트 (SHORT: +5, HYBRID: +8, LONG: +12)
  description: string;
}

export const ritualsData: Ritual[] = [
  {
    "id": "RT-001",
    "title": "미소 명상",
    "category": "불안",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "시각화 명상으로 미소를 그리며 마음의 긴장을 풉니다."
  },
  {
    "id": "RT-002",
    "title": "마음챙김 벨",
    "category": "불안",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "앱에서 들리는 싱잉볼 소리에 맞춰 잡념과 생각을 즉시 끊어냅니다."
  },
  {
    "id": "RT-003",
    "title": "시선고정명상",
    "category": "불안",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "특정 정적 사물을 1분 동안 있는 그대로 응시하며 마음을 가라앉힙니다."
  },
  {
    "id": "RT-004",
    "title": "횡경막 호흡",
    "category": "불안",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮춥니다."
  },
  {
    "id": "RT-005",
    "title": "망할 확률 계산기",
    "category": "불안",
    "time": "2분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "머릿속 최악의 시나리오가 실제로 실현될 수학적 확률을 수치로 파싱해 안심을 얻습니다."
  },
  {
    "id": "RT-006",
    "title": "긍정 만약에",
    "category": "불안",
    "time": "2분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "부정적 가정을 완벽히 비틀어, 최상의 긍정적 결말을 적극적으로 시각화합니다."
  },
  {
    "id": "RT-007",
    "title": "걱정 유통기한 라벨링",
    "category": "불안",
    "time": "2분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "떠오르는 쓸모없는 걱정에 유통기한 라벨을 붙여 안전한 병 속에 격리 보관합니다."
  },
  {
    "id": "RT-008",
    "title": "스트레스 분쇄",
    "category": "불안",
    "time": "2분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "가상의 스마트폰 파쇄기를 켜고, 내 마음을 옥죄는 스트레스 문장을 분쇄해 버립니다."
  },
  {
    "id": "RT-009",
    "title": "걱정 저금통",
    "category": "불안",
    "time": "2분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "오늘 밤 당장 해결할 수 없는 일들을 앱 속 가상 걱정저금통에 맡겨 두고 마음 편히 쉽니다."
  },
  {
    "id": "RT-010",
    "title": "333 나비포옹",
    "category": "불안",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "양팔을 교차해 스스로 양어깨를 번갈아 다독이며 불안과 공포 요소를 잠재웁니다."
  },
  {
    "id": "RT-011",
    "title": "미래 그림일기",
    "category": "불안",
    "time": "3분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "완벽하게 치유되고 번아웃을 극복한 나의 기쁜 미래를 상상해 AI 프롬프트 이미지로 렌더링합니다."
  },
  {
    "id": "RT-012",
    "title": "내편일기",
    "category": "자책",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "세상의 비난 속에서도 오직 나의 가장 다정하고 우호적인 든든한 변호인이 되어 일기를 씁니다."
  },
  {
    "id": "RT-013",
    "title": "미고사",
    "category": "자책",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "오늘 힘겨웠던 나에게 '미안해, 고마워, 사랑해'를 나직이 속삭이며 따뜻한 화해를 청합니다."
  },
  {
    "id": "RT-014",
    "title": "자존감 칠판",
    "category": "자책",
    "time": "1분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "가상 칠판 위에 나를 채우는 칭찬과 긍정 피드백 메시지를 가득 기록해 읽어봅니다."
  },
  {
    "id": "RT-015",
    "title": "공수치 폭풍칭찬",
    "category": "자책",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "카메라를 거울 삼아 내 비주얼과 오늘의 사소한 태도를 폭풍처럼 소리 내어 칭찬합니다."
  },
  {
    "id": "RT-016",
    "title": "오늘의 상장",
    "category": "자책",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "오늘 하루를 그저 살아내느라 고생한 스스로에게 최고의 상을 직접 제정하고 수여합니다."
  },
  {
    "id": "RT-017",
    "title": "달의 뒷편 롤링페이퍼",
    "category": "자책",
    "time": "15분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "내가 생각하는 치명적 단점들을 완전히 역발상해 빛나는 장점으로 승화시키는 연습지입니다."
  },
  {
    "id": "RT-018",
    "title": "지우개 테라피",
    "category": "자책",
    "time": "3분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "가슴에 박힌 날카로운 상처 멘트를 타이핑한 후, 손가락으로 문질러 흔적 없이 지워버립니다."
  },
  {
    "id": "RT-019",
    "title": "셀프 하이파이브",
    "category": "자책",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "액정이나 거울 속 내 눈을 정면으로 마주하고 시원하게 짝! 손뼉을 맞부딪치며 에너지를 나눕니다."
  },
  {
    "id": "RT-020",
    "title": "원라인드로잉",
    "category": "자책",
    "time": "2분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "화면 위에 떼지 않고 연속되는 아름다운 선 하나를 집중해 그리며 복잡해진 머리를 비워냅니다."
  },
  {
    "id": "RT-021",
    "title": "거절 연습장",
    "category": "자책",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "거절 못 하는 유저를 위해 미안해하지 않고 완곡하면서 단호하게 끊어내는 멘트를 기록합니다."
  },
  {
    "id": "RT-022",
    "title": "투데이 확언",
    "category": "자책",
    "time": "2분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "오늘 하루 가고자 하는 내적인 단련 목적에 귀를 기울여 한 문장 확언을 힘차게 선포합니다."
  },
  {
    "id": "RT-023",
    "title": "감정개명",
    "category": "감정",
    "time": "2분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "추상적이고 무서운 감정 코드들에 '귀여운 아기 몬스터' 등의 애칭을 붙여 두려움을 낮춥니다."
  },
  {
    "id": "RT-024",
    "title": "마음날씨 기록",
    "category": "감정",
    "time": "3분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "외부에서 불어온 사건과 나의 고유 기온을 완전히 분리해 오늘의 날씨 카드로 남깁니다."
  },
  {
    "id": "RT-025",
    "title": "Y 7 질문법",
    "category": "감정",
    "time": "5분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "화가 나거나 슬픈 근원 이유를 밝히기 위해 '왜(Why)'를 연달아 7번 던져 자아를 추적합니다."
  },
  {
    "id": "RT-026",
    "title": "객관화일기",
    "category": "감정",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "주관적 분노와 감정 해석을 다 빼고, 실제 발생한 '의도와 팩트'만 극도로 건조하게 서술합니다."
  },
  {
    "id": "RT-027",
    "title": "사실과 견해 분리하기",
    "category": "감정",
    "time": "3분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "내 머릿속 왜곡된 상상(견해)과 물리적 사건(사실)을 두 칼럼으로 쪼개서 냉철히 구분 짓습니다."
  },
  {
    "id": "RT-028",
    "title": "불평일기",
    "category": "감정",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "누구의 눈치도 보지 않고 마음의 불평불만을 사정없이 쏟아낸 뒤 그대로 인정하고 털어냅니다."
  },
  {
    "id": "RT-029",
    "title": "긍정해석연습",
    "category": "감정",
    "time": "3분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "부정적 사건 배후에 숨겨진 예상 밖의 가르침과 소중하게 얻은 깨달음 요소를 발굴해 봅니다."
  },
  {
    "id": "RT-030",
    "title": "박스 호흡",
    "category": "불안",
    "time": "3분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "네모 상자의 네 변을 그리듯 [4초 마시고 - 4초 멈추고 - 4초 뱉고 - 4초 쉬기] 주기를 조절해 극심한 정서적 패닉 상태를 구조합니다."
  },
  {
    "id": "RT-040",
    "title": "감사 3가지",
    "category": "감정",
    "time": "3분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "당연하게 흘려보낸 일상에서 고마웠던 세 가지 조각을 구체적인 언어로 콕 집어 기록합니다."
  },
  {
    "id": "RT-046",
    "title": "자기 자비 편지",
    "category": "자책",
    "time": "8분",
    "type": "HYBRID",
    "dumbbell": 8,
    "description": "마치 가장 아끼는 절친이 넘어져 울고 있을 때 다정하게 감싸 안는 위로의 말을 스스로에게 편지로 부칩니다."
  },
  {
    "id": "RT-049",
    "title": "에너지 드레인 찾기",
    "category": "자기탐색",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "내 한정된 정신 에너지를 밑 빠진 독처럼 앗아가는 보이지 않는 구멍(Drainer)을 분류해 추방 조치합니다."
  },
  {
    "id": "RT-055",
    "title": "오늘의 승리 목록",
    "category": "자기탐색",
    "time": "5분",
    "type": "LONG",
    "dumbbell": 12,
    "description": "아주 미세한 타협이나 승리, 성과라도 가치 있게 칭송하여 성공 지도를 전면에 기록합니다."
  },
  {
    "id": "RT-056",
    "title": "근육 이완 스캔",
    "category": "무기력",
    "time": "5분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "머리끝부터 발끝까지 미세 근육을 한 부위씩 번갈아 수축했다가 완전히 풀어놓으며 신체 긴장을 해소합니다."
  },
  {
    "id": "RT-062",
    "title": "5분 파워냅 가이드",
    "category": "무기력",
    "time": "5분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "피로에 지친 뇌를 급속 충전시키기 위한 깊은 무의식 명상 사운드 및 최면 호흡 가이드입니다."
  },
  {
    "id": "RT-069",
    "title": "오늘의 감정 단어",
    "category": "외로움",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "오늘 퇴근길 내 상태를 정확히 매칭하는 1개의 감정 형용사를 픽스하고 내일의 기분을 선언합니다."
  },
  {
    "id": "RT-070",
    "title": "오늘의 색깔",
    "category": "외로움",
    "time": "1분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "오늘 하루 나의 마음 감도를 가장 은유적으로 대변하는 커스텀 무드 컬러를 입힙니다."
  },
  {
    "id": "RT-071",
    "title": "몸 신호 체크인",
    "category": "무기력",
    "time": "3분",
    "type": "SHORT",
    "dumbbell": 5,
    "description": "심장박동수, 눈의 뻐근함, 손끝 감도를 세밀하게 관찰해 내 물리적인 한계 경보 수치를 산출합니다."
  }
];
```

---

## 🔄 3. 상황코드 기반 맞춤 리추얼 매핑 데이터 (`/src/data/situations.ts`)

유저의 부정적 감정, 소진, 성격 고민 상태를 파악하여 가장 정밀한 치료 루틴을 최우선 1, 2, 3순위로 큐레이션 매핑해 주는 핵심 알고리즘 딕셔너리입니다.

```typescript
export interface SituationMap {
  code: string; // S01 ~ S18
  label: string;
  category: "감정" | "소진" | "성장";
  rituals: string[]; // 매핑된 리추얼 ID 배열 (우선순위 순서대로 배열)
}

export const situationsMap: SituationMap[] = [
  {
    "code": "S01",
    "label": "감정 인식 부재",
    "category": "감정",
    "rituals": [
      "RT-069",
      "RT-070",
      "RT-019"
    ]
  },
  {
    "code": "S02",
    "label": "범불안",
    "category": "감정",
    "rituals": [
      "RT-030",
      "RT-002",
      "RT-006"
    ]
  },
  {
    "code": "S03",
    "label": "우울감",
    "category": "감정",
    "rituals": [
      "RT-040",
      "RT-046"
    ]
  },
  {
    "code": "S04",
    "label": "직장 갈등·분노",
    "category": "감정",
    "rituals": [
      "RT-030",
      "RT-024"
    ]
  },
  {
    "code": "S05",
    "label": "외로움",
    "category": "감정",
    "rituals": [
      "RT-026"
    ]
  },
  {
    "code": "S06",
    "label": "자기비판·자책",
    "category": "감정",
    "rituals": [
      "RT-046",
      "RT-040"
    ]
  },
  {
    "code": "S07",
    "label": "번아웃 초기",
    "category": "소진",
    "rituals": [
      "RT-024",
      "RT-049"
    ]
  },
  {
    "code": "S08",
    "label": "번아웃 중기",
    "category": "소진",
    "rituals": [
      "RT-062",
      "RT-003"
    ]
  },
  {
    "code": "S09",
    "label": "번아웃 말기",
    "category": "소진",
    "rituals": [
      "RT-062",
      "RT-056"
    ]
  },
  {
    "code": "S10",
    "label": "만성 피로",
    "category": "소진",
    "rituals": [
      "RT-062",
      "RT-005",
      "RT-071"
    ]
  },
  {
    "code": "S11",
    "label": "업무 과부하",
    "category": "소진",
    "rituals": [
      "RT-004",
      "RT-016"
    ]
  },
  {
    "code": "S12",
    "label": "회복 욕구",
    "category": "소진",
    "rituals": [
      "RT-056",
      "RT-062"
    ]
  },
  {
    "code": "S13",
    "label": "루틴 형성",
    "category": "소진",
    "rituals": [
      "RT-001",
      "RT-003",
      "RT-016"
    ]
  },
  {
    "code": "S14",
    "label": "인정·칭찬 욕구",
    "category": "성장",
    "rituals": [
      "RT-055",
      "RT-016"
    ]
  },
  {
    "code": "S15",
    "label": "의미 상실",
    "category": "성장",
    "rituals": [
      "RT-040",
      "RT-049"
    ]
  },
  {
    "code": "S16",
    "label": "변화·전환기",
    "category": "성장",
    "rituals": [
      "RT-001"
    ]
  },
  {
    "code": "S17",
    "label": "성과 압박",
    "category": "성장",
    "rituals": [
      "RT-055",
      "RT-046"
    ]
  },
  {
    "code": "S18",
    "label": "공감·지지 욕구",
    "category": "성장",
    "rituals": [
      "RT-026"
    ]
  }
];

/**
 * 복수 선택된 상황코드(S-code) 중 우선순위 분류 룰에 맞춰 최적의 추천 1순위 상황코드 1개를 뽑아내는 의사결정 함수
 * [우선순위 판정 기준]
 * 1. 카테고리 우선순위: 소진 > 감정 > 성장 순
 * 2. 동일 카테고리 내: 앞 번호 상황코드 우선 (S01 < S02 < ... < S18)
 * 3. 최대 선택 제한: 유저가 아침 체크인 시 최대 3개 감정단어를 골랐을 때 연계
 */
export function getPrimarySituationCode(selectedCodes: string[]): string | null {
  if (!selectedCodes || selectedCodes.length === 0) return null;

  const mappedSituations = selectedCodes
    .map(code => situationsMap.find(s => s.code === code))
    .filter((s): s is SituationMap => !!s);

  if (mappedSituations.length === 0) return null;

  // 카테고리별 가중치 매핑
  const categoryWeight = {
    "소진": 3,
    "감정": 2,
    "성장": 1
  };

  // 가중치 역순(소진이 가장 위로), 코드 오름차순(앞번호 우선)으로 정렬 실행
  mappedSituations.sort((a, b) => {
    const weightA = categoryWeight[a.category];
    const weightB = categoryWeight[b.category];
    
    if (weightA !== weightB) {
      return weightB - weightA; // 내림차순 정렬 (높은 가중치 우선)
    }
    // 동일 카테고리 시 앞번호 우선 (문자열 오름차순)
    return a.code.localeCompare(b.code);
  });

  return mappedSituations[0].code;
}

/**
 * 최종 추출된 1순위 상황코드에 대응하는 처방 리추얼 목록을 반환하는 헬퍼 함수
 */
export function getRecommendedRituals(situationCode: string): Ritual[] {
  const sit = situationsMap.find(s => s.code === situationCode);
  if (!sit) return [];
  
  return sit.rituals
    .map(rId => ritualsData.find(r => r.id === rId))
    .filter((r): r is Ritual => !!r);
}
```
