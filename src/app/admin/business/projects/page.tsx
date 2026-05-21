"use client";

import { useState } from "react";
import { useTableList } from "@/lib/supabase/hooks";

interface Category {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

interface Record {
  id: number;
  category_id: number | null;
  name_ko: string;
  name_en: string | null;
  year: string | null;
  capacity: string | null;
  sort_order: number;
}

export default function AdminProjectsPage() {
  const cats = useTableList<Category>("project_record_categories", { orderBy: "sort_order" });
  const records = useTableList<Record>("project_records", { orderBy: "year", ascending: false });

  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    await cats.insert({ name_ko: newCatName.trim(), name_en: "", sort_order: cats.items.length });
    setNewCatName("");
  };

  const removeCategory = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await cats.remove(id);
    if (activeCategory === id) setActiveCategory(null);
    await records.reload();
  };

  const updateCatName = (id: number, field: "name_ko" | "name_en", value: string) => {
    cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addRecord = async () => {
    if (activeCategory === null) {
      alert("카테고리를 먼저 선택해주세요.");
      return;
    }
    await records.insert({
      category_id: activeCategory,
      name_ko: "",
      name_en: "",
      year: new Date().getFullYear().toString(),
      capacity: "",
      sort_order: records.items.length,
    });
  };

  const updateRecord = (id: number, patch: Partial<Record>) => {
    records.setItems(records.items.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  // 카테고리 변경 시 year를 카테고리명과 자동 동기화
  const handleCategoryChange = (id: number, catId: number | null) => {
    const selectedCat = cats.items.find((c) => c.id === catId);
    updateRecord(id, {
      category_id: catId,
      year: selectedCat ? selectedCat.name_ko : "",
    });
  };

  // 기존 전체 데이터의 year를 카테고리명으로 일괄 동기화
  const syncYearsFromCategory = () => {
    records.setItems(
      records.items.map((r) => {
        const cat = cats.items.find((c) => c.id === r.category_id);
        return cat ? { ...r, year: cat.name_ko } : r;
      }),
    );
  };

  const getCatName = (catId: number | null) =>
    cats.items.find((c) => c.id === catId)?.name_ko ?? "";

  const filtered = activeCategory !== null ? records.items.filter((r) => r.category_id === activeCategory) : records.items;

  const saveAll = async () => {
    const catUpdates = cats.items.map((c) => cats.update(c.id, { name_ko: c.name_ko, name_en: c.name_en ?? "" }));
    const recordUpdates = records.items.map((r) => {
      // 카테고리 이름이 곧 년도이므로 항상 카테고리명으로 동기화
      const catName = getCatName(r.category_id);
      return records.update(r.id, {
        category_id: r.category_id,
        name_ko: r.name_ko,
        name_en: r.name_en ?? "",
        year: catName || r.year || "",
        capacity: r.capacity && r.capacity !== "" ? r.capacity : null,
      });
    });
    const results = await Promise.all([...catUpdates, ...recordUpdates]);
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (cats.loading || records.loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">공사실적 관리</h1>
        <div className="flex items-center gap-3">
          {(cats.error || records.error) && <span className="text-red-500 text-sm">{cats.error || records.error}</span>}
          <button
            onClick={syncYearsFromCategory}
            className="bg-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600"
            title="카테고리명(년도)을 기준으로 모든 실적의 년도를 일괄 동기화합니다"
          >
            년도 일괄 동기화
          </button>
          <button onClick={saveAll} disabled={cats.saving || records.saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {cats.saving || records.saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리</h2>
        <div className="space-y-2 mb-3">
          {cats.items.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.name_ko} onChange={(e) => updateCatName(cat.id, "name_ko", e.target.value)} placeholder="카테고리 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.name_en ?? ""} onChange={(e) => updateCatName(cat.id, "name_en", e.target.value)} placeholder="Category (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
          전체 ({records.items.length})
        </button>
        {cats.items.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {cat.name_ko} ({records.items.filter((r) => r.category_id === cat.id).length})
          </button>
        ))}
      </div>

      <button onClick={addRecord} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 실적 추가</button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">공사명 (KO)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">공사명 (EN)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-32">카테고리</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-24">년도</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-32">공사 금액 (억)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 w-16">삭제</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2">
                  <input type="text" value={record.name_ko} onChange={(e) => updateRecord(record.id, { name_ko: e.target.value })} placeholder="공사명" className="w-full px-2 py-1.5 text-sm text-gray-900 outline-none border-b border-transparent focus:border-blue-500" />
                </td>
                <td className="px-4 py-2">
                  <input type="text" value={record.name_en ?? ""} onChange={(e) => updateRecord(record.id, { name_en: e.target.value })} placeholder="Project Name" className="w-full px-2 py-1.5 text-sm text-gray-900 outline-none border-b border-transparent focus:border-blue-500" />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={record.category_id ?? ""}
                    onChange={(e) => handleCategoryChange(record.id, e.target.value ? Number(e.target.value) : null)}
                    className="text-sm text-gray-700 outline-none"
                  >
                    <option value="">선택</option>
                    {cats.items.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name_ko}</option>))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={record.year ?? ""}
                      onChange={(e) => updateRecord(record.id, { year: e.target.value })}
                      placeholder="2024"
                      className={`w-full px-2 py-1.5 text-sm outline-none border-b focus:border-blue-500 text-center ${
                        record.year ? "text-gray-900 border-transparent" : "text-red-400 border-red-300"
                      }`}
                    />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={record.capacity ?? ""}
                      onChange={(e) => updateRecord(record.id, { capacity: e.target.value })}
                      placeholder="5"
                      className="w-full px-2 py-1.5 text-sm text-gray-900 outline-none border-b border-transparent focus:border-blue-500 text-right"
                    />
                    <span className="text-xs text-gray-500 whitespace-nowrap">억</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => { if (confirm("삭제하시겠습니까?")) records.remove(record.id); }} className="text-red-400 hover:text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">등록된 실적이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}