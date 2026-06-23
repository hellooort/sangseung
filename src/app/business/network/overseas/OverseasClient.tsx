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
  const [selectedProject, setSelectedProject] = useState<OverseasProjectRow | null>(null);
  const t = (ko: string, en: string | null | undefined) => (locale === "en" && en ? en : ko);

  const catMap = new Map(categories.map((c) => [c.id, c]));
  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category_id === activeCategory);

  const selectedIdx = selectedProject ? filtered.findIndex((p) => p.id === selectedProject.id) : -1;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx < filtered.length - 1) setSelectedProject(filtered[selectedIdx + 1]);
  };
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx > 0) setSelectedProject(filtered[selectedIdx - 1]);
  };

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
                <div
                  key={project.id}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[3/2] bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] flex items-center justify-center overflow-hidden">
                    {project.image_url ? (
                      <Image src={project.image_url} alt={t(project.title_ko, project.title_en)} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="text-white/20 text-5xl font-bold">{region}</span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
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

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-[#2a2a2a]">
              {selectedProject.image_url && (
                <Image
                  src={selectedProject.image_url}
                  alt={t(selectedProject.title_ko, selectedProject.title_en)}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-1">
                {selectedProject.category_id && catMap.get(selectedProject.category_id) && (
                  <span className="text-[#4A90D9] text-xs">
                    {t(catMap.get(selectedProject.category_id)!.name_ko, catMap.get(selectedProject.category_id)!.name_en)}
                  </span>
                )}
                <span className="text-[#555] text-xs">{selectedIdx + 1} / {filtered.length}</span>
              </div>
              <h2 className="text-white text-xl font-bold">
                {t(selectedProject.title_ko, selectedProject.title_en)}
              </h2>
            </div>

            {selectedIdx > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label={t("이전", "Previous")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {selectedIdx < filtered.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label={t("다음", "Next")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
