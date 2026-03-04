import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const networkCategories = [
  {
    title: "IBS 통합시스템",
    description: "통합배선공사, CCTV, CATV, AV, 서버실 구축 등 건물 인프라 전반을 담당합니다.",
    href: "/business/network/ibs",
    image: "/image/reference/work_3.jpg",
  },
  {
    title: "해외 프로젝트",
    description: "GUAM, 일본, 사이판, 사우디아라비아, 태국, 말레이시아 등 글로벌 프로젝트를 수행합니다.",
    href: "/business/network/overseas",
    image: "/image/reference/work_5.jpg",
  },
  {
    title: "공사실적",
    description: "2003년부터 현재까지 수행한 국내외 네트워크 인프라 구축 실적입니다.",
    href: "/business/network/projects",
    image: "/image/reference/work_7.jpg",
  },
];

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "통합배선공사 (UTP/광)",
    description: "카테고리6 이상 UTP 케이블 및 광케이블 인프라 구축",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "CCTV / CATV",
    description: "보안 감시 시스템 및 방송 설비 구축",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    title: "서버실 구축",
    description: "항온항습, 전원, 보안이 완비된 전산실 구축",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AV 시스템",
    description: "영상 회의, 전자칠판, 디지털 사이니지 등 시청각 시스템",
  },
];

export default function NetworkBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/image/reference/work_4.jpg"
              alt="Network Infrastructure"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          </div>
          <div className="relative z-20 text-center px-6">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              NETWORK BUSINESS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              네트워크 사업
            </h1>
            <p className="text-[#ccc] text-lg max-w-2xl mx-auto">
              IBS 통합시스템부터 글로벌 프로젝트까지, 
              최고의 네트워크 인프라 솔루션을 제공합니다.
            </p>
          </div>
        </section>

        {/* 서비스 영역 */}
        <section className="py-20 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">주요 서비스</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="text-center p-6">
                  <div className="text-[#4A90D9] mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-white font-bold mb-2">{service.title}</h3>
                  <p className="text-[#888] text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">사업 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {networkCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#222] transition-all"
                >
                  <div className="relative h-48 bg-[#2a2a2a]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              네트워크 인프라 구축이 필요하신가요?
            </h2>
            <p className="text-white/80 mb-8">
              20년 이상의 경험을 바탕으로 최적의 솔루션을 제안해 드립니다.
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
