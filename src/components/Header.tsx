import HeaderClient, { defaultNavItems, type NavItem, type SubMenuItem } from "./HeaderClient";
import { getSiteSetting, getList } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";
import { ledCategoryHref, type LedCategoryRow } from "@/lib/led-categories";

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

// "LED 디스플레이"(/business/led) 메뉴의 하위 항목을 product_categories 로 동적 교체.
// 제품 카테고리를 추가하면 네비게이션에도 같은 위치에 자동으로 나타난다.
function injectLedCategories(items: NavItem[], cats: LedCategoryRow[]): NavItem[] {
  if (cats.length === 0) return items;
  const ledSubmenu: SubMenuItem[] = cats.map((c) => ({
    name: c.name_ko,
    name_en: c.name_en ?? c.name_ko,
    href: ledCategoryHref(c),
  }));
  const walk = (nodes: SubMenuItem[]): SubMenuItem[] =>
    nodes.map((node) => {
      if (node.href === "/business/led") {
        return { ...node, submenu: ledSubmenu };
      }
      if (node.submenu) return { ...node, submenu: walk(node.submenu) };
      return node;
    });
  return walk(items as SubMenuItem[]) as NavItem[];
}

export default async function Header() {
  const [rawNav, locale, cats] = await Promise.all([
    getSiteSetting<unknown>("navigation", defaultNavItems),
    getLocale(),
    getList<LedCategoryRow>("product_categories", { orderBy: "sort_order" }),
  ]);
  const navItems = injectLedCategories(normalizeNav(rawNav), cats);
  return <HeaderClient navItems={navItems} locale={locale} />;
}
