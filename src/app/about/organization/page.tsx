import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";

interface Department {
  name_ko: string;
  name_en: string;
  teams?: { ko: string; en: string }[];
}

interface Division {
  name_ko: string;
  name_en: string;
  teams?: { ko: string; en: string }[];
  departments?: Department[];
}

const orgData: { ceo_ko: string; ceo_en: string; divisions: Division[] } = {
  ceo_ko: "대표이사",
  ceo_en: "CEO",
  divisions: [
    {
      name_ko: "관리본부",
      name_en: "Management HQ",
      teams: [
        { ko: "경영지원팀", en: "General Affairs" },
        { ko: "회계관리팀", en: "Accounting" },
      ],
    },
    {
      name_ko: "통신사업본부",
      name_en: "Network Business HQ",
      departments: [
        {
          name_ko: "영업부",
          name_en: "Sales",
          teams: [
            { ko: "NI 사업팀", en: "NI Team" },
            { ko: "SI 사업팀", en: "SI Team" },
          ],
        },
        {
          name_ko: "네트워크사업부",
          name_en: "Network Division",
          teams: [
            { ko: "네트워크 1팀", en: "Network Team 1" },
            { ko: "네트워크 2팀", en: "Network Team 2" },
            { ko: "기술지원팀", en: "Technical Support" },
          ],
        },
      ],
    },
    {
      name_ko: "미디어사업본부",
      name_en: "Media Business HQ",
      departments: [
        {
          name_ko: "영업부",
          name_en: "Sales",
          teams: [
            { ko: "국내 영업팀", en: "Domestic Sales" },
            { ko: "해외 영업팀", en: "Overseas Sales" },
          ],
        },
        { name_ko: "디자인팀", name_en: "Design", teams: [] },
        { name_ko: "설계팀", name_en: "Engineering", teams: [] },
        {
          name_ko: "생산공장",
          name_en: "Manufacturing",
          teams: [
            { ko: "생산제작팀", en: "Production" },
            { ko: "설치시공팀", en: "Installation" },
            { ko: "QC팀", en: "QC" },
            { ko: "유지보수팀", en: "Maintenance" },
            { ko: "자재관리팀", en: "Materials" },
          ],
        },
      ],
    },
    {
      name_ko: "기업부설연구소",
      name_en: "R&D Center",
      teams: [
        { ko: "하드웨어팀", en: "Hardware" },
        { ko: "소프트웨어팀", en: "Software" },
      ],
    },
  ],
};

export default async function OrganizationPage() {
  const locale = await getLocale();
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
                {t(orgData.ceo_ko, orgData.ceo_en)}
              </div>

              <div className="w-px h-8 bg-[#333]" />
              <div className="w-full max-w-4xl h-px bg-[#333]" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
                {orgData.divisions.map((division) => (
                  <div key={division.name_ko} className="flex flex-col items-center">
                    <div className="w-px h-8 bg-[#333] hidden lg:block" />

                    <div className="bg-[#1a1a1a] border border-[#4A90D9] text-white px-6 py-3 rounded-lg font-semibold text-center w-full mb-4">
                      {t(division.name_ko, division.name_en)}
                    </div>

                    {division.teams && division.teams.length > 0 && (
                      <div className="space-y-2 w-full">
                        {division.teams.map((team) => (
                          <div key={team.ko} className="bg-[#111] text-[#ccc] px-4 py-2 rounded text-sm text-center">
                            {t(team.ko, team.en)}
                          </div>
                        ))}
                      </div>
                    )}

                    {division.departments && (
                      <div className="space-y-4 w-full">
                        {division.departments.map((dept) => (
                          <div key={dept.name_ko} className="w-full">
                            <div className="bg-[#222] text-[#4A90D9] px-4 py-2 rounded text-sm font-medium text-center mb-2">
                              {t(dept.name_ko, dept.name_en)}
                            </div>
                            {dept.teams && dept.teams.length > 0 && (
                              <div className="space-y-1 pl-4">
                                {dept.teams.map((team) => (
                                  <div key={team.ko} className="bg-[#111] text-[#888] px-3 py-1.5 rounded text-xs text-center">
                                    {t(team.ko, team.en)}
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
