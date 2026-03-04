"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";

const filters = ["전체", "INDOOR", "OUTDOOR", "MEDIA FACADE", "RENTAL"];

const allWorks = [
  { 
    id: 1, 
    title: "LH 레퍼런스 LED 전광판", 
    spec: "S-Poster P2.5mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/S-Poster_P2.5mm_LH 레퍼런스 LED 전광판.jpg",
    height: 320 
  },
  { 
    id: 2, 
    title: "롯데지아아울렛 스튜디오 LED 스크린", 
    spec: "S-Wall P1.875mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/S-Wall_P1.875mm_롯데지아아울렛 스튜디오 LED 스크린.jpg",
    height: 280 
  },
  { 
    id: 3, 
    title: "피옥스 박회 LED 스크린", 
    spec: "S-Wall P1.875mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/S-Wall_P1.875mm_피옥스 박회 LED 스크린.jpg",
    height: 350 
  },
  { 
    id: 4, 
    title: "호주 SUN CORP 빌딩 COB LED 스크린", 
    spec: "SCO-Wall P0.93mm, 0.78mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/SCO-Wall_P0.93mm, 0.78mm_호주 SUN CORP 빌딩 COB LED 스크린.jpg",
    height: 300 
  },
  { 
    id: 5, 
    title: "강남교육청 학생문화체험관 빌딩 LED 스크린", 
    spec: "SI640 P1.83mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/SI640_P1.83mm_강남교육청 학생문화체험관 빌딩 LED 스크린.jpg",
    height: 340 
  },
  { 
    id: 6, 
    title: "세종시청 다목적홀 LED 스크린", 
    spec: "SI640 P2.5mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/SI640_P2.5mm_세종시청 다목적홀 LED 스크린.jpg",
    height: 290 
  },
  { 
    id: 7, 
    title: "세종시 정부 세종 청사 캠퍼스 스튜디오 LED 스크린", 
    spec: "SI640 P2.5mm",
    category: "INDOOR", 
    image: "/image/레퍼런스/SI640_P2.5mm_세종시 정부 세종 청사 캠퍼스 스튜디오 LED 스크린.jpg",
    height: 310 
  },
  { 
    id: 8, 
    title: "일본 아사히료칸 LED 스크린", 
    spec: "SOD-R P3.91mm",
    category: "RENTAL", 
    image: "/image/레퍼런스/SOD-R_P3.91mm_일본 아사히료칸 LED 스크린.jpg",
    height: 330 
  },
  { 
    id: 9, 
    title: "대전시청 기동본부 경로당 옥상 LED 전광판", 
    spec: "SOD-T P3.91mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-T_P3.91mm_대전시청 기동본부 경로당 옥상 LED 전광판.jpg",
    height: 280 
  },
  { 
    id: 10, 
    title: "서울 반포쌍용쇼핑쇼핑센터 LED 미디어 파사드", 
    spec: "SMI P7.8mm",
    category: "MEDIA FACADE", 
    image: "/image/레퍼런스/SMI_P7.8mm_서울 반포쌍용쇼핑센터 LED 미디어 파사드.jpg",
    height: 360 
  },
  { 
    id: 11, 
    title: "중국 심천시 메타버스 LED 미디어파사드", 
    spec: "SMO P31.25mm",
    category: "MEDIA FACADE", 
    image: "/image/레퍼런스/SMO_P31.25mm_중국 심천시 메타버스 LED 미디어파사드.jpg",
    height: 320 
  },
  { 
    id: 12, 
    title: "세종시 정부세종청사 클러스터 시스템 전광판(정문-중앙-후문)", 
    spec: "SOD-C P10, P4, P6mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-C_P10, P4, P6mm_세종시 정부세종청사 클러스터 시스템 전광판(정문-중앙-후문).jpg",
    height: 300 
  },
  { 
    id: 13, 
    title: "경기 부평시 수협뱅크 LED 전자게시판", 
    spec: "SOD-C P10mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-C_P10mm_경기 부평시 수협뱅크 LED 전자게시판.jpg",
    height: 270 
  },
  { 
    id: 14, 
    title: "파밀리에 정부세종청사 건물 전광판", 
    spec: "SOD-C P16mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-C_P16mm_파밀리에 정부세종청사 건물 전광판.jpg",
    height: 340 
  },
  { 
    id: 15, 
    title: "수원중심상가 건물 Cube LED 미디어파사드", 
    spec: "SOD-C P4mm",
    category: "MEDIA FACADE", 
    image: "/image/레퍼런스/SOD-C_P4mm_수원중심상가 건물 Cube LED 미디어파사드.jpg",
    height: 380 
  },
  { 
    id: 16, 
    title: "세종시 세종금고 인천캠퍼스 LED 전광판", 
    spec: "SOD-C P6mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-C_P6mm_세종시 세종금고 인천캠퍼스 LED 전광판.jpg",
    height: 290 
  },
  { 
    id: 17, 
    title: "세종시청 시민회관 건물 LED 전광판", 
    spec: "SOD-C P8mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-C_P8mm_세종시청 시민회관 건물 LED 전광판.jpg",
    height: 310 
  },
  { 
    id: 18, 
    title: "엘그라데스 오카사카 건물 LED 전광판", 
    spec: "SOD-E P10mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P10mm_엘그라데스 오카사카 건물 LED 전광판.jpg",
    height: 330 
  },
  { 
    id: 19, 
    title: "비동길프라자 롯데몰 클러스터 시스템 LED 전자게시판", 
    spec: "SOD-E P5mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P5mm_비동길프라자 롯데몰 클러스터 시스템 LED 전자게시판.jpg",
    height: 280 
  },
  { 
    id: 20, 
    title: "나주시 광역 나주기업도시 클러스터 시스템 LED 전자게시판", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P6.25mm_나주시 광역 나주기업도시 클러스터 시스템 LED 전자게시판.jpg",
    height: 300 
  },
  { 
    id: 21, 
    title: "세종시인천교육원 클러스터 시스템 LED 전자게시판", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P6.25mm_세종시인천교육원 클러스터 시스템 LED 전자게시판.jpg",
    height: 320 
  },
  { 
    id: 22, 
    title: "인천 중앙시장홍 클러스터 시스템 LED 전자게시판", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P6.25mm_인천 중앙시장홍 클러스터 시스템 LED 전자게시판.jpg",
    height: 290 
  },
  { 
    id: 23, 
    title: "한국전자통신연구원 건물 LED 전광판", 
    spec: "SOD-E P6.25mm",
    category: "OUTDOOR", 
    image: "/image/레퍼런스/SOD-E_P6.25mm_한국전자통신연구원 건물 LED 전광판.jpg",
    height: 340 
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
