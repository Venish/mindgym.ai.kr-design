"use client";

import React, { useState } from "react";
import { Sparkle, ArrowRight, Heart, Star, House, Compass, User, Notebook } from "@phosphor-icons/react";
import { MagicButton } from "@/components/godui/MagicButton";
import { GodTabBar } from "@/components/godui/GodTabBar";

export function ButtonSystemSection() {
  const [activePillTab, setActivePillTab] = useState("home");
  const [activeUnderlineTab, setActiveUnderlineTab] = useState("all");

  const tabItems = [
    { id: "home", label: "홈", icon: <House size={16} weight="bold" /> },
    { id: "explore", label: "탐색", icon: <Compass size={16} weight="bold" />, badge: "HOT" },
    { id: "journal", label: "마음일기", icon: <Notebook size={16} weight="bold" />, badge: 3 },
    { id: "profile", label: "마이페이지", icon: <User size={16} weight="bold" /> },
  ];

  return (
    <section id="buttons" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C474] rounded-full inline-block" />
          3. Buttons, Action & TabBar Systems (GodUI TabBar)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          기본 CTA, MagicButton, GodUI 애니메이션 TabBar(<code className="font-mono text-[var(--color-brand-green)] font-bold">GodTabBar.tsx</code>) 스펙
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col gap-8 text-left">
        {/* 1. GodUI TabBar Component (Special Navigation Component) */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-black text-gray-400 font-mono block">
            [SPECIAL] GodUI Animated TabBar Component (Spring Backdrop Motion)
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80">
            {/* Pill Mode */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-extrabold text-gray-700">1. Pill Mode (Floating Spring Backdrop)</span>
              <GodTabBar
                items={tabItems}
                activeTab={activePillTab}
                onTabChange={setActivePillTab}
                variant="pill"
              />
            </div>

            {/* Underline Mode */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-extrabold text-gray-700">2. Underline Mode (Spring Indicator Line)</span>
              <GodTabBar
                items={[
                  { id: "all", label: "전체 리추얼", badge: 12 },
                  { id: "morning", label: "아침 체크인" },
                  { id: "evening", label: "밤 수련" },
                ]}
                activeTab={activeUnderlineTab}
                onTabChange={setActiveUnderlineTab}
                variant="underline"
              />
            </div>
          </div>
        </div>

        {/* 2. MagicButton (GodUI Special) */}
        <div>
          <span className="text-xs font-black text-gray-400 font-mono block mb-2">
            [SPECIAL] MagicButton (GodUI Animation CTA)
          </span>
          <div className="max-w-md">
            <MagicButton className="w-full">
              <span className="flex items-center justify-center gap-2">
                <Sparkle size={16} weight="fill" />
                마인드짐 마음 진단 시작하기
              </span>
            </MagicButton>
          </div>
        </div>

        {/* 2. Standard Primary & Secondary */}
        <div>
          <span className="text-xs font-black text-gray-400 font-mono block mb-2">
            Standard Solid / Secondary / Soft / Disabled
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Solid Primary */}
            <button className="bg-[#00C473] hover:bg-[#005A34] active:bg-[#005A34] text-white border border-[#00C473] hover:border-[#005A34] active:border-[#005A34] font-extrabold text-sm px-6 py-3 rounded-2xl transition-colors shadow-2xs flex items-center gap-2">
              <span>Primary CTA</span>
              <ArrowRight size={16} weight="bold" />
            </button>

            {/* Secondary Soft */}
            <button className="bg-[#E9F8F0] hover:bg-[#005A34] active:bg-[#005A34] text-[#005A34] hover:text-white active:text-white border border-[#00C473]/30 hover:border-[#005A34] active:border-[#005A34] font-extrabold text-sm px-6 py-3 rounded-2xl transition-all">
              Secondary Soft
            </button>

            {/* Outline */}
            <button className="bg-white hover:bg-[#005A34] active:bg-[#005A34] text-gray-700 hover:text-white active:text-white border border-gray-300 hover:border-[#005A34] active:border-[#005A34] font-extrabold text-sm px-6 py-3 rounded-2xl transition-all">
              Outline Button
            </button>

            {/* Ghost */}
            <button className="text-gray-600 hover:text-white active:text-white hover:bg-[#005A34] active:bg-[#005A34] border border-transparent hover:border-[#005A34] active:border-[#005A34] font-bold text-sm px-4 py-3 rounded-2xl transition-all">
              Ghost Button
            </button>

            {/* Disabled */}
            <button disabled className="bg-gray-200 text-gray-400 font-bold text-sm px-6 py-3 rounded-2xl cursor-not-allowed">
              Disabled
            </button>
          </div>
        </div>

        {/* 3. Icon & Small Buttons */}
        <div>
          <span className="text-xs font-black text-gray-400 font-mono block mb-2">
            Icon Buttons & Small Action Chips
          </span>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all">
              <Heart size={18} weight="bold" />
            </button>
            <button className="p-3 bg-[#00C474] hover:bg-[#00B068] text-white rounded-2xl transition-all shadow-sm">
              <Star size={18} weight="fill" />
            </button>
            <button className="px-3 py-1.5 bg-emerald-100 text-[#00C474] font-extrabold text-xs rounded-xl hover:bg-emerald-200 transition-colors">
              +30 덤벨 획득
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
