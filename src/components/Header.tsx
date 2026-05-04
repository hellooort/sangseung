import HeaderClient, { defaultNavItems, type NavItem } from "./HeaderClient";
import { getSiteSetting } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";

export default async function Header() {
  const [navItems, locale] = await Promise.all([
    getSiteSetting<NavItem[]>("navigation", defaultNavItems),
    getLocale(),
  ]);
  return <HeaderClient navItems={navItems} locale={locale} />;
}
