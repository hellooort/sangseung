import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const networkCategories = [
  {
    title: "IBS 통합시스템",
    description: "통합배선공사, CCTV, CATV, AV, 서버실 구축 등 건물 인프라 전반을 담당합니다.",
    href: "/business/network/ibs",
    image: "/images/ibs-thumb.jpg",
  },
  {
    title: "해외 프로젝트",
    description: "GUAM, 일본, 사이판, 사우디아라비아, 태국, 말레이시아 등 글로벌 프로젝트를 수행합니다.",
    href: "/business/network/overseas",
    image: "/images/overseas-thumb.jpg",
  },
  {
    title: "공사실적",
    description: "2003년부터 현재까지 수행한 국내외 네트워크 인프라 구축 실적입니다.",
    href: "/business/network/projects",
    image: "/images/projects-thumb.jpg",
  },
];

export default function NetworkBusinessPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-[#111] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('/images/network-hero.jpg')] bg-cover bg-center opacity-30" />
          <div className="relative z-20 text-center px-6">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              NETWORK BUSINESS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              네트워크 사업
            </h1>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {networkCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#222] transition-all"
                >
                  <div className="h-48 bg-[#2a2a2a] flex items-center justify-center">
                    <span className="text-[#4A90D9] text-4xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
