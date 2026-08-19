"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface NicknameSetupViewProps {
  nickname: string;
  onChangeNickname: (val: string) => void;
  onSubmit: () => void;
}

export function NicknameSetupView({
  nickname,
  onChangeNickname,
  onSubmit,
}: NicknameSetupViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-8 pb-4 gap-6 text-left"
    >
      <div className="flex flex-col gap-6 pt-10">
        <div>
          <span className="txt-caption-main txt-brand-green uppercase tracking-wider font-semibold">
            PROFILE SETUP
          </span>
          <h1 className="text-[28px] font-black txt-brand-ink leading-snug mt-1">
            어떻게 <AuroraText>불러드릴까요?</AuroraText>
          </h1>
          <p className="txt-body-main txt-brand-clay mt-2 leading-relaxed">
            <strong className="font-extrabold text-gray-900">마인드짐</strong>에서 사용할 닉네임을 설정해 주세요. <br />
            동료들에게는 설정하신 닉네임만 표시돼요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="txt-caption-main txt-brand-clay font-medium flex items-center justify-between">
            <span>닉네임</span>
            <span className="txt-micro-main text-gray-400">최대 10자</span>
          </label>
          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3.5 focus-within:border-[var(--color-brand-green)] focus-within:ring-2 focus-within:ring-[#00C474]/20 transition-all duration-200">
            <input
              type="text"
              value={nickname}
              onChange={(e) => onChangeNickname(e.target.value)}
              placeholder="예: 민준 님, 마음지기"
              maxLength={10}
              className="w-full bg-transparent text-sm txt-brand-ink outline-none font-semibold"
              required
            />
          </div>
        </div>
      </div>

      <MagicButton
        onClick={onSubmit}
        disabled={!nickname.trim()}
        className="w-full"
        rightIcon={<AnimatedArrowRightIcon size={18} />}
      >
        <span>이 닉네임으로 시작하기</span>
      </MagicButton>
    </motion.div>
  );
}
