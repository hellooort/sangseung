"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface MainBusinessItem {
  id: string;
  title: string;
  subtitle_ko: string;
  subtitle_en: string;
  description_ko: string;
  description_en: string;
  href: string;
}

interface MainBusinessData {
  headingKo: string;
  headingEn: string;
  areas: MainBusinessItem[];
}

const fallback: MainBusinessData = {
  headingKo: "사업분야",
  headingEn: "Business Areas",
  areas: [
    { id: "1", title: "NI",            subtitle_ko: "Network Infrastructure",        subtitle_en: "Network Infrastructure",        description_ko: "네트워크 인프라 구축",       description_en: "Network infrastructure build-out",     href: "/business/network" },
    { id: "2", title: "LED Display",   subtitle_ko: "LED 디스플레이",                subtitle_en: "LED Display",                   description_ko: "설계, 제작, 시공",            description_en: "Design, production, installation",     href: "/business/led" },
    { id: "3", title: "SI",            subtitle_ko: "System Integration",            subtitle_en: "System Integration",            description_ko: "시스템 통합",                  description_en: "Integrated system services",           href: "/business/si" },
    { id: "4", title: "Media Façade",  subtitle_ko: "미디어 파사드",                 subtitle_en: "Media Façade",                  description_ko: "건물 외관 LED 디스플레이",   description_en: "LED displays on building exteriors",   href: "/business/facade" },
    { id: "5", title: "Network",       subtitle_ko: "네트워크 구축",                 subtitle_en: "Network Build",                 description_ko: "유무선 인프라",               description_en: "Wired & wireless infrastructure",      href: "/business/network" },
    { id: "6", title: "IBS",           subtitle_ko: "Intelligent Building System",   subtitle_en: "Intelligent Building System",   description_ko: "A/V, PA, CCTV, CATV 등",      description_en: "A/V, PA, CCTV, CATV and more",         href: "/business/ibs" },
  ],
};

export default function AdminMainBusinessPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MainBusinessData>("main_business", fallback);
  const [savedMsg, setSavedMsg] = useState(false);

  const updateArea = (id: string, patch: Partial<MainBusinessItem>) =>
    setValue({ ...value, areas: value.areas.map((a) => (a.id === id ? { ...a, ...patch } : a)) });
  const addArea = () => {
    const id = Date.now().toString();
    setValue({ ...value, areas: [...value.areas, { id, title: "NEW", subtitle_ko: "", subtitle_en: "", description_ko: "", description_en: "", href: "/" }] });
  };
  const removeArea = (id: string) => {
    if (!confirm("이 카드를 삭제하시겠습니까?")) return;
    setValue({ ...value, areas: value.areas.filter((a) => a.id !== id) });
  };
  const moveArea = (id: string, dir: -1 | 1) => {
    const idx = value.areas.findIndex((a) => a.id === id);
    const n = idx + dir;
    if (idx < 0 || n < 0 || n >= value.areas.length) return;
    const arr = [...value.areas];
    [arr[idx], arr[n]] = [arr[n], arr[idx]];
    setValue({ ...value, areas: arr });
  };
  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 - 사업분야 카드</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지 BUSINESS 섹션의 6개 카드를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">섹션 헤딩</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={value.headingKo} onChange={(e) => setValue({ ...value, headingKo: e.target.value })} placeholder="제목 (KO)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={value.headingEn} onChange={(e) => setValue({ ...value, headingEn: e.target.value })} placeholder="Heading (EN)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">사업 카드</h2>
          <button onClick={addArea} className="text-blue-600 text-sm font-medium hover:underline">+ 카드 추가</button>
        </div>
        <div className="space-y-3">
          {value.areas.map((a, idx) => (
            <div key={a.id} className="border border-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="text" value={a.title} onChange={(e) => updateArea(a.id, { title: e.target.value })} placeholder="대제목 (예: NI / LED Display)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={a.href} onChange={(e) => updateArea(a.id, { href: e.target.value })} placeholder="링크 (예: /business/network)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={a.subtitle_ko} onChange={(e) => updateArea(a.id, { subtitle_ko: e.target.value })} placeholder="부제 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={a.subtitle_en} onChange={(e) => updateArea(a.id, { subtitle_en: e.target.value })} placeholder="Subtitle (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={a.description_ko} onChange={(e) => updateArea(a.id, { description_ko: e.target.value })} placeholder="설명 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={a.description_en} onChange={(e) => updateArea(a.id, { description_en: e.target.value })} placeholder="Description (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex gap-1">
                  <button onClick={() => moveArea(a.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↑</button>
                  <button onClick={() => moveArea(a.id, 1)} disabled={idx === value.areas.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↓</button>
                </div>
                <button onClick={() => removeArea(a.id)} className="text-red-500 text-xs hover:underline">삭제</button>
              </div>
            </div>
          ))}
          {value.areas.length === 0 && <p className="text-gray-400 text-sm text-center py-6">카드가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}
