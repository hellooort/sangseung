"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const ibsCategories = [
  { id: "all", name: "전체" },
  { id: "cable", name: "통합배선공사" },
  { id: "cctv", name: "CCTV 공사" },
  { id: "catv", name: "CATV 공사" },
  { id: "av", name: "AV 공사" },
  { id: "remote", name: "원격검침공사" },
  { id: "server", name: "서버실구축/이전공사" },
  { id: "access", name: "출입통제공사" },
  { id: "broadcast", name: "전관방송공사" },
  { id: "ups", name: "UPS공사" },
];

const ibsGalleryItems = [
  { id: 1, title: "맨홀 시공", category: "cable", image: "/images/ibs/manhole.jpg" },
  { id: 2, title: "관로구 방수 시공", category: "cable", image: "/images/ibs/waterproof.jpg" },
  { id: 3, title: "신축건물 매입배관 시공", category: "cable", image: "/images/ibs/pipe.jpg" },
  { id: 4, title: "옥외 배관 시공", category: "cable", image: "/images/ibs/outdoor.jpg" },
  { id: 5, title: "CCTV 설치 현장", category: "cctv", image: "/images/ibs/cctv1.jpg" },
  { id: 6, title: "CCTV 통합관제", category: "cctv", image: "/images/ibs/cctv2.jpg" },
  { id: 7, title: "CATV 배선", category: "catv", image: "/images/ibs/catv1.jpg" },
  { id: 8, title: "AV 시스템 구축", category: "av", image: "/images/ibs/av1.jpg" },
  { id: 9, title: "서버실 구축", category: "server", image: "/images/ibs/server1.jpg" },
  { id: 10, title: "서버실 이전", category: "server", image: "/images/ibs/server2.jpg" },
  { id: 11, title: "출입통제 시스템", category: "access", image: "/images/ibs/access1.jpg" },
  { id: 12, title: "전관방송 설비", category: "broadcast", image: "/images/ibs/broadcast1.jpg" },
];

export default function IBSPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? ibsGalleryItems
    : ibsGalleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          <div className="relative z-20 text-center px-6">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              IBS / INTEGRATED BUILDING SYSTEM
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              IBS 통합시스템
            </h1>
          </div>
        </section>

        {/* Filter & Gallery */}
        <section className="py-16 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {ibsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                    activeCategory === category.id
                      ? "bg-[#4A90D9] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="h-48 bg-[#2a2a2a] flex items-center justify-center">
                    <span className="text-[#333] text-6xl font-bold">{item.id}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium group-hover:text-[#4A90D9] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#666]">해당 카테고리에 등록된 항목이 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
