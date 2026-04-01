"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // TODO: Supabase 인증으로 교체
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth && !isLoginPage) {
      router.replace("/admin/login");
    } else {
      setIsReady(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">admin@sangseung.co.kr</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
