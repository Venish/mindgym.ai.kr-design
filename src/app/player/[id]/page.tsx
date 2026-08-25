import React from "react";
import { PlayerClientView } from "./PlayerClientView";

export function generateStaticParams() {
  const ids = Array.from({ length: 72 }, (_, i) => ({
    id: `RT-${String(i + 1).padStart(3, "0")}`,
  }));
  const numIds = Array.from({ length: 72 }, (_, i) => ({
    id: String(i + 1),
  }));
  return [...ids, ...numIds];
}

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  return <PlayerClientView id={id} />;
}
