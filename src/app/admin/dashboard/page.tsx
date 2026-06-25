"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import StorageUsage from "@/components/admin/StorageUsage";

const quickLinks = [
  { label: "상담신청/문의",   href: "/admin/contact",              color: "bg-indigo-500" },
  { label: "인사말 수정",     href: "/admin/about/greeting",       color: "bg-blue-500" },
  { label: "설치사례 관리",   href: "/admin/works",                color: "bg-green-500" },
  { label: "인증서 관리",     href: "/admin/about/certificates",   color: "bg-purple-500" },
  { label: "자료실 관리",     href: "/admin/resources/downloads",  color: "bg-orange-500" },
  { label: "파트너사 관리",   href: "/admin/partners",             color: "bg-pink-500" },
  { label: "사이트 설정",     href: "/admin/settings/footer",      color: "bg-gray-500" },
];

interface StatCard {
  label: string;
  value: string;
  href: string;
}

const STAT_DEFS: { label: string; href: string; table: string }[] = [
  { label: "문의",     href: "/admin/contact",              table: "contacts" },
  { label: "설치사례", href: "/admin/works",                table: "works" },
  { label: "인증서",   href: "/admin/about/certificates",   table: "certificates" },
  { label: "파트너사", href: "/admin/partners",             table: "partners" },
  { label: "자료실",   href: "/admin/resources/downloads",  table: "resources" },
  { label: "보도자료", href: "/admin/resources/press",      table: "press_releases" },
  { label: "제품",     href: "/admin/business/products",    table: "products" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>(
    STAT_DEFS.map((s) => ({ label: s.label, value: "—", href: s.href })),
  );

  useEffect(() => {
    const sb = createClient();
    let cancelled = false;
    (async () => {
      const results = await Promise.all(
        STAT_DEFS.map(async (s) => {
          const { count } = await sb.from(s.table).select("id", { count: "exact", head: true });
          return { label: s.label, href: s.href, value: String(count ?? 0) };
        }),
      );
      if (!cancelled) setStats(results);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">대시보드</h1>

      <StorageUsage />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">바로가기</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
          >
            <div className={`w-10 h-10 ${link.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
