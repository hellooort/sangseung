import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface Partner {
  id: number;
  name_ko: string;
  name_en: string | null;
  logo_url: string | null;
  website_url: string | null;
}

const fallback: Partner[] = [
  { id: 1,  name_ko: "한화",            name_en: "Hanwha",                    logo_url: null, website_url: "https://www.hanwha.co.kr" },
  { id: 2,  name_ko: "롯데",            name_en: "Lotte",                     logo_url: null, website_url: "https://www.lotte.co.kr" },
  { id: 3,  name_ko: "현대자동차",      name_en: "Hyundai Motor",             logo_url: null, website_url: "https://www.hyundai.com" },
  { id: 4,  name_ko: "삼성 SDI",        name_en: "Samsung SDI",               logo_url: null, website_url: "https://www.samsungsdi.co.kr" },
  { id: 5,  name_ko: "AIG 손해보험",    name_en: "AIG Insurance",             logo_url: null, website_url: "https://www.aig.co.kr" },
  { id: 6,  name_ko: "동국제강",        name_en: "Dongkuk Steel",             logo_url: null, website_url: "https://www.dongkuk.com" },
  { id: 7,  name_ko: "LS메탈",          name_en: "LS Metal",                  logo_url: null, website_url: "https://www.lsmetal.co.kr" },
  { id: 8,  name_ko: "기아자동차",      name_en: "Kia Motors",                logo_url: null, website_url: "https://www.kia.com" },
];

export default async function PartnersPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const dbPartners = await getList<Partner>("partners", { orderBy: "sort_order" }, []);
  const partners = dbPartners.length > 0 ? dbPartners : fallback;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PARTNERS</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("파트너사", "Partners")}</h1>
            <p className="text-[#888] mb-16 max-w-2xl">
              {t(
                "상승종합통신은 국내외 다양한 산업 분야의 기업들과 함께 성공적인 프로젝트를 수행하고 있습니다. 신뢰를 바탕으로 오랜 파트너십을 유지하며 함께 성장하고 있습니다.",
                "SANGSEUNG partners with leading companies across diverse industries at home and abroad — building lasting partnerships rooted in trust.",
              )}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((partner) => {
                const url = partner.website_url ?? "#";
                const linkable = url !== "#";
                const name = tr(locale, partner.name_ko, partner.name_en);
                const hasLogo = typeof partner.logo_url === "string" && partner.logo_url.trim().length > 0;
                return (
                  <a
                    key={partner.id ?? partner.name_ko}
                    href={url}
                    {...(linkable ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`relative overflow-hidden rounded-xl h-40 group block ${
                      hasLogo ? "bg-white" : "bg-[#1a1a1a]"
                    }`}
                    aria-label={name}
                  >
                    {hasLogo ? (
                      <div className="absolute inset-0 p-4 sm:p-5 flex items-center justify-center">
                        <div className="relative w-full h-full grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                          <Image
                            src={partner.logo_url as string}
                            alt={name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            unoptimized
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center px-3">
                        <span className="text-white text-xl font-bold group-hover:text-[#4A90D9] transition-colors text-center">
                          {name}
                        </span>
                      </div>
                    )}

                    {linkable && (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/95 to-black/70 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between text-white">
                        <span className="text-xs font-medium tracking-wide">
                          {t("사이트 방문하기", "Visit Site")}
                        </span>
                        <svg className="w-3.5 h-3.5 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
