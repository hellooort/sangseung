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

export default async function OutdoorFixedPage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "outdoor" } },
  );
  const products: LedCategoryProduct[] = rows
    .map((r) => ({
      slug: r.slug as string,
      name: r.name_ko ?? r.name ?? "",
      name_en: r.name_en ?? undefined,
      description_ko: r.description_ko ?? "",
      description_en: r.description_en ?? undefined,
      image: r.image_url ?? "/image/SOD-C/SOD-C_main_img_sample.jpg",
    }));

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="OUTDOOR FIXED"
      categorySlug="outdoor"
      title_ko="OUTDOOR FIXED"
      title_en="OUTDOOR FIXED"
      description_ko="고휘도와 방수·방진 성능을 갖춘 실외용 LED 디스플레이로, 광장·건물 외벽·도로 등 옥외 환경에 최적입니다."
      description_en="High-brightness, weather-resistant outdoor LED displays — ideal for plazas, building facades, and roadsides."
      products={products}
    />
  );
}
