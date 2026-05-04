import LedCategoryPage from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";

const products = [
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
