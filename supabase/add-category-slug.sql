-- product_categories 에 slug 컬럼 추가
-- Supabase Dashboard > SQL Editor 에서 실행하세요
ALTER TABLE public.product_categories
  ADD COLUMN IF NOT EXISTS slug TEXT NOT NULL DEFAULT '';
