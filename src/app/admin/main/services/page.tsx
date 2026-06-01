"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

export interface MainServiceItem {
  id: string;
  label: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  image: string;
  href: string;
}

export interface MainServicesData {
  headingKo: string;
  headingEn: string;
  services: MainServiceItem[];
}

const fallback: MainServicesData = {
  headingKo: "핵심 사업 영역",
  headingEn: "Core Business Areas",
  services: [
    { id: "1", label: "LED DISPLAY", title_ko: "대형 LED 전광판", title_en: "Large LED Display", description_ko: "설계, 제작, 시공까지 원스톱 솔루션", description_en: "One-stop solution from design to installation", image: "/image/services/led.jpg", href: "/business/led" },
    { id: "2", label: "NETWORK",     title_ko: "네트워크 인프라",  title_en: "Network Infrastructure", description_ko: "유무선 네트워크 통합 구축", description_en: "Integrated wired and wireless network", image: "/image/services/network.jpg", href: "/business/network" },
  ],
};

export default function AdminMainServicesPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MainServicesData>("main_services", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const updateService = (id: string, patch: Partial<MainServiceItem>) => {
    setValue({ ...value, services: value.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  };
  const addService = () => {
    const id = Date.now().toString();
    setValue({ ...value, services: [...value.services, { id, label: "NEW", title_ko: "", title_en: "", description_ko: "", description_en: "", image: "", href: "/" }] });
  };
  const removeService = (id: string) => {
    if (!confirm("이 서비스 카드를 삭제하시겠습니까?")) return;
    setValue({ ...value, services: value.services.filter((s) => s.id !== id) });
  };
  const moveService = (id: string, dir: -1 | 1) => {
    const idx = value.services.findIndex((s) => s.id === id);
    const nIdx = idx + dir;
    if (idx < 0 || nIdx < 0 || nIdx >= value.services.length) return;
    const next = [...value.services];
    [next[idx], next[nIdx]] = [next[nIdx], next[idx]];
    setValue({ ...value, services: next });
  };
  const handleUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "services");
      updateService(id, { image: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };
  const handleSave = async () => {
    const ok = await save();
    if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); }
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 - 핵심 사업 영역</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지의 OUR SERVICES 섹션을 관리합니다.</p>
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
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">제목 (KO)</label>
            <input type="text" value={value.headingKo} onChange={(e) => setValue({ ...value, headingKo: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Heading (EN)</label>
            <input type="text" value={value.headingEn} onChange={(e) => setValue({ ...value, headingEn: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">서비스 카드</h2>
          <button onClick={addService} className="text-blue-600 text-sm font-medium hover:underline">+ 카드 추가</button>
        </div>

        <div className="space-y-4">
          {value.services.map((s, idx) => (
            <div key={s.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex gap-4 mb-3">
                <div className="flex flex-col gap-1 shrink-0">
                  <div className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    {s.image ? (
                      <Image src={s.image} alt="" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">이미지 없음</div>
                    )}
                    <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                      {uploadingId === s.id ? "업로드중" : "변경"}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(s.id, e)} />
                    </label>
                  </div>
                  <span className="text-[10px] text-gray-400">가로형 권장 (예: 600 x 400px)</span>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={s.label} onChange={(e) => updateService(s.id, { label: e.target.value })} placeholder="라벨 (예: LED DISPLAY)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={s.href} onChange={(e) => updateService(s.id, { href: e.target.value })} placeholder="링크 (예: /business/led)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={s.title_ko} onChange={(e) => updateService(s.id, { title_ko: e.target.value })} placeholder="제목 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={s.title_en} onChange={(e) => updateService(s.id, { title_en: e.target.value })} placeholder="Title (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={s.description_ko} onChange={(e) => updateService(s.id, { description_ko: e.target.value })} placeholder="설명 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={s.description_en} onChange={(e) => updateService(s.id, { description_en: e.target.value })} placeholder="Description (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex gap-1">
                  <button onClick={() => moveService(s.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↑</button>
                  <button onClick={() => moveService(s.id, 1)} disabled={idx === value.services.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↓</button>
                </div>
                <button onClick={() => removeService(s.id)} className="text-red-500 text-xs hover:underline">삭제</button>
              </div>
            </div>
          ))}
          {value.services.length === 0 && <p className="text-gray-400 text-sm text-center py-6">서비스 카드가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}
