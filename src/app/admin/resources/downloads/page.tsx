"use client";

import { useState } from "react";

interface Resource {
  id: number;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  fileName: string;
  fileSize: string;
  createdAt: string;
}

const initialResources: Resource[] = [
  { id: 1, titleKo: "LED 디스플레이 카탈로그 2024", titleEn: "LED Display Catalog 2024", descriptionKo: "상승종합통신 LED 디스플레이 제품 카탈로그입니다.", descriptionEn: "Sangseung LED display product catalog.", fileName: "LED_Catalog_2024.pdf", fileSize: "12.5 MB", createdAt: "2024-03-15" },
  { id: 2, titleKo: "S-Wall 제품 사양서", titleEn: "S-Wall Product Spec", descriptionKo: "S-Wall Series 상세 스펙 문서", descriptionEn: "Detailed specification for S-Wall Series.", fileName: "S-Wall_Spec.pdf", fileSize: "3.2 MB", createdAt: "2024-02-20" },
  { id: 3, titleKo: "회사 브로슈어", titleEn: "Company Brochure", descriptionKo: "상승종합통신㈜ 기업 소개 브로슈어", descriptionEn: "Company introduction brochure.", fileName: "Company_Brochure.pdf", fileSize: "8.7 MB", createdAt: "2024-01-10" },
];

export default function AdminDownloadsPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [saved, setSaved] = useState(false);

  const addResource = () => {
    setResources([
      { id: Date.now(), titleKo: "", titleEn: "", descriptionKo: "", descriptionEn: "", fileName: "", fileSize: "", createdAt: new Date().toISOString().split("T")[0] },
      ...resources,
    ]);
  };

  const updateResource = (id: number, field: keyof Resource, value: string) => {
    setResources(resources.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const removeResource = (id: number) => {
    if (confirm("이 자료를 삭제하시겠습니까?")) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    console.log("자료실 저장:", resources);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자료실 관리</h1>
          <p className="text-sm text-gray-500 mt-1">다운로드 가능한 카탈로그 및 문서를 관리합니다.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addResource} className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900">+ 자료 추가</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
            {saved ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={resource.titleKo} onChange={(e) => updateResource(resource.id, "titleKo", e.target.value)} placeholder="자료 제목 (KO)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={resource.titleEn} onChange={(e) => updateResource(resource.id, "titleEn", e.target.value)} placeholder="Title (EN)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <textarea value={resource.descriptionKo} onChange={(e) => updateResource(resource.id, "descriptionKo", e.target.value)} placeholder="간단 설명 (KO)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  <textarea value={resource.descriptionEn} onChange={(e) => updateResource(resource.id, "descriptionEn", e.target.value)} placeholder="Description (EN)" rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  {resource.fileName ? (
                    <div>
                      <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-700 font-medium">{resource.fileName}</p>
                      <p className="text-xs text-gray-400">{resource.fileSize}</p>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-blue-600">파일 업로드</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, ZIP 등</p>
                      <input type="file" className="hidden" />
                    </label>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{resource.createdAt}</span>
                  <button onClick={() => removeResource(resource.id)} className="text-red-500 hover:text-red-700 text-sm">삭제</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}