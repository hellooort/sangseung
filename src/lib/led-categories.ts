// LED 카테고리 단일 소스 헬퍼.
// product_categories 테이블이 LED 디스플레이 카테고리의 원본이며,
// 공개 메인(/business/led), 네비게이션, 카테고리 상세 페이지가 모두 이걸 읽는다.

export interface LedCategoryRow {
  id: number;
  name_ko: string;
  name_en: string | null;
  slug: string | null;
  image_url: string | null;
  specs_ko: string | null;
  specs_en: string | null;
  sort_order: number;
}

// 기존 6개 카테고리는 고정 slug(=정적 페이지 파일명)와 1:1 매핑.
export const CAT_SLUG_MAP: Record<string, string> = {
  "COB LED": "cob",
  "INDOOR FIXED": "indoor",
  "OUTDOOR FIXED": "outdoor",
  RENTAL: "rental",
  "MEDIA FACADE": "facade",
  "AD SIGN": "adsign",
};

// 카테고리 → URL slug. 매핑 우선, 그 다음 DB slug, 마지막으로 id 기반.
export function ledCategorySlug(cat: {
  id: number;
  name_ko: string;
  slug?: string | null;
}): string {
  return CAT_SLUG_MAP[cat.name_ko] || (cat.slug ?? "").trim() || `cat-${cat.id}`;
}

export function ledCategoryHref(cat: { id: number; name_ko: string; slug?: string | null }): string {
  return `/business/led/${ledCategorySlug(cat)}`;
}
