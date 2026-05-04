export type Locale = "ko" | "en";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "ko";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "ko" || v === "en";
}

/**
 * locale 에 따라 ko/en 중 하나를 선택. en이 비어있으면 ko로 fallback.
 */
export function tr(locale: Locale | undefined, ko: string | null | undefined, en: string | null | undefined): string {
  if (locale === "en" && en && en.trim().length > 0) return en;
  return ko ?? "";
}