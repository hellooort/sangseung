"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface MainAboutData {
  headlineKo: string;
  headlineEn: string;
  paragraph1Ko: string;
  paragraph1En: string;
  paragraph2Ko: string;
  paragraph2En: string;
  bigTextLine1: string;
  bigTextLine2: string;
}

const fallback: MainAboutData = {
  headlineKo: "디지털 미디어 솔루션을 통해\n미래를 선도하는\n새로운 기준을 제시합니다.",
  headlineEn: "Setting a new standard\nfor the future through\ndigital media solutions.",
  paragraph1Ko: "상승종합통신은 디지털 미디어 기반의 공간을 구성하고 사용자 경험을 향상시키는\nUX/UI와 매력적인 디지털 콘텐츠를 제공하는 미디어 크리에이티브 그룹입니다.",
  paragraph1En: "Sangseung is a media-creative group that designs digital-media-based spaces\nand delivers immersive UX/UI and engaging digital content.",
  paragraph2Ko: "문제를 해결하고 가치를 만들어내는 개념을 바탕으로\n환경, 서비스, 사용자가 서로 유기적으로 연결될 수 있는 방안에 대해 연구하며\n공간과 미디어의 시너지 포인트를 찾아 최상의 서비스를 제공합니다.",
  paragraph2En: "Built on the principle of solving problems and creating value,\nwe research how environment, service, and user can connect organically\nand find the synergy point between space and media to deliver the best service.",
  bigTextLine1: "DIGITAL",
  bigTextLine2: "INNOVATION",
};

export default function AdminMainAboutPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MainAboutData>("main_about", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const update = <K extends keyof MainAboutData>(k: K, v: MainAboutData[K]) => setValue({ ...value, [k]: v });
  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 - 회사 소개 섹션</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지의 &quot;디지털 미디어 솔루션…&quot; 영역을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">KO</span> 한국어
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">헤드라인 (줄바꿈 Enter)</label>
              <textarea value={value.headlineKo} onChange={(e) => update("headlineKo", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">본문 1</label>
              <textarea value={value.paragraph1Ko} onChange={(e) => update("paragraph1Ko", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">본문 2</label>
              <textarea value={value.paragraph2Ko} onChange={(e) => update("paragraph2Ko", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">EN</span> English
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Headline (line break = Enter)</label>
              <textarea value={value.headlineEn} onChange={(e) => update("headlineEn", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Paragraph 1</label>
              <textarea value={value.paragraph1En} onChange={(e) => update("paragraph1En", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Paragraph 2</label>
              <textarea value={value.paragraph2En} onChange={(e) => update("paragraph2En", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">우측 큰 텍스트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">1줄</label>
            <input type="text" value={value.bigTextLine1} onChange={(e) => update("bigTextLine1", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">2줄</label>
            <input type="text" value={value.bigTextLine2} onChange={(e) => update("bigTextLine2", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
