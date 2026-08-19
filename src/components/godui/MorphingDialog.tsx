"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface MorphingDialogProps {
  trigger: React.ReactNode;
  title: string;
  category?: string;
  children: React.ReactNode;
  className?: string;
}

export function MorphingDialog({
  trigger,
  title,
  category,
  children,
  className = "",
}: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer inline-block">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop / backdrop-blur 주석 처리 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* Dialog Content Container */}
            <motion.div
              layoutId="morphing-dialog"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl overflow-hidden border border-gray-100",
                className
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {category && (
                    <span className="txt-caption-main txt-brand-green font-semibold uppercase tracking-wider">
                      {category}
                    </span>
                  )}
                  <h3 className="txt-title-card txt-brand-ink font-bold mt-0.5">{title}</h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="txt-body-main txt-brand-clay leading-relaxed overflow-y-auto max-h-[70vh]">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
