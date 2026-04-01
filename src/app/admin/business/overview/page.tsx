"use client";

import { useState } from "react";

interface Section {
  id: number;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
}

const initialSections: Section[] = [
  {
    id: 1,
    titleKo: "네트워크 사업",
    titleEn: "Network Business",
    descriptionKo: "IBS 통합시스템부터 글로벌 프로젝트까지, 최고의 네트워크 인프라 솔루션을 제공합니다.",
    descriptionEn: "From IBS integrated systems to global projects, we provide the best network infrastructure solutions.",
  },
  {
    id: 2,
    titleKo: "LED 디스플레이",
    titleEn: "LED Display",
    descriptionKo: "설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.",
    descriptionEn: "We are a one-stop solution company providing everything from design, manufacturing, installation to maintenance of LED displays.",
  },
];

export default function AdminBusinessOverviewPage() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [saved, setSaved] = useState(false);

  const updateSection = (id: number, field: keyof Section, value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = () => {
    console.log("사업소개 저장:", sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">사업소개 텍스트 관리</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">KO</span>
                  한국어
                </h3>
                <input
                  type="text"
                  value={section.titleKo}
                  onChange={(e) => updateSection(section.id, "titleKo", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="제목"
                />
                <textarea
                  value={section.descriptionKo}
                  onChange={(e) => updateSection(section.id, "descriptionKo", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="설명"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">EN</span>
                  English
                </h3>
                <input
                  type="text"
                  value={section.titleEn}
                  onChange={(e) => updateSection(section.id, "titleEn", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />
                <textarea
                  value={section.descriptionEn}
                  onChange={(e) => updateSection(section.id, "descriptionEn", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
