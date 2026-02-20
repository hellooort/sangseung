const partners = [
  "한화",
  "롯데",
  "현대",
  "삼성",
  "AIG",
  "동국제강",
  "LS",
  "기아",
];

export default function PartnersSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            PARTNERS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            신뢰할 수 있는 파트너
          </h2>
          <p className="text-[#888] text-base">
            국내외 주요 기업들과 함께 성공적인 프로젝트를 수행하고 있습니다
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-[#555] text-xl md:text-2xl lg:text-3xl font-bold hover:text-[#888] transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
