export interface History {
  id: number;
  year: string;
  text_ko: string;
  text_en: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: number;
  name_ko: string;
  name_en: string | null;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
}

export interface CertificateCategory {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

export interface Certificate {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface Resource {
  id: number;
  title_ko: string;
  title_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  sort_order: number;
  created_at: string;
}

export interface PressRelease {
  id: number;
  title_ko: string;
  title_en: string | null;
  summary_ko: string | null;
  summary_en: string | null;
  content_ko: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
  external_link: string | null;
  published_at: string | null;
  sort_order: number;
}

export interface WorkCategory {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

export interface Work {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  subtitle_ko: string | null;
  subtitle_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  image_url: string | null;
  extra_images: string[];
  completed_at: string | null;
  sort_order: number;
}

export interface ProductCategory {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

export interface Product {
  id: number;
  category_id: number | null;
  name: string;
  description_ko: string | null;
  description_en: string | null;
  specs: string | null;
  image_url: string | null;
  detail_url: string | null;
  sort_order: number;
}

export interface OfficeLocation {
  id: number;
  name_ko: string;
  name_en: string | null;
  address_ko: string | null;
  address_en: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  map_embed_url: string | null;
  sort_order: number;
}

export interface BusinessSection {
  id: string;
  title_ko: string | null;
  title_en: string | null;
  subtitle_ko: string | null;
  subtitle_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  hero_image: string | null;
  cta_label: string | null;
  features: Array<{
    title_ko: string;
    title_en?: string;
    description_ko?: string;
    description_en?: string;
  }>;
}

export type SiteSettingKey = "footer" | "company_info" | "hero";

export interface SiteSetting<T = Record<string, unknown>> {
  key: SiteSettingKey;
  value: T;
  updated_at: string;
}
