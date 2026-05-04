-- =====================================================================
-- 초기 시드 데이터 (1회 실행)
-- 사이트의 현재 하드코딩된 콘텐츠를 DB에 채워 넣습니다.
-- Supabase SQL Editor에서 schema.sql + migrations.sql 실행 후에 실행하세요.
-- =====================================================================

-- ---------------------------------------------------------------------
-- site_settings : hero / greeting / footer / navigation
-- ---------------------------------------------------------------------

-- HERO
INSERT INTO public.site_settings (key, value) VALUES (
  'hero',
  jsonb_build_object(
    'youtubeUrl',       'https://www.youtube.com/embed/3GzbSKluk3A?autoplay=1&mute=1&loop=1&playlist=3GzbSKluk3A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1',
    'badge',            'ONE-STOP SOLUTION',
    'titleKo',          E'네트워크에서 LED까지\n디지털 인프라의 새로운 기준',
    'titleEn',          E'From Network to LED\nThe New Standard for Digital Infrastructure',
    'descriptionKo',    E'상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.\n디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.',
    'descriptionEn',    E'Sangseung Communications specializes in integrated network systems, IBS, and LED display manufacturing.\nWe deliver One-Stop Solutions covering design, engineering, production, and installation.',
    'button1Ko',        '문의하기',
    'button1En',        'Contact us',
    'button1Link',      '/contact',
    'button2Ko',        '시공사례 보기',
    'button2En',        'View Projects',
    'button2Link',      '/works'
  )
) ON CONFLICT (key) DO NOTHING;

-- GREETING (인사말)
INSERT INTO public.site_settings (key, value) VALUES (
  'greeting',
  jsonb_build_object(
    'titleKo', '디지털 인프라의 새로운 기준',
    'titleEn', 'A New Standard for Digital Infrastructure',
    'contentKo', E'안녕하십니까. 상승종합통신㈜를 찾아주신 여러분께 진심으로 감사드립니다.\n\n저희 상승종합통신은 2001년 설립 이래 네트워크 통합시스템, IBS, LED 디스플레이 분야의 전문 기업으로\n디자인, 설계, 제작, 시공, 유지보수까지 전 과정을 담당하는 One-Stop Solution 기업으로 성장해왔습니다.\n\n앞으로도 끊임없는 연구개발과 도전정신으로 고객 여러분께 최고의 가치를 제공하는 기업이 되겠습니다.',
    'contentEn', E'Welcome to Sangseung Communications.\n\nSince our founding in 2001, we have grown into a One-Stop Solution provider specializing in network integration, IBS, and LED display manufacturing — covering design, engineering, production, installation, and maintenance.'
  )
) ON CONFLICT (key) DO NOTHING;

-- FOOTER
INSERT INTO public.site_settings (key, value) VALUES (
  'footer',
  jsonb_build_object(
    'companyName', '상승종합통신㈜',
    'copyright',   '© 2025 상승종합통신㈜. All Rights Reserved.',
    'tel',         '02-953-0056',
    'fax',         '02-953-0118',
    'offices', jsonb_build_array(
      jsonb_build_object('name', '본사',                'address', E'서울시 강서구 양천로 551-24\n한화비즈메트로 2차 903호'),
      jsonb_build_object('name', '미디어시스템사업부', 'address', E'경기도 구리시 갈매순환로 154\n현대테라타워지식산업센터 A동 1040호'),
      jsonb_build_object('name', '양주공장',           'address', E'경기도 양주시 율정로 20\n양주옥정메타엑스 지식산업센터 514, 515호')
    )
  )
) ON CONFLICT (key) DO NOTHING;

-- NAVIGATION (헤더 메뉴)
INSERT INTO public.site_settings (key, value) VALUES (
  'navigation',
  '[
    {"name":"회사소개","href":"/about","submenu":[
      {"name":"인사말","href":"/about"},
      {"name":"연혁","href":"/about/history"},
      {"name":"조직도","href":"/about/organization"},
      {"name":"인증서","href":"/about/certificates"},
      {"name":"오시는 길","href":"/about/location"}
    ]},
    {"name":"사업소개","href":"/business","submenu":[
      {"name":"네트워크 사업","href":"/business/network","submenu":[
        {"name":"IBS 통합시스템","href":"/business/network/ibs"},
        {"name":"해외 프로젝트","href":"/business/network/overseas"},
        {"name":"공사실적","href":"/business/network/projects"}
      ]},
      {"name":"LED 디스플레이","href":"/business/led","submenu":[
        {"name":"COB LED","href":"/business/led/cob","submenu":[
          {"name":"LFlex","href":"/business/led/cob/lflex"},
          {"name":"SCO-Wall Series","href":"/business/led/cob/sco-wall"}
        ]},
        {"name":"INDOOR FIXED","href":"/business/led/indoor"},
        {"name":"OUTDOOR FIXED","href":"/business/led/outdoor"},
        {"name":"RENTAL","href":"/business/led/rental"},
        {"name":"MEDIA FACADE","href":"/business/led/facade"},
        {"name":"AD SIGN","href":"/business/led/adsign"}
      ]},
      {"name":"Video-Wall","href":"/business/ip-wall"},
      {"name":"유지보수","href":"/business/maintenance"}
    ]},
    {"name":"시공사례","href":"/works"},
    {"name":"자료실","href":"/resources/downloads"},
    {"name":"보도자료","href":"/resources/press"},
    {"name":"파트너사","href":"/partners"}
  ]'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------
-- partners (파트너사) - 8개
-- ---------------------------------------------------------------------
INSERT INTO public.partners (name_ko, name_en, sort_order)
SELECT v.name_ko, v.name_en, v.sort_order FROM (VALUES
  ('한화',     'Hanwha',         0),
  ('롯데',     'Lotte',          1),
  ('현대',     'Hyundai',        2),
  ('삼성',     'Samsung',        3),
  ('AIG',      'AIG',            4),
  ('동국제강', 'Dongkuk Steel',  5),
  ('LS',       'LS',             6),
  ('기아',     'Kia',            7)
) AS v(name_ko, name_en, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.partners p WHERE p.name_ko = v.name_ko);

-- ---------------------------------------------------------------------
-- histories (연혁)
-- ---------------------------------------------------------------------
INSERT INTO public.histories (year, text_ko, text_en, sort_order)
SELECT v.year, v.text_ko, v.text_en, v.sort_order FROM (VALUES
  ('2020', 'IT 스마트코리아 표창',                                                          NULL::text, 0),
  ('2020', '기업부설연구소 설립',                                                            NULL, 1),
  ('2020', '직접생산확인증명 (기상전광판 / 교통정보전광판 / 안내전광판)',                    NULL, 2),
  ('2020', '직접생산확인증명 (영상정보디스플레이장치)',                                       NULL, 3),
  ('2019', '공장등록 (일산공장이전)',                                                         NULL, 0),
  ('2019', '태국지사 설립',                                                                  NULL, 1),
  ('2019', '일본지사 설립',                                                                  NULL, 2),
  ('2018', '우수기술기업 인증',                                                              NULL, 0),
  ('2018', 'LED Display 중국공장 설립 (GAMIN & SANGSEUNG)',                                  NULL, 1),
  ('2017', '미디어시스템사업부 설립',                                                        NULL, 0),
  ('2008', '소프트웨어 사업자등록',                                                          NULL, 0),
  ('2005', '한화 S&C 파트너체결',                                                            NULL, 0),
  ('2003', '한국 Carrefour 네트워크 인프라구축',                                              NULL, 0),
  ('2002', '정보통신공사업 등록',                                                            NULL, 0),
  ('2001', '상승종합통신㈜ 설립',                                                             NULL, 0)
) AS v(year, text_ko, text_en, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.histories h WHERE h.year = v.year AND h.text_ko = v.text_ko
);

-- ---------------------------------------------------------------------
-- office_locations (오시는 길)
-- ---------------------------------------------------------------------
INSERT INTO public.office_locations (name_ko, address_ko, phone, fax, sort_order)
SELECT v.name_ko, v.address_ko, v.phone, v.fax, v.sort_order FROM (VALUES
  ('본사',                '서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호',                                  '02-953-0056', '02-953-0118', 0),
  ('미디어시스템사업부', '경기도 구리시 갈매순환로166번길 46 금강펜테리움IX타워 제5층 020, 021호',                  '031-512-0110', '031-512-0120', 1),
  ('양주공장',            '경기도 양주시 율정로 20(옥정동) 양주옥정메타엑스 지식산업센터 514, 515호',               '031-512-0110', '031-512-0120', 2)
) AS v(name_ko, address_ko, phone, fax, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.office_locations o WHERE o.name_ko = v.name_ko);

-- ---------------------------------------------------------------------
-- certificate_categories (인증서 분류)
-- ---------------------------------------------------------------------
INSERT INTO public.certificate_categories (id, name_ko, name_en, sort_order) VALUES
  (1, '품질', 'Quality',     0),
  (2, '인증', 'Certificate', 1),
  (3, '등록', 'Registration',2),
  (4, '생산', 'Production',  3),
  (5, '표창', 'Award',       4),
  (6, '특허', 'Patent',      5)
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('public.certificate_categories','id'), 7, false);

-- ---------------------------------------------------------------------
-- certificates (인증서) - 27개
-- ---------------------------------------------------------------------
INSERT INTO public.certificates (category_id, title_ko, image_url, sort_order)
SELECT v.category_id, v.title_ko, v.image_url, v.sort_order FROM (VALUES
  (1, 'ISO 14001 인증서 (EN)',                                                                        '/image/cert/cert_1.jpg',  0),
  (1, 'ISO 45001 인증서 (EN)',                                                                        '/image/cert/cert_2.jpg',  1),
  (1, 'ISO 9001 인증서 (EN)',                                                                         '/image/cert/cert_3.jpg',  2),
  (2, 'LED 모듈 KC 인증서 P1.25mm ~ P2.976mm',                                                        '/image/cert/cert_4.jpg',  3),
  (2, 'LED 모듈 KC 인증서 P2.5mm',                                                                    '/image/cert/cert_5.jpg',  4),
  (2, 'LED 모듈 KC 인증서 P3.91mm ~ P10mm',                                                           '/image/cert/cert_6.jpg',  5),
  (2, 'LED 디스플레이 국제안전인증서 P10mm (CB인증)',                                                 '/image/cert/cert_7.jpg',  6),
  (2, 'LED 컨트롤러 KC 인증서',                                                                       '/image/cert/cert_8.jpg',  7),
  (2, '경영혁신형 중소기업 (Main-Biz) 확인서',                                                        '/image/cert/cert_9.jpg',  8),
  (5, '대한민국커뮤니티 표창장',                                                                      '/image/cert/cert_10.png', 9),
  (2, '벤처기업확인서',                                                                                '/image/cert/cert_11.jpg', 10),
  (3, '여신전문금융업 등록증',                                                                         '/image/cert/cert_12.jpg', 11),
  (3, '전기공사업등록증',                                                                              '/image/cert/cert_13.jpg', 12),
  (3, '소프트웨어사업자 신고확인서',                                                                   '/image/cert/cert_14.jpg', 13),
  (3, '전문건설업등록증',                                                                              '/image/cert/cert_15.jpg', 14),
  (2, '이노비즈 확인서',                                                                                '/image/cert/cert_16.jpg', 15),
  (2, '우수기술기업인증서',                                                                            '/image/cert/cert_17.jpg', 16),
  (5, '중소벤처기업부장관 표창장',                                                                     '/image/cert/cert_18.jpg', 17),
  (4, '직접생산확인증명서 - 데이터분석장치',                                                           '/image/cert/cert_19.jpg', 18),
  (4, '직접생산확인증명서 - 스마트그린에너지디스플레이장치',                                           '/image/cert/cert_20.jpg', 19),
  (4, '직접생산확인증명서 - 안내전광판, 교통정보전광판, 기상전광판',                                   '/image/cert/cert_21.jpg', 20),
  (4, '직접생산확인증명서 - 영상정보디스플레이장치',                                                   '/image/cert/cert_22.jpg', 21),
  (4, '직접생산확인증명서 - 정보표시판, 정보시스템유지관리용역',                                       '/image/cert/cert_23.jpg', 22),
  (4, '직접생산확인증명서 - 인터넷정보표시장치',                                                       '/image/cert/cert_24.jpg', 23),
  (4, '직접생산확인증명서 - 전광표시판관리서버',                                                       '/image/cert/cert_25.jpg', 24),
  (4, '직접생산확인증명서 - 패키지소프트웨어및멀티미디어소프트, 정보시스템개발서비스',                 '/image/cert/cert_26.jpg', 25),
  (6, '특허증 - 클라우드 기반의 전광판 시스템',                                                         '/image/cert/cert_27.jpg', 26)
) AS v(category_id, title_ko, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.certificates c WHERE c.title_ko = v.title_ko);

-- ---------------------------------------------------------------------
-- work_categories (시공사례 분류)
-- ---------------------------------------------------------------------
INSERT INTO public.work_categories (id, name_ko, name_en, sort_order) VALUES
  (1, 'INDOOR',       'Indoor Fixed',  0),
  (2, 'OUTDOOR',      'Outdoor Fixed', 1),
  (3, 'RENTAL',       'Rental',        2),
  (4, 'MEDIA FACADE', 'Media Facade',  3)
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('public.work_categories','id'), 5, false);

-- ---------------------------------------------------------------------
-- works (시공사례) - 23개
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
-- product_categories (제품 라인업 카테고리)
-- ---------------------------------------------------------------------
INSERT INTO public.product_categories (id, name_ko, name_en, sort_order) VALUES
  (1, 'COB LED',       'COB LED',       0),
  (2, 'INDOOR FIXED',  'Indoor Fixed',  1),
  (3, 'OUTDOOR FIXED', 'Outdoor Fixed', 2),
  (4, 'RENTAL',        'Rental',        3),
  (5, 'MEDIA FACADE',  'Media Facade',  4),
  (6, 'AD SIGN',       'Ad Sign',       5)
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('public.product_categories','id'), 7, false);

-- ---------------------------------------------------------------------
-- products (대표 제품)
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
-- business_sections (사업소개 4영역)
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