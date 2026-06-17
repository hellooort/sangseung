"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface GreetingData {
  titleKo: string;
  titleEn: string;
  contentKo: string;
  contentEn: string;
}

const defaultGreeting: GreetingData = {
  titleKo: "신뢰와 기술로 미래를 연결합니다",
  titleEn: "Connecting the Future with Trust and Technology",
  contentKo:
    "안녕하십니까, 상승종합통신㈜ 대표이사입니다.\n\n저희 회사는 2001년 설립 이래 네트워크 인프라 구축과 LED 디스플레이 분야에서 20년 이상의 경험과 기술력을 바탕으로 고객 여러분께 최고의 솔루션을 제공해 왔습니다.\n\n앞으로도 변함없는 신뢰와 혁신적인 기술로 고객 여러분의 성공적인 비즈니스를 지원하겠습니다.\n\n감사합니다.",
  contentEn:
    "Welcome to SANGSEUNG Co., Ltd.\n\nSince our establishment in 2001, we have been providing top-tier solutions in network infrastructure and LED display systems with over 20 years of experience.\n\nThank you.",
};

export default function AdminGreetingPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<GreetingData>(
    "greeting",
    defaultGreeting,
  );
  const [savedMsg, setSavedMsg] = useState(false);

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

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">인사말 관리</h1>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
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
                value={value.titleKo}
                onChange={(e) => setValue({ ...value, titleKo: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">본문</label>
              <textarea
                value={value.contentKo}
                onChange={(e) => setValue({ ...value, contentKo: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              />
            </div>
          </div>
        </div>

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
                value={value.titleEn}
                onChange={(e) => setValue({ ...value, titleEn: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <textarea
                value={value.contentEn}
                onChange={(e) => setValue({ ...value, contentEn: e.target.value })}
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