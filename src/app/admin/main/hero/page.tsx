"use client";

import { useState } from "react";

export default function AdminMainHeroPage() {
  const [videoType, setVideoType] = useState<"youtube" | "file">("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/embed/3GzbSKluk3A?autoplay=1&mute=1&loop=1&playlist=3GzbSKluk3A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
  );
  const [videoFileUrl, setVideoFileUrl] = useState("");

  const [badge, setBadge] = useState("ONE-STOP SOLUTION");

  const [titleKo, setTitleKo] = useState("네트워크에서 LED까지\n디지털 인프라의 새로운 기준");
  const [titleEn, setTitleEn] = useState("From Network to LED\nThe New Standard for Digital Infrastructure");

  const [descriptionKo, setDescriptionKo] = useState(
    "상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.\n디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다."
  );
  const [descriptionEn, setDescriptionEn] = useState(
    "Sangseung Communications specializes in integrated network systems, IBS, and LED display manufacturing.\nWe deliver One-Stop Solutions covering design, engineering, production, and installation."
  );

  const [button1Ko, setButton1Ko] = useState("문의하기");
  const [button1En, setButton1En] = useState("Contact us");
  const [button1Link, setButton1Link] = useState("/contact");

  const [button2Ko, setButton2Ko] = useState("시공사례 보기");
  const [button2En, setButton2En] = useState("View Projects");
  const [button2Link, setButton2Link] = useState("/works");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log("Hero 저장:", {
      videoType, youtubeUrl, videoFileUrl,
      badge,
      titleKo, titleEn, descriptionKo, descriptionEn,
      button1Ko, button1En, button1Link,
      button2Ko, button2En, button2Link,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const previewSrc = videoType === "youtube" ? youtubeUrl : videoFileUrl;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인 페이지 - 히어로 섹션</h1>
          <p className="text-sm text-gray-500 mt-1">메인 화면 최상단의 영상과 문구, 버튼을 관리합니다.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      {/* 배경 영상 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">배경 영상</h2>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setVideoType("youtube")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              videoType === "youtube" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            YouTube 영상
          </button>
          <button
            onClick={() => setVideoType("file")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              videoType === "file" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
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
              placeholder="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <p className="text-xs text-gray-400 mt-2">
              YouTube 영상 URL에서 <code>watch?v=</code>를 <code>embed/</code>로 바꾸어 사용하세요. 자동재생/음소거 파라미터도 함께 넣는 것을 권장합니다.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-blue-600 mb-1">영상 파일을 선택하세요</p>
                <p className="text-xs text-gray-400">MP4, WebM (권장 10MB 이하, 최대 100MB)</p>
                <input type="file" className="hidden" accept="video/*" />
              </label>
            </div>
            <input
              type="text"
              value={videoFileUrl}
              onChange={(e) => setVideoFileUrl(e.target.value)}
              placeholder="업로드 후 URL이 자동 입력됩니다"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {previewSrc && (
          <div className="mt-5">
            <p className="text-xs font-medium text-gray-500 mb-2">미리보기</p>
            <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-2xl">
              {videoType === "youtube" ? (
                <iframe
                  src={previewSrc}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={previewSrc} controls className="w-full h-full" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* 뱃지 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상단 뱃지</h2>
        <input
          type="text"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="ONE-STOP SOLUTION"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-2">타이틀 위에 표시되는 작은 라운드 뱃지 문구입니다.</p>
      </div>

      {/* 메인 타이틀 + 설명 */}
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
                value={titleKo}
                onChange={(e) => setTitleKo(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
              <p className="text-xs text-gray-400 mt-1">줄바꿈은 Enter 로 입력하세요.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">설명 문구</label>
              <textarea
                value={descriptionKo}
                onChange={(e) => setDescriptionKo(e.target.value)}
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
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">버튼</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">버튼 1 (주요)</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={button1Ko}
                onChange={(e) => setButton1Ko(e.target.value)}
                placeholder="한국어 텍스트"
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={button1En}
                onChange={(e) => setButton1En(e.target.value)}
                placeholder="English text"
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              value={button1Link}
              onChange={(e) => setButton1Link(e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">버튼 2 (보조)</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={button2Ko}
                onChange={(e) => setButton2Ko(e.target.value)}
                placeholder="한국어 텍스트"
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={button2En}
                onChange={(e) => setButton2En(e.target.value)}
                placeholder="English text"
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              value={button2Link}
              onChange={(e) => setButton2Link(e.target.value)}
              placeholder="/works"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}