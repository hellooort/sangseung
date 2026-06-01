"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

export interface LedProductCard {
  id: string;
  name: string;
  href: string;
  image: string;
  specs_ko: string; // 줄바꿈으로 구분
  specs_en: string;
}

export interface LedFeatureItem {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

export interface LedPageData {
  hero: {
    badge_en: string;
    title_ko: string;
    title_en: string;
    description_ko: string;
    description_en: string;
    image: string;
    cta_label_ko: string;
    cta_label_en: string;
    cta_href: string;
  };
  productsHeading_ko: string;
  productsHeading_en: string;
  productsLead_ko: string;
  productsLead_en: string;
  products: LedProductCard[];
  featuresHeading_ko: string;
  featuresHeading_en: string;
  featuresLead_ko: string;
  featuresLead_en: string;
  features: LedFeatureItem[];
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

const fallback: LedPageData = {
  hero: {
    badge_en: "LED DISPLAY",
    title_ko: "LED 디스플레이",
    title_en: "LED Display",
    description_ko: "설계부터 제작, 시공, 유지보수까지 LED 디스플레이의 모든 것을 제공하는 원스톱 솔루션 전문 기업입니다.",
    description_en: "A one-stop solution specialist covering everything from design and manufacturing to installation and maintenance of LED displays.",
    image: "/image/reference/work_8.jpg",
    cta_label_ko: "설치사례 보기",
    cta_label_en: "View Projects",
    cta_href: "/works",
  },
  productsHeading_ko: "제품 라인업",
  productsHeading_en: "Product Lineup",
  productsLead_ko: "다양한 환경과 용도에 맞는 최적의 LED 솔루션을 제공합니다.",
  productsLead_en: "Optimal LED solutions for diverse environments and use cases.",
  products: [
    { id: newId(), name: "COB LED",       href: "/business/led/cob",     image: "/image/SCO-Wall/1-1.png",                    specs_ko: "전면 손상 방지·방수\n쉬운 청소\n낮은 픽셀 불량률",                    specs_en: "Front damage protection and waterproof\nEasy Cleaning\nLow Pixel Error Rate" },
    { id: newId(), name: "Indoor Fixed",  href: "/business/led/indoor",  image: "/image/S-Wall/2.jpg",                        specs_ko: "고화질 LED 비디오월\n지능형 전원 관리\n낮은 픽셀 불량률",              specs_en: "High Quality LED Video Wall\nIntelligent Power Management\nLow Pixel Error Rate" },
    { id: newId(), name: "Outdoor Fixed", href: "/business/led/outdoor", image: "/image/SOD-C/SOD-C_main_img_sample.jpg",     specs_ko: "이중 방수 설계\nP to P 병렬 연결\n전면·후면 유지보수 접근",            specs_en: "Double waterproof design\nP to P Parallel Connection\nFront and Rear Access for Maintenance" },
    { id: newId(), name: "Rental",        href: "/business/led/rental",  image: "/image/SFD/2.jpg",                           specs_ko: "빠른 설치\n지능형 모니터링\n다양한 설치 모드",                          specs_en: "Quick Installation\nIntelligent Management Monitoring\nVarious Installation Modes" },
    { id: newId(), name: "Media Facade",  href: "/business/led/facade",  image: "/image/SMI/1.jpg",                           specs_ko: "초슬림·경량\n높은 투과율\n창의적 디자인",                                specs_en: "Ultra Slim & Lightweight\nHigh Transparency\nCreative Design" },
    { id: newId(), name: "AD Sign",       href: "/business/led/adsign",  image: "/image/AD Cloud/AD Cloud_main.jpg",          specs_ko: "클라우드 기반 LED 디스플레이 시스템\n스마트 콘텐츠 제어\n개별·그룹 관리", specs_en: "Cloud Based LED Display System\nSmart Content Control\nIndividual and Group Management" },
  ],
  featuresHeading_ko: "왜 상승종합통신인가",
  featuresHeading_en: "Why SANGSEUNG?",
  featuresLead_ko: "20년 이상의 노하우와 기술력으로 최고의 LED 솔루션을 제공합니다.",
  featuresLead_en: "Over 20 years of know-how and technical expertise behind every LED solution.",
  features: [
    { id: newId(), title_ko: "자체 기술력",      title_en: "In-house Technology",     description_ko: "기업부설연구소 운영을 통한 지속적인 R&D와 자체 기술 개발",      description_en: "Continuous R&D and proprietary technology developed in our in-house research institute." },
    { id: newId(), title_ko: "자체 생산 공장",   title_en: "In-house Manufacturing",  description_ko: "양주공장과 중국공장 보유로 신속한 생산 및 품질 관리",            description_en: "Yangju and China factories ensure fast production and quality control." },
    { id: newId(), title_ko: "글로벌 네트워크", title_en: "Global Network",          description_ko: "태국, 일본, 중국 등 해외 지사 운영으로 글로벌 서비스 제공",       description_en: "Overseas branches in Thailand, Japan, and China deliver global services." },
    { id: newId(), title_ko: "원스톱 솔루션",    title_en: "One-Stop Solution",       description_ko: "기획, 설계, 제작, 시공, 유지보수까지 전 과정 일괄 수행",         description_en: "Planning, design, manufacturing, installation, and maintenance all in one place." },
  ],
  cta: {
    title_ko: "프로젝트 상담이 필요하신가요?",
    title_en: "Need help with your project?",
    description_ko: "전문 상담원이 귀사에 최적화된 LED 솔루션을 제안해 드립니다.",
    description_en: "Our specialists will propose the LED solution best suited to your business.",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
};

const inputCls = "w-full px-3 py-2 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";
const textareaCls = inputCls + " resize-y";

export default function AdminLedPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<LedPageData>("page_led", fallback);
  const [savedMsg, setSavedMsg] = useState(false);
  const [tab, setTab] = useState<"hero" | "products" | "features" | "cta">("hero");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };
  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>, onUrl: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingKey(key);
    try { const url = await uploadImage(file, "business/led"); onUrl(url); }
    catch (err) { alert(err instanceof Error ? err.message : "업로드 실패"); }
    finally { setUploadingKey(null); e.target.value = ""; }
  };

  const updateFeature = (id: string, patch: Partial<LedFeatureItem>) => setValue({ ...value, features: value.features.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  const addFeature = () => setValue({ ...value, features: [...value.features, { id: newId(), title_ko: "", title_en: "", description_ko: "", description_en: "" }] });
  const removeFeature = (id: string) => { if (!confirm("삭제?")) return; setValue({ ...value, features: value.features.filter((f) => f.id !== id) }); };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LED 디스플레이 페이지 관리</h1>
          <p className="text-sm text-gray-500 mt-1">/business/led 페이지의 모든 섹션을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ id: "hero", label: "Hero" }, { id: "products", label: "제품 라인업" }, { id: "features", label: "왜 상승종합통신" }, { id: "cta", label: "하단 CTA" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}>{t.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {tab === "hero" && (
          <div className="space-y-4">
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
              <div><label className="block text-xs text-gray-600 mb-1">CTA 라벨 (KO)</label><input value={value.hero.cta_label_ko} onChange={(e) => setValue({ ...value, hero: { ...value.hero, cta_label_ko: e.target.value } })} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-600 mb-1">CTA Label (EN)</label><input value={value.hero.cta_label_en} onChange={(e) => setValue({ ...value, hero: { ...value.hero, cta_label_en: e.target.value } })} className={inputCls} /></div>
              <div className="md:col-span-2"><label className="block text-xs text-gray-600 mb-1">CTA 링크</label><input value={value.hero.cta_href} onChange={(e) => setValue({ ...value, hero: { ...value.hero, cta_href: e.target.value } })} className={inputCls} /></div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input value={value.productsHeading_ko} onChange={(e) => setValue({ ...value, productsHeading_ko: e.target.value })} placeholder="섹션 제목 (KO)" className={inputCls + " font-semibold"} />
              <input value={value.productsHeading_en} onChange={(e) => setValue({ ...value, productsHeading_en: e.target.value })} placeholder="Heading (EN)" className={inputCls} />
              <input value={value.productsLead_ko} onChange={(e) => setValue({ ...value, productsLead_ko: e.target.value })} placeholder="섹션 리드 (KO)" className={inputCls} />
              <input value={value.productsLead_en} onChange={(e) => setValue({ ...value, productsLead_en: e.target.value })} placeholder="Lead (EN)" className={inputCls} />
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-semibold mb-1">제품 카드는 이제 “제품 라인업”에서 자동으로 만들어집니다.</p>
              <p className="text-blue-800/80 leading-relaxed">
                카드(카테고리)의 추가·순서·이미지·스펙은{" "}
                <a href="/admin/business/products" className="font-semibold underline hover:text-blue-700">제품 라인업 관리</a>
                {" "}에서 관리하세요. 카테고리를 추가하면 이 페이지의 카드, 네비게이션, 카테고리 상세 페이지에 모두 자동 반영됩니다.
                여기서는 위의 <b>섹션 제목·문구</b>만 편집됩니다.
              </p>
            </div>
          </div>
        )}

        {tab === "features" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input value={value.featuresHeading_ko} onChange={(e) => setValue({ ...value, featuresHeading_ko: e.target.value })} placeholder="섹션 제목 (KO)" className={inputCls + " font-semibold"} />
              <input value={value.featuresHeading_en} onChange={(e) => setValue({ ...value, featuresHeading_en: e.target.value })} placeholder="Heading (EN)" className={inputCls} />
              <input value={value.featuresLead_ko} onChange={(e) => setValue({ ...value, featuresLead_ko: e.target.value })} placeholder="섹션 리드 (KO)" className={inputCls} />
              <input value={value.featuresLead_en} onChange={(e) => setValue({ ...value, featuresLead_en: e.target.value })} placeholder="Lead (EN)" className={inputCls} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">강점 카드</h2>
              <button onClick={addFeature} className="text-blue-600 text-sm hover:underline">+ 카드 추가</button>
            </div>
            <div className="space-y-3">
              {value.features.map((f) => (
                <div key={f.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input value={f.title_ko}       onChange={(e) => updateFeature(f.id, { title_ko: e.target.value })}       placeholder="제목 (KO)"       className={inputCls} />
                    <input value={f.title_en}       onChange={(e) => updateFeature(f.id, { title_en: e.target.value })}       placeholder="Title (EN)"      className={inputCls} />
                    <input value={f.description_ko} onChange={(e) => updateFeature(f.id, { description_ko: e.target.value })} placeholder="설명 (KO)"       className={inputCls} />
                    <input value={f.description_en} onChange={(e) => updateFeature(f.id, { description_en: e.target.value })} placeholder="Description (EN)" className={inputCls} />
                  </div>
                  <div className="text-right"><button onClick={() => removeFeature(f.id)} className="text-red-500 text-xs hover:underline">삭제</button></div>
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
