import Link from "next/link";

const services = [
  {
    label: "LED DISPLAY",
    title: "대형 LED 전광판",
    description: "설계, 제작, 시공까지 원스톱 솔루션",
    gradient: "from-[#1a1a1a] to-[#2a3a4a]",
    href: "/business/led",
  },
  {
    label: "NETWORK",
    title: "네트워크 인프라",
    description: "유무선 네트워크 통합 구축",
    gradient: "from-[#1a1a1a] to-[#2a4a3a]",
    href: "/business/network",
  },
  {
    label: "IBS",
    title: "통합 빌딩 시스템",
    description: "A/V, PA, CCTV, CATV 등 IBS 구축",
    gradient: "from-[#1a1a1a] to-[#3a2a4a]",
    href: "/business/network/ibs",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            핵심 사업 영역
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className={`group bg-gradient-to-b ${service.gradient} rounded-xl h-80 p-8 flex flex-col justify-end hover:scale-[1.02] transition-transform`}
            >
              <span className="text-[#4A90D9] text-sm font-semibold tracking-wider mb-2">
                {service.label}
              </span>
              <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#888] text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
