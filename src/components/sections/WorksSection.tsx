import Link from "next/link";
import Image from "next/image";
import { getList } from "@/lib/supabase/public";
import { tr, type Locale } from "@/lib/locale";

interface WorkRow {
  id: number;
  title_ko: string;
  title_en: string | null;
  size: string | null;
  category_id: number | null;
  logo_url: string | null;
  image_url: string | null;
  sort_order: number;
}

interface WorkCatRow {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

const fallbackWorks: WorkRow[] = [
  { id: 1, title_ko: "LH 컨퍼런스 LED 포스터",                title_en: "LH Conference LED Poster",                  size: "S-Poster P2.5mm",     category_id: 1, logo_url: null, image_url: "/image/reference/work_1.jpg",  sort_order: 0 },
  { id: 2, title_ko: "호주 SUN CORP 실내 COB LED 스크린",     title_en: "Australia SUN CORP Indoor COB LED Screen",  size: "SCO-Wall P0.93mm",    category_id: 1, logo_url: null, image_url: "/image/reference/work_4.jpg",  sort_order: 1 },
  { id: 3, title_ko: "서울시청 다목적홀 LED 스크린",          title_en: "Seoul City Hall Multi-purpose Hall LED",    size: "SI640 P2.5mm",        category_id: 1, logo_url: null, image_url: "/image/reference/work_6.jpg",  sort_order: 2 },
  { id: 4, title_ko: "김해 금관가야휴게소 LED 미디어 파사드", title_en: "Gimhae Geumgwan Gaya Rest Area LED Facade", size: "SMI P7.8mm",          category_id: 4, logo_url: null, image_url: "/image/reference/work_8.jpg",  sort_order: 3 },
  { id: 5, title_ko: "일본 방재훈련소 LED 스크린",            title_en: "Japan Disaster Training Center LED Screen", size: "SOD-R P3.91mm",       category_id: 3, logo_url: null, image_url: "/image/reference/work_22.jpg", sort_order: 4 },
  { id: 6, title_ko: "중국 스포츠 스타디움 LED 미디어파사드", title_en: "China Sports Stadium LED Media Facade",     size: "SMO P31.25mm",        category_id: 4, logo_url: null, image_url: "/image/reference/work_9.jpg",  sort_order: 5 },
];

const fallbackCats: WorkCatRow[] = [
  { id: 1, name_ko: "INDOOR",       name_en: "Indoor Fixed",  sort_order: 0 },
  { id: 2, name_ko: "OUTDOOR",      name_en: "Outdoor Fixed", sort_order: 1 },
  { id: 3, name_ko: "RENTAL",       name_en: "Rental",        sort_order: 2 },
  { id: 4, name_ko: "MEDIA FACADE", name_en: "Media Facade",  sort_order: 3 },
];

const heights = [280, 350, 240, 320, 260, 300];

export default async function WorksSection({ locale }: { locale: Locale }) {
  const [works, cats] = await Promise.all([
    getList<WorkRow>("works", { orderBy: "sort_order", limit: 6 }, fallbackWorks),
    getList<WorkCatRow>("work_categories", { orderBy: "sort_order" }, fallbackCats),
  ]);

  const catMap = new Map(cats.map((c) => [c.id, { ko: c.name_ko, en: c.name_en }]));
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PORTFOLIO</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Works</h2>
          </div>
          <Link
            href="/works"
            className="mt-6 md:mt-0 inline-block border border-[#444] text-white px-6 py-3 rounded text-sm font-medium hover:border-white/50 transition-colors"
          >
            {t("전체 보기", "View All")}
          </Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {works.map((work, idx) => {
            const title = tr(locale, work.title_ko, work.title_en);
            const cat = work.category_id ? catMap.get(work.category_id) : null;
            return (
              <Link key={work.id} href="/works" className="break-inside-avoid group block">
                <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className="relative w-full bg-[#2a2a2a]" style={{ height: heights[idx % heights.length] }}>
                    {work.image_url && (
                      <Image
                        src={work.image_url}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    )}
                    {work.logo_url && (
                      <>
                        <div className="absolute inset-0 bg-black/45" />
                        <div className="absolute inset-0 flex items-center justify-center p-5">
                          <div className="relative w-[90%] h-[65%] max-w-[440px]">
                            <Image
                              src={work.logo_url}
                              alt={`${title} logo`}
                              fill
                              className="object-contain brightness-0 invert"
                              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw"
                              unoptimized
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    {work.size && <span className="text-[#4A90D9] text-xs mb-1">{work.size}</span>}
                    <h3 className="text-white text-lg font-bold">{title}</h3>
                    {cat && (
                      <span className="text-[#aaa] text-sm">{tr(locale, cat.ko, cat.en)}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
