"use client";

import React, { useState } from "react";
import { User, Clock, Check } from "@phosphor-icons/react";
import { GodSelect } from "@/components/godui/GodSelect";

export function FormControlsSection() {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("오전 07:30 (권장 시간)");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);

  const timeOptions = [
    { value: "오전 07:00 (일찍 시작)", label: "오전 07:00 (일찍 시작)" },
    { value: "오전 07:30 (권장 시간)", label: "오전 07:30 (권장 시간)" },
    { value: "오전 08:00 (여유로운 아침)", label: "오전 08:00 (여유로운 아침)" },
    { value: "오전 08:30 (출근 전 수련)", label: "오전 08:30 (출근 전 수련)" },
  ];

  return (
    <section id="forms" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C474] rounded-full inline-block" />
          6. Forms & Input Controls (GodUI Dropdown Menu)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          닉네임/이메일 텍스트 필드, GodUI 모션 드롭다운 커스텀 메뉴(<code className="font-mono text-[var(--color-brand-green)] font-bold">GodSelect.tsx</code>) 및 Selectable Card controls
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input & GodUI Select Dropdown */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-extrabold text-gray-700 block mb-1.5 text-left">
              나만의 닉네임 입력 (Input Text)
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="예: 마음건강 리더"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/90 border border-gray-200/90 rounded-2xl text-sm font-bold text-gray-900 outline-none ui-input-focus"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-gray-700 block mb-1.5 text-left">
              아침 체크인 알림 시간 선택 (GodUI Animated Dropdown)
            </label>
            <GodSelect
              options={timeOptions}
              value={selectValue}
              onChange={(val) => setSelectValue(val)}
              icon={<Clock size={18} weight="bold" />}
            />
          </div>
        </div>

        {/* Checkbox Card */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-extrabold text-gray-700 block mb-0.5 text-left">
            체크박스 카드 선택 (Checkbox Card - Background Darken + Accent Border)
          </label>
          <div
            onClick={() => setCheckboxChecked(!checkboxChecked)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ui-card-accent-hover ${
              checkboxChecked
                ? "bg-[var(--color-pastel-mint-bg)] border-[var(--color-brand-green)] shadow-2xs"
                : "bg-gray-50 border-gray-200/90"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                  checkboxChecked ? "bg-[#00C473] text-white" : "border border-gray-300 bg-white"
                }`}
              >
                {checkboxChecked && <Check size={14} weight="bold" />}
              </div>
              <div>
                <span className="text-xs font-black text-gray-900 block">매일 아침 푸시 알림 받기</span>
                <span className="text-[11px] text-gray-500">설정한 체크인 시간에 상쾌한 알림이 발송됩니다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
