"use client";

import React from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { Sparkle, Shield } from "@phosphor-icons/react";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";

interface SosItem {
  id: string;
  label: string;
  prescriptionTitle: string;
  prescriptionDesc: string;
}

const sosPrescriptionData: SosItem[] = [
  {
    id: "sos-1",
    label: "급격한 감정적인 불안과 초조",
    prescriptionTitle: "횡경막 안심 호흡법",
    prescriptionDesc: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮추는 1분 리추얼입니다.",
  },
  {
    id: "sos-2",
    label: "머리가 복잡하고 집중 불가",
    prescriptionTitle: "333 나비포옹 테라피",
    prescriptionDesc: "양팔을 가슴 위에 교차해 번갈아 다독이며 복잡한 잡념을 즉시 끊어내는 1분 리추얼입니다.",
  },
  {
    id: "sos-3",
    label: "가슴이 갑갑하고 번아웃 느낌",
    prescriptionTitle: "미소 공간 비우기 명상",
    prescriptionDesc: "얼굴 근육의 긴장을 풀고 평온한 미소와 함께 갑갑했던 마음을 비워내는 1분 리추얼입니다.",
  },
  {
    id: "sos-4",
    label: "나도 모르게 스스로를 자책함",
    prescriptionTitle: "자기자비 쉼표 다독임",
    prescriptionDesc: "타인을 대하듯 나 자신에게 다정한 변호인이 되어 따뜻한 화해를 청하는 1분 리추얼입니다.",
  },
];

/**
 * CommonSosDiagnosisSheet: 긴급 SOS 처방 모달 (항목 클릭 시 샘플 공통 리추얼 모달로 바로 이동)
 */
export function CommonSosDiagnosisSheet() {
  const { closeModal, openModal } = useModalStore();

  const handleStartPrescription = (sosItem: SosItem) => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualTitle={sosItem.prescriptionTitle}
          ritualCategory="SOS 긴급처방"
          ritualTime="1분"
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
