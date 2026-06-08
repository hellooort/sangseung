import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface NetworkServiceItem {
  id?: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

interface NetworkSubCategory {
  id?: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  href: string;
  image: string;
}

interface NetworkPageData {
  hero: {
    badge_en: string;
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    image: string;
  };
  servicesHeading_ko: string;
  servicesHeading_en: string;
  services: NetworkServiceItem[];
  categoriesHeading_ko: string;
  categoriesHeading_en: string;
  categories: NetworkSubCategory[];
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

const fallback: NetworkPageData = {
  hero: {
    badge_en: "NETWORK BUSINESS",
    title_ko: "네트워크 사업",
    title_en: "Network Business",
    description_ko: "IBS 통합시스템부터 글로벌 프로젝트까지, 최고의 네트워크 인프라 솔루션을 제공합니다.",
    description_en: "From IBS integration to global projects — best-in-class network infrastructure solutions.",
    image: "/image/reference/work_4.jpg",
  },
  servicesHeading_ko: "주요 서비스",
  servicesHeading_en: "Key Services",
  services: [
    { title_ko: "통합배선공사 (UTP/광)", title_en: "Structured Cabling (UTP/Fiber)", description_ko: "카테고리6 이상 UTP 케이블 및 광케이블 인프라 구축", description_en: "Cat 6+ UTP and fiber-optic cabling infrastructure" },
    { title_ko: "CCTV / CATV",          title_en: "CCTV / CATV",                description_ko: "보안 감시 시스템 및 방송 설비 구축",                          description_en: "Security surveillance and broadcast facility installation" },
    { title_ko: "서버실 구축",          title_en: "Server Room Build-out",      description_ko: "항온항습, 전원, 보안이 완비된 전산실 구축",                  description_en: "Server rooms with HVAC, power, and security" },
    { title_ko: "AV 시스템",            title_en: "AV Systems",                 description_ko: "영상 회의, 전자칠판, 디지털 사이니지 등 시청각 시스템",       description_en: "Video conferencing, interactive boards, digital signage, and more" },
    { title_ko: "유지보수",             title_en: "Maintenance",                description_ko: "정보통신설비 성능/보안/안정성 지속 관리 및 장애 예방",         description_en: "Ongoing performance, security, and stability management for ICT facilities" },
  ],
  categoriesHeading_ko: "사업 분야",
  categoriesHeading_en: "Business Areas",
  categories: [
    { title_ko: "IBS 통합시스템",  title_en: "IBS Integrated System", description_ko: "통합배선공사, CCTV, CATV, AV, 서버실 구축 등 건물 인프라 전반을 담당합니다.", description_en: "Comprehensive building infrastructure including structured cabling, CCTV, CATV, AV, and server room construction.", href: "/business/network/ibs", image: "/image/reference/work_3.jpg" },
    { title_ko: "해외 프로젝트",  title_en: "Overseas Projects",     description_ko: "GUAM, 일본, 사이판, 사우디아라비아, 태국, 말레이시아 등 글로벌 프로젝트를 수행합니다.", description_en: "Global delivery in Guam, Japan, Saipan, Saudi Arabia, Thailand, Malaysia, and more.", href: "/business/network/overseas", image: "/image/reference/work_5.jpg" },
    { title_ko: "공사실적",        title_en: "Project Records",       description_ko: "2003년부터 현재까지 수행한 국내외 네트워크 인프라 구축 실적입니다.", description_en: "Domestic and overseas network infrastructure projects delivered since 2003.", href: "/business/network/projects", image: "/image/reference/work_7.jpg" },
  ],
  cta: {
    title_ko: "네트워크 인프라 구축이 필요하신가요?",
    title_en: "Need network infrastructure built?",
    description_ko: "20년 이상의 경험을 바탕으로 최적의 솔루션을 제안해 드립니다.",
    description_en: "Drawing on 20+ years of experience, we propose the optimal solution.",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
};

export default async function NetworkBusinessPage() {
  const [locale, data] = await Promise.all([
    getLocale(),
    getSiteSetting<NetworkPageData>("page_network", fallback),
  ]);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] md:aspect-video">
        <div className="relative aspect-video md:absolute md:inset-0 md:aspect-auto">
          {data.hero.image && (
            <Image src={data.hero.image} alt={data.hero.title_ko} fill className="object-cover" unoptimized />
          )}
          <div className="hidden md:block absolute inset-0 bg-black/55" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>
        <div className="relative z-20 md:absolute md:inset-0 md:flex md:items-center md:justify-center">
          <div className="text-center px-6 py-10 md:py-0 max-w-3xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">{data.hero.badge_en}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {tr(locale, data.hero.title_ko, data.hero.title_en)}
            </h1>
            <p className="text-[#ccc] text-base md:text-lg max-w-2xl mx-auto">
              {tr(locale, data.hero.description_ko, data.hero.description_en)}
            </p>
          </div>
        </div>
      </section>

      {data.services.length > 0 && (
        <section className="py-20 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
              {tr(locale, data.servicesHeading_ko, data.servicesHeading_en)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.services.map((service, index) => (
                <div key={service.id ?? index} className="text-center p-6">
                  <div className="text-[#4A90D9] mb-4 flex justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold mb-2">{tr(locale, service.title_ko, service.title_en)}</h3>
                  <p className="text-[#888] text-sm">{tr(locale, service.description_ko, service.description_en)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.categories.length > 0 && (
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
              {tr(locale, data.categoriesHeading_ko, data.categoriesHeading_en)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.categories.map((category, i) => (
                <Link
                  key={category.id ?? i}
                  href={category.href || "#"}
                  className="group block bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#222] transition-all"
                >
                  <div className="relative aspect-[3/2] bg-[#2a2a2a]">
                    {category.image && (
                      <Image src={category.image} alt={category.title_ko} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                      {tr(locale, category.title_ko, category.title_en)}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {tr(locale, category.description_ko, category.description_en)}
                    </p>
                  </div>
                </Link>
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
