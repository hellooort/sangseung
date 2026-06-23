"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface BenefitItem { id: string; title_ko: string; title_en: string; description_ko: string; description_en: string; image: string; }
interface ExpertiseCard { id: string; title_ko: string; title_en: string; items_ko: string; items_en: string; }
interface PerformanceItem { id: string; title_ko: string; title_en: string; subtitle_ko: string; subtitle_en: string; image: string; }
interface PerformanceTab { id: string; label_ko: string; label_en: string; items: PerformanceItem[]; }

interface MaintenanceData {
  hero: {
    badge_en: string;
    title_ko: string; title_en: string;
    description_ko: string; description_en: string;
    image: string;
    ctaLabel_ko: string; ctaLabel_en: string;
    ctaHref: string;
  };
  ctaPhone: {
    label_ko: string; label_en: string;
    phone: string;
    description_ko: string; description_en: string;
    button_ko: string; button_en: string;
    button_href: string;
  };
  benefits: BenefitItem[];
  expertiseCards: ExpertiseCard[];
  performanceTabs: PerformanceTab[];
}

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const fallback: MaintenanceData = {
  hero: {
    badge_en: "Specialists in Reliable ICT",
    title_ko: "ICT 유지보수 및 관리",
    title_en: "ICT Maintenance & Management",
    description_ko: "상승종합통신은 최고의 품질로 신뢰를 제공하는 ICT 전문 기업입니다.",
    description_en: "SANGSEUNG is an ICT specialist delivering best-in-class quality.",
    image: "/image/reference/work_15.jpg",
    ctaLabel_ko: "문의하기",
    ctaLabel_en: "Contact Us",
    ctaHref: "/contact",
  },
  ctaPhone: {
    label_ko: "설계 / 시공 / 컨설팅",
    label_en: "Design / Build / Consulting",
    phone: "02-953-0056",
    description_ko: "자세한 상담 및 견적 문의는 전화로 연락주세요",
    description_en: "Call us for detailed consultation and quotation",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
  benefits: [
    { id: newId(), title_ko: "성능 보장", title_en: "Performance",  description_ko: "최상의 성능으로 시스템 운영", description_en: "Keep systems running at peak performance", image: "/image/reference/work_1.jpg" },
    { id: newId(), title_ko: "보안 강화", title_en: "Security",     description_ko: "철저한 보안으로 안전 보호",   description_en: "Strict security for stronger protection",  image: "/image/reference/work_2.jpg" },
    { id: newId(), title_ko: "장애 예방", title_en: "Prevention",   description_ko: "선제적 점검으로 장애 예방",   description_en: "Proactive checks prevent failures",        image: "/image/reference/work_3.jpg" },
    { id: newId(), title_ko: "안정 운영", title_en: "Reliability",  description_ko: "지속 관리로 안정적인 운영",   description_en: "Stable operation through continuous care", image: "/image/reference/work_4.jpg" },
    { id: newId(), title_ko: "비용 절감", title_en: "Cost Saving",  description_ko: "효율적 관리로 운영비 절감",   description_en: "Efficient management lowers OPEX",         image: "/image/reference/work_5.jpg" },
  ],
  expertiseCards: [
    { id: newId(), title_ko: "설계/시공/감리/유지보수\n통합 보유 면허", title_en: "Integrated Licenses\nDesign / Build / Supervision / Maintenance", items_ko: "정보통신공사업\n정보통신엔지니어링\n소프트웨어사업", items_en: "ICT Construction\nICT Engineering\nSoftware Business" },
    { id: newId(), title_ko: "정보통신 시스템 직접 생산", title_en: "Direct ICT System Production", items_ko: "IT 시스템 개발\nIT 시스템 유지보수\n소프트웨어 지원 및 컨설팅\nIT 인프라 구축", items_en: "IT System Development\nIT System Maintenance\nSoftware Support\nIT Infrastructure Build" },
    { id: newId(), title_ko: "최신 ICT 기술과\n현장 경험을 갖춘 전문가", title_en: "Experts in Cutting-edge ICT\nand Hands-on Skill", items_ko: "기업부설 연구소\n20년 이상 축적된 노하우\n전문 자격 보유 인력", items_en: "In-house R&D Institute\n20+ Years of Know-how\nCertified Specialists" },
    { id: newId(), title_ko: "검증된 안전관리 체계\n무사고/무재해", title_en: "Proven Safety Management\nZero Incidents", items_ko: "ISO 45001 안전보건경영시스템\nISO 9001 품질경영시스템\nISO 14001 환경경영시스템", items_en: "ISO 45001 OHS Management\nISO 9001 Quality Management\nISO 14001 Environmental Management" },
  ],
  performanceTabs: [
    { id: newId(), label_ko: "정보통신 유지보수 · 관리", label_en: "ICT Maintenance & Management", items: [
      { id: newId(), title_ko: "대학 캠퍼스 유지보수",       title_en: "University Campus Maintenance",  subtitle_ko: "연 면적 5.3만㎡", subtitle_en: "53,000 m²/yr", image: "/image/reference/work_6.jpg" },
      { id: newId(), title_ko: "식음료 공장 네트워크 구축", title_en: "Food/Beverage Plant Network",   subtitle_ko: "연 면적 3.6만㎡", subtitle_en: "36,000 m²/yr", image: "/image/reference/work_7.jpg" },
      { id: newId(), title_ko: "생활용품 제조사 유지보수",   title_en: "Consumer Goods Factory",        subtitle_ko: "연 면적 2.7만㎡", subtitle_en: "27,000 m²/yr", image: "/image/reference/work_8.jpg" },
      { id: newId(), title_ko: "철강 제조 공장 유지보수",   title_en: "Steel Manufacturing Plant",     subtitle_ko: "연 면적 1.5만㎡", subtitle_en: "15,000 m²/yr", image: "/image/reference/work_9.jpg" },
    ] },
    { id: newId(), label_ko: "정보통신 프로젝트", label_en: "ICT Projects", items: [
      { id: newId(), title_ko: "쇼핑몰 옥외 LED 디스플레이 구축", title_en: "Mall LED Display Build",       subtitle_ko: "옥외 LED 600㎡",       subtitle_en: "600 m² Outdoor LED",          image: "/image/reference/work_11.jpg" },
      { id: newId(), title_ko: "관제센터 Video-Wall 구축",         title_en: "Control Center Video-Wall",     subtitle_ko: "CALICO PRO 적용",      subtitle_en: "Powered by CALICO PRO",       image: "/image/reference/work_12.jpg" },
      { id: newId(), title_ko: "기업 본사 IBS 구축",               title_en: "Corporate HQ IBS",              subtitle_ko: "지능형 빌딩 시스템",   subtitle_en: "Intelligent Building System", image: "/image/reference/work_13.jpg" },
      { id: newId(), title_ko: "해외 호텔 네트워크 구축",          title_en: "Overseas Hotel Network",        subtitle_ko: "GUAM / Thailand",      subtitle_en: "Guam / Thailand",             image: "/image/reference/work_14.jpg" },
    ] },
  ],
};

const inputCls = "w-full px-3 py-2 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";
const textareaCls = "w-full px-3 py-2 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-y";

export default function AdminMaintenancePage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<MaintenanceData>("maintenance", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const [tab, setTab] = useState<"hero" | "benefits" | "expertise" | "performance" | "cta">("hero");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>, onUrl: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingKey(key);
    try { const url = await uploadImage(file, "maintenance"); onUrl(url); }
    catch (err) { alert(err instanceof Error ? err.message : "업로드 실패"); }
    finally { setUploadingKey(null); e.target.value = ""; }
  };

  // Benefit handlers
  const updateBenefit = (id: string, patch: Partial<BenefitItem>) => setValue({ ...value, benefits: value.benefits.map((b) => (b.id === id ? { ...b, ...patch } : b)) });
  const addBenefit = () => setValue({ ...value, benefits: [...value.benefits, { id: newId(), title_ko: "", title_en: "", description_ko: "", description_en: "", image: "" }] });
  const removeBenefit = (id: string) => { if (!confirm("삭제?")) return; setValue({ ...value, benefits: value.benefits.filter((b) => b.id !== id) }); };
  const moveBenefit = (id: string, dir: -1 | 1) => {
    const idx = value.benefits.findIndex((b) => b.id === id); const n = idx + dir;
    if (idx < 0 || n < 0 || n >= value.benefits.length) return;
    const arr = [...value.benefits]; [arr[idx], arr[n]] = [arr[n], arr[idx]]; setValue({ ...value, benefits: arr });
  };

  // Expertise handlers
  const updateExpertise = (id: string, patch: Partial<ExpertiseCard>) => setValue({ ...value, expertiseCards: value.expertiseCards.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  const addExpertise = () => setValue({ ...value, expertiseCards: [...value.expertiseCards, { id: newId(), title_ko: "", title_en: "", items_ko: "", items_en: "" }] });
  const removeExpertise = (id: string) => { if (!confirm("삭제?")) return; setValue({ ...value, expertiseCards: value.expertiseCards.filter((c) => c.id !== id) }); };

  // Performance Tabs
  const updateTab = (id: string, patch: Partial<PerformanceTab>) => setValue({ ...value, performanceTabs: value.performanceTabs.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  const addTab = () => setValue({ ...value, performanceTabs: [...value.performanceTabs, { id: newId(), label_ko: "새 탭", label_en: "New Tab", items: [] }] });
  const removeTab = (id: string) => { if (!confirm("이 탭과 모든 항목을 삭제?")) return; setValue({ ...value, performanceTabs: value.performanceTabs.filter((t) => t.id !== id) }); };
  const updatePerfItem = (tabId: string, itemId: string, patch: Partial<PerformanceItem>) => {
    const tabRow = value.performanceTabs.find((t) => t.id === tabId); if (!tabRow) return;
    updateTab(tabId, { items: tabRow.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) });
  };
  const addPerfItem = (tabId: string) => {
    const tabRow = value.performanceTabs.find((t) => t.id === tabId); if (!tabRow) return;
    updateTab(tabId, { items: [...tabRow.items, { id: newId(), title_ko: "", title_en: "", subtitle_ko: "", subtitle_en: "", image: "" }] });
  };
  const removePerfItem = (tabId: string, itemId: string) => {
    const tabRow = value.performanceTabs.find((t) => t.id === tabId); if (!tabRow) return;
    if (!confirm("삭제?")) return;
    updateTab(tabId, { items: tabRow.items.filter((i) => i.id !== itemId) });
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">유지보수 페이지 관리</h1>
          <p className="text-sm text-gray-500 mt-1">/business/maintenance 페이지의 모든 섹션을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: "hero",        label: "Hero" },
          { id: "benefits",    label: "5가지 베네핏" },
          { id: "expertise",   label: "전문성 카드" },
          { id: "performance", label: "주요 실적" },
          { id: "cta",         label: "하단 전화 CTA" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* HERO */}
        {tab === "hero" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Hero 영역</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">상단 영문 뱃지</label>
                <input type="text" value={value.hero.badge_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, badge_en: e.target.value } })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">배경 이미지</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {value.hero.image && <Image src={value.hero.image} alt="" fill className="object-cover" unoptimized />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-blue-600 text-xs cursor-pointer hover:underline">
                      {uploadingKey === "hero" ? "업로드중" : "업로드"}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload("hero", e, (url) => setValue({ ...value, hero: { ...value.hero, image: url } }))} />
                    </label>
                    <span className="text-[10px] text-gray-400">가로형 이미지 권장 (1920 x 1080px)</span>
                  </div>
                  <input type="text" value={value.hero.image} onChange={(e) => setValue({ ...value, hero: { ...value.hero, image: e.target.value } })} className={inputCls} />
                </div>
              </div>
              <div><label className="block text-xs text-gray-600 mb-1">제목 (KO)</label><input type="text" value={value.hero.title_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, title_ko: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">Title (EN)</label><input type="text" value={value.hero.title_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, title_en: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">설명 (KO)</label><textarea rows={3} value={value.hero.description_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, description_ko: e.target.value } })} className={textareaCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">Description (EN)</label><textarea rows={3} value={value.hero.description_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, description_en: e.target.value } })} className={textareaCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">CTA 라벨 (KO)</label><input type="text" value={value.hero.ctaLabel_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, ctaLabel_ko: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">CTA Label (EN)</label><input type="text" value={value.hero.ctaLabel_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, ctaLabel_en: e.target.value } })} className={inputCls} /></div>
              <div className="md:col-span-2"><label className="block text-xs text-gray-600 mb-1">CTA 링크</label><input type="text" value={value.hero.ctaHref} onChange={(e) => setValue({ ...value, hero: { ...value.hero, ctaHref: e.target.value } })} className={inputCls} /></div>
            </div>
          </div>
        )}

        {/* BENEFITS */}
        {tab === "benefits" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">5가지 베네핏 카드</h2>
              <button onClick={addBenefit} className="text-blue-600 text-sm hover:underline">+ 카드 추가</button>
            </div>
            <div className="space-y-3">
              {value.benefits.map((b, idx) => (
                <div key={b.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="flex flex-col gap-1 shrink-0">
                      <div className="relative w-32 aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                        {b.image && <Image src={b.image} alt="" fill className="object-cover" unoptimized />}
                        <label className={`absolute inset-0 cursor-pointer flex items-center justify-center text-white text-xs ${b.image ? "opacity-0 hover:opacity-100 bg-black/40" : "bg-gray-300/80 hover:bg-gray-400/80"}`}>
                          {uploadingKey === `b-${b.id}` ? "업로드중" : b.image ? "변경" : "업로드"}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(`b-${b.id}`, e, (url) => updateBenefit(b.id, { image: url }))} />
                        </label>
                      </div>
                      <span className="text-[10px] text-gray-400">가로형 권장 (예: 600 x 400px)</span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input type="text" value={b.title_ko}       onChange={(e) => updateBenefit(b.id, { title_ko: e.target.value })}       placeholder="제목 (KO)"       className={inputCls} />
                      <input type="text" value={b.title_en}       onChange={(e) => updateBenefit(b.id, { title_en: e.target.value })}       placeholder="Title (EN)"      className={inputCls} />
                      <textarea value={b.description_ko} onChange={(e) => updateBenefit(b.id, { description_ko: e.target.value })} placeholder="설명 (KO) — Enter 로 줄바꿈"       rows={3} className={`${inputCls} resize-y whitespace-pre-wrap`} />
                      <textarea value={b.description_en} onChange={(e) => updateBenefit(b.id, { description_en: e.target.value })} placeholder="Description (EN) — Enter for line break" rows={3} className={`${inputCls} resize-y whitespace-pre-wrap`} />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div className="flex gap-1">
                      <button onClick={() => moveBenefit(b.id, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↑</button>
                      <button onClick={() => moveBenefit(b.id, 1)} disabled={idx === value.benefits.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2">↓</button>
                    </div>
                    <button onClick={() => removeBenefit(b.id)} className="text-red-500 hover:underline">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERTISE */}
        {tab === "expertise" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">전문성 카드 (각 카드의 항목은 줄바꿈 Enter 로 구분)</h2>
              <button onClick={addExpertise} className="text-blue-600 text-sm hover:underline">+ 카드 추가</button>
            </div>
            <div className="space-y-3">
              {value.expertiseCards.map((c) => (
                <div key={c.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <textarea rows={2} value={c.title_ko} onChange={(e) => updateExpertise(c.id, { title_ko: e.target.value })} placeholder="제목 (KO) - 줄바꿈 Enter" className={textareaCls} />
                    <textarea rows={2} value={c.title_en} onChange={(e) => updateExpertise(c.id, { title_en: e.target.value })} placeholder="Title (EN)" className={textareaCls} />
                    <textarea rows={4} value={c.items_ko} onChange={(e) => updateExpertise(c.id, { items_ko: e.target.value })} placeholder="항목 목록 (KO) - 줄바꿈 Enter" className={textareaCls} />
                    <textarea rows={4} value={c.items_en} onChange={(e) => updateExpertise(c.id, { items_en: e.target.value })} placeholder="Items (EN) - one per line" className={textareaCls} />
                  </div>
                  <div className="text-right"><button onClick={() => removeExpertise(c.id)} className="text-red-500 text-xs hover:underline">삭제</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERFORMANCE */}
        {tab === "performance" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">주요 실적 (탭 별 4장 카드)</h2>
              <button onClick={addTab} className="text-blue-600 text-sm hover:underline">+ 탭 추가</button>
            </div>
            <div className="space-y-6">
              {value.performanceTabs.map((tabRow) => (
                <div key={tabRow.id} className="border-2 border-gray-100 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-3">
                    <input type="text" value={tabRow.label_ko} onChange={(e) => updateTab(tabRow.id, { label_ko: e.target.value })} placeholder="탭 라벨 (KO)" className={inputCls + " font-semibold"} />
                    <input type="text" value={tabRow.label_en} onChange={(e) => updateTab(tabRow.id, { label_en: e.target.value })} placeholder="Tab Label (EN)" className={inputCls} />
                    <button onClick={() => removeTab(tabRow.id)} className="text-red-500 text-xs hover:underline">탭 삭제</button>
                  </div>
                  <div className="space-y-2 pl-3 border-l-2 border-blue-200">
                    {tabRow.items.map((item) => (
                        <div key={item.id} className="border border-gray-100 rounded p-3">
                          <div className="flex gap-3">
                            <div className="flex flex-col gap-1 shrink-0">
                              <div className="relative w-24 h-16 bg-gray-100 rounded overflow-hidden">
                                {item.image && <Image src={item.image} alt="" fill className="object-cover" unoptimized />}
                                <label className={`absolute inset-0 cursor-pointer flex items-center justify-center text-white text-xs ${item.image ? "opacity-0 hover:opacity-100 bg-black/40" : "bg-gray-300/80 hover:bg-gray-400/80"}`}>
                                  {uploadingKey === `p-${item.id}` ? "..." : item.image ? "변경" : "업로드"}
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(`p-${item.id}`, e, (url) => updatePerfItem(tabRow.id, item.id, { image: url }))} />
                                </label>
                              </div>
                              <span className="text-[10px] text-gray-400">가로형 권장 (예: 600 x 400px)</span>
                            </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input type="text" value={item.title_ko}    onChange={(e) => updatePerfItem(tabRow.id, item.id, { title_ko: e.target.value })}    placeholder="제목 (KO)"    className={inputCls} />
                            <input type="text" value={item.title_en}    onChange={(e) => updatePerfItem(tabRow.id, item.id, { title_en: e.target.value })}    placeholder="Title (EN)"   className={inputCls} />
                            <input type="text" value={item.subtitle_ko} onChange={(e) => updatePerfItem(tabRow.id, item.id, { subtitle_ko: e.target.value })} placeholder="부제 (KO)"    className={inputCls} />
                            <input type="text" value={item.subtitle_en} onChange={(e) => updatePerfItem(tabRow.id, item.id, { subtitle_en: e.target.value })} placeholder="Subtitle (EN)" className={inputCls} />
                          </div>
                        </div>
                        <div className="text-right mt-2"><button onClick={() => removePerfItem(tabRow.id, item.id)} className="text-red-500 text-xs hover:underline">항목 삭제</button></div>
                      </div>
                    ))}
                    <button onClick={() => addPerfItem(tabRow.id)} className="text-blue-600 text-xs hover:underline">+ 카드 추가</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA PHONE */}
        {tab === "cta" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-600 mb-1">상단 라벨 (KO)</label><input type="text" value={value.ctaPhone.label_ko} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, label_ko: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Top Label (EN)</label><input type="text" value={value.ctaPhone.label_en} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, label_en: e.target.value } })} className={inputCls} /></div>
            <div className="md:col-span-2"><label className="block text-xs text-gray-600 mb-1">전화번호</label><input type="text" value={value.ctaPhone.phone} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, phone: e.target.value } })} className={inputCls + " text-2xl font-bold"} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">설명 (KO)</label><input type="text" value={value.ctaPhone.description_ko} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, description_ko: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Description (EN)</label><input type="text" value={value.ctaPhone.description_en} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, description_en: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">버튼 라벨 (KO)</label><input type="text" value={value.ctaPhone.button_ko} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, button_ko: e.target.value } })} className={inputCls} /></div>
            <div><label className="block text-xs text-gray-600 mb-1">Button (EN)</label><input type="text" value={value.ctaPhone.button_en} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, button_en: e.target.value } })} className={inputCls} /></div>
            <div className="md:col-span-2"><label className="block text-xs text-gray-600 mb-1">버튼 링크</label><input type="text" value={value.ctaPhone.button_href} onChange={(e) => setValue({ ...value, ctaPhone: { ...value.ctaPhone, button_href: e.target.value } })} className={inputCls} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
