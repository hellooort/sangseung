"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";
import type { YearData } from "./page";

interface Props {
  projectsByYear: Record<string, YearData>;
  locale: Locale;
}

export default function ProjectsClient({ projectsByYear, locale }: Props) {
  const [activeYear, setActiveYear] = useState<string>("all");
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const years = Object.keys(projectsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <>
      <section className="relative h-[350px] bg-[#111] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-[#2a2a2a]" />
        <div className="relative z-20 text-center px-6">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            PROJECT HISTORY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("공사 실적", "Project Records")}
          </h1>
          <p className="text-[#888] text-sm mt-4">
            {t(
              "2014년부터 현재까지 상승종합통신이 수행한 ICT 프로젝트입니다.",
              "ICT projects executed by SANGSEUNG from 2014 to the present.",
            )}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button
              onClick={() => setActiveYear("all")}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeYear === "all"
                  ? "bg-[#4A90D9] text-white"
                  : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
              }`}
            >
              {t("전체", "All")}
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeYear === year
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="space-y-14">
            {(activeYear === "all" ? years : [activeYear]).map((year) => {
              const data = projectsByYear[year];
              return (
                <div key={year}>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 border-b border-[#333] pb-4">
                    <h2 className="text-[#4A90D9] text-3xl font-bold">{year}</h2>
                    {data.capacity && (
                      <p className="text-[#ccc] text-sm">
                        <span className="text-[#888]">
                          {t("정보통신공사업 시공능력평가", "ICT Construction Capacity Rating")}
                        </span>{" "}
                        <span className="text-white font-semibold">{data.capacity}</span>
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.projects.map((project, index) => (
                      <div key={index} className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors">
                        <p className="text-white text-sm leading-relaxed">{project}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
