"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface OfficeInfo {
  id: number;
  nameKo: string;
  nameEn: string;
  addressKo: string;
  addressEn: string;
  tel: string;
  fax: string;
}

interface FooterData {
  companyName: string;
  companyNameEn: string;
  copyright: string;
  copyrightEn: string;
  offices: OfficeInfo[];
}

const defaultFooter: FooterData = {
  companyName: "상승종합통신㈜",
  companyNameEn: "SANGSEUNG Co., Ltd.",
  copyright: "© 2025 상승종합통신㈜. All Rights Reserved.",
  copyrightEn: "© 2025 SANGSEUNG Co., Ltd. All Rights Reserved.",
  offices: [
    { id: 1, nameKo: "본사", nameEn: "Head Office", addressKo: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호", addressEn: "#903, Hanwha Biz Metro 2, 551-24 Yangcheon-ro, Gangseo-gu, Seoul", tel: "02-953-0056", fax: "02-953-0118" },
    { id: 2, nameKo: "미디어시스템사업부", nameEn: "Media System Division", addressKo: "경기도 구리시 갈매순환로 154 현대테라타워지식산업센터 A동 1040호", addressEn: "#1040, Hyundai Terra Tower, 154 Galmaesunhwan-ro, Guri, Gyeonggi-do", tel: "031-512-0110", fax: "031-512-0120" },
    { id: 3, nameKo: "양주공장", nameEn: "Yangju Factory", addressKo: "경기도 양주시 율정로 20 양주옥정메타엑스 지식산업센터 514, 515호", addressEn: "#514-515, Yangju Okjeong MetaX Knowledge Industrial Center, 20 Yuljeong-ro, Yangju, Gyeonggi-do", tel: "031-512-0110", fax: "031-512-0120" },
  ],
};

// DB 의 footer JSON 이 과거 형식(예: offices 누락, 구버전 키 사용 등) 으로
// 저장돼 있어도 안전하게 화면이 뜨도록 정규화한다.
function normalizeFooter(raw: unknown, fb: FooterData): FooterData {
  const r = (raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {}) as Partial<FooterData> & Record<string, unknown>;
  const officesRaw = Array.isArray(r.offices) ? (r.offices as unknown[]) : fb.offices;
  const offices: OfficeInfo[] = officesRaw.map((o, i) => {
    const oo = (o && typeof o === "object" ? (o as Record<string, unknown>) : {}) as Partial<OfficeInfo>;
    return {
      id: typeof oo.id === "number" ? oo.id : i + 1,
      nameKo:    typeof oo.nameKo    === "string" ? oo.nameKo    : "",
      nameEn:    typeof oo.nameEn    === "string" ? oo.nameEn    : "",
      addressKo: typeof oo.addressKo === "string" ? oo.addressKo : "",
      addressEn: typeof oo.addressEn === "string" ? oo.addressEn : "",
      tel:       typeof oo.tel       === "string" ? oo.tel       : "",
      fax:       typeof oo.fax       === "string" ? oo.fax       : "",
    };
  });
  return {
    companyName:   typeof r.companyName   === "string" ? r.companyName   : fb.companyName,
    companyNameEn: typeof r.companyNameEn === "string" ? r.companyNameEn : fb.companyNameEn,
    copyright:     typeof r.copyright     === "string" ? r.copyright     : fb.copyright,
    copyrightEn:   typeof r.copyrightEn   === "string" ? r.copyrightEn   : fb.copyrightEn,
    offices,
  };
}

export default function AdminFooterPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<FooterData>(
    "footer",
    defaultFooter,
    { normalize: normalizeFooter },
  );
  const [savedMsg, setSavedMsg] = useState(false);

  const updateOffice = (id: number, field: keyof OfficeInfo, fieldVal: string) => {
    setValue({
      ...value,
      offices: value.offices.map((o) => (o.id === id ? { ...o, [field]: fieldVal } : o)),
    });
  };

  const addOffice = () => {
    const newId = Math.max(0, ...value.offices.map((o) => o.id)) + 1;
    setValue({
      ...value,
      offices: [
        ...value.offices,
        { id: newId, nameKo: "", nameEn: "", addressKo: "", addressEn: "", tel: "", fax: "" },
      ],
    });
  };

  const removeOffice = (id: number) => {
    if (!confirm("이 사무소 정보를 삭제하시겠습니까?")) return;
    setValue({ ...value, offices: value.offices.filter((o) => o.id !== id) });
  };

  const handleSave = async () => {
    const ok = await save();
    if (ok) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-sm">로딩 중...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">푸터 정보 관리</h1>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">회사명 (한국어)</label>
            <input type="text" value={value.companyName} onChange={(e) => setValue({ ...value, companyName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">회사명 (English)</label>
            <input type="text" value={value.companyNameEn} onChange={(e) => setValue({ ...value, companyNameEn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">저작권 문구 (KO)</label>
            <input type="text" value={value.copyright} onChange={(e) => setValue({ ...value, copyright: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Copyright (EN)</label>
            <input type="text" value={value.copyrightEn} onChange={(e) => setValue({ ...value, copyrightEn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">사무소 정보</h2>
        <button onClick={addOffice} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900">
          + 사무소 추가
        </button>
      </div>

      <div className="space-y-4">
        {value.offices.map((office) => (
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
            <div className="mt-3 text-right">
              <button onClick={() => removeOffice(office.id)} className="text-red-500 text-sm hover:underline">
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}