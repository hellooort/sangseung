"use client";

import { useState } from "react";

interface PressRelease {
  id: number;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  contentKo: string;
  contentEn: string;
  thumbnail: string;
  date: string;
  externalLink: string;
}

const initialPress: PressRelease[] = [
  {
    id: 1,
    titleKo: "상승종합통신, 대형 LED 디스플레이 수주",
    titleEn: "Sangseung wins large LED display contract",
    summaryKo: "대형 쇼핑몰에 LED 디스플레이 공급",
    summaryEn: "LED display delivery to large shopping mall",
    contentKo: "",
    contentEn: "",
    thumbnail: "",
    date: "2024-03-15",
    externalLink: "",
  },
  {
    id: 2,
    titleKo: "해외 프로젝트 성공적 완료",
    titleEn: "Overseas project successfully completed",
    summaryKo: "동남아시아 5개국 통신공사 완료",
    summaryEn: "Integrated wiring project in 5 Southeast Asian countries",
    contentKo: "",
    contentEn: "",
    thumbnail: "",
    date: "2024-02-20",
    externalLink: "",
  },
];

export default function AdminPressPage() {
  const [items, setItems] = useState<PressRelease[]>(initialPress);
  const [saved, setSaved] = useState(false);

  const addItem = () => {
    setItems([
      { id: Date.now(), titleKo: "", titleEn: "", summaryKo: "", summaryEn: "", contentKo: "", contentEn: "", thumbnail: "", date: new Date().toISOString().split("T")[0], externalLink: "" },
      ...items,
    ]);
  };

  const updateItem = (id: number, field: keyof PressRelease, value: string) => {
    setItems(items.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const removeItem = (id: number) => {
    if (confirm("이 보도자료를 삭제하시겠습니까?")) {
      setItems(items.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    console.log("보도자료 저장:", items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">보도자료 관리</h1>
          <p className="text-sm text-gray-500 mt-1">언론에 노출된 기사 및 보도자료를 관리합니다.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addItem} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">
            + 보도자료 추가
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
            {saved ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((press) => (
          <div key={press.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">썸네일</label>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {press.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={press.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <label className="cursor-pointer text-center">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      <p className="text-xs text-gray-400">이미지 업로드</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  )}
                </div>
                <input type="date" value={press.date} onChange={(e) => updateItem(press.id, "date", e.target.value)} className="w-full mt-2 px-2 py-1.5 rounded border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="md:col-span-3 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={press.titleKo} onChange={(e) => updateItem(press.id, "titleKo", e.target.value)} placeholder="제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.titleEn} onChange={(e) => updateItem(press.id, "titleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.summaryKo} onChange={(e) => updateItem(press.id, "summaryKo", e.target.value)} placeholder="요약 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={press.summaryEn} onChange={(e) => updateItem(press.id, "summaryEn", e.target.value)} placeholder="Summary (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={press.contentKo} onChange={(e) => updateItem(press.id, "contentKo", e.target.value)} rows={3} placeholder="본문 내용 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={press.contentEn} onChange={(e) => updateItem(press.id, "contentEn", e.target.value)} rows={3} placeholder="Content (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input type="text" value={press.externalLink} onChange={(e) => updateItem(press.id, "externalLink", e.target.value)} placeholder="원문 기사 링크 (선택)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={() => removeItem(press.id)} className="text-red-500 hover:text-red-700 text-sm whitespace-nowrap">삭제</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">보도자료가 없습니다. 상단의 추가 버튼을 눌러주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}