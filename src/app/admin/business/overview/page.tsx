"use client";

import { useState } from "react";

interface Feature {
  id: number;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
}

interface BusinessSection {
  id: string;
  label: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  heroImage: string;
  ctaLinkLabel: string;
  features: Feature[];
}

const initialSections: BusinessSection[] = [
  {
    id: "network",
    label: "네트워크 사업",
    titleKo: "네트워크 사업",
    titleEn: "Network Business",
    subtitleKo: "통합 네트워크 인프라 솔루션",
    subtitleEn: "Integrated Network Infrastructure Solution",
    descriptionKo: "IBS 통합시스템부터 글로벌 프로젝트까지, 최고의 네트워크 인프라 솔루션을 제공합니다.",
    descriptionEn: "From IBS integrated systems to global projects, we provide the best network infrastructure solutions.",
    heroImage: "/image/reference/work_4.jpg",
    ctaLinkLabel: "문의하기",
    features: [
      { id: 1, titleKo: "IBS 통합시스템", titleEn: "IBS Integrated System", descriptionKo: "통합배선, CCTV, AV, 서버실 등 빌딩 인프라 전반", descriptionEn: "Overall building infrastructure including wiring, CCTV, AV, server room" },
      { id: 2, titleKo: "해외 프로젝트", titleEn: "Overseas Projects", descriptionKo: "GUAM, 일본, 태국 등 글로벌 네트워크 인프라 구축", descriptionEn: "Global network infrastructure in Guam, Japan, Thailand, etc." },
      { id: 3, titleKo: "공사실적", titleEn: "Project Records", descriptionKo: "20년 축적된 네트워크 구축 실적", descriptionEn: "20 years of accumulated network construction experience" },
    ],
  },
  {
    id: "led",
    label: "LED 디스플레이",
    titleKo: "LED 디스플레이",
    titleEn: "LED Display",
    subtitleKo: "Total LED Display Solution",
    subtitleEn: "Total LED Display Solution",
    descriptionKo: "설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.",
    descriptionEn: "We are a one-stop solution company providing everything from design, manufacturing, installation to maintenance of LED displays.",
    heroImage: "/image/reference/work_8.jpg",
    ctaLinkLabel: "문의하기",
    features: [
      { id: 1, titleKo: "INDOOR FIXED", titleEn: "Indoor Fixed", descriptionKo: "S-Wall, SVI60, SVI1000 등 실내용 고화질 LED", descriptionEn: "Indoor high-quality LED such as S-Wall, SVI60, SVI1000" },
      { id: 2, titleKo: "OUTDOOR FIXED", titleEn: "Outdoor Fixed", descriptionKo: "SOD, SCOD 시리즈 고휘도 실외용 LED", descriptionEn: "SOD, SCOD series high-brightness outdoor LED" },
      { id: 3, titleKo: "COB LED", titleEn: "COB LED", descriptionKo: "LFlex, SCO-Wall 등 최신 COB 기술", descriptionEn: "Latest COB technology like LFlex, SCO-Wall" },
      { id: 4, titleKo: "MEDIA FACADE", titleEn: "Media Facade", descriptionKo: "SGL, ROD 시리즈 미디어 파사드", descriptionEn: "SGL, ROD series media facade" },
    ],
  },
  {
    id: "video-wall",
    label: "Video-Wall",
    titleKo: "Video-Wall",
    titleEn: "Video-Wall",
    subtitleKo: "CALICO PRO Video Processing Solution",
    subtitleEn: "CALICO PRO Video Processing Solution",
    descriptionKo: "수백 개의 4K60 비디오 창과 10비트 색 심도를 지원하는 tvONE CALICO PRO 기반의 차세대 Video-Wall 프로세싱 솔루션입니다.",
    descriptionEn: "Next-generation Video-Wall processing solution based on tvONE CALICO PRO supporting hundreds of 4K60 video windows and 10-bit color depth.",
    heroImage: "/image/calico-pro.png",
    ctaLinkLabel: "문의하기",
    features: [
      { id: 1, titleKo: "CALICO PRO 2200", titleEn: "CALICO PRO 2200", descriptionKo: "대규모 관제센터 / 방송 환경용 하이엔드 프로세서", descriptionEn: "High-end processor for large-scale control centers / broadcast" },
      { id: 2, titleKo: "CALICO PRO 1200", titleEn: "CALICO PRO 1200", descriptionKo: "중소규모 환경 최적화 모델", descriptionEn: "Optimized model for small to medium environments" },
    ],
  },
  {
    id: "maintenance",
    label: "유지보수",
    titleKo: "정보통신 유지보수·관리",
    titleEn: "ICT Maintenance & Management",
    subtitleKo: "Specialists in Reliable ICT",
    subtitleEn: "Specialists in Reliable ICT",
    descriptionKo: "상승종합통신은 정보통신 전문기업으로 최고의 품질을 제공합니다.",
    descriptionEn: "Sangseung is an ICT specialist providing the highest quality.",
    heroImage: "/image/reference/work_15.jpg",
    ctaLinkLabel: "문의하기",
    features: [
      { id: 1, titleKo: "성능보장", titleEn: "Performance Assurance", descriptionKo: "최적의 시스템 성능 유지", descriptionEn: "Maintaining optimal system performance" },
      { id: 2, titleKo: "보안성", titleEn: "Security", descriptionKo: "철저한 보안으로 안전 강화", descriptionEn: "Enhanced safety through thorough security" },
      { id: 3, titleKo: "고장예방", titleEn: "Failure Prevention", descriptionKo: "사전 점검으로 장애 차단", descriptionEn: "Preventing failures through regular inspection" },
      { id: 4, titleKo: "안정성", titleEn: "Stability", descriptionKo: "지속 관리로 안정적 운용", descriptionEn: "Stable operation through continuous management" },
      { id: 5, titleKo: "비용절감", titleEn: "Cost Reduction", descriptionKo: "효율 관리로 운영비 절감", descriptionEn: "Reduced operating costs through efficient management" },
    ],
  },
];

export default function AdminBusinessOverviewPage() {
  const [sections, setSections] = useState<BusinessSection[]>(initialSections);
  const [activeId, setActiveId] = useState<string>(initialSections[0].id);
  const [saved, setSaved] = useState(false);

  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  const updateActive = <K extends keyof BusinessSection>(field: K, value: BusinessSection[K]) => {
    setSections(sections.map((s) => (s.id === activeId ? { ...s, [field]: value } : s)));
  };

  const addFeature = () => {
    updateActive("features", [
      ...active.features,
      { id: Date.now(), titleKo: "", titleEn: "", descriptionKo: "", descriptionEn: "" },
    ]);
  };

  const updateFeature = (id: number, field: keyof Feature, value: string) => {
    updateActive(
      "features",
      active.features.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  const removeFeature = (id: number) => {
    updateActive("features", active.features.filter((f) => f.id !== id));
  };

  const handleSave = () => {
    console.log("사업소개 저장:", sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사업소개 관리</h1>
          <p className="text-sm text-gray-500 mt-1">각 사업 영역의 소개 텍스트와 주요 내용을 관리합니다.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 탭: 4개 사업 영역 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeId === s.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>

        {/* 히어로 이미지 */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-600 mb-2">히어로 이미지</label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {active.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.heroImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400">이미지 없음</span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                이미지 업로드
                <input type="file" className="hidden" accept="image/*" />
              </label>
              <input
                type="text"
                value={active.heroImage}
                onChange={(e) => updateActive("heroImage", e.target.value)}
                placeholder="/image/..."
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">제목 (KO)</label>
            <input type="text" value={active.titleKo} onChange={(e) => updateActive("titleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
            <input type="text" value={active.titleEn} onChange={(e) => updateActive("titleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">소제목 (KO)</label>
            <input type="text" value={active.subtitleKo} onChange={(e) => updateActive("subtitleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (EN)</label>
            <input type="text" value={active.subtitleEn} onChange={(e) => updateActive("subtitleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <textarea value={active.descriptionKo} onChange={(e) => updateActive("descriptionKo", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <textarea value={active.descriptionEn} onChange={(e) => updateActive("descriptionEn", e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CTA 버튼 텍스트</label>
            <input type="text" value={active.ctaLinkLabel} onChange={(e) => updateActive("ctaLinkLabel", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* 주요 항목 (Feature 카드) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">주요 항목</h2>
            <p className="text-xs text-gray-500 mt-0.5">해당 사업 영역의 하위 카드/서비스를 관리합니다.</p>
          </div>
          <button onClick={addFeature} className="text-blue-600 text-sm font-medium hover:underline">+ 항목 추가</button>
        </div>

        <div className="space-y-3">
          {active.features.map((f) => (
            <div key={f.id} className="border border-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="text" value={f.titleKo} onChange={(e) => updateFeature(f.id, "titleKo", e.target.value)} placeholder="제목 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.titleEn} onChange={(e) => updateFeature(f.id, "titleEn", e.target.value)} placeholder="Title (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.descriptionKo} onChange={(e) => updateFeature(f.id, "descriptionKo", e.target.value)} placeholder="설명 (KO)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" value={f.descriptionEn} onChange={(e) => updateFeature(f.id, "descriptionEn", e.target.value)} placeholder="Description (EN)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button onClick={() => removeFeature(f.id)} className="text-red-500 text-xs hover:underline">삭제</button>
            </div>
          ))}
          {active.features.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">항목이 없습니다. 상단 &quot;+ 항목 추가&quot; 버튼으로 추가해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
