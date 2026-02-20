"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const downloadItems = [
  {
    id: 1,
    title: "LED 디스플레이 제품 카탈로그 2024",
    date: "2024.01.15",
    category: "카탈로그",
    fileType: "PDF",
    fileSize: "12.5MB",
  },
  {
    id: 2,
    title: "네트워크 솔루션 가이드",
    date: "2023.11.20",
    category: "기술자료",
    fileType: "PDF",
    fileSize: "8.2MB",
  },
  {
    id: 3,
    title: "IBS 통합시스템 소개서",
    date: "2023.09.05",
    category: "소개서",
    fileType: "PDF",
    fileSize: "5.7MB",
  },
  {
    id: 4,
    title: "미디어 파사드 시공 사례집",
    date: "2023.07.18",
    category: "카탈로그",
    fileType: "PDF",
    fileSize: "15.3MB",
  },
  {
    id: 5,
    title: "회사소개서 국문",
    date: "2023.06.01",
    category: "소개서",
    fileType: "PDF",
    fileSize: "6.8MB",
  },
  {
    id: 6,
    title: "회사소개서 영문 (Company Profile)",
    date: "2023.06.01",
    category: "소개서",
    fileType: "PDF",
    fileSize: "6.5MB",
  },
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              DOWNLOADS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">자료실</h1>

            {/* 목록형 게시판 */}
            <div className="bg-[#111] rounded-xl overflow-hidden">
              {/* 테이블 헤더 */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1a1a] text-[#888] text-sm font-medium border-b border-white/10">
                <div className="col-span-1">번호</div>
                <div className="col-span-6">제목</div>
                <div className="col-span-2">분류</div>
                <div className="col-span-2">등록일</div>
                <div className="col-span-1">파일</div>
              </div>

              {/* 목록 */}
              <div className="divide-y divide-white/5">
                {downloadItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/resources/downloads/${item.id}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 hover:bg-[#1a1a1a] transition-colors group"
                  >
                    {/* 번호 */}
                    <div className="hidden md:block col-span-1 text-[#666] text-sm">
                      {downloadItems.length - index}
                    </div>

                    {/* 제목 */}
                    <div className="col-span-1 md:col-span-6">
                      <h3 className="text-white text-sm md:text-base group-hover:text-[#4A90D9] transition-colors">
                        {item.title}
                      </h3>
                      {/* 모바일에서 추가 정보 */}
                      <div className="flex items-center gap-3 mt-2 md:hidden">
                        <span className="text-[#4A90D9] text-xs">{item.category}</span>
                        <span className="text-[#666] text-xs">{item.date}</span>
                        <span className="text-[#666] text-xs">{item.fileType} ({item.fileSize})</span>
                      </div>
                    </div>

                    {/* 분류 */}
                    <div className="hidden md:block col-span-2">
                      <span className="text-[#4A90D9] text-xs px-2 py-1 bg-[#4A90D9]/10 rounded">
                        {item.category}
                      </span>
                    </div>

                    {/* 등록일 */}
                    <div className="hidden md:block col-span-2 text-[#888] text-sm">
                      {item.date}
                    </div>

                    {/* 파일 정보 */}
                    <div className="hidden md:flex col-span-1 items-center gap-1 text-[#666] text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {item.fileType}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 안내 문구 */}
            <p className="text-[#666] text-sm mt-6 text-center">
              * 자료 다운로드는 상세 페이지에서 가능합니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
