"use client";

import Link from "next/link";
import StorageUsage from "@/components/admin/StorageUsage";

const resourceLinks = [
  {
    href: "/admin/resources/press",
    title: "보도자료",
    description: "이미지와 제목 형태의 보도자료를 관리합니다.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2M5 8h6m-6 4h6m-6 4h6" />
      </svg>
    ),
  },
  {
    href: "/admin/resources/downloads",
    title: "자료실 (다운로드)",
    description: "카탈로그, 사양서 등 다운로드 파일을 관리합니다.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function AdminResourcesHubPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">자료실 관리</h1>
      <StorageUsage />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourceLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {link.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{link.title}</h2>
            <p className="text-sm text-gray-500">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
