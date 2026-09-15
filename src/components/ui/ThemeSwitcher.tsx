"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore, THEME_PRESETS } from "@/store/useThemeStore";
import { Sparkle, Sun } from "@phosphor-icons/react";

/**
 * ThemeSwitcher: 실시간 테마 스위처 컴포넌트
 * - [classic: 기존 화이트] <-> [natural-comfort: 눈 편한 내추럴 세이지 & 딥 포레스트 고대비]
 * - 0ms 무중단 전환, localStorage 자동 영속화
 */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mg_theme_mode") as any;
    if (saved) {
      setTheme(saved);
    }
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="text-xs font-bold px-2.5 py-1 rounded-xl bg-theme-card border border-theme-subtle txt-brand-ink shadow-2xs cursor-pointer outline-none hover:border-gray-300"
      >
        {THEME_PRESETS.map((p) => (
          <option key={p.id} value={p.id} className="bg-theme-card txt-brand-ink">
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * MiniThemeToggle: 헤더 내 서재/알림 옆에 자연스럽게 녹아드는 초소형(24px급) 순환 테마 토글 버튼
 */
export function MiniThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mg_theme_mode") as any;
    if (saved) {
      setTheme(saved);
    }
  }, [setTheme]);

  if (!mounted) return null;

  const currentPreset = THEME_PRESETS.find((p) => p.id === theme) || THEME_PRESETS[0];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-1.5 rounded-full transition-all active:scale-95 flex items-center justify-center outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
      title={`현재 테마: ${currentPreset.name} (클릭 시 다음 테마로 순환)`}
      aria-label="화면 스타일 테마 변경"
    >
      <Sparkle
        size={20}
        weight="fill"
        style={{ color: currentPreset.accentHex }}
        className="transition-colors"
      />
    </button>
  );
}

/**
 * FloatingThemeSwitcher: 화면 우측 상단 플로팅 토글러 (모바일 프레임 외부/내부 모두 대응)
 */
export function FloatingThemeSwitcher() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mg_theme_mode") as any;
    if (saved) {
      setTheme(saved);
    }
  }, [setTheme]);

  if (!mounted) return null;

  const currentPreset = THEME_PRESETS.find((p) => p.id === theme) || THEME_PRESETS[0];

  return (
    <aside aria-label="디자인 테마 전환" className="fixed top-3 right-3 z-50 flex items-center shadow-lg rounded-full backdrop-blur-md bg-white/80 p-0.5 border border-gray-200/80">
      <button
        type="button"
        onClick={toggleTheme}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer active:scale-95 bg-white border border-gray-200 text-gray-800 shadow-xs hover:bg-gray-50"
        title="원클릭 웰니스 테마 변경"
      >
        <Sparkle size={14} weight="fill" style={{ color: currentPreset.accentHex }} />
        <span>{currentPreset.name}</span>
      </button>
    </aside>
  );
}
