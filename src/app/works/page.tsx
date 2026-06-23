import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import WorksClient from "./WorksClient";

export const dynamic = "force-dynamic";

export interface WorkCat {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

export interface WorkRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  subtitle_ko?: string | null;
  subtitle_en?: string | null;
  size: string | null;
  logo_url: string | null;
  image_url: string | null;
  extra_images: string[];
  sort_order: number;
}

const fallbackCats: WorkCat[] = [
  { id: 1, name_ko: "INDOOR",       name_en: "Indoor Fixed",  sort_order: 0 },
  { id: 2, name_ko: "OUTDOOR",      name_en: "Outdoor Fixed", sort_order: 1 },
  { id: 3, name_ko: "RENTAL",       name_en: "Rental",        sort_order: 2 },
  { id: 4, name_ko: "MEDIA FACADE", name_en: "Media Facade",  sort_order: 3 },
];

const fallbackWorks: WorkRow[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  category_id: 1,
  title_ko: `시공사례 ${i + 1}`,
  title_en: `Project ${i + 1}`,
  size: null,
  logo_url: null,
  image_url: `/image/reference/work_${i + 1}.jpg`,
  extra_images: [],
  sort_order: i,
}));

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const [cats, works, locale, sp] = await Promise.all([
    getList<WorkCat>("work_categories", { orderBy: "sort_order" }, fallbackCats),
    getList<WorkRow>("works", { orderBy: "sort_order", ascending: true }, fallbackWorks),
    getLocale(),
    searchParams,
  ]);

  // ?cat=facade 처럼 쿼리로 들어온 값을 카테고리명과 매칭해 초기 필터를 정한다.
  const catParam = typeof sp?.cat === "string" ? sp.cat.toLowerCase().replace(/\s+/g, "") : null;
  const norm = (s: string | null) => (s ?? "").toLowerCase().replace(/\s+/g, "");
  const initialCatId = catParam
    ? cats.find((c) => norm(c.name_en).includes(catParam) || norm(c.name_ko).includes(catParam))?.id ?? null
    : null;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <WorksClient categories={cats} works={works} locale={locale} initialCatId={initialCatId} />
      </main>
      <Footer />
    </div>
  );
}
