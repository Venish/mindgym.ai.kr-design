export interface Ritual {
  id: string;
  title: string;
  category: string;
  time: string;
  type: "SHORT" | "HYBRID" | "LONG";
  dumbbell: number;
  description: string;
}

export const ritualsData: Ritual[] = [
  { id: "RT-001", title: "미소 명상", category: "불안", time: "1분", type: "SHORT", dumbbell: 5, description: "시각화 명상으로 미소를 그리며 마음의 긴장을 풉니다." },
  { id: "RT-002", title: "마음챙김 벨", category: "불안", time: "1분", type: "SHORT", dumbbell: 5, description: "앱에서 들리는 싱잉볼 소리에 맞춰 잡념과 생각을 즉시 끊어냅니다." },
  { id: "RT-003", title: "시선고정명상", category: "불안", time: "1분", type: "SHORT", dumbbell: 5, description: "특정 정적 사물을 1분 동안 있는 그대로 응시하며 마음을 가라앉힙니다." },
  { id: "RT-004", title: "횡경막 호흡", category: "불안", time: "1분", type: "SHORT", dumbbell: 5, description: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮춥니다." },
  { id: "RT-005", title: "망할 확률 계산기", category: "불안", time: "2분", type: "HYBRID", dumbbell: 8, description: "머릿속 최악의 시나리오가 실제로 실현될 수학적 확률을 수치로 파싱해 안심을 얻습니다." },
  { id: "RT-006", title: "긍정 만약에", category: "불안", time: "2분", type: "HYBRID", dumbbell: 8, description: "부정적 가정을 완벽히 비틀어, 최상의 긍정적 결말을 적극적으로 시각화합니다." },
  { id: "RT-007", title: "걱정 유통기한 라벨링", category: "불안", time: "2분", type: "SHORT", dumbbell: 5, description: "떠오르는 쓸모없는 걱정에 유통기한 라벨을 붙여 안전한 병 속에 격리 보관합니다." },
  { id: "RT-008", title: "스트레스 분쇄", category: "불안", time: "2분", type: "SHORT", dumbbell: 5, description: "가상의 스마트폰 파쇄기를 켜고, 내 마음을 옥죄는 스트레스 문장을 분쇄해 버립니다." },
  { id: "RT-009", title: "걱정 저금통", category: "불안", time: "2분", type: "HYBRID", dumbbell: 8, description: "오늘 밤 당장 해결할 수 없는 일들을 앱 속 가상 걱정저금통에 맡겨 두고 마음 편히 쉽니다." },
  { id: "RT-010", title: "333 나비포옹", category: "불안", time: "1분", type: "SHORT", dumbbell: 5, description: "양팔을 교차해 스스로 양어깨를 번갈아 다독이며 불안과 공포 요소를 잠재웁니다." },
  { id: "RT-011", title: "미래 그림일기", category: "불안", time: "3분", type: "HYBRID", dumbbell: 8, description: "완벽하게 치유되고 번아웃을 극복한 나의 기쁜 미래를 상상해 시각화합니다." },
  { id: "RT-012", title: "내편일기", category: "자책", time: "5분", type: "LONG", dumbbell: 12, description: "세상의 비난 속에서도 오직 나의 가장 다정하고 우호적인 든든한 변호인이 되어 일기를 씁니다." },
  { id: "RT-013", title: "미고사", category: "자책", time: "1분", type: "SHORT", dumbbell: 5, description: "오늘 힘겨웠던 나에게 '미안해, 고마워, 사랑해'를 나직이 속삭이며 따뜻한 화해를 청합니다." },
  { id: "RT-014", title: "자존감 칠판", category: "자책", time: "1분", type: "HYBRID", dumbbell: 8, description: "가상 칠판 위에 나를 채우는 칭찬과 긍정 피드백 메시지를 가득 기록해 읽어봅니다." },
  { id: "RT-015", title: "공수치 폭풍칭찬", category: "자책", time: "1분", type: "SHORT", dumbbell: 5, description: "카메라를 거울 삼아 내 비주얼과 오늘의 사소한 태도를 폭풍처럼 소리 내어 칭찬합니다." },
  { id: "RT-016", title: "오늘의 상장", category: "자책", time: "5분", type: "LONG", dumbbell: 12, description: "오늘 하루를 그저 살아내느라 고생한 스스로에게 최고의 상을 직접 제정하고 수여합니다." },
  { id: "RT-017", title: "달의 뒷편 롤링페이퍼", category: "자책", time: "15분", type: "LONG", dumbbell: 12, description: "내가 생각하는 치명적 단점들을 완전히 역발상해 빛나는 장점으로 승화시키는 연습지입니다." },
  { id: "RT-018", title: "지우개 테라피", category: "자책", time: "3분", type: "SHORT", dumbbell: 5, description: "가슴에 박힌 날카로운 상처 멘트를 타이핑한 후, 손가락으로 문질러 흔적 없이 지워버립니다." },
  { id: "RT-019", title: "셀프 하이파이브", category: "자책", time: "1분", type: "SHORT", dumbbell: 5, description: "액정이나 거울 속 내 눈을 정면으로 마주하고 시원하게 짝! 손뼉을 맞부딪치며 에너지를 나눕니다." },
  { id: "RT-020", title: "원라인드로잉", category: "자책", time: "2분", type: "LONG", dumbbell: 12, description: "화면 위에 떼지 않고 연속되는 아름다운 선 하나를 집중해 그리며 복잡해진 머리를 비워냅니다." },
  { id: "RT-023", title: "감정개명", category: "감정", time: "2분", type: "SHORT", dumbbell: 5, description: "추상적이고 무서운 감정 코드들에 '귀여운 아기 몬스터' 등의 애칭을 붙여 두려움을 낮춥니다." },
  { id: "RT-024", title: "마음날씨 기록", category: "감정", time: "3분", type: "LONG", dumbbell: 12, description: "외부에서 불어온 사건과 나의 고유 기온을 완전히 분리해 오늘의 날씨 카드로 남깁니다." }
];
