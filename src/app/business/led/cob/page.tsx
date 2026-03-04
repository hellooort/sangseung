import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: "lflex",
    name: "LFlex",
    description: "COB 기술이 적용된 고화질 플렉시블 LED 디스플레이",
    image: "/image/LFlex/LFlex_01.jpg",
  },
  {
    id: "sco-wall",
    name: "SCO-Wall Series",
    description: "프리미엄 COB 패키징 기술의 고급형 LED 월",
    image: "/image/SCO-Wall/1-1.png",
  },
];

export default function COBLEDPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
              <Link href="/business/led" className="hover:text-[#4A90D9]">LED 디스플레이</Link>
              <span>/</span>
              <span className="text-[#4A90D9]">COB LED</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              COB LED
            </h1>
            <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
              Chip on Board 기술을 적용한 차세대 LED 디스플레이입니다.
              기존 SMD 방식 대비 더 높은 화질과 안정성을 제공합니다.
            </p>
          </div>
        </section>

        {/* 제품 목록 */}
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/business/led/cob/${product.id}`}
                  className="group bg-[#111] rounded-2xl overflow-hidden hover:bg-[#1a1a1a] transition-all"
                >
                  <div className="relative aspect-video bg-[#1a1a1a]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[#888] leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <span className="text-[#4A90D9] text-sm font-medium flex items-center gap-2">
                      자세히 보기
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COB 기술 특징 */}
        <section className="py-24 px-6 lg:px-20 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">COB 기술의 장점</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">높은 안정성</h3>
                <p className="text-[#888] text-sm">LED 칩이 기판에 직접 실장되어 충격에 강하고 안정적인 운영이 가능합니다.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">뛰어난 화질</h3>
                <p className="text-[#888] text-sm">미세 픽셀피치로 가까운 거리에서도 선명한 화질을 제공합니다.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">에너지 효율</h3>
                <p className="text-[#888] text-sm">기존 SMD 대비 전력 소비가 적어 경제적인 운영이 가능합니다.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
