"use client";

import { useState } from "react";

interface NavCategory {
  id: number;
  nameKo: string;
  nameEn: string;
  href: string;
  children?: NavCategory[];
}

const initialNav: NavCategory[] = [
  {
    id: 1, nameKo: "회사소개", nameEn: "About", href: "/about",
    children: [
      { id: 11, nameKo: "인사말", nameEn: "Greeting", href: "/about" },
      { id: 12, nameKo: "연혁", nameEn: "History", href: "/about/history" },
      { id: 13, nameKo: "조직도", nameEn: "Organization", href: "/about/organization" },
      { id: 14, nameKo: "인증서", nameEn: "Certificates", href: "/about/certificates" },
      { id: 15, nameKo: "오시는 길", nameEn: "Location", href: "/about/location" },
    ],
  },
  {
    id: 2, nameKo: "사업소개", nameEn: "Business", href: "/business",
    children: [
      { id: 21, nameKo: "네트워크 사업", nameEn: "Network", href: "/business/network" },
      { id: 22, nameKo: "LED 디스플레이", nameEn: "LED Display", href: "/business/led" },
    ],
  },
  { id: 3, nameKo: "파트너사", nameEn: "Partners", href: "/partners" },
  { id: 4, nameKo: "시공사례", nameEn: "Works", href: "/works" },
  {
    id: 5, nameKo: "자료실", nameEn: "Resources", href: "/resources",
    children: [
      { id: 51, nameKo: "보도자료", nameEn: "Press", href: "/resources/press" },
      { id: 52, nameKo: "자료실", nameEn: "Downloads", href: "/resources/downloads" },
    ],
  },
];

export default function AdminNavigationPage() {
  const [nav, setNav] = useState<NavCategory[]>(initialNav);
  const [saved, setSaved] = useState(false);

  const updateNav = (id: number, field: "nameKo" | "nameEn", value: string) => {
    setNav(
      nav.map((item) => {
        if (item.id === id) return { ...item, [field]: value };
        if (item.children) {
          return {
            ...item,
            children: item.children.map((child) =>
              child.id === id ? { ...child, [field]: value } : child
            ),
          };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    console.log("네비게이션 저장:", nav);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">네비게이션 텍스트 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">상위 카테고리와 하위 메뉴의 한/영 텍스트를 수정할 수 있습니다.</p>

      <div className="space-y-4">
        {nav.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-3 gap-4 items-center mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">한국어</label>
                <input type="text" value={item.nameKo} onChange={(e) => updateNav(item.id, "nameKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">English</label>
                <input type="text" value={item.nameEn} onChange={(e) => updateNav(item.id, "nameEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">경로</label>
                <span className="text-sm text-gray-400 px-3 py-2 block">{item.href}</span>
              </div>
            </div>

            {item.children && (
              <div className="ml-6 border-l-2 border-gray-100 pl-4 space-y-3 mt-4">
                {item.children.map((child) => (
                  <div key={child.id} className="grid grid-cols-3 gap-4 items-center">
                    <input type="text" value={child.nameKo} onChange={(e) => updateNav(child.id, "nameKo", e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={child.nameEn} onChange={(e) => updateNav(child.id, "nameEn", e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="text-xs text-gray-400">{child.href}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
