import Header from "@/components/Header";
import Footer from "@/components/Footer";

const partners = [
  { name: "한화", category: "건설/화학", url: "https://www.hanwha.co.kr" },
  { name: "롯데", category: "호텔/케미칼", url: "https://www.lotte.co.kr" },
  { name: "현대자동차", category: "자동차", url: "https://www.hyundai.com" },
  { name: "삼성 SDI", category: "전자", url: "https://www.samsungsdi.co.kr" },
  { name: "AIG 손해보험", category: "금융", url: "https://www.aig.co.kr" },
  { name: "동국제강", category: "철강", url: "https://www.dongkuk.com" },
  { name: "LS메탈", category: "금속", url: "https://www.lsmetal.co.kr" },
  { name: "기아자동차", category: "자동차", url: "https://www.kia.com" },
  { name: "아산병원", category: "의료", url: "https://www.amc.seoul.kr" },
  { name: "인하대학교", category: "교육", url: "https://www.inha.ac.kr" },
  { name: "국민체육진흥공단", category: "공공기관", url: "https://www.kspo.or.kr" },
  { name: "국회도서관", category: "공공기관", url: "https://www.nanet.go.kr" },
  { name: "외교부", category: "공공기관", url: "https://www.mofa.go.kr" },
  { name: "해군 2함대", category: "국방", url: "#" },
  { name: "한국보건산업진흥원", category: "공공기관", url: "https://www.khidi.or.kr" },
  { name: "서울산업대학교", category: "교육", url: "https://www.seoultech.ac.kr" },
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
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center h-40 hover:bg-[#222] transition-colors group"
                >
                  <span className="text-white text-xl font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">{partner.name}</span>
                  <span className="text-[#666] text-xs">{partner.category}</span>
                  {partner.url !== "#" && (
                    <span className="text-[#4A90D9] text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      사이트 방문
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
