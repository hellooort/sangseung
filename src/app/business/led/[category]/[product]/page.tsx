import { notFound } from "next/navigation";
import { getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import ProductDetailRenderer, { type ProductDetail } from "@/components/ProductDetailRenderer";

export const revalidate = 60;

// row 자체에 detail/slug/category_slug 컬럼이 없는 환경(=마이그레이션 미적용)에서도
// 죽지 않도록 모든 필드를 옵셔널로 받는다. 알 수 없는 컬럼은 그냥 무시.
interface ProductRow {
  id: number;
  slug?: string | null;
  category_slug?: string | null;
  name?: string | null;
  name_ko?: string | null;
  name_en?: string | null;
  description_ko?: string | null;
  description_en?: string | null;
  image_url?: string | null;
  detail?: unknown;
}

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

// detail 컬럼이 string/숫자/배열 등으로 잘못 저장되어 있어도 빈 객체로 폴백.
function normalizeDetail(raw: unknown): ProductDetail {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  return raw as ProductDetail;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, product } = await params;
  const locale = await getLocale();

  const products = await getList<ProductRow>("products", { orderBy: "sort_order" }, []);
  const row = products.find(
    (p) =>
      typeof p.slug === "string" &&
      typeof p.category_slug === "string" &&
      p.slug.toLowerCase() === product.toLowerCase() &&
      p.category_slug.toLowerCase() === category.toLowerCase(),
  );

  if (!row) {
    notFound();
  }

  const detail: ProductDetail = normalizeDetail(row.detail);

  // hero 가 비어있으면 최소 정보로 채워서 빈 화면을 막는다.
  if (!detail.hero || typeof detail.hero !== "object") {
    detail.hero = {
      title: row.name_ko ?? row.name ?? "Product",
      title_en: row.name_en ?? row.name_ko ?? row.name ?? "Product",
      tag: category.toUpperCase(),
      description_ko: row.description_ko ?? "",
      description_en: row.description_en ?? "",
      image: row.image_url ?? "",
    };
  }

  return <ProductDetailRenderer detail={detail} locale={locale} />;
}
