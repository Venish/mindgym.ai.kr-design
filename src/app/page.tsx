"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasOnboarded =
        localStorage.getItem("mindgym_has_onboarded") === "true" ||
        Boolean(localStorage.getItem("mg_user_name"));

      if (hasOnboarded) {
        router.replace("/dashboard");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [router]);

  return null;
}



