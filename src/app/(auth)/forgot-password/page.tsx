"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Envelope, CheckCircle, ShieldCheck, PaperPlaneTilt } from "@phosphor-icons/react";
import { MagicButton } from "@/components/godui/MagicButton";
import { AuroraText } from "@/components/godui/AuroraText";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("minjun.kim@company.co.kr");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white min-h-screen">
      {/* 상단 브랜딩 헤더 */}
      <div className="flex items-center justify-between pt-2">
        <BrandLogo size="md" />
        <span className="txt-micro-main txt-brand-green bg-brand-mint-light px-2.5 py-1 rounded-full font-semibold">
          비밀번호 재설정
        </span>
      </div>

      {/* 중앙 수직 정렬 메인 영역 */}
      <div className="flex flex-col gap-6 my-auto py-6">
        {!isSubmitted ? (
          <div className="flex flex-col gap-6">
            <div>
              <span className="txt-caption-main txt-brand-green uppercase tracking-wider font-semibold">
                PASSWORD RECOVERY
              </span>
              <h1 className="txt-title-main txt-brand-ink leading-snug mt-1">
                비밀번호를 <AuroraText>잊으셨나요?</AuroraText>
              </h1>
              <p className="txt-body-main txt-brand-clay mt-1.5 leading-relaxed">
                가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="txt-caption-main txt-brand-clay font-medium mb-1.5 flex items-center justify-between">
                  <span>이메일 주소</span>
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

              {/* 발송하기 버튼 및 하단 ghost 돌아가기 버튼 */}
              <div className="pt-2 flex flex-col gap-2">
                <MagicButton type="submit" className="w-full" rightIcon={<PaperPlaneTilt size={18} />}>
                  <span>재설정 이메일 발송하기</span>
                </MagicButton>

                <MagicButton
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 font-medium"
                >
                  <span>로그인으로 돌아가기</span>
                </MagicButton>
              </div>
            </form>
          </div>
        ) : (
          /* 발송 완료 성공 화면 */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-4 py-4 px-2"
          >
            <div className="w-20 h-20 bg-brand-mint-light text-[#00C474] rounded-full flex items-center justify-center shadow-soft mb-2">
              <CheckCircle size={48} weight="fill" />
            </div>

            <div>
              <span className="txt-micro-main txt-brand-green bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full font-bold">
                발송 완료
              </span>
              <h2 className="txt-title-main txt-brand-ink mt-3">
                재설정 이메일이 발송되었습니다
              </h2>
              <p className="txt-body-main txt-brand-clay mt-2 leading-relaxed max-w-xs">
                <strong className="txt-brand-ink">{email}</strong>(으)로 비밀번호 재설정 링크를 보냈습니다.
              </p>
            </div>

            <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-2 text-left txt-caption-main text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">💡 이메일이 오지 않았나요?</p>
              <p>• 사내 스팸 메일함 또는 메일 서버 필터링을 확인해 보세요.</p>
              <p>• 법인 보안 정책에 따라 발송에 1~2분이 소요될 수 있습니다.</p>
            </div>

            <button
              onClick={() => router.push("/login")}
              className="w-full py-3.5 bg-gray-900 text-white rounded-2xl font-semibold text-sm mt-4 hover:bg-black transition-colors"
            >
              로그인 화면으로 돌아가기
            </button>
          </motion.div>
        )}
      </div>

      {/* 하단 보안 안내 */}
      <div className="flex items-center justify-center gap-1.5 text-gray-400 txt-caption-main pt-6 border-t border-gray-100 mt-2">
        <ShieldCheck size={16} className="text-[#00C474]" />
        <span>개인 진단 결과 100% 익명 처리 및 개인정보 안전 보호</span>
      </div>
    </div>
  );
}
