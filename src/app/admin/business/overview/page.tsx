"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";

const supabase = createClient();

interface Feature {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

interface BusinessSection {
  id: string;
  label: string;
  title_ko: string;
  title_en: string;
  subtitle_ko: string;
  subtitle_en: string;
  description_ko: string;
  description_en: string;
  hero_image: string;
  cta_label_ko: string;
  cta_label_en: string;
  features: Feature[];
}

const SECTION_DEFS = [
  { id: "network", label: "네트워크 사업" },
  { id: "led", label: "LED 디스플레이" },
  { id: "video-wall", label: "Video-Wall" },
  { id: "maintenance", label: "유지보수" },
];

const emptySection = (id: string, label: string): BusinessSection => ({
  id,
  label,
  title_ko: label,
  title_en: "",
  subtitle_ko: "",
  subtitle_en: "",
  description_ko: "",
  description_en: "",
  hero_image: "",
  cta_label_ko: "문의하기",
  cta_label_en: "Contact us",
  features: [],
});

export default function AdminBusinessOverviewPage() {
  const [sections, setSections] = useState<BusinessSection[]>(
    SECTION_DEFS.map((s) => emptySection(s.id, s.label)),
  );
  const [activeId, setActiveId] = useState<string>("network");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from("business_sections").select("*");
      if (error) setError(error.message);
      else if (data) {
        setSections(
          SECTION_DEFS.map((def) => {
            const row = (data as Record<string, unknown>[]).find((r) => r.id === def.id) as Record<string, unknown> | undefined;
            if (!row) return emptySection(def.id, def.label);
            const features = Array.isArray(row.features) ? (row.features as Feature[]) : [];
            return {
              id: def.id,
              label: def.label,
              title_ko: (row.title_ko as string) ?? "",
              title_en: (row.title_en as string) ?? "",
              subtitle_ko: (row.subtitle_ko as string) ?? "",
              subtitle_en: (row.subtitle_en as string) ?? "",
              description_ko: (row.description_ko as string) ?? "",
              description_en: (row.description_en as string) ?? "",
              hero_image: (row.hero_image as string) ?? "",
              cta_label_ko: (row.cta_label_ko as string) ?? "문의하기",
              cta_label_en: (row.cta_label_en as string) ?? "Contact us",
              features,
            };
          }),
        );
      }
      setLoading(false);
    })();
  }, []);

  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  const updateActive = <K extends keyof BusinessSection>(field: K, value: BusinessSection[K]) => {
    setSections(sections.map((s) => (s.id === activeId ? { ...s, [field]: value } : s)));
  };

  const addFeature = () => {
    updateActive("features", [
      ...active.features,
      { id: Date.now().toString(), title_ko: "", title_en: "", description_ko: "", description_en: "" },
    ]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    updateActive("features", active.features.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const removeFeature = (id: string) => {
    updateActive("features", active.features.filter((f) => f.id !== id));
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, `business/${active.id}`);
      updateActive("hero_image", url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const upserts = sections.map((s) =>
      supabase.from("business_sections").upsert(
        {
          id: s.id,
          title_ko: s.title_ko,
          title_en: s.title_en,
          subtitle_ko: s.subtitle_ko,
          subtitle_en: s.subtitle_en,
          description_ko: s.description_ko,
          description_en: s.description_en,
          hero_image: s.hero_image,
          cta_label_ko: s.cta_label_ko,
          cta_label_en: s.cta_label_en,
          features: s.features,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        { onConflict: "id" },
      ),
    );
    const results = await Promise.all(upserts);
    setSaving(false);
    const firstError = results.find((r) => r.error);
    if (firstError?.error) {
      setError(firstError.error.message);
      return;
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사업소개 관리</h1>
          <p className="text-sm text-gray-500 mt-1">각 사업 영역의 소개 텍스트와 주요 내용을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActiveId(s.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeId === s.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-500"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>

        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-600 mb-2">히어로 이미지</label>
          <div className="flex items-center gap-4">
            <div className="relative w-40 h-24 bg-gray-100 rounded-lg overflow-hidden">
              {active.hero_image ? (
                <Image src={active.hero_image} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">이미지 없음</div>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                {uploading ? "업로드 중..." : "이미지 업로드"}
                <input type="file" className="hidden" accept="image/*" onChange={handleHeroUpload} disabled={uploading} />
              </label>
              <span className="text-[10px] text-gray-400">가로형 이미지 권장 (1920 x 1080px)</span>
              <input type="text" value={active.hero_image} onChange={(e) => updateActive("hero_image", e.target.value)} placeholder="/image/..." className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">제목 (KO)</label>
            <input type="text" value={active.title_ko} onChange={(e) => updateActive("title_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
            <input type="text" value={active.title_en} onChange={(e) => updateActive("title_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">소제목 (KO)</label>
            <input type="text" value={active.subtitle_ko} onChange={(e) => updateActive("subtitle_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (EN)</label>
            <input type="text" value={active.subtitle_en} onChange={(e) => updateActive("subtitle_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <textarea value={active.description_ko} onChange={(e) => updateActive("description_ko", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <textarea value={active.description_en} onChange={(e) => updateActive("description_en", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CTA 버튼 (KO)</label>
            <input type="text" value={active.cta_label_ko} onChange={(e) => updateActive("cta_label_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CTA Button (EN)</label>
            <input type="text" value={active.cta_label_en} onChange={(e) => updateActive("cta_label_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">주요 항목</h2>
            <p className="text-xs text-gray-500 mt-0.5">해당 사업 영역의 하위 카드/서비스를 관리합니다.</p>
          </div>
          <button onClick={addFeature} className="text-blue-600 text-sm font-medium hover:underline">+ 항목 추가</button>
        </div>

        <div className="space-y-3">
          {active.features.map((f) => (
            <div key={f.id} className="border border-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="text" value={f.title_ko} onChange={(e) => updateFeature(f.id, "title_ko", e.target.value)} placeholder="제목 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.title_en} onChange={(e) => updateFeature(f.id, "title_en", e.target.value)} placeholder="Title (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.description_ko} onChange={(e) => updateFeature(f.id, "description_ko", e.target.value)} placeholder="설명 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.description_en} onChange={(e) => updateFeature(f.id, "description_en", e.target.value)} placeholder="Description (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button onClick={() => removeFeature(f.id)} className="text-red-500 text-xs hover:underline">삭제</button>
            </div>
          ))}
          {active.features.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">항목이 없습니다. 상단 &quot;+ 항목 추가&quot; 버튼으로 추가해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}