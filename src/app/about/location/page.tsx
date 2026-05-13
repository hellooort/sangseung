import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NaverMap from "@/components/NaverMap";
import { getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import { tr } from "@/lib/locale";

interface OfficeRow {
  id: number;
  name_ko: string;
  name_en: string | null;
  address_ko: string | null;
  address_en: string | null;
  phone: string | null;
  fax: string | null;
  map_embed_url: string | null;
  lat: number | null;
  lng: number | null;
  sort_order: number;
}

const fallback: OfficeRow[] = [
  { id: 1, name_ko: "본사",                 name_en: "Head Office",            address_ko: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호",                            address_en: "#903, Hanwha Bizmetro 2, 551-24 Yangcheon-ro, Gangseo-gu, Seoul",                                  phone: "02-953-0056",  fax: "02-953-0118",  map_embed_url: null, lat: 37.5454, lng: 126.8516, sort_order: 0 },
  { id: 2, name_ko: "미디어시스템사업부",   name_en: "Media System Division",  address_ko: "경기도 구리시 갈매순환로166번길 46 금강펜테리움IX타워 제5층 020, 021호",         address_en: "#020-021, 5F Geumgang Penterium IX Tower, 46 Galmaesunhwan-ro 166beon-gil, Guri-si, Gyeonggi-do",  phone: "031-512-0110", fax: "031-512-0120", map_embed_url: null, lat: 37.6147, lng: 127.1465, sort_order: 1 },
  { id: 3, name_ko: "양주공장",             name_en: "Yangju Factory",         address_ko: "경기도 양주시 율정로 20(옥정동) 양주옥정메타엑스 지식산업센터 514, 515호",          address_en: "#514-515, Yangju Okjeong Metax, 20 Yuljeong-ro (Okjeong-dong), Yangju-si, Gyeonggi-do",            phone: "031-512-0110", fax: "031-512-0120", map_embed_url: null, lat: 37.8262, lng: 127.0535, sort_order: 2 },
];

export default async function LocationPage() {
  const [offices, locale] = await Promise.all([
    getList<OfficeRow>("office_locations", { orderBy: "sort_order" }, fallback),
    getLocale(),
  ]);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">LOCATION</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">
              {t("오시는 길", "Location")}
            </h1>

            <div className="space-y-12">
              {offices.map((office, index) => {
                const officeName = tr(locale, office.name_ko, office.name_en);
                const address = tr(locale, office.address_ko, office.address_en);
                const hasCoords =
                  typeof office.lat === "number" &&
                  typeof office.lng === "number" &&
                  !Number.isNaN(office.lat) &&
                  !Number.isNaN(office.lng);
                return (
                  <div key={office.id} className="bg-[#111] rounded-2xl overflow-hidden">
                    <div className="aspect-video md:aspect-[21/9] bg-[#1a1a1a] relative">
                      {hasCoords ? (
                        <NaverMap
                          lat={office.lat as number}
                          lng={office.lng as number}
                          title={officeName}
                          searchQuery={office.address_ko ?? officeName}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-center">
                          <div>
                            <svg className="w-12 h-12 text-[#4A90D9]/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-[#666] text-sm">{address}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-[#4A90D9] text-sm px-3 py-1 bg-[#4A90D9]/10 rounded font-medium">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h2 className="text-white text-xl md:text-2xl font-bold">{officeName}</h2>
                          </div>
                          <p className="text-[#ccc] text-sm md:text-base leading-relaxed">{address}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                          {office.phone && (
                            <div>
                              <span className="text-[#666] text-xs block mb-1">TEL</span>
                              <a href={`tel:${office.phone}`} className="text-white font-medium hover:text-[#4A90D9] transition-colors">
                                {office.phone}
                              </a>
                            </div>
                          )}
                          {office.fax && (
                            <div>
                              <span className="text-[#666] text-xs block mb-1">FAX</span>
                              <span className="text-white font-medium">{office.fax}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
