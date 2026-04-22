-- =====================================================================
-- ?????? ???? ?????? ???
-- Supabase SQL Editor?? ?? (???? ???? ?? ??)
-- =====================================================================

-- =====================================================================
-- 1) Storage ?? ?? (public)
-- =====================================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public) VALUES ('files', 'files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS: ?? ??, ??? ???? ???/??/??
DROP POLICY IF EXISTS "Public read images" ON storage.objects;
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'files'));

DROP POLICY IF EXISTS "Authenticated upload images" ON storage.objects;
CREATE POLICY "Authenticated upload images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('images', 'files'));

DROP POLICY IF EXISTS "Authenticated update images" ON storage.objects;
CREATE POLICY "Authenticated update images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id IN ('images', 'files'));

DROP POLICY IF EXISTS "Authenticated delete images" ON storage.objects;
CREATE POLICY "Authenticated delete images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id IN ('images', 'files'));

-- =====================================================================
-- 2) ?? updated_at ??? ??
-- =====================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- 3) ?? RLS ?? ??? (?? ? ???? ??)
--    - SELECT: ??? ?? (public)
--    - INSERT/UPDATE/DELETE: authenticated (???? ???)?
-- =====================================================================

-- =====================================================================
-- TABLE: histories (??)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.histories (
  id BIGSERIAL PRIMARY KEY,
  year TEXT NOT NULL,
  text_ko TEXT NOT NULL,
  text_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS histories_year_idx ON public.histories (year DESC, sort_order);
DROP TRIGGER IF EXISTS histories_updated_at ON public.histories;
CREATE TRIGGER histories_updated_at BEFORE UPDATE ON public.histories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.histories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read histories" ON public.histories;
CREATE POLICY "Public read histories" ON public.histories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write histories" ON public.histories;
CREATE POLICY "Auth write histories" ON public.histories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: partners (????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.partners (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  logo_url TEXT,
  website_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS partners_updated_at ON public.partners;
CREATE TRIGGER partners_updated_at BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read partners" ON public.partners;
CREATE POLICY "Public read partners" ON public.partners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write partners" ON public.partners;
CREATE POLICY "Auth write partners" ON public.partners FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: certificate_categories / certificates (???)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.certificate_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS cert_cat_updated_at ON public.certificate_categories;
CREATE TRIGGER cert_cat_updated_at BEFORE UPDATE ON public.certificate_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.certificate_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read cert_cat" ON public.certificate_categories;
CREATE POLICY "Public read cert_cat" ON public.certificate_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write cert_cat" ON public.certificate_categories;
CREATE POLICY "Auth write cert_cat" ON public.certificate_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.certificates (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.certificate_categories(id) ON DELETE SET NULL,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS cert_updated_at ON public.certificates;
CREATE TRIGGER cert_updated_at BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read certificates" ON public.certificates;
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write certificates" ON public.certificates;
CREATE POLICY "Auth write certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: resources (??? ????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.resources (
  id BIGSERIAL PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  description_ko TEXT,
  description_en TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS resources_updated_at ON public.resources;
CREATE TRIGGER resources_updated_at BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read resources" ON public.resources;
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write resources" ON public.resources;
CREATE POLICY "Auth write resources" ON public.resources FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: press_releases (????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.press_releases (
  id BIGSERIAL PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  summary_ko TEXT,
  summary_en TEXT,
  content_ko TEXT,
  content_en TEXT,
  thumbnail_url TEXT,
  external_link TEXT,
  published_at DATE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS press_updated_at ON public.press_releases;
CREATE TRIGGER press_updated_at BEFORE UPDATE ON public.press_releases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.press_releases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read press" ON public.press_releases;
CREATE POLICY "Public read press" ON public.press_releases FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write press" ON public.press_releases;
CREATE POLICY "Auth write press" ON public.press_releases FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: work_categories / works (????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.work_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS work_cat_updated_at ON public.work_categories;
CREATE TRIGGER work_cat_updated_at BEFORE UPDATE ON public.work_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.work_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read work_cat" ON public.work_categories;
CREATE POLICY "Public read work_cat" ON public.work_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write work_cat" ON public.work_categories;
CREATE POLICY "Auth write work_cat" ON public.work_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.works (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.work_categories(id) ON DELETE SET NULL,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  subtitle_ko TEXT,
  subtitle_en TEXT,
  description_ko TEXT,
  description_en TEXT,
  image_url TEXT,
  extra_images JSONB DEFAULT '[]'::jsonb,
  completed_at DATE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS works_updated_at ON public.works;
CREATE TRIGGER works_updated_at BEFORE UPDATE ON public.works
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read works" ON public.works;
CREATE POLICY "Public read works" ON public.works FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write works" ON public.works;
CREATE POLICY "Auth write works" ON public.works FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: product_categories / products (?? ???)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.product_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS prod_cat_updated_at ON public.product_categories;
CREATE TRIGGER prod_cat_updated_at BEFORE UPDATE ON public.product_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read prod_cat" ON public.product_categories;
CREATE POLICY "Public read prod_cat" ON public.product_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write prod_cat" ON public.product_categories;
CREATE POLICY "Auth write prod_cat" ON public.product_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.product_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  specs TEXT,
  image_url TEXT,
  detail_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write products" ON public.products;
CREATE POLICY "Auth write products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: office_locations (??? ? / ???)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.office_locations (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  address_ko TEXT,
  address_en TEXT,
  phone TEXT,
  fax TEXT,
  email TEXT,
  map_embed_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS office_updated_at ON public.office_locations;
CREATE TRIGGER office_updated_at BEFORE UPDATE ON public.office_locations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read offices" ON public.office_locations;
CREATE POLICY "Public read offices" ON public.office_locations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write offices" ON public.office_locations;
CREATE POLICY "Auth write offices" ON public.office_locations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: ibs_items / overseas_projects / project_records
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ibs_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.ibs_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read ibs_cat" ON public.ibs_categories;
CREATE POLICY "Public read ibs_cat" ON public.ibs_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write ibs_cat" ON public.ibs_categories;
CREATE POLICY "Auth write ibs_cat" ON public.ibs_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.ibs_items (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.ibs_categories(id) ON DELETE SET NULL,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.ibs_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read ibs" ON public.ibs_items;
CREATE POLICY "Public read ibs" ON public.ibs_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write ibs" ON public.ibs_items;
CREATE POLICY "Auth write ibs" ON public.ibs_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.overseas_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.overseas_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read overseas_cat" ON public.overseas_categories;
CREATE POLICY "Public read overseas_cat" ON public.overseas_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write overseas_cat" ON public.overseas_categories;
CREATE POLICY "Auth write overseas_cat" ON public.overseas_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.overseas_projects (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.overseas_categories(id) ON DELETE SET NULL,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.overseas_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read overseas" ON public.overseas_projects;
CREATE POLICY "Public read overseas" ON public.overseas_projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write overseas" ON public.overseas_projects;
CREATE POLICY "Auth write overseas" ON public.overseas_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.project_record_categories (
  id BIGSERIAL PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.project_record_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read prec_cat" ON public.project_record_categories;
CREATE POLICY "Public read prec_cat" ON public.project_record_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write prec_cat" ON public.project_record_categories;
CREATE POLICY "Auth write prec_cat" ON public.project_record_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.project_records (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.project_record_categories(id) ON DELETE SET NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  year TEXT,
  capacity TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.project_records ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read prec" ON public.project_records;
CREATE POLICY "Public read prec" ON public.project_records FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write prec" ON public.project_records;
CREATE POLICY "Auth write prec" ON public.project_records FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: business_sections (????/LED/Video-Wall/????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.business_sections (
  id TEXT PRIMARY KEY,  -- 'network' | 'led' | 'video-wall' | 'maintenance'
  title_ko TEXT,
  title_en TEXT,
  subtitle_ko TEXT,
  subtitle_en TEXT,
  description_ko TEXT,
  description_en TEXT,
  hero_image TEXT,
  cta_label TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS biz_sec_updated_at ON public.business_sections;
CREATE TRIGGER biz_sec_updated_at BEFORE UPDATE ON public.business_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.business_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read biz_sec" ON public.business_sections;
CREATE POLICY "Public read biz_sec" ON public.business_sections FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write biz_sec" ON public.business_sections;
CREATE POLICY "Auth write biz_sec" ON public.business_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- TABLE: site_settings (??, ?? ?? ? ?? ????)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,  -- 'footer' | 'company_info' | 'hero' ...
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read settings" ON public.site_settings;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write settings" ON public.site_settings;
CREATE POLICY "Auth write settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================================
-- ??. ?? Supabase Dashboard ? Authentication ? Users ??
-- ??? ??(???+????)? ???? ?????.
--   ?) admin@sangseung.co.kr / ???_????
-- =====================================================================
