"use client";

import React from "react";
import { Sun, Moon, Brain, Notebook, Lightning, Smiley } from "@phosphor-icons/react";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { AnimatedEveningMoon } from "@/components/animated-icons/AnimatedEveningMoon";

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
          <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-emerald-600">AnimatedMorningSun</code> & <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-indigo-600">AnimatedEveningMoon</code> 모션 아이콘 셋업
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. 낮/아침 체크인 헤더 아이콘 */}
          <div className="flex items-center gap-4 bg-emerald-50/50 p-5 rounded-2xl text-left">
            <AnimatedMorningSun className="w-16 h-16 shrink-0" />
            <div>
              <span className="text-xs font-black text-emerald-800 block">`AnimatedMorningSun` Component</span>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                아침 루틴 및 낮 체크인 헤더에 사용되는 360도 무한 회전/빛무늬 애니메이션 컴포넌트입니다.
              </p>
            </div>
          </div>

          {/* 2. 밤/저녁 체크인 헤더 아이콘 */}
          <div className="flex items-center gap-4 bg-indigo-50/50 p-5 rounded-2xl text-left">
            <AnimatedEveningMoon className="w-16 h-16 shrink-0" />
            <div>
              <span className="text-xs font-black text-indigo-900 block">`AnimatedEveningMoon` Component</span>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                밤 루틴 및 저녁 체크인 헤더에 사용되는 달빛 부유/별빛 반짝임 애니메이션 컴포넌트입니다.
              </p>
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
