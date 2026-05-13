-- =====================================================================
-- office_locations: 네이버 지도용 위도/경도 컬럼 추가
-- ---------------------------------------------------------------------
-- /about/location 페이지를 구글 iframe → 네이버 지도 JavaScript API 로
-- 전환하면서 좌표 기반 마커가 필요해졌습니다.
--
-- - lat: 위도 (예: 37.5400)
-- - lng: 경도 (예: 126.8350)
-- 멱등(IF NOT EXISTS) 하므로 여러 번 실행해도 안전합니다.
-- =====================================================================

ALTER TABLE public.office_locations
  ADD COLUMN IF NOT EXISTS lat NUMERIC(10, 7);

ALTER TABLE public.office_locations
  ADD COLUMN IF NOT EXISTS lng NUMERIC(10, 7);

-- ---------------------------------------------------------------------
-- 기본 좌표 채워넣기 (좌표가 비어있는 row 만)
-- 정확한 좌표는 admin 페이지에서 수정 가능
-- ---------------------------------------------------------------------
UPDATE public.office_locations
   SET lat = 37.5454, lng = 126.8516
 WHERE name_ko = '본사' AND (lat IS NULL OR lng IS NULL);

UPDATE public.office_locations
   SET lat = 37.6147, lng = 127.1465
 WHERE name_ko = '미디어시스템사업부' AND (lat IS NULL OR lng IS NULL);

UPDATE public.office_locations
   SET lat = 37.8262, lng = 127.0535
 WHERE name_ko = '양주공장' AND (lat IS NULL OR lng IS NULL);
