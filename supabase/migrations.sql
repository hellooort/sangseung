-- =====================================================================
-- 증분 마이그레이션 (Supabase SQL Editor에서 한 번 실행하세요)
-- 이미 schema.sql 을 실행한 프로젝트가 추가로 적용해야 할 변경사항만 모아둔 파일입니다.
-- =====================================================================

-- 연혁: month 컬럼 추가
ALTER TABLE public.histories ADD COLUMN IF NOT EXISTS month TEXT;

-- 보도자료: 카테고리 분류 컬럼 추가
ALTER TABLE public.press_releases ADD COLUMN IF NOT EXISTS category TEXT;

-- 자료실: 카테고리 컬럼 추가
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS category TEXT;

-- 시공사례(works): 사이즈 / 로고 컬럼 추가
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- 제품(products): 이름 다국어 분리. 기존 name 컬럼은 KO 로 사용
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_ko TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_en TEXT;
UPDATE public.products SET name_ko = name WHERE name_ko IS NULL;

-- 사업소개(business_sections): CTA 다국어 텍스트
ALTER TABLE public.business_sections ADD COLUMN IF NOT EXISTS cta_label_ko TEXT;
ALTER TABLE public.business_sections ADD COLUMN IF NOT EXISTS cta_label_en TEXT;

-- =====================================================================
-- 기본 데이터 시딩 (선택사항) — 빈 사이트일 때 한 번만 실행하세요.
-- =====================================================================

-- 사업소개 기본 4개 row (id 고정)
INSERT INTO public.business_sections (id, title_ko, title_en, subtitle_ko, subtitle_en, description_ko, description_en, hero_image, cta_label_ko, cta_label_en, features)
VALUES
  ('network', '네트워크 사업', 'Network Business', '안정적이고 확장 가능한 네트워크 인프라', 'Reliable and scalable network infrastructure', '상승종합통신은 통신·네트워크 시스템 전반을 설계·시공·유지보수합니다.', 'We design, install, and maintain communication and network systems.', '/image/network-hero.jpg', '문의하기', 'Contact us', '[]'::jsonb),
  ('led', 'LED 디스플레이', 'LED Display', '실내·실외 LED 디스플레이 전문', 'Indoor and outdoor LED display specialist', '광고용 전광판부터 미디어월까지, 다양한 LED 솔루션을 제공합니다.', 'From advertising boards to media walls, we provide diverse LED solutions.', '/image/led-hero.jpg', '문의하기', 'Contact us', '[]'::jsonb),
  ('video-wall', 'Video-Wall', 'Video-Wall', '대형 영상 처리·송출 시스템', 'Large-scale video processing and broadcasting system', 'CALICO PRO 등 글로벌 솔루션으로 4K60 다중 윈도우 처리 환경을 구축합니다.', 'We build 4K60 multi-window environments with global solutions like CALICO PRO.', '/image/video-wall-hero.jpg', '문의하기', 'Contact us', '[]'::jsonb),
  ('maintenance', '유지보수', 'Maintenance', '체계적인 시스템 유지관리', 'Systematic system maintenance', 'IBS·네트워크·LED 전반의 사후관리와 긴급출동 서비스를 제공합니다.', 'We provide post-installation maintenance and emergency dispatch services across IBS, network, and LED systems.', '/image/maintenance-hero.jpg', '문의하기', 'Contact us', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;