"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const certificates = [
  { id: 1, title: "IT 스마트코리아 표창", category: "표창", year: "2020" },
  { id: 2, title: "기업부설연구소 인정서", category: "인증", year: "2020" },
  { id: 3, title: "직접생산확인증명서 (기상전광판)", category: "인증", year: "2020" },
  { id: 4, title: "직접생산확인증명서 (교통정보전광판)", category: "인증", year: "2020" },
  { id: 5, title: "직접생산확인증명서 (안내전광판)", category: "인증", year: "2020" },
  { id: 6, title: "직접생산확인증명서 (영상정보디스플레이장치)", category: "인증", year: "2020" },
  { id: 7, title: "우수기술기업 인증서", category: "인증", year: "2018" },
  { id: 8, title: "정보통신공사업 등록증", category: "등록", year: "2002" },
  { id: 9, title: "소프트웨어사업자 신고확인서", category: "등록", year: "2008" },
  { id: 10, title: "공장등록증", category: "등록", year: "2019" },
  { id: 11, title: "사업자등록증", category: "등록", year: "2001" },
  { id: 12, title: "ISO 9001 인증서", category: "품질", year: "2018" },
];

const categories = ["전체", "표창", "인증", "등록", "품질"];

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const filteredCerts = activeCategory === "전체"
    ? certificates
    : certificates.filter((cert) => cert.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              CERTIFICATES
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">인증서</h1>

            {/* 필터 */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                    activeCategory === category
                      ? "bg-[#4A90D9] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 갤러리 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  {/* 이미지 영역 */}
                  <div className="aspect-[3/4] bg-[#2a2a2a] flex items-center justify-center relative">
                    <div className="text-center p-4">
                      <span className="text-[#333] text-4xl font-bold block mb-2">{cert.id}</span>
                      <span className="text-[#444] text-xs">이미지 영역</span>
                    </div>
                    <div className="absolute inset-0 bg-[#4A90D9]/0 group-hover:bg-[#4A90D9]/10 transition-colors flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#4A90D9] text-xs px-2 py-0.5 bg-[#4A90D9]/10 rounded">
                        {cert.category}
                      </span>
                      <span className="text-[#666] text-xs">{cert.year}</span>
                    </div>
                    <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#4A90D9] transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 모달 */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[3/4] max-h-[60vh] bg-[#2a2a2a] flex items-center justify-center">
              <div className="text-center">
                <span className="text-[#444] text-6xl font-bold block mb-4">{selectedCert.id}</span>
                <span className="text-[#555]">인증서 이미지</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#4A90D9] text-sm px-3 py-1 bg-[#4A90D9]/10 rounded">
                  {selectedCert.category}
                </span>
                <span className="text-[#666] text-sm">{selectedCert.year}</span>
              </div>
              <h2 className="text-white text-xl font-bold">{selectedCert.title}</h2>
            </div>
            <button
              onClick={() => setSelectedCert(null)}
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
