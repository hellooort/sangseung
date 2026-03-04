"use client";

import Link from "next/link";
import Image from "next/image";

const works = [
  { 
    id: 1, 
    title: "LH 컨퍼런스 LED 포스터", 
    spec: "S-Poster P2.5mm",
    category: "INDOOR", 
    image: "/image/reference/work_1.jpg",
    height: 280 
  },
  { 
    id: 4, 
    title: "호주 SUN CORP 실내 COB LED 스크린", 
    spec: "SCO-Wall P0.93mm",
    category: "INDOOR", 
    image: "/image/reference/work_4.jpg",
    height: 350 
  },
  { 
    id: 6, 
    title: "서울시청 다목적홀 LED 스크린", 
    spec: "SI640 P2.5mm",
    category: "INDOOR", 
    image: "/image/reference/work_6.jpg",
    height: 240 
  },
  { 
    id: 8, 
    title: "김해 금관가야휴게소 LED 미디어 파사드", 
    spec: "SMI P7.8mm",
    category: "MEDIA FACADE", 
    image: "/image/reference/work_8.jpg",
    height: 320 
  },
  { 
    id: 22, 
    title: "일본 방재훈련소 LED 스크린", 
    spec: "SOD-R P3.91mm",
    category: "RENTAL", 
    image: "/image/reference/work_22.jpg",
    height: 260 
  },
  { 
    id: 9, 
    title: "중국 스포츠 스타디움 LED 미디어파사드", 
    spec: "SMO P31.25mm",
    category: "MEDIA FACADE", 
    image: "/image/reference/work_9.jpg",
    height: 300 
  },
];

export default function WorksSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              PORTFOLIO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Works</h2>
          </div>
          <Link
            href="/works"
            className="mt-6 md:mt-0 inline-block border border-[#444] text-white px-6 py-3 rounded text-sm font-medium hover:border-white/50 transition-colors"
          >
            전체 보기
          </Link>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {works.map((work) => (
            <Link
              key={work.id}
              href="/works"
              className="break-inside-avoid group block"
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-[#4A90D9] text-xs mb-1">{work.spec}</span>
                  <h3 className="text-white text-lg font-bold">{work.title}</h3>
                  <span className="text-[#aaa] text-sm">{work.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
