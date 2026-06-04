"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { WorkCat, WorkRow } from "./page";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

interface Props {
  categories: WorkCat[];
  works: WorkRow[];
  locale: Locale;
}

export default function WorksClient({ categories, works, locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<number | "all">("all");
  const [selectedWork, setSelectedWork] = useState<WorkRow | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const catLabel = (id: number | null) => {
    if (id === null) return "";
    const c = categories.find((cat) => cat.id === id);
    if (!c) return "";
    return tr(locale, c.name_ko, c.name_en);
  };

  const filtered = useMemo(
    () => (activeFilter === "all" ? works : works.filter((w) => w.category_id === activeFilter)),
    [works, activeFilter],
  );

  const openWork = (work: WorkRow) => {
    setSelectedWork(work);
    setSlideIndex(0);
  };

  const allImages = (work: WorkRow): string[] => {
    const imgs: string[] = [];
    if (work.image_url) imgs.push(work.image_url);
    const extras = Array.isArray(work.extra_images) ? work.extra_images : [];
    imgs.push(...extras.filter(Boolean));
    return imgs;
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork) return;
    const imgs = allImages(selectedWork);
    setSlideIndex((i) => (i > 0 ? i - 1 : imgs.length - 1));
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork) return;
    const imgs = allImages(selectedWork);
    setSlideIndex((i) => (i < imgs.length - 1 ? i + 1 : 0));
  };

  return (
    <>
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PORTFOLIO</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
            {t("설치사례", "Projects")}
          </h1>

          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeFilter === "all" ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
              }`}
            >
              {t("전체", "All")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeFilter === cat.id ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {tr(locale, cat.name_ko, cat.name_en)}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((work) => {
              const title = tr(locale, work.title_ko, work.title_en);
              const extraCount = Array.isArray(work.extra_images) ? work.extra_images.filter(Boolean).length : 0;
              return (
                <div key={work.id} className="break-inside-avoid group cursor-pointer" onClick={() => openWork(work)}>
                  <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                    <div className="relative w-full aspect-[3/2] bg-[#2a2a2a]">
                      {work.image_url && (
                        <Image
                          src={work.image_url}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                        />
                      )}
                      {work.logo_url && (
                        <>
                          <div className="absolute inset-0 bg-black/45" />
                          <div className="absolute inset-0 flex items-center justify-center p-5">
                            <div
                              className="w-[90%] h-[65%] max-w-[500px] bg-white"
                              role="img"
                              aria-label={`${title} logo`}
                              style={{
                                WebkitMaskImage: `url("${work.logo_url}")`,
                                maskImage: `url("${work.logo_url}")`,
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                              }}
                            />
                          </div>
                        </>
                      )}
                      {extraCount > 0 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          +{extraCount}
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                      {work.size && <span className="text-[#4A90D9] text-xs mb-1">{work.size}</span>}
                      <h3 className="text-white text-lg font-bold leading-tight">{title}</h3>
                      <span className="text-[#aaa] text-sm mt-1">{catLabel(work.category_id)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedWork && (() => {
        const imgs = allImages(selectedWork);
        const currentImg = imgs[slideIndex];
        const hasMultiple = imgs.length > 1;
        return (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedWork(null)}>
            <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full aspect-video bg-[#2a2a2a]">
                {currentImg ? (
                  <Image
                    src={currentImg}
                    alt={tr(locale, selectedWork.title_ko, selectedWork.title_en)}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : selectedWork.logo_url ? (
                  <>
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div
                        className="w-[78%] h-[65%] max-w-[680px] bg-white"
                        role="img"
                        aria-label="logo"
                        style={{
                          WebkitMaskImage: `url("${selectedWork.logo_url}")`,
                          maskImage: `url("${selectedWork.logo_url}")`,
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                        }}
                      />
                    </div>
                  </>
                ) : null}

                {hasMultiple && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="이전"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="다음"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-1 flex-wrap">
                  {selectedWork.size && <span className="text-[#4A90D9] text-sm">{selectedWork.size}</span>}
                  <span className="text-[#666] text-sm">{catLabel(selectedWork.category_id)}</span>
                  {hasMultiple && (
                    <span className="text-[#555] text-xs ml-auto">{slideIndex + 1} / {imgs.length}</span>
                  )}
                </div>
                <h2 className="text-white text-2xl font-bold">
                  {tr(locale, selectedWork.title_ko, selectedWork.title_en)}
                </h2>

                {hasMultiple && (
                  <div className="flex gap-1.5 mt-4 flex-wrap">
                    {imgs.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`relative w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === slideIndex ? "border-[#4A90D9]" : "border-transparent opacity-50 hover:opacity-80"}`}
                      >
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedWork(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })()}
    </>
  );
}
