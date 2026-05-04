import { getList } from "@/lib/supabase/public";

interface HistoryRow {
  id: number;
  year: string;
  month: string | null;
  text_ko: string;
  text_en: string | null;
  sort_order: number;
}

const fallback: HistoryRow[] = [
  { id: 1, year: "2020", month: null, text_ko: "IT 스마트코리아 표창", text_en: null, sort_order: 0 },
  { id: 2, year: "2020", month: null, text_ko: "기업부설연구소 설립", text_en: null, sort_order: 1 },
  { id: 3, year: "2020", month: null, text_ko: "직접생산확인증명 취득", text_en: null, sort_order: 2 },
  { id: 4, year: "2019", month: null, text_ko: "공장등록 (일산공장이전)", text_en: null, sort_order: 0 },
  { id: 5, year: "2019", month: null, text_ko: "태국지사 설립", text_en: null, sort_order: 1 },
  { id: 6, year: "2019", month: null, text_ko: "일본지사 설립", text_en: null, sort_order: 2 },
  { id: 7, year: "2018", month: null, text_ko: "우수기술기업 인증", text_en: null, sort_order: 0 },
  { id: 8, year: "2018", month: null, text_ko: "중국공장 설립", text_en: null, sort_order: 1 },
  { id: 9, year: "2017", month: null, text_ko: "미디어시스템사업부 설립", text_en: null, sort_order: 0 },
  { id: 10, year: "2008", month: null, text_ko: "소프트웨어 사업자등록", text_en: null, sort_order: 0 },
  { id: 11, year: "2005", month: null, text_ko: "한화 S&C 파트너체결", text_en: null, sort_order: 0 },
  { id: 12, year: "2001", month: null, text_ko: "상승종합통신㈜ 설립", text_en: null, sort_order: 0 },
];

export default async function HistorySection() {
  const rows = await getList<HistoryRow>(
    "histories",
    { orderBy: "sort_order" },
    fallback,
  );

  const grouped = rows.reduce<Record<string, string[]>>((acc, row) => {
    if (!acc[row.year]) acc[row.year] = [];
    acc[row.year].push(row.text_ko);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">HISTORY</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">연혁</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {years.map((year) => (
            <div key={year} className="space-y-4">
              <h3 className="text-[#4A90D9] text-2xl md:text-3xl font-bold">{year}</h3>
              <ul className="space-y-2">
                {grouped[year].map((text, index) => (
                  <li key={index} className="text-[#888] text-xs md:text-sm">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
