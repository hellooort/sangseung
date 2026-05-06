import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface LedProductCard {
  id?: string;
  name: string;
  href: string;
  image: string;
  specs_ko: string;
  specs_en: string;
}

interface LedFeatureItem {
  id?: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

interface LedPageData {
  hero: {
    badge_en: string;
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    image: string;
    cta_label_ko: string;
    cta_label_en: string;
    cta_href: string;
  };
  productsHeading_ko: string;
  productsHeading_en: string;
  productsLead_ko: string;
  productsLead_en: string;
  products: LedProductCard[];
  featuresHeading_ko: string;
  featuresHeading_en: string;
  featuresLead_ko: string;
  featuresLead_en: string;
  features: LedFeatureItem[];
  cta: {
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    button_ko: string;
    button_en: string;
    button_href: string;
  };
}

const fallback: LedPageData = {
  hero: {
    badge_en: "LED DISPLAY",
    title_ko: "LED 디스플레이",
    title_en: "LED Display",
    description_ko: "설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.",
    description_en: "A one-stop solution specialist covering everything from design and manufacturing to installation and maintenance of LED displays.",
    image: "/image/reference/work_8.jpg",
    cta_label_ko: "시공사례 보기",
    cta_label_en: "View Projects",
    cta_href: "/works",
  },
  productsHeading_ko: "제품 라인업",
  productsHeading_en: "Product Lineup",
  productsLead_ko: "다양한 환경과 용도에 맞는 최적의 LED 솔루션을 제공합니다.",
  productsLead_en: "Optimal LED solutions for diverse environments and use cases.",
  products: [
    { name: "COB LED",       href: "/business/led/cob",     image: "/image/SCO-Wall/1-1.png",                    specs_ko: "전면 손상 방지·방수\n쉬운 청소\n낮은 픽셀 불량률",                    specs_en: "Front damage protection and waterproof\nEasy Cleaning\nLow Pixel Error Rate" },
    { name: "Indoor Fixed",  href: "/business/led/indoor",  image: "/image/S-Wall/2.jpg",                        specs_ko: "고화질 LED 비디오월\n지능형 전원 관리\n낮은 픽셀 불량률",              specs_en: "High Quality LED Video Wall\nIntelligent Power Management\nLow Pixel Error Rate" },
    { name: "Outdoor Fixed", href: "/business/led/outdoor", image: "/image/SOD-C/SOD-C_main_img_sample.jpg",     specs_ko: "이중 방수 설계\nP to P 병렬 연결\n전면·후면 유지보수 접근",            specs_en: "Double waterproof design\nP to P Parallel Connection\nFront and Rear Access for Maintenance" },
    { name: "Rental",        href: "/business/led/rental",  image: "/image/SFD/2.jpg",                           specs_ko: "빠른 설치\n지능형 모니터링\n다양한 설치 모드",                          specs_en: "Quick Installation\nIntelligent Management Monitoring\nVarious Installation Modes" },
    { name: "Media Facade",  href: "/business/led/facade",  image: "/image/SMI/1.jpg",                           specs_ko: "초슬림·경량\n높은 투과율\n창의적 디자인",                                specs_en: "Ultra Slim & Lightweight\nHigh Transparency\nCreative Design" },
    { name: "AD Sign",       href: "/business/led/adsign",  image: "/image/AD Cloud/AD Cloud_main.jpg",          specs_ko: "클라우드 기반 LED 디스플레이 시스템\n스마트 콘텐츠 제어\n개별·그룹 관리", specs_en: "Cloud Based LED Display System\nSmart Content Control\nIndividual and Group Management" },
  ],
  featuresHeading_ko: "왜 상승종합통신인가",
  featuresHeading_en: "Why SANGSEUNG?",
  featuresLead_ko: "20년 이상의 노하우와 기술력으로 최고의 LED 솔루션을 제공합니다.",
  featuresLead_en: "Over 20 years of know-how and technical expertise behind every LED solution.",
  features: [
    { title_ko: "자체 기술력",      title_en: "In-house Technology",     description_ko: "기업부설연구소 운영을 통한 지속적인 R&D와 자체 기술 개발",      description_en: "Continuous R&D and proprietary technology developed in our in-house research institute." },
    { title_ko: "자체 생산 공장",   title_en: "In-house Manufacturing",  description_ko: "양주공장과 중국공장 보유로 신속한 생산 및 품질 관리",            description_en: "Yangju and China factories ensure fast production and quality control." },
    { title_ko: "글로벌 네트워크", title_en: "Global Network",          description_ko: "태국, 일본, 중국 등 해외 지사 운영으로 글로벌 서비스 제공",       description_en: "Overseas branches in Thailand, Japan, and China deliver global services." },
    { title_ko: "원스톱 솔루션",    title_en: "One-Stop Solution",       description_ko: "기획, 설계, 제작, 시공, 유지보수까지 전 과정 일괄 수행",         description_en: "Planning, design, manufacturing, installation, and maintenance all in one place." },
  ],
  cta: {
    title_ko: "프로젝트 상담이 필요하신가요?",
    title_en: "Need help with your project?",
    description_ko: "전문 상담원이 귀사에 최적화된 LED 솔루션을 제안해 드립니다.",
    description_en: "Our specialists will propose the LED solution best suited to your business.",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
};

const splitLines = (s: string) =>
  s.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

export default async function LEDBusinessPage() {
  const [locale, data] = await Promise.all([
    getLocale(),
    getSiteSetting<LedPageData>("page_led", fallback),
  ]);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="relative py-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0">
          {data.hero.image && (
            <Image src={data.hero.image} alt={data.hero.title_ko} fill className="object-cover opacity-30" unoptimized />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">{data.hero.badge_en}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {tr(locale, data.hero.title_ko, data.hero.title_en)}
          </h1>
          <p className="text-[#ccc] text-lg max-w-2xl leading-relaxed mb-8">
            {tr(locale, data.hero.description_ko, data.hero.description_en)}
          </p>
          {(data.hero.cta_label_ko || data.hero.cta_label_en) && (
            <Link
              href={data.hero.cta_href || "/works"}
              className="inline-block border border-[#4A90D9] text-[#4A90D9] px-8 py-3 rounded font-medium hover:bg-[#4A90D9] hover:text-white transition-colors"
            >
              {tr(locale, data.hero.cta_label_ko, data.hero.cta_label_en)}
            </Link>
          )}
        </div>
      </section>

      {data.products.length > 0 && (
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {tr(locale, data.productsHeading_ko, data.productsHeading_en)}
            </h2>
            <p className="text-[#888] mb-12">
              {tr(locale, data.productsLead_ko, data.productsLead_en)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {data.products.map((product, i) => {
                const specs = splitLines(locale === "en" && product.specs_en ? product.specs_en : product.specs_ko);
                return (
                  <Link key={product.id ?? i} href={product.href || "#"} className="relative aspect-[3/4] rounded-xl overflow-hidden group block">
                    {product.image && (
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                    <div className="absolute inset-0 p-5 flex flex-col">
                      <h3 className="text-white text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                        {product.name}
                      </h3>
                      <ul className="space-y-1.5 mt-auto">
                        {specs.map((spec, idx) => (
                          <li key={idx} className="text-white/85 text-xs leading-snug flex items-start gap-1.5">
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
      )}

      {data.features.length > 0 && (
        <section className="py-24 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {tr(locale, data.featuresHeading_ko, data.featuresHeading_en)}
            </h2>
            <p className="text-[#888] mb-12">
              {tr(locale, data.featuresLead_ko, data.featuresLead_en)}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.features.map((feature, i) => (
                <div key={feature.id ?? i} className="bg-[#0A0A0A] rounded-xl p-6">
                  <div className="text-[#4A90D9] mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{tr(locale, feature.title_ko, feature.title_en)}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{tr(locale, feature.description_ko, feature.description_en)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {tr(locale, data.cta.title_ko, data.cta.title_en)}
          </h2>
          <p className="text-white/80 mb-8">
            {tr(locale, data.cta.description_ko, data.cta.description_en)}
          </p>
          <Link href={data.cta.button_href || "/contact"} className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors">
            {tr(locale, data.cta.button_ko, data.cta.button_en) || t("문의하기", "Contact Us")}
          </Link>
        </div>
      </section>
    </>
  );
}
