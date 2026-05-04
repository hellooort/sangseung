-- =====================================================================
-- 한 번에 모든 schema 누락 + 중복 + 빠진 데이터를 정리하는 통합 스크립트
-- Supabase SQL Editor에서 전체 선택 → Run
-- 멱등(여러 번 실행해도 안전)합니다.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) 누락된 컬럼 추가 (migrations.sql 과 동일, 멱등)
-- ---------------------------------------------------------------------
ALTER TABLE public.histories          ADD COLUMN IF NOT EXISTS month TEXT;
ALTER TABLE public.press_releases     ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.resources          ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE public.works              ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.works              ADD COLUMN IF NOT EXISTS logo_url TEXT;

ALTER TABLE public.products           ADD COLUMN IF NOT EXISTS name_ko TEXT;
ALTER TABLE public.products           ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.products           ADD COLUMN IF NOT EXISTS detail_url TEXT;
UPDATE public.products SET name_ko = name WHERE name_ko IS NULL OR name_ko = '';

ALTER TABLE public.business_sections  ADD COLUMN IF NOT EXISTS cta_label_ko TEXT;
ALTER TABLE public.business_sections  ADD COLUMN IF NOT EXISTS cta_label_en TEXT;

-- 인증서/시공사례 카테고리에도 영문 보강 (이미 있으면 무시)
ALTER TABLE public.certificate_categories ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.work_categories         ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.certificates            ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.works                   ADD COLUMN IF NOT EXISTS title_en TEXT;

-- 사업장(office_locations) 영문 주소 컬럼 보강
ALTER TABLE public.office_locations   ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.office_locations   ADD COLUMN IF NOT EXISTS address_en TEXT;

-- ---------------------------------------------------------------------
-- 2) 중복 데이터 정리 (dedupe.sql 과 동일, 멱등)
--    seed.sql 을 두 번 실행해 중복이 생긴 경우 자동 정리
-- ---------------------------------------------------------------------
DELETE FROM public.partners a
USING public.partners b
WHERE a.name_ko = b.name_ko AND a.id > b.id;

DELETE FROM public.histories a
USING public.histories b
WHERE a.year = b.year AND a.text_ko = b.text_ko AND a.id > b.id;

DELETE FROM public.office_locations a
USING public.office_locations b
WHERE a.name_ko = b.name_ko AND a.id > b.id;

DELETE FROM public.certificates a
USING public.certificates b
WHERE a.title_ko = b.title_ko AND a.id > b.id;

DELETE FROM public.works a
USING public.works b
WHERE a.title_ko = b.title_ko AND a.id > b.id;

DELETE FROM public.products a
USING public.products b
WHERE a.name = b.name AND a.id > b.id;

-- ---------------------------------------------------------------------
-- 3) 빠진 business_sections 4개 row 채우기 (schema mismatch 로 실패했을 것)
--    이미 있으면 INSERT 안 됨 (PK 충돌)
-- ---------------------------------------------------------------------
INSERT INTO public.business_sections (id, title_ko, title_en, subtitle_ko, subtitle_en, description_ko, description_en, hero_image, cta_label_ko, cta_label_en, features) VALUES
  ('network', '네트워크 사업', 'Network Business',
   '통합 네트워크 인프라 솔루션', 'Integrated Network Infrastructure',
   'IBS 통합시스템부터 글로벌 프로젝트까지, 최고의 네트워크 인프라 솔루션을 제공합니다.',
   'From IBS integrated systems to global projects, we provide best-in-class network infrastructure solutions.',
   '/image/reference/work_4.jpg', '문의하기', 'Contact us',
   '[
     {"id":"1","title_ko":"IBS 통합시스템","title_en":"IBS Integrated System","description_ko":"통합배선, CCTV, AV, 서버실 등 빌딩 인프라 전반","description_en":"Wiring, CCTV, AV, server room, and overall building infrastructure"},
     {"id":"2","title_ko":"해외 프로젝트","title_en":"Overseas Projects","description_ko":"GUAM, 일본, 태국 등 글로벌 네트워크 인프라 구축","description_en":"Global network infrastructure in Guam, Japan, Thailand"},
     {"id":"3","title_ko":"공사실적","title_en":"Project Records","description_ko":"20년 축적된 네트워크 구축 실적","description_en":"20+ years of network construction experience"}
   ]'::jsonb
  ),
  ('led', 'LED 디스플레이', 'LED Display',
   'Total LED Display Solution', 'Total LED Display Solution',
   '설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.',
   'A one-stop LED display company covering design, manufacturing, installation and maintenance.',
   '/image/reference/work_8.jpg', '문의하기', 'Contact us',
   '[
     {"id":"1","title_ko":"INDOOR FIXED","title_en":"Indoor Fixed","description_ko":"S-Wall, SVI60, SVI1000 등 실내용 고화질 LED","description_en":"Indoor high-quality LED such as S-Wall, SVI60, SVI1000"},
     {"id":"2","title_ko":"OUTDOOR FIXED","title_en":"Outdoor Fixed","description_ko":"SOD, SCOD 시리즈 고휘도 실외용 LED","description_en":"SOD/SCOD series high-brightness outdoor LED"},
     {"id":"3","title_ko":"COB LED","title_en":"COB LED","description_ko":"LFlex, SCO-Wall 등 최신 COB 기술","description_en":"Latest COB tech such as LFlex, SCO-Wall"},
     {"id":"4","title_ko":"MEDIA FACADE","title_en":"Media Facade","description_ko":"SGL, ROD 시리즈 미디어 파사드","description_en":"SGL/ROD series media facade"}
   ]'::jsonb
  ),
  ('video-wall', 'Video-Wall', 'Video-Wall',
   'CALICO PRO Video Processing Solution', 'CALICO PRO Video Processing Solution',
   '수백 개의 4K60 비디오 창과 10비트 색 심도를 지원하는 tvONE CALICO PRO 기반의 차세대 Video-Wall 프로세싱 솔루션입니다.',
   'Next-generation Video-Wall processing solution based on tvONE CALICO PRO.',
   '/image/calico-pro.png', '문의하기', 'Contact us',
   '[
     {"id":"1","title_ko":"CALICO PRO 2200","title_en":"CALICO PRO 2200","description_ko":"대규모 관제센터 / 방송 환경용 하이엔드 프로세서","description_en":"High-end processor for control rooms / broadcast"},
     {"id":"2","title_ko":"CALICO PRO 1200","title_en":"CALICO PRO 1200","description_ko":"중소규모 환경 최적화 모델","description_en":"Optimized model for small to medium environments"}
   ]'::jsonb
  ),
  ('maintenance', '정보통신 유지보수·관리', 'ICT Maintenance & Management',
   'Specialists in Reliable ICT', 'Specialists in Reliable ICT',
   '상승종합통신은 정보통신 전문기업으로 최고의 품질을 제공합니다.',
   'Sangseung is an ICT specialist providing the highest quality.',
   '/image/reference/work_15.jpg', '문의하기', 'Contact us',
   '[
     {"id":"1","title_ko":"성능보장","title_en":"Performance Assurance","description_ko":"최적의 시스템 성능 유지","description_en":"Maintaining optimal system performance"},
     {"id":"2","title_ko":"보안성","title_en":"Security","description_ko":"철저한 보안으로 안전 강화","description_en":"Enhanced safety through thorough security"},
     {"id":"3","title_ko":"고장예방","title_en":"Failure Prevention","description_ko":"사전 점검으로 장애 차단","description_en":"Preventing failures through regular inspection"},
     {"id":"4","title_ko":"안정성","title_en":"Stability","description_ko":"지속 관리로 안정적 운용","description_en":"Stable operation through continuous management"},
     {"id":"5","title_ko":"비용절감","title_en":"Cost Reduction","description_ko":"효율 관리로 운영비 절감","description_en":"Reduced operating costs"}
   ]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 4) 빠진 products 5개 row 채우기 (schema mismatch 로 실패했을 것)
-- ---------------------------------------------------------------------
INSERT INTO public.products (category_id, name, name_ko, name_en, description_ko, description_en, specs, image_url, sort_order)
SELECT v.category_id, v.name, v.name_ko, v.name_en, v.description_ko, v.description_en, v.specs, v.image_url, v.sort_order FROM (VALUES
  (1, 'LFlex',           'LFlex',           'LFlex',           'COB 기술이 적용된 고화질 플렉시블 LED 디스플레이', 'High-quality flexible LED display with COB technology', 'P0.93 / P1.25 / P1.56', '/image/LFlex/LFlex_01.jpg',                  0),
  (1, 'SCO-Wall Series', 'SCO-Wall Series', 'SCO-Wall Series', '프리미엄 COB 패키징 기술의 고급형 LED 월',         'Premium LED wall with advanced COB packaging',          'P0.78 / P0.93 / P1.25', '/image/SCO-Wall/1-1.png',                    1),
  (2, 'S-Wall Series',   'S-Wall Series',   'S-Wall Series',   '고화질 실내용 LED 디스플레이',                      'High-quality indoor LED display',                       'P1.2 ~ P4',             '/image/S-Wall/2.jpg',                        2),
  (3, 'SOD Series',      'SOD Series',      'SOD Series',      '고휘도 실외용 LED 디스플레이',                      'High-brightness outdoor LED display',                   'P4 ~ P16',              '/image/SOD-C/SOD-C_main_img_sample.jpg',     3),
  (6, 'AD Sign',         'AD Sign',         'AD Sign',         '클라우드 기반 LED 광고 사이니지',                   'Cloud-based LED advertising signage',                   'P3.91',                 '/image/AD Cloud/AD Cloud_main.jpg',          4)
) AS v(category_id, name, name_ko, name_en, description_ko, description_en, specs, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.products p WHERE p.name = v.name);

-- ---------------------------------------------------------------------
-- 5) 빠진 works 23개 row 채우기 (size 컬럼 mismatch 로 실패했을 것)
-- ---------------------------------------------------------------------
INSERT INTO public.works (category_id, title_ko, size, image_url, sort_order)
SELECT v.category_id, v.title_ko, v.size, v.image_url, v.sort_order FROM (VALUES
  (1, 'LH 컨퍼런스 LED 포스터',                                  'S-Poster P2.5mm',          '/image/reference/work_1.jpg',  0),
  (1, '씨아이씨소프트 스튜디오 LED 스크린',                      'S-Wall P1.875mm',           '/image/reference/work_2.jpg',  1),
  (1, '의왕시 의회 LED 스크린',                                   'S-Wall P1.875mm',           '/image/reference/work_3.jpg',  2),
  (1, '호주 SUN CORP 실내 COB LED 스크린',                        'SCO-Wall P0.93mm, 0.78mm',  '/image/reference/work_4.jpg',  3),
  (1, '충남교육청 학생교육문화원 실내 LED 스크린',                'SI640 P1.83mm',             '/image/reference/work_5.jpg',  4),
  (1, '서울시청 다목적홀 LED 스크린',                             'SI640 P2.5mm',              '/image/reference/work_6.jpg',  5),
  (1, '폴리텍 대학 서울 정수 캠퍼스 스튜디오 LED 스크린',         'SI640 P2.5mm',              '/image/reference/work_7.jpg',  6),
  (4, '김해 금관가야휴게소 LED 미디어 파사드',                     'SMI P7.8mm',                '/image/reference/work_8.jpg',  7),
  (4, '중국 스포츠 스타디움 LED 미디어파사드',                     'SMO P31.25mm',              '/image/reference/work_9.jpg',  8),
  (2, '서울 강서구 보건소 LED 전자게시대',                          'SOD-C P10mm',               '/image/reference/work_10.jpg', 9),
  (2, '공릉동 도깨비시장 클라우드 시스템 전광판',                   'SOD-C P10, P4, P6mm',       '/image/reference/work_11.jpg', 10),
  (2, '경상북도 경제진흥원 옥외 전광판',                           'SOD-C P16mm',               '/image/reference/work_12.jpg', 11),
  (4, '경주중심상가 옥외 Cube LED 미디어파사드',                    'SOD-C P4mm',                '/image/reference/work_13.jpg', 12),
  (2, '폴리텍 대학교 인천캠퍼스 LED 전광판',                       'SOD-C P6mm',                '/image/reference/work_14.jpg', 13),
  (2, '광명시청 시민회관 대형 LED 포스터',                          'SOD-C P8mm',                '/image/reference/work_15.jpg', 14),
  (2, '방글라데시 다카공항 대형 LED 전광판',                       'SOD-E P10mm',               '/image/reference/work_16.jpg', 15),
  (2, '목동깨비시장 양면형 클라우드 시스템 LED 전자게시대',         'SOD-E P5mm',                '/image/reference/work_17.jpg', 16),
  (2, '광주시 동구 대인교차로 클라우드 시스템 LED 전자게시대',      'SOD-E P6.25mm',             '/image/reference/work_18.jpg', 17),
  (2, '생거진천시장 클라우드 시스템 LED 전자게시대',                'SOD-E P6.25mm',             '/image/reference/work_19.jpg', 18),
  (2, '진천 광혜원면 클라우드 시스템 LED 전자게시대',               'SOD-E P6.25mm',             '/image/reference/work_20.jpg', 19),
  (2, '한국원자력의학원 대형 LED 전광판',                           'SOD-E P6.25mm',             '/image/reference/work_21.jpg', 20),
  (3, '일본 방재훈련소 LED 스크린',                                 'SOD-R P3.91mm',             '/image/reference/work_22.jpg', 21),
  (2, '서울경찰청 기동본부 차량용 양면 LED 전광판',                 'SOD-T P3.91mm',             '/image/reference/work_23.jpg', 22)
) AS v(category_id, title_ko, size, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.works w WHERE w.title_ko = v.title_ko);

-- ---------------------------------------------------------------------
-- 결과 확인
-- ---------------------------------------------------------------------
SELECT 'business_sections'   AS table_name, COUNT(*) AS rows FROM public.business_sections
UNION ALL SELECT 'products',          COUNT(*) FROM public.products
UNION ALL SELECT 'works',             COUNT(*) FROM public.works
UNION ALL SELECT 'partners',          COUNT(*) FROM public.partners
UNION ALL SELECT 'histories',         COUNT(*) FROM public.histories
UNION ALL SELECT 'office_locations',  COUNT(*) FROM public.office_locations
UNION ALL SELECT 'certificates',      COUNT(*) FROM public.certificates
UNION ALL SELECT 'site_settings',     COUNT(*) FROM public.site_settings;