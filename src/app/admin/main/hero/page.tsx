"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadFile } from "@/lib/supabase/storage";

interface HeroData {
  videoType: "youtube" | "file";
  youtubeUrl: string;
  videoFileUrl: string;
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
  videoType: "youtube",
  youtubeUrl:
    "https://www.youtube.com/embed/3GzbSKluk3A?autoplay=1&mute=1&loop=1&playlist=3GzbSKluk3A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1",
  videoFileUrl: "",
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const update = <K extends keyof HeroData>(k: K, v: HeroData[K]) => {
    setValue({ ...value, [k]: v });
  };

  const handleVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const result = await uploadFile(file, "hero-videos");
      setValue({ ...value, videoFileUrl: result.url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    const ok = await save();
    if (ok) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-sm">로딩 중...</div>;
  }

  const previewSrc = value.videoType === "youtube" ? value.youtubeUrl : value.videoFileUrl;

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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">배경 영상</h2>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => update("videoType", "youtube")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              value.videoType === "youtube" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            YouTube 영상
          </button>
          <button
            onClick={() => update("videoType", "file")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              value.videoType === "file" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            영상 파일 업로드
          </button>
        </div>

        {value.videoType === "youtube" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube Embed URL</label>
            <input
              type="text"
              value={value.youtubeUrl}
              onChange={(e) => update("youtubeUrl", e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <p className="text-xs text-gray-400 mt-2">
              YouTube 영상 URL에서 <code>watch?v=</code>를 <code>embed/</code>로 바꾸어 사용하세요.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-blue-600 mb-1">
                  {uploading ? "업로드 중..." : "영상 파일을 선택하세요"}
                </p>
                <p className="text-xs text-gray-400">MP4, WebM (권장 10MB 이하)</p>
                <input type="file" className="hidden" accept="video/*" onChange={handleVideoFile} disabled={uploading} />
              </label>
            </div>
            {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
            <input
              type="text"
              value={value.videoFileUrl}
              onChange={(e) => update("videoFileUrl", e.target.value)}
              placeholder="업로드 후 URL이 자동 입력됩니다"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {previewSrc && (
          <div className="mt-5">
            <p className="text-xs font-medium text-gray-500 mb-2">미리보기</p>
            <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-2xl">
              {value.videoType === "youtube" ? (
                <iframe src={previewSrc} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
              ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={previewSrc} controls className="w-full h-full" />
              )}
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
        <p className="text-xs text-gray-400 mt-2">타이틀 위에 표시되는 작은 라운드 뱃지 문구입니다.</p>
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
              <textarea
                value={value.titleKo}
                onChange={(e) => update("titleKo", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
              <p className="text-xs text-gray-400 mt-1">줄바꿈은 Enter 로 입력하세요.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">설명 문구</label>
              <textarea
                value={value.descriptionKo}
                onChange={(e) => update("descriptionKo", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
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
              <textarea
                value={value.titleEn}
                onChange={(e) => update("titleEn", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={value.descriptionEn}
                onChange={(e) => update("descriptionEn", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
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