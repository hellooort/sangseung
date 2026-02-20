import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const downloadItems: Record<string, { title: string; date: string; category: string; fileType: string; fileSize: string; description: string }> = {
  "1": {
    title: "LED 디스플레이 제품 카탈로그 2024",
    date: "2024.01.15",
    category: "카탈로그",
    fileType: "PDF",
    fileSize: "12.5MB",
    description: `상승종합통신의 LED 디스플레이 제품 라인업을 소개하는 카탈로그입니다.

주요 내용:
- 실내용 LED 디스플레이
- 실외용 LED 디스플레이  
- 미디어 파사드
- 특수 LED 솔루션
- 기술 사양 및 설치 가이드

최신 제품 정보와 기술 사양을 확인하실 수 있습니다.`,
  },
  "2": {
    title: "네트워크 솔루션 가이드",
    date: "2023.11.20",
    category: "기술자료",
    fileType: "PDF",
    fileSize: "8.2MB",
    description: `기업 환경에 최적화된 네트워크 솔루션 가이드입니다.

주요 내용:
- 네트워크 인프라 구축 가이드
- 무선 네트워크 솔루션
- 보안 네트워크 구성
- 유지보수 가이드`,
  },
  "3": {
    title: "IBS 통합시스템 소개서",
    date: "2023.09.05",
    category: "소개서",
    fileType: "PDF",
    fileSize: "5.7MB",
    description: `IBS(Intelligent Building System) 통합시스템 소개서입니다.

주요 내용:
- CCTV 시스템
- 출입통제 시스템
- 전관방송 시스템
- 통합배선 시스템`,
  },
};

export default async function DownloadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = downloadItems[id];

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <main className="pt-20">
          <section className="py-24 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-white mb-4">자료를 찾을 수 없습니다</h1>
              <Link href="/resources/downloads" className="text-[#4A90D9] hover:underline">
                목록으로 돌아가기
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {/* 뒤로가기 */}
            <Link
              href="/resources/downloads"
              className="inline-flex items-center gap-2 text-[#888] hover:text-white text-sm mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로
            </Link>

            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#4A90D9] text-sm px-3 py-1 bg-[#4A90D9]/10 rounded">
                  {item.category}
                </span>
                <span className="text-[#666] text-sm">{item.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {item.title}
              </h1>
            </div>

            {/* 파일 정보 박스 */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#4A90D9]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}.{item.fileType.toLowerCase()}</p>
                    <p className="text-[#888] text-sm">{item.fileType} · {item.fileSize}</p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#4A90D9] text-white px-6 py-3 rounded-lg hover:bg-[#3A80C9] transition-colors font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  다운로드
                </button>
              </div>
            </div>

            {/* 본문 */}
            <div className="bg-[#111] rounded-xl p-8">
              <h2 className="text-white text-lg font-bold mb-4">자료 설명</h2>
              <div className="text-[#ccc] leading-loose whitespace-pre-line">
                {item.description}
              </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <Link
                href="/resources/downloads"
                className="inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded hover:bg-[#222] transition-colors"
              >
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
