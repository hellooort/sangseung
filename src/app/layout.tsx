import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "상승종합통신㈜ | ONE-STOP SOLUTION",
  description: "네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체. 디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.",
  keywords: "상승종합통신, LED 디스플레이, 네트워크, IBS, 미디어 파사드, 전광판",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
