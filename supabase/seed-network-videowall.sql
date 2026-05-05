-- =====================================================================
-- IBS / 해외 프로젝트 / 공사실적 / Video-Wall 초기 시드 데이터
-- (admin 페이지에 들어가도 비어있는 테이블을 채웁니다 — 1회 실행)
-- 이미 데이터가 있는 row 는 ON CONFLICT 또는 NOT EXISTS 로 보호.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) IBS — 카테고리 + 아이템
-- ---------------------------------------------------------------------
INSERT INTO public.ibs_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('구내통신선로',    'Structured Cabling',     0),
  ('CCTV 설비',        'CCTV',                   1),
  ('CATV 설비',        'CATV',                   2),
  ('AV 설비',          'AV',                     3),
  ('전산실 구축/이전', 'Server Room Build/Move', 4),
  ('출입통제',         'Access Control',         5),
  ('구내방송',         'Public Address',         6),
  ('UPS설비',          'UPS',                    7)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.ibs_categories x WHERE x.name_ko = v.name_ko);

INSERT INTO public.ibs_items (category_id, title_ko, title_en, sort_order)
SELECT (SELECT id FROM public.ibs_categories WHERE name_ko = v.cat_name),
       v.title_ko, v.title_en, v.sort_order
FROM (VALUES
  ('구내통신선로',    '맨홀 설치',               'Manhole Installation',         0),
  ('구내통신선로',    '전선관 방수 처리',        'Conduit Waterproofing',        1),
  ('구내통신선로',    '신축 건물 매립 전선관',   'Embedded Conduit (New Build)', 2),
  ('구내통신선로',    '옥외 전선관 시공',        'Outdoor Conduit',              3),
  ('CCTV 설비',        'CCTV 설치 현장',         'CCTV Installation Site',       4),
  ('CCTV 설비',        'CCTV 통합 관제',         'CCTV Integrated Monitoring',   5),
  ('CATV 설비',        'CATV 시공',              'CATV Cabling',                 6),
  ('AV 설비',          'AV 시스템 구축',         'AV System Build',              7),
  ('전산실 구축/이전', '전산실 구축',            'Server Room Build',            8),
  ('전산실 구축/이전', '전산실 이전',            'Server Room Relocation',       9),
  ('출입통제',         '출입통제 시스템',        'Access Control System',        10),
  ('구내방송',         '구내방송 시스템',        'Public Address System',        11)
) AS v(cat_name, title_ko, title_en, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.ibs_items x WHERE x.title_ko = v.title_ko
);

-- ---------------------------------------------------------------------
-- 2) 해외 프로젝트 — 카테고리(국가) + 프로젝트
-- ---------------------------------------------------------------------
INSERT INTO public.overseas_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('괌',             'Guam',         0),
  ('일본',           'Japan',        1),
  ('사이판',         'Saipan',       2),
  ('사우디아라비아', 'Saudi Arabia', 3),
  ('태국',           'Thailand',     4),
  ('말레이시아',     'Malaysia',     5)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.overseas_categories x WHERE x.name_ko = v.name_ko);

INSERT INTO public.overseas_projects (category_id, title_ko, title_en, sort_order)
SELECT (SELECT id FROM public.overseas_categories WHERE name_ko = v.cat_name),
       v.title_ko, v.title_en, v.sort_order
FROM (VALUES
  ('괌',             '롯데호텔 괌 네트워크 인프라 구축',         'Lotte Hotel Guam Network Infrastructure',     0),
  ('일본',           '아라이 리조트 네트워크 인프라 구축',       'Arai Resort Network Infrastructure',          1),
  ('사이판',         '한화 월드 리조트 네트워크 이중화 구축',    'Hanwha World Resort Network Redundancy',      2),
  ('사우디아라비아', '한화 건설 사우디 네트워크 인프라 구축',    'Hanwha E&C Saudi Network Infrastructure',     3),
  ('태국',           '한화 케미칼 태국 네트워크 인프라 구축',    'Hanwha Chemical Thailand Network',            4),
  ('말레이시아',     '롯데 케미칼 말레이시아 네트워크 인프라',   'Lotte Chemical Malaysia Network',             5)
) AS v(cat_name, title_ko, title_en, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.overseas_projects x WHERE x.title_ko = v.title_ko
);

-- ---------------------------------------------------------------------
-- 3) 공사실적 — 카테고리(연도) + 실적
--   ※ 기존 하드코딩 데이터(/business/network/projects)에서 옮겨옴.
--      모든 실적을 다 옮기지는 않고 대표적인 것 위주.
-- ---------------------------------------------------------------------
INSERT INTO public.project_record_categories (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('2025년', '2025', 0),
  ('2024년', '2024', 1),
  ('2023년', '2023', 2),
  ('2022년', '2022', 3),
  ('2021년', '2021', 4),
  ('2020년', '2020', 5),
  ('2019년', '2019', 6),
  ('2018년', '2018', 7),
  ('2017년', '2017', 8),
  ('2016년', '2016', 9),
  ('2015년', '2015', 10),
  ('2014년', '2014', 11)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.project_record_categories x WHERE x.name_ko = v.name_ko);

INSERT INTO public.project_records (category_id, name_ko, name_en, year, capacity, sort_order)
SELECT (SELECT id FROM public.project_record_categories WHERE name_ko = v.cat_name),
       v.name_ko, v.name_en, v.year, v.capacity, v.sort_order
FROM (VALUES
  -- 2025
  ('2025년', '서울아산병원 신관 중환자실 증설 정보통신공사',                'Seoul Asan Hospital New ICU Network Build',          '2025', '90.3억', 0),
  ('2025년', '한화시스템(주) 정보통신공사',                                  'Hanwha Systems ICT Construction',                    '2025', NULL, 1),
  ('2025년', '쿠팡 G-IDC센터 GPU node 추가 네트워크 구축',                   'Coupang G-IDC GPU Node Network Build',               '2025', NULL, 2),
  ('2025년', '한화첨단소재 미국 텍사스주 신축공장 네트워크 구축공사',         'Hanwha Advanced Materials Texas Plant Network',      '2025', NULL, 3),
  ('2025년', '건국대학교 열람실, 공학관, 쿨하우스 무선 네트워크구축',          'Konkuk University Wi-Fi Build',                      '2025', NULL, 4),
  -- 2024
  ('2024년', '서울아산병원 서관 NRICU/공용ICU 환경개선 정보통신공사',        'Seoul Asan Hospital West NRICU Network',             '2024', '74.9억', 0),
  ('2024년', '경찰청 112시스템 노후 네트워크 및 보안 장비 교체 통신공사',     'Police Agency 112 System Network Replacement',       '2024', NULL, 1),
  ('2024년', '한화첨단소재 미국 조지아주 태양광 신축공장 네트워크 구축공사',   'Hanwha Advanced Materials Georgia Solar Plant',      '2024', NULL, 2),
  -- 2023
  ('2023년', '서울아산병원 정보통신공사',                                    'Seoul Asan Hospital ICT Construction',               '2023', '60.4억', 0),
  ('2023년', '송도 후지필름 신공장 네트워크 공사',                            'Songdo Fujifilm New Plant Network',                  '2023', NULL, 1),
  ('2023년', '한화시스템(주) ICT부문 정보통신공사',                          'Hanwha Systems ICT Division Construction',           '2023', NULL, 2),
  -- 2022
  ('2022년', '동국제강 당진 도성공장 정보통신공사',                          'Dongkuk Steel Dangjin Doseong Plant ICT',            '2022', '57.2억', 0),
  ('2022년', '오송 보건산업진흥원 정보통신공사',                              'Osong KHIDI ICT Construction',                       '2022', NULL, 1),
  -- 2021
  ('2021년', '서울아산병원 정보통신공사',                                    'Seoul Asan Hospital ICT Construction',               '2021', '49.6억', 0),
  ('2021년', '한국에너지기술평가원 전산실 통신공사',                          'KETEP Server Room Network',                          '2021', NULL, 1),
  -- 2020
  ('2020년', '서울아산병원 정보통신공사',                                    'Seoul Asan Hospital ICT Construction',               '2020', '51.6억', 0),
  ('2020년', '서초구청 정보통신공사',                                        'Seocho-gu Office ICT Construction',                  '2020', NULL, 1),
  -- 2019
  ('2019년', '신촌역 탑시티 면세 네트워크 환경구축',                          'Sinchon Top City Duty-free Network',                 '2019', NULL, 0),
  ('2019년', '63빌딩 통신실 이전 구축',                                      '63 Building Server Room Relocation',                 '2019', NULL, 1),
  -- 2018
  ('2018년', '한화빌딩 유·무선 네트워크 이전 설치공사',                      'Hanwha Building Wired/Wireless Network',             '2018', NULL, 0),
  ('2018년', '아산병원 네트워크 구축공사',                                    'Asan Hospital Network Build',                        '2018', NULL, 1),
  -- 2017
  ('2017년', '한화 음성사업장 K1, K2 네트워크 구축공사',                      'Hanwha Eumseong K1/K2 Network',                      '2017', NULL, 0),
  ('2017년', '롯데 일본 아라이리조트 네트워크 인프라 구축공사',                'Lotte Arai Resort Network Infrastructure',           '2017', NULL, 1),
  -- 2016
  ('2016년', '인하대학교 응급실 네트워크 구축공사',                            'Inha University ER Network Build',                   '2016', NULL, 0),
  ('2016년', '한화 갤러리아 본사이전 네트워크 구축공사',                      'Hanwha Galleria HQ Network Build',                   '2016', NULL, 1),
  -- 2015
  ('2015년', '외교부 고도화장비 설치 공사',                                    'MOFA Equipment Upgrade',                             '2015', NULL, 0),
  ('2015년', '잠실 롯데 C2 공연장 네트워크 구축공사',                          'Jamsil Lotte C2 Hall Network',                       '2015', NULL, 1),
  -- 2014
  ('2014년', '서초구청 민원센타 통신공사',                                    'Seocho Office Civic Center Network',                 '2014', NULL, 0),
  ('2014년', '롯데호텔 Guam 네트워크 인프라 구축공사',                        'Lotte Hotel Guam Network Infrastructure',            '2014', NULL, 1)
) AS v(cat_name, name_ko, name_en, year, capacity, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.project_records x WHERE x.name_ko = v.name_ko AND x.year = v.year
);

-- ---------------------------------------------------------------------
-- 4) Video-Wall site_setting (admin/business/ip-wall 에 미리 채워놓음)
-- ---------------------------------------------------------------------
INSERT INTO public.site_settings (key, value) VALUES (
  'video_wall',
  jsonb_build_object(
    'headlineKo',     'THE FUTURE OF VIDEO PROCESSING',
    'headlineEn',     'THE FUTURE OF VIDEO PROCESSING',
    'descriptionKo',  E'성능과 화질의 새로운 시대로 진입하세요. CALICO PRO는 수백 개의 4K60 비디오 창과 놀라운 10비트 색 심도를 지원하여, 대규모 환경에서도 부드럽고 사실적인 영상을 제공합니다.\n\n관제실, 방송 환경, 몰입형 경험까지 — CALICO PRO는 전문 비디오 프로세싱의 가능성을 새롭게 정의합니다.',
    'descriptionEn',  E'Step into a new era of performance and clarity. CALICO PRO delivers unmatched flexibility with support for hundreds of 4K60 video windows and stunning 10-bit color depth — enabling smooth, lifelike visuals at scale.\n\nWhether you''re powering control rooms, broadcast environments, or immersive experiences, CALICO PRO redefines what''s possible in professional video processing.',
    'mainImage',      '/image/calico-pro.png',
    'button1Label',   'CALICO PRO 2200',
    'button1Link',    'https://tvone.com/',
    'button2Label',   'CALICO PRO 1200',
    'button2Link',    'https://tvone.com/',
    'ctaTitleKo',     'Video-Wall 도입을 검토하고 계신가요?',
    'ctaTitleEn',     'Considering a Video-Wall solution?',
    'ctaDescKo',      '전문 상담원이 귀사의 환경에 최적화된 Video-Wall 솔루션을 제안해 드립니다.',
    'ctaDescEn',      'Our experts will propose a video-wall solution tailored to your environment.',
    'ctaButtonKo',    '문의하기',
    'ctaButtonEn',    'Contact us'
  )
) ON CONFLICT (key) DO NOTHING;

-- =====================================================================
-- 끝. 확인:
--   SELECT count(*) FROM ibs_items;            -- 12 row 기대
--   SELECT count(*) FROM overseas_projects;    -- 6 row 기대
--   SELECT count(*) FROM project_records;      -- 약 28 row 기대
--   SELECT key FROM site_settings WHERE key='video_wall';
-- =====================================================================
