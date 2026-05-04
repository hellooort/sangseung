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
-- 6) IBS 통합시스템 카테고리 + 항목 (admin: /admin/business/ibs)
-- ---------------------------------------------------------------------
INSERT INTO public.ibs_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('통합배선공사',          'Integrated Cabling',     0),
  ('CCTV 공사',             'CCTV',                    1),
  ('CATV 공사',             'CATV',                    2),
  ('AV 공사',               'AV System',               3),
  ('원격검침공사',          'Remote Metering',         4),
  ('서버실구축/이전공사',   'Server Room',             5),
  ('출입통제공사',          'Access Control',          6),
  ('전관방송공사',          'Public Address',          7),
  ('UPS공사',               'UPS',                     8)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.ibs_categories c WHERE c.name_ko = v.name_ko);

INSERT INTO public.ibs_items (category_id, title_ko, sort_order)
SELECT (SELECT id FROM public.ibs_categories WHERE name_ko = v.cat), v.title_ko, v.sort_order FROM (VALUES
  ('통합배선공사',         '맨홀 시공',                  0),
  ('통합배선공사',         '관로구 방수 시공',           1),
  ('통합배선공사',         '신축건물 매입배관 시공',     2),
  ('통합배선공사',         '옥외 배관 시공',             3),
  ('CCTV 공사',            'CCTV 설치 현장',             0),
  ('CCTV 공사',            'CCTV 통합관제',              1),
  ('CATV 공사',            'CATV 배선',                  0),
  ('AV 공사',              'AV 시스템 구축',             0),
  ('서버실구축/이전공사',  '서버실 구축',                0),
  ('서버실구축/이전공사',  '서버실 이전',                1),
  ('출입통제공사',         '출입통제 시스템',            0),
  ('전관방송공사',         '전관방송 설비',              0)
) AS v(cat, title_ko, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.ibs_items i WHERE i.title_ko = v.title_ko);

-- ---------------------------------------------------------------------
-- 7) 해외 프로젝트 카테고리 + 항목 (admin: /admin/business/overseas)
-- ---------------------------------------------------------------------
INSERT INTO public.overseas_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('GUAM',           'Guam',         0),
  ('일본',           'Japan',        1),
  ('사이판',         'Saipan',       2),
  ('사우디아라비아', 'Saudi Arabia', 3),
  ('태국',           'Thailand',     4),
  ('말레이시아',     'Malaysia',     5)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.overseas_categories c WHERE c.name_ko = v.name_ko);

INSERT INTO public.overseas_projects (category_id, title_ko, sort_order)
SELECT (SELECT id FROM public.overseas_categories WHERE name_ko = v.cat), v.title_ko, v.sort_order FROM (VALUES
  ('GUAM',           '롯데호텔 GUAM 네트워크 인프라 구축공사 (2014)',         0),
  ('일본',           '롯데 일본 아라이리조트 네트워크 인프라 구축공사 (2017)', 0),
  ('사이판',         '한화월드리조트 사이판 네트워크 이중화공사 (2019)',       0),
  ('사우디아라비아', '한화건설 사우디아라비아 네트워크 인프라 구축 (2018)',    0),
  ('태국',           '한화케미칼 태국 네트워크 인프라 구축 (2018)',           0),
  ('말레이시아',     '롯데케미칼 말레이시아 네트워크 인프라 구축 (2018)',     0)
) AS v(cat, title_ko, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.overseas_projects p WHERE p.title_ko = v.title_ko);

-- ---------------------------------------------------------------------
-- 8) 공사실적 카테고리 + 연도별 실적 (admin: /admin/business/projects)
--    카테고리는 단일("정보통신공사")로 두고 year 필드로 분류
--    capacity 는 각 연도 첫 번째 record 에만 입력 (UI 표시용)
-- ---------------------------------------------------------------------
INSERT INTO public.project_record_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('정보통신공사', 'ICT Construction', 0)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.project_record_categories c WHERE c.name_ko = v.name_ko);

-- ---------------------------------------------------------------------
-- 9) 공사실적 record (2014~2025, 약 170+건)
-- ---------------------------------------------------------------------
INSERT INTO public.project_records (category_id, name_ko, year, capacity, sort_order)
SELECT
  (SELECT id FROM public.project_record_categories WHERE name_ko = '정보통신공사'),
  v.name_ko, v.year, v.capacity, v.sort_order
FROM (VALUES
  ('2025', '서울아산병원 신관 중환자실 증설 정보통신공사', '90.3억', 0),
  ('2025', '㈜앤씨앤 정보통신공사', NULL, 1),
  ('2025', '(주)삼기 서산1사업장, 수원공장 네트워크공사', NULL, 2),
  ('2025', '삼성웰스토리 오산, 왜관, 김해물류센터 증축 통신공사', NULL, 3),
  ('2025', 'LS ELECTRIC 청주 1,2사업장, 천안사업장 AP 설치공사', NULL, 4),
  ('2025', 'LS전선 동해사업장 CCTV 망분리 구축', NULL, 5),
  ('2025', 'LS전선 사업장 인프라효율화 네트워크구축', NULL, 6),
  ('2025', '건국대학교 열람실, 공학관, 쿨하우스 무선 네트워크구축', NULL, 7),
  ('2025', '수원성빈센트병원 병동 무선 네트워크구축', NULL, 8),
  ('2025', '서정대학교 무선 네트워크구축', NULL, 9),
  ('2025', '선단초교 디지털창작소 네트워크 구축공사', NULL, 10),
  ('2025', '셀트리온 제약 유무선 네트워크 증설 통신공사', NULL, 11),
  ('2025', 'SKC 충무로 본사 사옥이전 네트워크 공사', NULL, 12),
  ('2025', 'IKEA 고양점 네트워크장비 교체 건', NULL, 13),
  ('2025', '기아자동차 화성지점 이전 통신공사', NULL, 14),
  ('2025', '강북삼성병원 검진센터 무선AP 교체 공사', NULL, 15),
  ('2025', '쿠팡 G-IDC센터 GPU node 추가 네트워크 구축', NULL, 16),
  ('2025', '쿠팡 과천, 평촌 IDC센터 네트워크 구축', NULL, 17),
  ('2025', '쿠팡 SEL1 FC 서버룸 이중화 구축, SAN3 FC 네트워크 구축 공사', NULL, 18),
  ('2025', '쿠팡 SIH2 FC AMR 구축, SIH1 FC AI Camera 네트워크 공사', NULL, 19),
  ('2025', '한화시스템(주) 정보통신공사', NULL, 20),
  ('2025', '한화시스템(주) ICT부문 정보통신공사', NULL, 21),
  ('2025', '한화첨단소재 미국 택사스주 신축공장 네트워크 구축공사', NULL, 22),
  ('2024', '서울아산병원 서관 NRICU/공용ICU 환경개선 정보통신공사', '74.9억', 0),
  ('2024', '㈜넥스트칩 본사 이전 인프라 구축 공사', NULL, 1),
  ('2024', 'SC제일은행 정보통신공사', NULL, 2),
  ('2024', '(주)삼기 서산1, 2사업장 네트워크공사', NULL, 3),
  ('2024', '경찰청 112시스템 노후 네트워크 및 보안 장비 교체 통신공사', NULL, 4),
  ('2024', 'KT 강남 IDC 6층 N/W 케이블링 고도화 통신공사', NULL, 5),
  ('2024', 'LS ELECTRIC 사업장 무선 AP 교체공사', NULL, 6),
  ('2024', 'LS 용산타워 무선 네트워크 공사', NULL, 7),
  ('2024', '삼성웰스토리 전국물류센터 서버실 UPS 교체 설치', NULL, 8),
  ('2024', '삼성웰스토리 아산 CK물류센터 네트워크 구축', NULL, 9),
  ('2024', '쿠팡 (일산, 남양주, 양재, 제주, 용인, 광주, 천안, 제천) PICO Sub-Hub 네트워크 공사', NULL, 10),
  ('2024', '쿠팡FC (곤지암, 동탄) 노후장비교체, 서버룸 이중화 공사', NULL, 11),
  ('2024', '쿠팡 CHA2 FC Ph2 IT 인프라 구축, MB켐프 네트워크 공사', NULL, 12),
  ('2024', '쿠팡 DON1 FC AMR, 이천ECH1 FC Phase2 IT인프라 구축공사', NULL, 13),
  ('2024', '쿠팡 GEW2 FC 네트워크 구축, 곤지암GON1 FC 서버룸 이중화 공사', NULL, 14),
  ('2024', '쿠팡 GOY1 FC AGV, 창원CHW4 FC ARC 네트워크 구축공사', NULL, 15),
  ('2024', '(주)한화갤러리아 광교점 정보통신공사', NULL, 16),
  ('2024', '한화시스템(주) 정보통신공사', NULL, 17),
  ('2024', '(주)에어로스페이스 네트워크공사', NULL, 18),
  ('2024', '한화첨단소재 미국 조지아주 태양광 신축공장 네트워크 구축공사', NULL, 19),
  ('2023', '서울아산병원 정보통신공사', '60.4억', 0),
  ('2023', '(주)넥스트칩 판교사옥 정보통신공사', NULL, 1),
  ('2023', '(주)삼기 서산공장, 평택공장 정보통신공사', NULL, 2),
  ('2023', '쌍용정보통신(주) 전산실환경개선 통신공사', NULL, 3),
  ('2023', '(주)유앤씨이 지오영 IDC 네트워크 통신공사', NULL, 4),
  ('2023', '송도 발카코리아 정보통신 공사', NULL, 5),
  ('2023', '송도 후지필름 신공장 네트워크 공사', NULL, 6),
  ('2023', '한국타이어 테크노돔 네트워크 공사', NULL, 7),
  ('2023', '삼성웰스토리 평택물류센터 네트워크 공사', NULL, 8),
  ('2023', '한화시스템(주) 정보통신공사', NULL, 9),
  ('2023', '(주)한화갤러리아타임월드 정보통신공사', NULL, 10),
  ('2023', '(주)한화/기계부문 정보통신공사', NULL, 11),
  ('2023', '한화솔루션(주) 음성제2사업장 정보통신공사', NULL, 12),
  ('2023', '한화시스템(주) ICT부문 정보통신공사', NULL, 13),
  ('2023', '한화첨단소재 미국 조지아주 신축공장 네트워크 구축공사', NULL, 14),
  ('2022', '㈜앤씨앤 평촌, 안양, 용인공장 정보통신공사', '57.2억', 0),
  ('2022', '(주)넥스트칩 판교사옥 정보통신공사', NULL, 1),
  ('2022', '(주)휴넷 정보통신공사', NULL, 2),
  ('2022', '서울아산병원 정보통신공사', NULL, 3),
  ('2022', '웰컴저축은행 정보통신공사', NULL, 4),
  ('2022', '영원무역 본사, 성남, 명동 정보통신 공사', NULL, 5),
  ('2022', '삼성웰스토리 광주, 용인물류센터 정보통신공사', NULL, 6),
  ('2022', '종근당 본사 서버실 개선공사', NULL, 7),
  ('2022', '동국제강 당진 도성공장 정보통신공사', NULL, 8),
  ('2022', '무신사 압구정M1빌딩 네트워크 인프라구축공사', NULL, 9),
  ('2022', '오송 보건산업진흥원 정보통신공사', NULL, 10),
  ('2022', '(주)삼기 서산사업장 정보통신공사', NULL, 11),
  ('2022', '송도 아마다 신사옥 통신공사', NULL, 12),
  ('2022', '(주)한화 첨단소재 정보통신공사', NULL, 13),
  ('2022', '한화시스템(주) 정보통신공사', NULL, 14),
  ('2022', '한화에어로스페이스(주) 정보통신공사', NULL, 15),
  ('2022', '(주)농협네트웍스 김포축협 종합시설 신축공사', NULL, 16),
  ('2022', '서울지방우정청 서울양평동우체국 노후시설개선공사(통신)', NULL, 17),
  ('2022', '서울지방우정청 동서울 우편집중국 CCTV 구매·설치공사(통신)', NULL, 18),
  ('2021', '서울아산병원 정보통신공사', '49.6억', 0),
  ('2021', '(주)앤씨앤 안양 SF창고, 용인 신규공장 정보통신공사', NULL, 1),
  ('2021', '(주)휴넷 정보통신공사', NULL, 2),
  ('2021', '(주)팀프레시 정보통신공사', NULL, 3),
  ('2021', '웰컴저축은행 정보통신공사', NULL, 4),
  ('2021', '한국에너지기술평가원 전산실 통신공사', NULL, 5),
  ('2021', '노일중학교 체육관 및 급식실 증축 통신공사', NULL, 6),
  ('2021', '숭미초등학교 체육관 및 급식실 증축 통신공사', NULL, 7),
  ('2021', '경찰청 전산실 케이블 공사', NULL, 8),
  ('2021', '(주)넥스트정보기술 정보통신공사', NULL, 9),
  ('2021', '한화시스템(주) ICT부문 정보통신공사', NULL, 10),
  ('2021', '한화솔루션(주) 정보통신공사', NULL, 11),
  ('2021', '한화솔루션(주) 갤러리아 진주점, 광교점, 센터시티 정보통신공사', NULL, 12),
  ('2021', '(주)한화/기계부문 정보통신공사', NULL, 13),
  ('2021', '(주)한화갤러리아타임월드 정보통신공사', NULL, 14),
  ('2021', '한화시스템(주) 무선네트워크공사', NULL, 15),
  ('2021', '한화디펜스(주) 정보통신공사', NULL, 16),
  ('2021', '한화에어로스페이스(주) 정보통신공사', NULL, 17),
  ('2020', '서울아산병원 정보통신공사', '51.6억', 0),
  ('2020', '서초구청 정보통신공사', NULL, 1),
  ('2020', '웰컴저축은행 정보통신공사', NULL, 2),
  ('2020', '㈜앤씨앤 정보통신공사', NULL, 3),
  ('2020', '(주)삼기 서산사업장 K동 네트워크공사', NULL, 4),
  ('2020', '(주)한화갤러리아 광교점 정보통신공사', NULL, 5),
  ('2020', '삼성웰스토리 전국 물류센터 네트워크 공사', NULL, 6),
  ('2020', '오스템임플란트 본사, 물류센터 네트워크 공사', NULL, 7),
  ('2020', '한화시스템(주) 정보통신공사', NULL, 8),
  ('2020', '(주)한화갤러리아타임월드 정보통신공사', NULL, 9),
  ('2020', '(주)한화/기계부문 정보통신공사', NULL, 10),
  ('2020', '한화호텔앤드리조트(주) 정보통신공사', NULL, 11),
  ('2020', '(주)한화63시티 정보통신공사', NULL, 12),
  ('2020', '한화솔루션(주) 정보통신공사', NULL, 13),
  ('2020', '한화솔루션(주) 음성제2사업장 정보통신공사', NULL, 14),
  ('2020', '(주)한화갤러리아 명품관, 수원컨벤션센터점', NULL, 15),
  ('2020', '(주)한화갤러리아 (주)한화보은사업장 정보통신공사', NULL, 16),
  ('2020', '한화시스템(주) ICT부문 정보통신공사', NULL, 17),
  ('2019', '신촌역 탑시티 면세 네트워크 환경구축', NULL, 0),
  ('2019', '63빌딩 통신실 이전 구축', NULL, 1),
  ('2019', '한국타이어 삼평동 통합배선공사', NULL, 2),
  ('2019', '동해남부선 Smart Park구축사업 통신공사', NULL, 3),
  ('2019', '한화솔루션 진천공장 LDSE.Oxidation MES 통신공사', NULL, 4),
  ('2019', '한화솔루션 울산1,2공장 노후 광케이블 교체공사', NULL, 5),
  ('2019', '상상마당 부산 통합배선', NULL, 6),
  ('2019', '한화 내부망 및 외부망 추가 보완공사', NULL, 7),
  ('2019', '사이판 월드리조트 네트워크 이중화공사', NULL, 8),
  ('2019', '삼기오토모티브 서산사업장 네트워크 공사', NULL, 9),
  ('2019', '서울광진우체국 위탁택배작업장조성공사', NULL, 10),
  ('2018', '한화빌딩 유·무선 네트워크 이전 설치공사', NULL, 0),
  ('2018', '현대자동차 아산 엔진개조 네트워크 구축공사', NULL, 1),
  ('2018', '한국보건산업진흥원 오송 네트워크 환경 개선공사', NULL, 2),
  ('2018', 'LS메탈 장항사업장 네트워크 구축공사', NULL, 3),
  ('2018', '한화 리조트 설악, 경주 네트워크 이중화 구축공사', NULL, 4),
  ('2018', '한화/기계 본사 이전 통신 및 랜 구축공사', NULL, 5),
  ('2018', '한화 방산사업장 네트워크 인프라 개선 구축공사', NULL, 6),
  ('2018', '아마다코리아 송도신축 통합배선공사', NULL, 7),
  ('2018', '동국제강 냉연 당진도성공장 IT 인프라구축공사', NULL, 8),
  ('2018', '현대자동차 신엔진 무선 네트워크 구축공사', NULL, 9),
  ('2018', '아산병원 네트워크 구축공사', NULL, 10),
  ('2017', '영에드에프아이 통합배선 공사', NULL, 0),
  ('2017', '한화 음성사업장 K1, K2 네트워크 구축공사', NULL, 1),
  ('2017', '한화 아산사업장 민수부분 네트워크 구축공사', NULL, 2),
  ('2017', '한화 방산사업장 네트워크 방 분리 공사', NULL, 3),
  ('2017', '롯데 일본 아라이리조트 네트워크 인프라 구축공사', NULL, 4),
  ('2017', 'AIG 손해보험 IFC 네트워크 구축공사', NULL, 5),
  ('2017', '한화생명 63빌딩 통신실 이전 구축공사', NULL, 6),
  ('2016', '세종 미디어프라자 통합배선 공사', NULL, 0),
  ('2016', '동국제강 당진공장 상부카메라 설치공사', NULL, 1),
  ('2016', 'KMC 화성 차체3공장 고장예지 시스템 네트워크 구축', NULL, 2),
  ('2016', '인하대학교 응급실 네트워크 구축공사', NULL, 3),
  ('2016', '동양피엔에프 네트워크 구축공사', NULL, 4),
  ('2016', 'AIG 손해보험 콜센타 네트워크 개선 구축공사', NULL, 5),
  ('2016', '한화 인재경영원 무선 AP 및 방 분리 공사', NULL, 6),
  ('2016', '국민체육진흥공단 스포츠레저사업부 네트워크구축', NULL, 7),
  ('2016', '한화 첨단소재 네트워크 인프라 구축공사', NULL, 8),
  ('2016', '한화 갤러리아 본사이전 네트워크 구축공사', NULL, 9),
  ('2016', '서울 강북경찰서 솔샘지구대 신축 통신공사', NULL, 10),
  ('2015', '외교부 고도화장비 설치 공사', NULL, 0),
  ('2015', '한화 사업장 네트워크 망 분리 공사', NULL, 1),
  ('2015', '롯데 용인센타 네트워크 공사', NULL, 2),
  ('2015', '드림플러스 통신 및 랜 인프라 구축공사', NULL, 3),
  ('2015', '동원산업 네트워크 구축공사', NULL, 4),
  ('2015', '기아 화성차체공장 설비관리 네트워크 구축공사', NULL, 5),
  ('2015', '잠실 롯데 C2 공연장 네트워크 구축공사', NULL, 6),
  ('2015', '해군 2함대 통합배선공사', NULL, 7),
  ('2014', '서초구청 민원센타 통신공사', NULL, 0),
  ('2014', '호남석유 네트워크 구축공사', NULL, 1),
  ('2014', '국회도서관 네트워크 구축공사', NULL, 2),
  ('2014', '동우 EMS시스템 무선 AP구축공사', NULL, 3),
  ('2014', '롯데호텔 Guam 네트워크 인프라 구축공사', NULL, 4)
) AS v(year, name_ko, capacity, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.project_records r
  WHERE r.year = v.year AND r.name_ko = v.name_ko
);

-- ---------------------------------------------------------------------
-- 결과 확인 (각 테이블 row 수 출력)
-- ---------------------------------------------------------------------
SELECT 'business_sections'             AS table_name, COUNT(*) AS rows FROM public.business_sections
UNION ALL SELECT 'products',                    COUNT(*) FROM public.products
UNION ALL SELECT 'works',                       COUNT(*) FROM public.works
UNION ALL SELECT 'partners',                    COUNT(*) FROM public.partners
UNION ALL SELECT 'histories',                   COUNT(*) FROM public.histories
UNION ALL SELECT 'office_locations',            COUNT(*) FROM public.office_locations
UNION ALL SELECT 'certificates',                COUNT(*) FROM public.certificates
UNION ALL SELECT 'site_settings',               COUNT(*) FROM public.site_settings
UNION ALL SELECT 'ibs_categories',              COUNT(*) FROM public.ibs_categories
UNION ALL SELECT 'ibs_items',                   COUNT(*) FROM public.ibs_items
UNION ALL SELECT 'overseas_categories',         COUNT(*) FROM public.overseas_categories
UNION ALL SELECT 'overseas_projects',           COUNT(*) FROM public.overseas_projects
UNION ALL SELECT 'project_record_categories',   COUNT(*) FROM public.project_record_categories
UNION ALL SELECT 'project_records',             COUNT(*) FROM public.project_records;