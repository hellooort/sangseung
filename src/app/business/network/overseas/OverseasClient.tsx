"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/locale";

export interface OverseasCategoryRow {
  id: number;
  name_ko: string;
  name_en: string | null;
}

export interface OverseasProjectRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  image_url: string | null;
}

interface Props {
  locale: Locale;
  categories: OverseasCategoryRow[];
  projects: OverseasProjectRow[];
}

export default function OverseasClient({ locale, categories, projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const t = (ko: string, en: string | null | undefined) => (locale === "en" && en ? en : ko);

  const catMap = new Map(categories.map((c) => [c.id, c]));
  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category_id === activeCategory);

  return (
    <>
      <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-[#1a2a3a]" />
        <div className="relative z-20 text-center px-6">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            OVERSEAS PROJECTS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("해외 프로젝트", "Overseas Projects")}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeCategory === "all"
                  ? "bg-[#4A90D9] text-white"
                  : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
              }`}
            >
              {t("전체", "All")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {t(cat.name_ko, cat.name_en)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const cat = project.category_id ? catMap.get(project.category_id) : null;
              const region = cat ? t(cat.name_ko, cat.name_en) : "";
              return (
                <div key={project.id} className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all">
                  <div className="relative h-48 bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] flex items-center justify-center overflow-hidden">
                    {project.image_url ? (
                      <Image src={project.image_url} alt={project.title_ko} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="text-white/20 text-5xl font-bold">{region}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#4A90D9] text-xs">{region}</span>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">
                      {t(project.title_ko, project.title_en)}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#666]">
                {t("이 지역에 등록된 프로젝트가 없습니다.", "No projects registered in this region.")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
