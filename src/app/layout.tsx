import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "상승종합통신㈜ | ONE-STOP SOLUTION",
  description: "네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체. 디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.",
  keywords: "상승종합통신, LED 디스플레이, 네트워크, IBS, 미디어 파사드, 전광판",
};

// 공개 페이지 ISR 캐시 — 5분(300초)마다 재생성. admin 저장 후 즉시 반영을 원하면
// 해당 admin 액션에서 revalidatePath/Tag 를 호출하도록 추후 보완.
export const revalidate = 300;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
