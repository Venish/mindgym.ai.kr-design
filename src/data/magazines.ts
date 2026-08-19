export interface Magazine {
  id: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  contentHtml: string;
  coverGradient: string;
}

export const magazinesData: Magazine[] = [
  {
    id: "MG-2026-08",
    issueNumber: "2026년 8월호",
    title: "번아웃 시대, 나를 다독이는 자기자비(Self-Compassion)의 기술",
    subtitle: "완벽주의의 굴레에서 벗어나 편안한 마음의 정원 가꾸기",
    category: "마음챙김 서재",
    readTime: "3분",
    summary: "남에게는 한없이 친절하면서 왜 나에게는 엄격할까요? 내 안의 다정한 변호인을 깨우는 심리학 이야기.",
    coverGradient: "from-emerald-500 via-teal-500 to-emerald-700",
    contentHtml: `
      <h3>1. 내 안의 자책 스피커 끄기</h3>
      <p>우리는 자주 하루의 작은 실패나 피로를 '내가 부족해서'라고 책망합니다. 하지만 마음건강 연구에 따르면, 실패를 수용하고 자신을 따뜻하게 대하는 사람일수록 다시 일어설 수 있는 내적 복원력이 2.4배 높습니다.</p>
      
      <h3>2. 자연스러운 휴식(Rest Day)의 미학</h3>
      <p>연속 기록이 깨졌다고 슬퍼할 필요가 없습니다. 정원에 비가 오고 바람이 부는 것처럼, 내 마음도 하루 쉬어가는 온전한 쉼표가 필요합니다.</p>

      <h3>3. 오늘 나에게 건네는 한 문장</h3>
      <p>"나는 지금 있는 그대로 충분히 애쓰고 있다. 오늘 하루도 수고 많았어."</p>
    `
  },
  {
    id: "MG-2026-07",
    issueNumber: "2026년 7월호",
    title: "직장인 감정 노동 과부하 탈출 5단계 솔루션",
    subtitle: "타인의 감정에 휘둘리지 않는 건강한 내면 경계선",
    category: "직무 스트레스",
    readTime: "4분",
    summary: "퇴근 후에도 부서 업무 생각이 떠나지 않는 당신을 위한 일과 삶의 정서적 분리 훈련법.",
    coverGradient: "from-teal-400 via-emerald-600 to-sky-600",
    contentHtml: `
      <h3>1. 퇴근 라벨링 매직</h3>
      <p>사무실 문을 나서는 순간, 머릿속 걱정들에 '내일 아침 9시 유통기한' 라벨을 붙여 퇴근길 바깥에 두고 오세요.</p>
      <h3>2. 감정과 사실의 냉정한 분리</h3>
      <p>상사의 날카로운 한마디는 의도된 인격 공격이 아닐 가능성이 90% 이상입니다. 주관적 해설 대신 팩트만 남기는 연습을 하세요.</p>
    `
  },
  {
    id: "MG-2026-06",
    issueNumber: "2026년 6월호",
    title: "불안을 다스리는 1분 호흡과 시각화 훈련",
    subtitle: "자율신경계를 안정시키는 심박수 다운 팁",
    category: "멘탈 케어",
    readTime: "2분",
    summary: "갑자기 가슴이 답답하고 불안이 덮칠 때 1분 만에 마음을 진정시키는 333 호흡법.",
    coverGradient: "from-sky-400 via-teal-500 to-emerald-500",
    contentHtml: `
      <h3>1. 횡경막 미소 호흡</h3>
      <p>숨을 4초간 들이마시고, 6초간 천천히 내쉬며 입꼬리를 아주 미세하게 올려보세요. 뇌는 미소 신호를 받고 즉시 안정 호르몬을 분비합니다.</p>
    `
  }
];
