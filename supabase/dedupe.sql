-- =====================================================================
-- 중복 데이터 정리 (seed.sql을 두 번 이상 실행한 경우용)
-- 각 테이블에서 "사실상 같은 row"는 1개만 남기고 더 큰 id를 삭제합니다.
-- 한 번만 실행해도 안전 (이미 깨끗한 상태면 0건 삭제).
-- =====================================================================

-- partners : 같은 name_ko 끼리 합치기 (작은 id 한 개만 남김)
DELETE FROM public.partners a
USING public.partners b
WHERE a.name_ko = b.name_ko
  AND a.id > b.id;

-- histories : 같은 year + text_ko 면 동일 항목으로 본다
DELETE FROM public.histories a
USING public.histories b
WHERE a.year = b.year
  AND a.text_ko = b.text_ko
  AND a.id > b.id;

-- office_locations : 본사/미디어시스템사업부/양주공장 등 name_ko 기준
DELETE FROM public.office_locations a
USING public.office_locations b
WHERE a.name_ko = b.name_ko
  AND a.id > b.id;

-- certificates : title_ko 기준
DELETE FROM public.certificates a
USING public.certificates b
WHERE a.title_ko = b.title_ko
  AND a.id > b.id;

-- works : title_ko 기준
DELETE FROM public.works a
USING public.works b
WHERE a.title_ko = b.title_ko
  AND a.id > b.id;

-- products : name 기준
DELETE FROM public.products a
USING public.products b
WHERE a.name = b.name
  AND a.id > b.id;

-- 확인용 (각 테이블 row 수 출력)
SELECT 'partners'         AS table_name, COUNT(*) AS rows FROM public.partners
UNION ALL SELECT 'histories',         COUNT(*) FROM public.histories
UNION ALL SELECT 'office_locations',  COUNT(*) FROM public.office_locations
UNION ALL SELECT 'certificates',      COUNT(*) FROM public.certificates
UNION ALL SELECT 'works',             COUNT(*) FROM public.works
UNION ALL SELECT 'products',          COUNT(*) FROM public.products;