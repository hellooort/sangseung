import Header from "@/components/Header";
import Footer from "@/components/Footer";

const orgData = {
  ceo: "대표이사",
  divisions: [
    {
      name: "관리본부",
      teams: ["경영지원팀", "회계관리팀"],
    },
    {
      name: "통신사업본부",
      departments: [
        {
          name: "영업부",
          teams: ["NI 사업팀", "SI 사업팀"],
        },
        {
          name: "네트워크사업부",
          teams: ["네트워크 1팀", "네트워크 2팀", "기술지원팀"],
        },
      ],
    },
    {
      name: "미디어사업본부",
      departments: [
        {
          name: "영업부",
          teams: ["국내 영업팀", "해외 영업팀"],
        },
        {
          name: "디자인팀",
          teams: [],
        },
        {
          name: "설계팀",
          teams: [],
        },
        {
          name: "생산공장",
          teams: ["생산제작팀", "설치시공팀", "QC팀", "유지보수팀", "자재관리팀"],
        },
      ],
    },
    {
      name: "기업부설연구소",
      teams: ["하드웨어팀", "소프트웨어팀"],
    },
  ],
};

export default function OrganizationPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              ORGANIZATION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">조직도</h1>

            {/* 조직도 */}
            <div className="flex flex-col items-center">
              {/* 대표이사 */}
              <div className="bg-[#4A90D9] text-white px-8 py-4 rounded-lg font-bold text-lg mb-8">
                {orgData.ceo}
              </div>

              {/* 세로선 */}
              <div className="w-px h-8 bg-[#333]" />

              {/* 가로선 */}
              <div className="w-full max-w-4xl h-px bg-[#333]" />

              {/* 본부들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
                {orgData.divisions.map((division) => (
                  <div key={division.name} className="flex flex-col items-center">
                    {/* 세로선 */}
                    <div className="w-px h-8 bg-[#333] hidden lg:block" />
                    
                    {/* 본부명 */}
                    <div className="bg-[#1a1a1a] border border-[#4A90D9] text-white px-6 py-3 rounded-lg font-semibold text-center w-full mb-4">
                      {division.name}
                    </div>

                    {/* 팀 목록 (본부 직속) */}
                    {division.teams && division.teams.length > 0 && (
                      <div className="space-y-2 w-full">
                        {division.teams.map((team) => (
                          <div
                            key={team}
                            className="bg-[#111] text-[#ccc] px-4 py-2 rounded text-sm text-center"
                          >
                            {team}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 부서들 */}
                    {division.departments && (
                      <div className="space-y-4 w-full">
                        {division.departments.map((dept) => (
                          <div key={dept.name} className="w-full">
                            <div className="bg-[#222] text-[#4A90D9] px-4 py-2 rounded text-sm font-medium text-center mb-2">
                              {dept.name}
                            </div>
                            {dept.teams && dept.teams.length > 0 && (
                              <div className="space-y-1 pl-4">
                                {dept.teams.map((team) => (
                                  <div
                                    key={team}
                                    className="bg-[#111] text-[#888] px-3 py-1.5 rounded text-xs text-center"
                                  >
                                    {team}
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
