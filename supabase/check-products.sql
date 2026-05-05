-- =====================================================================
-- 제품 상세페이지 500 에러 진단용 - Supabase SQL Editor 에서 실행
-- =====================================================================

-- 1) products 테이블에 detail / slug / category_slug 컬럼이 있는지
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'products'
ORDER BY ordinal_position;

-- 2) 모든 제품의 slug / category_slug / detail 상태
SELECT
  id,
  name,
  name_ko,
  category_slug,
  slug,
  CASE
    WHEN detail IS NULL THEN 'NULL'
    WHEN detail = '{}'::jsonb THEN 'EMPTY {}'
    WHEN jsonb_typeof(detail) <> 'object' THEN 'INVALID(' || jsonb_typeof(detail) || ')'
    ELSE 'object[' || (SELECT count(*) FROM jsonb_object_keys(detail)) || ' keys]'
  END AS detail_status,
  CASE
    WHEN slug IS NULL OR slug = '' THEN 'BAD'
    WHEN category_slug IS NULL OR category_slug = '' THEN 'BAD'
    ELSE 'OK'
  END AS routing_status
FROM public.products
ORDER BY id;

-- 3) 카테고리별 집계
SELECT
  COALESCE(category_slug, '(no slug)') AS category_slug,
  count(*) AS product_count,
  count(*) FILTER (WHERE slug IS NOT NULL AND slug <> '') AS with_slug,
  count(*) FILTER (WHERE detail IS NOT NULL AND detail <> '{}'::jsonb) AS with_detail
FROM public.products
GROUP BY category_slug
ORDER BY category_slug;
