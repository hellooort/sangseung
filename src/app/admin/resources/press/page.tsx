"use client";

import { useState } from "react";
import Image from "next/image";
import { useTableList } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface PressRow {
  id: number;
  title_ko: string;
  title_en: string | null;
  summary_ko: string | null;
  summary_en: string | null;
  content_ko: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
  external_link: string | null;
  published_at: string | null;
  sort_order: number;
}

export default function AdminPressPage() {
  const { items, setItems, loading, saving, error, insert, update, remove } = useTableList<PressRow>(
    "press_releases",
    { orderBy: "published_at", ascending: false },
  );
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const localUpdate = (id: number, field: keyof PressRow, value: string) => {
    setItems(items.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addItem = async () => {
    await insert({
      title_ko: "새 보도자료",
      title_en: "",
      summary_ko: "",
      summary_en: "",
      content_ko: "",
      content_en: "",
      thumbnail_url: "",
      external_link: "",
      published_at: new Date().toISOString().split("T")[0],
      sort_order: items.length,
    });
  };

  const handleThumbnailUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "press");
      localUpdate(id, "thumbnail_url", url);
      await update(id, { thumbnail_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const saveAll = async () => {
    const results = await Promise.all(
      items.map((r) =>
        update(r.id, {
          title_ko: r.title_ko,
          title_en: r.title_en ?? "",
          summary_ko: r.summary_ko ?? "",
          summary_en: r.summary_en ?? "",
          content_ko: r.content_ko ?? "",
          content_en: r.content_en ?? "",
          external_link: r.external_link ?? "",
          published_at: r.published_at,
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">보도자료 관리</h1>
          <p className="text-sm text-gray-500 mt-1">언론에 노출된 기사 및 보도자료를 관리합니다.</p>
        </div>
        <div className="flex gap-3 items-center">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={addItem} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">
            + 보도자료 추가
          </button>
          <button onClick={saveAll} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((press) => (
          <div key={press.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">썸네일</label>
                <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {press.thumbnail_url ? (
                    <Image src={press.thumbnail_url} alt="" fill className="object-cover" unoptimized />
                  ) : (
                    <label className="cursor-pointer text-center">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      <p className="text-xs text-gray-400">{uploadingId === press.id ? "업로드중..." : "이미지 업로드"}</p>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleThumbnailUpload(press.id, e)} disabled={uploadingId === press.id} />
                    </label>
                  )}
                  {press.thumbnail_url && (
                    <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                      변경
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleThumbnailUpload(press.id, e)} />
                    </label>
                  )}
                </div>
                <input type="date" value={press.published_at ?? ""} onChange={(e) => localUpdate(press.id, "published_at", e.target.value)} className="w-full mt-2 px-2 py-1.5 rounded border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="md:col-span-3 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={press.title_ko} onChange={(e) => localUpdate(press.id, "title_ko", e.target.value)} placeholder="제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.title_en ?? ""} onChange={(e) => localUpdate(press.id, "title_en", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.summary_ko ?? ""} onChange={(e) => localUpdate(press.id, "summary_ko", e.target.value)} placeholder="요약 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.summary_en ?? ""} onChange={(e) => localUpdate(press.id, "summary_en", e.target.value)} placeholder="Summary (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={press.content_ko ?? ""} onChange={(e) => localUpdate(press.id, "content_ko", e.target.value)} rows={3} placeholder="본문 내용 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={press.content_en ?? ""} onChange={(e) => localUpdate(press.id, "content_en", e.target.value)} rows={3} placeholder="Content (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input type="text" value={press.external_link ?? ""} onChange={(e) => localUpdate(press.id, "external_link", e.target.value)} placeholder="원문 기사 링크 (선택)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={() => { if (confirm("이 보도자료를 삭제하시겠습니까?")) remove(press.id); }} className="text-red-500 hover:text-red-700 text-sm whitespace-nowrap">삭제</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
            보도자료가 없습니다. 상단의 추가 버튼을 눌러주세요.
          </div>
        )}
      </div>
    </div>
  );
}