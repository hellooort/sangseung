import OverseasClient, { type OverseasCategoryRow, type OverseasProjectRow } from "./OverseasClient";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";

const fallbackCategories: OverseasCategoryRow[] = [
  { id: -1, name_ko: "괌",              name_en: "Guam" },
  { id: -2, name_ko: "일본",            name_en: "Japan" },
  { id: -3, name_ko: "사이판",          name_en: "Saipan" },
  { id: -4, name_ko: "사우디아라비아", name_en: "Saudi Arabia" },
  { id: -5, name_ko: "태국",            name_en: "Thailand" },
  { id: -6, name_ko: "말레이시아",      name_en: "Malaysia" },
];

const fallbackProjects: OverseasProjectRow[] = [
  { id: 1, category_id: -1, title_ko: "롯데호텔",          title_en: "Lotte Hotel",          image_url: null },
  { id: 2, category_id: -2, title_ko: "아라이 리조트",    title_en: "Arai Resort",          image_url: null },
  { id: 3, category_id: -3, title_ko: "한화 월드 리조트", title_en: "Hanwha World Resort",  image_url: null },
  { id: 4, category_id: -4, title_ko: "한화 건설",         title_en: "Hanwha E&C",           image_url: null },
  { id: 5, category_id: -5, title_ko: "한화 케미칼",       title_en: "Hanwha Chemical",      image_url: null },
  { id: 6, category_id: -6, title_ko: "롯데 케미칼",       title_en: "Lotte Chemical",       image_url: null },
];

export default async function OverseasPage() {
  const locale = await getLocale();
  const [cats, projects] = await Promise.all([
    getList<OverseasCategoryRow>("overseas_categories", { orderBy: "sort_order" }, []),
    getList<OverseasProjectRow>("overseas_projects", { orderBy: "sort_order" }, []),
  ]);

  const finalCats = cats.length > 0 ? cats : fallbackCategories;
  const finalProjects = projects.length > 0 ? projects : fallbackProjects;

  return <OverseasClient locale={locale} categories={finalCats} projects={finalProjects} />;
}
