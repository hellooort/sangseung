import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              RESOURCES
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">자료실</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                href="/resources/press"
                className="group bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222] transition-colors"
              >
                <div className="w-16 h-16 bg-[#4A90D9]/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                  보도자료
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  상승종합통신 관련 언론 보도 및 뉴스를 확인하세요.
                </p>
              </Link>

              <Link
                href="/resources/downloads"
                className="group bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222] transition-colors"
              >
                <div className="w-16 h-16 bg-[#4A90D9]/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                  자료실
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  제품 카탈로그, 기술 자료 등을 확인하세요.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
