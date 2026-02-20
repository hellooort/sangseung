"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";

const filters = ["전체", "DIGITAL MEDIA", "NETWORK", "IBS"];

const allWorks = [
  { id: 1, client: "한화건설", location: "사우디아라비아", category: "NETWORK", year: "2019", image: "/images/works/1.jpg", height: 300 },
  { id: 2, client: "롯데호텔", location: "GUAM", category: "NETWORK", year: "2014", image: "/images/works/2.jpg", height: 400 },
  { id: 3, client: "한화솔루션", location: "진천공장", category: "NETWORK", year: "2019", image: "/images/works/3.jpg", height: 250 },
  { id: 4, client: "63빌딩", location: "서울", category: "NETWORK", year: "2019", image: "/images/works/4.jpg", height: 350 },
  { id: 5, client: "아라이리조트", location: "일본", category: "NETWORK", year: "2017", image: "/images/works/5.jpg", height: 280 },
  { id: 6, client: "한화월드리조트", location: "사이판", category: "IBS", year: "2019", image: "/images/works/6.jpg", height: 320 },
  { id: 7, client: "한화케미칼", location: "태국", category: "NETWORK", year: "2018", image: "/images/works/7.jpg", height: 380 },
  { id: 8, client: "롯데케미칼", location: "말레이시아", category: "NETWORK", year: "2018", image: "/images/works/8.jpg", height: 260 },
  { id: 9, client: "신촌역 탑시티", location: "서울", category: "NETWORK", year: "2019", image: "/images/works/9.jpg", height: 340 },
  { id: 10, client: "한국타이어", location: "삼평동", category: "NETWORK", year: "2019", image: "/images/works/10.jpg", height: 290 },
  { id: 11, client: "AIG 손해보험", location: "IFC", category: "NETWORK", year: "2017", image: "/images/works/11.jpg", height: 360 },
  { id: 12, client: "국회도서관", location: "서울", category: "NETWORK", year: "2014", image: "/images/works/12.jpg", height: 310 },
];

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [selectedWork, setSelectedWork] = useState<typeof allWorks[0] | null>(null);

  const filteredWorks = activeFilter === "전체"
    ? allWorks
    : allWorks.filter((work) => work.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">시공사례</h1>

            {/* Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all ${
                    activeFilter === filter
                      ? "bg-[#4A90D9] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                    {/* 실제 이미지가 없을 때 placeholder */}
                    <div 
                      className="w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center"
                      style={{ height: work.height }}
                    >
                      <span className="text-[#333] text-6xl font-bold">{work.id}</span>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-[#4A90D9] text-xs mb-1">{work.year} · {work.category}</span>
                      <h3 className="text-white text-lg font-bold">{work.client}</h3>
                      <span className="text-[#aaa] text-sm">{work.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center"
              style={{ height: 400 }}
            >
              <span className="text-[#333] text-8xl font-bold">{selectedWork.id}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#4A90D9] text-sm">{selectedWork.year}</span>
                <span className="text-[#666] text-sm">{selectedWork.category}</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">{selectedWork.client}</h2>
              <p className="text-[#888]">{selectedWork.location}</p>
            </div>
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
