"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface HistoryRow {
  id: number;
  year: string;
  month: string | null;
  text_ko: string;
  text_en: string | null;
  sort_order: number;
}

const supabase = createClient();

export default function AdminHistoryPage() {
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [newYear, setNewYear] = useState("");

  const reload = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("histories")
      .select("*")
      .order("year", { ascending: false })
      .order("sort_order", { ascending: true });
    if (error) setError(error.message);
    else setRows((data ?? []) as HistoryRow[]);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, HistoryRow[]>();
    rows.forEach((r) => {
      const arr = map.get(r.year) ?? [];
      arr.push(r);
      map.set(r.year, arr);
    });
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [rows]);

  const addYear = async () => {
    if (!newYear) return;
    const { data, error } = await supabase
      .from("histories")
      .insert({ year: newYear, text_ko: "", text_en: "", month: "", sort_order: 0 })
      .select()
      .single();
    if (error) {
      setError(error.message);
      return;
    }
    setRows((prev) => [...prev, data as HistoryRow]);
    setNewYear("");
  };

  const removeYear = async (year: string) => {
    if (!confirm(`${year}년 항목을 모두 삭제하시겠습니까?`)) return;
    const { error } = await supabase.from("histories").delete().eq("year", year);
    if (error) {
      setError(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r.year !== year));
  };

  const addItem = async (year: string) => {
    const yearItems = rows.filter((r) => r.year === year);
    const nextOrder = yearItems.length;
    const { data, error } = await supabase
      .from("histories")
      .insert({ year, month: "", text_ko: "", text_en: "", sort_order: nextOrder })
      .select()
      .single();
    if (error) {
      setError(error.message);
      return;
    }
    setRows((prev) => [...prev, data as HistoryRow]);
  };

  const updateItem = (id: number, patch: Partial<HistoryRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeItem = async (id: number) => {
    if (!confirm("이 항목을 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("histories").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    const updates = rows.map((r) =>
      supabase
        .from("histories")
        .update({
          year: r.year,
          month: r.month ?? "",
          text_ko: r.text_ko,
          text_en: r.text_en ?? "",
          sort_order: r.sort_order,
        })
        .eq("id", r.id),
    );
    const results = await Promise.all(updates);
    setSaving(false);
    const firstError = results.find((res) => res.error);
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">연혁 관리</h1>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            onClick={saveAll}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="추가할 년도 (예: 2024)"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          <button
            onClick={addYear}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
          >
            년도 추가
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          항목 변경 후 우측 상단 &quot;전체 저장&quot; 버튼을 눌러야 DB에 반영됩니다. (추가/삭제는 즉시 반영)
        </p>
      </div>

      <div className="space-y-4">
        {grouped.map(([year, items]) => (
          <div key={year} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{year}년</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => addItem(year)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + 항목 추가
                </button>
                <button onClick={() => removeYear(year)} className="text-red-500 hover:text-red-700 text-sm font-medium ml-3">
                  년도 삭제
                </button>
              </div>
            </div>

            {items.length === 0 && (
              <p className="text-gray-400 text-sm py-4 text-center">항목이 없습니다.</p>
            )}

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <input
                    type="text"
                    value={item.month ?? ""}
                    onChange={(e) => updateItem(item.id, { month: e.target.value })}
                    placeholder="월"
                    className="w-16 px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.text_ko}
                      onChange={(e) => updateItem(item.id, { text_ko: e.target.value })}
                      placeholder="내용 (KO)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={item.text_en ?? ""}
                      onChange={(e) => updateItem(item.id, { text_en: e.target.value })}
                      placeholder="Content (EN)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {grouped.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-400">등록된 연혁이 없습니다. 위에서 년도를 추가해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}