"use client";

import { useState } from "react";

interface Category { id: number; name: string; }
interface ProjectRecord { id: number; name: string; categoryId: number; year: string; }

const initialCategories: Category[] = [
  { id: 1, name: "네트워크 구축" },
  { id: 2, name: "LED 전광판" },
  { id: 3, name: "CCTV/보안" },
];

const initialRecords: ProjectRecord[] = [
  { id: 1, name: "○○아파트 통합배선공사", categoryId: 1, year: "2024" },
  { id: 2, name: "△△빌딩 IBS 구축공사", categoryId: 1, year: "2023" },
  { id: 3, name: "□□경기장 LED 전광판 설치", categoryId: 2, year: "2023" },
  { id: 4, name: "◇◇공원 CCTV 설치공사", categoryId: 3, year: "2022" },
];

export default function AdminProjectsPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [records, setRecords] = useState<ProjectRecord[]>(initialRecords);
  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCatName.trim() }]);
    setNewCatName("");
  };
  const removeCategory = (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    setRecords(records.filter((r) => r.categoryId !== id));
  };
  const updateCategoryName = (id: number, name: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)));
  };
  const addRecord = () => {
    if (activeCategory === null) { alert("카테고리를 먼저 선택해주세요."); return; }
    setRecords([...records, { id: Date.now(), name: "", categoryId: activeCategory, year: "" }]);
  };
  const updateRecord = (id: number, field: keyof ProjectRecord, value: string | number) => {
    setRecords(records.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };
  const removeRecord = (id: number) => setRecords(records.filter((r) => r.id !== id));
  const filteredRecords = activeCategory !== null ? records.filter((r) => r.categoryId === activeCategory) : records;
  const handleSave = () => { console.log("공사실적 저장:", { categories, records }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">공사실적 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1 bg-gray-100 rounded-lg px-1">
              <input type="text" value={cat.name} onChange={(e) => updateCategoryName(cat.id, e.target.value)} className="px-2 py-1.5 bg-transparent text-sm text-gray-700 outline-none w-28" />
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
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{cat.name}</button>
        ))}
      </div>

      <button onClick={addRecord} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 실적 추가</button>

      {/* 테이블 형태 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">공사명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-32">카테고리</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-24">년도</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 w-16">삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2">
                  <input type="text" value={record.name} onChange={(e) => updateRecord(record.id, "name", e.target.value)} placeholder="공사명" className="w-full px-2 py-1.5 text-sm text-gray-900 outline-none border-b border-transparent focus:border-blue-500" />
                </td>
                <td className="px-4 py-2">
                  <select value={record.categoryId} onChange={(e) => updateRecord(record.id, "categoryId", Number(e.target.value))} className="text-sm text-gray-700 outline-none">
                    {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input type="text" value={record.year} onChange={(e) => updateRecord(record.id, "year", e.target.value)} placeholder="2024" className="w-full px-2 py-1.5 text-sm text-gray-900 outline-none border-b border-transparent focus:border-blue-500 text-center" />
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => removeRecord(record.id)} className="text-red-400 hover:text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
