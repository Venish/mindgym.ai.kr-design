import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      {/* 최상단 스무스 Ambient Gradient 이펙트 */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-emerald-100/45 via-teal-50/22 to-transparent pointer-events-none z-0" />
      <main className="flex-1 flex flex-col z-10 relative">{children}</main>
    </div>
  );
}
