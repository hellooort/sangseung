import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";

const products = [
  {
    id: 1,
    name: "COB LED",
    specs_ko: ["전면 손상 방지·방수", "쉬운 청소", "낮은 픽셀 불량률"],
    specs_en: ["Front damage protection and waterproof", "Easy Cleaning", "Low Pixel Error Rate"],
    image: "/image/SCO-Wall/1-1.png",
    href: "/business/led/cob",
  },
  {
    id: 2,
    name: "Indoor Fixed",
    specs_ko: ["고화질 LED 비디오월", "지능형 전원 관리", "낮은 픽셀 불량률"],
    specs_en: ["High Quality LED Video Wall", "Intelligent Power Management", "Low Pixel Error Rate"],
    image: "/image/S-Wall/2.jpg",
    href: "/business/led/indoor",
  },
  {
    id: 3,
    name: "Outdoor Fixed",
    specs_ko: ["이중 방수 설계", "P to P 병렬 연결", "전면·후면 유지보수 접근"],
    specs_en: ["Double waterproof design", "P to P Parallel Connection", "Front and Rear Access for Maintenance"],
    image: "/image/SOD-C/SOD-C_main_img_sample.jpg",
    href: "/business/led/outdoor",
  },
  {
    id: 4,
    name: "Rental",
    specs_ko: ["빠른 설치", "지능형 모니터링", "다양한 설치 모드"],
    specs_en: ["Quick Installation", "Intelligent Management Monitoring", "Various Installation Modes"],
    image: "/image/SFD/2.jpg",
    href: "/business/led/rental",
  },
  {
    id: 5,
    name: "Media Facade",
    specs_ko: ["초슬림·경량", "높은 투과율", "창의적 디자인"],
    specs_en: ["Ultra Slim & Lightweight", "High Transparency", "Creative Design"],
    image: "/image/SMI/1.jpg",
    href: "/business/led/facade",
  },
  {
    id: 6,
    name: "AD Sign",
    specs_ko: ["클라우드 기반 LED 디스플레이 시스템", "스마트 콘텐츠 제어", "개별·그룹 관리"],
    specs_en: ["Cloud Based LED Display System", "Smart Content Control", "Individual and Group Management"],
    image: "/image/AD Cloud/AD Cloud_main.jpg",
    href: "/business/led/adsign",
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title_ko: "자체 기술력",
    title_en: "In-house Technology",
    description_ko: "기업부설연구소 운영을 통한 지속적인 R&D와 자체 기술 개발",
    description_en: "Continuous R&D and proprietary technology developed in our in-house research institute.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title_ko: "자체 생산 공장",
    title_en: "In-house Manufacturing",
    description_ko: "양주공장과 중국공장 보유로 신속한 생산 및 품질 관리",
    description_en: "Yangju and China factories ensure fast production and quality control.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title_ko: "글로벌 네트워크",
    title_en: "Global Network",
    description_ko: "태국, 일본, 중국 등 해외 지사 운영으로 글로벌 서비스 제공",
    description_en: "Overseas branches in Thailand, Japan, and China deliver global services.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title_ko: "원스톱 솔루션",
    title_en: "One-Stop Solution",
    description_ko: "기획, 설계, 제작, 시공, 유지보수까지 전 과정 일괄 수행",
    description_en: "Planning, design, manufacturing, installation, and maintenance all in one place.",
  },
];

export default async function LEDBusinessPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="relative py-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/image/reference/work_8.jpg" alt="LED Display" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">LED DISPLAY</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("LED 디스플레이", "LED Display")}
          </h1>
          <p className="text-[#ccc] text-lg max-w-2xl leading-relaxed mb-8">
            {t(
              "설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.",
              "A one-stop solution specialist covering everything from design and manufacturing to installation and maintenance of LED displays.",
            )}
          </p>
          <Link
            href="/works"
            className="inline-block border border-[#4A90D9] text-[#4A90D9] px-8 py-3 rounded font-medium hover:bg-[#4A90D9] hover:text-white transition-colors"
          >
            {t("시공사례 보기", "View Projects")}
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("제품 라인업", "Product Lineup")}</h2>
          <p className="text-[#888] mb-12">
            {t("다양한 환경과 용도에 맞는 최적의 LED 솔루션을 제공합니다.",
              "Optimal LED solutions for diverse environments and use cases.")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => {
              const specs = locale === "en" ? product.specs_en : product.specs_ko;
              return (
                <Link key={product.id} href={product.href} className="relative aspect-[3/4] rounded-xl overflow-hidden group block">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                  <div className="absolute inset-0 p-5 flex flex-col">
                    <h3 className="text-white text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                      {product.name}
                    </h3>
                    <ul className="space-y-1.5 mt-auto">
                      {specs.map((spec, index) => (
                        <li key={index} className="text-white/85 text-xs leading-snug flex items-start gap-1.5">
                          <span className="text-white/60">-</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("왜 상승종합통신인가", "Why SANGSEUNG?")}
          </h2>
          <p className="text-[#888] mb-12">
            {t("20년 이상의 노하우와 기술력으로 최고의 LED 솔루션을 제공합니다.",
              "Over 20 years of know-how and technical expertise behind every LED solution.")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#0A0A0A] rounded-xl p-6">
                <div className="text-[#4A90D9] mb-4">{feature.icon}</div>
                <h3 className="text-white text-lg font-bold mb-2">{t(feature.title_ko, feature.title_en)}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{t(feature.description_ko, feature.description_en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("프로젝트 상담이 필요하신가요?", "Need help with your project?")}
          </h2>
          <p className="text-white/80 mb-8">
            {t("전문 상담원이 귀사에 최적화된 LED 솔루션을 제안해 드립니다.",
              "Our specialists will propose the LED solution best suited to your business.")}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
          >
            {t("문의하기", "Contact Us")}
          </Link>
        </div>
      </section>
    </>
  );
}
