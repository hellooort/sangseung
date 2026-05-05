import type { Locale } from "@/lib/locale";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";
import ResultCounter from "./ResultCounter";

interface MainResultData {
  paragraphKo: string;
  paragraphEn: string;
  stat1Label_ko: string;
  stat1Label_en: string;
  stat1Value: number;
  stat1Suffix_ko: string;
  stat1Suffix_en: string;
  stat2Label_ko: string;
  stat2Label_en: string;
  stat2Value: number;
  stat2Suffix_ko: string;
  stat2Suffix_en: string;
}

const fallback: MainResultData = {
  paragraphKo: "2001년 창립 이후, 다양한 산업 분야에서 사이트 환경에 최적화된 솔루션과 높은 품질의 서비스를 제공하며 새로운 고객경험을 창출하고 역량을 입증해왔으며, 현재는 사업 영역을 확장하며 지속적인 성장을 이어가고 있습니다.",
  paragraphEn: "Since our founding in 2001, we have proven our capability across diverse industries by delivering site-optimized solutions and high-quality service. Today we continue to grow by expanding our business areas.",
  stat1Label_ko: "프로젝트",
  stat1Label_en: "Projects",
  stat1Value: 200,
  stat1Suffix_ko: "건",
  stat1Suffix_en: "",
  stat2Label_ko: "고객사",
  stat2Label_en: "Clients",
  stat2Value: 120,
  stat2Suffix_ko: "개사",
  stat2Suffix_en: "",
};

export default async function ResultSection({ locale }: { locale: Locale }) {
  const data = await getSiteSetting<MainResultData>("main_result", fallback);
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="lg:w-1/3">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-6 block">
              RESULT
            </span>
            <p className="text-[#888] text-sm leading-loose">
              {tr(locale, data.paragraphKo, data.paragraphEn)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-16 lg:gap-24">
            <ResultCounter
              label={tr(locale, data.stat1Label_ko, data.stat1Label_en)}
              suffix={tr(locale, data.stat1Suffix_ko, data.stat1Suffix_en)}
              end={data.stat1Value}
              color="text-white"
            />
            <ResultCounter
              label={tr(locale, data.stat2Label_ko, data.stat2Label_en)}
              suffix={tr(locale, data.stat2Suffix_ko, data.stat2Suffix_en)}
              end={data.stat2Value}
              color="text-[#4A90D9]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
