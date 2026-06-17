"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface MainCtaData {
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  primaryLabelKo: string;
  primaryLabelEn: string;
  primaryHref: string;
  phoneNumber: string;
}

const fallback: MainCtaData = {
  titleKo: "프로젝트를 시작할 준비가 되셨나요?",
  titleEn: "Ready to start your project?",
  descriptionKo: "네트워크 인프라부터 LED 디스플레이까지, 최적의 솔루션을 제안해 드립니다.",
  descriptionEn: "From network infrastructure to LED displays — we propose the optimal solution for you.",
  primaryLabelKo: "무료 상담 신청",
  primaryLabelEn: "Request Free Consultation",
  primaryHref: "/contact",
  phoneNumber: "02-953-0056",
};

export default function AdminMainCtaPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MainCtaData>("main_cta", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const update = <K extends keyof MainCtaData>(k: K, v: MainCtaData[K]) => setValue({ ...value, [k]: v });
  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 - 하단 CTA 섹션</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지 가장 하단의 &quot;프로젝트 시작 준비&quot; 영역을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">제목</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">한국어</label>
              <input type="text" value={value.titleKo} onChange={(e) => update("titleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">English</label>
              <input type="text" value={value.titleEn} onChange={(e) => update("titleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">설명</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">한국어</label>
              <textarea value={value.descriptionKo} onChange={(e) => update("descriptionKo", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">English</label>
              <textarea value={value.descriptionEn} onChange={(e) => update("descriptionEn", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">버튼 / 전화번호</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">버튼 라벨 (KO)</label>
            <input type="text" value={value.primaryLabelKo} onChange={(e) => update("primaryLabelKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Button Label (EN)</label>
            <input type="text" value={value.primaryLabelEn} onChange={(e) => update("primaryLabelEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">버튼 링크</label>
            <input type="text" value={value.primaryHref} onChange={(e) => update("primaryHref", e.target.value)} placeholder="/contact" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">전화번호</label>
            <input type="text" value={value.phoneNumber} onChange={(e) => update("phoneNumber", e.target.value)} placeholder="02-953-0056" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
