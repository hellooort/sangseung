import Link from "next/link";
import Image from "next/image";

const products = [
  { id: "ad-sign", name: "AD Sign", description: "클라우드 LED 사이니지", image: "/image/AD Cloud/AD Cloud_main.jpg" },
  { id: "cloud-iot", name: "Cloud IoT Solution", description: "IoT 기반 통합 관제 솔루션", image: "/image/AD Cloud/AD Cloud_main.jpg" }
];

export default function AdSignPage() {
  return (
    <>
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
            <Link href="/business/led" className="hover:text-[#4A90D9]">LED 디스플레이</Link>
            <span>/</span>
            <span className="text-[#4A90D9]">AD SIGN</span>
          </div>
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-3 block">AD SIGN</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">AD SIGN</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">클라우드 기반 LED 광고 사이니지 솔루션으로, 원격 콘텐츠 관리와 모니터링이 가능한 차세대 옥외 광고 시스템입니다.</p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-[#111] rounded-2xl overflow-hidden hover:bg-[#1a1a1a] transition-all">
                <div className="relative aspect-video bg-[#1a1a1a]">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-300" unoptimized />
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#4A90D9] transition-colors">{product.name}</h3>
                  <p className="text-[#888] leading-relaxed mb-4 text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">제품에 대해 궁금하신가요?</h2>
          <p className="text-white/80 mb-8">설치 환경에 맞춰 최적의 LED 솔루션을 제안해 드립니다.</p>
          <Link href="/contact" className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors">문의하기</Link>
        </div>
      </section>
    </>
  );
}