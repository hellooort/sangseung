import Link from "next/link";
import Image from "next/image";

export default function IPWallPage() {
  return (
    <>
        {/* Hero / Breadcrumb */}
        <section className="pt-16 px-6 lg:px-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#666] mb-8">
              <Link href="/business" className="hover:text-[#4A90D9] transition-colors">사업소개</Link>
              <span>/</span>
              <span className="text-[#4A90D9]">Video-Wall</span>
            </div>
          </div>
        </section>

        {/* CALICO PRO Feature Section */}
        <section className="py-20 px-6 lg:px-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Image */}
              <div className="relative">
                <Image
                  src="/image/calico-pro.png"
                  alt="CALICO PRO"
                  width={900}
                  height={720}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Right: Text Content */}
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                  THE FUTURE OF
                  <br />
                  <span className="text-[#4A90D9]">VIDEO PROCESSING</span>
                </h2>

                <div className="space-y-5 text-[#ccc] text-base md:text-lg leading-relaxed mb-10">
                  <p>
                    Step into a new era of performance and clarity. CALICO PRO delivers
                    unmatched flexibility with support for hundreds of 4K60 video windows
                    and stunning 10-bit color depth enabling smooth, lifelike visuals at scale.
                  </p>
                  <p>
                    Whether you&apos;re powering control rooms, broadcast environments, or
                    immersive experiences, CALICO PRO redefines what&apos;s possible in
                    professional video processing.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 border-2 border-[#4A90D9] text-[#4A90D9] hover:bg-[#4A90D9] hover:text-white px-7 py-3.5 rounded font-semibold transition-colors"
                  >
                    문의하기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Showcase */}
        <section className="py-16 px-6 lg:px-20 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video
                src="https://tvone.com/wp-content/uploads/2025/04/CALICO_SimplifyLED-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Video-Wall 도입을 검토하고 계신가요?
            </h2>
            <p className="text-white/80 mb-8">
              전문 상담원이 귀사의 환경에 최적화된 Video-Wall 솔루션을 제안해 드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </section>
      </>
    );
}
