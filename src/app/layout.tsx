import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MindGymProvider } from "@/context/MindGymContext";
import { GlobalOverlayProvider } from "@/components/providers/GlobalOverlayProvider";
import { GlobalPopupProvider } from "@/components/providers/GlobalPopupProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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

export const metadata: Metadata = {
  metadataBase: new URL("https://mindgym.corenuri.com"),
  title: "마인드짐",
  description: "매일 아침 쉼표 하나, 당신의 마음건강을 기르는 월간 마인드짐 어플리케이션",
  keywords: [
    "e월간 마음건강",
    "마인드짐",
    "MindGym",
    "마음건강",
    "리추얼",
    "직무스트레스",
    "KOSS",
    "웰비아이",
  ],
  authors: [{ name: "WELLBI Inc.", url: "https://mindgym.corenuri.com" }],
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon.ico" },
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/favicon_io/favicon.ico",
    apple: [
      { url: "/images/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/images/favicon_io/site.webmanifest",
  openGraph: {
    title: "마인드짐",
    description: "매일 아침 쉼표 하나, 당신의 마음건강을 기르는 월간 마인드짐 어플리케이션",
    url: "https://mindgym.corenuri.com",
    siteName: "마인드짐",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "마인드짐 프리뷰",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "마인드짐",
    description: "매일 아침 쉼표 하나, 당신의 마음건강을 기르는 월간 마인드짐 어플리케이션",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${nanumSquareRound.variable} ${pretendard.variable}`}>
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
