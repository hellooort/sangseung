"use client";

import { useState } from "react";
import Image from "next/image";

interface Category {
  id: number;
  nameKo: string;
  nameEn: string;
}

interface Certificate {
  id: number;
  titleKo: string;
  titleEn: string;
  categoryId: number;
  image: string;
}

const initialCategories: Category[] = [
  { id: 1, nameKo: "품질", nameEn: "Quality" },
  { id: 2, nameKo: "인증", nameEn: "Certification" },
  { id: 3, nameKo: "표창", nameEn: "Award" },
  { id: 4, nameKo: "등록", nameEn: "Registration" },
  { id: 5, nameKo: "생산", nameEn: "Production" },
  { id: 6, nameKo: "특허", nameEn: "Patent" },
];

const initialCerts: Certificate[] = [
  { id: 1, titleKo: "ISO 14001 인증서", titleEn: "ISO 14001 Certificate", categoryId: 1, image: "/image/cert/cert_1.jpg" },
  { id: 2, titleKo: "ISO 45001 인증서", titleEn: "ISO 45001 Certificate", categoryId: 1, image: "/image/cert/cert_2.jpg" },
  { id: 3, titleKo: "ISO 9001 인증서", titleEn: "ISO 9001 Certificate", categoryId: 1, image: "/image/cert/cert_3.jpg" },
  { id: 4, titleKo: "LED 모듈 KC 인증서 P1.25mm", titleEn: "LED Module KC Certificate P1.25mm", categoryId: 2, image: "/image/cert/cert_4.jpg" },
  { id: 5, titleKo: "LED 모듈 KC 인증서 P2.5mm", titleEn: "LED Module KC Certificate P2.5mm", categoryId: 2, image: "/image/cert/cert_5.jpg" },
  { id: 6, titleKo: "경영혁신형 중소기업 확인서", titleEn: "Innovative SME Certificate", categoryId: 2, image: "/image/cert/cert_9.jpg" },
  { id: 7, titleKo: "대한민국커뮤니티 표창장", titleEn: "Korea Community Award", categoryId: 3, image: "/image/cert/cert_10.png" },
  { id: 8, titleKo: "중소벤처기업부장관 표창장", titleEn: "Minister of SMEs Award", categoryId: 3, image: "/image/cert/cert_18.jpg" },
  { id: 9, titleKo: "특허증 - 클라우드 전광판", titleEn: "Patent - Cloud Display", categoryId: 6, image: "/image/cert/cert_27.jpg" },
];

export default function AdminCertificatesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [certs, setCerts] = useState<Certificate[]>(initialCerts);
  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { id: Date.now(), nameKo: newCatName.trim(), nameEn: "" }]);
    setNewCatName("");
  };

  const removeCategory = (id: number) => {
    const catCerts = certs.filter((c) => c.categoryId === id);
    if (catCerts.length > 0 && !confirm("이 카테고리에 속한 인증서도 함께 삭제됩니다. 계속하시겠습니까?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    setCerts(certs.filter((c) => c.categoryId !== id));
    if (activeCategory === id) setActiveCategory(null);
  };

  const updateCategoryName = (id: number, field: "nameKo" | "nameEn", value: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addCert = () => {
    if (activeCategory === null) {
      alert("카테고리를 먼저 선택해주세요.");
      return;
    }
    setCerts([
      ...certs,
      { id: Date.now(), titleKo: "", titleEn: "", categoryId: activeCategory, image: "" },
    ]);
  };

  const updateCert = (id: number, field: keyof Certificate, value: string | number) => {
    setCerts(certs.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const removeCert = (id: number) => {
    setCerts(certs.filter((c) => c.id !== id));
  };

  const filteredCerts = activeCategory !== null ? certs.filter((c) => c.categoryId === activeCategory) : certs;

  const handleSave = () => {
    console.log("인증서 저장:", { categories, certs });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">인증서 관리</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 카테고리 관리 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">카테고리 관리</h2>
        <div className="space-y-2 mb-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input
                type="text"
                value={cat.nameKo}
                onChange={(e) => updateCategoryName(cat.id, "nameKo", e.target.value)}
                placeholder="카테고리명 (KO)"
                className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={cat.nameEn}
                onChange={(e) => updateCategoryName(cat.id, "nameEn", e.target.value)}
                placeholder="Category Name (EN)"
                className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeCategory(cat.id)}
                className="text-red-400 hover:text-red-600 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="새 카테고리명"
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            추가
          </button>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          전체 ({certs.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat.nameKo} ({certs.filter((c) => c.categoryId === cat.id).length})
          </button>
        ))}
      </div>

      {/* 인증서 추가 */}
      <div className="mb-6">
        <button
          onClick={addCert}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + 인증서 추가
        </button>
      </div>

      {/* 인증서 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* 이미지 */}
            <div className="aspect-[3/4] bg-gray-100 relative flex items-center justify-center">
              {cert.image ? (
                <Image src={cert.image} alt={cert.titleKo} fill className="object-contain p-2" />
              ) : (
                <div className="text-center">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <label className="text-blue-600 text-xs cursor-pointer hover:underline">
                    이미지 업로드
                    <input type="file" className="hidden" accept="image/*" onChange={() => {}} />
                  </label>
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="p-4 space-y-3">
              <input
                type="text"
                value={cert.titleKo}
                onChange={(e) => updateCert(cert.id, "titleKo", e.target.value)}
                placeholder="인증서 이름 (KO)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={cert.titleEn}
                onChange={(e) => updateCert(cert.id, "titleEn", e.target.value)}
                placeholder="Certificate Name (EN)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={cert.categoryId}
                onChange={(e) => updateCert(cert.id, "categoryId", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameKo}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeCert(cert.id)}
                className="w-full text-red-500 hover:text-red-700 text-sm py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
