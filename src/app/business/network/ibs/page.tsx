import IBSClient, { type IBSCategoryRow, type IBSItemRow } from "./IBSClient";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";

const fallbackCategories: IBSCategoryRow[] = [
  { id: -1, name_ko: "구내통신선로", name_en: "Structured Cabling" },
  { id: -2, name_ko: "CCTV 설비",     name_en: "CCTV" },
  { id: -3, name_ko: "CATV 설비",     name_en: "CATV" },
  { id: -4, name_ko: "AV 설비",       name_en: "AV" },
  { id: -5, name_ko: "전산실 구축/이전", name_en: "Server Room Build/Move" },
  { id: -6, name_ko: "출입통제",      name_en: "Access Control" },
  { id: -7, name_ko: "구내방송",      name_en: "Public Address" },
  { id: -8, name_ko: "UPS설비",       name_en: "UPS" },
];

const fallbackItems: IBSItemRow[] = [
  { id: 1,  category_id: -1, title_ko: "맨홀 설치",            title_en: "Manhole Installation",         image_url: null },
  { id: 2,  category_id: -1, title_ko: "전선관 방수 처리",     title_en: "Conduit Waterproofing",        image_url: null },
  { id: 3,  category_id: -1, title_ko: "신축 건물 매립 전선관", title_en: "Embedded Conduit (New Build)", image_url: null },
  { id: 4,  category_id: -1, title_ko: "옥외 전선관 시공",     title_en: "Outdoor Conduit",              image_url: null },
  { id: 5,  category_id: -2, title_ko: "CCTV 설치 현장",       title_en: "CCTV Installation Site",       image_url: null },
  { id: 6,  category_id: -2, title_ko: "CCTV 통합 관제",       title_en: "CCTV Integrated Monitoring",   image_url: null },
  { id: 7,  category_id: -3, title_ko: "CATV 시공",            title_en: "CATV Cabling",                 image_url: null },
  { id: 8,  category_id: -4, title_ko: "AV 시스템 구축",       title_en: "AV System Build",              image_url: null },
  { id: 9,  category_id: -5, title_ko: "전산실 구축",          title_en: "Server Room Build",            image_url: null },
  { id: 10, category_id: -5, title_ko: "전산실 이전",          title_en: "Server Room Relocation",       image_url: null },
  { id: 11, category_id: -6, title_ko: "출입통제 시스템",      title_en: "Access Control System",        image_url: null },
  { id: 12, category_id: -7, title_ko: "구내방송 시스템",      title_en: "Public Address System",        image_url: null },
];

export default async function IBSPage() {
  const locale = await getLocale();
  const [cats, items] = await Promise.all([
    getList<IBSCategoryRow>("ibs_categories", { orderBy: "sort_order" }, []),
    getList<IBSItemRow>("ibs_items", { orderBy: "sort_order" }, []),
  ]);

  const finalCats = cats.length > 0 ? cats : fallbackCategories;
  const finalItems = items.length > 0 ? items : fallbackItems;

  return <IBSClient locale={locale} categories={finalCats} items={finalItems} />;
}
