-- product_categories 에 카테고리 설명 문구 컬럼 추가
-- (제품 라인업 카테고리 페이지 상단 제목 밑 설명을 관리자에서 수정 가능하게)
-- Supabase Dashboard > SQL Editor 에서 실행하세요
ALTER TABLE public.product_categories
  ADD COLUMN IF NOT EXISTS description_ko TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;

-- ---------------------------------------------------------------------
-- 기존 하드코딩 문구 백필 (값이 비어있는 경우에만 채움)
-- ---------------------------------------------------------------------
UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), 'Chip on Board 기술을 적용한 차세대 LED 디스플레이입니다. 기존 SMD 방식 대비 더 높은 화질과 안정성을 제공합니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'Next-generation LED displays based on Chip-on-Board technology, delivering higher image quality and reliability than conventional SMD displays.')
WHERE name_ko = 'COB LED';

UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), '실내 환경에 최적화된 고화질 LED 디스플레이 라인업입니다. 회의실, 컨트롤룸, 스튜디오 등 다양한 실내 공간에 활용됩니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'A premium indoor LED display lineup optimized for meeting rooms, control rooms, and studios.')
WHERE name_ko = 'INDOOR FIXED';

UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), '고휘도와 방수·방진 성능을 갖춘 실외용 LED 디스플레이로, 광장·건물 외벽·도로 등 옥외 환경에 최적입니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'High-brightness, weather-resistant outdoor LED displays — ideal for plazas, building facades, and roadsides.')
WHERE name_ko = 'OUTDOOR FIXED';

UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), '이벤트·전시·공연 등 단기간 운영을 위한 렌탈 전용 LED 디스플레이로, 빠른 설치와 해체가 가능합니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'Rental-only LED displays for events, exhibitions, and performances with quick install and tear-down.')
WHERE name_ko = 'RENTAL';

UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), '건물 외벽과 일체화된 미디어 파사드 LED 솔루션으로, 도시 경관과 어우러지는 대형 영상 표현이 가능합니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'Media-facade LED solutions integrated into building exteriors that blend with the urban landscape.')
WHERE name_ko = 'MEDIA FACADE';

UPDATE public.product_categories SET
  description_ko = COALESCE(NULLIF(description_ko, ''), '클라우드 기반 LED 광고 사이니지 솔루션으로, 원격 콘텐츠 관리와 모니터링이 가능한 차세대 옥외 광고 시스템입니다.'),
  description_en = COALESCE(NULLIF(description_en, ''), 'Cloud-based LED advertising signage with remote content management and monitoring.')
WHERE name_ko = 'AD SIGN';
