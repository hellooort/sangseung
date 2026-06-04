import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface VideoWallData {
  headlineKo: string;
  headlineEn: string;
  descriptionKo: string;
  descriptionEn: string;
  mainImage: string;
  /** @deprecated 이전 단일 라벨 — 신규에는 button1Label_ko/en 사용 */
  button1Label?: string;
  button1Label_ko?: string;
  button1Label_en?: string;
  button1Link: string;
  /** @deprecated */
  button2Label?: string;
  button2Label_ko?: string;
  button2Label_en?: string;
  button2Link: string;
  ctaTitleKo: string;
  ctaTitleEn: string;
  ctaDescKo: string;
  ctaDescEn: string;
  ctaButtonKo: string;
  ctaButtonEn: string;
}

const fallback: VideoWallData = {
  headlineKo: "THE FUTURE OF VIDEO PROCESSING",
  headlineEn: "THE FUTURE OF VIDEO PROCESSING",
  descriptionKo:
    "성능과 화질의 새로운 시대로 진입하세요. CALICO PRO는 수백 개의 4K60 비디오 창과 놀라운 10비트 색 심도를 지원하여, 대규모 환경에서도 부드럽고 사실적인 영상을 제공합니다.\n\n관제실, 방송 환경, 몰입형 경험까지 — CALICO PRO는 전문 비디오 프로세싱의 가능성을 새롭게 정의합니다.",
  descriptionEn:
    "Step into a new era of performance and clarity. CALICO PRO delivers unmatched flexibility with support for hundreds of 4K60 video windows and stunning 10-bit color depth — enabling smooth, lifelike visuals at scale.\n\nWhether you're powering control rooms, broadcast environments, or immersive experiences, CALICO PRO redefines what's possible in professional video processing.",
  mainImage: "/image/calico-pro.png",
  button1Label_ko: "CALICO PRO 2200",
  button1Label_en: "CALICO PRO 2200",
  button1Link: "https://tvone.com/",
  button2Label_ko: "CALICO PRO 1200",
  button2Label_en: "CALICO PRO 1200",
  button2Link: "https://tvone.com/",
  ctaTitleKo: "Video-Wall 도입을 검토하고 계신가요?",
  ctaTitleEn: "Considering a Video-Wall solution?",
  ctaDescKo: "전문 상담원이 귀사의 환경에 최적화된 Video-Wall 솔루션을 제안해 드립니다.",
  ctaDescEn: "Our experts will propose a video-wall solution tailored to your environment.",
  ctaButtonKo: "문의하기",
  ctaButtonEn: "Contact us",
};

export default async function IPWallPage() {
  const locale = await getLocale();
  const data = await getSiteSetting<VideoWallData>("video_wall", fallback);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image src={data.mainImage || "/image/calico-pro.png"} alt="CALICO PRO" width={900} height={720} className="w-full h-auto" priority unoptimized />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 whitespace-pre-line">
                {tr(locale, data.headlineKo, data.headlineEn)}
              </h2>

              <div className="space-y-5 text-[#ccc] text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line">
                <p>{tr(locale, data.descriptionKo, data.descriptionEn)}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {(() => {
                  const btn1 = tr(locale, data.button1Label_ko ?? data.button1Label, data.button1Label_en ?? data.button1Label);
                  const btn2 = tr(locale, data.button2Label_ko ?? data.button2Label, data.button2Label_en ?? data.button2Label);
                  return (
                    <>
                      {btn1 && (
                        <a
                          href={data.button1Link || "#"}
                          target={data.button1Link?.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 border-2 border-[#4A90D9] text-[#4A90D9] hover:bg-[#4A90D9] hover:text-white px-7 py-3.5 rounded font-semibold transition-colors"
                        >
                          {btn1}
                        </a>
                      )}
                      {btn2 && (
                        <a
                          href={data.button2Link || "#"}
                          target={data.button2Link?.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 border-2 border-[#4A90D9] text-[#4A90D9] hover:bg-[#4A90D9] hover:text-white px-7 py-3.5 rounded font-semibold transition-colors"
                        >
                          {btn2}
                        </a>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="https://tvone.com/wp-content/uploads/2025/04/CALICO_SimplifyLED-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {tr(locale, data.ctaTitleKo, data.ctaTitleEn)}
          </h2>
          <p className="text-white/80 mb-8">
            {tr(locale, data.ctaDescKo, data.ctaDescEn)}
          </p>
          <Link href="/contact" className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors">
            {tr(locale, data.ctaButtonKo, data.ctaButtonEn)}
          </Link>
        </div>
      </section>
    </>
  );
}
