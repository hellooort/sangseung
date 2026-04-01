"use client";

import { useState } from "react";

export default function AdminHeroPage() {
  const [videoType, setVideoType] = useState<"youtube" | "file">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/embed/VIDEO_ID");
  const [titleKo, setTitleKo] = useState("대형 LED 전광판\n네트워크 인프라\n통합 빌딩 시스템");
  const [titleEn, setTitleEn] = useState("Large LED Display\nNetwork Infrastructure\nIntegrated Building System");
  const [subtitleKo, setSubtitleKo] = useState("설계부터 시공, 유지보수까지 ONE-STOP SOLUTION");
  const [subtitleEn, setSubtitleEn] = useState("From Design to Construction, Maintenance - ONE-STOP SOLUTION");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log("메인 영상 저장:", { videoType, youtubeUrl, titleKo, titleEn, subtitleKo, subtitleEn });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">메인 영상 관리</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 영상 설정 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">배경 영상</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={() => setVideoType("youtube")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${videoType === "youtube" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              YouTube 영상
            </button>
            <button
              onClick={() => setVideoType("file")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${videoType === "file" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              영상 파일 업로드
            </button>
          </div>

          {videoType === "youtube" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube Embed URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-2">YouTube 영상 URL에서 &apos;watch?v=&apos; 를 &apos;embed/&apos; 로 변경하세요</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-blue-600 mb-1">영상 파일을 선택하세요</p>
                <p className="text-xs text-gray-400">MP4, WebM (최대 100MB)</p>
                <input type="file" className="hidden" accept="video/*" />
              </label>
            </div>
          )}

          {/* 미리보기 */}
          {videoType === "youtube" && youtubeUrl && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-2xl">
              <iframe
                src={youtubeUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      {/* 텍스트 설정 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold">KO</span>
            한국어
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">메인 타이틀</label>
              <textarea
                value={titleKo}
                onChange={(e) => setTitleKo(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">서브 타이틀</label>
              <input
                type="text"
                value={subtitleKo}
                onChange={(e) => setSubtitleKo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
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
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
              <input
                type="text"
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
