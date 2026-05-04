import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
import WorksClient from "./WorksClient";

export interface WorkCat {
  id: number;
  name_ko: string;
  sort_order: number;
}

export interface WorkRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  size: string | null;
  image_url: string | null;
  sort_order: number;
}

const fallbackCats: WorkCat[] = [
  { id: 1, name_ko: "INDOOR", sort_order: 0 },
  { id: 2, name_ko: "OUTDOOR", sort_order: 1 },
  { id: 3, name_ko: "RENTAL", sort_order: 2 },
  { id: 4, name_ko: "MEDIA FACADE", sort_order: 3 },
];

const fallbackWorks: WorkRow[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  category_id: 1,
  title_ko: `시공사례 ${i + 1}`,
  size: null,
  image_url: `/image/reference/work_${i + 1}.jpg`,
  sort_order: i,
}));

export default async function WorksPage() {
  const [cats, works] = await Promise.all([
    getList<WorkCat>("work_categories", { orderBy: "sort_order" }, fallbackCats),
    getList<WorkRow>("works", { orderBy: "sort_order" }, fallbackWorks),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <WorksClient categories={cats} works={works} />
      </main>
      <Footer />
    </div>
  );
}
