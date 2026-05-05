-- =====================================================================
-- 영문화 누락 데이터 일괄 채움 (Supabase SQL Editor 에서 1회 실행)
-- 한국어 데이터는 그대로 유지하고, _en 컬럼만 채웁니다.
-- 이미 _en 값이 있는 row는 건드리지 않습니다 (COALESCE).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) site_settings: footer (companyName_en / copyright_en / offices.*_en)
-- ---------------------------------------------------------------------
UPDATE public.site_settings
SET value = jsonb_set(
  jsonb_set(
    jsonb_set(
      value,
      '{companyName_en}', '"SANGSEUNG Co., Ltd."'::jsonb, true
    ),
    '{copyright_en}', '"© 2025 SANGSEUNG Co., Ltd. All Rights Reserved."'::jsonb, true
  ),
  '{offices}',
  jsonb_build_array(
    jsonb_build_object(
      'name',       '본사',
      'name_en',    'Head Office',
      'address',    E'서울시 강서구 양천로 551-24\n한화비즈메트로 2차 903호',
      'address_en', E'#903, Hanwha Bizmetro 2,\n551-24 Yangcheon-ro, Gangseo-gu, Seoul'
    ),
    jsonb_build_object(
      'name',       '미디어시스템사업부',
      'name_en',    'Media System Division',
      'address',    E'경기도 구리시 갈매순환로 154\n현대테라타워지식산업센터 A동 1040호',
      'address_en', E'#A1040, Hyundai Terra Tower,\n154 Galmaesunhwan-ro, Guri-si, Gyeonggi-do'
    ),
    jsonb_build_object(
      'name',       '양주공장',
      'name_en',    'Yangju Factory',
      'address',    E'경기도 양주시 율정로 20\n양주옥정메타엑스 지식산업센터 514, 515호',
      'address_en', E'#514-515, Yangju Okjeong Metax,\n20 Yuljeong-ro, Yangju-si, Gyeonggi-do'
    )
  ),
  true
)
WHERE key = 'footer';

-- ---------------------------------------------------------------------
-- 2) site_settings: navigation (메뉴 영문 라벨 통째로 교체)
-- ---------------------------------------------------------------------
UPDATE public.site_settings
SET value = '[
  {"name":"회사소개","name_en":"About","href":"/about","submenu":[
    {"name":"인사말","name_en":"Greeting","href":"/about"},
    {"name":"연혁","name_en":"History","href":"/about/history"},
    {"name":"조직도","name_en":"Organization","href":"/about/organization"},
    {"name":"인증서","name_en":"Certificates","href":"/about/certificates"},
    {"name":"오시는 길","name_en":"Location","href":"/about/location"}
  ]},
  {"name":"사업소개","name_en":"Business","href":"/business","submenu":[
    {"name":"네트워크 사업","name_en":"Network","href":"/business/network","submenu":[
      {"name":"IBS 통합시스템","name_en":"IBS Integrated System","href":"/business/network/ibs"},
      {"name":"해외 프로젝트","name_en":"Overseas Projects","href":"/business/network/overseas"},
      {"name":"공사실적","name_en":"Project Records","href":"/business/network/projects"}
    ]},
    {"name":"LED 디스플레이","name_en":"LED Display","href":"/business/led","submenu":[
      {"name":"COB LED","name_en":"COB LED","href":"/business/led/cob","submenu":[
        {"name":"LFlex","name_en":"LFlex","href":"/business/led/cob/lflex"},
        {"name":"SCO-Wall Series","name_en":"SCO-Wall Series","href":"/business/led/cob/sco-wall"}
      ]},
      {"name":"INDOOR FIXED","name_en":"Indoor Fixed","href":"/business/led/indoor"},
      {"name":"OUTDOOR FIXED","name_en":"Outdoor Fixed","href":"/business/led/outdoor"},
      {"name":"RENTAL","name_en":"Rental","href":"/business/led/rental"},
      {"name":"MEDIA FACADE","name_en":"Media Facade","href":"/business/led/facade"},
      {"name":"AD SIGN","name_en":"Ad Sign","href":"/business/led/adsign"}
    ]},
    {"name":"Video-Wall","name_en":"Video-Wall","href":"/business/ip-wall"},
    {"name":"유지보수","name_en":"Maintenance","href":"/business/maintenance"}
  ]},
  {"name":"시공사례","name_en":"Projects","href":"/works"},
  {"name":"자료실","name_en":"Downloads","href":"/resources/downloads"},
  {"name":"보도자료","name_en":"Press","href":"/resources/press"},
  {"name":"파트너사","name_en":"Partners","href":"/partners"}
]'::jsonb
WHERE key = 'navigation';

-- ---------------------------------------------------------------------
-- 3) office_locations: name_en / address_en
-- ---------------------------------------------------------------------
UPDATE public.office_locations SET
  name_en    = COALESCE(name_en,    'Head Office'),
  address_en = COALESCE(address_en, '#903, Hanwha Bizmetro 2, 551-24 Yangcheon-ro, Gangseo-gu, Seoul')
WHERE name_ko = '본사';

UPDATE public.office_locations SET
  name_en    = COALESCE(name_en,    'Media System Division'),
  address_en = COALESCE(address_en, '#020-021, 5F Geumgang Penterium IX Tower, 46 Galmaesunhwan-ro 166beon-gil, Guri-si, Gyeonggi-do')
WHERE name_ko = '미디어시스템사업부';

UPDATE public.office_locations SET
  name_en    = COALESCE(name_en,    'Yangju Factory'),
  address_en = COALESCE(address_en, '#514-515, Yangju Okjeong Metax, 20 Yuljeong-ro (Okjeong-dong), Yangju-si, Gyeonggi-do')
WHERE name_ko = '양주공장';

-- ---------------------------------------------------------------------
-- 4) histories.text_en
-- ---------------------------------------------------------------------
UPDATE public.histories h SET text_en = COALESCE(h.text_en, v.text_en)
FROM (VALUES
  ('IT 스마트코리아 표창',                                      'IT Smart Korea Award'),
  ('기업부설연구소 설립',                                        'Established In-house R&D Institute'),
  ('직접생산확인증명 (기상전광판 / 교통정보전광판 / 안내전광판)', 'Certified for direct production (Weather / Traffic / Guidance LED Boards)'),
  ('직접생산확인증명 (영상정보디스플레이장치)',                  'Certified for direct production (Video Information Display)'),
  ('공장등록 (일산공장이전)',                                    'Factory registration (Ilsan plant relocation)'),
  ('태국지사 설립',                                              'Established Thailand branch'),
  ('일본지사 설립',                                              'Established Japan branch'),
  ('우수기술기업 인증',                                          'Excellent Technology Enterprise certification'),
  ('LED Display 중국공장 설립 (GAMIN & SANGSEUNG)',              'Established LED Display factory in China (GAMIN & SANGSEUNG)'),
  ('미디어시스템사업부 설립',                                    'Established Media System Division'),
  ('소프트웨어 사업자등록',                                      'Software Business Registration'),
  ('한화 S&C 파트너체결',                                        'Partnership with Hanwha S&C'),
  ('한국 Carrefour 네트워크 인프라구축',                          'Network infrastructure for Carrefour Korea'),
  ('정보통신공사업 등록',                                        'ICT Construction Business Registration'),
  ('상승종합통신㈜ 설립',                                        'Founded SANGSEUNG Co., Ltd.')
) AS v(text_ko, text_en)
WHERE h.text_ko = v.text_ko;

-- ---------------------------------------------------------------------
-- 5) certificates.title_en
-- ---------------------------------------------------------------------
UPDATE public.certificates c SET title_en = COALESCE(c.title_en, v.title_en)
FROM (VALUES
  ('ISO 14001 인증서 (EN)',                                                                        'ISO 14001 Certificate (EN)'),
  ('ISO 45001 인증서 (EN)',                                                                        'ISO 45001 Certificate (EN)'),
  ('ISO 9001 인증서 (EN)',                                                                         'ISO 9001 Certificate (EN)'),
  ('LED 모듈 KC 인증서 P1.25mm ~ P2.976mm',                                                        'LED Module KC Certificate P1.25mm – P2.976mm'),
  ('LED 모듈 KC 인증서 P2.5mm',                                                                    'LED Module KC Certificate P2.5mm'),
  ('LED 모듈 KC 인증서 P3.91mm ~ P10mm',                                                           'LED Module KC Certificate P3.91mm – P10mm'),
  ('LED 디스플레이 국제안전인증서 P10mm (CB인증)',                                                 'LED Display International Safety Certification P10mm (CB)'),
  ('LED 컨트롤러 KC 인증서',                                                                       'LED Controller KC Certificate'),
  ('경영혁신형 중소기업 (Main-Biz) 확인서',                                                        'Management Innovation SME (Main-Biz) Certificate'),
  ('대한민국커뮤니티 표창장',                                                                      'Republic of Korea Community Commendation'),
  ('벤처기업확인서',                                                                                'Venture Enterprise Certificate'),
  ('여신전문금융업 등록증',                                                                         'Credit-Specialized Financial Business Registration'),
  ('전기공사업등록증',                                                                              'Electrical Construction Business Registration'),
  ('소프트웨어사업자 신고확인서',                                                                   'Software Business Report Confirmation'),
  ('전문건설업등록증',                                                                              'Specialized Construction Business Registration'),
  ('이노비즈 확인서',                                                                                'INNO-BIZ Certificate'),
  ('우수기술기업인증서',                                                                            'Excellent Technology Enterprise Certificate'),
  ('중소벤처기업부장관 표창장',                                                                     'Minister of SMEs and Startups Commendation'),
  ('직접생산확인증명서 - 데이터분석장치',                                                           'Direct Production Certificate - Data Analysis Device'),
  ('직접생산확인증명서 - 스마트그린에너지디스플레이장치',                                           'Direct Production Certificate - Smart Green Energy Display'),
  ('직접생산확인증명서 - 안내전광판, 교통정보전광판, 기상전광판',                                   'Direct Production Certificate - Guidance / Traffic / Weather LED Boards'),
  ('직접생산확인증명서 - 영상정보디스플레이장치',                                                   'Direct Production Certificate - Video Information Display'),
  ('직접생산확인증명서 - 정보표시판, 정보시스템유지관리용역',                                       'Direct Production Certificate - Information Display & IT Maintenance Service'),
  ('직접생산확인증명서 - 인터넷정보표시장치',                                                       'Direct Production Certificate - Internet Information Display'),
  ('직접생산확인증명서 - 전광표시판관리서버',                                                       'Direct Production Certificate - LED Board Management Server'),
  ('직접생산확인증명서 - 패키지소프트웨어및멀티미디어소프트, 정보시스템개발서비스',                 'Direct Production Certificate - Package Software / IT System Development'),
  ('특허증 - 클라우드 기반의 전광판 시스템',                                                         'Patent - Cloud-based LED Board System')
) AS v(title_ko, title_en)
WHERE c.title_ko = v.title_ko;

-- ---------------------------------------------------------------------
-- 6) works.title_en (시공사례)
-- ---------------------------------------------------------------------
UPDATE public.works w SET title_en = COALESCE(w.title_en, v.title_en)
FROM (VALUES
  ('LH 컨퍼런스 LED 포스터',                                'LH Conference LED Poster'),
  ('씨아이씨소프트 스튜디오 LED 스크린',                    'CIC Soft Studio LED Screen'),
  ('의왕시 의회 LED 스크린',                                 'Uiwang City Council LED Screen'),
  ('호주 SUN CORP 실내 COB LED 스크린',                      'Australia SUN CORP Indoor COB LED Screen'),
  ('충남교육청 학생교육문화원 실내 LED 스크린',              'Chungnam Office of Education Indoor LED Screen'),
  ('서울시청 다목적홀 LED 스크린',                           'Seoul City Hall Multi-purpose Hall LED Screen'),
  ('폴리텍 대학 서울 정수 캠퍼스 스튜디오 LED 스크린',       'Polytech University Seoul Jeongsu Studio LED Screen'),
  ('김해 금관가야휴게소 LED 미디어 파사드',                   'Gimhae Geumgwan Gaya Rest Area LED Media Facade'),
  ('중국 스포츠 스타디움 LED 미디어파사드',                   'China Sports Stadium LED Media Facade'),
  ('서울 강서구 보건소 LED 전자게시대',                       'Gangseo-gu Public Health Center LED Notice Board'),
  ('공릉동 도깨비시장 클라우드 시스템 전광판',                'Gongneung Dokkaebi Market Cloud LED Board'),
  ('경상북도 경제진흥원 옥외 전광판',                         'Gyeongbuk Economic Promotion Agency Outdoor LED Board'),
  ('경주중심상가 옥외 Cube LED 미디어파사드',                  'Gyeongju Central Market Outdoor Cube LED Media Facade'),
  ('폴리텍 대학교 인천캠퍼스 LED 전광판',                     'Polytech University Incheon Campus LED Board'),
  ('광명시청 시민회관 대형 LED 포스터',                        'Gwangmyeong City Hall Citizen Hall Large LED Poster'),
  ('방글라데시 다카공항 대형 LED 전광판',                     'Bangladesh Dhaka Airport Large LED Board'),
  ('목동깨비시장 양면형 클라우드 시스템 LED 전자게시대',       'Mok-dong Kkaebi Market Double-sided Cloud LED Notice Board'),
  ('광주시 동구 대인교차로 클라우드 시스템 LED 전자게시대',    'Gwangju Dong-gu Daein Crossing Cloud LED Notice Board'),
  ('생거진천시장 클라우드 시스템 LED 전자게시대',              'Saenggeo Jincheon Market Cloud LED Notice Board'),
  ('진천 광혜원면 클라우드 시스템 LED 전자게시대',             'Jincheon Gwanghyewon-myeon Cloud LED Notice Board'),
  ('한국원자력의학원 대형 LED 전광판',                         'Korea Institute of Radiological & Medical Sciences Large LED Board'),
  ('일본 방재훈련소 LED 스크린',                               'Japan Disaster Prevention Training Center LED Screen'),
  ('서울경찰청 기동본부 차량용 양면 LED 전광판',               'Seoul Police Mobile Unit Vehicle Double-sided LED Board')
) AS v(title_ko, title_en)
WHERE w.title_ko = v.title_ko;

-- ---------------------------------------------------------------------
-- 7) products.description_en (누락분만)
-- ---------------------------------------------------------------------
UPDATE public.products SET
  description_en = COALESCE(description_en, 'High-quality flexible LED display with COB technology')
WHERE name_ko = 'LFlex' OR name = 'LFlex';

UPDATE public.products SET
  description_en = COALESCE(description_en, 'Premium LED wall with advanced COB packaging')
WHERE name_ko = 'SCO-Wall Series' OR name = 'SCO-Wall Series';

UPDATE public.products SET
  description_en = COALESCE(description_en, 'High-quality indoor LED display')
WHERE name_ko = 'S-Wall Series' OR name = 'S-Wall Series';

UPDATE public.products SET
  description_en = COALESCE(description_en, 'High-brightness outdoor LED display')
WHERE name_ko = 'SOD Series' OR name = 'SOD Series';

UPDATE public.products SET
  description_en = COALESCE(description_en, 'Cloud-based LED advertising signage')
WHERE name_ko = 'AD Sign' OR name = 'AD Sign';

-- ---------------------------------------------------------------------
-- 8) partners.name_en (누락분 폴백 - 한국어 그대로 사용)
--    이미 시드에 모두 채워져 있음. 혹시 NULL 인 row 만 한글값으로 채움.
-- ---------------------------------------------------------------------
UPDATE public.partners SET name_en = name_ko WHERE name_en IS NULL OR name_en = '';

-- ---------------------------------------------------------------------
-- 9) certificate_categories / work_categories / product_categories
--    (NULL 안전판 — 시드에는 모두 채워져 있지만 누락 row 대비)
-- ---------------------------------------------------------------------
UPDATE public.certificate_categories SET name_en = name_ko WHERE name_en IS NULL OR name_en = '';
UPDATE public.work_categories       SET name_en = name_ko WHERE name_en IS NULL OR name_en = '';
UPDATE public.product_categories    SET name_en = name_ko WHERE name_en IS NULL OR name_en = '';

-- =====================================================================
-- 끝. 실행 후 확인:
--   SELECT key, value->>'companyName_en' FROM site_settings WHERE key='footer';
--   SELECT count(*) FROM histories  WHERE text_en  IS NULL;
--   SELECT count(*) FROM certificates WHERE title_en IS NULL;
--   SELECT count(*) FROM works      WHERE title_en IS NULL;
-- =====================================================================
