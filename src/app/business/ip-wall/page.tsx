import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const features = [
  {
    title: "IP 기반 영상 분배",
    description: "네트워크를 통한 고화질 영상 전송으로 장거리 배선 없이도 다수의 디스플레이에 동시 송출이 가능합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
      </svg>
    ),
  },
  {
    title: "다채널 동시 송출",
    description: "하나의 컨트롤러에서 여러 디스플레이에 각각 다른 콘텐츠를 동시에 송출할 수 있습니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "원격 관리 시스템",
    description: "웹 기반 인터페이스로 어디서든 디스플레이 상태 확인 및 콘텐츠 관리가 가능합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "확장형 구조",
    description: "필요에 따라 디스플레이를 자유롭게 추가·제거할 수 있는 유연한 확장형 아키텍처입니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const useCases = [
  { title: "관제센터", description: "24시간 통합 모니터링 환경 구축" },
  { title: "기업 로비", description: "브랜드 이미지 전달 디지털 사이니지" },
  { title: "회의실", description: "고품질 화상회의 및 프레젠테이션" },
  { title: "전시장", description: "대규모 미디어 아트 및 전시 연출" },
  { title: "교육기관", description: "강의실 및 캠퍼스 정보 시스템" },
  { title: "공공기관", description: "민원 안내 및 정보 표출 시스템" },
];

export default function IPWallPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-[#0d1b2a] to-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#666] mb-8">
              <Link href="/business" className="hover:text-[#4A90D9] transition-colors">사업소개</Link>
              <span>/</span>
              <span className="text-[#4A90D9]">IP-Wall</span>
            </div>
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              IP-WALL SOLUTION
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IP-Wall
            </h1>
            <p className="text-[#ccc] text-lg max-w-2xl leading-relaxed mb-8">
              IP 기반의 차세대 비디오월 솔루션으로, 네트워크를 통해 다수의 디스플레이를
              통합 관리하고 고화질 영상을 실시간으로 분배합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#4A90D9] text-white px-8 py-3 rounded font-medium hover:bg-[#3A7BC8] transition-colors"
            >
              문의하기
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">주요 특징</h2>
            <p className="text-[#888] text-center mb-16 max-w-2xl mx-auto">
              기존 영상 분배 방식의 한계를 넘어, IP 네트워크 기반으로 유연하고 확장 가능한 비디오월 환경을 구현합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#111] rounded-2xl p-8 hover:bg-[#1a1a1a] transition-colors">
                  <div className="w-14 h-14 bg-[#4A90D9]/10 rounded-xl flex items-center justify-center text-[#4A90D9] mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#888] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">활용 분야</h2>
            <p className="text-[#888] text-center mb-16">다양한 산업 분야에서 IP-Wall 솔루션을 활용하고 있습니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-[#0A0A0A] rounded-xl p-6 border border-white/5 hover:border-[#4A90D9]/30 transition-colors">
                  <span className="text-[#4A90D9] text-xs font-medium mb-3 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-white text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-[#888] text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              IP-Wall 도입을 검토하고 계신가요?
            </h2>
            <p className="text-white/80 mb-8">
              전문 상담원이 귀사의 환경에 최적화된 IP-Wall 솔루션을 제안해 드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
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
