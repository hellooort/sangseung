"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTableList } from "@/lib/supabase/hooks";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";

import { ledCategorySlug } from "@/lib/led-categories";

// LED 카테고리 → URL slug (제품의 category_slug 동기화에 사용)
function getCategorySlug(cat: { id: number; name_ko: string; slug?: string | null }): string {
  return ledCategorySlug(cat);
}

interface Category {
  id: number;
  name_ko: string;
  name_en: string | null;
  slug: string | null;
  image_url: string | null;
  specs_ko: string | null;
  specs_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  sort_order: number;
}

interface Product {
  id: number;
  category_id: number | null;
  name: string;
  name_ko: string | null;
  name_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  specs: string | null;
  image_url: string | null;
  detail_url: string | null;
  slug: string | null;
  category_slug: string | null;
  sort_order: number;
}

export default function AdminProductsPage() {
  const cats = useTableList<Category>("product_categories", { orderBy: "sort_order" });
  const products = useTableList<Product>("products", { orderBy: "sort_order" });

  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [catUploadingId, setCatUploadingId] = useState<number | null>(null);

  // 제품 추가는 직접 supabase 호출로 처리해 에러 메시지를 즉시 사용자에게 표시.
  // useTableList.insert 는 에러 시 setError 만 호출하고 상태가 비동기로 갱신되어
  // 호출 직후 메시지를 띄우기 어렵기 때문.
  const addProduct = async () => {
    const sb = createClient();
    const catId = activeCategory ?? cats.items[0]?.id ?? null;
    const selectedCat = cats.items.find((c) => c.id === catId);
    const insertRow: Record<string, unknown> = {
      category_id: catId,
      name: "새 제품",
      name_ko: "새 제품",
      name_en: "",
      description_ko: "",
      description_en: "",
      specs: "",
      image_url: null,
      detail_url: null,
      slug: null,
      category_slug: selectedCat ? getCategorySlug(selectedCat) : null,
      sort_order: products.items.length,
    };

    const tryInsert = async (row: Record<string, unknown>) => {
      const { data, error } = await sb.from("products").insert(row).select().single();
      return { data, error };
    };

    let { data, error } = await tryInsert(insertRow);

    // 새 컬럼(name_ko/name_en/slug/category_slug)이 아직 마이그레이션 안 된 환경
    // 대비: 누락 컬럼을 빼고 한 번 더 시도.
    if (error && /column .* does not exist|Could not find the .* column/i.test(error.message)) {
      const fallback: Record<string, unknown> = { ...insertRow };
      ["name_ko", "name_en", "slug", "category_slug"].forEach((k) => delete fallback[k]);
      const retry = await tryInsert(fallback);
      data = retry.data;
      error = retry.error;
      if (!error) {
        alert(
          "제품은 추가되었지만 supabase 에 누락된 컬럼이 있습니다.\n" +
            "supabase/add-product-detail-columns.sql 을 한 번 적용해주세요.",
        );
      }
    }

    if (error) {
      alert(
        "제품 추가 실패\n\n" +
          error.message +
          "\n\n[해결 가이드]\n" +
          "1) supabase/add-product-detail-columns.sql 을 SQL Editor 에서 실행했는지 확인\n" +
          "2) 적용했다면 Supabase Dashboard → API → 'Reload schema cache'",
      );
      return;
    }

    if (data) {
      products.setItems([...products.items, data as Product]);
    }
  };

  const updateProduct = (id: number, field: keyof Product, value: string | number | null) => {
    products.setItems(products.items.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "products");
      updateProduct(id, "image_url", url);
      await products.update(id, { image_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const addCategory = async () => {
    const sb = createClient();
    const { data, error } = await sb
      .from("product_categories")
      .insert({ name_ko: "새 카테고리", name_en: "New Category", sort_order: cats.items.length })
      .select()
      .single();
    if (error) {
      alert("카테고리 추가 실패\n\n" + error.message);
      return;
    }
    if (data) cats.setItems([...cats.items, data as Category]);
  };

  const updateCategory = (id: number, field: keyof Category, value: string) => {
    cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleCategoryImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCatUploadingId(id);
    try {
      const url = await uploadImage(file, "products");
      cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, image_url: url } : c)));
      await cats.update(id, { image_url: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setCatUploadingId(null);
      e.target.value = "";
    }
  };

  // 카테고리 선택 시 category_slug 자동 입력 (이름→slug 매핑)
  const handleProductCategoryChange = (productId: number, catId: number | null) => {
    const cat = cats.items.find((c) => c.id === catId);
    products.setItems(
      products.items.map((p) =>
        p.id === productId
          ? { ...p, category_id: catId, category_slug: cat ? getCategorySlug(cat) : p.category_slug }
          : p,
      ),
    );
  };

  const removeCategory = async (id: number) => {
    const cat = cats.items.find((c) => c.id === id);
    if (!cat) return;
    const cnt = products.items.filter((p) => p.category_id === id).length;
    const msg = cnt > 0
      ? `"${cat.name_ko}" 카테고리에 속한 제품이 ${cnt}개 있습니다. 카테고리를 삭제하시겠습니까? (제품의 카테고리 연결만 해제됩니다)`
      : `"${cat.name_ko}" 카테고리를 삭제하시겠습니까?`;
    if (!confirm(msg)) return;
    await cats.remove(id);
    if (activeCategory === id) setActiveCategory(null);
    await products.reload();
  };

  const moveCategory = async (id: number, dir: -1 | 1) => {
    const idx = cats.items.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const target = idx + dir;
    if (target < 0 || target >= cats.items.length) return;
    const next = [...cats.items];
    [next[idx], next[target]] = [next[target], next[idx]];
    cats.setItems(next);
  };

  const filtered = activeCategory ? products.items.filter((p) => p.category_id === activeCategory) : products.items;

  const saveAll = async () => {
    const catUpdates = cats.items.map((c, idx) =>
      cats.update(c.id, {
        name_ko: c.name_ko,
        name_en: c.name_en ?? "",
        slug: ledCategorySlug(c),
        image_url: c.image_url ?? null,
        specs_ko: c.specs_ko ?? "",
        specs_en: c.specs_en ?? "",
        description_ko: c.description_ko ?? "",
        description_en: c.description_en ?? "",
        sort_order: idx,
      }),
    );
    const productUpdates = products.items.map((p) => {
      const cat = cats.items.find((c) => c.id === p.category_id);
      return products.update(p.id, {
        category_id: p.category_id,
        name: p.name_ko ?? p.name ?? "",
        name_ko: p.name_ko ?? p.name ?? "",
        name_en: p.name_en ?? "",
        description_ko: p.description_ko ?? "",
        description_en: p.description_en ?? "",
        specs: p.specs ?? "",
        detail_url: p.detail_url ?? "",
        // slug 없으면 id로 자동 생성
        slug: p.slug || String(p.id),
        // 카테고리 이름→slug 매핑으로 자동 동기화
        category_slug: cat ? getCategorySlug(cat) : p.category_slug || "",
      });
    });
    const results = await Promise.all([...catUpdates, ...productUpdates]);
    if (results.some((r) => r === false)) return;
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (cats.loading || products.loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">제품 라인업 관리</h1>
          <p className="text-sm text-gray-500 mt-1">LED 디스플레이 제품과 카테고리를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {(cats.error || products.error) && <span className="text-red-500 text-sm">{cats.error || products.error}</span>}
          <button onClick={saveAll} disabled={cats.saving || products.saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {cats.saving || products.saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 mb-3">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!activeCategory ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
          전체 ({products.items.length})
        </button>
        {cats.items.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {cat.name_ko} ({products.items.filter((p) => p.category_id === cat.id).length})
          </button>
        ))}
        <button onClick={() => setShowCategoryManager(!showCategoryManager)} className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800">
          {showCategoryManager ? "카테고리 닫기" : "카테고리 관리"}
        </button>
      </div>

      {showCategoryManager && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">카테고리 관리</h2>
            <button onClick={addCategory} className="text-blue-600 text-sm font-medium hover:underline">+ 카테고리 추가</button>
          </div>
          <div className="space-y-2">
            {cats.items.map((cat, idx) => (
              <div key={cat.id} className="border border-gray-100 rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button onClick={() => moveCategory(cat.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={() => moveCategory(cat.id, 1)} disabled={idx === cats.items.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                  <input type="text" value={cat.name_ko} onChange={(e) => updateCategory(cat.id, "name_ko", e.target.value)} placeholder="카테고리명 (KO)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={cat.name_en ?? ""} onChange={(e) => updateCategory(cat.id, "name_en", e.target.value)} placeholder="Name (EN)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-xs font-mono text-gray-400 w-24 text-center shrink-0" title="공개 URL: /business/led/{slug}">
                    /{getCategorySlug(cat)}
                  </span>
                  <span className="text-xs text-gray-400 w-12 text-right">
                    {products.items.filter((p) => p.category_id === cat.id).length}개
                  </span>
                  <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <div className="flex items-stretch gap-3 pl-8">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="relative w-24 aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {cat.image_url ? (
                        <>
                          <Image src={cat.image_url} alt="" fill className="object-cover" unoptimized />
                          <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                            변경
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleCategoryImageUpload(cat.id, e)} />
                          </label>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center px-2">
                          <span className="text-xs text-gray-400">{catUploadingId === cat.id ? "업로드중" : "카드 이미지"}</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleCategoryImageUpload(cat.id, e)} disabled={catUploadingId === cat.id} />
                        </label>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 text-center">세로형 권장 · 3:4<br/>(예: 600 x 800px)</span>
                  </div>
                  <textarea value={cat.specs_ko ?? ""} onChange={(e) => updateCategory(cat.id, "specs_ko", e.target.value)} rows={3} placeholder="카드 스펙 (KO) — 한 줄에 하나씩" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={cat.specs_en ?? ""} onChange={(e) => updateCategory(cat.id, "specs_en", e.target.value)} rows={3} placeholder="Card specs (EN) — one per line" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="pl-8">
                  <label className="text-[11px] font-medium text-gray-500 mb-1 block">카테고리 페이지 상단 설명 문구 (제목 밑)</label>
                  <div className="flex gap-3">
                    <textarea value={cat.description_ko ?? ""} onChange={(e) => updateCategory(cat.id, "description_ko", e.target.value)} rows={2} placeholder="설명 문구 (KO)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    <textarea value={cat.description_en ?? ""} onChange={(e) => updateCategory(cat.id, "description_en", e.target.value)} rows={2} placeholder="Description (EN)" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                </div>
              </div>
            ))}
            {cats.items.length === 0 && <p className="text-gray-400 text-sm text-center py-6">카테고리가 없습니다.</p>}
          </div>
        </div>
      )}

      <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mb-6">+ 제품 추가</button>

      <div className="space-y-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <>
                      <Image src={product.image_url} alt="" fill className="object-contain p-2" unoptimized />
                      <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                        변경
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(product.id, e)} />
                      </label>
                    </>
                  ) : (
                    <label className="cursor-pointer text-center">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-xs text-gray-400">{uploadingId === product.id ? "업로드중" : "이미지 업로드"}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(product.id, e)} disabled={uploadingId === product.id} />
                    </label>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">정방형 권장 (예: 600 x 600px)</span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" value={product.name_ko ?? product.name ?? ""} onChange={(e) => updateProduct(product.id, "name_ko", e.target.value)} placeholder="제품명 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={product.name_en ?? ""} onChange={(e) => updateProduct(product.id, "name_en", e.target.value)} placeholder="Product Name (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <select value={product.category_id ?? ""} onChange={(e) => handleProductCategoryChange(product.id, e.target.value ? Number(e.target.value) : null)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none">
                    <option value="">카테고리 선택</option>
                    {cats.items.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name_ko}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <textarea value={product.description_ko ?? ""} onChange={(e) => updateProduct(product.id, "description_ko", e.target.value)} placeholder="제품 설명 (KO)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={product.description_en ?? ""} onChange={(e) => updateProduct(product.id, "description_en", e.target.value)} placeholder="Description (EN)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" value={product.specs ?? ""} onChange={(e) => updateProduct(product.id, "specs", e.target.value)} placeholder="주요 스펙 (예: P0.93 / P1.25)" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {product.category_slug
                      ? `URL: /business/led/${product.category_slug}/${product.slug || product.id}`
                      : "카테고리를 선택하면 URL이 활성화됩니다"}
                  </span>
                  <Link
                    href={`/admin/business/products/${product.id}`}
                    className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-black"
                  >
                    상세 페이지 편집 →
                  </Link>
                </div>
              </div>

              <button onClick={() => { if (confirm("이 제품을 삭제하시겠습니까?")) products.remove(product.id); }} className="text-red-400 hover:text-red-600 self-start p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-10 bg-white rounded-xl border border-gray-200">해당 카테고리에 제품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}