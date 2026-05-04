"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

const overseasProjects = [
  { id: 1, title_ko: "????",       title_en: "Lotte Hotel",          location_ko: "GUAM",       location_en: "Guam",        year: "2014", description_ko: "???? ??? ????", description_en: "Network infrastructure build", category: "guam" },
  { id: 2, title_ko: "??????",   title_en: "Arai Resort",          location_ko: "??",       location_en: "Japan",       year: "2017", description_ko: "???? ??? ????", description_en: "Network infrastructure build", category: "japan" },
  { id: 3, title_ko: "???????", title_en: "Hanwha World Resort",  location_ko: "???",     location_en: "Saipan",      year: "2019", description_ko: "???? ?????",     description_en: "Network redundancy build",      category: "saipan" },
  { id: 4, title_ko: "????",       title_en: "Hanwha E&C",           location_ko: "???????", location_en: "Saudi Arabia", year: "2018", description_ko: "???? ??? ??",     description_en: "Network infrastructure build",  category: "saudi" },
  { id: 5, title_ko: "?????",     title_en: "Hanwha Chemical",      location_ko: "??",       location_en: "Thailand",    year: "2018", description_ko: "???? ??? ??",     description_en: "Network infrastructure build",  category: "thailand" },
  { id: 6, title_ko: "?????",     title_en: "Lotte Chemical",       location_ko: "?????", location_en: "Malaysia",    year: "2018", description_ko: "???? ??? ??",     description_en: "Network infrastructure build",  category: "malaysia" },
];

const regions = [
  { id: "all",      name_ko: "??",            name_en: "All" },
  { id: "guam",     name_ko: "GUAM",            name_en: "Guam" },
  { id: "japan",    name_ko: "??",            name_en: "Japan" },
  { id: "saipan",   name_ko: "???",          name_en: "Saipan" },
  { id: "saudi",    name_ko: "???????",  name_en: "Saudi Arabia" },
  { id: "thailand", name_ko: "??",            name_en: "Thailand" },
  { id: "malaysia", name_ko: "?????",      name_en: "Malaysia" },
];

export default function OverseasClient({ locale }: { locale: Locale }) {
  const [activeRegion, setActiveRegion] = useState("all");
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const filteredProjects = activeRegion === "all"
    ? overseasProjects
    : overseasProjects.filter((p) => p.category === activeRegion);

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
            {t("?? ????", "Overseas Projects")}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                  activeRegion === region.id
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#1a1a1a] text-[#888] hover:bg-[#222] hover:text-white"
                }`}
              >
                {t(region.name_ko, region.name_en)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all">
                <div className="h-48 bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] flex items-center justify-center">
                  <span className="text-white/20 text-5xl font-bold">{t(project.location_ko, project.location_en)}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4A90D9] text-xs">{t(project.location_ko, project.location_en)}</span>
                    <span className="text-[#666] text-xs">{project.year}</span>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">
                    {t(project.title_ko, project.title_en)}
                  </h3>
                  <p className="text-[#888] text-sm">{t(project.description_ko, project.description_en)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
