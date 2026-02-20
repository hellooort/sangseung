import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const businessAreas = [
  {
    title: "네트워크 사업",
    subtitle: "Network Infrastructure",
    description: "IBS 통합시스템, 통합배선공사, CCTV/CATV 공사, 서버실 구축 등 네트워크 인프라 전반을 담당합니다.",
    href: "/business/network",
    services: ["통합배선공사", "CCTV 공사", "CATV 공사", "AV 공사", "서버실구축/이전공사", "출입통제공사", "전관방송공사", "UPS공사"],
  },
  {
    title: "LED 디스플레이",
    subtitle: "LED Display Solution",
    description: "대형 LED 전광판부터 미디어 파사드까지, 설계/제작/시공 전 과정을 One-Stop으로 제공합니다.",
    href: "/business/led",
    services: ["대형 LED 전광판", "실내 LED 디스플레이", "미디어 파사드", "기상전광판", "교통정보전광판", "안내전광판"],
  },
];

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              BUSINESS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">사업소개</h1>

            <div className="space-y-16">
              {businessAreas.map((area) => (
                <div key={area.title} className="bg-[#111] rounded-2xl p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="lg:w-1/2">
                      <span className="text-[#4A90D9] text-sm mb-2 block">{area.subtitle}</span>
                      <h2 className="text-3xl font-bold text-white mb-4">{area.title}</h2>
                      <p className="text-[#888] leading-relaxed mb-6">{area.description}</p>
                      <Link
                        href={area.href}
                        className="inline-block border border-[#444] text-white px-6 py-3 rounded text-sm hover:border-white/50 transition-colors"
                      >
                        자세히 보기
                      </Link>
                    </div>
                    <div className="lg:w-1/2">
                      <h3 className="text-white font-semibold mb-4">주요 서비스</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {area.services.map((service) => (
                          <div key={service} className="bg-[#1a1a1a] rounded px-4 py-3 text-[#888] text-sm">
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
