"use client";

import { useState } from "react";

interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  specs: string;
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, category: "COB LED", name: "LFlex", description: "COB 기술이 적용된 고화질 플렉시블 LED 디스플레이", specs: "P0.93 / P1.25 / P1.56", image: "/image/LFlex/LFlex_01.jpg" },
  { id: 2, category: "COB LED", name: "SCO-Wall Series", description: "프리미엄 COB 패키징 기술의 고급형 LED 월", specs: "P0.78 / P0.93 / P1.25", image: "/image/SCO-Wall/1-1.png" },
  { id: 3, category: "INDOOR FIXED", name: "S-Wall Series", description: "고화질 실내용 LED 디스플레이", specs: "P1.2 ~ P4", image: "/image/S-Wall/2.jpg" },
  { id: 4, category: "OUTDOOR FIXED", name: "SOD Series", description: "고휘도 실외용 LED 디스플레이", specs: "P4 ~ P16", image: "/image/SOD-C/SOD-C_main_img_sample.jpg" },
  { id: 5, category: "AD SIGN", name: "AD Sign", description: "클라우드 기반 LED 광고 사이니지", specs: "P3.91", image: "/image/AD Cloud/AD Cloud_main.jpg" },
];

const categoryOptions = ["COB LED", "INDOOR FIXED", "OUTDOOR FIXED", "RENTAL", "MEDIA FACADE", "AD SIGN"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), category: activeCategory || categoryOptions[0], name: "", description: "", specs: "", image: "" }]);
  };

  const updateProduct = (id: number, field: keyof Product, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProduct = (id: number) => {
    if (confirm("이 제품을 삭제하시겠습니까?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  const handleSave = () => {
    console.log("제품 저장:", products);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">제품 라인업 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!activeCategory ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체</button>
        {categoryOptions.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{cat}</button>
        ))}
      </div>

      <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 제품 추가</button>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex gap-6">
              {/* 이미지 */}
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {product.image ? (
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
                    {categoryOptions.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>
                <textarea value={product.description} onChange={(e) => updateProduct(product.id, "description", e.target.value)} placeholder="제품 설명" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                <input type="text" value={product.specs} onChange={(e) => updateProduct(product.id, "specs", e.target.value)} placeholder="주요 스펙 (예: P0.93 / P1.25 / P1.56)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <button onClick={() => removeProduct(product.id)} className="text-red-400 hover:text-red-600 self-start p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
