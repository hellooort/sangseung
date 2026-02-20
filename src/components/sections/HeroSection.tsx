"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#0A0A0A]">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <iframe
          src="https://www.youtube.com/embed/fGzwSTcslz4?autoplay=1&mute=1&loop=1&playlist=fGzwSTcslz4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Background Video"
          className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ minWidth: '100%', minHeight: '100%' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Content - 수직 중앙 정렬 */}
      <div className="relative z-20 h-full flex items-center justify-center px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-5 py-2 rounded-full border border-white/30 text-white/70 text-xs tracking-widest backdrop-blur-sm">
              ONE-STOP SOLUTION
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
            네트워크에서 LED까지
            <br />
            디지털 인프라의 새로운 기준
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
            상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.
            <br className="hidden md:block" />
            디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-black px-8 py-4 rounded text-base font-semibold hover:bg-white/90 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/works"
              className="border border-white/50 text-white px-8 py-4 rounded text-base font-medium hover:bg-white/10 backdrop-blur-sm transition-colors"
            >
              시공사례 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
