import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, TextT, Palette, CaretLeft, CaretRight, SkipForward, SkipBack, BookmarkSimple } from "@phosphor-icons/react";
import { MagazineData } from "@/types/magazine";
import { getArticleTextContent } from "@/services/magazineService";

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
  const isCancelingRef = useRef<boolean>(false);
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

      const matchedArt = magazine.articles?.find((a) => a.title === articleTitle);
      const sectionName = matchedArt ? matchedArt.section : undefined;

      getArticleTextContent(magazine.id, articleTitle, sectionName).then((rawText) => {
        // ★ by. 저자 표기 라인 추출 ★
        const authorMatch = rawText.match(/\bby\.\s*[^\n]+/i);
        const authorLine = authorMatch ? authorMatch[0].trim() : "";

        // ★ 1. === 및 --- 연속 구분선 & 상단 중복 헤더 문구 100% 소거 정제 ★
        let cleanedText = rawText
          .replace(/={3,}/g, "")
          .replace(/-{3,}/g, "")
          .replace(/\bby\.\s*[^\n]+/gi, "") // 상단 by. 라인 제거
          .replace(/\[?주제\s*칼럼[^\]\n]*\]?/gi, "")
          .replace(/한\s*가지\s*주제를\s*둘러싼\s*다채로운\s*칼럼\s*모음입니다\.?/gi, "")
          .replace(/이달의\s*주제\s*:[^\n]+/gi, "")
          .replace(/\n{3,}/g, "\n\n")
          .trim();

        // ★ by 저자 표기를 글 맨 마지막 하단에 배치 ★
        if (authorLine) {
          cleanedText = cleanedText + "\n\n" + authorLine;
        }

        setContentText(cleanedText);

        // 2. 원문의 개행(\n)을 보존하여 줄바꿈 및 단락 분할
        // 'by.' 마침표가 문장 구분자로 오인되어 줄바꿈되는 현상 방지 예외 처리
        const safeText = cleanedText.replace(/\bby\./gi, "by__DOT__");
        const paragraphs = safeText.split(/\n/);
        const parsedSentences: string[] = [];

        paragraphs.forEach((p) => {
          const trimmedP = p.trim();
          if (trimmedP.length === 0) {
            parsedSentences.push(""); // 개행 여백 보존용 빈 줄
          } else {
            const subSentences = trimmedP
              .split(/(?<=[.!?])\s+/)
              .map((s) => s.replace(/by__DOT__/g, "by.").trim())
              .filter((s) => s.length > 0);
            if (subSentences.length > 0) {
              parsedSentences.push(...subSentences);
            } else {
              parsedSentences.push(trimmedP.replace(/by__DOT__/g, "by."));
            }
          }
        });

        setSentences(parsedSentences);
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

    // B. 상단 매거진 권호 & 아티클 제목 Y좌표 사전 측정 (1페이지 원본 표준 기준)
    const headerPaddingLeft = 52;
    const paddingX = 24;
    let titleYTracker = 32;

    if (magazine) {
      titleYTracker += 24;
    }

    // 1페이지 원본 20px 대형 아티클 제목 줄 수 및 Y좌표 계산
    ctx.font = `bold 20px Pretendard, sans-serif`;
    const titleWords = articleTitle.split(" ");
    let titleLine = "";
    const maxTitleWidth = width - headerPaddingLeft - paddingX - 10;

    for (let i = 0; i < titleWords.length; i++) {
      const testLine = titleLine + titleWords[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && i > 0) {
        titleLine = titleWords[i] + " ";
        titleYTracker += 27;
      } else {
        titleLine = testLine;
      }
    }
    titleYTracker += 72; // 상단 헤더와 아래 본문 내용 사이 시원하게 넓힌 여유 수직 간격 (72px)

    // ★ 모든 페이지(1페이지, 2페이지...) 본문 시작 Y좌표를 1페이지 원본 타이틀 하단으로 100% 통일 ★
    const firstPageYStart = titleYTracker;
    const subsequentPageYStart = titleYTracker;       
    const lineHeight = fontSize * 1.65;    // 기본 줄간격 (1.65배)
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
    let yTracker = firstPageYStart;
    let targetSentencePage = 1;
    const newPageMap = new Map<number, number>();

    // 1st Pass: 문장(단락) 단위 전체 텍스트 레이아웃 사전 측정
    sentences.forEach((sentence, sIdx) => {
      // 모든 문장 인덱스를 100% 페이지 지도(Map)에 등록
      newPageMap.set(sIdx, pageTracker);

      // 빈 개행 줄인 경우 줄바꿈 여백만 yTracker에 추가 후 다음 문장으로!
      if (sentence === "") {
        yTracker += lineHeight * 0.7;
        return;
      }

      const isCurrentHighlighted = sIdx === currentSentenceIndex;
      const words = sentence.split(" ");
      const sentenceLines: string[] = [];
      let currentLine = "";

      ctx.font = `400 ${fontSize}px Pretendard, -apple-system, sans-serif`;

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

      const sentenceTotalHeight = sentenceLines.length * lineHeight + 6;

      // 페이지 전환 시 동일한 titleYTracker 유지
      if (yTracker + sentenceTotalHeight > height - 16 && calculatedLines.length > 0) {
        pageTracker++;
        yTracker = subsequentPageYStart;
      }

      if (isCurrentHighlighted) {
        targetSentencePage = pageTracker;
      }

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

      yTracker += 6;
    });

    sentencePageMapRef.current = newPageMap;
    const computedPages = Math.max(1, pageTracker);
    setTotalPages((prev) => (prev !== computedPages ? computedPages : prev));
    setCurrentPage((prev) => Math.min(prev, computedPages));

    // ★ 2nd Pass: 모든 페이지(1페이지, 2페이지...)에서 1페이지 원본의 아름다운 커버 헤더 100% 렌더링 ★
    let renderY = 32;
    if (magazine) {
      const volNum = magazine.id.replace(/^vol-/i, "").padStart(2, "0");
      ctx.font = `bold 12px Pretendard, sans-serif`;
      ctx.fillStyle = volColor;
      ctx.fillText(`VOL.${volNum} · ${magazine.title}`, headerPaddingLeft, renderY);
      renderY += 24;
    }

    ctx.font = `bold 20px Pretendard, sans-serif`;
    ctx.fillStyle = titleColor;

    let rTitleLine = "";
    for (let i = 0; i < titleWords.length; i++) {
      const testLine = rTitleLine + titleWords[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && i > 0) {
        ctx.fillText(rTitleLine, headerPaddingLeft, renderY);
        rTitleLine = titleWords[i] + " ";
        renderY += 27;
      } else {
        rTitleLine = testLine;
      }
    }
    ctx.fillText(rTitleLine, headerPaddingLeft, renderY);

    // 2nd Pass 본문 드로잉: 현재 선택된 currentPage 에 해당하는 줄들만 캔버스에 100% 드로잉!

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

    isCancelingRef.current = false;
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
      if (isCancelingRef.current) {
        isCancelingRef.current = false;
        return;
      }
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
      if (isCancelingRef.current) {
        isCancelingRef.current = false;
        return;
      }
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

  // ★ 페이지 변경 헬퍼 함수 (이전/다음 이동 시 Play 멈춤 & 튐 방지!) ★
  const changePage = (newPage: number) => {
    const clampedPage = Math.max(1, Math.min(totalPages, newPage));
    if (clampedPage === currentPage) return;

    // Play(음성 낭독) 중이라면 즉시 멈춤 및 취소 락(Lock) 적용
    if (typeof window !== "undefined" && window.speechSynthesis) {
      isCancelingRef.current = true;
      window.speechSynthesis.cancel();
    }
    setPlayerStatus("IDLE");
    setCurrentSentenceIndex(-1);

    setCurrentPage(clampedPage);
  };

  // 5. [중앙 메인 버튼] Play / Pause 자동 독서 재생/일시정지 (현재 페이지 가장 위에서부터 시작)
  const handleToggleAutoPlay = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (playerStatus === "PLAYING") {
      isCancelingRef.current = true;
      window.speechSynthesis.cancel();
      setPlayerStatus("PAUSED");
    } else {
      // 현재 화면에 뜨는 페이지(currentPage)의 가장 첫 문장 index 찾기
      let firstSentenceOfPage = 0;
      for (let i = 0; i < sentences.length; i++) {
        if (sentencePageMapRef.current.get(i) === currentPage) {
          firstSentenceOfPage = i;
          break;
        }
      }
      speakVoiceFromIndex(firstSentenceOfPage);
    }
  };

  // 6. [중앙 콤보 양옆] 이전 / 다음 단락 스킵 (현재 화면 페이지 기준 0ms 안전 이동)
  const handleSkipParagraph = (direction: "prev" | "next") => {
    if (sentences.length === 0) return;

    // 현재 위치한 문장 인덱스 구하기 (미지정이면 현재 화면 페이지의 첫 문장 기준)
    let currentIdx = currentSentenceIndex;
    if (currentIdx < 0) {
      for (let i = 0; i < sentences.length; i++) {
        if (sentencePageMapRef.current.get(i) === currentPage) {
          currentIdx = i;
          break;
        }
      }
      if (currentIdx < 0) currentIdx = 0;
    }

    let targetIdx = currentIdx;
    let attempts = 0;
    while (attempts < sentences.length) {
      if (direction === "next") {
        targetIdx = Math.min(sentences.length - 1, targetIdx + 1);
      } else {
        targetIdx = Math.max(0, targetIdx - 1);
      }
      attempts++;

      // 만약 targetIdx 문장에 실제 글자가 있거나 끝에 다다르면 스킵 안착!
      if (sentences[targetIdx].trim().length > 0 || targetIdx === 0 || targetIdx === sentences.length - 1) {
        break;
      }
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

  // ★ 캔버스 좌우 스와이핑(Swipe) 페이지 넘김 제스처 핸들러 ★
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStartCanvas = (clientX: number, clientY: number) => {
    setTouchStartX(clientX);
    setTouchStartY(clientY);
  };

  const handleTouchEndCanvas = (clientX: number, clientY: number) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = clientX - touchStartX;
    const diffY = clientY - touchStartY;

    // 수평 스와이프 (X 이동이 35px 이상 및 Y 이동보다 큼)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX < 0) {
        // 왼쪽으로 스와이프 ➔ 다음 페이지 (Play 자동 멈춤 적용)
        changePage(currentPage + 1);
      } else {
        // 오른쪽으로 스와이프 ➔ 이전 페이지 (Play 자동 멈춤 적용)
        changePage(currentPage - 1);
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
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

            {/* ★ HTML5 2D Canvas 영역 (좌우 스와이핑 터치/마우스 제스처 이벤트 적용) ★ */}
            <div
              onMouseDown={(e) => handleTouchStartCanvas(e.clientX, e.clientY)}
              onMouseUp={(e) => handleTouchEndCanvas(e.clientX, e.clientY)}
              onTouchStart={(e) => handleTouchStartCanvas(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={(e) => handleTouchEndCanvas(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
              className="absolute top-0 left-0 right-0 bottom-[3.75rem] w-full overflow-hidden cursor-grab active:cursor-grabbing"
            >
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
              {/* [맨 좌측 그룹]: 시원하게 확대된 페이지 인디케이터 & 수동 넘김 네비게이터 */}
              <div className="flex items-center gap-[0.25rem] shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-800 tabular-nums bg-gray-100/90 rounded-full p-1 border border-gray-200/60 shadow-2xs">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => changePage(currentPage - 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-90 shadow-2xs"
                    title="이전 페이지"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>
                  <span className="px-1 text-[13px] font-black text-gray-900 select-none">
                    {currentPage}/{totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => changePage(currentPage + 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-90 shadow-2xs"
                    title="다음 페이지"
                  >
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
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

              {/* [맨 우측 뷰어 옵션 그룹]: 속도 칩 + 글자 크기(A) + 배경 컬러 테마(🎨) - 컴팩트 34px (w-[2.125rem] h-[2.125rem]) */}
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
