"use client";

import { useState } from "react";
import Image from "next/image";
import { useTableList, ListItem } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface CategoryRow extends ListItem {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

interface ItemRow extends ListItem {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  image_url: string | null;
  sort_order: number;
}

interface Props {
  pageTitle: string;
  catTable: string;
  itemTable: string;
  uploadFolder: string;
}

export default function CategoryItemAdmin({ pageTitle, catTable, itemTable, uploadFolder }: Props) {
  const cats = useTableList<CategoryRow>(catTable, { orderBy: "sort_order" });
  const items = useTableList<ItemRow>(itemTable, { orderBy: "sort_order" });

  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    await cats.insert({ name_ko: newCatName.trim(), name_en: "", sort_order: cats.items.length });
    setNewCatName("");
  };

  const removeCategory = async (id: number) => {
    if (!confirm("이 카테고리를 삭제하시겠습니까? (관련 항목 연결도 해제됩니다)")) return;
    await cats.remove(id);
    if (activeCategory === id) setActiveCategory(null);
    await items.reload();
  };

  const updateCatName = (id: number, field: "name_ko" | "name_en", value: string) => {
    cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addItem = async () => {
    if (activeCategory === null) {
      alert("카테고리를 먼저 선택해주세요.");
      return;
    }
    await items.insert({
      category_id: activeCategory,
      title_ko: "새 항목",
      title_en: "",
      image_url: "",
      sort_order: items.items.length,
    });
  };

  const updateItem = (id: number, field: keyof ItemRow, value: string | number | null) => {
    items.setItems(items.items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, uploadFolder);
      updateItem(id, "image_url", url);
      await items.update(id, { image_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const filtered = activeCategory !== null ? items.items.filter((i) => i.category_id === activeCategory) : items.items;

  const saveAll = async () => {
    const catUpdates = cats.items.map((c) => cats.update(c.id, { name_ko: c.name_ko, name_en: c.name_en ?? "" }));
    const itemUpdates = items.items.map((i) =>
      items.update(i.id, {
        category_id: i.category_id,
        title_ko: i.title_ko,
        title_en: i.title_en ?? "",
      }),
    );
    const results = await Promise.all([...catUpdates, ...itemUpdates]);
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (cats.loading || items.loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <div className="flex items-center gap-3">
          {(cats.error || items.error) && <span className="text-red-500 text-sm">{cats.error || items.error}</span>}
          <button onClick={saveAll} disabled={cats.saving || items.saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {cats.saving || items.saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리</h2>
        <div className="space-y-2 mb-3">
          {cats.items.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.name_ko} onChange={(e) => updateCatName(cat.id, "name_ko", e.target.value)} placeholder="카테고리명 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.name_en ?? ""} onChange={(e) => updateCatName(cat.id, "name_en", e.target.value)} placeholder="Category (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="새 카테고리명" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addCategory} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900">추가</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
          전체 ({items.items.length})
        </button>
        {cats.items.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {cat.name_ko} ({items.items.filter((i) => i.category_id === cat.id).length})
          </button>
        ))}
      </div>

      <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">
        + 항목 추가
      </button>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
              {item.image_url ? (
                <>
                  <Image src={item.image_url} alt="" fill className="object-cover" unoptimized />
                  <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                    변경
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} />
                  </label>
                </>
              ) : (
                <label className="cursor-pointer text-center">
                  <svg className="w-6 h-6 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs text-gray-400">{uploadingId === item.id ? "업로드중" : "업로드"}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} disabled={uploadingId === item.id} />
                </label>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="text" value={item.title_ko} onChange={(e) => updateItem(item.id, "title_ko", e.target.value)} placeholder="제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={item.title_en ?? ""} onChange={(e) => updateItem(item.id, "title_en", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <select value={item.category_id ?? ""} onChange={(e) => updateItem(item.id, "category_id", e.target.value ? Number(e.target.value) : null)} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none">
                <option value="">카테고리 선택</option>
                {cats.items.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name_ko}</option>))}
              </select>
            </div>
            <button onClick={() => { if (confirm("삭제하시겠습니까?")) items.remove(item.id); }} className="text-red-400 hover:text-red-600 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
            등록된 항목이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}