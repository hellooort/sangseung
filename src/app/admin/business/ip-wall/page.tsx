"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteSetting } from "@/lib/supabase/hooks";
import { uploadImage } from "@/lib/supabase/storage";

interface VideoWallData {
  headlineKo: string;
  headlineEn: string;
  descriptionKo: string;
  descriptionEn: string;
  mainImage: string;
  button1Label: string;
  button1Link: string;
  button2Label: string;
  button2Link: string;
  ctaTitleKo: string;
  ctaTitleEn: string;
  ctaDescKo: string;
  ctaDescEn: string;
  ctaButtonKo: string;
  ctaButtonEn: string;
}

const defaultData: VideoWallData = {
  headlineKo: "THE FUTURE OF VIDEO PROCESSING",
  headlineEn: "THE FUTURE OF VIDEO PROCESSING",
  descriptionKo:
    "새로운 성능과 선명함의 시대로 들어서세요. CALICO PRO는 수백 개의 4K60 비디오 창을 지원하고, 10비트 색 심도로 대규모 환경에서도 부드럽고 사실적인 비주얼을 구현합니다.\n\n관제실, 방송 환경, 몰입형 체험 등 어떤 현장에서도 CALICO PRO는 전문 영상 프로세싱의 한계를 새롭게 정의합니다.",
  descriptionEn:
    "Step into a new era of performance and clarity. CALICO PRO delivers unmatched flexibility with support for hundreds of 4K60 video windows and stunning 10-bit color depth enabling smooth, lifelike visuals at scale.\n\nWhether you're powering control rooms, broadcast environments, or immersive experiences, CALICO PRO redefines what's possible in professional video processing.",
  mainImage: "/image/calico-pro.png",
  button1Label: "CALICO PRO 2200",
  button1Link: "https://tvone.com/",
  button2Label: "CALICO PRO 1200",
  button2Link: "https://tvone.com/",
  ctaTitleKo: "Video-Wall 솔루션을 고려 중이신가요?",
  ctaTitleEn: "Considering a Video-Wall solution?",
  ctaDescKo: "전문 엔지니어가 현장에 최적화된 Video-Wall 솔루션을 제안해 드립니다.",
  ctaDescEn: "Our experts will propose a Video-Wall solution optimized for your environment.",
  ctaButtonKo: "문의하기",
  ctaButtonEn: "Contact us",
};

export default function AdminVideoWallPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<VideoWallData>(
    "video_wall",
    defaultData,
  );
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploading, setUploading] = useState(false);

  const update = <K extends keyof VideoWallData>(k: K, v: VideoWallData[K]) =>
    setValue({ ...value, [k]: v });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "video-wall");
      update("mainImage", url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
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

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video-Wall 관리</h1>
          <p className="text-sm text-gray-500 mt-1">CALICO PRO 소개 섹션과 CTA 영역을 관리합니다.</p>
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">CALICO PRO 섹션</h2>

        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-600 mb-2">메인 이미지</label>
          <div className="flex items-center gap-4">
            <div className="relative w-40 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {value.mainImage ? (
                <Image src={value.mainImage} alt="" fill className="object-contain" unoptimized />
              ) : (
                <span className="text-xs text-gray-400">이미지 없음</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                {uploading ? "업로드 중..." : "이미지 업로드"}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <input
                type="text"
                value={value.mainImage}
                onChange={(e) => update("mainImage", e.target.value)}
                placeholder="/image/calico-pro.png"
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">헤드라인 (KO)</label>
            <input type="text" value={value.headlineKo} onChange={(e) => update("headlineKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Headline (EN)</label>
            <input type="text" value={value.headlineEn} onChange={(e) => update("headlineEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <textarea value={value.descriptionKo} onChange={(e) => update("descriptionKo", e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <textarea value={value.descriptionEn} onChange={(e) => update("descriptionEn", e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">제품 링크 버튼</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">버튼 1</label>
              <input type="text" value={value.button1Label} onChange={(e) => update("button1Label", e.target.value)} placeholder="버튼 텍스트" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={value.button1Link} onChange={(e) => update("button1Link", e.target.value)} placeholder="링크 URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">버튼 2</label>
              <input type="text" value={value.button2Label} onChange={(e) => update("button2Label", e.target.value)} placeholder="버튼 텍스트" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={value.button2Link} onChange={(e) => update("button2Link", e.target.value)} placeholder="링크 URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">하단 CTA (문의 유도)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">타이틀 (KO)</label>
            <input type="text" value={value.ctaTitleKo} onChange={(e) => update("ctaTitleKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
            <input type="text" value={value.ctaTitleEn} onChange={(e) => update("ctaTitleEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <input type="text" value={value.ctaDescKo} onChange={(e) => update("ctaDescKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <input type="text" value={value.ctaDescEn} onChange={(e) => update("ctaDescEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">버튼 텍스트 (KO)</label>
            <input type="text" value={value.ctaButtonKo} onChange={(e) => update("ctaButtonKo", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Button Text (EN)</label>
            <input type="text" value={value.ctaButtonEn} onChange={(e) => update("ctaButtonEn", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}