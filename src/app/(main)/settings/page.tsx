"use client";

import React from "react";
import { SettingsSheet } from "@/components/dashboard/SettingsSheet";

export default function SettingsPage() {
  return (
    <main className="w-full min-h-screen bg-theme-app flex flex-col">
      <SettingsSheet />
    </main>
  );
}
