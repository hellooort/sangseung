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

const iconCls = "w-5 h-5";

const companyInfo = [
  {
    labelKo: "회사명", labelEn: "Company",
    valueKo: "상승종합통신㈜", valueEn: "SANGSEUNG Co., Ltd.",
    icon: (
      <svg className={iconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
  {
    labelKo: "영문명", labelEn: "English Name",
    valueKo: "SANGSEUNG Co., Ltd.", valueEn: "SANGSEUNG Co., Ltd.",
    icon: (
      <svg className={iconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" /></svg>
    ),
  },
  {
    labelKo: "대표이사", labelEn: "CEO",
    valueKo: "조남각", valueEn: "Jo Nam-gak",
    icon: (
      <svg className={iconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    ),
  },
  {
    labelKo: "설립년도", labelEn: "Founded",
    valueKo: "2001년", valueEn: "2001",
    icon: (
      <svg className={iconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    labelKo: "사업분야", labelEn: "Business Areas",
    valueKo: "NI, LED Display, SI, Media Façade, Network, IBS",
    valueEn: "NI, LED Display, SI, Media Façade, Network, IBS",
    icon: (
      <svg className={iconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    ),
  },
];

const businessAreas = [
  {
    nameKo: "LED Display", nameEn: "LED Display", subKo: "LED 전광판 솔루션", subEn: "LED Signage",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h18v12H3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8m-4-4v4" /></svg>
    ),
  },
  {
    nameKo: "SI", nameEn: "SI", subKo: "시스템 통합(SI)", subEn: "System Integration",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10l2 2M19 5l-2 2M7 17l-2 2" /></svg>
    ),
  },
  {
    nameKo: "Media Façade", nameEn: "Media Façade", subKo: "미디어 파사드", subEn: "Media Façade",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M4 21h16M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01" /></svg>
    ),
  },
  {
    nameKo: "Network", nameEn: "Network", subKo: "네트워크 구축", subEn: "Network Infra",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3a9 9 0 100 18 9 9 0 000-18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" /></svg>
    ),
  },
  {
    nameKo: "IBS", nameEn: "IBS", subKo: "지능형 빌딩 시스템", subEn: "Intelligent Building",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M6 21V7l6-4 6 4v14M10 9h.01M14 9h.01M10 13h.01M14 13h.01M10 17h4" /></svg>
    ),
  },
];

const values = [
  {
    nameKo: "기술력", nameEn: "Technology",
    descKo: "축적된 기술과 노하우로 최적의 솔루션 제공", descEn: "Optimal solutions from accumulated expertise",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7z" /></svg>
    ),
  },
  {
    nameKo: "신뢰성", nameEn: "Reliability",
    descKo: "정확한 책임을 바탕으로 높은 신뢰 구축", descEn: "Trust built on accountability",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.6 0c0 5-3.6 7.5-8.6 9.5C7.6 17.5 4 15 4 10V6l8-3 8 3v4z" /></svg>
    ),
  },
  {
    nameKo: "전문성", nameEn: "Expertise",
    descKo: "전문 인력과 체계적인 프로세스로 완벽히 수행", descEn: "Expert staff and systematic processes",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-5-9.5V17a5 3 0 0010 0v-2.5" /></svg>
    ),
  },
  {
    nameKo: "지속성", nameEn: "Sustainability",
    descKo: "지속적인 연구개발과 미래 가치 창출", descEn: "Continuous R&D and future value",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0A8.003 8.003 0 015.064 13m13.355 2H15" /></svg>
    ),
  },
];

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
              {t("인사말", "Greeting")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* 왼쪽: 인사말 (관리자 페이지에서 관리) */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug whitespace-pre-line">
                  {title}
                </h2>
                <div className="text-[#cfcfcf] leading-loose whitespace-pre-line text-base md:text-[15px]">
                  {content}
                </div>
              </div>

              {/* 오른쪽: 회사 정보 + 주요 사업분야 */}
              <div className="space-y-8">
                <div className="relative rounded-2xl border border-[#1f2a37] bg-gradient-to-br from-[#0e1726] to-[#0b1220] p-8 overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#4A90D9]/10 rounded-full blur-3xl" />
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[#4A90D9]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {t("회사 정보", "Company Information")}
                    </h3>
                  </div>
                  <dl className="divide-y divide-[#1b2530]">
                    {companyInfo.map((row) => (
                      <div key={row.labelKo} className="flex items-center gap-4 py-3.5">
                        <span className="text-[#4A90D9] flex-shrink-0">{row.icon}</span>
                        <dt className="text-[#8aa] text-sm w-24 flex-shrink-0">
                          {t(row.labelKo, row.labelEn)}
                        </dt>
                        <dd className="text-white text-sm font-medium">
                          {t(row.valueKo, row.valueEn)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#4A90D9]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {t("주요 사업분야", "Key Business Areas")}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {businessAreas.map((b) => (
                      <div
                        key={b.nameKo}
                        className="rounded-xl border border-[#1f2a37] bg-[#0e1726] p-3 text-center hover:border-[#4A90D9]/50 transition-colors"
                      >
                        <div className="text-[#4A90D9] flex justify-center mb-2">{b.icon}</div>
                        <p className="text-white text-xs font-semibold leading-tight">{t(b.nameKo, b.nameEn)}</p>
                        <p className="text-[#6b7d8f] text-[10px] mt-1 leading-tight break-keep">{t(b.subKo, b.subEn)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 하단: 신뢰 · 기술 · 가치 */}
            <div className="mt-16 rounded-2xl border border-[#1f2a37] bg-gradient-to-r from-[#0e1726] to-[#0b1220] p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="lg:w-1/4 flex items-center gap-3">
                  <span className="text-[#4A90D9]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.6 0c0 5-3.6 7.5-8.6 9.5C7.6 17.5 4 15 4 10V6l8-3 8 3v4z" /></svg>
                  </span>
                  <div>
                    <p className="text-[#4A90D9] font-bold">{t("신뢰 · 기술 · 가치", "Trust · Tech · Value")}</p>
                    <p className="text-[#7d8fa0] text-xs mt-0.5 break-keep">
                      {t("고객의 성공을 함께 설계하는 파트너, 상승종합통신㈜", "Your partner for success, SANGSEUNG Co., Ltd.")}
                    </p>
                  </div>
                </div>
                <div className="lg:flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {values.map((v) => (
                    <div key={v.nameKo} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-[#4A90D9]">{v.icon}</span>
                        <span className="text-sm font-semibold">{t(v.nameKo, v.nameEn)}</span>
                      </div>
                      <p className="text-[#6b7d8f] text-xs leading-snug break-keep">{t(v.descKo, v.descEn)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
