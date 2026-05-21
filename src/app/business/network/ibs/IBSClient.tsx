"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/locale";

export interface IBSCategoryRow {
  id: number;
  name_ko: string;
  name_en: string | null;
}

export interface IBSItemRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  image_url: string | null;
}

interface Props {
  locale: Locale;
  categories: IBSCategoryRow[];
  items: IBSItemRow[];
}

export default function IBSClient({ locale, categories, items }: Props) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [selectedItem, setSelectedItem] = useState<IBSItemRow | null>(null);
  const t = (ko: string, en: string | null | undefined) => (locale === "en" && en ? en : ko);

  const filteredItems = activeCategory === "all"
    ? items
    : items.filter((item) => item.category_id === activeCategory);

  const selectedIdx = selectedItem ? filteredItems.findIndex((i) => i.id === selectedItem.id) : -1;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx < filteredItems.length - 1) setSelectedItem(filteredItems[selectedIdx + 1]);
  };
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx > 0) setSelectedItem(filteredItems[selectedIdx - 1]);
  };

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
            {t("IBS 통합 시스템", "IBS Integrated System")}
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
            {categories.map((category) => (
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
              <div
                key={item.id}
                className="group bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.title_ko} fill className="object-cover" unoptimized />
                  ) : (
                    <span className="text-[#333] text-6xl font-bold">{item.id}</span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
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
                {t("이 카테고리에는 등록된 항목이 없습니다.", "No items registered in this category.")}
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-[#2a2a2a]">
              {selectedItem.image_url && (
                <Image
                  src={selectedItem.image_url}
                  alt={t(selectedItem.title_ko, selectedItem.title_en)}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <div className="p-5">
              <h2 className="text-white text-xl font-bold">
                {t(selectedItem.title_ko, selectedItem.title_en)}
              </h2>
              <p className="text-[#666] text-xs mt-1">{selectedIdx + 1} / {filteredItems.length}</p>
            </div>

            {selectedIdx > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="이전"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {selectedIdx < filteredItems.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="다음"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <button
              onClick={() => setSelectedItem(null)}
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
