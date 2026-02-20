"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const pressArticles = [
  {
    id: 1,
    title: "상승종합통신, IT 스마트코리아 표창 수상",
    date: "2020.12.15",
    category: "수상",
    thumbnail: "/images/press/1.jpg",
  },
  {
    id: 2,
    title: "기업부설연구소 설립, R&D 역량 강화",
    date: "2020.08.20",
    category: "기업",
    thumbnail: "/images/press/2.jpg",
  },
  {
    id: 3,
    title: "태국지사 설립으로 동남아 시장 진출",
    date: "2019.06.10",
    category: "해외",
    thumbnail: "/images/press/3.jpg",
  },
  {
    id: 4,
    title: "일본지사 설립, 글로벌 네트워크 확장",
    date: "2019.04.05",
    category: "해외",
    thumbnail: "/images/press/4.jpg",
  },
  {
    id: 5,
    title: "우수기술기업 인증 획득",
    date: "2018.11.22",
    category: "인증",
    thumbnail: "/images/press/5.jpg",
  },
  {
    id: 6,
    title: "중국 LED Display 공장 설립",
    date: "2018.07.15",
    category: "해외",
    thumbnail: "/images/press/6.jpg",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              PRESS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">보도자료</h1>

            {/* 이미지형 게시판 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/resources/press/${article.id}`}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all"
                >
                  {/* 썸네일 이미지 영역 */}
                  <div className="aspect-video bg-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
                    <span className="text-[#333] text-4xl font-bold">{article.id}</span>
                    <div className="absolute inset-0 bg-[#4A90D9]/0 group-hover:bg-[#4A90D9]/10 transition-colors" />
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#4A90D9] text-xs px-2 py-1 bg-[#4A90D9]/10 rounded">
                        {article.category}
                      </span>
                      <span className="text-[#666] text-xs">{article.date}</span>
                    </div>
                    <h3 className="text-white text-base font-medium leading-snug group-hover:text-[#4A90D9] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
