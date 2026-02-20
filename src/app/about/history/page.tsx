"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const historyData = [
  {
    year: "2020",
    items: [
      { month: "", text: "IT 스마트코리아 표창" },
      { month: "", text: "기업부설연구소 설립" },
      { month: "", text: "직접생산확인증명 (기상전광판 / 교통정보전광판 / 안내전광판)" },
      { month: "", text: "직접생산확인증명 (영상정보디스플레이장치)" },
    ],
  },
  {
    year: "2019",
    items: [
      { month: "", text: "공장등록 (일산공장이전)" },
      { month: "", text: "태국지사 설립" },
      { month: "", text: "일본지사 설립" },
    ],
  },
  {
    year: "2018",
    items: [
      { month: "", text: "우수기술기업 인증" },
      { month: "", text: "LED Display 중국공장 설립 (GAMIN & SANGSEUNG)" },
    ],
  },
  {
    year: "2017",
    items: [
      { month: "", text: "미디어시스템사업부 설립" },
    ],
  },
  {
    year: "2008",
    items: [
      { month: "", text: "소프트웨어 사업자등록" },
    ],
  },
  {
    year: "2005",
    items: [
      { month: "", text: "한화 S&C 파트너체결" },
    ],
  },
  {
    year: "2003",
    items: [
      { month: "", text: "한국 Carrefour 네트워크 인프라구축" },
    ],
  },
  {
    year: "2002",
    items: [
      { month: "", text: "정보통신공사업 등록" },
    ],
  },
  {
    year: "2001",
    items: [
      { month: "", text: "상승종합통신㈜ 설립" },
    ],
  },
];

const periods = [
  { label: "현재-2017", years: ["2020", "2019", "2018", "2017"] },
  { label: "2016-2005", years: ["2008", "2005"] },
  { label: "2004-2001", years: ["2003", "2002", "2001"] },
];

export default function HistoryPage() {
  const [activePeriod, setActivePeriod] = useState(0);

  const filteredHistory = historyData.filter((item) =>
    periods[activePeriod].years.includes(item.year)
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              HISTORY
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">연혁</h1>

            {/* 연도 구간 탭 */}
            <div className="relative mb-16">
              <div className="flex items-center justify-between relative">
                {/* 배경 라인 */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#333] -translate-y-1/2" />
                
                {periods.map((period, index) => (
                  <button
                    key={period.label}
                    onClick={() => setActivePeriod(index)}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* 포인트 */}
                    <div
                      className={`w-3 h-3 rounded-full mb-3 transition-all ${
                        activePeriod === index
                          ? "bg-[#4A90D9] ring-4 ring-[#4A90D9]/30"
                          : "bg-[#444]"
                      }`}
                    />
                    {/* 라벨 */}
                    <span
                      className={`text-sm font-medium transition-colors ${
                        activePeriod === index ? "text-[#4A90D9]" : "text-[#666]"
                      }`}
                    >
                      {period.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 타임라인 */}
            <div className="relative">
              {/* 세로 라인 */}
              <div className="absolute left-8 md:left-24 top-0 bottom-0 w-px bg-[#333]" />

              {filteredHistory.map((yearData) => (
                <div key={yearData.year} className="mb-16 last:mb-0">
                  {/* 연도 */}
                  <div className="flex items-center mb-8">
                    <div className="relative z-10 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[#4A90D9] border-4 border-[#0A0A0A] absolute left-6 md:left-[5.5rem] -translate-x-1/2" />
                      <span className="text-4xl md:text-5xl font-bold text-white ml-16 md:ml-32">
                        {yearData.year}
                      </span>
                    </div>
                  </div>

                  {/* 이벤트 목록 */}
                  <div className="ml-16 md:ml-32 space-y-6">
                    {yearData.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 group"
                      >
                        {item.month && (
                          <span className="text-[#4A90D9] font-bold text-lg min-w-[3rem]">
                            {item.month}
                          </span>
                        )}
                        <div className="flex items-start gap-3">
                          <span className="text-[#4A90D9] mt-2">|</span>
                          <p className="text-[#ccc] text-base leading-relaxed group-hover:text-white transition-colors">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
