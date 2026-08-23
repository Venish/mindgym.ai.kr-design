"use client";

import React, { useState } from "react";

export function RenewalComparisonSection() {
  const [selectedChip, setSelectedChip] = useState<string>("솔직하게");

  return (
    <section id="renewal-comparison" className="scroll-mt-24 space-y-12">
      {/* 1. Section Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            PROPOSAL 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">Awesome Design Skills Applied</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-2 flex items-center gap-2">
          ✨ MindGym UI/UX 리뉴얼 제안 (AS-IS vs TO-BE 비교 실시간 샘플)
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          기존 OKLCH 무테 웰니스 시스템(AS-IS) 대비, 신규 스킬셋(Bento, Claymorphism, Glassmorphism/Pulse, Paper/Doodle, Spacious)을 적용한 실제 비주얼 샘플을 수평 대조하여 직접 체험해보실 수 있습니다.
        </p>
      </div>

      {/* SAMPLE 1. Bento Grid 대시보드 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">SAMPLE 1</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">1. 메인 대시보드 레이아웃 (`bento` 스킬 적용)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (수직 단순 카드) vs TO-BE (Bento Grid 12컬럼 셀)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="space-y-3 p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200">
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 AS-IS (기존 수직 스택)</span>
            <div className="space-y-3 mt-2">
              <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-2xs">
                <span className="text-xs font-semibold text-emerald-600">이달의 나</span>
                <h4 className="text-base font-bold text-gray-900 mt-0.5">김민우님 · 14일째 함께하는 중</h4>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-2xs">
                <h5 className="font-bold text-gray-800 text-sm">덤벨 성장 정원</h5>
                <p className="text-xs text-gray-500">Lv.3 자라나는 싹 · 140/200 EXP</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-2xs">
                <h5 className="font-bold text-gray-800 text-sm">오늘의 추천 리추얼</h5>
                <p className="text-xs text-gray-500">333 나비포옹 외 2개</p>
              </div>
            </div>
          </div>

          {/* TO-BE */}
          <div className="p-5 bg-slate-100/80 rounded-2xl border border-emerald-300/40 space-y-3">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">🟢 TO-BE (`bento` Grid 셀)</span>
            
            {/* Bento Grid layout */}
            <div className="grid grid-cols-12 gap-3 mt-2">
              {/* 셀 1: Hero Main (span 8) */}
              <div className="col-span-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-semibold">☀️ AM 이달의 나</span>
                  <h4 className="text-base font-bold mt-1.5 leading-snug">조마조마하지 않게, 차분한 하루</h4>
                </div>
                <p className="text-xs opacity-90 mt-3">14일 연속 리추얼 달성 중 🏋️</p>
              </div>

              {/* 셀 2: 덤벨 정원 (span 4) */}
              <div className="col-span-4 bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center shadow-2xs">
                <div className="text-2xl">🪴</div>
                <span className="text-xs font-bold text-gray-900 mt-1">Lv.3 싹</span>
                <span className="text-[10px] font-bold text-emerald-600 mt-0.5">140/200</span>
              </div>

              {/* 셀 3: 추천 리추얼 3종 (span 12) */}
              <div className="col-span-12 bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <h5 className="text-xs font-bold text-gray-900 mb-2">✨ 오늘의 추천 맞춤 리추얼</h5>
                <div className="grid grid-cols-3 gap-2">
                  {["333 나비포옹", "인지재구성", "기분전환산책"].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-2 rounded-lg text-center text-[11px] font-semibold text-slate-700">
                      {idx + 1}. {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE 2. Soft 3D Claymorphism 감정 칩 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">SAMPLE 2</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">2. 데일리 감정 칩 인터랙션 (`claymorphism` 스킬 적용)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (평면 2D 칩) vs TO-BE (3D Soft 클레이 터치)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-3">
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 AS-IS (평면 2D 칩)</span>
            <p className="text-xs text-gray-500">클릭해도 시각적 깊이감 및 햅틱 피드백이 밋밋함</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["나답게", "솔직하게", "차분하게", "가볍게", "씩씩하게"].map((chip) => (
                <button
                  key={chip}
                  className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* TO-BE */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-emerald-300/40 space-y-3">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">🟢 TO-BE (`claymorphism` 3D 엠보싱)</span>
            <p className="text-xs text-emerald-700 font-medium">직접 아래 칩을 눌러 말랑말랑한 3D 터치감을 느껴보세요!</p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {["나답게", "솔직하게", "차분하게", "가볍게", "씩씩하게"].map((chip) => {
                const isSelected = selectedChip === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => setSelectedChip(chip)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "24px",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: isSelected ? "#FFFFFF" : "#1E293B",
                      background: isSelected
                        ? "linear-gradient(145deg, #10B981, #059669)"
                        : "linear-gradient(145deg, #FFFFFF, #F1F5F9)",
                      boxShadow: isSelected
                        ? "inset 2px 2px 4px rgba(255,255,255,0.4), inset -2px -2px 4px rgba(0,0,0,0.2), 0 6px 15px rgba(16,185,129,0.35)"
                        : "inset 2px 2px 5px #FFFFFF, inset -2px -2px 5px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.05)",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      transform: isSelected ? "scale(0.95)" : "scale(1)",
                    }}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE 3. Glassmorphism + Pulse 오로라 명상 플레이어 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">SAMPLE 3</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">3. 명상/호흡 리추얼 캔버스 (`glassmorphism` + `pulse`)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (단색 정적) vs TO-BE (5초 오로라 숨 모션 + 글래스)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between h-[280px]">
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded w-fit">🔴 AS-IS (정적 파스텔 단색)</span>
            <div className="bg-white p-6 rounded-2xl shadow-2xs text-center border border-gray-100 max-w-xs mx-auto w-full">
              <span className="text-[11px] text-emerald-600 font-bold">1분 · 시각화 명상</span>
              <h4 className="text-lg font-bold text-gray-900 mt-1">미소 명상</h4>
              <button className="mt-4 px-5 py-2 bg-emerald-500 text-white text-xs font-bold rounded-full">
                명상 시작
              </button>
            </div>
            <span className="text-[11px] text-gray-400 text-center">시각적 호흡 연출 없이 고정 화면</span>
          </div>

          {/* TO-BE */}
          <div className="relative h-[280px] w-full rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950 p-4">
            {/* 1. Aurora Pulse Animation Circle */}
            <div
              className="absolute w-56 h-56 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.6) 0%, rgba(99,102,241,0.4) 60%, transparent 100%)",
                filter: "blur(32px)",
                animation: "auroraPulseDemo 5s infinite ease-in-out",
              }}
            />
            <style>{`
              @keyframes auroraPulseDemo {
                0% { transform: scale(0.85); opacity: 0.6; }
                50% { transform: scale(1.3); opacity: 1; }
                100% { transform: scale(0.85); opacity: 0.6; }
              }
            `}</style>

            {/* 2. Glassmorphism Card */}
            <div
              className="relative z-10 p-5 rounded-2xl text-center text-white max-w-xs w-full shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">🟢 TO-BE (`pulse` + `glass`)</span>
              <h4 className="text-xl font-bold mt-2">미소 명상</h4>
              <p className="text-xs opacity-90 mt-1">들숨에 미소를, 날숨에 긴장을 내려놓습니다.</p>
              <button className="mt-4 px-6 py-2.5 bg-white text-slate-900 text-xs font-bold rounded-full shadow-md">
                명상 시작 ▷
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE 4. Paper Texture & Doodle 저널링 일기 뷰 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">SAMPLE 4</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">4. 저널링 일기 작성 뷰 (`paper` + `doodle` 스킬 적용)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (흰색 인풋 폼) vs TO-BE (아날로그 종이 텍스처)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-3">
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 AS-IS (일반 웹 Textarea)</span>
            <textarea
              className="w-full h-32 p-3 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white"
              placeholder="오늘 나에게 하고 싶은 말을 써보세요..."
              readOnly
              value="오늘은 일상에서 조금 지쳤지만, 내 편이 되어서 스스로를 토닥여본다."
            />
          </div>

          {/* TO-BE */}
          <div
            className="p-5 rounded-2xl border border-amber-200/80 space-y-2 relative"
            style={{ background: "#FFFDF8", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}
          >
            <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">🟢 TO-BE (`paper` 아날로그 종이)</span>
            <div className="absolute top-4 right-5 text-lg">📌</div>
            <h4 className="text-sm font-bold text-amber-950 pt-1">📔 오늘의 내편 일기</h4>
            <textarea
              className="w-full h-32 text-xs text-amber-950 bg-transparent border-none outline-none resize-none"
              style={{
                lineHeight: "1.8rem",
                backgroundImage: "linear-gradient(transparent 94%, #E8E1D5 94%)",
                backgroundSize: "100% 1.8rem",
              }}
              readOnly
              value="오늘은 일상에서 조금 지쳤지만, 내 편이 되어서 스스로를 토닥여본다. 유난스러울 정도로 내 감정을 응원해줘야지!"
            />
          </div>
        </div>
      </div>

      {/* SAMPLE 5. Spacious KOSS 스트레스 진단 카드 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">SAMPLE 5</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">5. KOSS 진단 문항 카드 (`spacious` + `clean` 스킬 적용)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (타이트한 문항) vs TO-BE (넉넉한 에어리 여백)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="p-4 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-2">
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 AS-IS (촘촘한 리스트)</span>
            <div className="p-3 bg-white border border-gray-200 rounded-lg text-xs">
              <p className="font-semibold text-gray-800">Q1. 나는 업무 중에 근골격계 부담을 받는 작업을 한다.</p>
              <div className="flex gap-1 mt-2 text-[10px]">
                <button className="flex-1 p-1 bg-gray-50 border rounded">전혀아님</button>
                <button className="flex-1 p-1 bg-gray-50 border rounded">아님</button>
                <button className="flex-1 p-1 bg-gray-50 border rounded">그렇다</button>
                <button className="flex-1 p-1 bg-gray-50 border rounded">매우그렇다</button>
              </div>
            </div>
          </div>

          {/* TO-BE */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">🟢 TO-BE (`spacious` 넉넉한 에어리)</span>
            <div>
              <span className="text-[11px] font-bold text-emerald-600">Q1. 물리환경 영역</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                나는 업무 중에 근골격계에 부담을 주는 작업(반복 동작, 중량물 취급 등)을 한다.
              </h4>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {["전혀 그렇지 않다", "그렇지 않다", "그렇다", "매우 그렇다"].map((label, idx) => (
                <button
                  key={idx}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE 6. Dumbbell Icon Reward Interaction */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">NEW SAMPLE 6</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">6. 덤벨 보상 아이콘 인터랙션 (`claymorphism` + `pulse` + `expressive` 스킬 적용)</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">AS-IS (2D 평면 아이콘) vs TO-BE (3D Soft 클레이 + 햅틱 팅글 바운스)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AS-IS */}
          <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">🔴 AS-IS (평면 2D 텍스트/아이콘)</span>
              <p className="text-xs text-gray-500 mt-1">클릭이나 획득 시 동적 피드백이나 보상 감흥이 낮음</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏋️</span>
                <div>
                  <span className="text-xs font-bold text-gray-800">333 나비포옹 완료</span>
                  <p className="text-[11px] text-gray-400">+3 덤벨 획득</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                받기
              </button>
            </div>
          </div>

          {/* TO-BE */}
          <DumbbellToBeSample />
        </div>
      </div>
    </section>
  );
}

// 덤벨 TO-BE 전용 클릭 인터랙티브 샘플 컴포넌트
function DumbbellToBeSample() {
  const [dumbbells, setDumbbells] = useState(140);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showFloatText, setShowFloatText] = useState(false);

  const handleClaim = () => {
    setIsBouncing(true);
    setShowFloatText(true);
    setDumbbells((prev) => prev + 3);
    setTimeout(() => setIsBouncing(false), 500);
    setTimeout(() => setShowFloatText(false), 1200);
  };

  return (
    <div className="p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 rounded-2xl border border-emerald-300/50 space-y-3 relative overflow-hidden">
      <div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded">🟢 TO-BE (`claymorphism` 3D + `pulse` 바운스)</span>
        <p className="text-xs text-emerald-800 font-medium mt-1">아래 [덤벨 획득 🏋️] 버튼을 직접 눌러 3D 덤벨의 팅글 피드백을 체험해보세요!</p>
      </div>

      {/* Floating Reward Animation */}
      {showFloatText && (
        <div
          className="absolute left-1/2 top-4 -translate-x-1/2 text-xs font-black text-amber-500 bg-amber-100/90 px-3 py-1 rounded-full shadow-lg pointer-events-none"
          style={{
            animation: "floatUpReward 1s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
          }}
        >
          ✨ +3 덤벨 EXP 획득! 🏋️
        </div>
      )}
      <style>{`
        @keyframes floatUpReward {
          0% { opacity: 0; transform: translate(-50%, 15px) scale(0.7); }
          50% { opacity: 1; transform: translate(-50%, -10px) scale(1.1); }
          100% { opacity: 0; transform: translate(-50%, -30px) scale(0.9); }
        }
        @keyframes dumbbellBounce {
          0% { transform: scale(1) rotate(0deg); }
          30% { transform: scale(1.28) rotate(-12deg); }
          60% { transform: scale(0.92) rotate(8deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 3D Claymorphism Dumbbell Badge */}
          <div
            onClick={handleClaim}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "linear-gradient(145deg, #10B981, #047857)",
              boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.3), 0 6px 14px rgba(16,185,129,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              cursor: "pointer",
              userSelect: "none",
              animation: isBouncing ? "dumbbellBounce 0.5s ease-in-out" : "none",
            }}
          >
            🏋️
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">333 나비포옹 완료</span>
            <span className="text-[11px] font-extrabold text-emerald-600">누적: {dumbbells} EXP 덤벨</span>
          </div>
        </div>

        <button
          onClick={handleClaim}
          style={{
            padding: "8px 16px",
            borderRadius: "18px",
            border: "none",
            fontSize: "12px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: "linear-gradient(145deg, #059669, #047857)",
            boxShadow: "inset 1px 1px 3px rgba(255,255,255,0.3), 0 4px 10px rgba(5,150,105,0.3)",
            cursor: "pointer",
            transition: "transform 0.15s ease",
          }}
          className="active:scale-95"
        >
          덤벨 획득 ✨
        </button>
      </div>
    </div>
  );
}
