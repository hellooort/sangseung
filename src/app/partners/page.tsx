import Header from "@/components/Header";
import Footer from "@/components/Footer";

const partners = [
  { name: "한화", category: "건설/화학" },
  { name: "롯데", category: "호텔/케미칼" },
  { name: "현대자동차", category: "자동차" },
  { name: "삼성 SDI", category: "전자" },
  { name: "AIG 손해보험", category: "금융" },
  { name: "동국제강", category: "철강" },
  { name: "LS메탈", category: "금속" },
  { name: "기아자동차", category: "자동차" },
  { name: "아산병원", category: "의료" },
  { name: "인하대학교", category: "교육" },
  { name: "국민체육진흥공단", category: "공공기관" },
  { name: "국회도서관", category: "공공기관" },
  { name: "외교부", category: "공공기관" },
  { name: "해군 2함대", category: "국방" },
  { name: "한국보건산업진흥원", category: "공공기관" },
  { name: "서울산업대학교", category: "교육" },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              PARTNERS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">파트너사</h1>
            <p className="text-[#888] mb-16 max-w-2xl">
              상승종합통신은 국내외 다양한 산업 분야의 기업들과 함께 성공적인 프로젝트를 수행하고 있습니다.
              신뢰를 바탕으로 오랜 파트너십을 유지하며 함께 성장하고 있습니다.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center h-40 hover:bg-[#222] transition-colors"
                >
                  <span className="text-white text-xl font-bold mb-2">{partner.name}</span>
                  <span className="text-[#666] text-xs">{partner.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
