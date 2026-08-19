"use client";

import React from "react";
import { ArrowSquareOut, TextAa, Sparkle, Link as LinkIcon } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { Badge } from "@/components/ui/Badge";

export function TypographySection() {
  const recommendedFonts = [
    {
      name: "NanumSquareRound (나눔스퀘어라운드)",
      type: "프로젝트 전역 메인 1순위 서체 (pstatic)",
      badge: "현재 메인 적용 중 ✓",
      badgeVariant: "forest" as const,
      desc: "부드럽고 둥글둥글한 라운드 곡선 조형미. Light, Regular, Bold, ExtraBold 지원으로 파스텔 톤 웰니스 디자인과 100% 최고의 케미 선사.",
      usage: "프로젝트 전역 메인 폰트 (HTML, Body, UI 컴포넌트 전체)",
      cdnUrl: '@import url("https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css");',
      officialUrl: "https://hangeul.naver.com/font/nanum",
    },
    {
      name: "NanumBarunGothicYetHangul (나눔바른고딕옛한글)",
      type: "한글 서브 2순위 서체 (pstatic)",
      badge: "2순위 보조 폰트",
      badgeVariant: "mint" as const,
      desc: "네이버 공식 pstatic CDN 제공 정교하고 곧은 한글 서체. 나눔스퀘어라운드와 함께 폴백 서체로 연동.",
      usage: "서브 폴백 폰트, 대시보드 캡션",
      cdnUrl: '@import url("https://hangeul.pstatic.net/hangeul_static/css/NanumBarunGothicYetHangul.css");',
      officialUrl: "https://hangeul.naver.com/font/nanum",
    },
    {
      name: "Gmarket Sans (지마켓 산스)",
      type: "기하학 브랜드 타이틀 서체",
      badge: "헤드라인 & 로고용",
      badgeVariant: "yellow" as const,
      desc: "직관적이고 탄탄한 기하학(Geometric) 구조 서체. '철 덤벨 12회차', '마음운동' 등 위트있고 볼드한 브랜딩 강조.",
      usage: "대형 히어로 헤더, 메인 엠블럼 뱃지, 로고 타이틀",
      cdnUrl: "https://cdn.jsdelivr.net/gh/projectnoonnu/noon-2212@1.0/GmarketSansMedium.woff2",
      officialUrl: "https://company.gmarket.co.kr/company/about/company/font.asp",
    },
    {
      name: "Gowun Dodum (고운돋움 / 고운바탕)",
      type: "감성 웰빙 & 힐링 서체 (Google Fonts)",
      badge: "자기자비 & 명상 아티클",
      badgeVariant: "rose" as const,
      desc: "부드러운 곡선과 따뜻한 휴머니스틱 서체. 마음 릴랙스, 명상 가이드 아티클 및 '괜찮아요, 내일 해도 돼요' 감성 카드에 최고.",
      usage: "자기자비 안심 카드, 30초 마음 체크인, 명상 가이드",
      cdnUrl: "https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap",
      officialUrl: "https://fonts.google.com/specimen/Gowun+Dodum",
    },
    {
      name: "Plus Jakarta Sans / Outfit",
      type: "영문 모던 & 숫자 타이머 전용 (Google Fonts)",
      badge: "타이머 & 숫자에 최고",
      badgeVariant: "sky" as const,
      desc: "북유럽 스타일 모던 서체. 5:00 focus 타이머, 12회차 엠블럼, `mindgym` 영문 연출 시 최고 수준의 트렌디함 선사.",
      usage: "5:00 타이머, 덤벨 회차 카운터, 영문 브랜드명",
      cdnUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap",
      officialUrl: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
    },
  ];

  const cssTypographyTypes = [
    {
      className: ".txt-title-main",
      name: "1. Display Main Header (메인 헤더)",
      size: "1.625rem [430px 모바일 기준 26px / 화면 축소 시 정비례 감축]",
      weight: "Font Black (900)",
      desc: "430px 모바일 기준 26px, 모바일 화면 너비가 줄어들 때 1:1 정비례로 예술처럼 줄어드는 메인 타이틀",
      sample: "나만의 맞춤 마음 근력 리추얼로 일상을 채워보세요",
    },
    {
      className: ".txt-title-section",
      name: "2. Section Header (섹션 타이틀)",
      size: "1.375rem [430px 모바일 기준 22px / 화면 축소 시 정비례 감축]",
      weight: "Font ExtraBold (800)",
      desc: "모바일 대분류 영역 타이틀, 팝업/드로어 모달 상단 헤더",
      sample: "이달의 마음 진단 리포트 & 금일 추천 마음운동",
    },
    {
      className: ".txt-title-card",
      name: "3. Card Subtitle (카드 타이틀)",
      size: "1.25rem [430px 모바일 기준 20px / 화면 축소 시 정비례 감축]",
      weight: "Font Bold (700)",
      desc: "모바일 화면 크기에 비례하여 가독성이 선명해지는 카드 제목",
      sample: "아침 3분 마인드풀니스 명상 및 호흡 루틴",
    },
    {
      className: ".txt-body-main",
      name: "4. Body Main Text (기본 본문)",
      size: "1.125rem [430px 모바일 기준 18px / 화면 축소 시 정비례 감축]",
      weight: "Font Medium (500)",
      desc: "스마트폰 화면에서 작고 답답하지 않도록 자동 스케일링되는 기본 본문",
      sample: "직장 스트레스 감소와 집중력 향상을 위해 매일 아침 간단한 리추얼을 실천해 보세요. 덤벨 보상이 누적됩니다.",
    },
    {
      className: ".txt-caption-main",
      name: "5. Body Sub & Caption (서브 캡션)",
      size: "1.0rem [430px 모바일 기준 16px / 화면 축소 시 정비례 감축]",
      weight: "Font Light (300)",
      desc: "서브 캡션 설명, 버튼 라벨, 카드 보조 안내 텍스트",
      sample: "최근 30일간 진행된 리추얼 일지 데이터를 기반으로 분석 결과가 업데이트되었습니다.",
    },
    {
      className: ".txt-micro-main",
      name: "6. Micro Caption & Code (초소형 뱃지/날짜)",
      size: "0.875rem [430px 모바일 기준 14px / 화면 축소 시 정비례 감축]",
      weight: "Font Bold (700)",
      desc: "초소형 뱃지 라벨, 캘린더 날짜 수치, 타임스탬프",
      sample: "REF_ID: KOSS_2026_0817 · TIMESTAMP: 15:50:00",
    },
  ];

  return (
    <section id="typography" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C473] rounded-full inline-block" />
          2. Typography Standard Specification (CSS 전역 타입별 명세)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          <code className="font-mono text-[#005A34] font-bold">globals.css</code>에 선언된 6가지 전역 클래스만 부여하면 폰트 크기, 굵기, 행간, 자간(-0.56px)이 전역에서 일괄 반영됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* =========================================================================
            CSS GLOBAL TYPOGRAPHY UTILITY CLASSES (globals.css 선언 6종 클래스 스펙)
           ========================================================================= */}
        <div>
          <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider mb-3 text-left flex items-center gap-1.5">
            <Sparkle size={16} weight="fill" className="text-[#00C473]" />
            <span>CSS Global Typography Classes (globals.css 선언 6종 타입)</span>
          </h3>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xs flex flex-col gap-6 text-left">
            {cssTypographyTypes.map((item, idx) => (
              <div
                key={item.className}
                className={`pb-5 ${idx < cssTypographyTypes.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex flex-wrap justify-between items-center text-xs font-mono text-gray-400 mb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#005A34] bg-[#E9F8F0] px-2 py-0.5 rounded-lg border border-[#00C473]/30">
                      {item.className}
                    </span>
                    <span className="font-extrabold text-[#191F28]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>크기: {item.size}</span>
                    <span>·</span>
                    <span>굵기: {item.weight}</span>
                  </div>
                </div>

                {/* 실제 클래스 적용 실시간 프리뷰 */}
                <div className="bg-[#FAFBFB] border border-gray-200/80 p-4 rounded-2xl">
                  <p className={`${item.className.substring(1)} text-[#191F28]`}>
                    {item.sample}
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
                  💡 용도: {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6종 전역 타이포그래피 실전 통합 조합 샘플 카드 */}
        <div>
          <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider mb-3 text-left flex items-center gap-1.5">
            <Sparkle size={16} weight="fill" className="text-[#00C474]" />
            <span>6종 전역 타이포그래피 실전 통합 조합 샘플 (Integrated Live Showcase)</span>
          </h3>

          <div className="bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 border border-emerald-200/80 rounded-3xl p-6 shadow-soft flex flex-col gap-5 text-left relative overflow-hidden">
            {/* 1. txt-title-main */}
            <div className="flex flex-col gap-1 border-b border-emerald-100/80 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">.txt-title-main</span>
                <span className="txt-micro-main text-emerald-600">Lv.2 마음운동가</span>
              </div>
              <h2 className="txt-title-main text-gray-900 mt-1">
                보노보노님, 오늘 하루도 마음의 근육을 키워볼까요? 🧘
              </h2>
            </div>

            {/* 2. txt-title-section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">.txt-title-section</span>
                <span className="text-[10px] font-mono text-gray-400">Section Header</span>
              </div>
              <h3 className="txt-title-section text-gray-900">
                8월 추천 자율 리추얼 & 스트레스 케어
              </h3>
            </div>

            {/* 3. txt-title-card & 4. txt-body-main & 5. txt-caption-main & 6. txt-micro-main */}
            <div className="bg-white border border-emerald-100 p-5 rounded-2xl shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">.txt-title-card</span>
                  <h4 className="txt-title-card text-gray-900">
                    "번아웃 시대, 나를 다독이는 자기자비의 기술"
                  </h4>
                </div>
                <span className="txt-micro-main text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  .txt-micro-main (3분)
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded self-start">.txt-body-main</span>
                <p className="txt-body-main text-gray-700">
                  남에게는 한없이 친절하면서 왜 나에게는 엄격할까요? 오늘 하루 지친 내 마음속 다정한 변호인을 깨워보는 심리학 아티클입니다.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">.txt-caption-main</span>
                  <span className="txt-micro-main text-gray-400">REF: MG-2026-0819</span>
                </div>
                <p className="txt-caption-main text-gray-500">
                  💡 가이드: 이 아티클을 읽고 3분 마음일기를 작성하면 덤벨 15개가 즉시 적립됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 폰트 및 CDN 레퍼런스 카드 */}
        <div>
          <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider mb-3 text-left flex items-center gap-1.5">
            <TextAa size={16} weight="fill" className="text-[#00C473]" />
            <span>Font Spec & Webfont CDN Links</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedFonts.map((font) => (
              <div
                key={font.name}
                className="bg-white border border-gray-200 hover:border-[#005A34] rounded-2xl p-5 shadow-2xs flex flex-col justify-between text-left transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-gray-400">{font.type}</span>
                    <Badge variant={font.badgeVariant} size="sm">
                      {font.badge}
                    </Badge>
                  </div>

                  <h4 className="text-base font-black text-[#191F28] tracking-tight mb-1">
                    {font.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-3">
                    {font.desc}
                  </p>

                  <div className="bg-[#F9FAFB] border border-gray-200/80 p-2.5 rounded-xl mb-4 text-[11px] text-gray-500 font-mono">
                    <span className="font-bold text-[#005A34] block mb-0.5">CSS `@import` 구문:</span>
                    <span className="truncate block">{font.cdnUrl}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <a
                    href={font.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#005A34] hover:underline"
                  >
                    <span>공식 페이지 / CDN</span>
                    <ArrowSquareOut size={13} weight="bold" />
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(font.cdnUrl);
                      alert(`[${font.name}] CDN 구문이 복사되었습니다!\n${font.cdnUrl}`);
                    }}
                    className="inline-flex items-center gap-1 bg-[#E9F8F0] hover:bg-[#005A34] text-[#005A34] hover:text-white border border-[#00C473]/30 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
                  >
                    <LinkIcon size={12} weight="bold" />
                    <span>구문 복사</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
