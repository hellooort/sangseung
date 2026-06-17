"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface MainResultData {
  paragraphKo: string;
  paragraphEn: string;
  stat1Label_ko: string;
  stat1Label_en: string;
  stat1Value: number;
  stat1Suffix_ko: string;
  stat1Suffix_en: string;
  stat2Label_ko: string;
  stat2Label_en: string;
  stat2Value: number;
  stat2Suffix_ko: string;
  stat2Suffix_en: string;
}

const fallback: MainResultData = {
  paragraphKo: "2001년 창립 이후, 다양한 산업 분야에서 사이트 환경에 최적화된 솔루션과 높은 품질의 서비스를 제공하며 새로운 고객경험을 창출하고 역량을 입증해왔으며, 현재는 사업 영역을 확장하며 지속적인 성장을 이어가고 있습니다.",
  paragraphEn: "Since our founding in 2001, we have proven our capability across diverse industries by delivering site-optimized solutions and high-quality service. Today we continue to grow by expanding our business areas.",
  stat1Label_ko: "프로젝트",
  stat1Label_en: "Projects",
  stat1Value: 200,
  stat1Suffix_ko: "건",
  stat1Suffix_en: "",
  stat2Label_ko: "고객사",
  stat2Label_en: "Clients",
  stat2Value: 120,
  stat2Suffix_ko: "개사",
  stat2Suffix_en: "",
};

export default function AdminMainResultPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MainResultData>("main_result", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const update = <K extends keyof MainResultData>(k: K, v: MainResultData[K]) => setValue({ ...value, [k]: v });
  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 - 실적 통계 섹션</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지의 RESULT 섹션 (프로젝트 / 고객사 카운트) 을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">소개 문구</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">한국어</label>
            <textarea value={value.paragraphKo} onChange={(e) => update("paragraphKo", e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">English</label>
            <textarea value={value.paragraphEn} onChange={(e) => update("paragraphEn", e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">통계 1</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">라벨 (KO)</label>
              <input type="text" value={value.stat1Label_ko} onChange={(e) => update("stat1Label_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Label (EN)</label>
              <input type="text" value={value.stat1Label_en} onChange={(e) => update("stat1Label_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">숫자 (애니메이션 종료값)</label>
              <input type="number" value={value.stat1Value} onChange={(e) => update("stat1Value", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">단위 (KO)</label>
              <input type="text" value={value.stat1Suffix_ko} onChange={(e) => update("stat1Suffix_ko", e.target.value)} placeholder="예: 건" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Unit (EN)</label>
              <input type="text" value={value.stat1Suffix_en} onChange={(e) => update("stat1Suffix_en", e.target.value)} placeholder="(빈칸 가능)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">통계 2</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">라벨 (KO)</label>
              <input type="text" value={value.stat2Label_ko} onChange={(e) => update("stat2Label_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Label (EN)</label>
              <input type="text" value={value.stat2Label_en} onChange={(e) => update("stat2Label_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">숫자 (애니메이션 종료값)</label>
              <input type="number" value={value.stat2Value} onChange={(e) => update("stat2Value", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">단위 (KO)</label>
              <input type="text" value={value.stat2Suffix_ko} onChange={(e) => update("stat2Suffix_ko", e.target.value)} placeholder="예: 개사" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Unit (EN)</label>
              <input type="text" value={value.stat2Suffix_en} onChange={(e) => update("stat2Suffix_en", e.target.value)} placeholder="(빈칸 가능)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
