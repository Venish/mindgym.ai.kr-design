"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingToolbarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface FloatingToolbarProps {
  items: FloatingToolbarItem[];
  className?: string;
}

export function FloatingToolbar({ items, className = "" }: FloatingToolbarProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-slate-900/90 text-white p-2 rounded-full backdrop-blur-xl shadow-2xl border border-white/10",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/15 transition-colors active:scale-95"
        >
          <span className="txt-brand-green">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
