"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

export interface ProductDetail {
  hero?: {
    tag?: string;
    title?: string;
    title_en?: string;
    description_ko?: string;
    description_en?: string;
    image?: string;
    summary?: { label_ko?: string; label_en?: string; value_ko?: string; value_en?: string }[];
    cta_label_ko?: string;
    cta_label_en?: string;
    cta_link?: string;
  };
  gallery?: {
    images?: string[];
    title_ko?: string;
    title_en?: string;
    subtitle_en?: string;
    description_ko?: string;
    description_en?: string;
    options_label_ko?: string;
    options_label_en?: string;
    options?: string[];
  };
  banner?: {
    image?: string;
    title_ko?: string;
    title_en?: string;
    description_ko?: string;
    description_en?: string;
  };
  features?: {
    subtitle_en?: string;
    title_ko?: string;
    title_en?: string;
    description_ko?: string;
    description_en?: string;
    image?: string;
  }[];
  specs?: { label?: string; value?: string }[];
  applications?: { title_ko?: string; title_en?: string; description_ko?: string; description_en?: string }[];
  cta_section?: {
    title_ko?: string;
    title_en?: string;
    description_ko?: string;
    description_en?: string;
  };
}

interface Props {
  detail: ProductDetail;
  locale?: Locale;
}

// Image 컴포넌트는 src 가 빈 문자열일 때 throw 한다. 잘못된 값을 모두 걸러낸다.
const isValidUrl = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0;

export default function ProductDetailRenderer({ detail, locale = "ko" }: Props) {
  // detail 안의 배열 필드가 admin/DB 측 실수로 배열이 아닐 가능성을 막는다.
  const galleryImagesRaw = Array.isArray(detail.gallery?.images)  ? (detail.gallery!.images as unknown[]) : [];
  const galleryImages    = galleryImagesRaw.filter(isValidUrl);
  const galleryOptions   = Array.isArray(detail.gallery?.options) ? (detail.gallery!.options as string[]) : [];
  const heroSummary      = Array.isArray(detail.hero?.summary)    ? detail.hero!.summary! : [];
  const featuresArr      = Array.isArray(detail.features)         ? detail.features! : [];
  const specsArr         = Array.isArray(detail.specs)            ? detail.specs! : [];
  const applicationsArr  = Array.isArray(detail.applications)     ? detail.applications! : [];

  const [selectedOption, setSelectedOption] = useState<string | null>(galleryOptions[0] ?? null);
  const [selectedImage, setSelectedImage] = useState(0);

  const heroImage = isValidUrl(detail.hero?.image) ? detail.hero!.image! : null;
  const bannerImage = isValidUrl(detail.banner?.image) ? detail.banner!.image! : null;
  const images: string[] = galleryImages.length ? galleryImages : heroImage ? [heroImage] : [];
  const currentImage = images[selectedImage];

  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImage && (
            <Image src={heroImage} alt={detail.hero?.title ?? ""} fill className="object-cover" priority unoptimized />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-20 w-full">
          {detail.hero?.tag && (
            <span className="inline-block text-[#4A90D9] text-xs tracking-[0.3em] font-medium border border-[#4A90D9]/30 px-4 py-1.5 rounded-full mb-6">
              {detail.hero.tag}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95]">
            {tr(locale, detail.hero?.title, detail.hero?.title_en)}
          </h1>
          {(detail.hero?.description_ko || detail.hero?.description_en) && (
            <p className="text-[#aaa] text-base md:text-lg max-w-xl leading-relaxed mb-8 whitespace-pre-line">
              {tr(locale, detail.hero?.description_ko, detail.hero?.description_en)}
            </p>
          )}

          {heroSummary.length > 0 && (
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-10">
              {heroSummary.map((s, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8 bg-white/10" />}
                  <div>
                    <span className="block text-white/30 text-xs mb-1">{tr(locale, s.label_ko, s.label_en)}</span>
                    <span className="text-white font-medium">{tr(locale, s.value_ko, s.value_en)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            href={detail.hero?.cta_link ?? "/contact"}
            className="inline-block bg-white text-black px-8 py-3.5 rounded font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            {tr(locale, detail.hero?.cta_label_ko, detail.hero?.cta_label_en) || t("견적 문의", "Get a Quote")}
          </Link>
        </div>
      </section>

      {/* Section 2: Gallery + Product Info */}
      {(detail.gallery?.title_ko || images.length > 0) && (
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex gap-3">
                {images.length > 1 && (
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? "border-[#4A90D9]" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                      </button>
                    ))}
                  </div>
                )}
                <div className="relative flex-1 aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  {currentImage && (
                    <Image src={currentImage} alt="" fill className="object-contain p-4" unoptimized />
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {tr(locale, detail.gallery?.title_ko, detail.gallery?.title_en)}
                </h2>
                {detail.gallery?.subtitle_en && (
                  <p className="text-gray-400 text-sm mb-6">{detail.gallery.subtitle_en}</p>
                )}
                {(detail.gallery?.description_ko || detail.gallery?.description_en) && (
                  <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                    {tr(locale, detail.gallery?.description_ko, detail.gallery?.description_en)}
                  </p>
                )}

                {galleryOptions.length > 0 && (
                  <div className="mb-8">
                    <span className="text-gray-900 font-bold text-sm mb-3 block">
                      {tr(locale, detail.gallery?.options_label_ko, detail.gallery?.options_label_en) || t("픽셀 피치", "Pixel Pitch")}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {galleryOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                            selectedOption === opt
                              ? "border-[#4A90D9] text-[#4A90D9] bg-[#4A90D9]/5"
                              : "border-gray-200 text-gray-500 hover:border-gray-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-black transition-colors w-full text-center mb-6"
                >
                  {t("견적 문의", "Get a Quote")}
                </Link>

                <p className="text-gray-400 text-xs text-center leading-relaxed">
                  {t("온라인으로 문의를 남겨 주세요. 담당자가 신속하게 검토 후 맞춤형 제안서를 제공해 드립니다.",
                    "Submit your inquiry online. Our team will respond quickly with a tailored proposal.")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Immersive Banner */}
      {(detail.banner?.title_ko || bannerImage) && (
        <section className="relative py-0">
          <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            {bannerImage && (
              <div className="absolute inset-0">
                <Image src={bannerImage} alt="" fill className="object-cover opacity-50" unoptimized />
              </div>
            )}
            <div className="relative text-center px-6 max-w-4xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
                {tr(locale, detail.banner?.title_ko, detail.banner?.title_en)}
              </h2>
              {(detail.banner?.description_ko || detail.banner?.description_en) && (
                <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  {tr(locale, detail.banner?.description_ko, detail.banner?.description_en)}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Tech Features */}
      {featuresArr.length > 0 && (
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            {featuresArr.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center ${index > 0 ? "mt-32" : ""}`}
              >
                <div className="md:w-1/2">
                  <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden">
                    {isValidUrl(feature.image) && <Image src={feature.image as string} alt="" fill className="object-cover" unoptimized />}
                  </div>
                </div>
                <div className="md:w-1/2">
                  {feature.subtitle_en && (
                    <span className="text-[#4A90D9] text-xs tracking-[0.2em] font-medium mb-3 block">
                      {feature.subtitle_en}
                    </span>
                  )}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight whitespace-pre-line text-left break-keep">
                    {tr(locale, feature.title_ko, feature.title_en)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left break-keep">
                    {tr(locale, feature.description_ko, feature.description_en)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Specifications */}
      {specsArr.length > 0 && (
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t("Specifications", "Specifications")}</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specsArr.map((spec, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4 text-gray-700 font-medium bg-gray-50 w-2/5 text-sm">{spec.label}</td>
                      <td className="px-6 py-4 text-gray-600 text-center text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs text-center mt-4">
              {t("* 제품 사양은 사전 고지 없이 변경될 수 있습니다.",
                "* Specifications are subject to change without prior notice.")}
            </p>
          </div>
        </section>
      )}

      {/* Section 6: Applications */}
      {applicationsArr.length > 0 && (
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">{t("Applications", "Applications")}</h2>
            <p className="text-gray-500 text-center mb-12">
              {t("다양한 공간에 최적화된 영상 솔루션을 제공합니다.", "Optimal video solutions for diverse spaces.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicationsArr.map((app, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <span className="text-[#4A90D9] text-xs font-bold mb-3 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-gray-900 text-lg font-bold mb-2">{tr(locale, app.title_ko, app.title_en)}</h3>
                  <p className="text-gray-500 text-sm">{tr(locale, app.description_ko, app.description_en)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 7: CTA */}
      {(detail.cta_section?.title_ko || detail.cta_section?.title_en) && (
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {tr(locale, detail.cta_section?.title_ko, detail.cta_section?.title_en)}
            </h2>
            {(detail.cta_section?.description_ko || detail.cta_section?.description_en) && (
              <p className="text-white/80 mb-8">
                {tr(locale, detail.cta_section?.description_ko, detail.cta_section?.description_en)}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
              >
                {t("견적 문의", "Get a Quote")}
              </Link>
              <Link
                href="/works"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded font-semibold hover:bg-white/10 transition-colors"
              >
                {t("시공 사례 보기", "View Projects")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
