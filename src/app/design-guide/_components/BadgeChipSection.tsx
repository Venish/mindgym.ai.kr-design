"use client";

import React, { useState } from "react";
import { Sparkle, Sun, Moon, Heart, Compass, Check } from "@phosphor-icons/react";
import { Badge, BadgeVariant } from "@/components/ui/Badge";
import { EmotionChip } from "@/components/ui/EmotionChip";

export function BadgeChipSection() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("평온함");
  const [selectedTime, setSelectedTime] = useState<string>("5분");

  const pastelBadgeList: { variant: BadgeVariant; label: string; icon?: React.ReactNode }[] = [
    { variant: "mint", label: "Mint Tint 20%", icon: <Sparkle size={12} weight="fill" /> },
    { variant: "olive", label: "Olive Sage", icon: <Compass size={12} weight="bold" /> },
    { variant: "sky", label: "Sky Pastel", icon: <Sun size={12} weight="bold" /> },
    { variant: "yellow", label: "Cream Yellow", icon: <Sun size={12} weight="fill" /> },
    { variant: "rose", label: "Blush Rose", icon: <Heart size={12} weight="fill" /> },
    { variant: "lavender", label: "Soft Lavender", icon: <Moon size={12} weight="fill" /> },
    { variant: "peach", label: "Apricot Peach" },
    { variant: "mist", label: "Mist Gray-Blue" },
    { variant: "sand", label: "Warm Sand" },
    { variant: "forest", label: "Forest Solid" },
    { variant: "dark", label: "Dark Solid" },
    { variant: "outline", label: "White Outline" },
  ];

  const emotionList = [
    { name: "평온함", emoji: "🌱", count: 12 },
    { name: "활력", emoji: "⚡", count: 8 },
    { name: "집중", emoji: "🎯", count: 15 },
    { name: "감사", emoji: "💖", count: 5 },
    { name: "회복", emoji: "🌙", count: 9 },
  ];

  const timeList = ["3분", "5분", "10분", "15분", "30분"];

  return (
    <section id="badges" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C473] rounded-full inline-block" />
          4. Badges, Tags & Emotion Chips (Pastel Tone Suite)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          카드 팔레트와 1:1로 매칭되는 10종 파스텔 톤 뱃지(<code className="font-mono text-[#005A34] font-bold">Badge.tsx</code>) 및 인터랙티브 칩 명세
        </p>
      </div>

      <div className="bg-[#F9FAFB] border border-gray-200 rounded-3xl p-6 shadow-2xs flex flex-col gap-8">
        
        {/* 1. Harmonized Pastel Badges */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider">
              1. Pastel Tone Badges (12 Color Variants)
            </span>
            <span className="text-[10px] text-gray-400 font-bold">No Border / Soft Fill</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {pastelBadgeList.map((item) => (
              <Badge key={item.variant} variant={item.variant} icon={item.icon}>
                {item.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* 2. Flat Selectable Emotion Chips */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider">
              2. Emotion Intention Chips (<code className="text-[#005A34]">EmotionChip.tsx</code>)
            </span>
            <span className="text-[10px] text-gray-400 font-bold">Interactive Selection</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {emotionList.map((item) => (
              <EmotionChip
                key={item.name}
                label={item.name}
                emoji={item.emoji}
                count={item.count}
                selected={selectedEmotion === item.name}
                onClick={() => setSelectedEmotion(item.name)}
              />
            ))}
          </div>
        </div>

        {/* 3. Flat Duration Time Selector Chips */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider">
              3. Ritual Time Selector Chips (시간 선택 칩)
            </span>
            <span className="text-[10px] text-gray-400 font-bold">Flat Time Capsule</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeList.map((time) => (
              <EmotionChip
                key={time}
                label={time}
                selected={selectedTime === time}
                onClick={() => setSelectedTime(time)}
                size="sm"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
