import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";
import { ledCategorySlug, type LedCategoryRow } from "@/lib/led-categories";

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

interface CobProduct {
  slug: string;
  name: string;
  name_en: string;
  description_ko: string;
  description_en: string;
  image: string;
}

export default async function COBLEDPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const [rows, cats] = await Promise.all([
    getList<DbProductRow>(
      "products",
      { orderBy: "sort_order", filter: { column: "category_slug", value: "cob" } },
    ),
    getList<LedCategoryRow>("product_categories", { orderBy: "sort_order" }),
  ]);
  const cobCat = cats.find((c) => ledCategorySlug(c) === "cob");
  const descKo = cobCat?.description_ko?.trim() ||
    "Chip on Board 기술을 적용한 차세대 LED 디스플레이입니다. 기존 SMD 방식 대비 더 높은 화질과 안정성을 제공합니다.";
  const descEn = cobCat?.description_en?.trim() ||
    "Next-generation LED displays based on Chip-on-Board technology, delivering higher image quality and reliability than conventional SMD displays.";
  const products: CobProduct[] = rows
    .map((r) => ({
      slug: r.slug as string,
      name: r.name_ko ?? r.name ?? "",
      name_en: r.name_en ?? r.name_ko ?? r.name ?? "",
      description_ko: r.description_ko ?? "",
      description_en: r.description_en ?? "",
      image: r.image_url ?? "/image/LFlex/LFlex_01.jpg",
    }));

  return (
    <>
      <section className="pt-44 pb-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
            <Link href="/business/led" className="hover:text-[#4A90D9]">
              {t("LED 디스플레이", "LED Display")}
            </Link>
            <span>/</span>
            <span className="text-[#4A90D9]">COB LED</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">COB LED</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed whitespace-pre-line">
            {t(descKo, descEn)}
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/business/led/cob/${product.slug}`}
                className="group bg-[#111] rounded-2xl overflow-hidden hover:bg-[#1a1a1a] transition-all"
              >
                <div className="relative aspect-video bg-[#1a1a1a]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 sm:p-8 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                    {tr(locale, product.name, product.name_en)}
                  </h3>
                  <p className="text-[#888] leading-relaxed mb-4">
                    {tr(locale, product.description_ko, product.description_en)}
                  </p>
                  <span className="text-[#4A90D9] text-sm font-medium flex items-center gap-2">
                    {t("자세히 보기", "Learn More")}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t("COB 기술의 장점", "Benefits of COB Technology")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{t("높은 안정성", "High Reliability")}</h3>
              <p className="text-[#888] text-sm">
                {t(
                  "LED 칩이 기판에 직접 실장되어 충격에 강하고 안정적인 운영이 가능합니다.",
                  "LED chips are mounted directly onto the board, resulting in shock resistance and stable operation.",
                )}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{t("뛰어난 화질", "Outstanding Image Quality")}</h3>
              <p className="text-[#888] text-sm">
                {t(
                  "미세 픽셀피치로 가까운 거리에서도 선명한 화질을 제공합니다.",
                  "Fine pixel pitch delivers crisp visuals even at close viewing distances.",
                )}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{t("에너지 효율", "Energy Efficient")}</h3>
              <p className="text-[#888] text-sm">
                {t(
                  "기존 SMD 대비 전력 소비가 적어 경제적인 운영이 가능합니다.",
                  "Lower power consumption than conventional SMD solutions enables cost-effective operation.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
