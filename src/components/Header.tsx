import HeaderClient, { defaultNavItems, type NavItem, type SubMenuItem } from "./HeaderClient";
import { getSiteSetting } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";

// DB 의 navigation 이 array 가 아니거나 형식이 깨져있어도 헤더가 멈추지 않도록 정규화.
function toSubItem(x: unknown): SubMenuItem {
  const o = (x && typeof x === "object" ? (x as Record<string, unknown>) : {}) as Partial<SubMenuItem>;
  return {
    name: typeof o.name === "string" ? o.name : "",
    name_en: typeof o.name_en === "string" ? o.name_en : undefined,
    href: typeof o.href === "string" ? o.href : "/",
    submenu: Array.isArray(o.submenu) ? o.submenu.map(toSubItem) : undefined,
  };
}
function normalizeNav(raw: unknown): NavItem[] {
  const arr: unknown[] = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { items?: unknown[] } | null)?.items)
      ? (raw as { items: unknown[] }).items
      : Array.isArray((raw as { nav?: unknown[] } | null)?.nav)
        ? (raw as { nav: unknown[] }).nav
        : [];
  if (arr.length === 0) return defaultNavItems;
  return arr.map(toSubItem) as NavItem[];
}

export default async function Header() {
  const [rawNav, locale] = await Promise.all([
    getSiteSetting<unknown>("navigation", defaultNavItems),
    getLocale(),
  ]);
  const navItems = normalizeNav(rawNav);
  return <HeaderClient navItems={navItems} locale={locale} />;
}
