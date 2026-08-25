"use client";

import React from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { Sparkle, Shield } from "@phosphor-icons/react";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";

interface SosItem {
  id: string;
  ritualId: string;
  label: string;
  prescriptionTitle: string;
  prescriptionDesc: string;
}

const sosPrescriptionData: SosItem[] = [
  {
    id: "sos-1",
    ritualId: "RT-007",
    label: "급격한 감정적인 불안과 초조",
    prescriptionTitle: "복식호흡",
    prescriptionDesc: "아랫배 깊숙이 들이마시고 내쉬며 즉각 심박수를 낮추는 긴급 호흡법입니다.",
  },
  {
    id: "sos-2",
    ritualId: "RT-004",
    label: "머리가 복잡하고 잡념 제어 불가",
    prescriptionTitle: "걱정 일기",
    prescriptionDesc: "머릿속을 맴도는 막연한 불안과 미래 공포를 글로 적어 가두어내는 리추얼입니다.",
  },
  {
    id: "sos-3",
    ritualId: "RT-018",
    label: "가슴이 답답하고 분노/스트레스",
    prescriptionTitle: "스트레스 분쇄",
    prescriptionDesc: "나를 괴롭히는 감정을 종이에 솔직하게 적은 후, 파쇄기로 갈갈이 분쇄하는 리추얼입니다.",
  },
  {
    id: "sos-4",
    ritualId: "RT-001",
    label: "스스로를 비난하고 자책함",
    prescriptionTitle: "미소 명상",
    prescriptionDesc: "얼굴 근육의 긴장을 풀고 온화한 미소와 함께 스스로를 다정하게 다독이는 명상입니다.",
  },
];

/**
 * CommonSosDiagnosisSheet: 긴급 SOS 처방 모달 (공식 27개 우선순위 리추얼 100% 매핑 연동)
 */
export function CommonSosDiagnosisSheet() {
  const { closeModal, openModal } = useModalStore();

  const handleStartPrescription = (sosItem: SosItem) => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId={sosItem.ritualId}
          ritualTitle={sosItem.prescriptionTitle}
          ritualCategory="SOS 긴급처방"
          description={sosItem.prescriptionDesc}
        />
      ),
    });
  };

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto">
      {/* 1. 서브 헤더 */}
      <SubPageHeader
        title="긴급 SOS 처방"
        leftType="close"
        onLeftClick={closeModal}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto flex-1 justify-center my-auto">
        {/* 상황별 긴급 점검 (수직 정중앙 v-center 배치) */}
        <div className="flex flex-col justify-center my-auto flex-1 min-h-[460px] py-2">
          <div className="flex flex-col gap-4 text-left">
            {/* 상단 라벨 (Icon + SOS PRESCRIPTION 헤더 스타일) */}
            <div className="flex flex-col text-left pt-1 pb-1">
              <span className="txt-caption-main text-rose-600 uppercase font-semibold inline-flex items-center gap-1.5 mb-1.5">
                <Sparkle size={14} weight="bold" className="text-rose-500 shrink-0" />
                SOS PRESCRIPTION
              </span>

              <h1 className="text-[26px] font-black text-gray-900 leading-snug">
                지금 어떤 마음 <br />
                <span className="text-rose-600 block mt-1">상태이신가요?</span>
              </h1>

              <p className="text-xs text-gray-500 font-semibold mt-2.5 leading-relaxed">
                가장 가까운 상태를 하나 선택해 보세요. 1분간 안전하게 마음을 진정시켜 드립니다.
              </p>
            </div>

            {/* 중앙 수평 구분선 */}
            <div className="flex items-center gap-3 w-full pt-2 pb-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
              <span className="text-sm font-extrabold text-gray-700 shrink-0 text-center">
                SOS 1분 긴급 처방 선택
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
            </div>

            {/* 긴급 SOS 처방 선택 리스트 (2열 2행 큼직한 사각형 그리드 배치) */}
            <div className="grid grid-cols-2 gap-3.5 w-full pt-1">
              {sosPrescriptionData.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleStartPrescription(item)}
                  className="h-[140px] bg-[#F8FAFC] hover:bg-rose-50/70 p-4 rounded-3xl text-center transition-all flex flex-col items-center justify-center gap-2.5 shadow-2xs active:scale-[0.98] cursor-pointer border border-gray-100 hover:border-rose-300"
                >
                  <div className="w-9 h-9 rounded-2xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                    <Shield size={20} weight="bold" />
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 leading-snug break-keep text-center">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
