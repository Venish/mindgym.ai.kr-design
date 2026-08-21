"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePopupStore } from "@/store/usePopupStore";
import { PencilSimple, Check } from "@phosphor-icons/react";

/**
 * GlobalPopupProvider: 최상위 전역 공통 시스템 팝업 (Z-Index: 9999 최고 레벨 강제 고정)
 * - z-60 Tailwind 클래스 불발 이슈 방지 -> inline zIndex 9999 & z-[9999] 로 최상위 노출 보장
 */
export function GlobalPopupProvider() {
  const { isOpen, params, closePopup } = usePopupStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (params?.initialValue) {
      setInputValue(params.initialValue);
    } else {
      setInputValue("");
    }
  }, [params]);

  if (!isOpen || !params) return null;

  const handleConfirm = () => {
    if (inputValue.trim()) {
      params.onConfirm(inputValue.trim());
      closePopup();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed inset-0 max-w-[430px] mx-auto flex items-center justify-center p-5 pointer-events-auto select-none"
        >
          {/* iOS 글래스모피즘 맑은 딤 백드롭 (bg-black/15 + backdrop-blur-md) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closePopup}
            style={{ zIndex: 9999 }}
            className="absolute inset-0 bg-black/15 backdrop-blur-md backdrop-saturate-150 cursor-pointer"
          />

          {/* CEO 인사말 팝업 동일 감성 공통 팝업 본체 (rounded-[28px], zIndex 10000) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ zIndex: 10000 }}
            className="bg-white text-left p-6 rounded-[28px] shadow-2xl max-w-[360px] w-full relative overflow-hidden border border-emerald-100/50 flex flex-col gap-4"
          >
            {/* 상단 은은한 그린 앰비언트 글로우 */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00C474]/10 rounded-full blur-2xl pointer-events-none" />

            {/* 타이틀 */}
            <div className="flex flex-col gap-1 relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
                  {params.title}
                </h2>
                <PencilSimple size={18} className="text-[#00C474] shrink-0 ml-2" weight="bold" />
              </div>
              {params.subtitle && (
                <p className="txt-caption-main text-gray-500 font-medium leading-relaxed">
                  {params.subtitle}
                </p>
              )}
            </div>

            {/* 로그인 폼 100% 동일 스펙 대화형 입력 폼 */}
            <div className="flex flex-col gap-1.5 relative z-10 mt-1">
              {params.inputLabel && (
                <label className="txt-caption-main txt-brand-clay font-medium mb-0.5 block">
                  {params.inputLabel}
                </label>
              )}
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3.5 focus-within:border-[#00C474] focus-within:ring-2 focus-within:ring-[#00C474]/20 transition-all duration-200">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={params.placeholder || "내용을 입력하세요"}
                  className="w-full bg-transparent text-[18px] font-bold txt-brand-ink outline-none tracking-tight"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleConfirm();
                  }}
                />
              </div>
            </div>

            {/* 하단 2열 액션 버튼 (로그인 CTA 버튼 100% 동일 폰트 크기: text-base font-extrabold) */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 relative z-10">
              <button
                type="button"
                onClick={closePopup}
                className="py-3.5 px-4 rounded-2xl text-base font-extrabold text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-center"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="py-3.5 px-4 rounded-2xl text-base font-extrabold text-white bg-[#00C474] hover:bg-emerald-600 active:scale-95 shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>저장하기</span>
                <Check size={18} weight="bold" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
