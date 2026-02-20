const historyData = [
  {
    year: "2020",
    items: ["IT 스마트코리아 표창", "기업부설연구소 설립", "직접생산확인증명 취득"],
  },
  {
    year: "2019",
    items: ["공장등록 (일산공장이전)", "태국지사 설립", "일본지사 설립"],
  },
  {
    year: "2018",
    items: ["우수기술기업 인증", "중국공장 설립"],
  },
  {
    year: "2017",
    items: ["미디어시스템사업부 설립"],
  },
  {
    year: "2008",
    items: ["소프트웨어 사업자등록"],
  },
  {
    year: "2005",
    items: ["한화 S&C 파트너체결"],
  },
  {
    year: "2001",
    items: ["상승종합통신㈜ 설립"],
  },
];

export default function HistorySection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            HISTORY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">연혁</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {historyData.map((item) => (
            <div key={item.year} className="space-y-4">
              <h3 className="text-[#4A90D9] text-2xl md:text-3xl font-bold">
                {item.year}
              </h3>
              <ul className="space-y-2">
                {item.items.map((text, index) => (
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
