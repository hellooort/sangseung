import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">회사소개</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">ONE-STOP Solution</h2>
                <div className="text-[#888] leading-loose space-y-6">
                  <p>
                    상승종합통신㈜는 네트워크 통합시스템 및 IBS 구축, LED DISPLAY 전문 제조업체입니다.
                  </p>
                  <p>
                    디자인, 설계, 제작, 시공까지 전 과정을 수행하는 One-Stop Solution 업체입니다.
                  </p>
                  <p>
                    지속적인 연구개발(R&D)을 통해 고품질의 제품을 제공하기 위해 노력하고 있으며,
                    국내 및 해외 중요 프로젝트를 성공적으로 수행하며 글로벌 비즈니스 파트너로 성장하고 있습니다.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">회사 정보</h3>
                <dl className="space-y-4">
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-24 flex-shrink-0">회사명</dt>
                    <dd className="text-white">상승종합통신㈜</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-24 flex-shrink-0">영문명</dt>
                    <dd className="text-white">SANGSEUNG Co., Ltd.</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-24 flex-shrink-0">대표이사</dt>
                    <dd className="text-white">조남각</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-24 flex-shrink-0">설립년도</dt>
                    <dd className="text-white">2001년</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-[#4A90D9] w-24 flex-shrink-0">사업분야</dt>
                    <dd className="text-white">NI, LED Display, SI, Media Façade, Network, IBS</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
