"use client";

import { useState } from "react";
import Image from "next/image";
import { useTableList } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface WorkCategory {
  id: number;
  name_ko: string;
  name_en: string | null;
  sort_order: number;
}

interface WorkRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  title_en: string | null;
  subtitle_ko: string | null;
  subtitle_en: string | null;
  size: string | null;
  logo_url: string | null;
  image_url: string | null;
  extra_images: string[];
  sort_order: number;
}

export default function AdminWorksPage() {
  const cats = useTableList<WorkCategory>("work_categories", { orderBy: "sort_order" });
  const works = useTableList<WorkRow>("works", { orderBy: "sort_order" });

  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    await cats.insert({ name_ko: newCatName.trim(), name_en: "", sort_order: cats.items.length });
    setNewCatName("");
  };

  const removeCategory = async (id: number) => {
    if (!confirm("카테고리를 삭제하시겠습니까? (해당 카테고리에 속한 시공사례 연결도 해제됩니다)")) return;
    await cats.remove(id);
    await works.reload();
  };

  const updateCategoryName = (id: number, field: "name_ko" | "name_en", value: string) => {
    cats.setItems(cats.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addProject = async () => {
    const created = await works.insert({
      category_id: activeCategory ?? cats.items[0]?.id ?? null,
      title_ko: "새 프로젝트",
      title_en: "",
      subtitle_ko: "",
      subtitle_en: "",
      size: "",
      logo_url: "",
      image_url: "",
      extra_images: [],
      sort_order: works.items.length,
    });
    if (created) setEditingProject(created.id);
  };

  const updateProject = (id: number, field: keyof WorkRow, value: string | number | string[] | null) => {
    works.setItems(works.items.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleImageUpload = async (id: number, target: "logo" | "main" | "extra", e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingTarget(`${id}-${target}-${idx ?? ""}`);
    try {
      const url = await uploadImage(file, "works");
      const project = works.items.find((p) => p.id === id);
      if (!project) return;
      if (target === "logo") {
        updateProject(id, "logo_url", url);
        await works.update(id, { logo_url: url });
      } else if (target === "main") {
        updateProject(id, "image_url", url);
        await works.update(id, { image_url: url });
      } else {
        const next = [...(project.extra_images || [])];
        if (idx !== undefined) next[idx] = url;
        else next.push(url);
        updateProject(id, "extra_images", next);
        await works.update(id, { extra_images: next });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingTarget(null);
      e.target.value = "";
    }
  };

  const removeExtraImage = async (id: number, idx: number) => {
    const project = works.items.find((p) => p.id === id);
    if (!project) return;
    const next = (project.extra_images || []).filter((_, i) => i !== idx);
    updateProject(id, "extra_images", next);
    await works.update(id, { extra_images: next });
  };

  const filtered = activeCategory !== null ? works.items.filter((p) => p.category_id === activeCategory) : works.items;

  const saveAll = async () => {
    const catUpdates = cats.items.map((c) => cats.update(c.id, { name_ko: c.name_ko, name_en: c.name_en ?? "" }));
    const workUpdates = works.items.map((p) =>
      works.update(p.id, {
        category_id: p.category_id,
        title_ko: p.title_ko,
        title_en: p.title_en ?? "",
        subtitle_ko: p.subtitle_ko ?? "",
        subtitle_en: p.subtitle_en ?? "",
        size: p.size ?? "",
      }),
    );
    await Promise.all([...catUpdates, ...workUpdates]);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  if (cats.loading || works.loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">시공사례 관리</h1>
        <div className="flex items-center gap-3">
          {(cats.error || works.error) && <span className="text-red-500 text-sm">{cats.error || works.error}</span>}
          <button onClick={saveAll} disabled={cats.saving || works.saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {cats.saving || works.saving ? "저장 중..." : savedMsg ? "저장 완료!" : "전체 저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리</h2>
        <div className="space-y-2 mb-3">
          {cats.items.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.name_ko} onChange={(e) => updateCategoryName(cat.id, "name_ko", e.target.value)} placeholder="카테고리 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.name_en ?? ""} onChange={(e) => updateCategoryName(cat.id, "name_en", e.target.value)} placeholder="Category (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="새 카테고리명" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addCategory} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900">추가</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체 ({works.items.length})</button>
          {cats.items.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
              {cat.name_ko} ({works.items.filter((p) => p.category_id === cat.id).length})
            </button>
          ))}
        </div>
        <button onClick={addProject} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">+ 프로젝트 추가</button>
      </div>

      <div className="space-y-4">
        {filtered.map((project) => {
          const isEditing = editingProject === project.id;
          const extra = project.extra_images || [];
          return (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setEditingProject(isEditing ? null : project.id)}>
                <div className="flex items-center gap-4">
                  {project.image_url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={project.image_url} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{project.title_ko || "(제목 없음)"}</h3>
                    <p className="text-xs text-gray-500">{project.subtitle_ko} {project.size && `| ${project.size}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {cats.items.find((c) => c.id === project.category_id)?.name_ko || "-"}
                  </span>
                  <span className="text-xs text-gray-400">이미지 {1 + extra.length}장</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isEditing ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-gray-200 px-6 py-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">제목 (KO)</label>
                      <input type="text" value={project.title_ko} onChange={(e) => updateProject(project.id, "title_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
                      <input type="text" value={project.title_en ?? ""} onChange={(e) => updateProject(project.id, "title_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">소제목 (KO)</label>
                      <input type="text" value={project.subtitle_ko ?? ""} onChange={(e) => updateProject(project.id, "subtitle_ko", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (EN)</label>
                      <input type="text" value={project.subtitle_en ?? ""} onChange={(e) => updateProject(project.id, "subtitle_en", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">카테고리</label>
                      <select value={project.category_id ?? ""} onChange={(e) => updateProject(project.id, "category_id", e.target.value ? Number(e.target.value) : null)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 outline-none">
                        <option value="">선택</option>
                        {cats.items.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name_ko}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">SIZE</label>
                      <input type="text" value={project.size ?? ""} onChange={(e) => updateProject(project.id, "size", e.target.value)} placeholder="예: 3000 x 2000mm" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">로고 이미지</label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {project.logo_url ? (
                          <Image src={project.logo_url} alt="logo" fill className="object-contain p-1" unoptimized />
                        ) : (
                          <span className="text-xs text-gray-400">없음</span>
                        )}
                      </div>
                      <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                        {uploadingTarget === `${project.id}-logo-` ? "업로드중..." : "업로드"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(project.id, "logo", e)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">메인 이미지 (썸네일)</label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-28 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        {project.image_url ? (
                          <Image src={project.image_url} alt="" fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">없음</div>
                        )}
                      </div>
                      <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                        {uploadingTarget === `${project.id}-main-` ? "업로드중..." : "업로드/변경"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(project.id, "main", e)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-600">추가 이미지 ({extra.length}장)</label>
                      <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                        + 이미지 추가
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(project.id, "extra", e)} />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {extra.map((img, idx) => (
                        <div key={idx} className="relative group w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">
                          {img && <Image src={img} alt="" fill className="object-cover" unoptimized />}
                          <button onClick={() => removeExtraImage(project.id, idx)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            ×
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={() => { if (confirm("이 프로젝트를 삭제하시겠습니까?")) works.remove(project.id); }} className="text-red-500 hover:text-red-700 text-sm font-medium">
                      프로젝트 삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400 text-sm">
            등록된 시공사례가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}