"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface HeroData {
  youtubeUrl: string;
  badge: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  button1Ko: string;
  button1En: string;
  button1Link: string;
  button2Ko: string;
  button2En: string;
  button2Link: string;
}

const defaultHero: HeroData = {
  youtubeUrl:
    "https://www.youtube.com/embed/3GzbSKluk3A?autoplay=1&mute=1&loop=1&playlist=3GzbSKluk3A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1",
  badge: "ONE-STOP SOLUTION",
  titleKo: "네트워크에서 LED까지\n디지털 인프라의 새로운 기준",
  titleEn: "From Network to LED\nThe New Standard for Digital Infrastructure",
  descriptionKo:
    "상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.\n디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.",
  descriptionEn:
    "Sangseung Communications specializes in integrated network systems, IBS, and LED display manufacturing.\nWe deliver One-Stop Solutions covering design, engineering, production, and installation.",
  button1Ko: "문의하기",
  button1En: "Contact us",
  button1Link: "/contact",
  button2Ko: "시공사례 보기",
  button2En: "View Projects",
  button2Link: "/works",
};

export default function AdminMainHeroPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<HeroData>(
    "hero",
    defaultHero,
  );
  const [savedMsg, setSavedMsg] = useState(false);

  const update = <K extends keyof HeroData>(k: K, v: HeroData[K]) => {
    setValue({ ...value, [k]: v });
  };

  const handleSave = async () => {
    const ok = await save();
    if (ok) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
    }
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 페이지 - 히어로 섹션</h1>
          <p className="text-sm text-gray-500 mt-1">메인 화면 최상단의 영상과 문구, 버튼을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">배경 영상 (YouTube)</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube Embed URL</label>
        <input
          type="text"
          value={value.youtubeUrl}
          onChange={(e) => update("youtubeUrl", e.target.value)}
          placeholder="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <p className="text-xs text-gray-400 mt-2">
          일반 <code>watch?v=VIDEO_ID</code> 주소가 아닌 <code>embed/VIDEO_ID</code> 형식의 URL을 사용해야 합니다.
          자동재생/무한반복을 위해 <code>?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=VIDEO_ID&amp;controls=0&amp;modestbranding=1&amp;playsinline=1</code> 옵션을 함께 붙여주세요.
        </p>

        {value.youtubeUrl && (
          <div className="mt-5">
            <p className="text-xs font-medium text-gray-500 mb-2">미리보기</p>
            <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-2xl">
              <iframe
                src={value.youtubeUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상단 뱃지</h2>
        <input
          type="text"
          value={value.badge}
          onChange={(e) => update("badge", e.target.value)}
          placeholder="ONE-STOP SOLUTION"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">KO</span>
            한국어
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">메인 타이틀</label>
              <textarea value={value.titleKo} onChange={(e) => update("titleKo", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              <p className="text-xs text-gray-400 mt-1">줄바꿈은 Enter 로 입력하세요.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">설명 문구</label>
              <textarea value={value.descriptionKo} onChange={(e) => update("descriptionKo", e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">EN</span>
            English
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Title</label>
              <textarea value={value.titleEn} onChange={(e) => update("titleEn", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={value.descriptionEn} onChange={(e) => update("descriptionEn", e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">버튼</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">버튼 1 (주요)</p>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" value={value.button1Ko} onChange={(e) => update("button1Ko", e.target.value)} placeholder="한국어 텍스트" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={value.button1En} onChange={(e) => update("button1En", e.target.value)} placeholder="English text" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <input type="text" value={value.button1Link} onChange={(e) => update("button1Link", e.target.value)} placeholder="/contact" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">버튼 2 (보조)</p>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" value={value.button2Ko} onChange={(e) => update("button2Ko", e.target.value)} placeholder="한국어 텍스트" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={value.button2En} onChange={(e) => update("button2En", e.target.value)} placeholder="English text" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <input type="text" value={value.button2Link} onChange={(e) => update("button2Link", e.target.value)} placeholder="/works" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}