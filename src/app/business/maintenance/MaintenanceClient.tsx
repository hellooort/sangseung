"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

export interface BenefitItem {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  image: string;
}
export interface ExpertiseCard {
  id: string;
  title_ko: string;
  title_en: string;
  items_ko: string;
  items_en: string;
}
export interface PerformanceItem {
  id: string;
  title_ko: string;
  title_en: string;
  subtitle_ko: string;
  subtitle_en: string;
  image: string;
}
export interface PerformanceTab {
  id: string;
  label_ko: string;
  label_en: string;
  items: PerformanceItem[];
}

export interface MaintenanceData {
  hero: {
    badge_en: string;
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    image: string;
    ctaLabel_ko: string;
    ctaLabel_en: string;
    ctaHref: string;
  };
  ctaPhone: {
    label_ko: string;
    label_en: string;
    phone: string;
    description_ko: string;
    description_en: string;
    button_ko: string;
    button_en: string;
    button_href: string;
  };
  benefits: BenefitItem[];
  expertiseCards: ExpertiseCard[];
  performanceTabs: PerformanceTab[];
}

interface Props {
  locale: Locale;
  data: MaintenanceData;
}

export default function MaintenanceClient({ locale, data }: Props) {
  const [activeTab, setActiveTab] = useState(data.performanceTabs[0]?.id ?? "");
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const currentTab = data.performanceTabs.find((tab) => tab.id === activeTab) ?? data.performanceTabs[0];

  const splitLines = (s: string) => s.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  return (
    <>
      <section className="relative h-[560px] md:h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {data.hero.image && (
            <Image src={data.hero.image} alt="Maintenance" fill className="object-cover" priority unoptimized />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-20 pt-20">
          <p className="text-[#F5A623] text-sm md:text-base font-medium tracking-[0.25em] mb-5">
            {data.hero.badge_en}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
            {tr(locale, data.hero.title_ko, data.hero.title_en)}
          </h1>
          <p className="text-white/85 text-base md:text-lg mb-10 max-w-xl whitespace-pre-line">
            {tr(locale, data.hero.description_ko, data.hero.description_en)}
          </p>
          <Link href={data.hero.ctaHref || "/contact"} className="inline-block border border-white text-white px-8 py-3 rounded text-sm font-medium hover:bg-white hover:text-black transition-colors">
            {tr(locale, data.hero.ctaLabel_ko, data.hero.ctaLabel_en)}
          </Link>
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
              {data.benefits.map((b, idx) => (
                <div key={b.id} className={`bg-white rounded-xl overflow-hidden shadow-lg ${idx === 1 ? "lg:mt-12" : idx === 2 ? "lg:-mt-6" : idx === 3 ? "lg:mt-6" : idx === 4 ? "lg:-mt-6" : ""}`}>
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {b.image && <Image src={b.image} alt={b.title_ko} fill className="object-cover" unoptimized />}
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="text-gray-900 text-base md:text-lg font-bold mb-1">{tr(locale, b.title_ko, b.title_en)}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">{tr(locale, b.description_ko, b.description_en)}</p>
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
            {data.expertiseCards.map((card) => (
              <div key={card.id} className="bg-[#0A1628] border border-white/10 rounded-2xl p-10 lg:p-12 text-center hover:border-[#4A90D9]/40 transition-colors">
                <h3 className="text-white text-xl md:text-2xl font-bold whitespace-pre-line leading-snug mb-6">
                  {tr(locale, card.title_ko, card.title_en)}
                </h3>
                <div className="space-y-1.5 text-white/60 text-sm">
                  {splitLines(locale === "en" && card.items_en ? card.items_en : card.items_ko).map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.performanceTabs.length > 0 && currentTab && (
        <section className="relative py-24 px-6 lg:px-20 bg-[#F6F8FB] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Business performance</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {t("주요 시공 실적", "Key Performance")}
              </h2>
            </div>

            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {data.performanceTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${activeTab === tab.id ? "bg-[#3B2B8F] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#3B2B8F]"}`}>
                  {tr(locale, tab.label_ko, tab.label_en)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentTab.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {item.image && <Image src={item.image} alt={item.title_ko} fill className="object-cover" unoptimized />}
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-gray-900 text-base font-bold mb-1">{tr(locale, item.title_ko, item.title_en)}</h3>
                    <p className="text-gray-500 text-sm">{tr(locale, item.subtitle_ko, item.subtitle_en)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-16 px-6 lg:px-20 bg-gradient-to-r from-[#8CA5BF] to-[#A8BED6] overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.5) 0, transparent 40%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white/90 text-sm font-medium mb-2">{tr(locale, data.ctaPhone.label_ko, data.ctaPhone.label_en)}</p>
              <p className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-3">{data.ctaPhone.phone}</p>
              <p className="text-white/80 text-sm">{tr(locale, data.ctaPhone.description_ko, data.ctaPhone.description_en)}</p>
            </div>
            <Link href={data.ctaPhone.button_href || "/contact"} className="inline-block bg-white text-[#0B1E3F] px-8 py-3 rounded font-semibold hover:bg-white/90 transition-colors">
              {tr(locale, data.ctaPhone.button_ko, data.ctaPhone.button_en)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
