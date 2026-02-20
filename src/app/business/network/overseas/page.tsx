"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const overseasProjects = [
  {
    id: 1,
    title: "롯데호텔",
    location: "GUAM",
    year: "2014",
    description: "네트워크 인프라 구축공사",
    category: "guam",
  },
  {
    id: 2,
    title: "아라이리조트",
    location: "일본",
    year: "2017",
    description: "네트워크 인프라 구축공사",
    category: "japan",
  },
  {
    id: 3,
    title: "한화월드리조트",
    location: "사이판",
    year: "2019",
    description: "네트워크 이중화공사",
    category: "saipan",
  },
  {
    id: 4,
    title: "한화건설",
    location: "사우디아라비아",
    year: "2018",
    description: "네트워크 인프라 구축",
    category: "saudi",
  },
  {
    id: 5,
    title: "한화케미칼",
    location: "태국",
    year: "2018",
    description: "네트워크 인프라 구축",
    category: "thailand",
  },
  {
    id: 6,
    title: "롯데케미칼",
    location: "말레이시아",
    year: "2018",
    description: "네트워크 인프라 구축",
    category: "malaysia",
  },
];

const regions = [
  { id: "all", name: "전체" },
  { id: "guam", name: "GUAM" },
  { id: "japan", name: "일본" },
  { id: "saipan", name: "사이판" },
  { id: "saudi", name: "사우디아라비아" },
  { id: "thailand", name: "태국" },
  { id: "malaysia", name: "말레이시아" },
];

export default function OverseasPage() {
  const [activeRegion, setActiveRegion] = useState("all");

  const filteredProjects = activeRegion === "all"
    ? overseasProjects
    : overseasProjects.filter((p) => p.category === activeRegion);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-[#1a2a3a]" />
          <div className="relative z-20 text-center px-6">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              OVERSEAS PROJECTS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              해외 프로젝트
            </h1>
          </div>
        </section>

        {/* Filter & Gallery */}
        <section className="py-16 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Region Filter */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                    activeRegion === region.id
                      ? "bg-[#4A90D9] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] flex items-center justify-center">
                    <span className="text-white/20 text-5xl font-bold">{project.location}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#4A90D9] text-xs">{project.location}</span>
                      <span className="text-[#666] text-xs">{project.year}</span>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#888] text-sm">{project.description}</p>
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
