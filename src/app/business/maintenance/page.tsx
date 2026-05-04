"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const benefits = [
  { title: "성능보장", description: "최적의 시스템 성능 유지", image: "/image/reference/work_1.jpg" },
  { title: "보안성", description: "철저한 보안으로 안전 강화", image: "/image/reference/work_2.jpg" },
  { title: "고장예방", description: "사전 점검으로 장애 차단", image: "/image/reference/work_3.jpg" },
  { title: "안정성", description: "지속 관리로 안정적 운용", image: "/image/reference/work_4.jpg" },
  { title: "비용절감", description: "효율 관리로 운영비 절감", image: "/image/reference/work_5.jpg" },
];

const expertiseCards = [
  {
    title: "설계/시공/감리/유지보수\n통합 수행 면허",
    items: ["정보통신공사업", "정보통신엔지니어링업", "소프트웨어사업"],
  },
  {
    title: "정보통신시스템 직접생산 능력",
    items: [
      "정보시스템 개발서비스",
      "정보시스템 유지관리서비스",
      "소프트웨어 유지 및 지원서비스",
      "정보인프라 구축서비스",
    ],
  },
  {
    title: "최첨단 ICT 기술과\n실무 능력을 겸비한 전문인력",
    items: ["기업부설연구소 운영", "20년 이상 축적된 노하우", "전문 기술 인증 보유 인력"],
  },
  {
    title: "검증된 안전관리 능력\n무재해/무사고",
    items: [
      "ISO 45001 안전보건경영시스템",
      "ISO 9001 품질경영시스템",
      "ISO 14001 환경경영시스템",
    ],
  },
];

const performanceTabs = [
  {
    id: "maintenance",
    label: "정보통신설비 유지보수 · 관리",
    items: [
      { title: "대학교 캠퍼스 통합 유지보수", subtitle: "연간 관리 5.3만㎡", image: "/image/reference/work_6.jpg" },
      { title: "식품/주류 공장 네트워크 유지보수", subtitle: "연간 관리 3.6만㎡", image: "/image/reference/work_7.jpg" },
      { title: "생활용품 제조공장 유지보수", subtitle: "연간 관리 2.7만㎡", image: "/image/reference/work_8.jpg" },
      { title: "철강 제조공장 유지보수", subtitle: "연간 관리 1.5만㎡", image: "/image/reference/work_9.jpg" },
      { title: "공공기관 통합 유지보수", subtitle: "연간 관리 4.2만㎡", image: "/image/reference/work_10.jpg" },
    ],
  },
  {
    id: "ict",
    label: "정보통신 사업",
    items: [
      { title: "대형 쇼핑몰 LED 전광판 구축", subtitle: "실외 LED 600㎡", image: "/image/reference/work_11.jpg" },
      { title: "관제센터 Video-Wall 구축", subtitle: "CALICO PRO 기반", image: "/image/reference/work_12.jpg" },
      { title: "기업 본사 IBS 통합시스템", subtitle: "지능형 빌딩 시스템", image: "/image/reference/work_13.jpg" },
      { title: "해외 호텔 네트워크 인프라", subtitle: "GUAM / Thailand", image: "/image/reference/work_14.jpg" },
    ],
  },
];

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("maintenance");
  const currentTab = performanceTabs.find((t) => t.id === activeTab) ?? performanceTabs[0];

  return (
    <>
        {/* Hero */}
        <section className="relative h-[560px] md:h-[640px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/image/reference/work_15.jpg" alt="정보통신 유지보수" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-20 pt-20">
            <p className="text-[#F5A623] text-sm md:text-base font-medium tracking-[0.25em] mb-5">
              Specialists in Reliable ICT
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              정보통신 유지보수·관리
            </h1>
            <p className="text-white/85 text-base md:text-lg mb-10 max-w-xl">
              상승종합통신은 정보통신 전문기업으로 최고의 품질을 제공합니다.
            </p>
            <Link href="/contact" className="inline-block border border-white text-white px-8 py-3 rounded text-sm font-medium hover:bg-white hover:text-black transition-colors">
              문의하기
            </Link>
          </div>
        </section>

        {/* 주요 사업분야 */}
        <section className="relative py-24 px-6 lg:px-20 bg-[#0B1E3F] overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(74,144,217,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(74,144,217,0.3) 0, transparent 40%)" }} />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              <div>
                <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Business</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">주요 사업분야</h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  상승종합통신은 최고의 품질과
                  <br />
                  서비스를 제공합니다.
                </p>
              </div>

              <Link href="/business/maintenance" className="group relative aspect-square rounded-xl overflow-hidden">
                <Image src="/image/reference/work_16.jpg" alt="정보통신설비 유지보수" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="text-white text-lg md:text-xl font-bold leading-snug">
                    정보통신설비
                    <br />
                    유지보수 관리
                  </h3>
                  <svg className="w-6 h-6 text-white shrink-0 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>

              <Link href="/business/network" className="group relative aspect-square rounded-xl overflow-hidden">
                <Image src="/image/reference/work_17.jpg" alt="네트워크 사업" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="text-white text-lg md:text-xl font-bold leading-snug">네트워크</h3>
                  <svg className="w-6 h-6 text-white shrink-0 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 보라색 섹션 */}
        <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative">
                <div className="bg-[#3B2B8F] rounded-r-[80px] lg:rounded-r-[120px] -ml-6 lg:-ml-20 px-6 lg:px-20 py-16 lg:py-20">
                  <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Maintenance &amp; Management</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    정보통신설비
                    <br />
                    유지보수 · 관리
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                {benefits.map((b, idx) => (
                  <div key={b.title} className={`bg-white rounded-xl overflow-hidden shadow-lg ${idx === 1 ? "lg:mt-12" : idx === 2 ? "lg:-mt-6" : idx === 3 ? "lg:mt-6" : idx === 4 ? "lg:-mt-6" : ""}`}>
                    <div className="relative aspect-[4/3] bg-gray-100">
                      <Image src={b.image} alt={b.title} fill className="object-cover" />
                    </div>
                    <div className="p-4 lg:p-5">
                      <h3 className="text-gray-900 text-base md:text-lg font-bold mb-1">{b.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 축적된 경험과 기술력 */}
        <section className="relative py-24 px-6 lg:px-20 bg-[#0B1E3F] overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(74,144,217,0.35) 0, transparent 50%)" }} />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Accumulated Expertise and Technology</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">축적된 경험과 기술력</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertiseCards.map((card, idx) => (
                <div key={idx} className="bg-[#0A1628] border border-white/10 rounded-2xl p-10 lg:p-12 text-center hover:border-[#4A90D9]/40 transition-colors">
                  <h3 className="text-white text-xl md:text-2xl font-bold whitespace-pre-line leading-snug mb-6">{card.title}</h3>
                  <div className="space-y-1.5 text-white/60 text-sm">
                    {card.items.map((item, i) => (<p key={i}>{item}</p>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 주요 사업실적 */}
        <section className="relative py-24 px-6 lg:px-20 bg-[#F6F8FB] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#F5A623] text-sm font-medium tracking-widest mb-4">Business performance</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">주요 사업실적</h2>
            </div>

            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {performanceTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${activeTab === tab.id ? "bg-[#3B2B8F] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#3B2B8F]"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentTab.items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-gray-900 text-base font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 px-6 lg:px-20 bg-gradient-to-r from-[#8CA5BF] to-[#A8BED6] overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.5) 0, transparent 40%)" }} />
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-white/90 text-sm font-medium mb-2">설계/구축/상담</p>
                <p className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-3">02-953-0056</p>
                <p className="text-white/80 text-sm">전화로 자세한 상담 및 견적을 확인하세요</p>
              </div>
              <Link href="/contact" className="inline-block bg-white text-[#0B1E3F] px-8 py-3 rounded font-semibold hover:bg-white/90 transition-colors">
                문의하기
              </Link>
            </div>
          </div>
        </section>
      </>
    );
}