"use client";

import { useState } from "react";

export default function AdminVideoWallPage() {
  const [headlineKo, setHeadlineKo] = useState("THE FUTURE OF VIDEO PROCESSING");
  const [headlineEn, setHeadlineEn] = useState("THE FUTURE OF VIDEO PROCESSING");
  const [descriptionKo, setDescriptionKo] = useState(
    "새로운 성능과 선명함의 시대로 들어서세요. CALICO PRO는 수백 개의 4K60 비디오 창을 지원하고, 10비트 색 심도로 대규모 환경에서도 부드럽고 사실적인 비주얼을 구현합니다.\n\n관제실, 방송 환경, 몰입형 체험 등 어떤 현장에서도 CALICO PRO는 전문 영상 프로세싱의 한계를 새롭게 정의합니다."
  );
  const [descriptionEn, setDescriptionEn] = useState(
    "Step into a new era of performance and clarity. CALICO PRO delivers unmatched flexibility with support for hundreds of 4K60 video windows and stunning 10-bit color depth enabling smooth, lifelike visuals at scale.\n\nWhether you're powering control rooms, broadcast environments, or immersive experiences, CALICO PRO redefines what's possible in professional video processing."
  );
  const [mainImage, setMainImage] = useState("/image/calico-pro.png");

  const [button1Label, setButton1Label] = useState("CALICO PRO 2200");
  const [button1Link, setButton1Link] = useState("https://tvone.com/");
  const [button2Label, setButton2Label] = useState("CALICO PRO 1200");
  const [button2Link, setButton2Link] = useState("https://tvone.com/");

  const [ctaTitleKo, setCtaTitleKo] = useState("Video-Wall 솔루션을 고려 중이신가요?");
  const [ctaTitleEn, setCtaTitleEn] = useState("Considering a Video-Wall solution?");
  const [ctaDescKo, setCtaDescKo] = useState("전문 엔지니어가 현장에 최적화된 Video-Wall 솔루션을 제안해 드립니다.");
  const [ctaDescEn, setCtaDescEn] = useState("Our experts will propose a Video-Wall solution optimized for your environment.");
  const [ctaButtonKo, setCtaButtonKo] = useState("문의하기");
  const [ctaButtonEn, setCtaButtonEn] = useState("Contact us");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log("Video-Wall 저장:", {
      headlineKo, headlineEn, descriptionKo, descriptionEn, mainImage,
      button1Label, button1Link, button2Label, button2Link,
      ctaTitleKo, ctaTitleEn, ctaDescKo, ctaDescEn, ctaButtonKo, ctaButtonEn,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video-Wall 관리</h1>
          <p className="text-sm text-gray-500 mt-1">CALICO PRO 소개 섹션과 CTA 영역을 관리합니다.</p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
          {saved ? "저장 완료!" : "저장"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">CALICO PRO 섹션</h2>

        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-600 mb-2">메인 이미지</label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage} alt="" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-xs text-gray-400">이미지 없음</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-blue-600 text-sm cursor-pointer hover:underline">
                이미지 업로드
                <input type="file" className="hidden" accept="image/*" />
              </label>
              <input
                type="text"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="/image/calico-pro.png"
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">헤드라인 (KO)</label>
            <input type="text" value={headlineKo} onChange={(e) => setHeadlineKo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Headline (EN)</label>
            <input type="text" value={headlineEn} onChange={(e) => setHeadlineEn(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <textarea value={descriptionKo} onChange={(e) => setDescriptionKo(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">제품 링크 버튼</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">버튼 1</label>
              <input type="text" value={button1Label} onChange={(e) => setButton1Label(e.target.value)} placeholder="버튼 텍스트" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={button1Link} onChange={(e) => setButton1Link(e.target.value)} placeholder="링크 URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">버튼 2</label>
              <input type="text" value={button2Label} onChange={(e) => setButton2Label(e.target.value)} placeholder="버튼 텍스트" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={button2Link} onChange={(e) => setButton2Link(e.target.value)} placeholder="링크 URL" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">하단 CTA (문의 유도)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">타이틀 (KO)</label>
            <input type="text" value={ctaTitleKo} onChange={(e) => setCtaTitleKo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (EN)</label>
            <input type="text" value={ctaTitleEn} onChange={(e) => setCtaTitleEn(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명 (KO)</label>
            <input type="text" value={ctaDescKo} onChange={(e) => setCtaDescKo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (EN)</label>
            <input type="text" value={ctaDescEn} onChange={(e) => setCtaDescEn(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">버튼 텍스트 (KO)</label>
            <input type="text" value={ctaButtonKo} onChange={(e) => setCtaButtonKo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Button Text (EN)</label>
            <input type="text" value={ctaButtonEn} onChange={(e) => setCtaButtonEn(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}