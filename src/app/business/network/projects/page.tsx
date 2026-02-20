"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const projectsByYear = {
  "2019": [
    "신촌역 탑시티 면세 네트워크 환경구축",
    "63빌딩 통신실 이전 구축",
    "한국타이어 삼평동 통합배선공사",
    "동해남부선 Smart Park구축사업 통신공사",
    "한화솔루션 진천공장 LDSE.Oxidation MES 통신공사",
    "한화솔루션 울산1,2공장 노후 광케이블 교체공사",
    "상상마당 부산 통합배선",
    "한화 내부망 및 외부망 추가 보완공사",
    "사이판 월드리조트 네트워크 이중화공사",
    "삼기오토모티브 서산사업장 네트워크 공사",
    "서울광진우체국 위탁택배작업장조성공사",
  ],
  "2018": [
    "한화빌딩 유·무선 네트워크 이전 설치공사",
    "현대자동차 아산 엔진개조 네트워크 구축공사",
    "한국보건산업진흥원 오송 네트워크 환경 개선공사",
    "LS메탈 장항사업장 네트워크 구축공사",
    "한화 리조트 설악, 경주 네트워크 이중화 구축공사",
    "한화/기계 본사 이전 통신 및 랜 구축공사",
    "한화 방산사업장 네트워크 인프라 개선 구축공사",
    "아마다코리아 송도신축 통합배선공사",
    "동국제강 냉연 당진도성공장 IT 인프라구축공사",
    "현대자동차 신엔진 무선 네트워크 구축공사",
    "아산병원 네트워크 구축공사",
  ],
  "2017": [
    "영에드에프아이 통합배선 공사",
    "한화 음성사업장 K1, K2 네트워크 구축공사",
    "한화 아산사업장 민수부분 네트워크 구축공사",
    "한화 방산사업장 네트워크 방 분리 공사",
    "롯데 일본 아라이리조트 네트워크 인프라 구축공사",
    "AIG 손해보험 IFC 네트워크 구축공사",
    "한화생명 63빌딩 통신실 이전 구축공사",
  ],
  "2016": [
    "세종 미디어프라자 통합배선 공사",
    "동국제강 당진공장 상부카메라 설치공사",
    "KMC 화성 차체3공장 고장예지 시스템 네트워크 구축",
    "인하대학교 응급실 네트워크 구축공사",
    "동양피엔에프 네트워크 구축공사",
    "AIG 손해보험 콜센타 네트워크 개선 구축공사",
    "한화 인재경영원 무선 AP 및 방 분리 공사",
    "국민체육진흥공단 스포츠레저사업부 네트워크구축",
    "한화 첨단소재 네트워크 인프라 구축공사",
    "한화 갤러리아 본사이전 네트워크 구축공사",
    "서울 강북경찰서 솔샘지구대 신축 통신공사",
  ],
  "2015": [
    "외교부 고도화장비 설치 공사",
    "한화 사업장 네트워크 망 분리 공사",
    "롯데 용인센타 네트워크 공사",
    "드림플러스 통신 및 랜 인프라 구축공사",
    "동원산업 네트워크 구축공사",
    "기아 화성차체공장 설비관리 네트워크 구축공사",
    "잠실 롯데 C2 공연장 네트워크 구축공사",
    "해군 2함대 통합배선공사",
  ],
  "2014": [
    "서초구청 민원센타 통신공사",
    "호남석유 네트워크 구축공사",
    "국회도서관 네트워크 구축공사",
    "동우 EMS시스템 무선 AP구축공사",
    "롯데호텔 Guam 네트워크 인프라 구축공사",
  ],
};

const years = Object.keys(projectsByYear).sort((a, b) => parseInt(b) - parseInt(a));

export default function ProjectsPage() {
  const [activeYear, setActiveYear] = useState<string>("all");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-[#2a2a2a]" />
          <div className="relative z-20 text-center px-6">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              PROJECT HISTORY
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              공사실적
            </h1>
          </div>
        </section>

        {/* Filter & List */}
        <section className="py-16 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Year Filter */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              <button
                onClick={() => setActiveYear("all")}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeYear === "all"
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                전체
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                    activeYear === year
                      ? "bg-[#4A90D9] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-12">
              {(activeYear === "all" ? years : [activeYear]).map((year) => (
                <div key={year}>
                  <h2 className="text-[#4A90D9] text-3xl font-bold mb-6 border-b border-[#333] pb-4">
                    {year}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectsByYear[year as keyof typeof projectsByYear].map((project, index) => (
                      <div
                        key={index}
                        className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors"
                      >
                        <p className="text-white text-sm">{project}</p>
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
