"use client";

import { useState } from "react";

interface Office {
  id: number;
  name: string;
  address: string;
  tel: string;
  fax: string;
  mapUrl: string;
}

const initialOffices: Office[] = [
  {
    id: 1,
    name: "본사",
    address: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호",
    tel: "02-953-0056",
    fax: "02-953-0118",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!...",
  },
  {
    id: 2,
    name: "미디어시스템사업부",
    address: "경기도 구리시 갈매순환로166번길 46 금강펜테리움IX타워 제5층 020, 021호",
    tel: "031-512-0110",
    fax: "031-512-0120",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!...",
  },
  {
    id: 3,
    name: "양주공장",
    address: "경기도 양주시 율정로 20(옥정동) 양주옥정메타엑스 지식산업센터 514,515호",
    tel: "031-512-0110",
    fax: "031-512-0120",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!...",
  },
];

export default function AdminLocationsPage() {
  const [offices, setOffices] = useState<Office[]>(initialOffices);
  const [saved, setSaved] = useState(false);

  const updateOffice = (id: number, field: keyof Office, value: string) => {
    setOffices(offices.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const addOffice = () => {
    setOffices([...offices, { id: Date.now(), name: "", address: "", tel: "", fax: "", mapUrl: "" }]);
  };

  const removeOffice = (id: number) => {
    if (confirm("이 사무실 정보를 삭제하시겠습니까?")) {
      setOffices(offices.filter((o) => o.id !== id));
    }
  };

  const handleSave = () => {
    console.log("오시는 길 저장:", offices);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">오시는 길 관리</h1>
        <div className="flex gap-3">
          <button
            onClick={addOffice}
            className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            + 사무실 추가
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {saved ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {offices.map((office) => (
          <div key={office.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={office.name}
                onChange={(e) => updateOffice(office.id, "name", e.target.value)}
                placeholder="사무실 이름 (예: 본사)"
                className="text-lg font-semibold text-gray-900 outline-none border-b border-transparent focus:border-blue-500 transition-colors pb-1"
              />
              <button
                onClick={() => removeOffice(office.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                삭제
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">주소</label>
                <textarea
                  value={office.address}
                  onChange={(e) => updateOffice(office.id, "address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">전화번호</label>
                  <input
                    type="text"
                    value={office.tel}
                    onChange={(e) => updateOffice(office.id, "tel", e.target.value)}
                    placeholder="02-000-0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">팩스번호</label>
                  <input
                    type="text"
                    value={office.fax}
                    onChange={(e) => updateOffice(office.id, "fax", e.target.value)}
                    placeholder="02-000-0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Google 지도 Embed URL</label>
                <input
                  type="text"
                  value={office.mapUrl}
                  onChange={(e) => updateOffice(office.id, "mapUrl", e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
