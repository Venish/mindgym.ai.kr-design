"use client";

import React from "react";
import Link from "next/link";
import { ArrowSquareOut, Layout, Cards, ListChecks, Target } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";

export function FlatTemplatesSection() {
  const templates = [
    {
      id: "v1",
      title: "V1. 3-Column Grid Flat Dashboard",
      route: "/dashboard-flat",
      badgeText: "3열 플랫 카드형",
      icon: Cards,
      desc: "오프먼트, 한 칸 완벽주의, 빈손 산책을 3열 분할 그리드로 직관 배치한 현대적 플랫 대시보드 스펙",
    },
    {
      id: "v2",
      title: "V2. Compact 1-Column List Flat Dashboard",
      route: "/dashboard-flat-v2",
      badgeText: "1열 컴팩트 리스트형",
      icon: ListChecks,
      desc: "헤드라인 메시지 + 완료 상태 뱃지 및 세로형 1열 칩 카드 리스트 기반 고밀도 대시보드 스펙",
    },
    {
      id: "v3",
      title: "V3. Large Hero Recommended Focus Flat Dashboard",
      route: "/dashboard-flat-v3",
      badgeText: "대형 히어로 집중형",
      icon: Target,
      desc: "5분 타이머 대형 웰컴 히어로 카드 중심 집중 케어형 2열 서브 리추얼 대시보드 스펙",
    },
  ];

  return (
    <section id="templates" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C473] rounded-full inline-block" />
          7. Flat Dashboard Template Architecture (공통 대시보드 레이아웃)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          공통 컴포넌트(<code className="font-mono text-[#005A34] font-bold">RitualCard</code>, <code className="font-mono text-[#005A34] font-bold">Badge</code>, <code className="font-mono text-[#005A34] font-bold">BrandLogo</code>) 조립 레이아웃 스펙 3종
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const IconComp = tpl.icon;
          return (
            <div
              key={tpl.id}
              className="bg-white border border-gray-200 hover:border-[#005A34] active:border-[#005A34] rounded-3xl p-6 shadow-xs flex flex-col justify-between transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E9F8F0] border border-[#00C473]/30 flex items-center justify-center text-[#005A34]">
                    <IconComp size={22} weight="bold" />
                  </div>
                  <Badge variant="mint" size="sm">
                    {tpl.badgeText}
                  </Badge>
                </div>

                <h3 className="text-base font-black text-[#191F28] tracking-tight mb-2">
                  {tpl.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">
                  {tpl.desc}
                </p>
              </div>

              <Link
                href={tpl.route}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F9FAFB] hover:bg-[#005A34] text-[#191F28] hover:text-white border border-gray-200 hover:border-[#005A34] font-extrabold text-xs py-3 rounded-2xl transition-all"
              >
                <span>실제 대시보드 데모 보기</span>
                <ArrowSquareOut size={16} weight="bold" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
