"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const pixelPitches = ["P1.2", "P1.5", "P1.8", "P2.5", "P4"];

const galleryImages = [
  "/image/S-Wall/1.png",
  "/image/S-Wall/2.jpg",
  "/image/S-Wall/3.png",
  "/image/S-Wall/4.png",
  "/image/S-Wall/5-1.jpg",
  "/image/S-Wall/5-2.jpg",
  "/image/S-Wall/5-3.jpg",
  "/image/S-Wall/5-4.jpg",
];

const specifications = [
  { label: "Model", value: "S-Wall" },
  { label: "Pixel Pitch (mm)", value: "1.2 / 1.5 / 1.8 / 2.5 / 4.0" },
  { label: "Brightness (nit)", value: "800 ~ 1,500" },
  { label: "Refresh Rate (Hz)", value: "3,840" },
  { label: "Viewing Angle (H/V)", value: "160° / 160°" },
  { label: "Cabinet Size (mm)", value: "600 × 337.5 × 45" },
  { label: "IP Rating", value: "Front IP30" },
  { label: "Power (Max/Avg) (W/㎡)", value: "450 / 160" },
  { label: "Lifespan (hrs)", value: "100,000+" },
  { label: "Operating Temp.", value: "-20°C ~ 50°C" },
];

const techFeatures = [
  {
    title: "고화질 HDR 지원",
    subtitle: "HDR Processing",
    description:
      "S-Wall은 HDR 콘텐츠를 지원하여 밝은 영역과 어두운 영역의 디테일을 동시에 표현합니다. 넓은 색재현율로 현실에 가까운 생생한 영상을 구현합니다.",
  },
  {
    title: "초슬림 전면 유지보수",
    subtitle: "Front Maintenance Design",
    description:
      "45mm의 초슬림 캐비닛 설계로 벽면에 밀착 설치가 가능하며, 전면에서 모듈 교체가 가능하여 후면 접근이 불필요합니다. 공간 효율을 극대화합니다.",
  },
  {
    title: "무소음·저전력 설계",
    subtitle: "Fanless & Low Power",
    description:
      "팬리스 설계로 완전 무소음 환경을 제공합니다. 회의실, 스튜디오 등 소음에 민감한 공간에서도 최적의 환경을 유지하며 에너지 효율도 뛰어납니다.",
  },
];

const applications = [
  { title: "회의실", description: "고품질 프레젠테이션 및 화상회의 환경" },
  { title: "방송 스튜디오", description: "XR/VR 가상 스튜디오 배경" },
  { title: "컨트롤룸", description: "24시간 운영 관제센터 대형 모니터링" },
  { title: "기업 로비", description: "고급스러운 디지털 사이니지" },
  { title: "전시·갤러리", description: "몰입형 미디어 아트 연출" },
  { title: "교육기관", description: "강의실 및 캠퍼스 정보 시스템" },
];

export default function SWallDetailPage() {
  const [selectedPitch, setSelectedPitch] = useState("P1.8");
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        {/* Section 1: Full-screen Hero — 큐보스/임팩트럼 스타일 */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/image/S-Wall/5-1.jpg"
              alt="S-Wall LED Display"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-20 py-20">
            <span className="inline-block text-[#4A90D9] text-xs tracking-[0.3em] font-medium border border-[#4A90D9]/30 px-4 py-1.5 rounded-full mb-6">
              INDOOR FIXED LED
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95]">
              S-Wall
            </h1>
            <p className="text-[#aaa] text-base md:text-lg max-w-xl leading-relaxed mb-8">
              고화질, 고해상도의 실내 환경에 최적화된 LED 디스플레이.
              <br />
              어떤 공간이든 몰입감 있는 영상 경험을 선사합니다.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-10">
              <div>
                <span className="block text-white/30 text-xs mb-1">Screen Size</span>
                <span className="text-white font-medium">Custom</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white/30 text-xs mb-1">Pixel Pitch</span>
                <span className="text-white font-medium">P1.2 ~ P4</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white/30 text-xs mb-1">Brightness</span>
                <span className="text-white font-medium">800~1,500 nit</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white/30 text-xs mb-1">Application</span>
                <span className="text-white font-medium">회의실 · 스튜디오 · 로비 · 관제센터</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3.5 rounded font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              견적문의
            </Link>
          </div>
        </section>

        {/* Section 2: Product Gallery + Specs — Samsung The Wall 상단 스타일 */}
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Gallery */}
              <div>
                <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={galleryImages[selectedImage]}
                    alt={`S-Wall View ${selectedImage + 1}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#4A90D9]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  실내용 S-Wall
                </h2>
                <p className="text-gray-400 text-sm mb-6">Indoor Fixed LED Display</p>

                <p className="text-gray-600 leading-relaxed mb-8">
                  고화질, 고해상도의 실내 환경에 최적화된 LED 디스플레이입니다.
                  회의실, 방송 스튜디오, 기업 로비 등 다양한 실내 공간에서
                  몰입감 있는 영상 경험을 제공합니다.
                </p>

                {/* Pixel Pitch Selector */}
                <div className="mb-8">
                  <span className="text-gray-900 font-bold text-sm mb-3 block">픽셀 피치</span>
                  <div className="flex flex-wrap gap-2">
                    {pixelPitches.map((pitch) => (
                      <button
                        key={pitch}
                        onClick={() => setSelectedPitch(pitch)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                          selectedPitch === pitch
                            ? "border-[#4A90D9] text-[#4A90D9] bg-[#4A90D9]/5"
                            : "border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {pitch.replace("P", "")} mm
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-black transition-colors w-full text-center mb-6"
                >
                  견적문의
                </Link>

                <p className="text-gray-400 text-xs text-center leading-relaxed">
                  간편하게 온라인 문의를 남겨주세요.
                  <br />
                  접수된 견적문의는 담당자 확인 후
                  <br />
                  신속하고 친절하게 안내해 드리겠습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Immersive Banner — Samsung The Wall 메인 비주얼 스타일 */}
        <section className="relative py-0">
          <div className="sticky-nav bg-black border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between h-14">
              <div className="flex items-center gap-8">
                <span className="text-white font-bold text-sm">실내용 S-Wall</span>
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <a href="#features" className="text-white/60 hover:text-white transition-colors">특장점</a>
                  <a href="#specs" className="text-white/60 hover:text-white transition-colors">스펙</a>
                  <a href="#applications" className="text-white/60 hover:text-white transition-colors">활용분야</a>
                </div>
              </div>
              <Link
                href="/contact"
                className="text-sm border border-white/30 text-white px-5 py-1.5 rounded hover:bg-white hover:text-black transition-all"
              >
                견적문의
              </Link>
            </div>
          </div>

          <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0">
              <Image
                src="/image/S-Wall/5-3.jpg"
                alt="S-Wall in space"
                fill
                className="object-cover opacity-50"
              />
            </div>
            <div className="relative text-center px-6 max-w-4xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                실내 디스플레이의 정점,
                <br />
                S-Wall
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                어떤 디스플레이와도 비교할 수 없을 정도로 광활한 세상과 숨막히는 몰입 경험을
                S-Wall을 통해 시연하세요. 상승종합통신의 연구와 개발로 완성된 LED 전문 기술로
                비즈니스를 위한 최고 수준의 시청 경험을 선사합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Features — AI 프로세서 스타일의 기술 특징 */}
        <section id="features" className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            {techFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-center ${index > 0 ? "mt-32" : ""}`}
              >
                <div className="md:w-1/2">
                  <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src={galleryImages[index + 2] || galleryImages[0]}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-[#4A90D9] text-xs tracking-[0.2em] font-medium mb-3 block">
                    {feature.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Specifications Table */}
        <section id="specs" className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Specifications</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4 text-gray-700 font-medium bg-gray-50 w-2/5 text-sm">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-center text-sm">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs text-center mt-4">
              * 사양은 제품 개선을 위해 사전 고지 없이 변경될 수 있습니다.
            </p>
          </div>
        </section>

        {/* Section 6: Applications */}
        <section id="applications" className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Applications</h2>
            <p className="text-gray-500 text-center mb-12">다양한 실내 공간에서 최적의 영상 솔루션을 제공합니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <span className="text-[#4A90D9] text-xs font-bold mb-3 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-gray-900 text-lg font-bold mb-2">{app.title}</h3>
                  <p className="text-gray-500 text-sm">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: CTA */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              S-Wall 도입을 검토하고 계신가요?
            </h2>
            <p className="text-white/80 mb-8">
              전문 상담원이 귀사에 최적화된 솔루션을 제안해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
              >
                견적문의
              </Link>
              <Link
                href="/works"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded font-semibold hover:bg-white/10 transition-colors"
              >
                시공사례 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
