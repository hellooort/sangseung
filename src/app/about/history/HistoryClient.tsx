"use client";

import { useMemo, useState } from "react";
import type { HistoryRow } from "./page";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

interface YearGroup {
  year: string;
  items: { month: string | null; text: string }[];
}

interface Props {
  rows: HistoryRow[];
  locale: Locale;
}

export default function HistoryClient({ rows, locale }: Props) {
  const grouped = useMemo<YearGroup[]>(() => {
    const map = new Map<string, YearGroup>();
    for (const r of rows) {
      if (!map.has(r.year)) map.set(r.year, { year: r.year, items: [] });
      map.get(r.year)!.items.push({ month: r.month, text: tr(locale, r.text_ko, r.text_en) });
    }
    return Array.from(map.values()).sort((a, b) => Number(b.year) - Number(a.year));
  }, [rows, locale]);

  const periods = useMemo(() => {
    if (grouped.length === 0) return [{ label: "전체", years: [] as string[] }];
    const years = grouped.map((g) => g.year);
    const chunkSize = Math.ceil(years.length / 3);
    const chunks: string[][] = [];
    for (let i = 0; i < years.length; i += chunkSize) {
      chunks.push(years.slice(i, i + chunkSize));
    }
    return chunks.map((c) => ({
      label: c.length > 1 ? `${c[0]}-${c[c.length - 1]}` : c[0],
      years: c,
    }));
  }, [grouped]);

  const [activePeriod, setActivePeriod] = useState(0);
  const filtered = grouped.filter((g) => periods[activePeriod]?.years.includes(g.year));

  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">HISTORY</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">{locale === "en" ? "History" : "연혁"}</h1>

        <div className="relative mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#333] -translate-y-1/2" />
            {periods.map((period, index) => (
              <button
                key={period.label}
                onClick={() => setActivePeriod(index)}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-3 h-3 rounded-full mb-3 transition-all ${
                    activePeriod === index ? "bg-[#4A90D9] ring-4 ring-[#4A90D9]/30" : "bg-[#444]"
                  }`}
                />
                <span className={`text-sm font-medium ${activePeriod === index ? "text-[#4A90D9]" : "text-[#666]"}`}>
                  {period.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-24 top-0 bottom-0 w-px bg-[#333]" />

          {filtered.map((yearData) => (
            <div key={yearData.year} className="mb-16 last:mb-0">
              <div className="flex items-center mb-8">
                <div className="relative z-10 flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#4A90D9] border-4 border-[#0A0A0A] absolute left-5 md:left-[5.5rem] -translate-x-1/2" />
                  <span className="text-4xl md:text-5xl font-bold text-white ml-10 md:ml-32">{yearData.year}</span>
                </div>
              </div>

              <div className="ml-10 md:ml-32 space-y-6">
                {yearData.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    {item.month && (
                      <span className="text-[#4A90D9] font-bold text-lg min-w-[3rem]">{item.month}</span>
                    )}
                    <div className="flex items-start gap-3">
                      <span className="text-[#4A90D9] mt-2">|</span>
                      <p className="text-[#ccc] text-base leading-relaxed group-hover:text-white transition-colors">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
