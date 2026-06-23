import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface FeatureItem {
  id?: string;
  title_ko?: string;
  title_en?: string;
  description_ko?: string;
  description_en?: string;
}

interface BusinessSectionRow {
  id: string;
  title_ko: string | null;
  title_en: string | null;
  subtitle_ko: string | null;
  subtitle_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  hero_image: string | null;
  cta_label_ko: string | null;
  cta_label_en: string | null;
  features: FeatureItem[] | null;
}

const HREF_BY_ID: Record<string, string> = {
  network: "/business/network",
  led: "/business/led",
  "video-wall": "/business/ip-wall",
  maintenance: "/business/maintenance",
};

const fallback: BusinessSectionRow[] = [
  {
    id: "network",
    title_ko: "네트워크 사업",
    title_en: "Network Business",
    subtitle_ko: "Network Infrastructure",
    subtitle_en: "Network Infrastructure",
    description_ko: "IBS 통합시스템, 통합배선공사, CCTV/CATV 공사, 서버실 구축 등 네트워크 인프라 전반을 담당합니다.",
    description_en: "Comprehensive network infrastructure including IBS integration, structured cabling, CCTV/CATV, and server room construction.",
    hero_image: null,
    cta_label_ko: "자세히 보기",
    cta_label_en: "Learn More",
    features: [
      { title_ko: "통합배선공사",        title_en: "Structured Cabling" },
      { title_ko: "CCTV 공사",           title_en: "CCTV Installation" },
      { title_ko: "CATV 공사",           title_en: "CATV Installation" },
      { title_ko: "AV 공사",             title_en: "AV Installation" },
      { title_ko: "서버실구축/이전공사", title_en: "Server Room Build/Move" },
      { title_ko: "출입통제공사",        title_en: "Access Control" },
      { title_ko: "전관방송공사",        title_en: "Public Address" },
      { title_ko: "UPS공사",             title_en: "UPS Systems" },
    ],
  },
  {
    id: "led",
    title_ko: "LED 디스플레이",
    title_en: "LED Display",
    subtitle_ko: "LED Display Solution",
    subtitle_en: "LED Display Solution",
    description_ko: "대형 LED 전광판부터 미디어 파사드까지, 설계/제작/시공 전 과정을 One-Stop으로 제공합니다.",
    description_en: "From large outdoor displays to media facades — design, manufacturing, and installation provided as a one-stop solution.",
    hero_image: null,
    cta_label_ko: "자세히 보기",
    cta_label_en: "Learn More",
    features: [
      { title_ko: "대형 LED 전광판",    title_en: "Large Outdoor LED" },
      { title_ko: "실내 LED 디스플레이", title_en: "Indoor LED Display" },
      { title_ko: "미디어 파사드",       title_en: "Media Facade" },
      { title_ko: "기상전광판",          title_en: "Weather Display" },
      { title_ko: "교통정보전광판",      title_en: "Traffic Information" },
      { title_ko: "안내전광판",          title_en: "Information Display" },
    ],
  },
  {
    id: "video-wall",
    title_ko: "Video-Wall",
    title_en: "Video-Wall",
    subtitle_ko: "CALICO PRO Video Processing Solution",
    subtitle_en: "CALICO PRO Video Processing Solution",
    description_ko: "수백 개의 4K60 비디오 창과 10비트 색 심도를 지원하는 tvONE CALICO PRO 기반의 차세대 Video-Wall 프로세싱 솔루션입니다.",
    description_en: "Next-generation video-wall processing powered by tvONE CALICO PRO, supporting hundreds of 4K60 windows with 10-bit color.",
    hero_image: null,
    cta_label_ko: "자세히 보기",
    cta_label_en: "Learn More",
    features: [
      { title_ko: "CALICO PRO 2200", title_en: "CALICO PRO 2200" },
      { title_ko: "CALICO PRO 1200", title_en: "CALICO PRO 1200" },
    ],
  },
];

export default async function BusinessPage() {
  const locale = await getLocale();
  const rowsRaw = await getList<BusinessSectionRow>(
    "business_sections",
    { orderBy: "id" },
    [],
  );
  // 표시 순서 강제: network → led → video-wall → maintenance
  const order = ["network", "led", "video-wall", "maintenance"];
  const rows = rowsRaw.length > 0
    ? [...rowsRaw].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    : fallback;

  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="pt-44 pb-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            BUSINESS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">
            {t("사업소개", "Our Business")}
          </h1>

          <div className="space-y-16">
            {rows.map((area) => {
              const features = area.features ?? [];
              const href = HREF_BY_ID[area.id] ?? "/business";
              const hasImage = typeof area.hero_image === "string" && area.hero_image.trim().length > 0;
              return (
                <div key={area.id} className="bg-[#111] rounded-2xl overflow-hidden">
                  {hasImage && (
                    <div className="relative w-full aspect-video bg-[#1a1a1a]">
                      <Image src={area.hero_image as string} alt={tr(locale, area.title_ko, area.title_en)} fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />
                    </div>
                  )}
                  <div className="p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="lg:w-1/2">
                        {area.subtitle_ko && (
                          <span className="text-[#4A90D9] text-sm mb-2 block">
                            {tr(locale, area.subtitle_ko, area.subtitle_en)}
                          </span>
                        )}
                        <h2 className="text-3xl font-bold text-white mb-4">
                          {tr(locale, area.title_ko, area.title_en)}
                        </h2>
                        <p className="text-[#888] leading-relaxed mb-6">
                          {tr(locale, area.description_ko, area.description_en)}
                        </p>
                        <Link
                          href={href}
                          className="inline-block border border-[#444] text-white px-6 py-3 rounded text-sm hover:border-white/50 transition-colors"
                        >
                          {tr(locale, area.cta_label_ko, area.cta_label_en) || t("자세히 보기", "Learn More")}
                        </Link>
                      </div>
                      {features.length > 0 && (
                        <div className="lg:w-1/2">
                          <h3 className="text-white font-semibold mb-4">{t("주요 서비스", "Key Services")}</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {features.map((f, i) => (
                              <div key={f.id ?? i} className="bg-[#1a1a1a] rounded px-4 py-3 text-[#888] text-sm">
                                {tr(locale, f.title_ko ?? "", f.title_en ?? "")}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
