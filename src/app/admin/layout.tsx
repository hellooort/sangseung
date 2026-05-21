"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isLoginPage = pathname === "/admin/login";
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user && !isLoginPage) {
        router.replace("/admin/login");
        return;
      }
      setEmail(user?.email ?? null);
      setIsReady(true);
    })();
    return () => { cancelled = true; };
  }, [pathname, isLoginPage, router, supabase]);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{email ?? ""}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}