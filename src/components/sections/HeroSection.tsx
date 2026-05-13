import Link from "next/link";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr, type Locale } from "@/lib/locale";

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

const fallback: HeroData = {
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
  button2Ko: "설치사례 보기",
  button2En: "View Projects",
  button2Link: "/works",
};

export default async function HeroSection({ locale }: { locale: Locale }) {
  const data = await getSiteSetting<HeroData>("hero", fallback);

  return (
    <section className="relative w-full h-screen min-h-[100svh] supports-[height:100dvh]:h-[100dvh] bg-[#0A0A0A]">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/0 z-10" />
        <iframe
          src={data.youtubeUrl}
          title="Background Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "120vw", height: "1200vh", minWidth: "120vw", minHeight: "100vh" }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {data.badge && (
            <div className="mb-8">
              <span className="inline-block px-5 py-2 rounded-full border border-white/30 text-white/70 text-xs tracking-widest backdrop-blur-sm">
                {data.badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 drop-shadow-lg whitespace-pre-line break-keep">
            {tr(locale, data.titleKo, data.titleEn)}
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 drop-shadow-md whitespace-pre-line break-keep">
            {tr(locale, data.descriptionKo, data.descriptionEn)}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link
              href={data.button1Link || "/contact"}
              className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base font-semibold hover:bg-white/90 transition-colors"
            >
              {tr(locale, data.button1Ko, data.button1En)}
            </Link>
            <Link
              href={data.button2Link || "/works"}
              className="border border-white/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-base font-medium hover:bg-white/10 backdrop-blur-sm transition-colors"
            >
              {tr(locale, data.button2Ko, data.button2En)}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
