"use client";

import { useState } from "react";
import { useTableList } from "@/lib/supabase/hooks";

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number; roadAddress?: string | null }> {
  const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "주소 검색 실패");
  return data;
}

interface Office {
  id: number;
  name_ko: string;
  name_en: string | null;
  address_ko: string | null;
  address_en: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  map_embed_url: string | null;
  lat: number | null;
  lng: number | null;
  sort_order: number;
}

export default function AdminLocationsPage() {
  const { items, setItems, loading, saving, error, insert, update, remove } = useTableList<Office>(
    "office_locations",
    { orderBy: "sort_order" },
  );
  const [savedMsg, setSavedMsg] = useState(false);
  const [geocodingId, setGeocodingId] = useState<number | null>(null);

  const localUpdate = (id: number, field: keyof Office, value: string | number | null) => {
    setItems(items.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const lookupCoords = async (id: number) => {
    const office = items.find((o) => o.id === id);
    if (!office) return;
    const addr = (office.address_ko ?? "").trim();
    if (!addr) {
      alert("먼저 주소(KO) 를 입력하세요.");
      return;
    }
    setGeocodingId(id);
    try {
      const { lat, lng } = await geocodeAddress(addr);
      setItems((prev) =>
        prev.map((o) => (o.id === id ? { ...o, lat, lng } : o)),
      );
      // 좌표만 즉시 DB 저장 (사용자가 별도 저장 안 눌러도 반영)
      await update(id, { lat, lng });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGeocodingId(null);
    }
  };

  const localUpdateNumeric = (id: number, field: "lat" | "lng", raw: string) => {
    if (raw.trim() === "") {
      localUpdate(id, field, null);
      return;
    }
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    localUpdate(id, field, num);
  };

  const addOffice = async () => {
    await insert({
      name_ko: "새 사무실",
      name_en: "",
      address_ko: "",
      address_en: "",
      phone: "",
      fax: "",
      email: "",
      map_embed_url: "",
      lat: null,
      lng: null,
      sort_order: items.length,
    });
  };

  const saveAll = async () => {
    const results = await Promise.all(
      items.map((o, idx) =>
        update(o.id, {
          name_ko: o.name_ko,
          name_en: o.name_en ?? "",
          address_ko: o.address_ko ?? "",
          address_en: o.address_en ?? "",
          phone: o.phone ?? "",
          fax: o.fax ?? "",
          email: o.email ?? "",
          map_embed_url: o.map_embed_url ?? "",
          lat: o.lat,
          lng: o.lng,
          sort_order: idx,
        }),
      ),
    );
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">오시는 길 관리</h1>
        <div className="flex gap-3 items-center">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={addOffice} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">
            + 사무실 추가
          </button>
          <button
            onClick={saveAll}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((office) => (
          <div key={office.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-3 flex-1">
                <input type="text" value={office.name_ko} onChange={(e) => localUpdate(office.id, "name_ko", e.target.value)} placeholder="사무실 이름 (KO)" className="text-lg font-semibold text-gray-900 outline-none border-b border-gray-200 focus:border-blue-500 pb-1" />
                <input type="text" value={office.name_en ?? ""} onChange={(e) => localUpdate(office.id, "name_en", e.target.value)} placeholder="Office Name (EN)" className="text-lg font-semibold text-gray-700 outline-none border-b border-gray-200 focus:border-blue-500 pb-1" />
              </div>
              <button onClick={() => { if (confirm("이 사무실 정보를 삭제하시겠습니까?")) remove(office.id); }} className="text-red-500 hover:text-red-700 text-sm ml-3">
                삭제
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">주소 (KO)</label>
                <textarea value={office.address_ko ?? ""} onChange={(e) => localUpdate(office.id, "address_ko", e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address (EN)</label>
                <textarea value={office.address_en ?? ""} onChange={(e) => localUpdate(office.id, "address_en", e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">전화번호</label>
                  <input type="text" value={office.phone ?? ""} onChange={(e) => localUpdate(office.id, "phone", e.target.value)} placeholder="02-000-0000" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">팩스번호</label>
                  <input type="text" value={office.fax ?? ""} onChange={(e) => localUpdate(office.id, "fax", e.target.value)} placeholder="02-000-0000" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
                <input type="text" value={office.email ?? ""} onChange={(e) => localUpdate(office.id, "email", e.target.value)} placeholder="info@example.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">위도 (Latitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={office.lat ?? ""}
                    onChange={(e) => localUpdateNumeric(office.id, "lat", e.target.value)}
                    placeholder="37.5454"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">경도 (Longitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={office.lng ?? ""}
                    onChange={(e) => localUpdateNumeric(office.id, "lng", e.target.value)}
                    placeholder="126.8516"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => lookupCoords(office.id)}
                  disabled={geocodingId === office.id}
                  className="h-[42px] px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 whitespace-nowrap"
                  title="주소(KO)를 NAVER Geocoding 으로 변환해 좌표 자동 입력"
                >
                  {geocodingId === office.id ? "검색 중..." : "주소로 좌표 검색"}
                </button>
                <p className="sm:col-span-3 text-xs text-gray-500 -mt-1">
                  주소(KO) 입력 후 <b>주소로 좌표 검색</b> 버튼을 누르면 자동으로 위·경도가 채워지고 즉시 DB 에 저장됩니다.
                  (필요 시 수동으로 미세 조정 가능)
                </p>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
            등록된 사무실이 없습니다. 우측 상단 &quot;+ 사무실 추가&quot; 버튼을 눌러보세요.
          </div>
        )}
      </div>
    </div>
  );
}
