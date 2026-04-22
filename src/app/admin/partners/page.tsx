"use client";

import { useState } from "react";

interface Partner {
  id: number;
  nameKo: string;
  nameEn: string;
  logo: string;
  link: string;
  sortOrder: number;
}

const initialPartners: Partner[] = [
  { id: 1, nameKo: "삼성전자", nameEn: "Samsung Electronics", logo: "", link: "https://samsung.com", sortOrder: 1 },
  { id: 2, nameKo: "LG전자", nameEn: "LG Electronics", logo: "", link: "https://lg.com", sortOrder: 2 },
  { id: 3, nameKo: "한국전력", nameEn: "KEPCO", logo: "", link: "https://kepco.co.kr", sortOrder: 3 },
  { id: 4, nameKo: "현대건설", nameEn: "Hyundai E&C", logo: "", link: "https://hdec.kr", sortOrder: 4 },
];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [saved, setSaved] = useState(false);

  const addPartner = () => {
    setPartners([...partners, { id: Date.now(), nameKo: "", nameEn: "", logo: "", link: "", sortOrder: partners.length + 1 }]);
  };

  const updatePartner = (id: number, field: keyof Partner, value: string | number) => {
    setPartners(partners.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removePartner = (id: number) => {
    if (confirm("삭제하시겠습니까?")) {
      setPartners(partners.filter((p) => p.id !== id));
    }
  };

  const movePartner = (id: number, direction: "up" | "down") => {
    const idx = partners.findIndex((p) => p.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === partners.length - 1)) return;
    const newPartners = [...partners];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newPartners[idx], newPartners[swapIdx]] = [newPartners[swapIdx], newPartners[idx]];
    setPartners(newPartners);
  };

  const handleSave = () => {
    console.log("파트너사 저장:", partners);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">파트너사 관리</h1>
        <div className="flex gap-3">
          <button onClick={addPartner} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">+ 파트너 추가</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
            {saved ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {partners.map((partner, idx) => (
          <div key={partner.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            {/* 순서 조절 */}
            <div className="flex flex-col gap-1">
              <button onClick={() => movePartner(partner.id, "up")} disabled={idx === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button onClick={() => movePartner(partner.id, "down")} disabled={idx === partners.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            {/* 로고 */}
            <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {partner.logo ? (
                <img src={partner.logo} alt="" className="max-w-full max-h-full object-contain p-2" />
              ) : (
                <label className="cursor-pointer text-center">
                  <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs text-gray-400">로고</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" value={partner.nameKo} onChange={(e) => updatePartner(partner.id, "nameKo", e.target.value)} placeholder="파트너사 이름 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={partner.nameEn} onChange={(e) => updatePartner(partner.id, "nameEn", e.target.value)} placeholder="Partner Name (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={partner.link} onChange={(e) => updatePartner(partner.id, "link", e.target.value)} placeholder="https://..." className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button onClick={() => removePartner(partner.id)} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
