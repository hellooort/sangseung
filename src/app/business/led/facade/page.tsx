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

export default async function MediaFacadePage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "facade" } },
  );
  const products: LedCategoryProduct[] = rows
    .map((r) => ({
      slug: r.slug as string,
      name: r.name_ko ?? r.name ?? "",
      name_en: r.name_en ?? undefined,
      description_ko: r.description_ko ?? "",
      description_en: r.description_en ?? undefined,
      image: r.image_url ?? "/image/reference/work_8.jpg",
    }));

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="MEDIA FACADE"
      categorySlug="facade"
      title_ko="MEDIA FACADE"
      title_en="MEDIA FACADE"
      description_ko="건물 외벽과 일체화된 미디어 파사드 LED 솔루션으로, 도시 경관과 어우러지는 대형 영상 표현이 가능합니다."
      description_en="Media-facade LED solutions integrated into building exteriors that blend with the urban landscape."
      products={products}
    />
  );
}
