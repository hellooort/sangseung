"use client";

import { useState } from "react";
import Link from "next/link";

const works = [
  { id: 1, client: "한화건설", location: "사우디아라비아", category: "NETWORK", height: 280 },
  { id: 2, client: "롯데호텔", location: "GUAM", category: "NETWORK", height: 350 },
  { id: 3, client: "한화솔루션", location: "진천공장", category: "NETWORK", height: 240 },
  { id: 4, client: "인천공항", location: "인천", category: "DIGITAL MEDIA", height: 320 },
  { id: 5, client: "아라이리조트", location: "일본", category: "NETWORK", height: 260 },
  { id: 6, client: "한화월드리조트", location: "사이판", category: "IBS", height: 300 },
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
                  className="w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center"
                  style={{ height: work.height }}
                >
                  <span className="text-[#333] text-5xl font-bold">{work.id}</span>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-[#4A90D9] text-xs mb-1">{work.category}</span>
                  <h3 className="text-white text-lg font-bold">{work.client}</h3>
                  <span className="text-[#aaa] text-sm">{work.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
