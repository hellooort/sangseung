"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { WorkCat, WorkRow } from "./page";

interface Props {
  categories: WorkCat[];
  works: WorkRow[];
}

const heights = [320, 280, 350, 300, 340, 290, 310, 360, 320, 270, 300, 340, 380, 290, 310, 330, 280, 300, 320, 290, 340, 330, 280];

export default function WorksClient({ categories, works }: Props) {
  const [activeFilter, setActiveFilter] = useState<number | "all">("all");
  const [selectedWork, setSelectedWork] = useState<WorkRow | null>(null);

  const catName = (id: number | null) => categories.find((c) => c.id === id)?.name_ko ?? "";

  const filtered = useMemo(
    () => (activeFilter === "all" ? works : works.filter((w) => w.category_id === activeFilter)),
    [works, activeFilter],
  );

  return (
    <>
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PORTFOLIO</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">시공사례</h1>

          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeFilter === "all" ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
              }`}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeFilter === cat.id ? "bg-[#4A90D9] text-white" : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {cat.name_ko}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((work, idx) => (
              <div key={work.id} className="break-inside-avoid group cursor-pointer" onClick={() => setSelectedWork(work)}>
                <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className="relative w-full bg-[#2a2a2a]" style={{ height: heights[idx % heights.length] }}>
                    {work.image_url && (
                      <Image
                        src={work.image_url}
                        alt={work.title_ko}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    {work.size && <span className="text-[#4A90D9] text-xs mb-1">{work.size}</span>}
                    <h3 className="text-white text-lg font-bold leading-tight">{work.title_ko}</h3>
                    <span className="text-[#aaa] text-sm mt-1">{catName(work.category_id)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedWork && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedWork(null)}>
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-video bg-[#2a2a2a]">
              {selectedWork.image_url && (
                <Image src={selectedWork.image_url} alt={selectedWork.title_ko} fill className="object-contain" unoptimized />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                {selectedWork.size && <span className="text-[#4A90D9] text-sm">{selectedWork.size}</span>}
                <span className="text-[#666] text-sm">{catName(selectedWork.category_id)}</span>
              </div>
              <h2 className="text-white text-2xl font-bold">{selectedWork.title_ko}</h2>
            </div>
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
            >
              ?
            </button>
          </div>
        </div>
      )}
    </>
  );
}
