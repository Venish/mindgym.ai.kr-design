"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type GardenDayState = "COMPLETED" | "REST_DAY";

export interface MindGymStateContextType {
  userName: string;
  totalDumbbells: number;
  completedDays: string[];
  restDays: string[];
  currentIntention: string;
  morningEmotion: string;
  todayQuote: string;
  favorites: string[];
  readMagazines: string[];
  setUserName: (name: string) => void;
  addDumbbells: (amount: number) => void;
  markTodayCompleted: () => void;
  markTodayRest: () => void;
  toggleFavorite: (id: string) => void;
  readMagazine: (id: string) => void;
  setCurrentIntention: (intention: string) => void;
  setMorningEmotion: (emotion: string) => void;
  setTodayQuote: (quote: string) => void;
  dashboardRefreshKey: number;
  triggerDashboardRefresh: () => void;
  getLevelName: (dumbbells?: number) => string;
  getLevelNumber: (dumbbells?: number) => number;
  getNextLevelDiff: () => number;
  getGardenProgress: () => { completedCount: number; restCount: number; totalDays: number };
}

const MindGymStateContext = createContext<MindGymStateContextType | undefined>(undefined);

export const MindGymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState("보노보노");

  const setUserName = (name: string) => {
    setUserNameState(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("mg_user_name", name);
    }
  };
  const [totalDumbbells, setTotalDumbbells] = useState(120);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [restDays, setRestDays] = useState<string[]>([]);
  const [currentIntention, setCurrentIntentionState] = useState("활기차게 · 따뜻하게 · 성장하며");
  const [morningEmotion, setMorningEmotionState] = useState("차분함");
  const [todayQuote, setTodayQuoteState] = useState("오늘도 남 비교하지 말고 내 페이스대로 걷기");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readMagazines, setReadMagazines] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("mg_user_name");
      const storedTotal = localStorage.getItem("mg_total_dumbbells");
      const storedCompleted = localStorage.getItem("mg_completed_days");
      const storedRest = localStorage.getItem("mg_rest_days");
      const storedIntention = localStorage.getItem("mg_current_intention");
      const storedEmotion = localStorage.getItem("mg_morning_emotion");
      const storedQuote = localStorage.getItem("mg_today_quote");
      const storedFavorites = localStorage.getItem("mg_favorites");
      const storedMagazines = localStorage.getItem("mg_read_magazines");

      if (storedName) setUserNameState(storedName);
      if (storedTotal) setTotalDumbbells(parseInt(storedTotal, 10));
      if (storedCompleted) setCompletedDays(JSON.parse(storedCompleted));
      if (storedRest) setRestDays(JSON.parse(storedRest));
      if (storedIntention) {
        // 단일 키워드 예전 데이터가 남아있을 경우 100% 3개 조합 더미 텍스트로 보정
        if (!storedIntention.includes("·") || storedIntention.split("·").length < 3) {
          setCurrentIntentionState("활기차게 · 따뜻하게 · 성장하며");
        } else {
          setCurrentIntentionState(storedIntention);
        }
      }
      if (storedEmotion) setMorningEmotionState(storedEmotion);
      if (storedQuote) setTodayQuoteState(storedQuote);
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedMagazines) setReadMagazines(JSON.parse(storedMagazines));

      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("mg_total_dumbbells", totalDumbbells.toString());
      localStorage.setItem("mg_completed_days", JSON.stringify(completedDays));
      localStorage.setItem("mg_rest_days", JSON.stringify(restDays));
      localStorage.setItem("mg_current_intention", currentIntention);
      localStorage.setItem("mg_morning_emotion", morningEmotion);
      localStorage.setItem("mg_today_quote", todayQuote);
      localStorage.setItem("mg_favorites", JSON.stringify(favorites));
      localStorage.setItem("mg_read_magazines", JSON.stringify(readMagazines));
    }
  }, [totalDumbbells, completedDays, restDays, currentIntention, morningEmotion, todayQuote, favorites, readMagazines, isInitialized]);

  // 마운트 후 이번 달 1일부터 어제까지 미완료일 자동 REST_DAY 보정
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const todayDate = today.getDate();

      const newRestDays = [...restDays];
      let updated = false;

      for (let d = 1; d < todayDate; d++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        if (!completedDays.includes(dateStr) && !newRestDays.includes(dateStr)) {
          newRestDays.push(dateStr);
          updated = true;
        }
      }

      if (updated) {
        setRestDays(newRestDays);
      }
    }
  }, [isInitialized, completedDays]);

  const getLevelName = (dumbbells = totalDumbbells) => {
    if (dumbbells < 150) return "나무 덤벨";
    if (dumbbells < 300) return "돌 덤벨";
    if (dumbbells < 500) return "청동 덤벨";
    if (dumbbells < 800) return "철 덤벨";
    if (dumbbells < 1200) return "은 덤벨";
    if (dumbbells < 1800) return "금 덤벨";
    if (dumbbells < 2500) return "플래티넘 덤벨";
    return "다이아 덤벨";
  };

  const getLevelNumber = (dumbbells = totalDumbbells) => {
    if (dumbbells < 150) return 1;
    if (dumbbells < 300) return 2;
    if (dumbbells < 500) return 3;
    if (dumbbells < 800) return 4;
    if (dumbbells < 1200) return 5;
    if (dumbbells < 1800) return 6;
    if (dumbbells < 2500) return 7;
    return 8;
  };

  const getNextLevelDiff = () => {
    if (totalDumbbells < 150) return 150 - totalDumbbells;
    if (totalDumbbells < 300) return 300 - totalDumbbells;
    if (totalDumbbells < 500) return 500 - totalDumbbells;
    if (totalDumbbells < 800) return 800 - totalDumbbells;
    if (totalDumbbells < 1200) return 1200 - totalDumbbells;
    if (totalDumbbells < 1800) return 1800 - totalDumbbells;
    if (totalDumbbells < 2500) return 2500 - totalDumbbells;
    return 0;
  };

  const addDumbbells = (amount: number) => {
    setTotalDumbbells((prev) => {
      const next = prev + amount;
      const oldLevel = getLevelName(prev);
      const newLevel = getLevelName(next);
      if (oldLevel !== newLevel) {
        setTimeout(() => {
          alert(`🎉 등급 진화! [${oldLevel}] ➔ [${newLevel}] 축하합니다!`);
        }, 150);
      }
      return next;
    });
  };

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const markTodayCompleted = () => {
    const todayStr = getTodayStr();
    setCompletedDays((prev) => {
      if (prev.includes(todayStr)) return prev;
      const next = [...prev, todayStr];
      setRestDays((r) => r.filter((day) => day !== todayStr));

      if (next.length === 30) {
        addDumbbells(30);
      }
      return next;
    });
  };

  const markTodayRest = () => {
    const todayStr = getTodayStr();
    setRestDays((prev) => {
      if (prev.includes(todayStr) || completedDays.includes(todayStr)) return prev;
      return [...prev, todayStr];
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const readMagazine = (id: string) => {
    setReadMagazines((prev) => {
      if (prev.includes(id)) return prev;
      addDumbbells(10);
      return [...prev, id];
    });
  };

  const setCurrentIntention = (intention: string) => {
    setCurrentIntentionState(intention);
  };

  const setMorningEmotion = (emotion: string) => {
    setMorningEmotionState(emotion);
  };

  const setTodayQuote = (quote: string) => {
    setTodayQuoteState(quote);
  };

  const getGardenProgress = () => {
    const today = new Date();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return {
      completedCount: completedDays.length,
      restCount: restDays.length,
      totalDays,
    };
  };

  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // 로딩 화면/스피너/텍스트 표시 없이 0ms 즉각 조용한 백그라운드 재갱신 (Silent Background Update)
  const triggerDashboardRefresh = () => {
    /* 중간 로딩 화면 및 "데이터를 불러오는 중입니다" 텍스트 없이 0ms 즉각 조용히 상태만 재갱신 */
    setDashboardRefreshKey((prev) => prev + 1);
  };

  return (
    <MindGymStateContext.Provider
      value={{
        userName,
        totalDumbbells,
        completedDays,
        restDays,
        currentIntention,
        morningEmotion,
        todayQuote,
        favorites,
        readMagazines,
        setUserName,
        dashboardRefreshKey,
        triggerDashboardRefresh,
        addDumbbells,
        markTodayCompleted,
        markTodayRest,
        toggleFavorite,
        readMagazine,
        setCurrentIntention,
        setMorningEmotion,
        setTodayQuote,
        getLevelName,
        getLevelNumber,
        getNextLevelDiff,
        getGardenProgress,
      }}
    >
      {children}
    </MindGymStateContext.Provider>
  );
};

export const useMindGym = () => {
  const context = useContext(MindGymStateContext);
  if (!context) {
    throw new Error("useMindGym must be used within a MindGymProvider");
  }
  return context;
};
