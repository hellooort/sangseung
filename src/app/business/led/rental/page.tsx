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

const fallback: LedCategoryProduct[] = [
  { slug: "svi50", name: "SVI50 Series", name_en: "SVI50 Series",
    description_ko: "이벤트·렌탈 전용 LED 디스플레이",
    description_en: "LED display dedicated to events and rentals",
    image: "/image/SFD/2.jpg" },
  { slug: "std",   name: "STD Series",   name_en: "STD Series",
    description_ko: "슬림 경량 렌탈 LED 디스플레이",
    description_en: "Slim and lightweight rental LED display",
    image: "/image/SFD/2.jpg" },
];

export default async function RentalPage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "rental" } },
    [],
  );
  const products: LedCategoryProduct[] = rows.length > 0
    ? rows
        .filter((r) => r.slug)
        .map((r) => ({
          slug: r.slug as string,
          name: r.name_ko ?? r.name ?? "",
          name_en: r.name_en ?? undefined,
          description_ko: r.description_ko ?? "",
          description_en: r.description_en ?? undefined,
          image: r.image_url ?? "/image/SFD/2.jpg",
        }))
    : fallback;

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
