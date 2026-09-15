"use client";

import React, { useState, useEffect } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { useThemeStore, THEME_PRESETS } from "@/store/useThemeStore";
import {
  PaintBrush,
  Bell,
  CheckCircle,
  Sparkle,
  Sun,
  ShieldCheck,
  Info,
} from "@phosphor-icons/react";

/**
 * SettingsSheet: 내 정보 & 여정 우측 상단 톱니바퀴 아이콘 클릭 시 발동되는 전역 설정 시트
 * - 디자인 스타일 테마 변경 (눈 편한 내추럴 세이지 ↔ 기존 클래식 화이트)
 * - 리추얼 알림 / 푸시 설정
 * - 버전 정보 및 서비스 정책
 */
export function SettingsSheet() {
  const { closeModal } = useModalStore();
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // 알림 토글 상태 더미
  const [pushEnabled, setPushEnabled] = useState(true);
  const [ritualReminder, setRitualReminder] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-full bg-theme-app flex flex-col select-none relative pb-16 txt-brand-ink overflow-y-auto">
      {/* 1. 상단 서브 헤더 (뒤로가기 버튼) */}
      <SubPageHeader
        title="환경 설정"
        leftType="back"
        onLeftClick={closeModal}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto">
        {/* ================= SECTION 1: 화면 디자인 스타일 (Theme) ================= */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#009E5C] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <PaintBrush size={14} weight="fill" />
            </div>
            <h2 className="text-base font-extrabold txt-brand-ink tracking-tight">
              화면 디자인 스타일
            </h2>
          </div>
          <p className="text-xs font-semibold text-theme-muted -mt-1">
            눈의 피로도와 가독성에 맞춰 선호하는 테마를 선택할 수 있습니다.
          </p>

          {/* 6가지 프리미엄 테마 선택 카드 목록 (네오 브루탈리즘 포함) */}
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {THEME_PRESETS.map((preset) => {
              const isSelected = theme === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setTheme(preset.id)}
                  className={`p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-theme-card border-brand-green ring-2 ring-brand-green/20 shadow-xs"
                      : "bg-theme-card border-theme-subtle hover:border-gray-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-2xs"
                      style={{ backgroundColor: preset.bgHex }}
                    >
                      <Sparkle
                        size={20}
                        weight="fill"
                        style={{ color: preset.accentHex }}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold txt-brand-ink">
                          {preset.name}
                        </span>
                        <span
                          className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: preset.cardSubtleHex,
                            color: preset.accentHex,
                          }}
                        >
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-theme-muted leading-snug line-clamp-1">
                        {preset.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-brand-green border-brand-green text-white"
                          : "border-theme-subtle bg-theme-card text-transparent"
                      }`}
                    >
                      <CheckCircle size={16} weight="fill" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION 2: 알림 및 리추얼 알림 ================= */}
        <section className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-theme-card-subtle txt-brand-ink flex items-center justify-center shrink-0 shadow-2xs">
              <Bell size={14} weight="fill" />
            </div>
            <h2 className="text-base font-extrabold txt-brand-ink tracking-tight">
              알림 설정
            </h2>
          </div>

          <div className="flex flex-col bg-theme-card rounded-2xl p-4 divide-y divide-theme-subtle border border-theme-subtle">
            {/* 알림 토글 1 */}
            <div className="flex items-center justify-between py-2.5">
              <div className="flex flex-col">
                <span className="text-sm font-bold txt-brand-ink">
                  매일 마음 리추얼 리마인더
                </span>
                <span className="text-xs text-theme-muted font-medium">
                  지정한 시간에 오늘의 루틴 알림 수신
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRitualReminder(!ritualReminder)}
                className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  ritualReminder ? "bg-[#009E5C]" : "bg-theme-card-subtle"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    ritualReminder ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 알림 토글 2 */}
            <div className="flex items-center justify-between py-2.5">
              <div className="flex flex-col">
                <span className="text-sm font-bold txt-brand-ink">
                  마케팅 및 소식 알림
                </span>
                <span className="text-xs text-theme-muted font-medium">
                  월간 매거진 및 이벤트 소식 안내
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  pushEnabled ? "bg-[#009E5C]" : "bg-theme-card-subtle"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    pushEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: 서비스 정보 ================= */}
        <section className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gray-400 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Info size={14} weight="bold" />
            </div>
            <h2 className="text-base font-extrabold txt-brand-ink tracking-tight">
              서비스 정보
            </h2>
          </div>

          <div className="flex flex-col bg-theme-card rounded-2xl p-4 gap-3 text-xs font-semibold text-theme-muted border border-theme-subtle">
            <div className="flex justify-between items-center py-1">
              <span>앱 버전</span>
              <span className="text-theme-muted font-mono">v1.2.0 (Design System)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-t border-theme-subtle">
              <span>이용약관</span>
              <span className="text-theme-muted cursor-pointer hover:underline">보기</span>
            </div>
            <div className="flex justify-between items-center py-1 border-t border-theme-subtle">
              <span>개인정보 처리방침</span>
              <span className="text-theme-muted cursor-pointer hover:underline">보기</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
