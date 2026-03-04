"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

interface SubMenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  {
    name: "회사소개",
    href: "/about",
    submenu: [
      { name: "인사말", href: "/about" },
      { name: "연혁", href: "/about/history" },
      { name: "조직도", href: "/about/organization" },
      { name: "인증서", href: "/about/certificates" },
      { name: "오시는 길", href: "/about/location" },
    ],
  },
  {
    name: "사업소개",
    href: "/business",
    submenu: [
      {
        name: "네트워크 사업",
        href: "/business/network",
        submenu: [
          { name: "IBS 통합시스템", href: "/business/network/ibs" },
          { name: "해외 프로젝트", href: "/business/network/overseas" },
          { name: "공사실적", href: "/business/network/projects" },
        ],
      },
      {
        name: "LED 디스플레이",
        href: "/business/led",
        submenu: [
          {
            name: "COB LED",
            href: "/business/led/cob",
            submenu: [
              { name: "LFlex", href: "/business/led/cob/lflex" },
              { name: "SCO-Wall Series", href: "/business/led/cob/sco-wall" },
            ],
          },
          {
            name: "INDOOR FIXED",
            href: "/business/led/indoor",
            submenu: [
              { name: "S-Wall Series", href: "/business/led/indoor/s-wall" },
              { name: "SVI60 Series", href: "/business/led/indoor/svi60" },
              { name: "SVI 1000 Series", href: "/business/led/indoor/svi1000" },
            ],
          },
          {
            name: "OUTDOOR FIXED",
            href: "/business/led/outdoor",
            submenu: [
              { name: "SOD Series", href: "/business/led/outdoor/sod" },
              { name: "SCOD Series", href: "/business/led/outdoor/scod" },
            ],
          },
          {
            name: "RENTAL",
            href: "/business/led/rental",
            submenu: [
              { name: "SVI50 Series", href: "/business/led/rental/svi50" },
              { name: "STD Series", href: "/business/led/rental/std" },
            ],
          },
          {
            name: "MEDIA FACADE",
            href: "/business/led/facade",
            submenu: [
              { name: "SGL Series", href: "/business/led/facade/sgl" },
              { name: "ROD-1 Series", href: "/business/led/facade/rod1" },
              { name: "ROD-2 Series", href: "/business/led/facade/rod2" },
              { name: "ROD-3 Series", href: "/business/led/facade/rod3" },
              { name: "ROD-4 Series", href: "/business/led/facade/rod4" },
            ],
          },
          {
            name: "AD SIGN",
            href: "/business/led/adsign",
            submenu: [
              { name: "AD Sign", href: "/business/led/adsign/ad-sign" },
              { name: "Cloud IoT Solution", href: "/business/led/adsign/cloud-iot" },
            ],
          },
        ],
      },
    ],
  },
  { name: "파트너사", href: "/partners" },
  { name: "시공사례", href: "/works" },
  {
    name: "자료실",
    href: "/resources",
    submenu: [
      { name: "보도자료", href: "/resources/press" },
      { name: "자료실", href: "/resources/downloads" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
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
                  {item.name}
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
                            {subItem.name}
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
                                    {subSubItem.name}
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
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-2.5 rounded text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              문의하기
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
                  {item.name}
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
                          {subItem.name}
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
                                {subSubItem.name}
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
            <Link
              href="/contact"
              className="block mt-4 bg-white text-black px-6 py-3 rounded text-sm font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              문의하기
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
