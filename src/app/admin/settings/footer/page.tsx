"use client";

import { useState } from "react";

interface OfficeInfo {
  id: number;
  nameKo: string;
  nameEn: string;
  addressKo: string;
  addressEn: string;
  tel: string;
  fax: string;
}

export default function AdminFooterPage() {
  const [companyName, setCompanyName] = useState("상승종합통신㈜");
  const [companyNameEn, setCompanyNameEn] = useState("SANGSEUNG Co., Ltd.");
  const [copyright, setCopyright] = useState("© 2025 상승종합통신㈜. All Rights Reserved.");
  const [copyrightEn, setCopyrightEn] = useState("© 2025 SANGSEUNG Co., Ltd. All Rights Reserved.");

  const [offices, setOffices] = useState<OfficeInfo[]>([
    { id: 1, nameKo: "본사", nameEn: "Head Office", addressKo: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호", addressEn: "#903, Hanwha Biz Metro 2, 551-24 Yangcheon-ro, Gangseo-gu, Seoul", tel: "02-953-0056", fax: "02-953-0118" },
    { id: 2, nameKo: "미디어시스템사업부", nameEn: "Media System Division", addressKo: "경기도 구리시 갈매순환로 154 현대테라타워지식산업센터 A동 1040호", addressEn: "#1040, Hyundai Terra Tower, 154 Galmaesunhwan-ro, Guri, Gyeonggi-do", tel: "031-512-0110", fax: "031-512-0120" },
    { id: 3, nameKo: "양주공장", nameEn: "Yangju Factory", addressKo: "경기도 양주시 율정로 20 양주옥정메타엑스 지식산업센터 514, 515호", addressEn: "#514-515, Yangju Okjeong MetaX Knowledge Industrial Center, 20 Yuljeong-ro, Yangju, Gyeonggi-do", tel: "031-512-0110", fax: "031-512-0120" },
  ]);

  const [saved, setSaved] = useState(false);

  const updateOffice = (id: number, field: keyof OfficeInfo, value: string) => {
    setOffices(offices.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const handleSave = () => {
    console.log("푸터 저장:", { companyName, companyNameEn, copyright, copyrightEn, offices });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">푸터 정보 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">회사명 (한국어)</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">회사명 (English)</label>
            <input type="text" value={companyNameEn} onChange={(e) => setCompanyNameEn(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">저작권 문구 (KO)</label>
            <input type="text" value={copyright} onChange={(e) => setCopyright(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Copyright (EN)</label>
            <input type="text" value={copyrightEn} onChange={(e) => setCopyrightEn(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* 사무실 정보 */}
      <div className="space-y-4">
        {offices.map((office) => (
          <div key={office.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">사무실명 (KO)</label>
                <input type="text" value={office.nameKo} onChange={(e) => updateOffice(office.id, "nameKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Office Name (EN)</label>
                <input type="text" value={office.nameEn} onChange={(e) => updateOffice(office.id, "nameEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">주소 (KO)</label>
                <input type="text" value={office.addressKo} onChange={(e) => updateOffice(office.id, "addressKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address (EN)</label>
                <input type="text" value={office.addressEn} onChange={(e) => updateOffice(office.id, "addressEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">전화번호</label>
                <input type="text" value={office.tel} onChange={(e) => updateOffice(office.id, "tel", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">팩스번호</label>
                <input type="text" value={office.fax} onChange={(e) => updateOffice(office.id, "fax", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
