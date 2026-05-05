import type { Locale } from "@/lib/locale";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface MainAboutData {
  headlineKo: string;
  headlineEn: string;
  paragraph1Ko: string;
  paragraph1En: string;
  paragraph2Ko: string;
  paragraph2En: string;
  bigTextLine1: string;
  bigTextLine2: string;
}

const fallback: MainAboutData = {
  headlineKo: "디지털 미디어 솔루션을 통해\n미래를 선도하는\n새로운 기준을 제시합니다.",
  headlineEn: "Setting a new standard\nfor the future through\ndigital media solutions.",
  paragraph1Ko: "상승종합통신은 디지털 미디어 기반의 공간을 구성하고 사용자 경험을 향상시키는\nUX/UI와 매력적인 디지털 콘텐츠를 제공하는 미디어 크리에이티브 그룹입니다.",
  paragraph1En: "Sangseung is a media-creative group that designs digital-media-based spaces\nand delivers immersive UX/UI and engaging digital content.",
  paragraph2Ko: "문제를 해결하고 가치를 만들어내는 개념을 바탕으로\n환경, 서비스, 사용자가 서로 유기적으로 연결될 수 있는 방안에 대해 연구하며\n공간과 미디어의 시너지 포인트를 찾아 최상의 서비스를 제공합니다.",
  paragraph2En: "Built on the principle of solving problems and creating value,\nwe research how environment, service, and user can connect organically\nand find the synergy point between space and media to deliver the best service.",
  bigTextLine1: "DIGITAL",
  bigTextLine2: "INNOVATION",
};

export default async function AboutSection({ locale }: { locale: Locale }) {
  const data = await getSiteSetting<MainAboutData>("main_about", fallback);
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-8 whitespace-pre-line">
              {tr(locale, data.headlineKo, data.headlineEn)}
            </h2>
            <p className="text-[#888] text-sm leading-loose whitespace-pre-line">
              {tr(locale, data.paragraph1Ko, data.paragraph1En)}
            </p>
            <p className="text-[#888] text-sm leading-loose mt-6 whitespace-pre-line">
              {tr(locale, data.paragraph2Ko, data.paragraph2En)}
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-2 lg:items-end">
            <span className="text-[#333] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              {data.bigTextLine1}
            </span>
            <span className="text-[#333] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              {data.bigTextLine2}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
