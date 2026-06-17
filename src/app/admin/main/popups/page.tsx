"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

export interface PopupItem {
  id: string;
  enabled: boolean;
  title_ko: string;
  title_en: string;
  body_ko: string;
  body_en: string;
  image: string;
  link_url: string;
  link_label_ko: string;
  link_label_en: string;
  start_at: string; // YYYY-MM-DD
  end_at: string;   // YYYY-MM-DD
  width: number;    // px
}

interface PopupsData {
  popups: PopupItem[];
}

const fallback: PopupsData = { popups: [] };

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const newPopup = (): PopupItem => ({
  id: newId(),
  enabled: true,
  title_ko: "",
  title_en: "",
  body_ko: "",
  body_en: "",
  image: "",
  link_url: "",
  link_label_ko: "",
  link_label_en: "",
  start_at: new Date().toISOString().slice(0, 10),
  end_at: "",
  width: 480,
});

export default function AdminPopupsPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<PopupsData>("popups", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSave = async () => {
    const ok = await save();
    if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); }
  };

  const updatePopup = (id: string, patch: Partial<PopupItem>) =>
    setValue({ popups: value.popups.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  const addPopup = () => setValue({ popups: [...value.popups, newPopup()] });
  const removePopup = (id: string) => {
    if (!confirm("이 팝업을 삭제하시겠습니까?")) return;
    setValue({ popups: value.popups.filter((p) => p.id !== id) });
  };
  const movePopup = (id: string, dir: -1 | 1) => {
    const idx = value.popups.findIndex((p) => p.id === id);
    const n = idx + dir;
    if (idx < 0 || n < 0 || n >= value.popups.length) return;
    const arr = [...value.popups];
    [arr[idx], arr[n]] = [arr[n], arr[idx]];
    setValue({ popups: arr });
  };
  const handleUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingId(id);
    try { const url = await uploadImage(file, "popups"); updatePopup(id, { image: url }); }
    catch (err) { alert(err instanceof Error ? err.message : "업로드 실패"); }
    finally { setUploadingId(null); e.target.value = ""; }
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">팝업 관리</h1>
          <p className="text-sm text-gray-500 mt-1">메인 페이지에 노출되는 팝업을 관리합니다. 활성화된 팝업만 표시되며, 사용자는 &quot;오늘 하루 보지 않기&quot; 로 닫을 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {value.popups.map((p, idx) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.enabled} onChange={(e) => updatePopup(p.id, { enabled: e.target.checked })} />
                <span className={p.enabled ? "text-green-600 font-semibold" : "text-gray-400"}>
                  {p.enabled ? "활성화 (사이트에 노출됨)" : "비활성화"}
                </span>
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => movePopup(p.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↑</button>
                <button onClick={() => movePopup(p.id, 1)} disabled={idx === value.popups.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↓</button>
                <button onClick={() => removePopup(p.id)} className="text-red-500 text-xs hover:underline">삭제</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input type="text" value={p.title_ko} onChange={(e) => updatePopup(p.id, { title_ko: e.target.value })} placeholder="제목 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={p.title_en} onChange={(e) => updatePopup(p.id, { title_en: e.target.value })} placeholder="Title (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea rows={3} value={p.body_ko} onChange={(e) => updatePopup(p.id, { body_ko: e.target.value })} placeholder="본문 (KO) - 줄바꿈 Enter" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              <textarea rows={3} value={p.body_en} onChange={(e) => updatePopup(p.id, { body_en: e.target.value })} placeholder="Body (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>

            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">이미지 (선택)</label>
              <div className="flex items-center gap-3">
                <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {p.image ? <Image src={p.image} alt="" fill className="object-cover" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">이미지 없음</div>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-blue-600 text-xs cursor-pointer hover:underline">
                    {uploadingId === p.id ? "업로드중" : "업로드"}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(p.id, e)} />
                  </label>
                  <span className="text-[10px] text-gray-400">자유 비율 (예: 600 x 800px)</span>
                </div>
                <input type="text" value={p.image} onChange={(e) => updatePopup(p.id, { image: e.target.value })} placeholder="/image/..." className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input type="text" value={p.link_url} onChange={(e) => updatePopup(p.id, { link_url: e.target.value })} placeholder="버튼 링크 URL (선택)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={p.link_label_ko} onChange={(e) => updatePopup(p.id, { link_label_ko: e.target.value })} placeholder="버튼 라벨 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={p.link_label_en} onChange={(e) => updatePopup(p.id, { link_label_en: e.target.value })} placeholder="Button (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">노출 시작일 (선택)</label>
                <input type="date" value={p.start_at} onChange={(e) => updatePopup(p.id, { start_at: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">노출 종료일 (선택)</label>
                <input type="date" value={p.end_at} onChange={(e) => updatePopup(p.id, { end_at: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">팝업 너비 (px)</label>
                <input type="number" value={p.width} min={280} max={900} step={10} onChange={(e) => updatePopup(p.id, { width: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        ))}

        {value.popups.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
            등록된 팝업이 없습니다. 아래 버튼으로 추가해 주세요.
          </div>
        )}
      </div>

      <button onClick={addPopup} className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 text-sm font-medium hover:border-blue-500 hover:bg-blue-50">
        + 팝업 추가
      </button>
    </div>
  );
}
