import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";

interface Partner {
  id: number;
  name_ko: string;
  name_en: string | null;
  website_url: string | null;
}

const fallback: Partner[] = [
  { id: 1,  name_ko: "한화",            name_en: "Hanwha",                    website_url: "https://www.hanwha.co.kr" },
  { id: 2,  name_ko: "롯데",            name_en: "Lotte",                     website_url: "https://www.lotte.co.kr" },
  { id: 3,  name_ko: "현대자동차",      name_en: "Hyundai Motor",             website_url: "https://www.hyundai.com" },
  { id: 4,  name_ko: "삼성 SDI",        name_en: "Samsung SDI",               website_url: "https://www.samsungsdi.co.kr" },
  { id: 5,  name_ko: "AIG 손해보험",    name_en: "AIG Insurance",             website_url: "https://www.aig.co.kr" },
  { id: 6,  name_ko: "동국제강",        name_en: "Dongkuk Steel",             website_url: "https://www.dongkuk.com" },
  { id: 7,  name_ko: "LS메탈",          name_en: "LS Metal",                  website_url: "https://www.lsmetal.co.kr" },
  { id: 8,  name_ko: "기아자동차",      name_en: "Kia Motors",                website_url: "https://www.kia.com" },
  { id: 9,  name_ko: "아산병원",        name_en: "Asan Medical Center",       website_url: "https://www.amc.seoul.kr" },
  { id: 10, name_ko: "인하대학교",      name_en: "Inha University",           website_url: "https://www.inha.ac.kr" },
  { id: 11, name_ko: "국민체육진흥공단", name_en: "KSPO",                      website_url: "https://www.kspo.or.kr" },
  { id: 12, name_ko: "국회도서관",      name_en: "National Assembly Library", website_url: "https://www.nanet.go.kr" },
  { id: 13, name_ko: "외교부",          name_en: "MOFA",                      website_url: "https://www.mofa.go.kr" },
  { id: 14, name_ko: "해군 2함대",      name_en: "ROK 2nd Fleet",             website_url: null },
  { id: 15, name_ko: "한국보건산업진흥원", name_en: "KHIDI",                  website_url: "https://www.khidi.or.kr" },
  { id: 16, name_ko: "서울산업대학교",  name_en: "Seoul Tech",                website_url: "https://www.seoultech.ac.kr" },
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
                return (
                  <a
                    key={partner.id ?? partner.name_ko}
                    href={url}
                    {...(linkable ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center h-40 hover:bg-[#222] transition-colors group"
                  >
                    <span className="text-white text-xl font-bold mb-2 group-hover:text-[#4A90D9] transition-colors text-center">
                      {locale === "en" && partner.name_en ? partner.name_en : partner.name_ko}
                    </span>
                    {linkable && (
                      <span className="text-[#4A90D9] text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        {t("사이트 방문", "Visit Site")}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
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
