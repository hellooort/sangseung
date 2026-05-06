-- =====================================================================
-- products 테이블에 제품 상세페이지용 컬럼 추가 (1회 실행)
-- - category_slug : URL 카테고리 (예: indoor / outdoor / cob)
-- - slug          : URL 제품 슬러그 (예: s-wall / lflex)
-- - detail        : 제품 상세 페이지 콘텐츠 JSON (Hero/갤러리/배너/특징/사양/적용/CTA)
-- =====================================================================

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_slug TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug          TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS detail        JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_ko       TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_en       TEXT;

-- name 만 있던 row 의 name_ko 채우기
UPDATE public.products SET name_ko = name WHERE name_ko IS NULL AND name IS NOT NULL;

-- 같은 카테고리 안에서 slug 중복 방지 (NULL 은 허용)
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx
  ON public.products (category_slug, slug)
  WHERE slug IS NOT NULL AND category_slug IS NOT NULL;

-- 기존 5개 시드 제품에 slug 매핑 (이미 채워져 있으면 그대로 둠)
UPDATE public.products SET slug = 'lflex',     category_slug = 'cob'     WHERE name = 'LFlex'           AND (slug IS NULL OR slug = '');
UPDATE public.products SET slug = 'sco-wall',  category_slug = 'cob'     WHERE name = 'SCO-Wall Series' AND (slug IS NULL OR slug = '');
UPDATE public.products SET slug = 's-wall',    category_slug = 'indoor'  WHERE name = 'S-Wall Series'   AND (slug IS NULL OR slug = '');
UPDATE public.products SET slug = 'sod',       category_slug = 'outdoor' WHERE name = 'SOD Series'      AND (slug IS NULL OR slug = '');
UPDATE public.products SET slug = 'ad-sign',   category_slug = 'adsign'  WHERE name = 'AD Sign'         AND (slug IS NULL OR slug = '');

-- =====================================================================
-- 실행 후 확인:
--   SELECT id, name, category_slug, slug, jsonb_typeof(detail) AS detail_type
--   FROM public.products ORDER BY id;
--
--   → category_slug / slug 컬럼이 보이고, jsonb_typeof = 'object' 면 OK.
-- =====================================================================
