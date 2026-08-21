import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MindGymProvider } from "@/context/MindGymContext";
import { GlobalOverlayProvider } from "@/components/providers/GlobalOverlayProvider";

const nanumSquareRound = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareRound/NanumSquareRoundL.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRound/NanumSquareRoundR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRound/NanumSquareRoundB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRound/NanumSquareRoundEB.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nanum-round",
  display: "swap",
});

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

import { GlobalPopupProvider } from "@/components/providers/GlobalPopupProvider";

export const metadata: Metadata = {
  title: "e월간 마음건강 - 마인드짐 (MindGym)",
  description: "매월 새로워지는 마음 근력 단련 30일 모바일 웹 어플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumSquareRound.variable} ${pretendard.variable}`}>
      <body className={`${nanumSquareRound.className} bg-gray-100 min-h-screen flex justify-center text-gray-900 antialiased font-sans no-scrollbar`}>
        <MindGymProvider>
          <div className="w-full max-w-[430px] mx-auto bg-white min-h-screen flex flex-col shadow-2xl relative no-scrollbar">
            {children}
            <GlobalOverlayProvider />
            <GlobalPopupProvider />
          </div>
        </MindGymProvider>
      </body>
    </html>
  );
}
