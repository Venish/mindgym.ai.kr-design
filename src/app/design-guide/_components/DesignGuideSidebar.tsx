"use client";

import React from "react";
import {
  Palette,
  TextAa,
  RadioButton,
  Tag,
  SquaresFour,
  Textbox,
  Layout,
  Sparkle,
  Lightning,
  Cards,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function DesignGuideSidebar({ activeSection, onSelectSection }: SidebarProps) {
  const menuGroups = [
    {
      title: "FOUNDATIONS",
      items: [
        { id: "colors", label: "Color System & Ratio", icon: Palette },
        { id: "radius", label: "Border Radius Scale", icon: Layout },
        { id: "typography", label: "Typography & Fonts", icon: TextAa },
      ],
    },
    {
      title: "UI COMPONENTS",
      items: [
        { id: "buttons", label: "Buttons & Actions", icon: RadioButton },
        { id: "badges", label: "Badges, Tags & Chips", icon: Tag },
        { id: "rituals", label: "Ritual Card System", icon: SquaresFour },
        { id: "forms", label: "Form & Input Controls", icon: Textbox },
      ],
    },
    {
      title: "APP TEMPLATES",
      items: [
        { id: "flat-components", label: "Dashboard Real UI", icon: Cards },
        { id: "templates", label: "Flat Layout 3 Specs", icon: Layout },
      ],
    },
    {
      title: "INTERACTIONS",
      items: [
        { id: "aurora-hero", label: "Aurora Hero Spec", icon: Sparkle },
        { id: "motion", label: "Motion & Icons", icon: Lightning },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto p-4 select-none">
      {/* 70:20:10 비율 시각화 카드 요약 */}
      <div className="bg-white border border-gray-200/80 p-3.5 rounded-2xl mb-5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black text-[#191F28]">Identity Ratio</span>
          <Badge variant="mint" size="sm" className="text-[9px] px-1.5">v1.1</Badge>
        </div>
        <div className="w-full h-3.5 rounded-full border border-gray-200 overflow-hidden flex shadow-2xs">
          <div className="w-[70%] bg-white border-r border-gray-200" title="White 70%" />
          <div className="w-[20%] bg-[#E9F8F0] border-r border-[#00C473]/30" title="Mint Tint 20%" />
          <div className="w-[10%] bg-[#00C473]" title="Signature Green 10%" />
        </div>
        <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 mt-1.5 font-mono">
          <span>White 70%</span>
          <span>Mint 20%</span>
          <span className="text-[#00C473]">10%</span>
        </div>
      </div>

      {/* 카테고리 트리 네비게이션 */}
      <div className="flex flex-col gap-6 flex-1">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <span className="text-[10px] font-black font-mono text-gray-400 tracking-wider uppercase block mb-2 px-2">
              {group.title}
            </span>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? "bg-[#E9F8F0] text-[#005A34] border border-[#005A34] shadow-2xs"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                    }`}
                  >
                    <IconComp
                      size={16}
                      weight={isActive ? "fill" : "regular"}
                      className={isActive ? "text-[#005A34]" : "text-gray-400"}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 푸터 캡션 */}
      <div className="pt-4 mt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center font-medium">
        MindGym TDS v1.1 Spec
      </div>
    </aside>
  );
}
