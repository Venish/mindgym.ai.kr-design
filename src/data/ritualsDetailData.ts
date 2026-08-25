import { getIconPath } from "@/utils/iconMap";

export interface RitualDetail {
  id: string;
  title: string;
  category: string;
  time: string;
  level: string;
  duration: string;
  reward: string;
  iconNum: number;
  iconPath: string;
  desc: string;
  steps: [string, string, string]; // 3단계 실천 요약 가이드
  isLocked?: boolean;
}

// .docs/rituals/ 및 04_리추얼_목록_72개.md 기준 72개 리추얼 상세 데이터 딕셔너리
export const RITUALS_DETAIL_MAP: Record<string, RitualDetail> = {
  // 🔴 P1 — 베타 필수 9개
  "RT-001": {
    id: "RT-001",
    title: "미소 명상",
    category: "휴식과 충전",
    time: "3분",
    level: "중급",
    duration: "한달",
    reward: "+30",
    iconNum: 1,
    iconPath: getIconPath(1),
    desc: "얼굴 근육의 긴장을 풀고 평온한 활력을 채우는 아침 명상입니다. 입가에 옅은 미소를 지으며 한달 동안 긍정 정서를 누적해 보세요.",
    steps: [
      "편안한 자세로 앉아 양 어깨의 긴장을 천천히 내려놓습니다.",
      "입가에 옅은 미소를 지으며 얼굴 80여 개 근육의 긴장을 풉니다.",
      "3분간 깊은 호흡을 유지하며 내면의 온전한 평온에 몰입합니다.",
    ],
  },
  "RT-002": {
    id: "RT-002",
    title: "바디스캔 명상",
    category: "휴식과 충전",
    time: "5분",
    level: "중급",
    duration: "한달",
    reward: "+30",
    iconNum: 46,
    iconPath: getIconPath(46),
    desc: "불안·통증·수면에 효과적인 명상입니다. 머리부터 발끝까지 감각을 깊이 있게 관찰하고 이완합니다.",
    steps: [
      "편안한 자세로 누워 깊은 호흡을 3회 반복합니다.",
      "정수리부터 발끝까지 신체 부위별 긴장을 순서대로 관찰합니다.",
      "숨을 내쉬며 굳어있는 긴장을 무겁게 비워냅니다.",
    ],
  },
  "RT-003": {
    id: "RT-003",
    title: "인지 재구성 일기",
    category: "감정 정돈",
    time: "5분",
    level: "중급",
    duration: "한달",
    reward: "+30",
    iconNum: 12,
    iconPath: getIconPath(12),
    desc: "나를 괴롭히는 인지 왜곡을 교정하고 심리적 핵심을 다루는 반박 일기 세션입니다.",
    steps: [
      "지금 나를 괴롭히는 자동적 부정 생각을 그대로 기록합니다.",
      "이 생각이 객관적 사실인지 반박 질문을 던집니다.",
      "보다 유연하고 다정한 대안적 생각을 새로 작성합니다.",
    ],
  },
  "RT-004": {
    id: "RT-004",
    title: "걱정 일기",
    category: "스트레스 비우기",
    time: "3분",
    level: "초급",
    duration: "매일",
    reward: "+15",
    iconNum: 28,
    iconPath: getIconPath(28),
    desc: "머릿속을 맴도는 불안과 미래에 대한 공포를 글로 적어 털어내는 리추얼입니다.",
    steps: [
      "막연한 걱정과 공포를 솔직하게 한 줄씩 적습니다.",
      "내가 통제할 수 있는 일과 없는 일을 구분합니다.",
      "통제할 수 없는 걱정은 종이에 가두어 내려놓습니다.",
    ],
  },
  "RT-005": {
    id: "RT-005",
    title: "강점 일기",
    category: "자기자비 명상",
    time: "3분",
    level: "초급",
    duration: "매일",
    reward: "+15",
    iconNum: 37,
    iconPath: getIconPath(37),
    desc: "오늘 하루 발휘한 나의 작고 소중한 강점과 성취를 기록하며 자존감을 세웁니다.",
    steps: [
      "오늘 내가 잘해낸 소소한 일 한 가지를 떠올립니다.",
      "그 순간에 사용된 나의 강점(인내, 다정함, 용기 등)을 적습니다.",
      "나의 가능성을 인지하고 스스로를 다정하게 칭찬합니다.",
    ],
  },
  "RT-006": {
    id: "RT-006",
    title: "마음 근육 훈련",
    category: "몰입과 집중",
    time: "3분",
    level: "중급",
    duration: "한달",
    reward: "+20",
    iconNum: 1,
    iconPath: getIconPath(1),
    desc: "마음짐의 브랜드 핵심 시그니처 트레이닝으로 불안과 긴장을 버텨내는 근육을 키웁니다.",
    steps: [
      "바른 자세로 앉아 어깨의 긴장을 풀고 눈을 감습니다.",
      "부정적 자극이 찾아올 때 바로 반응하지 않고 버텨봅니다.",
      "단단해진 마음의 중심을 느끼며 아침 훈련을 마칩니다.",
    ],
  },
  "RT-007": {
    id: "RT-007",
    title: "복식호흡",
    category: "스트레스 비우기",
    time: "1분",
    level: "초급",
    duration: "매일",
    reward: "+10",
    iconNum: 4,
    iconPath: getIconPath(4),
    desc: "아랫배 깊숙이 들이마시고 내쉬며 즉각 심박수를 낮추는 긴급 호흡법입니다.",
    steps: [
      "한 손은 가슴에, 한 손은 아랫배 위에 가만히 올립니다.",
      "4초간 배가 부풀어 오르도록 천천히 들이마십니다.",
      "6초간 긴 숨을 길게 내쉬며 부교감 신경을 활성화합니다.",
    ],
  },
  "RT-008": {
    id: "RT-008",
    title: "디지털 디톡스",
    category: "몰입과 집중",
    time: "10분",
    level: "초급",
    duration: "매일",
    reward: "+20",
    iconNum: 51,
    iconPath: getIconPath(51),
    desc: "스마트폰 화면을 뒤집어놓고 번아웃과 수면의 자유를 지키는 10분 쉼 리추얼입니다.",
    steps: [
      "스마트폰 알림을 끄고 화면이 아래로 가도록 내려놓습니다.",
      "10분 동안 오프라인 감각(창밖 풍경, 음료 맛 등)에 머뭅니다.",
      "디지털 잡음에서 벗어난 평온한 자유를 만끽합니다.",
    ],
  },
  "RT-009": {
    id: "RT-009",
    title: "마음챙김 명상",
    category: "휴식과 충전",
    time: "3분",
    level: "초급",
    duration: "매일",
    reward: "+15",
    iconNum: 3,
    iconPath: getIconPath(3),
    desc: "현재 순간의 감각에 비판 없이 집중하여 정서 조절력을 높이는 명상입니다.",
    steps: [
      "들숨과 날숨이 콧가를 스치는 감각에 시선을 고정합니다.",
      "딴생각이 들면 비판 없이 알아차리고 호흡으로 돌아옵니다.",
      "현재 지금 이 순간에 온전히 존재하는 평온을 느낍니다.",
    ],
  },

  // 🟠 P2 — 2차 스프린트 주요 항목
  "RT-018": {
    id: "RT-018",
    title: "스트레스 분쇄",
    category: "스트레스 비우기",
    time: "2분",
    level: "초급",
    duration: "매일",
    reward: "+15",
    iconNum: 8,
    iconPath: getIconPath(8),
    desc: "나를 괴롭히는 감정과 분노를 종이에 솔직하게 적은 후, 물리적으로 갈갈이 파쇄해 비워내는 마음 해소 리추얼입니다.",
    steps: [
      "지금 나를 화나게 하거나 억울하게 만드는 감정을 가감 없이 적습니다.",
      "종이를 찢거나 파쇄기에 넣어 물리적으로 파쇄하는 인터랙션을 실행합니다.",
      "사라진 종이 조각과 함께 가벼워진 내 마음을 느낍니다.",
    ],
  },
  "RT-012": {
    id: "RT-012",
    title: "마음일기",
    category: "감정 정돈",
    time: "5분",
    level: "중급",
    duration: "한달",
    reward: "+30",
    iconNum: 12,
    iconPath: getIconPath(12),
    desc: "세상의 비난 속에서도 나만의 다정한 변호인이 되어 내 편이 되어주는 일기를 씁니다.",
    steps: [
      "오늘 마음상했던 일과 스스로를 자책했던 순간을 나열합니다.",
      "가장 친한 친구에게 해주듯 다정한 격려의 말을 적어줍니다.",
      "나의 편이 되어주는 내편 일기를 완성합니다.",
    ],
  },
};

// 72개 폴백 매핑 생성기
export function getRitualDetail(input?: string | number): RitualDetail {
  if (!input) return RITUALS_DETAIL_MAP["RT-001"];

  const searchStr = String(input).trim();

  // 1) RT-001 형태 ID 조회
  if (RITUALS_DETAIL_MAP[searchStr]) {
    return RITUALS_DETAIL_MAP[searchStr];
  }

  // 2) 타이틀로 검색
  const foundByTitle = Object.values(RITUALS_DETAIL_MAP).find(
    (item) => item.title === searchStr || item.title.includes(searchStr)
  );
  if (foundByTitle) return foundByTitle;

  // 3) 숫자 형태 (1 ~ 72)
  const numMatch = searchStr.match(/(\d+)/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    const formattedId = `RT-${String(num).padStart(3, "0")}`;
    if (RITUALS_DETAIL_MAP[formattedId]) {
      return RITUALS_DETAIL_MAP[formattedId];
    }

    // 기본 동적 72개 동적 생성기 (폴백)
    return {
      id: formattedId,
      title: searchStr || `마음 리추얼 세션 ${num}`,
      category: "휴식과 충전",
      time: "3분",
      level: "초급",
      duration: "매일",
      reward: "+15",
      iconNum: num,
      iconPath: getIconPath(num),
      desc: "일상의 분주함을 멈추고 내 마음의 감각을 깊이 있게 깨워주는 마음건강 세션입니다.",
      steps: [
        "편안한 장소에서 유연한 호흡으로 준비합니다.",
        "리추얼의 안내 문구에 따라 마음의 감각에 몰입합니다.",
        "달라진 정서 온도를 확인하며 리추얼을 완료합니다.",
      ],
    };
  }

  // 기본 폴백
  return RITUALS_DETAIL_MAP["RT-001"];
}

// 72가지 공식 리추얼 1~72 아이콘 번호별 매핑 제목 딕셔너리
const RITUAL_TITLE_MAP_72: Record<number, string> = {
  1: "미소 명상",
  2: "바디스캔 명상",
  3: "인지 재구성 일기",
  4: "복식호흡",
  5: "걱정 일기",
  6: "강점 일기",
  7: "마음 근육 훈련",
  8: "스트레스 분쇄",
  9: "디지털 디톡스",
  10: "자기 긍정 확언",
  11: "마음챙김 명상",
  12: "감사 일기",
  13: "즐거운 기억 회상",
  14: "성공 경험 회상",
  15: "감사 편지 쓰기",
  16: "친절 실천 챌린지",
  17: "소셜 커넥션 체크",
  18: "감정 표현 글쓰기",
  19: "수면 루틴 만들기",
  20: "자연 감상 산책",
  21: "자기 위로 글쓰기",
  22: "감정 온도계",
  23: "감사 세 줄",
  24: "분노 관찰일지",
  25: "화해 상상 드로잉",
  26: "긴장 해소 스트레칭",
  27: "스트레칭 루틴",
  28: "걱정 상자 비우기",
  29: "마음 이완 호흡",
  30: "자존감 선언",
  31: "감정 정돈 일기",
  32: "마인드풀 워킹",
  33: "오감 그라운딩",
  34: "소리 명상",
  35: "아로마 이완",
  36: "햇살 다독임",
  37: "긍정 확언 드로잉",
  38: "따뜻한 음료 한 잔",
  39: "가벼운 기지개",
  40: "어깨 누적 긴장 풀기",
  41: "눈 이완 명상",
  42: "얼굴 근육 마사지",
  43: "손바닥 온기 나누기",
  44: "미소 호흡 훈련",
  45: "내면 의사 대화",
  46: "전신 이완 명상",
  47: "밤의 평온 명상",
  48: "아침 활력 스트레칭",
  49: "포옹 테라피",
  50: "기분 전환 산책",
  51: "스크린 프리 10분",
  52: "나쁜 생각 구겨버리기",
  53: "불안 버블 터뜨리기",
  54: "자애 명상",
  55: "칭찬 포스트잇",
  56: "마음 온도 기록",
  57: "슬픔 다독이기",
  58: "우울 안개 거두기",
  59: "자아 성찰 쉼표",
  60: "관계 울타리 세우기",
  61: "고마운 사람 상상",
  62: "연결감 확인하기",
  63: "미안함 털어내기",
  64: "평온 호흡 5분",
  65: "마음 덤벨 운동",
  66: "행복 버튼 누르기",
  67: "감사 목록 5가지",
  68: "성취 일기",
  69: "수면 전 감사 3가지",
  70: "조용한 묵상",
  71: "안부 메시지 보내기",
  72: "온화한 미소 유지",
};

export function getRitualTitleByIconNum(iconNum: number): string {
  const foundInMap = RITUAL_TITLE_MAP_72[iconNum];
  if (foundInMap) return foundInMap;
  const foundInDetail = Object.values(RITUALS_DETAIL_MAP).find((item) => item.iconNum === iconNum);
  return foundInDetail ? foundInDetail.title : `리추얼 Vol.${iconNum}`;
}
