import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/locale";

export interface LedCategoryProduct {
  slug: string;
  name: string;
  name_en?: string;
  description_ko: string;
  description_en?: string;
  image: string;
}

interface Props {
  locale: Locale;
  categoryLabel: string;
  categorySlug: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  products: LedCategoryProduct[];
}

export default function LedCategoryPage({
  locale,
  categoryLabel,
  categorySlug,
  title_ko,
  title_en,
  description_ko,
  description_en,
  products,
}: Props) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="pt-44 pb-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
            <Link href="/business/led" className="hover:text-[#4A90D9]">
              {t("LED 디스플레이", "LED Display")}
            </Link>
            <span>/</span>
            <span className="text-[#4A90D9]">{categoryLabel}</span>
          </div>
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-3 block">{categoryLabel}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {locale === "en" ? title_en : title_ko}
          </h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            {locale === "en" ? description_en : description_ko}
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/business/led/${categorySlug}/${product.slug}`}
                className="group bg-[#111] rounded-2xl overflow-hidden hover:bg-[#1a1a1a] transition-all block"
              >
                <div className="relative aspect-video bg-[#1a1a1a]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 sm:p-8 group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                    {locale === "en" && product.name_en ? product.name_en : product.name}
                  </h3>
                  <p className="text-[#888] leading-relaxed mb-4 text-sm">
                    {locale === "en" && product.description_en ? product.description_en : product.description_ko}
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

      <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("제품에 대해 더 알고 싶으신가요?", "Want to learn more about our products?")}
          </h2>
          <p className="text-white/80 mb-8">
            {t("설치 환경에 맞는 최적의 LED 솔루션을 제안해 드립니다.",
              "We will propose the optimal LED solution for your installation environment.")}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
          >
            {t("문의하기", "Contact Us")}
          </Link>
        </div>
      </section>
    </>
  );
}
