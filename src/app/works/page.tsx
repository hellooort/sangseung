import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import WorksClient from "./WorksClient";

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
  size: string | null;
  image_url: string | null;
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
  image_url: `/image/reference/work_${i + 1}.jpg`,
  sort_order: i,
}));

export default async function WorksPage() {
  const [cats, works, locale] = await Promise.all([
    getList<WorkCat>("work_categories", { orderBy: "sort_order" }, fallbackCats),
    getList<WorkRow>("works", { orderBy: "sort_order" }, fallbackWorks),
    getLocale(),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <WorksClient categories={cats} works={works} locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
