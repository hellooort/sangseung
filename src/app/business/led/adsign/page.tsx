import LedCategoryPage from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";

const products = [
  { slug: "ad-sign",   name: "AD Sign",            name_en: "AD Sign",
    description_ko: "클라우드 LED 사이니지",
    description_en: "Cloud-based LED signage",
    image: "/image/AD Cloud/AD Cloud_main.jpg" },
  { slug: "cloud-iot", name: "Cloud IoT Solution", name_en: "Cloud IoT Solution",
    description_ko: "IoT 기반 통합 관제 솔루션",
    description_en: "IoT-based integrated control solution",
    image: "/image/AD Cloud/AD Cloud_main.jpg" },
];

export default async function AdSignPage() {
  const locale = await getLocale();
  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="AD SIGN"
      categorySlug="adsign"
      title_ko="AD SIGN"
      title_en="AD SIGN"
      description_ko="클라우드 기반 LED 광고 사이니지 솔루션으로, 원격 콘텐츠 관리와 모니터링이 가능한 차세대 옥외 광고 시스템입니다."
      description_en="Cloud-based LED advertising signage with remote content management and monitoring."
      products={products}
    />
  );
}
