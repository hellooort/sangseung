import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface OrgTeam {
  id?: string;
  ko: string;
  en: string;
}

interface OrgDepartment {
  id?: string;
  name_ko: string;
  name_en: string;
  teams: OrgTeam[];
}

interface OrgDivision {
  id?: string;
  name_ko: string;
  name_en: string;
  teams?: OrgTeam[];
  departments?: OrgDepartment[];
}

interface OrganizationData {
  ceo_ko: string;
  ceo_en: string;
  divisions: OrgDivision[];
}

const fallback: OrganizationData = {
  ceo_ko: "대표이사",
  ceo_en: "CEO",
  divisions: [
    { name_ko: "관리본부",       name_en: "Management HQ",       teams: [{ ko: "경영지원팀", en: "General Affairs" }, { ko: "회계관리팀", en: "Accounting" }] },
    { name_ko: "통신사업본부",   name_en: "Network Business HQ", departments: [
      { name_ko: "영업부",        name_en: "Sales",            teams: [{ ko: "NI 사업팀", en: "NI Team" }, { ko: "SI 사업팀", en: "SI Team" }] },
      { name_ko: "네트워크사업부", name_en: "Network Division", teams: [{ ko: "네트워크 1팀", en: "Network Team 1" }, { ko: "네트워크 2팀", en: "Network Team 2" }, { ko: "기술지원팀", en: "Technical Support" }] },
    ] },
    { name_ko: "미디어사업본부", name_en: "Media Business HQ",   departments: [
      { name_ko: "영업부",   name_en: "Sales",         teams: [{ ko: "국내 영업팀", en: "Domestic Sales" }, { ko: "해외 영업팀", en: "Overseas Sales" }] },
      { name_ko: "디자인팀", name_en: "Design",        teams: [] },
      { name_ko: "설계팀",   name_en: "Engineering",   teams: [] },
      { name_ko: "생산공장", name_en: "Manufacturing", teams: [{ ko: "생산제작팀", en: "Production" }, { ko: "설치시공팀", en: "Installation" }, { ko: "QC팀", en: "QC" }, { ko: "유지보수팀", en: "Maintenance" }, { ko: "자재관리팀", en: "Materials" }] },
    ] },
    { name_ko: "기업부설연구소", name_en: "R&D Center", teams: [{ ko: "하드웨어팀", en: "Hardware" }, { ko: "소프트웨어팀", en: "Software" }] },
  ],
};

export default async function OrganizationPage() {
  const [locale, data] = await Promise.all([
    getLocale(),
    getSiteSetting<OrganizationData>("organization", fallback),
  ]);
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              ORGANIZATION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">
              {t("조직도", "Organization")}
            </h1>

            <div className="flex flex-col items-center">
              <div className="bg-[#4A90D9] text-white px-8 py-4 rounded-lg font-bold text-lg mb-8">
                {tr(locale, data.ceo_ko, data.ceo_en)}
              </div>

              <div className="w-px h-8 bg-[#333]" />
              {/* 가로 연결선: 양 끝 본부의 세로선까지만 (밖으로 빠져나가지 않게 inset).
                  4열 grid + gap-6(1.5rem) 기준, 양끝 inset = (100% - 4.5rem)/8 = 첫/마지막 열의 중심. */}
              <div className="relative w-full h-px hidden lg:block">
                <div
                  className="absolute top-0 h-px bg-[#333]"
                  style={{ left: "calc((100% - 4.5rem) / 8)", right: "calc((100% - 4.5rem) / 8)" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8 items-start">
                {data.divisions.map((division, di) => (
                  <div key={division.id ?? di} className="flex flex-col items-center">
                    <div className="w-px h-8 bg-[#333] hidden lg:block -mt-8" />

                    <div className="bg-[#1a1a1a] border border-[#4A90D9] text-white px-6 py-3 rounded-lg font-semibold text-center w-full mb-4">
                      {tr(locale, division.name_ko, division.name_en)}
                    </div>

                    {division.teams && division.teams.length > 0 && (
                      <div className="space-y-2 w-full">
                        {division.teams.map((team, ti) => (
                          <div key={team.id ?? ti} className="bg-[#111] text-[#ccc] px-4 py-2 rounded text-sm text-center">
                            {tr(locale, team.ko, team.en)}
                          </div>
                        ))}
                      </div>
                    )}

                    {division.departments && division.departments.length > 0 && (
                      <div className="space-y-4 w-full">
                        {division.departments.map((dept, dpi) => (
                          <div key={dept.id ?? dpi} className="w-full flex flex-col items-center">
                            <div className="bg-[#222] text-[#4A90D9] px-4 py-2 rounded text-sm font-medium text-center w-full mb-2">
                              {tr(locale, dept.name_ko, dept.name_en)}
                            </div>
                            {dept.teams && dept.teams.length > 0 && (
                              <div className="space-y-1 w-full">
                                {dept.teams.map((team, ti) => (
                                  <div key={team.id ?? ti} className="bg-[#111] text-[#888] px-3 py-1.5 rounded text-xs text-center">
                                    {tr(locale, team.ko, team.en)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
