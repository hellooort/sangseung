-- product_categories 에 LED 카테고리 단일 소스용 컬럼 추가
-- Supabase Dashboard > SQL Editor 에서 실행하세요
ALTER TABLE public.product_categories
  ADD COLUMN IF NOT EXISTS slug TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS specs_ko TEXT,
  ADD COLUMN IF NOT EXISTS specs_en TEXT;

-- ---------------------------------------------------------------------
-- 기존 데이터 백필: LED 페이지(page_led)에 등록돼 있던 카드 이미지/스펙을
-- 같은 링크의 카테고리로 복사한다. (기존 값이 비어있는 경우에만 채움)
-- ---------------------------------------------------------------------
UPDATE public.product_categories pc
SET
  image_url = COALESCE(NULLIF(pc.image_url, ''), src.image),
  specs_ko  = COALESCE(NULLIF(pc.specs_ko, ''), src.specs_ko),
  specs_en  = COALESCE(NULLIF(pc.specs_en, ''), src.specs_en)
FROM (
  SELECT
    p->>'href'     AS href,
    p->>'image'    AS image,
    p->>'specs_ko' AS specs_ko,
    p->>'specs_en' AS specs_en
  FROM public.site_settings,
       jsonb_array_elements((value::jsonb)->'products') AS p
  WHERE key = 'page_led'
) src
WHERE src.href LIKE '%/' || (
  CASE pc.name_ko
    WHEN 'COB LED'       THEN 'cob'
    WHEN 'INDOOR FIXED'  THEN 'indoor'
    WHEN 'OUTDOOR FIXED' THEN 'outdoor'
    WHEN 'RENTAL'        THEN 'rental'
    WHEN 'MEDIA FACADE'  THEN 'facade'
    WHEN 'AD SIGN'       THEN 'adsign'
    ELSE '__none__'
  END
);

-- ---------------------------------------------------------------------
-- page_led 가 저장된 적 없는 환경 대비: 위에서도 비었으면 기본값으로 채움.
-- ---------------------------------------------------------------------
UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/SCO-Wall/1-1.png'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'전면 손상 방지·방수\n쉬운 청소\n낮은 픽셀 불량률'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'Front damage protection and waterproof\nEasy Cleaning\nLow Pixel Error Rate')
WHERE name_ko = 'COB LED';

UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/S-Wall/2.jpg'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'고화질 LED 비디오월\n지능형 전원 관리\n낮은 픽셀 불량률'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'High Quality LED Video Wall\nIntelligent Power Management\nLow Pixel Error Rate')
WHERE name_ko = 'INDOOR FIXED';

UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/SOD-C/SOD-C_main_img_sample.jpg'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'이중 방수 설계\nP to P 병렬 연결\n전면·후면 유지보수 접근'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'Double waterproof design\nP to P Parallel Connection\nFront and Rear Access for Maintenance')
WHERE name_ko = 'OUTDOOR FIXED';

UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/SFD/2.jpg'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'빠른 설치\n지능형 모니터링\n다양한 설치 모드'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'Quick Installation\nIntelligent Management Monitoring\nVarious Installation Modes')
WHERE name_ko = 'RENTAL';

UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/SMI/1.jpg'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'초슬림·경량\n높은 투과율\n창의적 디자인'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'Ultra Slim & Lightweight\nHigh Transparency\nCreative Design')
WHERE name_ko = 'MEDIA FACADE';

UPDATE public.product_categories SET
  image_url = COALESCE(NULLIF(image_url, ''), '/image/AD Cloud/AD Cloud_main.jpg'),
  specs_ko  = COALESCE(NULLIF(specs_ko, ''),  E'클라우드 기반 LED 디스플레이 시스템\n스마트 콘텐츠 제어\n개별·그룹 관리'),
  specs_en  = COALESCE(NULLIF(specs_en, ''),  E'Cloud Based LED Display System\nSmart Content Control\nIndividual and Group Management')
WHERE name_ko = 'AD SIGN';
