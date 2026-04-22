"use client";

import { useState } from "react";

interface WorkCategory { id: number; nameKo: string; nameEn: string; }
interface WorkProject {
  id: number;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  categoryId: number;
  size: string;
  logo: string;
  images: string[];
}

const initialCategories: WorkCategory[] = [
  { id: 1, nameKo: "INDOOR", nameEn: "Indoor" },
  { id: 2, nameKo: "OUTDOOR", nameEn: "Outdoor" },
  { id: 3, nameKo: "MEDIA FACADE", nameEn: "Media Facade" },
  { id: 4, nameKo: "RENTAL", nameEn: "Rental" },
];

const initialProjects: WorkProject[] = [
  { id: 1, titleKo: "LH 컨퍼런스 LED 포스터", titleEn: "LH Conference LED Poster", subtitleKo: "S-Poster P2.5mm", subtitleEn: "S-Poster P2.5mm", categoryId: 1, size: "1000 x 500mm", logo: "", images: ["/image/reference/work_1.jpg"] },
  { id: 2, titleKo: "씨아이씨소프트 스튜디오 LED 스크린", titleEn: "CIC Soft Studio LED Screen", subtitleKo: "S-Wall P1.875mm", subtitleEn: "S-Wall P1.875mm", categoryId: 1, size: "3000 x 2000mm", logo: "", images: ["/image/reference/work_2.jpg"] },
  { id: 3, titleKo: "삼성전자 옥외 LED 전광판", titleEn: "Samsung Outdoor LED Display", subtitleKo: "SOD-C P6mm", subtitleEn: "SOD-C P6mm", categoryId: 2, size: "12000 x 6000mm", logo: "", images: ["/image/reference/work_3.jpg", "/image/reference/work_4.jpg"] },
];

export default function AdminWorksPage() {
  const [categories, setCategories] = useState<WorkCategory[]>(initialCategories);
  const [projects, setProjects] = useState<WorkProject[]>(initialProjects);
  const [newCatName, setNewCatName] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([...categories, { id: Date.now(), nameKo: newCatName.trim(), nameEn: "" }]);
    setNewCatName("");
  };
  const removeCategory = (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    setProjects(projects.filter((p) => p.categoryId !== id));
  };
  const updateCategoryName = (id: number, field: "nameKo" | "nameEn", value: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addProject = () => {
    const newProject: WorkProject = {
      id: Date.now(),
      titleKo: "",
      titleEn: "",
      subtitleKo: "",
      subtitleEn: "",
      categoryId: activeCategory || categories[0]?.id || 0,
      size: "",
      logo: "",
      images: [],
    };
    setProjects([newProject, ...projects]);
    setEditingProject(newProject.id);
  };

  const updateProject = (id: number, field: keyof WorkProject, value: string | number | string[]) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProject = (id: number) => {
    if (confirm("이 프로젝트를 삭제하시겠습니까?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const addImageToProject = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    // TODO: 실제 업로드 로직
    updateProject(id, "images", [...project.images, ""]);
  };

  const removeImageFromProject = (projectId: number, imageIndex: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, "images", project.images.filter((_, i) => i !== imageIndex));
  };

  const filteredProjects = activeCategory !== null ? projects.filter((p) => p.categoryId === activeCategory) : projects;

  const handleSave = () => {
    console.log("시공사례 저장:", { categories, projects });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">시공사례 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 카테고리 관리 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">카테고리 관리</h2>
        <div className="space-y-2 mb-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
              <input type="text" value={cat.nameKo} onChange={(e) => updateCategoryName(cat.id, "nameKo", e.target.value)} placeholder="카테고리 (KO)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={cat.nameEn} onChange={(e) => updateCategoryName(cat.id, "nameEn", e.target.value)} placeholder="Category (EN)" className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
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

      {/* 필터 + 추가 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>전체 ({projects.length})</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
              {cat.nameKo} ({projects.filter((p) => p.categoryId === cat.id).length})
            </button>
          ))}
        </div>
        <button onClick={addProject} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">+ 프로젝트 추가</button>
      </div>

      {/* 프로젝트 목록 */}
      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const isEditing = editingProject === project.id;
          return (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* 헤더 */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setEditingProject(isEditing ? null : project.id)}
              >
                <div className="flex items-center gap-4">
                  {project.images[0] ? (
                    <img src={project.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{project.titleKo || "(제목 없음)"}</h3>
                    <p className="text-xs text-gray-500">{project.subtitleKo} {project.size && `| ${project.size}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {categories.find((c) => c.id === project.categoryId)?.nameKo || "-"}
                  </span>
                  <span className="text-xs text-gray-400">이미지 {project.images.length}장</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isEditing ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* 편집 영역 */}
              {isEditing && (
                <div className="border-t border-gray-200 px-6 py-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">제목 (KO)</label>
                      <input type="text" value={project.titleKo} onChange={(e) => updateProject(project.id, "titleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
                      <input type="text" value={project.titleEn} onChange={(e) => updateProject(project.id, "titleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">소제목 (KO)</label>
                      <input type="text" value={project.subtitleKo} onChange={(e) => updateProject(project.id, "subtitleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (EN)</label>
                      <input type="text" value={project.subtitleEn} onChange={(e) => updateProject(project.id, "subtitleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">카테고리</label>
                      <select value={project.categoryId} onChange={(e) => updateProject(project.id, "categoryId", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 outline-none">
                        {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.nameKo}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">SIZE</label>
                      <input type="text" value={project.size} onChange={(e) => updateProject(project.id, "size", e.target.value)} placeholder="예: 3000 x 2000mm" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  {/* 로고 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">로고 이미지</label>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {project.logo ? (
                          <img src={project.logo} alt="logo" className="max-h-full max-w-full object-contain p-1" />
                        ) : (
                          <span className="text-xs text-gray-400">없음</span>
                        )}
                      </div>
                      <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                        업로드
                        <input type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>

                  {/* 이미지 관리 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-600">프로젝트 이미지 ({project.images.length}장)</label>
                      <button onClick={() => addImageToProject(project.id)} className="text-blue-600 text-sm hover:underline">
                        + 이미지 추가
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.images.map((img, idx) => (
                        <div key={idx} className="relative group w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">
                          {img ? (
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <label className="w-full h-full flex items-center justify-center cursor-pointer">
                              <span className="text-xs text-gray-400">업로드</span>
                              <input type="file" className="hidden" accept="image/*" />
                            </label>
                          )}
                          <button
                            onClick={() => removeImageFromProject(project.id, idx)}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
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
                    <button onClick={() => removeProject(project.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                      프로젝트 삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
