import LedCategoryPage from "@/components/LedCategoryPage";
import { getLocale } from "@/lib/locale.server";

const products = [
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
