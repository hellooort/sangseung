"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale";

export interface SubMenuItem {
  name: string;
  name_en?: string;
  href: string;
  submenu?: SubMenuItem[];
}

export interface NavItem {
  name: string;
  name_en?: string;
  href: string;
  submenu?: SubMenuItem[];
}

export const defaultNavItems: NavItem[] = [
  {
    name: "회사소개",
    name_en: "About",
    href: "/about",
    submenu: [
      { name: "인사말", name_en: "Greeting", href: "/about" },
      { name: "연혁", name_en: "History", href: "/about/history" },
      { name: "조직도", name_en: "Organization", href: "/about/organization" },
      { name: "인증서", name_en: "Certificates", href: "/about/certificates" },
      { name: "오시는 길", name_en: "Location", href: "/about/location" },
    ],
  },
  {
    name: "사업소개",
    name_en: "Business",
    href: "/business",
    submenu: [
      {
        name: "네트워크 사업",
        name_en: "Network",
        href: "/business/network",
        submenu: [
          { name: "IBS 통합시스템", name_en: "IBS Integrated System", href: "/business/network/ibs" },
          { name: "해외 프로젝트", name_en: "Overseas Projects", href: "/business/network/overseas" },
          { name: "공사실적", name_en: "Project Records", href: "/business/network/projects" },
        ],
      },
      {
        name: "LED 디스플레이",
        name_en: "LED Display",
        href: "/business/led",
        submenu: [
          {
            name: "COB LED",
            name_en: "COB LED",
            href: "/business/led/cob",
            submenu: [
              { name: "LFlex", name_en: "LFlex", href: "/business/led/cob/lflex" },
              { name: "SCO-Wall Series", name_en: "SCO-Wall Series", href: "/business/led/cob/sco-wall" },
            ],
          },
          {
            name: "INDOOR FIXED",
            name_en: "Indoor Fixed",
            href: "/business/led/indoor",
            submenu: [
              { name: "S-Wall Series", name_en: "S-Wall Series", href: "/business/led/indoor/s-wall" },
              { name: "SVI60 Series", name_en: "SVI60 Series", href: "/business/led/indoor/svi60" },
              { name: "SVI 1000 Series", name_en: "SVI 1000 Series", href: "/business/led/indoor/svi1000" },
            ],
          },
          {
            name: "OUTDOOR FIXED",
            name_en: "Outdoor Fixed",
            href: "/business/led/outdoor",
            submenu: [
              { name: "SOD Series", name_en: "SOD Series", href: "/business/led/outdoor/sod" },
              { name: "SCOD Series", name_en: "SCOD Series", href: "/business/led/outdoor/scod" },
            ],
          },
          {
            name: "RENTAL",
            name_en: "Rental",
            href: "/business/led/rental",
            submenu: [
              { name: "SVI50 Series", name_en: "SVI50 Series", href: "/business/led/rental/svi50" },
              { name: "STD Series", name_en: "STD Series", href: "/business/led/rental/std" },
            ],
          },
          {
            name: "MEDIA FACADE",
            name_en: "Media Facade",
            href: "/business/led/facade",
            submenu: [
              { name: "SGL Series", name_en: "SGL Series", href: "/business/led/facade/sgl" },
              { name: "ROD-1 Series", name_en: "ROD-1 Series", href: "/business/led/facade/rod1" },
              { name: "ROD-2 Series", name_en: "ROD-2 Series", href: "/business/led/facade/rod2" },
              { name: "ROD-3 Series", name_en: "ROD-3 Series", href: "/business/led/facade/rod3" },
              { name: "ROD-4 Series", name_en: "ROD-4 Series", href: "/business/led/facade/rod4" },
            ],
          },
          {
            name: "AD SIGN",
            name_en: "Ad Sign",
            href: "/business/led/adsign",
            submenu: [
              { name: "AD Sign", name_en: "AD Sign", href: "/business/led/adsign/ad-sign" },
              { name: "Cloud IoT Solution", name_en: "Cloud IoT Solution", href: "/business/led/adsign/cloud-iot" },
            ],
          },
        ],
      },
      {
        name: "Video-Wall",
        name_en: "Video-Wall",
        href: "/business/ip-wall",
      },
      {
        name: "유지보수",
        name_en: "Maintenance",
        href: "/business/maintenance",
      },
    ],
  },
  { name: "시공사례", name_en: "Works", href: "/works" },
  { name: "자료실", name_en: "Resources", href: "/resources/downloads" },
  { name: "보도자료", name_en: "Press", href: "/resources/press" },
  { name: "파트너사", name_en: "Partners", href: "/partners" },
];

const labelOf = (item: { name: string; name_en?: string }, locale: Locale) =>
  locale === "en" && item.name_en ? item.name_en : item.name;

interface HeaderClientProps {
  navItems: NavItem[];
  locale: Locale;
}

export default function HeaderClient({ navItems, locale }: HeaderClientProps) {
  const router = useRouter();
  const [isSwitching, setIsSwitching] = useState(false);

  const switchLocale = async (next: Locale) => {
    if (next === locale || isSwitching) return;
    setIsSwitching(true);
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      // RSC 다시 받아오는 동안에도 isSwitching 유지 → 오버레이 표시.
      // router.refresh 는 Promise 를 반환하지 않아 setTimeout 으로 보수적으로 풀어준다.
      router.refresh();
      setTimeout(() => setIsSwitching(false), 1500);
    } catch {
      setIsSwitching(false);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (menuName: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuEnter = (submenuName: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveSubmenu(submenuName);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
  };

  return (
    <>
      {isSwitching && (
        <div
          aria-live="polite"
          aria-busy="true"
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-white/80 text-xs tracking-widest">
              {locale === "ko" ? "영어로 전환 중…" : "SWITCHING TO KOREAN…"}
            </span>
          </div>
        </div>
      )}
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-transparent backdrop-blur-sm border-b border-white/10"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/ci.png"
              alt="상승종합통신"
              width={180}
              height={48}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white text-sm py-6 block transition-colors"
                >
                  {labelOf(item, locale)}
                </Link>

                {/* First Level Submenu */}
                {item.submenu && activeMenu === item.name && (
                  <div 
                    className="absolute top-full left-0 pt-2"
                    onMouseEnter={handleDropdownEnter}
                  >
                    <div className="bg-[#1a1a1a] rounded-lg shadow-xl min-w-[180px] py-2 border border-white/10">
                      {item.submenu.map((subItem) => (
                        <div
                          key={subItem.name}
                          className="relative"
                          onMouseEnter={() => handleSubmenuEnter(subItem.name)}
                          onMouseLeave={handleSubmenuLeave}
                        >
                          <Link
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {labelOf(subItem, locale)}
                            {subItem.submenu && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </Link>

                          {/* Second Level Submenu */}
                          {subItem.submenu && activeSubmenu === subItem.name && (
                            <div 
                              className="absolute top-0 left-full pl-1"
                              onMouseEnter={handleDropdownEnter}
                            >
                              <div className="bg-[#1a1a1a] rounded-lg shadow-xl min-w-[160px] py-2 border border-white/10">
                                {subItem.submenu.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.name}
                                    href={subSubItem.href}
                                    className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                  >
                                    {labelOf(subSubItem, locale)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => switchLocale("ko")}
                disabled={isSwitching}
                className={`px-2 py-1 transition-colors ${
                  locale === "ko" ? "text-white font-semibold" : "text-white/50 hover:text-white"
                }`}
                aria-pressed={locale === "ko"}
              >
                KO
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                disabled={isSwitching}
                className={`px-2 py-1 transition-colors ${
                  locale === "en" ? "text-white font-semibold" : "text-white/50 hover:text-white"
                }`}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-2.5 rounded text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {locale === "en" ? "Contact" : "문의하기"}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-white/80 hover:text-white text-sm transition-colors"
                  onClick={() => !item.submenu && setIsMenuOpen(false)}
                >
                  {labelOf(item, locale)}
                </Link>
                {item.submenu && (
                  <div className="pl-4 border-l border-white/10 ml-2">
                    {item.submenu.map((subItem) => (
                      <div key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className="block py-2 text-white/60 hover:text-white text-sm transition-colors"
                          onClick={() => !subItem.submenu && setIsMenuOpen(false)}
                        >
                          {labelOf(subItem, locale)}
                        </Link>
                        {subItem.submenu && (
                          <div className="pl-4 border-l border-white/10 ml-2">
                            {subItem.submenu.map((subSubItem) => (
                              <Link
                                key={subSubItem.name}
                                href={subSubItem.href}
                                className="block py-2 text-white/50 hover:text-white text-xs transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {labelOf(subSubItem, locale)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 text-xs mt-4 pb-2">
              <button
                type="button"
                onClick={() => switchLocale("ko")}
                disabled={isSwitching}
                className={`px-3 py-1.5 transition-colors ${
                  locale === "ko" ? "text-white font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                KO
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                disabled={isSwitching}
                className={`px-3 py-1.5 transition-colors ${
                  locale === "en" ? "text-white font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className="block mt-2 bg-white text-black px-6 py-3 rounded text-sm font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {locale === "en" ? "Contact" : "문의하기"}
            </Link>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
