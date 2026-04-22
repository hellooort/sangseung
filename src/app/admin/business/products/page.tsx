"use client";

import { useState } from "react";

interface Product {
  id: number;
  category: string;
  name: string;
  descriptionKo: string;
  descriptionEn: string;
  specs: string;
  image: string;
}

interface Category {
  id: number;
  nameKo: string;
  nameEn: string;
}

const initialProducts: Product[] = [
  { id: 1, category: "COB LED", name: "LFlex", descriptionKo: "COB 기술이 적용된 고화질 플렉시블 LED 디스플레이", descriptionEn: "High-quality flexible LED display with COB technology", specs: "P0.93 / P1.25 / P1.56", image: "/image/LFlex/LFlex_01.jpg" },
  { id: 2, category: "COB LED", name: "SCO-Wall Series", descriptionKo: "프리미엄 COB 패키징 기술의 고급형 LED 월", descriptionEn: "Premium LED wall with advanced COB packaging technology", specs: "P0.78 / P0.93 / P1.25", image: "/image/SCO-Wall/1-1.png" },
  { id: 3, category: "INDOOR FIXED", name: "S-Wall Series", descriptionKo: "고화질 실내용 LED 디스플레이", descriptionEn: "High-quality indoor LED display", specs: "P1.2 ~ P4", image: "/image/S-Wall/2.jpg" },
  { id: 4, category: "OUTDOOR FIXED", name: "SOD Series", descriptionKo: "고휘도 실외용 LED 디스플레이", descriptionEn: "High-brightness outdoor LED display", specs: "P4 ~ P16", image: "/image/SOD-C/SOD-C_main_img_sample.jpg" },
  { id: 5, category: "AD SIGN", name: "AD Sign", descriptionKo: "클라우드 기반 LED 광고 사이니지", descriptionEn: "Cloud-based LED advertising signage", specs: "P3.91", image: "/image/AD Cloud/AD Cloud_main.jpg" },
];

const initialCategories: Category[] = [
  { id: 1, nameKo: "COB LED", nameEn: "COB LED" },
  { id: 2, nameKo: "INDOOR FIXED", nameEn: "Indoor Fixed" },
  { id: 3, nameKo: "OUTDOOR FIXED", nameEn: "Outdoor Fixed" },
  { id: 4, nameKo: "RENTAL", nameEn: "Rental" },
  { id: 5, nameKo: "MEDIA FACADE", nameEn: "Media Facade" },
  { id: 6, nameKo: "AD SIGN", nameEn: "Ad Sign" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [saved, setSaved] = useState(false);

  const categoryOptions = categories.map((c) => c.nameKo);

  // 제품 CRUD
  const addProduct = () => {
    setProducts([...products, { id: Date.now(), category: activeCategory || categoryOptions[0] || "", name: "", descriptionKo: "", descriptionEn: "", specs: "", image: "" }]);
  };

  const updateProduct = (id: number, field: keyof Product, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProduct = (id: number) => {
    if (confirm("이 제품을 삭제하시겠습니까?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // 카테고리 CRUD
  const addCategory = () => {
    const newId = Date.now();
    setCategories([...categories, { id: newId, nameKo: "새 카테고리", nameEn: "New Category" }]);
  };

  const updateCategory = (id: number, field: keyof Category, value: string) => {
    const prev = categories.find((c) => c.id === id);
    const next = categories.map((c) => (c.id === id ? { ...c, [field]: value } : c));
    setCategories(next);
    if (prev && field === "nameKo" && value !== prev.nameKo) {
      setProducts(products.map((p) => (p.category === prev.nameKo ? { ...p, category: value } : p)));
      if (activeCategory === prev.nameKo) {
        setActiveCategory(value);
      }
    }
  };

  const removeCategory = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const productsInCategory = products.filter((p) => p.category === cat.nameKo).length;
    const message =
      productsInCategory > 0
        ? `"${cat.nameKo}" 카테고리에 속한 제품이 ${productsInCategory}개 있습니다. 카테고리를 삭제하시겠습니까? (제품은 삭제되지 않고 카테고리만 비워집니다)`
        : `"${cat.nameKo}" 카테고리를 삭제하시겠습니까?`;
    if (confirm(message)) {
      setCategories(categories.filter((c) => c.id !== id));
      setProducts(products.map((p) => (p.category === cat.nameKo ? { ...p, category: "" } : p)));
      if (activeCategory === cat.nameKo) setActiveCategory(null);
    }
  };

  const moveCategory = (id: number, dir: -1 | 1) => {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const target = idx + dir;
    if (target < 0 || target >= categories.length) return;
    const next = [...categories];
    [next[idx], next[target]] = [next[target], next[idx]];
    setCategories(next);
  };

  const filteredProducts = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  const handleSave = () => {
    console.log("제품 저장:", { products, categories });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">제품 라인업 관리</h1>
          <p className="text-sm text-gray-500 mt-1">LED 디스플레이 제품과 카테고리를 관리합니다.</p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!activeCategory ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.nameKo)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.nameKo ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {cat.nameKo}
          </button>
        ))}
        <button
          onClick={() => setShowCategoryManager(!showCategoryManager)}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
        >
          {showCategoryManager ? "카테고리 닫기" : "카테고리 관리"}
        </button>
      </div>

      {/* 카테고리 관리 패널 */}
      {showCategoryManager && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">카테고리 관리</h2>
            <button onClick={addCategory} className="text-blue-600 text-sm font-medium hover:underline">+ 카테고리 추가</button>
          </div>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={cat.id} className="flex items-center gap-2 border border-gray-100 rounded-lg p-3">
                <div className="flex flex-col">
                  <button onClick={() => moveCategory(cat.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveCategory(cat.id, 1)} disabled={idx === categories.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={cat.nameKo}
                  onChange={(e) => updateCategory(cat.id, "nameKo", e.target.value)}
                  placeholder="카테고리명 (KO)"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={cat.nameEn}
                  onChange={(e) => updateCategory(cat.id, "nameEn", e.target.value)}
                  placeholder="Name (EN)"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-400 w-16 text-right">
                  {products.filter((p) => p.category === cat.nameKo).length}개 제품
                </span>
                <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-6">카테고리가 없습니다.</p>
            )}
          </div>
        </div>
      )}

      <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 제품 추가</button>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex gap-6">
              {/* 이미지 */}
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image} alt="" className="w-full h-full object-contain p-2" />
                ) : (
                  <label className="cursor-pointer text-center">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs text-gray-400">이미지 업로드</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                )}
              </div>

              {/* 정보 */}
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} placeholder="제품명" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <select value={product.category} onChange={(e) => updateProduct(product.id, "category", e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none">
                    <option value="">카테고리 선택</option>
                    {categoryOptions.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <textarea value={product.descriptionKo} onChange={(e) => updateProduct(product.id, "descriptionKo", e.target.value)} placeholder="제품 설명 (KO)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={product.descriptionEn} onChange={(e) => updateProduct(product.id, "descriptionEn", e.target.value)} placeholder="Description (EN)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <input type="text" value={product.specs} onChange={(e) => updateProduct(product.id, "specs", e.target.value)} placeholder="주요 스펙 (예: P0.93 / P1.25 / P1.56)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <button onClick={() => removeProduct(product.id)} className="text-red-400 hover:text-red-600 self-start p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-10 bg-white rounded-xl border border-gray-200">해당 카테고리에 제품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
