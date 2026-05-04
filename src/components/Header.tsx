import HeaderClient, { defaultNavItems, type NavItem } from "./HeaderClient";
import { getSiteSetting } from "@/lib/supabase/public";

export default async function Header() {
  const navItems = await getSiteSetting<NavItem[]>("navigation", defaultNavItems);
  return <HeaderClient navItems={navItems} />;
}
