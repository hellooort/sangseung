export default function AboutSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
              디지털 미디어 솔루션을 통해
              <br />
              미래를 선도하는
              <br />
              새로운 기준을 제시합니다.
            </h2>
            <p className="text-[#888] text-sm leading-loose">
              상승종합통신은 디지털 미디어 기반의 공간을 구성하고 사용자 경험을 향상시키는
              <br />
              UX/UI와 매력적인 디지털 콘텐츠를 제공하는 미디어 크리에이티브 그룹입니다.
            </p>
            <p className="text-[#888] text-sm leading-loose mt-6">
              문제를 해결하고 가치를 만들어내는 개념을 바탕으로
              <br />
              환경, 서비스, 사용자가 서로 유기적으로 연결될 수 있는 방안에 대해 연구하며
              <br />
              공간과 미디어의 시너지 포인트를 찾아 최상의 서비스를 제공합니다.
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-2 lg:items-end">
            <span className="text-[#333] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              DIGITAL
            </span>
            <span className="text-[#333] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
              INNOVATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
