import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, TextT, Palette, CaretLeft, CaretRight, SkipForward, SkipBack, BookmarkSimple } from "@phosphor-icons/react";
import { MagazineData } from "@/types/magazine";
import { fetchArticleContentText } from "@/services/magazineService";

interface MagazineCanvasReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  magazine: MagazineData | null;
  articleTitle: string;
  onProgressChange?: (progressPercent: number) => void;
}

export type PaperTheme = "warm" | "dark" | "mint";

export function MagazineCanvasReaderModal({
  isOpen,
  onClose,
  magazine,
  articleTitle,
  onProgressChange,
}: MagazineCanvasReaderModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isChangingRateRef = useRef<boolean>(false);
  const isSkippingRef = useRef<boolean>(false);
  const sentencePageMapRef = useRef<Map<number, number>>(new Map());

  const [contentText, setContentText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(17); // 15, 17, 20
  const [ttsRate, setTtsRate] = useState<number>(1.0); // 1.0, 2.0, 3.0, 0.5
  const [paperTheme, setPaperTheme] = useState<PaperTheme>("warm"); // warm, dark, mint

  // ★ 즐겨찾기 (Bookmark) 상태 ★
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // ★ 단일 상태 머신 ★
  const [playerStatus, setPlayerStatus] = useState<"IDLE" | "PLAYING" | "PAUSED">("IDLE");

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 1. 매거진 로드 및 즐겨찾기 상태 복원
  useEffect(() => {
    if (isOpen && magazine) {
      // 즐겨찾기 localStorage 확인
      try {
        const saved = localStorage.getItem("mindgym_bookmarked_articles") || "[]";
        const list = JSON.parse(saved);
        const key = `${magazine.id}_${articleTitle}`;
        setIsBookmarked(list.includes(key));
      } catch (e) {
        setIsBookmarked(false);
      }

      fetchArticleContentText(magazine.id, articleTitle).then((text) => {
        setContentText(text);
        const rawSentences = text
          .split(/(?<=[.!?])\s+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        setSentences(rawSentences);
        setCurrentSentenceIndex(-1);
        setPlayerStatus("IDLE");
        setCurrentPage(1);
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      });
    }
  }, [isOpen, magazine, articleTitle]);

  // 즐겨찾기 토글 함수
  const handleToggleBookmark = () => {
    if (!magazine) return;
    const key = `${magazine.id}_${articleTitle}`;
    try {
      const saved = localStorage.getItem("mindgym_bookmarked_articles") || "[]";
      let list: string[] = JSON.parse(saved);
      if (list.includes(key)) {
        list = list.filter((k) => k !== key);
        setIsBookmarked(false);
      } else {
        list.push(key);
        setIsBookmarked(true);
      }
      localStorage.setItem("mindgym_bookmarked_articles", JSON.stringify(list));
    } catch (e) {
      setIsBookmarked((prev) => !prev);
    }
  };

  // 2. 모달 닫힐 때 리셋
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setPlayerStatus("IDLE");
    }
  }, [isOpen]);

  // 3. HTML5 2D Canvas 본문 렌더링 Engine (종이 테마 & 폰트 크기 연동 & Auto Page Follow)
  const renderCanvasPage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !contentText) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retina High-DPI 대응
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // 종이 테마별 컬러 팔레트
    let bgColor = "#FDFBF7";
    let volColor = "#00C474";
    let titleColor = "#111827";
    let normalTextColor = "#4B5563";
    let targetTextColor = "#111827";
    let highlightBgColor = "rgba(0, 196, 116, 0.22)";

    if (paperTheme === "dark") {
      bgColor = "#1F2937";
      volColor = "#10B981";
      titleColor = "#F9FAFB";
      normalTextColor = "#9CA3AF";
      targetTextColor = "#FFFFFF";
      highlightBgColor = "rgba(16, 185, 129, 0.30)";
    } else if (paperTheme === "mint") {
      bgColor = "#EBF5ED";
      volColor = "#059669";
      titleColor = "#064E3B";
      normalTextColor = "#374151";
      targetTextColor = "#064E3B";
      highlightBgColor = "rgba(5, 150, 105, 0.22)";
    }

    // A. Canvas 배경 드로잉
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // 종이 결 미세 노이즈 패턴 드로잉 (warm/mint 일 때만)
    if (paperTheme !== "dark") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
      for (let i = 0; i < width; i += 24) {
        ctx.fillRect(i, 0, 1, height);
      }
    }

    // B. 상단 매거진 권호 & 아티클 제목 렌더링 (책갈피 아이콘 바로 옆 52px 오프셋 수평 정렬)
    const headerPaddingLeft = 52;
    const paddingX = 24;
    let currentY = 32;

    if (magazine) {
      const volNum = magazine.id.replace(/^vol-/i, "").padStart(2, "0");
      ctx.font = `bold 12px Pretendard, sans-serif`;
      ctx.fillStyle = volColor;
      ctx.fillText(`VOL.${volNum} · ${magazine.title}`, headerPaddingLeft, currentY);
      currentY += 24;
    }

    // C. 아티클 제목 드로잉 (책갈피 아이콘 수직 라인 52px 정렬)
    ctx.font = `bold 20px Pretendard, sans-serif`;
    ctx.fillStyle = titleColor;

    const titleWords = articleTitle.split(" ");
    let titleLine = "";
    const maxTitleWidth = width - headerPaddingLeft - paddingX;

    for (let i = 0; i < titleWords.length; i++) {
      const testLine = titleLine + titleWords[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && i > 0) {
        ctx.fillText(titleLine, headerPaddingLeft, currentY);
        titleLine = titleWords[i] + " ";
        currentY += 27;
      } else {
        titleLine = testLine;
      }
    }
    ctx.fillText(titleLine, headerPaddingLeft, currentY);
    currentY += 16;

    // 제목 하단 은은한 구분선 (52px 시작 오프셋 정렬)
    ctx.strokeStyle = paperTheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(headerPaddingLeft, currentY);
    ctx.lineTo(width - paddingX, currentY);
    ctx.stroke();

    currentY += 26;

    // D. 본문 문장 2-Pass 사전 측정 및 드로잉 Engine (페이지 계산과 드로잉 완전 분리!)
    const lineYStart = currentY;
    const availableHeight = height - lineYStart - 20; // 하단 여백
    const lineHeight = fontSize * 1.65;
    const maxTextWidth = width - paddingX * 2;

    interface LineItem {
      text: string;
      sentenceIndex: number;
      isHighlighted: boolean;
      y: number;
      page: number;
    }

    const calculatedLines: LineItem[] = [];
    let pageTracker = 1;
    let yTracker = lineYStart;
    let targetSentencePage = 1;
    const newPageMap = new Map<number, number>();

    // 1st Pass: 문장(단락) 단위 전체 텍스트 레이아웃 사전 측정 (단락 중간 잘림 방지 100% 보장!)
    sentences.forEach((sentence, sIdx) => {
      const isCurrentHighlighted = sIdx === currentSentenceIndex;
      const words = sentence.split(" ");
      const sentenceLines: string[] = [];
      let currentLine = "";

      ctx.font = `400 ${fontSize}px Pretendard, -apple-system, sans-serif`;

      // A. 해당 문장이 차지할 전체 줄(Line) 목록 사전 분할
      for (let wIdx = 0; wIdx < words.length; wIdx++) {
        const testLine = currentLine + words[wIdx] + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxTextWidth && wIdx > 0) {
          sentenceLines.push(currentLine.trim());
          currentLine = words[wIdx] + " ";
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine.trim().length > 0) {
        sentenceLines.push(currentLine.trim());
      }

      // B. 문장 전체 높이 계산 (줄 개수 × 줄높이 + 단락 간격)
      const sentenceTotalHeight = sentenceLines.length * lineHeight + 6;

      // ★ [단락 보존 페이징 규칙]: 문장 중간이 쪼개지지 않도록, 여백 초과 시 문장 전체를 100% 다음 페이지 첫 머리로 이송! ★
      if (yTracker + sentenceTotalHeight > height - 20 && calculatedLines.length > 0) {
        pageTracker++;
        yTracker = lineYStart;
      }

      newPageMap.set(sIdx, pageTracker);

      if (isCurrentHighlighted) {
        targetSentencePage = pageTracker;
      }

      // C. 계산된 Y 좌표로 문장 줄 등록
      sentenceLines.forEach((lineText) => {
        calculatedLines.push({
          text: lineText,
          sentenceIndex: sIdx,
          isHighlighted: isCurrentHighlighted,
          y: yTracker,
          page: pageTracker,
        });
        yTracker += lineHeight;
      });

      yTracker += 6; // 단락 간 미세 간격
    });

    sentencePageMapRef.current = newPageMap;
    setTotalPages(Math.max(1, pageTracker));

    // 2nd Pass: 현재 선택된 currentPage 에 해당하는 줄들만 캔버스에 100% 드로잉!
    const currentPageLines = calculatedLines.filter((item) => item.page === currentPage);

    currentPageLines.forEach((item) => {
      ctx.font = `400 ${fontSize}px Pretendard, -apple-system, sans-serif`;

      if (item.isHighlighted) {
        const textWidth = ctx.measureText(item.text).width;
        ctx.fillStyle = highlightBgColor;
        ctx.fillRect(paddingX - 2, item.y - fontSize + 3, textWidth + 4, fontSize + 3);
        ctx.fillStyle = targetTextColor;
      } else {
        ctx.fillStyle = normalTextColor;
      }

      ctx.fillText(item.text, paddingX, item.y);
    });

    // ★ Auto Page Follow: 낭독 중인 문장이 다음 페이지로 넘어가면 자동 시점 전환! ★
    if (currentSentenceIndex >= 0 && targetSentencePage !== currentPage && playerStatus === "PLAYING") {
      setCurrentPage(targetSentencePage);
    }
  }, [canvasRef, contentText, fontSize, paperTheme, sentences, currentSentenceIndex, currentPage, playerStatus, magazine, articleTitle]);

  useEffect(() => {
    if (isOpen) renderCanvasPage();
  }, [isOpen, renderCanvasPage]);

  useEffect(() => {
    const handleResize = () => renderCanvasPage();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvasPage]);

  // 4. 지정한 문장 인덱스부터 음성 낭독 시작
  const speakVoiceFromIndex = useCallback((targetIndex: number, overrideRate?: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis || sentences.length === 0) return;

    window.speechSynthesis.cancel();
    const startIndex = Math.max(0, Math.min(sentences.length - 1, targetIndex));
    const utterance = new SpeechSynthesisUtterance(sentences.slice(startIndex).join(" "));

    utterance.lang = "ko-KR";
    utterance.rate = overrideRate || ttsRate;

    let baseCharCount = 0;
    for (let i = 0; i < startIndex; i++) baseCharCount += sentences[i].length + 1;

    utterance.onboundary = (e) => {
      if (e.name === "sentence" || e.name === "word") {
        const charIdx = baseCharCount + e.charIndex;
        let acc = 0;
        for (let i = 0; i < sentences.length; i++) {
          acc += sentences[i].length + 1;
          if (charIdx < acc) {
            setCurrentSentenceIndex(i);
            break;
          }
        }
      }
    };

    utterance.onend = () => {
      if (isChangingRateRef.current) {
        isChangingRateRef.current = false;
        return;
      }
      if (isSkippingRef.current) {
        isSkippingRef.current = false;
        return;
      }
      setPlayerStatus("IDLE");
      setCurrentSentenceIndex(-1);
    };

    utterance.onerror = () => {
      if (isChangingRateRef.current) {
        isChangingRateRef.current = false;
        return;
      }
      if (isSkippingRef.current) {
        isSkippingRef.current = false;
        return;
      }
      setPlayerStatus("IDLE");
      setCurrentSentenceIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
    setCurrentSentenceIndex(startIndex);
    setPlayerStatus("PLAYING");
  }, [sentences, ttsRate]);

  // 5. [중앙 메인 버튼] Play / Pause 자동 독서 재생/일시정지
  const handleToggleAutoPlay = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (playerStatus === "PLAYING") {
      window.speechSynthesis.pause();
      setPlayerStatus("PAUSED");
    } else if (playerStatus === "PAUSED") {
      window.speechSynthesis.resume();
      setPlayerStatus("PLAYING");
    } else {
      const idx = currentSentenceIndex >= 0 ? currentSentenceIndex : 0;
      speakVoiceFromIndex(idx);
    }
  };

  // 6. [중앙 콤보 양옆] 이전 / 다음 단락 스킵 (0ms 스킵 & 자동 페이지 넘김 연동!)
  const handleSkipParagraph = (direction: "prev" | "next") => {
    if (sentences.length === 0) return;

    let targetIdx = 0;
    if (currentSentenceIndex < 0) {
      targetIdx = direction === "next" ? 0 : sentences.length - 1;
    } else {
      targetIdx = direction === "next"
        ? (currentSentenceIndex + 1) % sentences.length
        : (currentSentenceIndex - 1 + sentences.length) % sentences.length;
    }

    isSkippingRef.current = true;
    setCurrentSentenceIndex(targetIdx);

    // ★ 단락 스킵 시 해당 문장이 속한 페이지로 뷰포트 자동 전환! ★
    const targetPage = sentencePageMapRef.current.get(targetIdx);
    if (targetPage && targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      if (playerStatus === "PLAYING") {
        speakVoiceFromIndex(targetIdx);
      }
    }
  };

  // 7. 배속 조절 (1.0 -> 2.0 -> 3.0 -> 0.5) - 현재 문장부터 바뀐 속도로 즉시 연결!
  const handleCycleTtsRate = () => {
    let nextRate = 1.0;
    if (ttsRate === 1.0) nextRate = 2.0;
    else if (ttsRate === 2.0) nextRate = 3.0;
    else if (ttsRate === 3.0) nextRate = 0.5;
    else nextRate = 1.0;

    setTtsRate(nextRate);

    if (playerStatus === "PLAYING" && typeof window !== "undefined" && window.speechSynthesis) {
      isChangingRateRef.current = true;
      const resumeIndex = Math.max(0, currentSentenceIndex);
      speakVoiceFromIndex(resumeIndex, nextRate);
    }
  };

  // 8. [맨 우측] 배경 종이 테마 순환 (warm -> dark -> mint)
  const handleCyclePaperTheme = () => {
    if (paperTheme === "warm") setPaperTheme("dark");
    else if (paperTheme === "dark") setPaperTheme("mint");
    else setPaperTheme("warm");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[9999] flex justify-center pointer-events-none"
        >
          {/* 모바일 430px 앱 프레임 고정 래퍼 */}
          <div className="relative w-full max-w-[430px] h-full bg-[#FDFBF7] flex flex-col overflow-hidden text-gray-900 shadow-2xl pointer-events-auto select-none">
            {/* ★ 상단 좌측: 아티클 제목 영역 바로 좌측 플로팅 책갈피(Bookmark) 버튼 (미세 업 top-[1.125rem]) ★ */}
            <div className="absolute top-[1.125rem] left-[0.75rem] z-40">
              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                  isBookmarked
                    ? "text-amber-500 hover:text-amber-600 drop-shadow-xs"
                    : "text-gray-300 hover:text-gray-400"
                }`}
                title={isBookmarked ? "책갈피 해제" : "책갈피 추가 (즐겨찾기)"}
              >
                <BookmarkSimple size={28} weight="fill" />
              </button>
            </div>

            {/* ★ 상단 우측: ✕ (닫기) 버튼 ★ */}
            <div className="absolute top-[0.875rem] right-[0.875rem] z-40">
              <button
                type="button"
                onClick={onClose}
                className="w-[2.25rem] h-[2.25rem] rounded-full text-gray-600 hover:text-gray-900 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                title="매거진 뷰어 닫기"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* ★ HTML5 2D Canvas 영역 (하단 컨트롤 바 높이 3.75rem 뺀 전체 핏) ★ */}
            <div className="absolute top-0 left-0 right-0 bottom-[3.75rem] w-full overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* ★ 상단 실시간 읽기 진행률 프로그레스 바 (Canvas와 컨트롤 바 사이에 정밀 밀착) ★ */}
            <div className="absolute bottom-[3.75rem] left-0 right-0 h-[0.25rem] bg-gray-200/80 z-40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-[#00C474] transition-all duration-300 rounded-r-full shadow-2xs"
                style={{
                  width: `${
                    playerStatus === "PLAYING" && sentences.length > 0
                      ? Math.min(100, Math.round(((currentSentenceIndex + 1) / sentences.length) * 100))
                      : Math.min(100, Math.round((currentPage / totalPages) * 100))
                  }%`,
                }}
              />
            </div>

            {/* ★ 하단 고정 플로팅 컨트롤 바 (Play & 화살표 콤보 정중앙 absolute left-1/2 -translate-x-1/2 정렬) ★ */}
            <div className="absolute bottom-0 left-0 right-0 h-[3.75rem] bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-[0.75rem] flex items-center justify-between z-40 shadow-lg select-none">
              {/* [맨 좌측 뷰어 옵션 그룹]: 속도 칩 + 글자 크기(A) + 배경 컬러 테마(🎨) - 컴팩트 34px (w-[2.125rem] h-[2.125rem]) */}
              <div className="flex items-center gap-[0.25rem] shrink-0">
                {/* 1. 속도 칩 */}
                <button
                  type="button"
                  onClick={handleCycleTtsRate}
                  className="w-[2.125rem] h-[2.125rem] rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[0.6875rem] font-extrabold tracking-tighter flex items-center justify-center transition-all cursor-pointer shrink-0 tabular-nums active:scale-90"
                  title="낭독/독서 속도 변경 (1.0 -> 2.0 -> 3.0 -> 0.5)"
                >
                  {ttsRate.toFixed(1)}
                </button>

                {/* 2. 글자 크기 버튼 */}
                <button
                  type="button"
                  onClick={() => {
                    if (fontSize === 15) setFontSize(17);
                    else if (fontSize === 17) setFontSize(20);
                    else setFontSize(15);
                  }}
                  className="w-[2.125rem] h-[2.125rem] rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90"
                  title="글자 크기 변경 (15px -> 17px -> 20px)"
                >
                  <TextT size={15} weight="bold" />
                </button>

                {/* 3. 배경 종이 컬러 테마 버튼 */}
                <button
                  type="button"
                  onClick={handleCyclePaperTheme}
                  className={`w-[2.125rem] h-[2.125rem] rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90 ${
                    paperTheme === "warm"
                      ? "bg-amber-100 text-amber-800"
                      : paperTheme === "dark"
                      ? "bg-gray-800 text-gray-100"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                  title={`배경 종이 테마 변경 (현재: ${paperTheme.toUpperCase()})`}
                >
                  <Palette size={15} weight="bold" />
                </button>
              </div>

              {/* ★ [정중앙 콤보 그룹]: 이전 단락 ◀ | Play ▶ / ❚❚ | 다음 단락 ▶ (언제든지 클릭 자유) ★ */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[0.375rem] shrink-0 z-10">
                <button
                  type="button"
                  onClick={() => handleSkipParagraph("prev")}
                  className="w-[2.125rem] h-[2.125rem] rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title="이전 단락 스킵"
                >
                  <CaretLeft size={16} weight="fill" />
                </button>

                <button
                  type="button"
                  onClick={handleToggleAutoPlay}
                  className={`w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90 shadow-sm ${
                    playerStatus === "PLAYING"
                      ? "bg-[#00C474] text-white shadow-emerald-500/20"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                  title={playerStatus === "PLAYING" ? "일시정지" : "자동 독서 시작 (Play)"}
                >
                  {playerStatus === "PLAYING" ? (
                    <Pause size={18} weight="fill" />
                  ) : (
                    <Play size={18} weight="fill" className="ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSkipParagraph("next")}
                  className="w-[2.125rem] h-[2.125rem] rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title="다음 단락 스킵"
                >
                  <CaretRight size={16} weight="fill" />
                </button>
              </div>

              {/* [맨 우측 그룹]: 페이지 인디케이터 & 수동 넘김 네비게이터 */}
              <div className="flex items-center gap-[0.25rem] shrink-0">
                <div className="flex items-center gap-[0.125rem] text-[0.6875rem] font-bold text-gray-600 tabular-nums bg-gray-100/90 rounded-full px-[0.375rem] py-[0.25rem]">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-[0.125rem] rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <CaretLeft size={13} weight="bold" />
                  </button>
                  <span>
                    {currentPage}/{totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-[0.125rem] rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <CaretRight size={13} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
