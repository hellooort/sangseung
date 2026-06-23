"use client";

import { useState } from "react";
import Image from "next/image";
import type { CertCat, CertRow } from "./page";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

interface Props {
  categories: CertCat[];
  certificates: CertRow[];
  locale?: Locale;
}

export default function CertificatesClient({ categories, certificates, locale = "ko" }: Props) {
  const [activeFilter, setActiveFilter] = useState<number | "all">("all");

  const filtered = activeFilter === "all" ? certificates : certificates.filter((c) => c.category_id === activeFilter);

  const catName = (id: number | null) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return "";
    return tr(locale, cat.name_ko, cat.name_en);
  };

  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">CERTIFICATES</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("인증서", "Certificates")}</h1>
        <p className="text-[#888] mb-8">{t("상승종합통신이 보유한 다양한 인증을 소개합니다.", "Discover the various certifications held by Sangseung Communications.")}</p>

        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2.5 rounded-full text-sm transition-all ${
              activeFilter === "all" ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
            }`}
          >
            {t("전체", "All")}
            <span className="ml-1.5 text-xs opacity-70">{certificates.length}</span>
          </button>
          {categories.map((cat) => {
            const count = certificates.filter((c) => c.category_id === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeFilter === cat.id ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {tr(locale, cat.name_ko, cat.name_en)}
                <span className="ml-1.5 text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((cert) => (
            <div key={cert.id} className="group bg-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="aspect-[3/4] bg-[#2a2a2a] relative overflow-hidden">
                {cert.image_url && (
                  <Image
                    src={cert.image_url}
                    alt={tr(locale, cert.title_ko, cert.title_en)}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#4A90D9] text-xs px-2 py-0.5 bg-[#4A90D9]/10 rounded">
                    {catName(cert.category_id)}
                  </span>
                </div>
                <h3 className="text-white text-xs font-medium line-clamp-2 leading-relaxed">{tr(locale, cert.title_ko, cert.title_en)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
