import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const pressArticles: Record<string, { title: string; date: string; category: string; content: string }> = {
  "1": {
    title: "상승종합통신, IT 스마트코리아 표창 수상",
    date: "2020.12.15",
    category: "수상",
    content: `상승종합통신㈜가 IT 스마트코리아 표창을 수상했습니다.

이번 수상은 네트워크 인프라 구축 및 LED 디스플레이 분야에서의 기술력과 
품질 경쟁력을 인정받은 결과입니다.

상승종합통신은 2001년 설립 이후 지속적인 기술 개발과 품질 향상을 통해
국내외 다양한 프로젝트를 성공적으로 수행해왔습니다.

앞으로도 고객 만족을 최우선으로 하여 더욱 발전하는 기업이 되겠습니다.`,
  },
  "2": {
    title: "기업부설연구소 설립, R&D 역량 강화",
    date: "2020.08.20",
    category: "기업",
    content: `상승종합통신㈜가 기업부설연구소를 설립하여 R&D 역량을 강화합니다.

연구소에서는 LED 디스플레이 기술 개발, 네트워크 솔루션 연구, 
스마트 빌딩 시스템 개발 등 다양한 분야의 연구를 진행할 예정입니다.

이를 통해 더욱 혁신적인 제품과 서비스를 제공하겠습니다.`,
  },
};

export default async function PressDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = pressArticles[id];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <main className="pt-20">
          <section className="py-24 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-white mb-4">게시글을 찾을 수 없습니다</h1>
              <Link href="/resources/press" className="text-[#4A90D9] hover:underline">
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
              href="/resources/press"
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
                  {article.category}
                </span>
                <span className="text-[#666] text-sm">{article.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {article.title}
              </h1>
            </div>

            {/* 썸네일 */}
            <div className="aspect-video bg-[#1a1a1a] rounded-xl mb-8 flex items-center justify-center">
              <span className="text-[#333] text-6xl font-bold">{id}</span>
            </div>

            {/* 본문 */}
            <div className="prose prose-invert max-w-none">
              <div className="text-[#ccc] leading-loose whitespace-pre-line">
                {article.content}
              </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <Link
                href="/resources/press"
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
