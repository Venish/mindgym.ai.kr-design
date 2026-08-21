import { Flower, Leaf, Barbell, Clock, Microscope, ShieldCheck, LockKey, FloppyDisk } from "@phosphor-icons/react";

export interface KOSSQuestion {
  id: number;
  domain: "물리환경" | "직무요구" | "직무자율" | "관계갈등" | "직업불안정" | "조직체계" | "보상부적절" | "직장문화";
  domainId: number;
  question: string;
  isReverse: boolean;
}

export const KOSS_DOMAINS_INFO = [
  { domain: "물리환경", count: 3 },
  { domain: "직무요구", count: 8 },
  { domain: "직무자율", count: 5 },
  { domain: "관계갈등", count: 4 },
  { domain: "직업불안정", count: 2 },
  { domain: "조직체계", count: 7 },
  { domain: "보상부적절", count: 3 },
  { domain: "직장문화", count: 4 },
];

export const KOSS_TIPS = [
  { text: "솔직하게 답변할수록 더 정확한 내 마음 정원이 완성돼요.", icon: Flower, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
  { text: "정답은 없어요. 최근 1주일간 느낀 그대로 편안히 눌러주세요.", icon: Leaf, bgClass: "bg-[#F8FAF9] border-emerald-100", iconClass: "text-[#00C474]" },
  { text: "직무 스트레스 지표는 나의 약점이 아닌 보살핌의 신호예요.", icon: Barbell, bgClass: "bg-amber-50/80 border-amber-200/80", iconClass: "text-amber-600" },
  { text: "잠시 숨을 깊게 내쉬고 현재 나의 상태에 집중해 보세요.", icon: Clock, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
  { text: "진단 결과는 개인 맞춤 틈새 리추얼을 추천하는 데 사용돼요.", icon: Microscope, bgClass: "bg-sky-50/80 border-sky-200/80", iconClass: "text-sky-600" },
  { text: "나만의 편안한 속도로 차근차근 진행해 보세요.", icon: ShieldCheck, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
  { text: "답변하신 모든 결과는 철저히 암호화되어 안전하게 보호됩니다.", icon: LockKey, bgClass: "bg-gray-50 border-gray-200", iconClass: "text-gray-600" },
  { text: "완료 후 나만을 위한 리추얼 및 파스텔 스파이더 차트가 펼쳐집니다.", icon: FloppyDisk, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
];

export const kossQuestions: KOSSQuestion[] = [
  { id: 1, domain: "물리환경", domainId: 1, question: "나는 업무 중에 근골격계에 부담을 주는 작업을 한다.", isReverse: false },
  { id: 2, domain: "물리환경", domainId: 2, question: "나는 업무 중에 소음, 진동, 온도 등 나쁜 환경에 노출된다.", isReverse: false },
  { id: 3, domain: "물리환경", domainId: 3, question: "나는 업무 중에 유해물질에 노출된다.", isReverse: false },
  { id: 4, domain: "직무요구", domainId: 1, question: "나는 일이 많아 항상 시간에 쫓기며 일한다.", isReverse: false },
  { id: 5, domain: "직무요구", domainId: 2, question: "업무량이 현저하게 증가하였다.", isReverse: false },
  { id: 6, domain: "직무요구", domainId: 3, question: "업무를 수행하기 위해 충분한 시간적 여유가 없다.", isReverse: false },
  { id: 7, domain: "직무요구", domainId: 4, question: "나는 여러 가지 일을 동시에 해야 한다.", isReverse: false },
  { id: 8, domain: "직무요구", domainId: 5, question: "업무가 끝난 후에도 업무에 관한 생각을 멈출 수가 없다.", isReverse: false },
  { id: 9, domain: "직무요구", domainId: 6, question: "나는 업무 중에 타인의 신체적·언어적 폭력에 노출된다.", isReverse: false },
  { id: 10, domain: "직무요구", domainId: 7, question: "내 업무는 감정적으로 힘든 상황을 자주 경험하게 한다.", isReverse: false },
  { id: 11, domain: "직무요구", domainId: 8, question: "내 업무는 신체적 노력이 매우 많이 필요하다.", isReverse: false },
  { id: 12, domain: "직무자율", domainId: 1, question: "나의 업무는 내가 직접 결정할 수 있는 것이 별로 없다.", isReverse: false },
  { id: 13, domain: "직무자율", domainId: 2, question: "나의 업무에서 창의적인 생각이나 의견을 내기가 어렵다.", isReverse: false },
  { id: 14, domain: "직무자율", domainId: 3, question: "나의 업무수행에 필요한 전문지식이나 기술이 부족하다.", isReverse: false },
  { id: 15, domain: "직무자율", domainId: 4, question: "내 업무는 단조롭고 반복적이다.", isReverse: false },
  { id: 16, domain: "직무자율", domainId: 5, question: "내 업무의 양과 속도를 스스로 조절할 수 있다.", isReverse: true },
  { id: 17, domain: "관계갈등", domainId: 1, question: "나는 직장에서 상사(팀장, 임원 등)와 불화가 있다.", isReverse: false },
  { id: 18, domain: "관계갈등", domainId: 2, question: "직장에서 내 의견을 반영할 기회가 거의 없다.", isReverse: false },
  { id: 19, domain: "관계갈등", domainId: 3, question: "나의 업무가 다른 부서 업무와 갈등을 일으킨다.", isReverse: false },
  { id: 20, domain: "관계갈등", domainId: 4, question: "직장에서 동료 또는 상하 간의 관계가 불편하고 어렵다.", isReverse: false },
  { id: 21, domain: "직업불안정", domainId: 1, question: "나의 현재 고용 상태가 안정적이지 않다.", isReverse: false },
  { id: 22, domain: "직업불안정", domainId: 2, question: "나는 현재 직장을 계속 다닐 수 있을지 모르겠다.", isReverse: false },
  { id: 23, domain: "조직체계", domainId: 1, question: "우리 직장에서 내가 하는 일은 인정받고 있다.", isReverse: true },
  { id: 24, domain: "조직체계", domainId: 2, question: "나의 업무량이 다른 직원과 비교해 크게 다르지 않다.", isReverse: true },
  { id: 25, domain: "조직체계", domainId: 3, question: "우리 부서와 다른 부서 간에 마찰이 없다.", isReverse: true },
  { id: 26, domain: "조직체계", domainId: 4, question: "나의 근무환경에 만족한다.", isReverse: true },
  { id: 27, domain: "조직체계", domainId: 5, question: "인사제도가 공정하고 합리적이다.", isReverse: true },
  { id: 28, domain: "조직체계", domainId: 6, question: "우리 직장에는 근로자 건강을 위한 제도적 장치가 마련되어 있다.", isReverse: true },
  { id: 29, domain: "조직체계", domainId: 7, question: "우리 직장의 경영방침이 근로자에게 잘 전달되고 있다.", isReverse: true },
  { id: 30, domain: "보상부적절", domainId: 1, question: "나의 직업은 내가 기대하는 만큼의 보상이 주어지지 않는다.", isReverse: false },
  { id: 31, domain: "보상부적절", domainId: 2, question: "나의 능력을 개발하고 발휘할 기회가 부족하다.", isReverse: false },
  { id: 32, domain: "보상부적절", domainId: 3, question: "업무의 내용이 실제 직위나 직급에 어울리지 않는다.", isReverse: false },
  { id: 33, domain: "직장문화", domainId: 1, question: "직장의 분위기가 권위적이고 수직적이다.", isReverse: false },
  { id: 34, domain: "직장문화", domainId: 2, question: "내가 얼마나 열심히 일하는지 직장에서 잘 인정받지 못한다.", isReverse: false },
  { id: 35, domain: "직장문화", domainId: 3, question: "성별이라는 이유로 직장에서 불이익을 받는다.", isReverse: false },
  { id: 36, domain: "직장문화", domainId: 4, question: "회식 또는 직장 모임에서 술을 마시도록 강요받는다.", isReverse: false }
];

export function getAdjustedScore(questionId: number, rawValue: number): number {
  const question = kossQuestions.find(q => q.id === questionId);
  if (!question) return rawValue;
  if (question.isReverse) {
    return 5 - rawValue;
  }
  return rawValue;
}

export function calculateDomainScore(domainName: string, adjustedAnswers: { [qId: number]: number }): number {
  const domainQuestions = kossQuestions.filter(q => q.domain === domainName);
  const qCount = domainQuestions.length;
  if (qCount === 0) return 0;
  
  let sum = 0;
  domainQuestions.forEach(q => {
    sum += adjustedAnswers[q.id] || 1;
  });

  const standardized = ((sum - qCount) / (qCount * 3)) * 100;
  return Math.round(standardized * 10) / 10;
}

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
      color: "#00C474",
      description: "지금은 비교적 안정된 상태예요 😊"
    };
  } else if (averageStandardScore < 67) {
    return {
      status: "WARNING",
      label: "주의",
      color: "#FB8C00",
      description: "조금씩 지쳐가고 있어요 🌿"
    };
  } else {
    return {
      status: "DANGER",
      label: "위험",
      color: "#E53935",
      description: "번아웃이 진행되고 있어요 😌"
    };
  }
}
