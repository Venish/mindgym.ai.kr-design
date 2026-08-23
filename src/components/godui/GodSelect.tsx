"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface GodSelectOption {
  value: string;
  label: string;
  badge?: string;
}

interface GodSelectProps {
  options: (string | GodSelectOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
}

export function GodSelect({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "선택해 주세요",
  icon,
  className = "",
  triggerClassName = "",
}: GodSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    defaultValue || (typeof options[0] === "string" ? options[0] : options[0]?.value) || ""
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const normalizedOptions: GodSelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue) || normalizedOptions[0];

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full text-left", className)}>
      {/* Select Trigger Control */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center justify-between w-full px-4 py-3.5 bg-white border border-gray-200/90 rounded-2xl shadow-2xs font-extrabold text-sm text-gray-900 transition-all duration-200 active:scale-[0.98]",
          isOpen && "border-[var(--color-brand-green)]",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {icon && <span className="text-[var(--color-brand-green)] shrink-0">{icon}</span>}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 shrink-0 ml-2"
        >
          <CaretDown size={18} weight="bold" />
        </motion.span>
      </button>

      {/* Dropdown Menu Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 z-50 mt-1.5 p-1.5 bg-white border border-gray-200/90 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === currentValue;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left",
                    isSelected
                      ? "bg-emerald-50 text-[var(--color-brand-green)] font-black"
                      : "text-gray-700 hover:bg-gray-100/80 active:bg-gray-200/80"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check size={16} weight="bold" className="text-[var(--color-brand-green)] shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
