import Link from "next/link";
import Image from "next/image";

const products = [
  { id: "sgl", name: "SGL Series", description: "투명 글래스 LED", image: "/image/reference/work_8.jpg" },
  { id: "rod1", name: "ROD-1 Series", description: "고휘도 실외 미디어 파사드", image: "/image/reference/work_8.jpg" },
  { id: "rod2", name: "ROD-2 Series", description: "슬림 미디어 파사드", image: "/image/reference/work_8.jpg" },
  { id: "rod3", name: "ROD-3 Series", description: "대형 면적 미디어 파사드", image: "/image/reference/work_8.jpg" },
  { id: "rod4", name: "ROD-4 Series", description: "커스텀 미디어 파사드", image: "/image/reference/work_8.jpg" }
];

export default function MediaFacadePage() {
  return (
    <>
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
            <Link href="/business/led" className="hover:text-[#4A90D9]">LED 디스플레이</Link>
            <span>/</span>
            <span className="text-[#4A90D9]">MEDIA FACADE</span>
          </div>
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-3 block">MEDIA FACADE</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">MEDIA FACADE</h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">건물 외벽과 일체화된 미디어 파사드 LED 솔루션으로, 도시 경관과 어우러지는 대형 영상 표현이 가능합니다.</p>
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