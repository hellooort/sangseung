"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/locale";

const benefits = [
  { title_ko: "성능 보장", title_en: "Performance",  description_ko: "최상의 성능으로 시스템 운영", description_en: "Keep systems running at peak performance", image: "/image/reference/work_1.jpg" },
  { title_ko: "보안 강화", title_en: "Security",     description_ko: "철저한 보안으로 안전 보호",   description_en: "Strict security for stronger protection",  image: "/image/reference/work_2.jpg" },
  { title_ko: "장애 예방", title_en: "Prevention",   description_ko: "선제적 점검으로 장애 예방",   description_en: "Proactive checks prevent failures",        image: "/image/reference/work_3.jpg" },
  { title_ko: "안정 운영", title_en: "Reliability",  description_ko: "지속 관리로 안정적인 운영",   description_en: "Stable operation through continuous care", image: "/image/reference/work_4.jpg" },
  { title_ko: "비용 절감", title_en: "Cost Saving",  description_ko: "효율적 관리로 운영비 절감",   description_en: "Efficient management lowers OPEX",         image: "/image/reference/work_5.jpg" },
];

const expertiseCards = [
  {
    title_ko: "설계/시공/감리/유지보수\n통합 보유 면허",
    title_en: "Integrated Licenses\nDesign / Build / Supervision / Maintenance",
    items_ko: ["정보통신공사업", "정보통신엔지니어링", "소프트웨어사업"],
    items_en: ["ICT Construction", "ICT Engineering", "Software Business"],
  },
  {
    title_ko: "정보통신 시스템 직접 생산",
    title_en: "Direct ICT System Production",
    items_ko: ["IT 시스템 개발", "IT 시스템 유지보수", "소프트웨어 지원 및 컨설팅", "IT 인프라 구축"],
    items_en: ["IT System Development", "IT System Maintenance", "Software Support", "IT Infrastructure Build"],
  },
  {
    title_ko: "최신 ICT 기술과\n현장 경험을 갖춘 전문가",
    title_en: "Experts in Cutting-edge ICT\nand Hands-on Skill",
    items_ko: ["기업부설 연구소", "20년 이상 축적된 노하우", "전문 자격 보유 인력"],
    items_en: ["In-house R&D Institute", "20+ Years of Know-how", "Certified Specialists"],
  },
  {
    title_ko: "검증된 안전관리 체계\n무사고/무재해",
    title_en: "Proven Safety Management\nZero Incidents",
    items_ko: ["ISO 45001 안전보건경영시스템", "ISO 9001 품질경영시스템", "ISO 14001 환경경영시스템"],
    items_en: ["ISO 45001 OHS Management", "ISO 9001 Quality Management", "ISO 14001 Environmental Management"],
  },
];

const performanceTabs = [
  {
    id: "maintenance",
    label_ko: "정보통신 유지보수 · 관리",
    label_en: "ICT Maintenance & Management",
    items: [
      { title_ko: "대학 캠퍼스 유지보수",       title_en: "University Campus Maintenance",  subtitle_ko: "연 면적 5.3만㎡", subtitle_en: "53,000 m²/yr", image: "/image/reference/work_6.jpg" },
      { title_ko: "식음료 공장 네트워크 구축", title_en: "Food/Beverage Plant Network",   subtitle_ko: "연 면적 3.6만㎡", subtitle_en: "36,000 m²/yr", image: "/image/reference/work_7.jpg" },
      { title_ko: "생활용품 제조사 유지보수",   title_en: "Consumer Goods Factory",        subtitle_ko: "연 면적 2.7만㎡", subtitle_en: "27,000 m²/yr", image: "/image/reference/work_8.jpg" },
      { title_ko: "철강 제조 공장 유지보수",   title_en: "Steel Manufacturing Plant",     subtitle_ko: "연 면적 1.5만㎡", subtitle_en: "15,000 m²/yr", image: "/image/reference/work_9.jpg" },
      { title_ko: "공공기관 시설 유지보수",     title_en: "Public Institution Maintenance", subtitle_ko: "연 면적 4.2만㎡", subtitle_en: "42,000 m²/yr", image: "/image/reference/work_10.jpg" },
    ],
  },
  {
    id: "ict",
    label_ko: "정보통신 프로젝트",
    label_en: "ICT Projects",
    items: [
      { title_ko: "쇼핑몰 옥외 LED 디스플레이 구축", title_en: "Mall LED Display Build",       subtitle_ko: "옥외 LED 600㎡",       subtitle_en: "600 m² Outdoor LED",          image: "/image/reference/work_11.jpg" },
      { title_ko: "관제센터 Video-Wall 구축",         title_en: "Control Center Video-Wall",     subtitle_ko: "CALICO PRO 적용",      subtitle_en: "Powered by CALICO PRO",       image: "/image/reference/work_12.jpg" },
      { title_ko: "기업 본사 IBS 구축",               title_en: "Corporate HQ IBS",              subtitle_ko: "지능형 빌딩 시스템",   subtitle_en: "Intelligent Building System", image: "/image/reference/work_13.jpg" },
      { title_ko: "해외 호텔 네트워크 구축",          title_en: "Overseas Hotel Network",        subtitle_ko: "GUAM / Thailand",      subtitle_en: "Guam / Thailand",             image: "/image/reference/work_14.jpg" },
    ],
  },
];

export default function MaintenanceClient({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState("maintenance");
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const currentTab = performanceTabs.find((tab) => tab.id === activeTab) ?? performanceTabs[0];

  return (
    <>
      <section className="relative h-[560px] md:h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/image/reference/work_15.jpg" alt="Maintenance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-20 pt-20">
          <p className="text-[#F5A623] text-sm md:text-base font-medium tracking-[0.25em] mb-5">
            Specialists in Reliable ICT
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t("ICT 유지보수 및 관리", "ICT Maintenance & Management")}
          </h1>
          <p className="text-white/85 text-base md:text-lg mb-10 max-w-xl">
            {t(
              "상승종합통신은 최고의 품질로 신뢰를 제공하는 ICT 전문 기업입니다.",
              "SANGSEUNG is an ICT specialist delivering best-in-class quality.",
            )}
          </p>
          <Link href="/contact" className="inline-block border border-white text-white px-8 py-3 rounded text-sm font-medium hover:bg-white hover:text-black transition-colors">
            {t("문의하기", "Contact Us")}
          </Link>
        </div>
      </section>

      <section className="relative py-24 px-6 lg:px-20 bg-[#0B1E3F] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(74,144,217,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(74,144,217,0.3) 0, transparent 40%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div>
              <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Business</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {t("주요 사업 분야", "Main Business Areas")}
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {t(
                  "상승종합통신이 최고의 품질과\n서비스를 제공합니다.",
                  "SANGSEUNG delivers the highest quality\nand service.",
                ).split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>

            <Link href="/business/maintenance" className="group relative aspect-square rounded-xl overflow-hidden">
              <Image src="/image/reference/work_16.jpg" alt="Maintenance" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="text-white text-lg md:text-xl font-bold leading-snug whitespace-pre-line">
                  {t("ICT 시설\n유지보수", "ICT Facility\nMaintenance")}
                </h3>
                <svg className="w-6 h-6 text-white shrink-0 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            <Link href="/business/network" className="group relative aspect-square rounded-xl overflow-hidden">
              <Image src="/image/reference/work_17.jpg" alt="Network" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="text-white text-lg md:text-xl font-bold leading-snug">{t("네트워크", "Network")}</h3>
                <svg className="w-6 h-6 text-white shrink-0 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="bg-[#3B2B8F] rounded-r-[80px] lg:rounded-r-[120px] -ml-6 lg:-ml-20 px-6 lg:px-20 py-16 lg:py-20">
                <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Maintenance &amp; Management</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-line">
                  {t("ICT 시설\n유지보수 및 관리", "ICT Facility\nMaintenance & Management")}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {benefits.map((b, idx) => (
                <div key={b.title_ko} className={`bg-white rounded-xl overflow-hidden shadow-lg ${idx === 1 ? "lg:mt-12" : idx === 2 ? "lg:-mt-6" : idx === 3 ? "lg:mt-6" : idx === 4 ? "lg:-mt-6" : ""}`}>
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image src={b.image} alt={b.title_ko} fill className="object-cover" />
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="text-gray-900 text-base md:text-lg font-bold mb-1">{t(b.title_ko, b.title_en)}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">{t(b.description_ko, b.description_en)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 lg:px-20 bg-[#0B1E3F] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(74,144,217,0.35) 0, transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Accumulated Expertise and Technology</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t("축적된 전문성과 기술력", "Accumulated Expertise & Technology")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertiseCards.map((card, idx) => (
              <div key={idx} className="bg-[#0A1628] border border-white/10 rounded-2xl p-10 lg:p-12 text-center hover:border-[#4A90D9]/40 transition-colors">
                <h3 className="text-white text-xl md:text-2xl font-bold whitespace-pre-line leading-snug mb-6">
                  {t(card.title_ko, card.title_en)}
                </h3>
                <div className="space-y-1.5 text-white/60 text-sm">
                  {(locale === "en" ? card.items_en : card.items_ko).map((item, i) => (<p key={i}>{item}</p>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 lg:px-20 bg-[#F6F8FB] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Business performance</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {t("주요 시공 실적", "Key Performance")}
            </h2>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {performanceTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${activeTab === tab.id ? "bg-[#3B2B8F] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#3B2B8F]"}`}>
                {t(tab.label_ko, tab.label_en)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTab.items.slice(0, 4).map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image src={item.image} alt={item.title_ko} fill className="object-cover" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-900 text-base font-bold mb-1">{t(item.title_ko, item.title_en)}</h3>
                  <p className="text-gray-500 text-sm">{t(item.subtitle_ko, item.subtitle_en)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6 lg:px-20 bg-gradient-to-r from-[#8CA5BF] to-[#A8BED6] overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.5) 0, transparent 40%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white/90 text-sm font-medium mb-2">{t("설계 / 시공 / 컨설팅", "Design / Build / Consulting")}</p>
              <p className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-3">02-953-0056</p>
              <p className="text-white/80 text-sm">
                {t("자세한 상담 및 견적 문의는 전화로 연락주세요",
                  "Call us for detailed consultation and quotation")}
              </p>
            </div>
            <Link href="/contact" className="inline-block bg-white text-[#0B1E3F] px-8 py-3 rounded font-semibold hover:bg-white/90 transition-colors">
              {t("문의하기", "Contact Us")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
