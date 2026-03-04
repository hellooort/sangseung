"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";

const filters = ["전체", "INDOOR", "OUTDOOR", "MEDIA FACADE", "RENTAL"];

const allWorks = [
  { 
    id: 1, 
    title: "LH 컨퍼런스 LED 포스터", 
    spec: "S-Poster P2.5mm",
    category: "INDOOR", 
    image: "/image/reference/work_1.jpg",
    height: 320 
  },
  { 
    id: 2, 
    title: "씨아이씨소프트 스튜디오 LED 스크린", 
    spec: "S-Wall P1.875mm",
    category: "INDOOR", 
    image: "/image/reference/work_2.jpg",
    height: 280 
  },
  { 
    id: 3, 
    title: "의왕시 의회 LED 스크린", 
    spec: "S-Wall P1.875mm",
    category: "INDOOR", 
    image: "/image/reference/work_3.jpg",
    height: 350 
  },
  { 
    id: 4, 
    title: "호주 SUN CORP 실내 COB LED 스크린", 
    spec: "SCO-Wall P0.93mm, 0.78mm",
    category: "INDOOR", 
    image: "/image/reference/work_4.jpg",
    height: 300 
  },
  { 
    id: 5, 
    title: "충남교육청 학생교육문화원 실내 LED 스크린", 
    spec: "SI640 P1.83mm",
    category: "INDOOR", 
    image: "/image/reference/work_5.jpg",
    height: 340 
  },
  { 
    id: 6, 
    title: "서울시청 다목적홀 LED 스크린", 
    spec: "SI640 P2.5mm",
    category: "INDOOR", 
    image: "/image/reference/work_6.jpg",
    height: 290 
  },
  { 
    id: 7, 
    title: "폴리텍 대학 서울 정수 캠퍼스 스튜디오 LED 스크린", 
    spec: "SI640 P2.5mm",
    category: "INDOOR", 
    image: "/image/reference/work_7.jpg",
    height: 310 
  },
  { 
    id: 8, 
    title: "김해 금관가야휴게소 LED 미디어 파사드", 
    spec: "SMI P7.8mm",
    category: "MEDIA FACADE", 
    image: "/image/reference/work_8.jpg",
    height: 360 
  },
  { 
    id: 9, 
    title: "중국 스포츠 스타디움 LED 미디어파사드", 
    spec: "SMO P31.25mm",
    category: "MEDIA FACADE", 
    image: "/image/reference/work_9.jpg",
    height: 320 
  },
  { 
    id: 10, 
    title: "서울 강서구 보건소 LED 전자게시대", 
    spec: "SOD-C P10mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_10.jpg",
    height: 270 
  },
  { 
    id: 11, 
    title: "공릉동 도깨비시장 클라우드 시스템 전광판", 
    spec: "SOD-C P10, P4, P6mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_11.jpg",
    height: 300 
  },
  { 
    id: 12, 
    title: "경상북도 경제진흥원 옥외 전광판", 
    spec: "SOD-C P16mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_12.jpg",
    height: 340 
  },
  { 
    id: 13, 
    title: "경주중심상가 옥외 Cube LED 미디어파사드", 
    spec: "SOD-C P4mm",
    category: "MEDIA FACADE", 
    image: "/image/reference/work_13.jpg",
    height: 380 
  },
  { 
    id: 14, 
    title: "폴리텍 대학교 인천캠퍼스 LED 전광판", 
    spec: "SOD-C P6mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_14.jpg",
    height: 290 
  },
  { 
    id: 15, 
    title: "광명시청 시민회관 대형 LED 포스터", 
    spec: "SOD-C P8mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_15.jpg",
    height: 310 
  },
  { 
    id: 16, 
    title: "방글라데시 다카공항 대형 LED 전광판", 
    spec: "SOD-E P10mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_16.jpg",
    height: 330 
  },
  { 
    id: 17, 
    title: "목동깨비시장 양면형 클라우드 시스템 LED 전자게시대", 
    spec: "SOD-E P5mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_17.jpg",
    height: 280 
  },
  { 
    id: 18, 
    title: "광주시 동구 대인교차로 클라우드 시스템 LED 전자게시대", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_18.jpg",
    height: 300 
  },
  { 
    id: 19, 
    title: "생거진천시장 클라우드 시스템 LED 전자게시대", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_19.jpg",
    height: 320 
  },
  { 
    id: 20, 
    title: "진천 광혜원면 클라우드 시스템 LED 전자게시대", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_20.jpg",
    height: 290 
  },
  { 
    id: 21, 
    title: "한국원자력의학원 대형 LED 전광판", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_21.jpg",
    height: 340 
  },
  { 
    id: 22, 
    title: "일본 방재훈련소 LED 스크린", 
    spec: "SOD-R P3.91mm",
    category: "RENTAL", 
    image: "/image/reference/work_22.jpg",
    height: 330 
  },
  { 
    id: 23, 
    title: "서울경찰청 기동본부 차량용 양면 LED 전광판", 
    spec: "SOD-T P3.91mm",
    category: "OUTDOOR", 
    image: "/image/reference/work_23.jpg",
    height: 280 
  },
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">시공사례</h1>

            {/* 필터 */}
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
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
                    <div 
                      className="relative w-full bg-[#2a2a2a]"
                      style={{ height: work.height }}
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-[#4A90D9] text-xs mb-1">{work.spec}</span>
                      <h3 className="text-white text-lg font-bold">{work.title}</h3>
                      <span className="text-[#aaa] text-sm">{work.category}</span>
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
            className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-[#2a2a2a]">
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#4A90D9] text-sm">{selectedWork.spec}</span>
                <span className="text-[#666] text-sm">{selectedWork.category}</span>
              </div>
              <h2 className="text-white text-2xl font-bold">{selectedWork.title}</h2>
            </div>
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
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
