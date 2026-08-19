"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Envelope, Lock, Eye, EyeSlash, ShieldCheck } from "@phosphor-icons/react";
import { MagicButton } from "@/components/godui/MagicButton";
import { AuroraText } from "@/components/godui/AuroraText";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("minjun.kim@company.co.kr");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding?mode=ceo");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white min-h-screen">
      {/* 상단 브랜드 로고 헤더 */}
      <div className="flex items-center justify-between pt-2">
        <BrandLogo size="md" />
        <span className="txt-micro-main txt-brand-green bg-brand-mint-light px-2.5 py-1 rounded-full font-semibold">
          B2B 임직원 전용
        </span>
      </div>

      {/* 중앙 수직 정렬 메인 폼 영역 */}
      <div className="flex flex-col gap-6 my-auto py-6">
        <div>
          <span className="txt-caption-main txt-brand-green uppercase tracking-wider font-semibold">
            CORPORATE WELLNESS
          </span>
          <h1 className="txt-title-main txt-brand-ink leading-snug mt-1">
            <AuroraText>마인드짐</AuroraText>에 입장하세요
          </h1>
          <p className="txt-body-main txt-brand-clay mt-1.5 leading-relaxed">
            기업 계정으로 로그인해 주세요.
          </p>
        </div>

        {/* 단일 로그인 폼 영역 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* 기업 이메일 입력 */}
          <div>
            <label className="txt-caption-main txt-brand-clay font-medium mb-1.5 flex items-center justify-between">
              <span>이메일</span>
              <span className="txt-micro-main text-gray-400">@company.co.kr</span>
            </label>
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3.5 focus-within:border-[var(--color-brand-green)] focus-within:ring-2 focus-within:ring-[#00C474]/20 transition-all duration-200">
              <Envelope size={18} className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="minjun.kim@company.co.kr"
                className="w-full bg-transparent text-sm txt-brand-ink outline-none"
                required
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="txt-caption-main txt-brand-clay font-medium block">
                비밀번호
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="txt-micro-main txt-brand-green font-semibold hover:underline active:scale-[0.96] transition-transform"
              >
                비밀번호 찾기
              </button>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3.5 focus-within:border-[var(--color-brand-green)] focus-within:ring-2 focus-within:ring-[#00C474]/20 transition-all duration-200">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full bg-transparent text-sm txt-brand-ink outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 active:scale-[0.96] transition-transform"
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="pt-4">
            <MagicButton type="submit" className="w-full">
              <span>로그인</span>
            </MagicButton>
          </div>
        </form>
      </div>

      {/* 하단 세큐리티 안내 */}
      <div className="flex items-center justify-center gap-1.5 text-gray-400 txt-caption-main pt-6 border-t border-gray-100 mt-6">
        <ShieldCheck size={16} className="text-[#00C474]" />
        <span>개인 진단 결과 100% 익명 처리 및 개인정보 안전 보호</span>
      </div>
    </div>
  );
}
