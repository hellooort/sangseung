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
  { slug: "sgl",  name: "SGL Series",  name_en: "SGL Series",
    description_ko: "투명 글래스 LED",
    description_en: "Transparent glass LED",
    image: "/image/reference/work_8.jpg" },
  { slug: "rod1", name: "ROD-1 Series", name_en: "ROD-1 Series",
    description_ko: "고휘도 실외 미디어 파사드",
    description_en: "High-brightness outdoor media facade",
    image: "/image/reference/work_8.jpg" },
  { slug: "rod2", name: "ROD-2 Series", name_en: "ROD-2 Series",
    description_ko: "슬림 미디어 파사드",
    description_en: "Slim media facade",
    image: "/image/reference/work_8.jpg" },
  { slug: "rod3", name: "ROD-3 Series", name_en: "ROD-3 Series",
    description_ko: "대형 면적 미디어 파사드",
    description_en: "Large-area media facade",
    image: "/image/reference/work_8.jpg" },
  { slug: "rod4", name: "ROD-4 Series", name_en: "ROD-4 Series",
    description_ko: "커스텀 미디어 파사드",
    description_en: "Custom media facade",
    image: "/image/reference/work_8.jpg" },
];

export default async function MediaFacadePage() {
  const locale = await getLocale();
  const rows = await getList<DbProductRow>(
    "products",
    { orderBy: "sort_order", filter: { column: "category_slug", value: "facade" } },
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
          image: r.image_url ?? "/image/reference/work_8.jpg",
        }))
    : fallback;

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
