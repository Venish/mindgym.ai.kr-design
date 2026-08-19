"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowSquareOut, Copy, Check, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { AuroraText } from "@/components/godui/AuroraText";

interface PreviewRoute {
  id: string;
  step: string;
  name: string;
  badge: string;
  desc: string;
  url: string;
  icon: string;
  tagColor: string;
}

const PREVIEW_ROUTES: PreviewRoute[] = [
  {
    id: "dashboard_flat_v3_spec",
    step: "HERO FOCUS V3",
    name: "플랫 대시보드 V3 (대형 추천 히어로 5:00형)",
    badge: "추천 히어로 시안",
    desc: "[🏋️ 철 12회] 상단 뱃지, 대형 5:00 타이머 히어로 추천 리추얼 & 2열 서브 리추얼 그리드",
    url: "/dashboard-flat-v3",
    icon: "🔥",
    tagColor: "bg-[#00C473] text-white font-black",
  },
  {
    id: "dashboard_flat_v2_spec",
    step: "COMPACT FLAT V2",
    name: "플랫 대시보드 V2 (세로 1열 리스트형)",
    badge: "세로 1열 플랫 시안",
    desc: "인사말, 30초 컨디션 체크인, 세로 1열 리추얼 리스트(오프먼트/한칸완벽주의/빈손산책) & 철 덤벨 프로그레스 바",
    url: "/dashboard-flat-v2",
    icon: "🌱",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-400 font-black",
  },
  {
    id: "dashboard_flat_spec",
    step: "BRAND V1.1 SPEC",
    name: "신규 플랫 대시보드 V1 (3열 그리드형)",
    badge: "3열 그리드 시안",
    desc: "* mindgym 그린 로고, 철 덤벨 12회차 엠블럼 & 3열 플랫 카드(오프먼트/한칸완벽주의/빈손산책)",
    url: "/dashboard-flat",
    icon: "🎨",
    tagColor: "bg-[#E9F8F0] text-[#005A34] border-[#00C473]/40 font-bold",
  },
  {
    id: "design_system_guide",
    step: "SYSTEM SPEC",
    name: "마인드짐 전체 디자인 가이드 & 시스템 Spec",
    badge: "가로 100% 가이드",
    desc: "Color System, Typography, Buttons, Badges, Ritual Components & Motion 명세",
    url: "/design-guide",
    icon: "🎨",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-400 font-black",
  },
  {
    id: "login",
    step: "STEP 00",
    name: "B2B 임직원 로그인 페이지",
    badge: "기업 로그인",
    desc: "기업 이메일 계정으로 로그인 및 비밀번호 찾기 폼 화면",
    url: "/login",
    icon: "🔐",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-black",
  },
  {
    id: "slides",
    step: "STEP 01",
    name: "온보딩 소개 슬라이드 (4개)",
    badge: "초기 화면",
    desc: "마인드짐 서비스의 핵심 가치와 리추얼 소개 4단계 카드시퀀스",
    url: "/onboarding?view=slides",
    icon: "📱",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "ceo",
    step: "STEP 02",
    name: "CEO 대표 웰컴 팝업",
    badge: "환영 메시지",
    desc: "대표이사 진심 어린 메시지 팝업 모달 및 마인드짐 약속",
    url: "/onboarding?view=ceo",
    icon: "💬",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    id: "nickname",
    name: "닉네임 설정 화면",
    step: "STEP 03",
    badge: "사용자 설정",
    desc: "마인드짐에서 호칭할 나만의 닉네임 입력 및 시작 버튼",
    url: "/onboarding?view=nickname",
    icon: "👤",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "koss_intro",
    step: "STEP 04",
    name: "KOSS 마음 상태 체크 시작",
    badge: "진단 안내",
    desc: "36개 질문 시작 전 안내, 마인드짐 CTA 및 '다음에 하기' 고스트 버튼",
    url: "/onboarding?view=koss_intro",
    icon: "📋",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "koss",
    step: "STEP 05",
    name: "KOSS 36문항 질문 진행",
    badge: "진단 진행중",
    desc: "하단 고정 가이드 팁 및 6문항 주기 테마 아이콘 순차 전환",
    url: "/onboarding?view=koss",
    icon: "✍️",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "analyzing",
    step: "STEP 06",
    name: "KOSS 정밀 분석 중 (로딩 브릿지)",
    badge: "분석 중",
    desc: "심볼 스피닝 펄스 및 순차적 4단계 정밀 항목 체크리스트 모션",
    url: "/onboarding?view=analyzing",
    icon: "⏳",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "result",
    step: "STEP 07",
    name: "KOSS 8개 영역 진단 결과 리포트",
    badge: "진단 리포트",
    desc: "Bklit UI 8각 레이더 차트, 집중 케어 Warning 워터마크 카드",
    url: "/onboarding?result",
    icon: "📊",
    tagColor: "bg-[#E9F8F0] text-[#00C474] border-[#00C474]/30",
  },
  {
    id: "dashboard_main",
    step: "MAIN DASHBOARD",
    name: "마인드짐 메인 대시보드",
    badge: "메인 화면",
    desc: "이달의 나 뱃지, 퀵 리추얼 아이콘 칩 바, 마음 근력 캘린더 메인 홈",
    url: "/dashboard",
    icon: "🏠",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-black",
  },
  {
    id: "dashboard_morning_popup",
    step: "DAY CHECKIN",
    name: "낮(아침) 체크인 팝업 뷰",
    badge: "낮 팝업 바로가기",
    desc: "?type=morning 파라미터로 대시보드 진입 시 아침 체크인 드로어 자동 Slide-Up",
    url: "/dashboard?type=morning",
    icon: "☀️",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300 font-black",
  },
  {
    id: "dashboard_evening_popup",
    step: "NIGHT CHECKIN",
    name: "밤(저녁) 회고 팝업 뷰",
    badge: "밤 팝업 바로가기",
    desc: "?type=evening 파라미터로 대시보드 진입 시 저녁 회고 드로어 자동 Slide-Up",
    url: "/dashboard?type=evening",
    icon: "🌙",
    tagColor: "bg-indigo-100 text-indigo-900 border-indigo-300 font-black",
  },
  {
    id: "checkin_time",
    step: "STEP 08 (최초 1회)",
    name: "언제 체크인 알림을 받을까요? (최초 알림 설정)",
    badge: "알림 시간 설정",
    desc: "일어나는 시간 (☀️) 및 자는 시간 (🌙) 체크인 알림시간 select 선택 뷰",
    url: "/onboarding?view=checkin_time",
    icon: "⏰",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200 font-bold",
  },
  {
    id: "monthly_start",
    step: "STEP 09 (매월 월초)",
    name: "이달의 나 설정 화면 (Step 1 시작)",
    badge: "의도 & 리추얼 설정",
    desc: "3가지 감정 의도 칩 선택 & Phosphor Icon 연동 리추얼 추천 5단계",
    url: "/onboarding/monthly-start",
    icon: "🌱",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold",
  },
  {
    id: "monthly_start_step5",
    step: "STEP 09-5 (Step 5)",
    name: "시간 설정 직통 뷰 (Step 5 바로가기)",
    badge: "시간 설정 바로가기",
    desc: "일어나는 시간 & 자는 시간 select 박스 시간 설정 뷰 직통 링크 (?step=5)",
    url: "/onboarding/monthly-start?step=5",
    icon: "⏰",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300 font-black",
  },
  {
    id: "ritual_guide",
    step: "DESIGN GUIDE",
    name: "리추얼 컴포넌트 디자인 가이드",
    badge: "디자인 시스템",
    desc: "Phosphor Icons 기반 detailed, compact, icon-only 변형 샘플 조망",
    url: "/onboarding/ritual-guide",
    icon: "✨",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

export default function PreviewNavigatorPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, id: string, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="fixed inset-0 z-[9999] bg-[#FAFBFB] text-[#191F28] font-sans flex flex-col overflow-y-auto w-screen h-screen">
      {/* 대시보드 본문 */}
      <section className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        {/* 상단 안내 타이틀 */}
        <div className="mb-8 text-left">
          <div className="inline-flex items-center gap-1 text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3 py-1 rounded-full mb-2">
            <Sparkle size={14} weight="fill" />
            <span>DIRECT LINK DASHBOARD</span>
          </div>
          <h2 className="text-3xl font-black text-[#191F28] tracking-tight leading-snug">
            확인하고 싶은 온보딩 상태 카드를 <br />
            <AuroraText>클릭하여 새 창에서 확인해 보세요</AuroraText>
          </h2>
        </div>

        {/* 7개 카드 그리드 배치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PREVIEW_ROUTES.map((route) => (
            <Link
              key={route.id}
              href={route.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200/90 hover:border-[#00C474] rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
            >
              {/* 상단 스텝 & 뱃지 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-gray-400 tracking-wider font-mono">
                    {route.step}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${route.tagColor}`}>
                    {route.badge}
                  </span>
                </div>

                {/* 아이콘 & 타이틀 */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{route.icon}</span>
                  <h3 className="text-lg font-black text-[#191F28] group-hover:text-[#00C474] transition-colors">
                    {route.name}
                  </h3>
                </div>

                {/* 설명 */}
                <p className="text-xs text-gray-500 leading-relaxed font-normal mb-6">
                  {route.desc}
                </p>
              </div>

              {/* 하단 링크 & 새 창 열기 버턴 */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400 truncate max-w-[170px] bg-gray-50 px-2 py-1 rounded">
                  {route.url}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCopy(e, route.id, route.url)}
                    className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                    title="URL 복사"
                  >
                    {copiedId === route.id ? (
                      <Check size={14} className="text-[#00C474]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>

                  <div className="bg-[#00C474] text-white p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-soft flex items-center justify-center">
                    <ArrowSquareOut size={16} weight="bold" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-gray-200/80 bg-white py-6 text-center text-xs text-gray-400 font-medium">
        © 2026 MindGym · 월간 마음건강 온보딩 및 KOSS 진단 미리보기 대시보드
      </footer>
    </main>
  );
}
