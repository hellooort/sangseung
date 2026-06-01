import { notFound } from "next/navigation";
import LedCategoryPage, { type LedCategoryProduct } from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";
import { ledCategorySlug, type LedCategoryRow } from "@/lib/led-categories";

export const dynamic = "force-dynamic";

interface DbProductRow {
  slug: string | null;
  name: string | null;
  name_ko: string | null;
  name_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  image_url: string | null;
  category_id: number | null;
  sort_order: number;
}

// 신규 제품 카테고리(/business/led/{slug})용 동적 페이지.
// 기존 고정 카테고리(cob/indoor/...)는 각자의 정적 page.tsx 가 우선 처리되고,
// 관리자에서 새로 추가한 카테고리만 이 라우트로 들어온다.
export default async function DynamicLedCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const locale = await getLocale();

  const cats = await getList<LedCategoryRow>("product_categories", { orderBy: "sort_order" });
  const cat = cats.find((c) => ledCategorySlug(c) === category);
  if (!cat) notFound();

  const rows = await getList<DbProductRow>("products", {
    orderBy: "sort_order",
    filter: { column: "category_id", value: cat.id },
  });

  const products: LedCategoryProduct[] = rows.map((r) => ({
    slug: r.slug || String(r.category_id ?? ""),
    name: r.name_ko ?? r.name ?? "",
    name_en: r.name_en ?? undefined,
    description_ko: r.description_ko ?? "",
    description_en: r.description_en ?? undefined,
    image: r.image_url ?? "/image/reference/work_8.jpg",
  }));

  const label = locale === "en" && cat.name_en ? cat.name_en : cat.name_ko;

  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel={label}
      categorySlug={category}
      title_ko={cat.name_ko}
      title_en={cat.name_en ?? cat.name_ko}
      description_ko=""
      description_en=""
      products={products}
    />
  );
}
