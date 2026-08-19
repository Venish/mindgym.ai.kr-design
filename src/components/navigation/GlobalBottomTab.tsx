"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Barbell, BookOpen, User } from "@phosphor-icons/react";

export function GlobalBottomTab() {
  const pathname = usePathname();

  const tabs = [
    { name: "홈", href: "/dashboard", icon: House },
    { name: "마음운동", href: "/ritual", icon: Barbell },
    { name: "매거진", href: "/magazine", icon: BookOpen },
    { name: "마이", href: "/report", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md flex justify-around items-center px-4 z-40 border-0 border-transparent shadow-none max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        const IconComponent = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-200"
          >
            <div
              className={`transition-all duration-300 transform ${
                isActive ? "txt-brand-green scale-110" : "txt-brand-tea hover:txt-brand-clay"
              }`}
            >
              <IconComponent size={24} weight={isActive ? "fill" : "regular"} />
            </div>
            <span
              className={`txt-micro-main tracking-tight transition-colors duration-200 ${
                isActive ? "txt-brand-green" : "txt-brand-tea"
              }`}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
