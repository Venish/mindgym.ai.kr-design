"use client";

import React from "react";
import { Sun, Moon, Brain, Notebook, Lightning, Smiley } from "@phosphor-icons/react";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { AnimatedEveningMoon } from "@/components/animated-icons/AnimatedEveningMoon";
import { DumbbellIcon } from "@/components/animated-icons/AnimatedDumbbell";

export function MotionIconSection() {
  const phosphorIcons = [
    { icon: Sun, color: "text-amber-500", label: "Sun" },
    { icon: Moon, color: "text-indigo-500", label: "Moon" },
    { icon: Brain, color: "text-emerald-600", label: "Brain" },
    { icon: Notebook, color: "text-teal-600", label: "Notebook" },
    { icon: Lightning, color: "text-amber-600", label: "Lightning" },
    { icon: Smiley, color: "text-rose-500", label: "Smiley" },
  ];

  return (
    <section id="motion" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black txt-brand-ink flex items-center gap-2">
          <span className="w-2.5 h-6 bg-brand-green rounded-full inline-block" />
          8. Motion & Icon Elements
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-emerald-600">AnimatedMorningSun</code>, <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-indigo-600">AnimatedEveningMoon</code> & <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-slate-600">DumbbellIcon</code> 모션 아이콘 셋업
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. 낮/아침 체크인 헤더 아이콘 */}
          <div className="flex items-center gap-4 bg-emerald-50/50 p-5 rounded-2xl text-left">
            <AnimatedMorningSun className="w-16 h-16 shrink-0" />
            <div>
              <span className="text-xs font-black text-emerald-800 block">`AnimatedMorningSun`</span>
              <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                아침 루틴 및 낮 체크인 360도 무한 회전 회전 컴포넌트
              </p>
            </div>
          </div>

          {/* 2. 밤/저녁 체크인 헤더 아이콘 */}
          <div className="flex items-center gap-4 bg-indigo-50/50 p-5 rounded-2xl text-left">
            <AnimatedEveningMoon className="w-16 h-16 shrink-0" />
            <div>
              <span className="text-xs font-black text-indigo-900 block">`AnimatedEveningMoon`</span>
              <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                밤/저녁 느린 구름 흐름 애니메이션 아이콘
              </p>
            </div>
          </div>

          {/* 3. 덤벨 레벨별 7종 컬렉션 */}
          <div className="flex flex-col gap-4 bg-slate-50/80 p-6 rounded-2xl col-span-1 md:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">`DumbbellIcon` 레벨별 7종 컬러 팔레트 시스템 (Doc 기반)</span>
              <span className="text-[11px] font-mono text-gray-500">level=&quot;wood&quot; | &quot;stone&quot; | &quot;bronze&quot; | &quot;iron&quot; | &quot;silver&quot; | &quot;gold&quot; | &quot;platinum&quot;</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {[
                { level: "wood", name: "나무 덤벨", num: "Lv.1" },
                { level: "stone", name: "돌 덤벨", num: "Lv.2" },
                { level: "bronze", name: "청동 덤벨", num: "Lv.3" },
                { level: "iron", name: "철 덤벨", num: "Lv.4" },
                { level: "silver", name: "은 덤벨", num: "Lv.5" },
                { level: "gold", name: "금 덤벨", num: "Lv.6" },
                { level: "platinum", name: "플래티넘 덤벨", num: "Lv.7" },
              ].map((item) => (
                <div
                  key={item.level}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all"
                >
                  <DumbbellIcon size={72} level={item.level as any} />
                  <div className="text-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 block">{item.num}</span>
                    <span className="text-xs font-bold text-gray-900 leading-tight">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-center bg-gray-50 p-5 rounded-2xl">
          {phosphorIcons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-gray-200">
                  <IconComponent size={24} weight="duotone" className={item.color} />
                </div>
                <span className="txt-caption-compact font-mono text-gray-500">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
