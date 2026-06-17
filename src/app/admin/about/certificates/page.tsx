"use client";

import { useState } from "react";
import Image from "next/image";
import { useTableList } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface Category {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

interface Cert {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export default function AdminCertificatesPage() {
  const cats = useTableList<Category>("certificate_categories", { orderBy: "sort_order" });
  const certs = useTableList<Cert>("certificates", { orderBy: "sort_order" });

  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    await cats.insert({ name_ko: newCatName.trim(), name_en: "", sort_order: cats.items.length });
    setNewCatName("");
  };

  const removeCategory = async (id: number) => {
    const owned = certs.items.filter((c) => c.category_id === id);
    if (owned.length > 0 && !confirm("이 카테고리에 속한 인증서 연결도 함께 해제됩니다. 계속하시겠습니까?")) return;
    await cats.remove(id);
    if (activeCategory === id) setActiveCategory(null);
    await certs.reload();
  };

  const updateCategoryName = (id: number, field: "name_ko" | "name_en", value: string) => {
    cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addCert = async () => {
    if (activeCategory === null) {
      alert("카테고리를 먼저 선택해주세요.");
      return;
    }
    await certs.insert({
      category_id: activeCategory,
      title_ko: "새 인증서",
      title_en: "",
      image_url: "",
      sort_order: certs.items.length,
    });
  };

  const updateCert = (id: number, field: keyof Cert, value: string | number | null) => {
    certs.setItems(certs.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "certificates");
      updateCert(id, "image_url", url);
      await certs.update(id, { image_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const filteredCerts =
    activeCategory !== null ? certs.items.filter((c) => c.category_id === activeCategory) : certs.items;

  const saveAll = async () => {
    const catUpdates = cats.items.map((c) =>
      cats.update(c.id, { name_ko: c.name_ko, name_en: c.name_en ?? "" }),
    );
    const certUpdates = certs.items.map((c) =>
      certs.update(c.id, {
        category_id: c.category_id,
        title_ko: c.title_ko,
        title_en: c.title_en ?? "",
      }),
    );
    const results = await Promise.all([...catUpdates, ...certUpdates]);
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (cats.loading || certs.loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">인증서 관리</h1>
        <div className="flex items-center gap-3">
          {(cats.error || certs.error) && (
            <span className="text-red-500 text-sm">{cats.error || certs.error}</span>
          )}
          <button
            onClick={saveAll}
            disabled={cats.saving || certs.saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {cats.saving || certs.saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">카테고리 관리</h2>
        <div className="space-y-2 mb-4">
          {cats.items.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.name_ko} onChange={(e) => updateCategoryName(cat.id, "name_ko", e.target.value)} placeholder="카테고리명 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.name_en ?? ""} onChange={(e) => updateCategoryName(cat.id, "name_en", e.target.value)} placeholder="Category Name (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="새 카테고리명" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addCategory} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900">
            추가
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
          전체 ({certs.items.length})
        </button>
        {cats.items.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            {cat.name_ko} ({certs.items.filter((c) => c.category_id === cat.id).length})
          </button>
        ))}
      </div>

      <div className="mb-6">
        <button onClick={addCert} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
          + 인증서 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 relative flex items-center justify-center">
              {cert.image_url ? (
                <>
                  <Image src={cert.image_url} alt={cert.title_ko} fill className="object-contain p-2" unoptimized />
                  <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                    변경
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(cert.id, e)} />
                  </label>
                </>
              ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <label className="text-blue-600 text-xs cursor-pointer hover:underline">
                      {uploadingId === cert.id ? "업로드중..." : "이미지 업로드"}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(cert.id, e)} disabled={uploadingId === cert.id} />
                    </label>
                    <p className="text-[10px] text-gray-400 mt-1">세로형 이미지 권장<br/>(예: 600 x 840px)</p>
                  </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <input type="text" value={cert.title_ko} onChange={(e) => updateCert(cert.id, "title_ko", e.target.value)} placeholder="인증서 이름 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cert.title_en ?? ""} onChange={(e) => updateCert(cert.id, "title_en", e.target.value)} placeholder="Certificate Name (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={cert.category_id ?? ""} onChange={(e) => updateCert(cert.id, "category_id", e.target.value ? Number(e.target.value) : null)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">카테고리 선택</option>
                {cats.items.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_ko}</option>
                ))}
              </select>
              <button onClick={() => { if (confirm("삭제하시겠습니까?")) certs.remove(cert.id); }} className="w-full text-red-500 hover:text-red-700 text-sm py-2 border border-red-200 rounded-lg hover:bg-red-50">
                삭제
              </button>
            </div>
          </div>
        ))}

        {filteredCerts.length === 0 && (
          <div className="col-span-full bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
            등록된 인증서가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}