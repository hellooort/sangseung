import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "실외용 LED 전광판",
    description: "고휘도, 방수/방진 설계로 옥외 환경에 최적화된 대형 LED 디스플레이",
    specs: ["밝기: 6,000~10,000 nits", "방수등급: IP65", "픽셀피치: P3~P16"],
  },
  {
    id: 2,
    name: "실내용 LED 전광판",
    description: "고화질, 고해상도의 실내 환경에 최적화된 LED 디스플레이",
    specs: ["밝기: 800~1,500 nits", "픽셀피치: P1.2~P4", "시야각: 160°"],
  },
  {
    id: 3,
    name: "미디어 파사드",
    description: "건물 외벽을 미디어 콘텐츠 표출 공간으로 활용하는 대형 디스플레이 시스템",
    specs: ["곡면 설치 가능", "투과형 설계", "맞춤 제작"],
  },
  {
    id: 4,
    name: "교통정보 전광판",
    description: "도로, 철도, 공항 등 교통 시설에 최적화된 정보 표출 시스템",
    specs: ["실시간 연동", "고시인성", "원격 제어"],
  },
  {
    id: 5,
    name: "기상정보 전광판",
    description: "기상청 연동 실시간 기상 정보 표출 전광판",
    specs: ["기상청 API 연동", "자동 업데이트", "다중 정보 표출"],
  },
  {
    id: 6,
    name: "스포츠 전광판",
    description: "경기장, 체육관 등 스포츠 시설 전용 대형 전광판",
    specs: ["고속 영상 처리", "광시야각", "대형 사이즈"],
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "자체 기술력",
    description: "기업부설연구소 운영을 통한 지속적인 R&D와 자체 기술 개발",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "자체 생산 공장",
    description: "양주공장과 중국공장 보유로 신속한 생산 및 품질 관리",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "글로벌 네트워크",
    description: "태국, 일본, 중국 등 해외 지사 운영으로 글로벌 서비스 제공",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "원스톱 솔루션",
    description: "기획, 설계, 제작, 시공, 유지보수까지 전 과정 일괄 수행",
  },
];

export default function LEDBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* 히어로 섹션 */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              LED DISPLAY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              LED 디스플레이
            </h1>
            <p className="text-[#888] text-lg max-w-2xl leading-relaxed mb-8">
              설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는
              원스톱 솔루션 전문 기업입니다.
            </p>
            <Link
              href="/works"
              className="inline-block border border-[#4A90D9] text-[#4A90D9] px-8 py-3 rounded font-medium hover:bg-[#4A90D9] hover:text-white transition-colors"
            >
              시공사례 보기
            </Link>
          </div>
        </section>

        {/* 제품 라인업 */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">제품 라인업</h2>
            <p className="text-[#888] mb-12">다양한 환경과 용도에 맞는 최적의 LED 솔루션을 제공합니다.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#111] rounded-xl p-6 hover:bg-[#1a1a1a] transition-colors group"
                >
                  <div className="w-full aspect-video bg-[#1a1a1a] rounded-lg mb-6 flex items-center justify-center group-hover:bg-[#222] transition-colors">
                    <span className="text-[#333] text-4xl font-bold">{product.id}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#888] text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-1">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="text-[#666] text-xs flex items-center gap-2">
                        <span className="text-[#4A90D9]">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 강점 */}
        <section className="py-24 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">왜 상승종합통신인가</h2>
            <p className="text-[#888] mb-12">20년 이상의 노하우와 기술력으로 최고의 LED 솔루션을 제공합니다.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#0A0A0A] rounded-xl p-6">
                  <div className="text-[#4A90D9] mb-4">{feature.icon}</div>
                  <h3 className="text-white text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              프로젝트 상담이 필요하신가요?
            </h2>
            <p className="text-[#888] mb-8">
              전문 상담원이 귀사에 최적화된 LED 솔루션을 제안해 드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#4A90D9] text-white px-8 py-4 rounded font-semibold hover:bg-[#3A80C9] transition-colors"
            >
              문의하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
