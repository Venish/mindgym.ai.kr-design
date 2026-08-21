"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Barbell, BookOpen, Megaphone } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";

interface NotificationItem {
  id: string;
  type: "game" | "magazine" | "notice";
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
}

/**
 * /notifications: 미니멀 알림 센터 페이지 (즉각 라우트 이동 표준)
 */
export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "game",
      title: "오늘의 덤벨 +3개 적립 완료",
      desc: "3일 연속 마음 단련으로 마음 근력 덤벨이 차곡차곡 쌓였습니다.",
      time: "10분 전",
      isRead: false,
    },
    {
      id: "2",
      type: "magazine",
      title: "이달의 추천 마인드 스토어 도착",
      desc: "VOL.11 「잠시멈춤」 매거진 아티클을 지금 확인해보세요.",
      time: "2시간 전",
      isRead: false,
    },
    {
      id: "3",
      type: "notice",
      title: "마인드짐이 새로워졌습니다",
      desc: "서비스 편의성과 마음 리추얼 기능이 한층 더 다정해졌습니다.",
      time: "어제",
      isRead: false,
    },
    {
      id: "4",
      type: "game",
      title: "Lv.2 황금 덤벨 칭호 오픈",
      desc: "단단해진 마음 근력 덕분에 새로운 레벨 칭호가 열렸습니다.",
      time: "3일 전",
      isRead: true,
    },
    {
      id: "5",
      type: "notice",
      title: "마음 리추얼 100% 활용 가이드",
      desc: "일상에서 지칠 때 마음을 회복하는 리추얼 활용 꿀팁을 확인해보세요.",
      time: "8월 1일",
      isRead: true,
    },
  ]);

  // 개별 알림 탭 시: 점만 100% 소멸 (페이지 이동 없음)
  const handleItemClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // 모두 읽음 클릭 시: 전체 점 안 보이게 삭제
  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    if (type === "game") return <Barbell size={18} weight="fill" className="text-[#00C474] shrink-0" />;
    if (type === "magazine") return <BookOpen size={18} weight="fill" className="text-[#00C474] shrink-0" />;
    return <Megaphone size={18} weight="fill" className="text-[#00C474] shrink-0" />;
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="max-w-[430px] w-full mx-auto min-h-screen bg-white flex flex-col select-none relative">
      {/* 1. 전역 공통 서브 페이지 상단 헤더 (닫기 시 100% 대시보드 /dashboard로 이동) */}
      <SubPageHeader
        title="마음 소식함"
        leftType="close"
        leftHref="/dashboard"
        onLeftClick={() => router.push("/dashboard")}
        rightAction={
          <button
            type="button"
            onClick={handleReadAll}
            disabled={!hasUnread}
            className={`text-xs font-bold transition-colors ${
              hasUnread
                ? "text-[#00C474] hover:underline cursor-pointer"
                : "text-gray-300 cursor-default"
            }`}
          >
            모두 읽음
          </button>
        }
      />

      {/* 2. 첨부 이미지 레퍼런스 스타일 알림 리스트 */}
      <div className="flex flex-col w-full px-4 divide-y divide-gray-100/90">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="flex items-center justify-between py-4 px-1 cursor-pointer transition-colors group gap-3"
          >
            {/* 좌측 안읽음 미니 점 (수직 정중앙 배치) */}
            <div className="w-2 flex items-center justify-center shrink-0 self-center">
              {!item.isRead && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C474] shadow-2xs animate-pulse" />
              )}
            </div>

            {/* 메인 텍스트 (1행: txt-body-main 순수 가이드 스펙, 2행: txt-caption-main 15px) */}
            <div className="flex flex-col flex-1 text-left">
              <div className="flex items-center gap-1.5">
                {getIcon(item.type)}
                <h2 className="txt-body-main text-gray-900">
                  {item.title}
                </h2>
              </div>
              <p className="txt-caption-main font-medium text-gray-700 tracking-tight leading-relaxed mt-1">
                {item.desc}
              </p>
            </div>

            {/* 우측 시간 메타 (txt-micro-main 13px) */}
            <span className="txt-micro-main font-medium text-gray-400 shrink-0 pt-0.5 tabular-nums">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
