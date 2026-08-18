import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale.server";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 상승종합통신㈜",
  description: "상승종합통신㈜의 개인정보처리방침입니다.",
};

// 법령에 따라 고지하는 문서라 admin 편집 대상에서 제외하고 코드로 관리한다.
// 개정 시 본문과 EFFECTIVE_DATE 를 함께 수정할 것.
const EFFECTIVE_DATE = "2026. 07. 08";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="flex items-start gap-2 text-lg md:text-xl font-bold text-white mb-5">
        <span className="text-[#4A90D9] flex-shrink-0">□</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-3 text-[#b9b9b9] text-[15px] leading-loose">{children}</div>
    </section>
  );
}

function Indent({ children }: { children: React.ReactNode }) {
  return <div className="pl-4 space-y-2">{children}</div>;
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[#22262d]">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#141922]">
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-[#22262d] px-4 py-3 text-left font-semibold text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#1a1e25] last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3.5 align-top leading-relaxed text-[#b9b9b9]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="my-5 rounded-xl border border-[#1f2a37] bg-[#0e1420] p-6">
      <p className="mb-4 flex items-center gap-2 font-semibold text-white">
        <span className="text-[#4A90D9]">▶</span>
        {title}
      </p>
      <dl className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 text-sm">
            <dt className="w-20 flex-shrink-0 text-[#7d8898]">{label}</dt>
            <dd className="text-[#d5d5d5]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const REMEDY_ORGS = [
  {
    name: "개인정보 분쟁조정위원회",
    tel: "(국번없이) 1833-6972",
    url: "https://www.kopico.go.kr",
    host: "www.kopico.go.kr",
  },
  {
    name: "개인정보침해 신고센터",
    tel: "(국번없이) 118",
    url: "https://privacy.kisa.or.kr",
    host: "privacy.kisa.or.kr",
  },
  {
    name: "경찰청",
    tel: "(국번없이) 182",
    url: "https://ecrm.police.go.kr",
    host: "ecrm.police.go.kr",
  },
];

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0A0A0A] pt-20">
        <section className="px-6 py-24 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <span className="mb-4 block text-sm font-medium tracking-widest text-[#4A90D9]">
              PRIVACY POLICY
            </span>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {t("개인정보처리방침", "Privacy Policy")}
            </h1>
            <p className="mt-6 text-sm text-[#777]">
              {t(`시행일자 : ${EFFECTIVE_DATE}`, `Effective date: ${EFFECTIVE_DATE}`)}
            </p>
            {locale === "en" && (
              <p className="mt-6 rounded-lg border border-[#1f2a37] bg-[#0e1420] px-5 py-4 text-sm leading-relaxed text-[#9aa4b2]">
                This Privacy Policy is published in Korean. The Korean text below is the
                official version.
              </p>
            )}

            <div className="mt-16 border-t border-white/10 pt-16">
              <Section title="개인정보의 처리목적 및 처리항목">
                <p>
                  상승종합통신(주)은 「개인정보 보호법」에 따라 서비스 제공을 위한 필요 최소한의
                  범위에서 개인정보를 수집·이용합니다.
                </p>
                <Indent>
                  <p>
                    1. 상승종합통신(주)은 다음의 개인정보 항목을 정보주체의 동의없이 처리하고
                    있습니다.
                  </p>
                </Indent>
                <Table
                  head={["법적근거", "구분", "처리목적", "처리항목"]}
                  rows={[
                    [
                      "개인정보 보호법 제15조 제1항 제4호",
                      "RiseCast 회원관리",
                      "서비스 계약의 이행",
                      "아이디, 비밀번호, 연락처",
                    ],
                    [
                      "개인정보 보호법 제15조 제1항 제4호 및 제6호",
                      "서비스 운영·보안",
                      "로그인 관리, 부정접속 방지, 보안사고 확인 및 대응",
                      "로그 기록, 계정 및 권한 변경기록",
                    ],
                  ]}
                />
                <Indent>
                  <p>2. 정보주체의 동의를 받아 처리하는 개인정보 항목 : 해당사항 없음</p>
                </Indent>
              </Section>

              <Section title="개인정보의 처리 및 보유기간">
                <p>
                  ① &lt;상승종합통신(주)&gt;는 법령에 따른 개인정보 보유·이용 기간 또는
                  정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서
                  개인정보를 처리·보유합니다.
                </p>
                <p>② 각각의 개인정보 처리 및 보유기간은 다음과 같습니다.</p>
                <Indent>
                  <p>1. RiseCast 계정정보 : 회원탈퇴 또는 계약 종료 시까지</p>
                  <p>2. 백업에 포함된 개인정보 : DB 서버 백업은 최대 7일간 보관</p>
                </Indent>
              </Section>

              <Section title="개인정보의 파기 절차 및 방법">
                <p>
                  ① &lt;상승종합통신(주)&gt;은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
                  개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <p>
                  ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
                  달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는
                  경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여
                  보존합니다.
                </p>
                <Indent>
                  <p className="text-[#8b949e]">
                    ※ 다른 법령에 따라 보존하는 개인정보의 항목과 보존 근거는 “개인정보의 처리 및
                    보유기간” 항목에서 확인 가능
                  </p>
                </Indent>
                <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
                <Indent>
                  <p>
                    1. 파기절차
                    <br />
                    &lt;상승종합통신(주)&gt;은(는) 파기 사유가 발생한 개인정보를 선정하고,
                    &lt;상승종합통신(주)&gt;의 개인정보 보호책임자의 승인을 받아 개인정보를
                    파기합니다.
                  </p>
                  <p>
                    2. 파기방법
                    <br />
                    &lt;상승종합통신(주)&gt;은(는) 전자적 파일 형태로 기록·저장된 개인정보는
                    기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로
                    분쇄하거나 소각하여 파기합니다.
                  </p>
                </Indent>
              </Section>

              <Section title="개인정보 처리업무의 위탁">
                <p>
                  ① &lt;상승종합통신(주)&gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이
                  개인정보 처리 업무를 위탁하고 있습니다.
                </p>
                <Table
                  head={["위탁받는 자 (수탁자)", "위탁업무"]}
                  rows={[
                    [
                      "네이버클라우드(주)",
                      "공공기관용 클라우드 인프라(서버·DB·스토리지·백업 등) 제공",
                    ],
                    [
                      "굿어스데이터(주)",
                      "클라우드 인프라(웹서버, DB 등) 구축·운영, 장애조치 및 보안 기술지원",
                    ],
                  ]}
                />
                <p>
                  ② &lt;상승종합통신(주)&gt;은(는) 위탁계약 체결 시 「개인정보 보호법」 제26조에
                  따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한,
                  수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
                  명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                </p>
                <p>
                  ③ 「개인정보 보호법」 제26조제6항에 따라 수탁자가 당사의 개인정보 처리 업무를
                  재위탁하는 경우 &lt;상승종합통신(주)&gt;의 동의를 받고 있으며, 본 개인정보
                  처리방침을 통하여 재수탁자와 재수탁하는 업무의 내용을 공개하고 있습니다.
                </p>
                <p>
                  ④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을
                  통하여 공개하도록 하겠습니다.
                </p>
              </Section>

              <Section title="개인정보의 안전성 확보조치">
                <p>
                  &lt;상승종합통신(주)&gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를
                  취하고 있습니다.
                </p>
                <Indent>
                  <p>
                    1. 관리적 조치 : 내부 관리계획 수립·시행, 정기적 직원 교육, 전담조직 운영
                  </p>
                  <p>
                    2. 기술적 조치 : 개인정보처리시스템에 대한 접근 권한의 관리, 접근통제시스템
                    설치 및 기타 관련 보호조치, 인터넷망 차단 조치, 개인정보의 암호화, 접속기록의
                    보관 및 점검, 보안프로그램 설치 및 갱신, 개인정보처리시스템의 취약점 점검 및
                    보완
                  </p>
                  <p>
                    3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제, 서류·보조저장매체 등을
                    잠금장치가 있는 안전한 장소에 보관, 재해·재난에 대한 안전조치, 보조저장매체의
                    반출·입 통제
                  </p>
                </Indent>
              </Section>

              <Section title="정보주체와 법정대리인의 권리·의무 및 행사방법">
                <p>
                  ① 정보주체는 &lt;상승종합통신(주)&gt;에 대해 언제든지 개인정보
                  열람·전송·정정·삭제·처리정지 및 동의 철회 등을 요구(이하 “권리 행사”라 함)할 수
                  있습니다.
                </p>
                <Indent>
                  <p className="text-[#8b949e]">
                    ※ 14세 미만 아동의 권리 행사는 법정대리인이 직접 해야 하며, 14세 이상의
                    미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를
                    행사하거나 법정대리인을 통하여 권리를 행사할 수 있습니다.
                  </p>
                </Indent>
                <p>
                  ② 권리 행사는 &lt;상승종합통신(주)&gt;에 대해 「개인정보 보호법 시행령」
                  제41조제1항에 따라 서면, 전화, 전자우편, 팩스(FAX), 인터넷 등을 통하여 하실 수
                  있으며, &lt;상승종합통신(주)&gt;은(는) 이에 대해 지체없이 조치하겠습니다.
                </p>
                <p>
                  ③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실
                  수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시” [별지 11] 서식에 따른
                  위임장을 제출하셔야 합니다.
                </p>
                <p>
                  ④ 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 「개인정보 보호법」
                  제35조제4항 및 제37조제2항에 의하여 제한될 수 있습니다.
                </p>
                <p>
                  ⑤ 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당
                  개인정보의 삭제를 요구할 수 없습니다.
                </p>
                <p>
                  ⑥ &lt;상승종합통신(주)&gt;은(는) 권리 행사를 한 자가 본인이거나 정당한
                  대리인인지를 확인합니다.
                </p>
                <p>
                  ⑦ 정보주체는 권리 행사를 아래의 부서에 할 수 있습니다.
                  &lt;상승종합통신(주)&gt;은(는) 정보주체로부터 권리행사를 청구받은 날로부터
                  10일(전송요구의 경우 지체 없이) 이내 회신하겠습니다.
                </p>
                <InfoCard
                  title="개인정보 권리 행사 청구 접수·처리 부서"
                  rows={[
                    ["부서명", "미디어시스템사업부"],
                    ["주소", "경기도 구리시 갈매순환로 154, A동 1040호"],
                    ["연락처", "031-512-0110"],
                  ]}
                />
              </Section>

              <Section title="개인정보 보호책임자 및 담당자">
                <p>
                  ① &lt;상승종합통신(주)&gt;은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                  개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
                  개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <InfoCard
                  title="개인정보 보호책임자"
                  rows={[
                    ["성명", "김경선"],
                    ["직위", "부장"],
                    ["연락처", "010-6298-2292"],
                  ]}
                />
                <InfoCard
                  title="개인정보보호 담당부서"
                  rows={[
                    ["부서명", "미디어시스템사업부"],
                    ["연락처", "031-512-0110"],
                  ]}
                />
                <p>
                  ② 정보주체는 &lt;상승종합통신(주)&gt;의 서비스(또는 사업)를 이용하시면서 발생한
                  모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
                  보호책임자 및 개인정보보호 담당부서로 문의할 수 있습니다.
                  &lt;상승종합통신(주)&gt;은(는) 정보주체의 문의에 대해 지체없이 답변 및
                  처리해드릴 것입니다.
                </p>
              </Section>

              <Section title="정보주체의 권익침해에 대한 구제방법">
                <p>
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보 분쟁조정위원회,
                  한국인터넷진흥원 개인정보침해 신고센터 등에 분쟁해결이나 상담 등을 신청할 수
                  있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에
                  문의하시기 바랍니다.
                </p>
                <Indent>
                  {REMEDY_ORGS.map((org, i) => (
                    <p key={org.name}>
                      {i + 1}. {org.name} : {org.tel} (
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4A90D9] underline-offset-4 hover:underline"
                      >
                        {org.host}
                      </a>
                      )
                    </p>
                  ))}
                </Indent>
              </Section>

              <Section title="개인정보 처리방침의 변경">
                <p>① 이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다.</p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
