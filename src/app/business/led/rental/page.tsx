import LedCategoryPage from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";

const products = [
  { slug: "svi50", name: "SVI50 Series", name_en: "SVI50 Series",
    description_ko: "이벤트·렌탈 전용 LED 디스플레이",
    description_en: "LED display dedicated to events and rentals",
    image: "/image/SFD/2.jpg" },
  { slug: "std",   name: "STD Series",   name_en: "STD Series",
    description_ko: "슬림 경량 렌탈 LED 디스플레이",
    description_en: "Slim and lightweight rental LED display",
    image: "/image/SFD/2.jpg" },
];

export default async function RentalPage() {
  const locale = await getLocale();
  return (
    <LedCategoryPage
      locale={locale}
      categoryLabel="RENTAL"
      categorySlug="rental"
      title_ko="RENTAL"
      title_en="RENTAL"
      description_ko="이벤트·전시·공연 등 단기간 운영을 위한 렌탈 전용 LED 디스플레이로, 빠른 설치와 해체가 가능합니다."
      description_en="Rental-only LED displays for events, exhibitions, and performances with quick install and tear-down."
      products={products}
    />
  );
}
