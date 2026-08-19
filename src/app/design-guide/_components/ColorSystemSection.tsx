"use client";

import React, { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { Card, CardVariant } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ColorToken {
  name: string;
  hex: string;
  class: string;
  desc: string;
  textColor: string;
}

const CARD_VARIANTS: { id: CardVariant; title: string; desc: string; badge: string; hex: string }[] = [
  { id: "mint", title: "Mint Tint Card", desc: "시그니처 민트 틴트 20% 메인 패널", badge: "Signature Active", hex: "#E9F8F0" },
  { id: "olive", title: "Olive Sage Card", desc: "시안1 매칭: 올리브 세이지 파스텔 톤", badge: "Ref Image 1:1", hex: "#E3EAD8" },
  { id: "sky", title: "Sky Pastel Card", desc: "시안1 매칭: 소프트 파스텔 파랑 톤", badge: "Ref Image 1:1", hex: "#E4F0F8" },
  { id: "yellow", title: "Cream Yellow Card", desc: "시안2 매칭: 소프트 우유 크림 노랑 톤", badge: "Ref Image 1:1", hex: "#FAF3E0" },
  { id: "rose", title: "Blush Rose Card", desc: "시안2 매칭: 소프트 코랄 로즈 빨강 톤", badge: "Ref Image 1:1", hex: "#F7E7E3" },
  { id: "lavender", title: "Soft Lavender Card", desc: "차분하고 포근한 소프트 라벤더 보라 톤", badge: "Pastel Suite", hex: "#F1EDF8" },
  { id: "peach", title: "Apricot Peach Card", desc: "따뜻하고 상쾌한 아프리콧 피치 톤", badge: "Pastel Suite", hex: "#FAF0E6" },
  { id: "mist", title: "Mist Gray-Blue Card", desc: "은은하고 세련된 미스트 블루그레이 톤", badge: "Pastel Suite", hex: "#EAEFF2" },
  { id: "sand", title: "Warm Sand Card", desc: "편안하고 단정한 샌드 웜그레이 톤", badge: "Pastel Suite", hex: "#F4F3EF" },
  { id: "surface", title: "Surface Flat Card", desc: "기본 옅은 회색 오프화이트 평온 패널", badge: "Surface Default", hex: "#F9FAFB" },
  { id: "grayLight", title: "Neutral Surface Card", desc: "Neutral Scale 1단계: Surface 패널", badge: "Surface Match", hex: "#F9FAFB" },
  { id: "grayMid", title: "Neutral Gray 200 Card", desc: "Neutral Scale 2단계: Gray 200 디바인더 패널", badge: "Gray 200 Match", hex: "#EDEFF2" },
  { id: "grayDark", title: "Neutral Gray 400 Card", desc: "Neutral Scale 3단계: Gray 400 차콜 패널", badge: "Gray 400 Match", hex: "#B0B8C1" },
];

const BRAND_COLORS: ColorToken[] = [
  { name: "Signature Green", hex: "#00C473", class: "bg-[#00C473]", desc: "메인 시그니처 엠블럼 & CTA 버튼", textColor: "text-white" },
  { name: "Brand Hover", hex: "#009859", class: "bg-[#009859]", desc: "버튼 호버 & 클릭 인터랙션 틴트", textColor: "text-white" },
  { name: "Forest", hex: "#005A34", class: "bg-[#005A34]", desc: "다크 그린 강조 서체 & 텍스트", textColor: "text-white" },
  { name: "Mint Tint", hex: "#E9F8F0", class: "bg-[#E9F8F0]", desc: "배경 틴트 & 진행중 패널", textColor: "text-[#005A34]" },
  { name: "White", hex: "#FFFFFF", class: "bg-white border border-[#e8e8e8]", desc: "순백색 캔버스 및 카드 스펙", textColor: "text-gray-900" },
];

const NEUTRAL_COLORS: ColorToken[] = [
  { name: "Ink", hex: "#191F28", class: "bg-[#191F28]", desc: "주요 헤드라인 & 다크 블랙 타이틀", textColor: "text-white" },
  { name: "Gray 700", hex: "#4E5968", class: "bg-[#4E5968]", desc: "서브 헤더 & 본문 서체", textColor: "text-white" },
  { name: "Gray 500", hex: "#8B95A1", class: "bg-[#8B95A1]", desc: "보조 설명 & 캡션 서체", textColor: "text-white" },
  { name: "Gray 400", hex: "#B0B8C1", class: "bg-[#B0B8C1]", desc: "Placeholder 및 비활성 서체", textColor: "text-white" },
  { name: "Gray 200", hex: "#EDEFF2", class: "bg-[#EDEFF2]", desc: "디바인더 & 테두리 라인", textColor: "text-gray-900" },
  { name: "Surface", hex: "#F9FAFB", class: "bg-[#F9FAFB]", desc: "카드 패널 & 옅은 회색 배경", textColor: "text-gray-900" },
];

export function ColorSystemSection() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <section id="colors" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C473] rounded-full inline-block" />
          1. Color System & Card Variations (Brand Identity v1.1)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          실제 Card 컴포넌트에 즉시 가져와 적용하는 6가지 카드 컬러 베리에이션 및 Neutral Scale 6종 명세
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Brand Ratio Bar (White 70% | Mint Tint 20% | Signature Green 10%) */}
        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs text-left">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-3">
            Design Color Ratio System
          </h3>
          <div className="w-full h-14 rounded-2xl border border-gray-200 overflow-hidden flex shadow-2xs">
            <div className="w-[70%] bg-white border-r border-gray-200 flex items-center justify-center font-black text-sm text-[#191F28]">
              White 70% (#FFFFFF)
            </div>
            <div className="w-[20%] bg-[#E9F8F0] border-r border-[#00C473]/30 flex items-center justify-center font-bold text-xs text-[#005A34]">
              20% (#E9F8F0)
            </div>
            <div className="w-[10%] bg-[#00C473] flex items-center justify-center font-black text-xs text-white">
              10%
            </div>
          </div>
        </div>

        {/* =========================================================================
            CARD COLOR VARIATIONS (실제 Card에 넣어서 사용하는 6가지 컬러 베리에이션)
           ========================================================================= */}
        <div>
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-3 text-left">
            Card Color Variations (6 Types for <code className="text-[#005A34]">Card.tsx</code>)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CARD_VARIANTS.map((cardTpl) => (
              <Card
                key={cardTpl.id}
                variant={cardTpl.id}
                clickable={false}
                className="flex flex-col justify-between h-[130px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold opacity-75">variant="{cardTpl.id}"</span>
                  <Badge
                    variant={
                      cardTpl.id === "grayDark"
                        ? "surface"
                        : cardTpl.id === "grayLight" || cardTpl.id === "grayMid"
                        ? "dark"
                        : (cardTpl.id as any)
                    }
                    size="sm"
                    className="text-[9px]"
                  >
                    {cardTpl.badge}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black tracking-tight mb-0.5">{cardTpl.title}</h4>
                    <span className="text-xs font-mono font-extrabold opacity-70">{cardTpl.hex}</span>
                  </div>
                  <p className="text-[11px] font-medium opacity-80 line-clamp-1">{cardTpl.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Neutrals (Neutral Scale 6종) */}
        <div>
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-3 text-left">
            Neutral Scale (6 Color Tokens)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {NEUTRAL_COLORS.map((token) => {
              const isWhite = token.name === "White" || token.hex.toUpperCase() === "#FFFFFF";
              return (
                <div
                  key={token.name}
                  onClick={() => handleCopy(token.hex)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden shadow-2xs transition-all ${
                    isWhite ? "bg-white border border-[#e8e8e8]" : "bg-white border border-transparent"
                  }`}
                >
                  <div
                    className={`h-16 ${token.class} ${
                      isWhite ? "border-b border-[#e8e8e8]" : ""
                    }`}
                  />
                  <div className="p-2.5 bg-white text-left flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-gray-900">{token.name}</span>
                      <span className="text-[10px] font-mono font-extrabold text-gray-400">{token.hex}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium leading-tight block mt-0.5">
                      {token.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Signature Colors */}
        <div>
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-3 text-left">
            Brand Signature Colors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {BRAND_COLORS.map((token) => {
              const isWhite = token.name === "White" || token.hex.toUpperCase() === "#FFFFFF";
              return (
                <div
                  key={token.name}
                  onClick={() => handleCopy(token.hex)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden shadow-2xs transition-all ${
                    isWhite ? "bg-white border border-[#e8e8e8]" : "bg-white border border-transparent"
                  }`}
                >
                  {/* 상단 순수 컬러 칩 박스 (텍스트 제거) */}
                  <div
                    className={`h-24 ${token.class} ${
                      isWhite ? "border-b border-[#e8e8e8]" : ""
                    }`}
                  />

                  {/* 하단 텍스트 및 토큰 정보 배치 영역 */}
                  <div className="p-3 bg-white text-left flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">{token.name}</span>
                      <span className="text-xs font-mono font-extrabold text-gray-500">{token.hex}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mt-0.5">
                      <span className="truncate">{token.class}</span>
                      {copiedText === token.hex ? (
                        <span className="text-[#00C474] font-bold flex items-center gap-0.5 text-[10px]">
                          <Check size={12} /> Copied
                        </span>
                      ) : (
                        <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    <p className="text-[11px] text-gray-500 font-medium leading-tight mt-1">
                      {token.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
