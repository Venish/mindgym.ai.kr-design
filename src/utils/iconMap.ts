export const ICON_FILES = [
  "001_미소명상.png",
  "002_마음챙김벨.png",
  "003_시선고정명상.png",
  "004_횡경막호흡.png",
  "005_망할확률계산기.png",
  "006_긍정만약에.png",
  "007_걱정유통기한라벨링.png",
  "008_스트레스분쇄.png",
  "009_걱정저금통.png",
  "010_333나비포옹.png",
  "011_미래그림일기.png",
  "012_내편일기.png",
  "013_미고사.png",
  "014_자존감칠판.png",
  "015_공수치폭풍칭찬.png",
  "016_오늘의상장.png",
  "017_달의뒷편롤링페이퍼.png",
  "018_지우개테라피.png",
  "019_셀프하이파이브.png",
  "020_원라인드로잉.png",
  "021_거절연습장.png",
  "022_투데이확언.png",
  "023_감정개명.png",
  "024_마음날씨기록.png",
  "025_Y7질문법.png",
  "026_객관화일기.png",
  "027_사실과견해분리하기.png",
  "028_불평일기.png",
  "029_긍정해석연습.png",
  "030_스몰모닝페이지.png",
  "031_어른이그림일기.png",
  "032_마음필사.png",
  "033_존재소개.png",
  "034_나사용설명서.png",
  "035_나만의집그리기.png",
  "036_자기인식상태점검.png",
  "037_셀프QnA.png",
  "038_자문자답글쓰기.png",
  "039_과거분석표.png",
  "040_에너지가계부.png",
  "041_저자소개독서법.png",
  "042_모닝드로잉.png",
  "043_단어조합시.png",
  "044_짝꿍소개.png",
  "045_연간편지릴레이.png",
  "046_바디스캔.png",
  "047_케렌시아만들기.png",
  "048_공간사진101.png",
  "049_마이크로산책.png",
  "050_빈손산책.png",
  "051_오프먼트.png",
  "052_백색소음테이스팅.png",
  "053_구부정사감.png",
  "054_일몰수집.png",
  "055_스위치온키링.png",
  "056_1분정리.png",
  "057_셀프호텔링.png",
  "058_한칸완벽주의.png",
  "059_셀프디제잉.png",
  "060_랜덤독서.png",
  "061_친절수집장.png",
  "062_소확행박스.png",
  "063_타인을위한기도.png",
  "064_셀프안부스몰톡.png",
  "065_생즉카.png",
  "066_반려존재발견하기.png",
  "067_사일런스식사.png",
  "068_발바닥인사.png",
  "069_오늘의감정단어.png",
  "070_오늘의색깔.png",
  "071_3-2-1그라운딩.png",
  "072_위시플래너.png",
];

export function getIconPath(input: string | number): string {
  if (typeof input === "string") {
    if (input.startsWith("/images/icons/")) {
      const filename = input.replace("/images/icons/", "");
      // 이미 정확한 파일명이면 그대로 반환
      if (ICON_FILES.includes(filename)) return input;

      // "1.png", "001.png" 형태인 경우
      const numMatch = filename.match(/^(\d+)/);
      if (numMatch) {
        const idx = parseInt(numMatch[1], 10) - 1;
        if (ICON_FILES[idx]) return `/images/icons/${ICON_FILES[idx]}`;
      }
    }

    // "RT-001" 또는 "001" 형태
    const numMatch = input.match(/(\d+)/);
    if (numMatch) {
      const idx = parseInt(numMatch[1], 10) - 1;
      if (ICON_FILES[idx]) return `/images/icons/${ICON_FILES[idx]}`;
    }
  }

  if (typeof input === "number") {
    const idx = Math.max(0, Math.min(ICON_FILES.length - 1, input - 1));
    return `/images/icons/${ICON_FILES[idx]}`;
  }

  // fallback
  return `/images/icons/${ICON_FILES[0]}`;
}
