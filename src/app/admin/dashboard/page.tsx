"use client";

import Link from "next/link";

const stats = [
  { label: "시공사례", value: "23", href: "/admin/works" },
  { label: "인증서", value: "27", href: "/admin/about/certificates" },
  { label: "파트너사", value: "12", href: "/admin/partners" },
  { label: "자료실", value: "8", href: "/admin/resources" },
];

const quickLinks = [
  { label: "인사말 수정", href: "/admin/about/greeting", color: "bg-blue-500" },
  { label: "시공사례 관리", href: "/admin/works", color: "bg-green-500" },
  { label: "인증서 관리", href: "/admin/about/certificates", color: "bg-purple-500" },
  { label: "자료실 관리", href: "/admin/resources", color: "bg-orange-500" },
  { label: "파트너사 관리", href: "/admin/partners", color: "bg-pink-500" },
  { label: "사이트 설정", href: "/admin/settings/footer", color: "bg-gray-500" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

      {/* 바로가기 */}
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
