"use client";

import { useState } from "react";

interface Category { id: number; nameKo: string; nameEn: string; }
interface OverseasItem { id: number; titleKo: string; titleEn: string; categoryId: number; image: string; }

const initialCategories: Category[] = [
  { id: 1, nameKo: "GUAM", nameEn: "Guam" },
  { id: 2, nameKo: "일본", nameEn: "Japan" },
  { id: 3, nameKo: "사이판", nameEn: "Saipan" },
  { id: 4, nameKo: "사우디아라비아", nameEn: "Saudi Arabia" },
  { id: 5, nameKo: "태국", nameEn: "Thailand" },
];

const initialItems: OverseasItem[] = [
  { id: 1, titleKo: "괌 호텔 네트워크 구축", titleEn: "Guam Hotel Network Infrastructure", categoryId: 1, image: "" },
  { id: 2, titleKo: "일본 LED 전광판 납품", titleEn: "Japan LED Display Delivery", categoryId: 2, image: "" },
];

export default function AdminOverseasPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [items, setItems] = useState<OverseasItem[]>(initialItems);
  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { id: Date.now(), nameKo: newCatName.trim(), nameEn: "" }]);
    setNewCatName("");
  };
  const removeCategory = (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    setItems(items.filter((i) => i.categoryId !== id));
  };
  const updateCategoryName = (id: number, field: "nameKo" | "nameEn", value: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };
  const addItem = () => {
    if (activeCategory === null) { alert("카테고리를 먼저 선택해주세요."); return; }
    setItems([...items, { id: Date.now(), titleKo: "", titleEn: "", categoryId: activeCategory, image: "" }]);
  };
  const updateItem = (id: number, field: keyof OverseasItem, value: string | number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const filteredItems = activeCategory !== null ? items.filter((i) => i.categoryId === activeCategory) : items;
  const handleSave = () => { console.log("해외 프로젝트 저장:", { categories, items }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">해외 프로젝트 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리 (국가/지역)</h2>
        <div className="space-y-2 mb-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.nameKo} onChange={(e) => updateCategoryName(cat.id, "nameKo", e.target.value)} placeholder="국가/지역 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.nameEn} onChange={(e) => updateCategoryName(cat.id, "nameEn", e.target.value)} placeholder="Country/Region (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="새 국가/지역명" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addCategory} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900">추가</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{cat.nameKo}</button>
        ))}
      </div>

      <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 항목 추가</button>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <label className="cursor-pointer text-center">
                  <svg className="w-6 h-6 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs text-gray-400">업로드</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="text" value={item.titleKo} onChange={(e) => updateItem(item.id, "titleKo", e.target.value)} placeholder="프로젝트 제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={item.titleEn} onChange={(e) => updateItem(item.id, "titleEn", e.target.value)} placeholder="Project Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <select value={item.categoryId} onChange={(e) => updateItem(item.id, "categoryId", Number(e.target.value))} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none">
                {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nameKo}</option>))}
              </select>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
