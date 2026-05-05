import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface GreetingData {
  titleKo: string;
  titleEn: string;
  contentKo: string;
  contentEn: string;
}

const fallback: GreetingData = {
  titleKo: "신뢰와 기술로 미래를 연결합니다",
  titleEn: "Connecting the Future with Trust and Technology",
  contentKo:
    "안녕하십니까, 상승종합통신㈜ 대표이사입니다.\n\n저희 회사는 2001년 설립 이래 네트워크 인프라 구축과 LED 디스플레이 분야에서 20년 이상의 경험과 기술력을 바탕으로 고객 여러분께 최고의 솔루션을 제공해 왔습니다.\n\n앞으로도 변함없는 신뢰와 혁신적인 기술로 고객 여러분의 성공적인 비즈니스를 지원하겠습니다.\n\n감사합니다.",
  contentEn:
    "Welcome to SANGSEUNG Co., Ltd.\n\nSince our establishment in 2001, we have been providing top-tier solutions in network infrastructure and LED display systems with over 20 years of experience.\n\nThank you.",
};

export default async function AboutPage() {
  const [locale, greeting] = await Promise.all([
    getLocale(),
    getSiteSetting<GreetingData>("greeting", fallback),
  ]);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const title = tr(locale, greeting.titleKo, greeting.titleEn);
  const content = tr(locale, greeting.contentKo, greeting.contentEn);

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
              {t("회사소개", "Company Overview")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug whitespace-pre-line">
                  {title}
                </h2>
                <div className="text-[#cfcfcf] leading-loose whitespace-pre-line text-base md:text-[15px]">
                  {content}
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  {t("회사 정보", "Company Information")}
                </h3>
                <dl className="space-y-4">
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-28 flex-shrink-0">{t("회사명", "Company")}</dt>
                    <dd className="text-white">{t("상승종합통신㈜", "SANGSEUNG Co., Ltd.")}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-28 flex-shrink-0">{t("영문명", "English Name")}</dt>
                    <dd className="text-white">SANGSEUNG Co., Ltd.</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-28 flex-shrink-0">{t("대표이사", "CEO")}</dt>
                    <dd className="text-white">{t("조남각", "Jo Nam-gak")}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-28 flex-shrink-0">{t("설립년도", "Founded")}</dt>
                    <dd className="text-white">{t("2001년", "2001")}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-28 flex-shrink-0">{t("사업분야", "Business Areas")}</dt>
                    <dd className="text-white">NI, LED Display, SI, Media Façade, Network, IBS</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
