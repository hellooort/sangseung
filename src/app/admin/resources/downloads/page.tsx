"use client";

import { useState } from "react";
import { useTableList } from "@/lib/supabase/hooks";
import { uploadFile, formatFileSize } from "@/lib/supabase/storage";
import StorageUsage from "@/components/admin/StorageUsage";

interface ResourceRow {
  id: number;
  title_ko: string;
  title_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  sort_order: number;
  created_at?: string;
}

export default function AdminDownloadsPage() {
  const { items, setItems, loading, saving, error, insert, update, remove } = useTableList<ResourceRow>(
    "resources",
    { orderBy: "sort_order" },
  );
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const localUpdate = (id: number, field: keyof ResourceRow, value: string | number) => {
    setItems(items.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addItem = async () => {
    await insert({
      title_ko: "새 자료",
      title_en: "",
      description_ko: "",
      description_en: "",
      file_url: "",
      file_name: "",
      file_size: 0,
      sort_order: items.length,
    });
  };

  const handleFileUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const result = await uploadFile(file, "downloads");
      const patch = { file_url: result.url, file_name: result.name, file_size: result.size };
      setItems(items.map((r) => (r.id === id ? { ...r, ...patch } : r)));
      await update(id, patch);
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
          description_ko: r.description_ko ?? "",
          description_en: r.description_en ?? "",
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자료실 관리</h1>
          <p className="text-sm text-gray-500 mt-1">다운로드 가능한 카탈로그 및 문서를 관리합니다.</p>
        </div>
        <div className="flex gap-3 items-center">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={addItem} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">
            + 자료 추가
          </button>
          <button onClick={saveAll} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <StorageUsage />

      <div className="space-y-4">
        {items.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={resource.title_ko} onChange={(e) => localUpdate(resource.id, "title_ko", e.target.value)} placeholder="자료 제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={resource.title_en ?? ""} onChange={(e) => localUpdate(resource.id, "title_en", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <textarea value={resource.description_ko ?? ""} onChange={(e) => localUpdate(resource.id, "description_ko", e.target.value)} placeholder="간단 설명 (KO)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={resource.description_en ?? ""} onChange={(e) => localUpdate(resource.id, "description_en", e.target.value)} placeholder="Description (EN)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  {resource.file_url ? (
                    <div>
                      <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-700 font-medium truncate">{resource.file_name}</p>
                      <p className="text-xs text-gray-400">{resource.file_size ? formatFileSize(resource.file_size) : ""}</p>
                      <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 inline-block">
                        다운로드 링크
                      </a>
                      <label className="block mt-2 text-xs text-blue-600 cursor-pointer hover:underline">
                        파일 변경
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(resource.id, e)} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-blue-600">{uploadingId === resource.id ? "업로드 중..." : "파일 업로드"}</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, ZIP 등</p>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(resource.id, e)} disabled={uploadingId === resource.id} />
                    </label>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{resource.created_at?.split("T")[0]}</span>
                  <button onClick={() => { if (confirm("이 자료를 삭제하시겠습니까?")) remove(resource.id); }} className="text-red-500 hover:text-red-700 text-sm">삭제</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
            자료가 없습니다. 상단의 추가 버튼을 눌러주세요.
          </div>
        )}
      </div>
    </div>
  );
}