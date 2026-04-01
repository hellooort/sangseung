"use client";

import { useState } from "react";

export default function AdminGreetingPage() {
  const [titleKo, setTitleKo] = useState("신뢰와 기술로 미래를 연결합니다");
  const [titleEn, setTitleEn] = useState("Connecting the Future with Trust and Technology");
  const [contentKo, setContentKo] = useState(
    "안녕하십니까, 상승종합통신㈜ 대표이사입니다.\n\n저희 회사는 2001년 설립 이래 네트워크 인프라 구축과 LED 디스플레이 분야에서 20년 이상의 경험과 기술력을 바탕으로 고객 여러분께 최고의 솔루션을 제공해 왔습니다.\n\n앞으로도 변함없는 신뢰와 혁신적인 기술로 고객 여러분의 성공적인 비즈니스를 지원하겠습니다.\n\n감사합니다."
  );
  const [contentEn, setContentEn] = useState(
    "Welcome to SANGSEUNG Co., Ltd.\n\nSince our establishment in 2001, we have been providing top-tier solutions in network infrastructure and LED display systems with over 20 years of experience.\n\nThank you."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Supabase 저장
    console.log("인사말 저장:", { titleKo, titleEn, contentKo, contentEn });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">인사말 관리</h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="space-y-8">
        {/* 한국어 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">KO</span>
            한국어
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">제목</label>
              <input
                type="text"
                value={titleKo}
                onChange={(e) => setTitleKo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">본문</label>
              <textarea
                value={contentKo}
                onChange={(e) => setContentKo(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              />
            </div>
          </div>
        </div>

        {/* 영어 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">EN</span>
            English
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
