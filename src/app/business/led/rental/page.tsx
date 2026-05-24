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

export default async function RentalPage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "rental" } },
  );
  const products: LedCategoryProduct[] = rows
    .map((r) => ({
      slug: r.slug as string,
      name: r.name_ko ?? r.name ?? "",
      name_en: r.name_en ?? undefined,
      description_ko: r.description_ko ?? "",
      description_en: r.description_en ?? undefined,
      image: r.image_url ?? "/image/SFD/2.jpg",
    }));

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="RENTAL"
      categorySlug="rental"
      title_ko="RENTAL"
      title_en="RENTAL"
      description_ko="이벤트·전시·공연 등 단기간 운영을 위한 렌탈 전용 LED 디스플레이로, 빠른 설치와 해체가 가능합니다."
      description_en="Rental-only LED displays for events, exhibitions, and performances with quick install and tear-down."
      products={products}
    />
  );
}
