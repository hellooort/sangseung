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
  { slug: "s-wall",  name: "S-Wall Series",  name_en: "S-Wall Series",
    description_ko: "고화질 실내용 LED 디스플레이",
    description_en: "High-resolution indoor LED display",
    image: "/image/S-Wall/2.jpg" },
  { slug: "svi60",   name: "SVI60 Series",   name_en: "SVI60 Series",
    description_ko: "슬림형 실내용 LED 디스플레이",
    description_en: "Slim indoor LED display",
    image: "/image/S-Wall/2.jpg" },
  { slug: "svi1000", name: "SVI 1000 Series", name_en: "SVI 1000 Series",
    description_ko: "대형 실내용 LED 디스플레이",
    description_en: "Large-format indoor LED display",
    image: "/image/S-Wall/2.jpg" },
];

export default async function IndoorFixedPage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "indoor" } },
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
          image: r.image_url ?? "/image/S-Wall/2.jpg",
        }))
    : fallback;

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="INDOOR FIXED"
      categorySlug="indoor"
      title_ko="INDOOR FIXED"
      title_en="INDOOR FIXED"
      description_ko="실내 환경에 최적화된 고화질 LED 디스플레이 라인업입니다. 회의실, 컨트롤룸, 스튜디오 등 다양한 실내 공간에 활용됩니다."
      description_en="A premium indoor LED display lineup optimized for meeting rooms, control rooms, and studios."
      products={products}
    />
  );
}
