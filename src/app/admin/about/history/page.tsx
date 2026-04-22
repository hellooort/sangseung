"use client";

import { useState } from "react";

interface HistoryItem {
  id: number;
  month: string;
  textKo: string;
  textEn: string;
}

interface YearData {
  year: string;
  items: HistoryItem[];
}

const initialData: YearData[] = [
  {
    year: "2020",
    items: [
      { id: 1, month: "", textKo: "IT 스마트코리아 표창", textEn: "IT Smart Korea Award" },
      { id: 2, month: "", textKo: "기업부설연구소 설립", textEn: "Corporate R&D Center established" },
    ],
  },
  {
    year: "2019",
    items: [
      { id: 3, month: "", textKo: "양주 공장 설립", textEn: "Yangju Factory established" },
      { id: 4, month: "", textKo: "LED 전광판 KC 인증 획득", textEn: "Obtained LED display KC certification" },
    ],
  },
  {
    year: "2018",
    items: [
      { id: 5, month: "", textKo: "미디어시스템사업부 설립", textEn: "Media System Division established" },
      { id: 6, month: "", textKo: "우수기술기업 인증", textEn: "Certified as Excellent Technology Company" },
    ],
  },
  {
    year: "2008",
    items: [
      { id: 7, month: "", textKo: "소프트웨어사업자 신고", textEn: "Registered as a software business" },
    ],
  },
  {
    year: "2001",
    items: [
      { id: 8, month: "", textKo: "상승종합통신㈜ 설립", textEn: "Sangseung Co., Ltd. established" },
    ],
  },
];

export default function AdminHistoryPage() {
  const [data, setData] = useState<YearData[]>(initialData);
  const [newYear, setNewYear] = useState("");
  const [saved, setSaved] = useState(false);

  const addYear = () => {
    if (!newYear) return;
    if (data.find((d) => d.year === newYear)) return;
    setData([{ year: newYear, items: [] }, ...data].sort((a, b) => Number(b.year) - Number(a.year)));
    setNewYear("");
  };

  const removeYear = (year: string) => {
    if (confirm(`${year}년 항목을 모두 삭제하시겠습니까?`)) {
      setData(data.filter((d) => d.year !== year));
    }
  };

  const addItem = (year: string) => {
    setData(
      data.map((d) =>
        d.year === year
          ? { ...d, items: [...d.items, { id: Date.now(), month: "", textKo: "", textEn: "" }] }
          : d
      )
    );
  };

  const updateItem = (year: string, itemId: number, field: "month" | "textKo" | "textEn", value: string) => {
    setData(
      data.map((d) =>
        d.year === year
          ? {
              ...d,
              items: d.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : d
      )
    );
  };

  const removeItem = (year: string, itemId: number) => {
    setData(
      data.map((d) =>
        d.year === year ? { ...d, items: d.items.filter((item) => item.id !== itemId) } : d
      )
    );
  };

  const handleSave = () => {
    console.log("연혁 저장:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">연혁 관리</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 년도 추가 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="추가할 년도 (예: 2024)"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
          <button
            onClick={addYear}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            년도 추가
          </button>
        </div>
      </div>

      {/* 년도별 항목 */}
      <div className="space-y-4">
        {data.map((yearData) => (
          <div key={yearData.year} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{yearData.year}년</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addItem(yearData.year)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + 항목 추가
                </button>
                <button
                  onClick={() => removeYear(yearData.year)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium ml-3"
                >
                  년도 삭제
                </button>
              </div>
            </div>

            {yearData.items.length === 0 && (
              <p className="text-gray-400 text-sm py-4 text-center">항목이 없습니다. &quot;+ 항목 추가&quot;를 눌러 추가하세요.</p>
            )}

            <div className="space-y-3">
              {yearData.items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <input
                    type="text"
                    value={item.month}
                    onChange={(e) => updateItem(yearData.year, item.id, "month", e.target.value)}
                    placeholder="월"
                    className="w-16 px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.textKo}
                      onChange={(e) => updateItem(yearData.year, item.id, "textKo", e.target.value)}
                      placeholder="내용 (KO)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      value={item.textEn}
                      onChange={(e) => updateItem(yearData.year, item.id, "textEn", e.target.value)}
                      placeholder="Content (EN)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(yearData.year, item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
