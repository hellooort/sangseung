import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">
              {t("회사소개", "Company Overview")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">ONE-STOP Solution</h2>
                <div className="text-[#888] leading-loose space-y-6">
                  <p>
                    {t(
                      "상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.",
                      "SANGSEUNG Co., Ltd. is a specialized manufacturer of network integration systems, IBS construction, and LED displays.",
                    )}
                  </p>
                  <p>
                    {t(
                      "디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.",
                      "We are a one-stop solution provider covering design, engineering, manufacturing, and installation.",
                    )}
                  </p>
                  <p>
                    {t(
                      "지속적인 연구개발(R&D)을 통해 고품질의 제품을 제공하기 위해 노력하고 있으며, 국내 및 해외 중요 프로젝트를 성공적으로 수행하며 글로벌 비즈니스 파트너로 성장하고 있습니다.",
                      "Through continuous R&D, we deliver high-quality products and have successfully executed major projects both at home and abroad, growing as a global business partner.",
                    )}
                  </p>
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
