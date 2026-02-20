import Link from "next/link";

const businessAreas = [
  {
    title: "NI",
    subtitle: "Network Infrastructure",
    description: "네트워크 인프라 구축",
    href: "/business/network",
  },
  {
    title: "LED Display",
    subtitle: "LED 디스플레이",
    description: "설계, 제작, 시공",
    href: "/business/led",
  },
  {
    title: "SI",
    subtitle: "System Integration",
    description: "시스템 통합",
    href: "/business/si",
  },
  {
    title: "Media Façade",
    subtitle: "미디어 파사드",
    description: "건물 외관 LED 디스플레이",
    href: "/business/facade",
  },
  {
    title: "Network",
    subtitle: "네트워크 구축",
    description: "유무선 인프라",
    href: "/business/network",
  },
  {
    title: "IBS",
    subtitle: "Intelligent Building System",
    description: "A/V, PA, CCTV, CATV 등",
    href: "/business/ibs",
  },
];

export default function BusinessSection() {
  return (
    <section className="w-full bg-[#111] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            BUSINESS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">사업분야</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessAreas.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="block bg-[#1a1a1a] rounded-xl p-8 hover:bg-[#222] transition-colors group"
            >
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#4A90D9] transition-colors">
                {area.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {area.subtitle}
                <br />
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
