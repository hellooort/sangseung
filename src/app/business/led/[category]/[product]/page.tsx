import { notFound } from "next/navigation";
import { getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import ProductDetailRenderer, { type ProductDetail } from "@/components/ProductDetailRenderer";

export const revalidate = 60;

interface ProductRow {
  id: number;
  slug: string | null;
  category_slug: string | null;
  name: string | null;
  name_ko: string | null;
  detail: ProductDetail | null;
}

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, product } = await params;
  const locale = await getLocale();

  const products = await getList<ProductRow>("products", { orderBy: "sort_order" }, []);
  const row = products.find(
    (p) => p.slug?.toLowerCase() === product.toLowerCase() && p.category_slug?.toLowerCase() === category.toLowerCase(),
  );

  if (!row) {
    notFound();
  }

  const detail: ProductDetail = row.detail ?? {};

  if (!detail.hero) {
    detail.hero = {
      title: row.name_ko ?? row.name ?? "Product",
      tag: category.toUpperCase(),
    };
  }

  return <ProductDetailRenderer detail={detail} locale={locale} />;
}
