import LedCategoryPage, { type LedCategoryProduct } from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";

interface DbProductRow {
  slug: string | null;
  name: string | null;
  name_ko: string | null;
  name_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export default async function AdSignPage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "adsign" } },
  );
  const products: LedCategoryProduct[] = rows
    .map((r) => ({
      slug: r.slug as string,
      name: r.name_ko ?? r.name ?? "",
      name_en: r.name_en ?? undefined,
      description_ko: r.description_ko ?? "",
      description_en: r.description_en ?? undefined,
      image: r.image_url ?? "/image/AD Cloud/AD Cloud_main.jpg",
    }));

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="AD SIGN"
      categorySlug="adsign"
      title_ko="AD SIGN"
      title_en="AD SIGN"
      description_ko="클라우드 기반 LED 광고 사이니지 솔루션으로, 원격 콘텐츠 관리와 모니터링이 가능한 차세대 옥외 광고 시스템입니다."
      description_en="Cloud-based LED advertising signage with remote content management and monitoring."
      products={products}
    />
  );
}
