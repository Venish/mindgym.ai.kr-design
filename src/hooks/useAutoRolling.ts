"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useAutoRolling
 * - 지정된 intervalMs 간격으로 currentIndex를 순환 롤링
 * - 마우스 호버(isHovered = true) 시 자동으로 타이머 일시 정지
 */
export function useAutoRolling(totalItems: number, intervalMs: number = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || totalItems <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovered, totalItems, intervalMs]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  return {
    currentIndex,
    setCurrentIndex,
    isHovered,
    setIsHovered,
    next,
    prev,
  };
}
