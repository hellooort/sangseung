"use client";

import { useState } from "react";
import Image from "next/image";
import { useTableList } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface Partner {
  id: number;
  name_ko: string;
  name_en: string | null;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
}

export default function AdminPartnersPage() {
  const { items, setItems, loading, saving, error, insert, update, remove, persistOrder } =
    useTableList<Partner>("partners", { orderBy: "sort_order" });
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const addPartner = async () => {
    await insert({
      name_ko: "새 파트너사",
      name_en: "",
      logo_url: "",
      website_url: "",
      sort_order: items.length,
    });
  };

  const move = (id: number, direction: "up" | "down") => {
    const idx = items.findIndex((p) => p.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === items.length - 1)) return;
    const next = [...items];
    const swap = direction === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setItems(next);
  };

  const localUpdate = (id: number, field: keyof Partner, value: string) => {
    setItems(items.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleLogoUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "partners");
      localUpdate(id, "logo_url", url);
      await update(id, { logo_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const saveAll = async () => {
    const results = await Promise.all(
      items.map((p, idx) =>
        update(p.id, {
          name_ko: p.name_ko,
          name_en: p.name_en ?? "",
          website_url: p.website_url ?? "",
          sort_order: idx,
        }),
      ),
    );
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">파트너사 관리</h1>
        <div className="flex gap-3 items-center">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={addPartner} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">
            + 파트너 추가
          </button>
          <button
            onClick={saveAll}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((partner, idx) => (
          <div key={partner.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <button onClick={() => move(partner.id, "up")} disabled={idx === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button onClick={() => move(partner.id, "down")} disabled={idx === items.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            <div className="relative w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {partner.logo_url ? (
                <Image src={partner.logo_url} alt="" fill className="object-contain p-2" unoptimized />
              ) : (
                <label className="cursor-pointer text-center">
                  <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs text-gray-400">{uploadingId === partner.id ? "업로드중" : "로고"}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(partner.id, e)} disabled={uploadingId === partner.id} />
                </label>
              )}
              {partner.logo_url && (
                <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                  변경
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(partner.id, e)} />
                </label>
              )}
            </div>
            <div className="w-24 text-center mt-1">
              <p className="text-[10px] text-gray-400">투명 배경 PNG 권장<br/>(예: 400 x 200px)</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" value={partner.name_ko} onChange={(e) => localUpdate(partner.id, "name_ko", e.target.value)} placeholder="파트너사 이름 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={partner.name_en ?? ""} onChange={(e) => localUpdate(partner.id, "name_en", e.target.value)} placeholder="Partner Name (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={partner.website_url ?? ""} onChange={(e) => localUpdate(partner.id, "website_url", e.target.value)} placeholder="https://..." className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button onClick={() => { if (confirm("삭제하시겠습니까?")) remove(partner.id); }} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
            등록된 파트너사가 없습니다. 우측 상단 &quot;+ 파트너 추가&quot; 버튼을 눌러보세요.
          </div>
        )}
      </div>
    </div>
  );
}