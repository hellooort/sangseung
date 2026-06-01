"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

export interface NetworkServiceItem {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

export interface NetworkSubCategory {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  href: string;
  image: string;
}

export interface NetworkPageData {
  hero: {
    badge_en: string;
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    image: string;
  };
  servicesHeading_ko: string;
  servicesHeading_en: string;
  services: NetworkServiceItem[];
  categoriesHeading_ko: string;
  categoriesHeading_en: string;
  categories: NetworkSubCategory[];
  cta: {
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    button_ko: string;
    button_en: string;
    button_href: string;
  };
}

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const fallback: NetworkPageData = {
  hero: {
    badge_en: "NETWORK BUSINESS",
    title_ko: "네트워크 사업",
    title_en: "Network Business",
    description_ko: "IBS 통합시스템부터 글로벌 프로젝트까지, 최고의 네트워크 인프라 솔루션을 제공합니다.",
    description_en: "From IBS integration to global projects — best-in-class network infrastructure solutions.",
    image: "/image/reference/work_4.jpg",
  },
  servicesHeading_ko: "주요 서비스",
  servicesHeading_en: "Key Services",
  services: [
    { id: newId(), title_ko: "통합배선공사 (UTP/광)", title_en: "Structured Cabling (UTP/Fiber)", description_ko: "카테고리6 이상 UTP 케이블 및 광케이블 인프라 구축",     description_en: "Cat 6+ UTP and fiber-optic cabling infrastructure" },
    { id: newId(), title_ko: "CCTV / CATV",          title_en: "CCTV / CATV",                description_ko: "보안 감시 시스템 및 방송 설비 구축",                          description_en: "Security surveillance and broadcast facility installation" },
    { id: newId(), title_ko: "서버실 구축",          title_en: "Server Room Build-out",      description_ko: "항온항습, 전원, 보안이 완비된 전산실 구축",                  description_en: "Server rooms with HVAC, power, and security" },
    { id: newId(), title_ko: "AV 시스템",            title_en: "AV Systems",                 description_ko: "영상 회의, 전자칠판, 디지털 사이니지 등 시청각 시스템",       description_en: "Video conferencing, interactive boards, digital signage, and more" },
    { id: newId(), title_ko: "유지보수",             title_en: "Maintenance",                description_ko: "정보통신설비 성능/보안/안정성 지속 관리 및 장애 예방",         description_en: "Ongoing performance, security, and stability management for ICT facilities" },
  ],
  categoriesHeading_ko: "사업 분야",
  categoriesHeading_en: "Business Areas",
  categories: [
    { id: newId(), title_ko: "IBS 통합시스템",  title_en: "IBS Integrated System", description_ko: "통합배선공사, CCTV, CATV, AV, 서버실 구축 등 건물 인프라 전반을 담당합니다.",                       description_en: "Comprehensive building infrastructure including structured cabling, CCTV, CATV, AV, and server room construction.", href: "/business/network/ibs",      image: "/image/reference/work_3.jpg" },
    { id: newId(), title_ko: "해외 프로젝트",  title_en: "Overseas Projects",     description_ko: "GUAM, 일본, 사이판, 사우디아라비아, 태국, 말레이시아 등 글로벌 프로젝트를 수행합니다.",            description_en: "Global delivery in Guam, Japan, Saipan, Saudi Arabia, Thailand, Malaysia, and more.",                                href: "/business/network/overseas", image: "/image/reference/work_5.jpg" },
    { id: newId(), title_ko: "공사실적",        title_en: "Project Records",       description_ko: "2003년부터 현재까지 수행한 국내외 네트워크 인프라 구축 실적입니다.",                              description_en: "Domestic and overseas network infrastructure projects delivered since 2003.",                                       href: "/business/network/projects", image: "/image/reference/work_7.jpg" },
  ],
  cta: {
    title_ko: "네트워크 인프라 구축이 필요하신가요?",
    title_en: "Need network infrastructure built?",
    description_ko: "20년 이상의 경험을 바탕으로 최적의 솔루션을 제안해 드립니다.",
    description_en: "Drawing on 20+ years of experience, we propose the optimal solution.",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
};

const inputCls = "w-full px-3 py-2 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";
const textareaCls = inputCls + " resize-y";

export default function AdminNetworkPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<NetworkPageData>("page_network", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const [tab, setTab] = useState<"hero" | "services" | "categories" | "cta">("hero");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>, onUrl: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingKey(key);
    try { const url = await uploadImage(file, "business/network"); onUrl(url); }
    catch (err) { alert(err instanceof Error ? err.message : "업로드 실패"); }
    finally { setUploadingKey(null); e.target.value = ""; }
  };

  const updateService = (id: string, patch: Partial<NetworkServiceItem>) => setValue({ ...value, services: value.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const addService = () => setValue({ ...value, services: [...value.services, { id: newId(), title_ko: "", title_en: "", description_ko: "", description_en: "" }] });
  const removeService = (id: string) => { if (!confirm("삭제?")) return; setValue({ ...value, services: value.services.filter((s) => s.id !== id) }); };

  const updateCategory = (id: string, patch: Partial<NetworkSubCategory>) => setValue({ ...value, categories: value.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const addCategory = () => setValue({ ...value, categories: [...value.categories, { id: newId(), title_ko: "", title_en: "", description_ko: "", description_en: "", href: "/", image: "" }] });
  const removeCategory = (id: string) => { if (!confirm("삭제?")) return; setValue({ ...value, categories: value.categories.filter((c) => c.id !== id) }); };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">네트워크 사업 페이지 관리</h1>
          <p className="text-sm text-gray-500 mt-1">/business/network 페이지의 모든 섹션을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ id: "hero", label: "Hero" }, { id: "services", label: "주요 서비스" }, { id: "categories", label: "사업 분야 카드" }, { id: "cta", label: "하단 CTA" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {tab === "hero" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Hero 섹션</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-600 mb-1">상단 영문 뱃지</label><input value={value.hero.badge_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, badge_en: e.target.value } })} className={inputCls} /></div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">배경 이미지</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {value.hero.image && <Image src={value.hero.image} alt="" fill className="object-cover" unoptimized />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-blue-600 text-xs cursor-pointer hover:underline">
                      {uploadingKey === "hero" ? "업로드중" : "업로드"}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload("hero", e, (url) => setValue({ ...value, hero: { ...value.hero, image: url } }))} />
                    </label>
                    <span className="text-[10px] text-gray-400">가로형 이미지 권장 (1920 x 1080px)</span>
                  </div>
                  <input value={value.hero.image} onChange={(e) => setValue({ ...value, hero: { ...value.hero, image: e.target.value } })} className={inputCls} />
                </div>
              </div>
              <div><label className="block text-xs text-gray-600 mb-1">제목 (KO)</label><input value={value.hero.title_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, title_ko: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">Title (EN)</label><input value={value.hero.title_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, title_en: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">설명 (KO)</label><textarea rows={3} value={value.hero.description_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, description_ko: e.target.value } })} className={textareaCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">Description (EN)</label><textarea rows={3} value={value.hero.description_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, description_en: e.target.value } })} className={textareaCls} /></div>
            </div>
          </div>
        )}

        {tab === "services" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input value={value.servicesHeading_ko} onChange={(e) => setValue({ ...value, servicesHeading_ko: e.target.value })} placeholder="섹션 제목 (KO)" className={inputCls + " font-semibold"} />
              <input value={value.servicesHeading_en} onChange={(e) => setValue({ ...value, servicesHeading_en: e.target.value })} placeholder="Heading (EN)" className={inputCls} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">서비스 항목</h2>
              <button onClick={addService} className="text-blue-600 text-sm hover:underline">+ 항목 추가</button>
            </div>
            <div className="space-y-3">
              {value.services.map((s) => (
                <div key={s.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input value={s.title_ko}       onChange={(e) => updateService(s.id, { title_ko: e.target.value })}       placeholder="제목 (KO)"       className={inputCls} />
                    <input value={s.title_en}       onChange={(e) => updateService(s.id, { title_en: e.target.value })}       placeholder="Title (EN)"      className={inputCls} />
                    <input value={s.description_ko} onChange={(e) => updateService(s.id, { description_ko: e.target.value })} placeholder="설명 (KO)"       className={inputCls} />
                    <input value={s.description_en} onChange={(e) => updateService(s.id, { description_en: e.target.value })} placeholder="Description (EN)" className={inputCls} />
                  </div>
                  <div className="text-right"><button onClick={() => removeService(s.id)} className="text-red-500 text-xs hover:underline">삭제</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input value={value.categoriesHeading_ko} onChange={(e) => setValue({ ...value, categoriesHeading_ko: e.target.value })} placeholder="섹션 제목 (KO)" className={inputCls + " font-semibold"} />
              <input value={value.categoriesHeading_en} onChange={(e) => setValue({ ...value, categoriesHeading_en: e.target.value })} placeholder="Heading (EN)" className={inputCls} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">사업 분야 카드</h2>
              <button onClick={addCategory} className="text-blue-600 text-sm hover:underline">+ 카드 추가</button>
            </div>
            <div className="space-y-3">
              {value.categories.map((c) => (
                <div key={c.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="relative w-32 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {c.image && <Image src={c.image} alt="" fill className="object-cover" unoptimized />}
                      <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center text-white text-xs">
                        {uploadingKey === `c-${c.id}` ? "..." : "변경"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(`c-${c.id}`, e, (url) => updateCategory(c.id, { image: url }))} />
                      </label>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input value={c.title_ko}       onChange={(e) => updateCategory(c.id, { title_ko: e.target.value })}       placeholder="제목 (KO)"       className={inputCls} />
                      <input value={c.title_en}       onChange={(e) => updateCategory(c.id, { title_en: e.target.value })}       placeholder="Title (EN)"      className={inputCls} />
                      <input value={c.description_ko} onChange={(e) => updateCategory(c.id, { description_ko: e.target.value })} placeholder="설명 (KO)"       className={inputCls} />
                      <input value={c.description_en} onChange={(e) => updateCategory(c.id, { description_en: e.target.value })} placeholder="Description (EN)" className={inputCls} />
                      <input value={c.href}            onChange={(e) => updateCategory(c.id, { href: e.target.value })}           placeholder="링크 URL"        className={inputCls + " md:col-span-2 font-mono text-xs"} />
                    </div>
                  </div>
                  <div className="text-right mt-2"><button onClick={() => removeCategory(c.id)} className="text-red-500 text-xs hover:underline">삭제</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "cta" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-600 mb-1">제목 (KO)</label><input value={value.cta.title_ko} onChange={(e) => setValue({ ...value, cta: { ...value.cta, title_ko: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Title (EN)</label><input value={value.cta.title_en} onChange={(e) => setValue({ ...value, cta: { ...value.cta, title_en: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">설명 (KO)</label><textarea rows={2} value={value.cta.description_ko} onChange={(e) => setValue({ ...value, cta: { ...value.cta, description_ko: e.target.value } })} className={textareaCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Description (EN)</label><textarea rows={2} value={value.cta.description_en} onChange={(e) => setValue({ ...value, cta: { ...value.cta, description_en: e.target.value } })} className={textareaCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">버튼 (KO)</label><input value={value.cta.button_ko} onChange={(e) => setValue({ ...value, cta: { ...value.cta, button_ko: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Button (EN)</label><input value={value.cta.button_en} onChange={(e) => setValue({ ...value, cta: { ...value.cta, button_en: e.target.value } })} className={inputCls} /></div>
            <div className="md:col-span-2"><label className="block text-xs text-gray-600 mb-1">버튼 링크</label><input value={value.cta.button_href} onChange={(e) => setValue({ ...value, cta: { ...value.cta, button_href: e.target.value } })} className={inputCls} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
