"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

const ibsCategories = [
  { id: "all",       name_ko: "??",              name_en: "All" },
  { id: "cable",     name_ko: "??????",      name_en: "Structured Cabling" },
  { id: "cctv",      name_ko: "CCTV ??",         name_en: "CCTV" },
  { id: "catv",      name_ko: "CATV ??",         name_en: "CATV" },
  { id: "av",        name_ko: "AV ??",           name_en: "AV" },
  { id: "remote",    name_ko: "??????",      name_en: "Remote Metering" },
  { id: "server",    name_ko: "?????/????", name_en: "Server Room Build/Move" },
  { id: "access",    name_ko: "??????",      name_en: "Access Control" },
  { id: "broadcast", name_ko: "??????",      name_en: "Public Address" },
  { id: "ups",       name_ko: "UPS??",           name_en: "UPS" },
];

const ibsGalleryItems = [
  { id: 1,  title_ko: "?? ??",                title_en: "Manhole Installation",         category: "cable" },
  { id: 2,  title_ko: "??? ?? ??",         title_en: "Conduit Waterproofing",        category: "cable" },
  { id: 3,  title_ko: "???? ???? ??",   title_en: "Embedded Conduit (New Build)", category: "cable" },
  { id: 4,  title_ko: "?? ?? ??",           title_en: "Outdoor Conduit",              category: "cable" },
  { id: 5,  title_ko: "CCTV ?? ??",           title_en: "CCTV Installation Site",       category: "cctv" },
  { id: 6,  title_ko: "CCTV ????",            title_en: "CCTV Integrated Monitoring",   category: "cctv" },
  { id: 7,  title_ko: "CATV ??",                title_en: "CATV Cabling",                 category: "catv" },
  { id: 8,  title_ko: "AV ??? ??",           title_en: "AV System Build",              category: "av" },
  { id: 9,  title_ko: "??? ??",              title_en: "Server Room Build",            category: "server" },
  { id: 10, title_ko: "??? ??",              title_en: "Server Room Relocation",       category: "server" },
  { id: 11, title_ko: "???? ???",          title_en: "Access Control System",        category: "access" },
  { id: 12, title_ko: "???? ??",            title_en: "Public Address System",        category: "broadcast" },
];

export default function IBSClient({ locale }: { locale: Locale }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const filteredItems = activeCategory === "all"
    ? ibsGalleryItems
    : ibsGalleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-20 text-center px-6">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            IBS / INTEGRATED BUILDING SYSTEM
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("IBS ?????", "IBS Integrated System")}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {ibsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {t(category.name_ko, category.name_en)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="h-48 bg-[#2a2a2a] flex items-center justify-center">
                  <span className="text-[#333] text-6xl font-bold">{item.id}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-white text-sm font-medium group-hover:text-[#4A90D9] transition-colors">
                    {t(item.title_ko, item.title_en)}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#666]">
                {t("?? ????? ??? ??? ????.", "No items registered in this category.")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
