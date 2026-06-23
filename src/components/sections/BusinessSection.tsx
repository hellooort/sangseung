import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface MainBusinessItem {
  id?: string;
  title: string;
  subtitle_ko: string;
  subtitle_en: string;
  description_ko: string;
  description_en: string;
  href: string;
}

interface MainBusinessData {
  headingKo: string;
  headingEn: string;
  areas: MainBusinessItem[];
}

const fallback: MainBusinessData = {
  headingKo: "사업분야",
  headingEn: "Business Areas",
  areas: [
    { title: "NI",            subtitle_ko: "Network Infrastructure",        subtitle_en: "Network Infrastructure",        description_ko: "네트워크 인프라 구축",       description_en: "Network infrastructure build-out",     href: "/business/network" },
    { title: "LED Display",   subtitle_ko: "LED 디스플레이",                subtitle_en: "LED Display",                   description_ko: "설계, 제작, 시공",            description_en: "Design, production, installation",     href: "/business/led" },
    { title: "SI",            subtitle_ko: "System Integration",            subtitle_en: "System Integration",            description_ko: "시스템 통합",                  description_en: "Integrated system services",           href: "/business/network" },
    { title: "Media Façade",  subtitle_ko: "미디어 파사드",                 subtitle_en: "Media Façade",                  description_ko: "건물 외관 LED 디스플레이",   description_en: "LED displays on building exteriors",   href: "/works?cat=facade" },
    { title: "Network",       subtitle_ko: "네트워크 구축",                 subtitle_en: "Network Build",                 description_ko: "유무선 인프라",               description_en: "Wired & wireless infrastructure",      href: "/business/network" },
    { title: "IBS",           subtitle_ko: "Intelligent Building System",   subtitle_en: "Intelligent Building System",   description_ko: "A/V, PA, CCTV, CATV 등",      description_en: "A/V, PA, CCTV, CATV and more",         href: "/business/network/ibs" },
  ],
};

export default async function BusinessSection({ locale }: { locale: Locale }) {
  const data = await getSiteSetting<MainBusinessData>("main_business", fallback);
  return (
    <section className="w-full bg-[#111] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            BUSINESS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {tr(locale, data.headingKo, data.headingEn)}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.areas.map((area, i) => (
            <Link
              key={area.id ?? `${area.title}-${i}`}
              href={area.href || "/"}
              className="block bg-[#1a1a1a] rounded-xl p-8 hover:bg-[#222] transition-colors group"
            >
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#4A90D9] transition-colors">
                {area.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {tr(locale, area.subtitle_ko, area.subtitle_en)}
                <br />
                {tr(locale, area.description_ko, area.description_en)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
