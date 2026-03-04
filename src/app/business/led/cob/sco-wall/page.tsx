import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const keyFeatures = [
  "COB Packaging Technology",
  "Ultra Fine Pixel Pitch",
  "High Contrast Ratio",
  "Wide Viewing Angle",
  "Anti-Glare Surface",
  "Front Maintenance",
];

const specifications = [
  { label: "Model", value: "SCO-Wall" },
  { label: "Pixel Pitch(mm)", value: "0.78 / 0.93 / 1.25" },
  { label: "Cabinet Dimensions(WxHxD)(mm)", value: "600 x 337.5 x 45" },
  { label: "Cabinet Resolution(WxH)(pixels)", value: "768 x 432 / 640 x 360 / 480 x 270" },
  { label: "Module Size(WxH)(mm)", value: "150 x 168.75" },
  { label: "Brightness(nit)", value: "500 ~ 800" },
  { label: "Refresh(Hz)", value: "3,840" },
  { label: "Viewing Angle(H/V)(°)", value: "170 / 170" },
  { label: "IP Rating", value: "Front IP30" },
  { label: "Power Consumption(Max./Avg.)(W/㎡)", value: "400 / 150" },
];

const applications = [
  {
    title: "컨트롤룸",
    description: "24시간 운영되는 관제센터, 컨트롤룸에 최적화된 솔루션",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "방송 스튜디오",
    description: "고화질 방송 환경에 적합한 LED 백그라운드",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "회의실",
    description: "프리미엄 화상회의 및 프레젠테이션 환경 구축",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "기업 로비",
    description: "고급스러운 기업 이미지를 전달하는 디지털 사이니지",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function SCOWallPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/business/led" className="hover:text-[#4A90D9]">LED 디스플레이</Link>
              <span>/</span>
              <Link href="/business/led/cob" className="hover:text-[#4A90D9]">COB LED</Link>
              <span>/</span>
              <span className="text-[#4A90D9]">SCO-Wall Series</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 제품 이미지 */}
              <div className="relative bg-gray-100 rounded-2xl p-8">
                <Image
                  src="/image/SCO-Wall/1-1.png"
                  alt="SCO-Wall LED Display"
                  width={500}
                  height={400}
                  className="w-full"
                />
              </div>

              {/* Key Features */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">SCO-Wall Series</h1>
                <p className="text-gray-600 text-lg mb-8">
                  COB 패키징 기술을 적용한 프리미엄 LED 월입니다.
                  초미세 픽셀피치로 가까운 거리에서도 선명한 화질을 제공합니다.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="text-gray-400">-</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="py-20 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Specifications</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4 text-gray-700 font-medium bg-gray-50 w-2/5">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-center">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* COB Technology */}
        <section className="py-20 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">COB Technology</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Chip on Board 기술로 LED 칩이 기판에 직접 실장되어 
              기존 SMD 방식 대비 뛰어난 내구성과 화질을 제공합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <Image
                  src="/image/SCO-Wall/2.png"
                  alt="COB Technology Detail"
                  width={500}
                  height={300}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="text-gray-900 font-bold mb-2">미세 픽셀 구조</h3>
                <p className="text-gray-600 text-sm">초미세 픽셀피치로 가까운 시청 거리에서도 선명한 화질을 제공합니다.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <Image
                  src="/image/SCO-Wall/3.png"
                  alt="Surface Protection"
                  width={500}
                  height={300}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="text-gray-900 font-bold mb-2">표면 보호 기술</h3>
                <p className="text-gray-600 text-sm">에폭시 코팅으로 충격과 먼지로부터 LED 칩을 보호합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Front Maintenance */}
        <section className="py-20 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Front Maintenance</h2>
            <p className="text-gray-600 mb-12">
              전면 유지보수 설계로 벽면 설치 시에도 편리한 모듈 교체가 가능합니다.
            </p>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Image
                src="/image/SCO-Wall/4.png"
                alt="Front Maintenance"
                width={800}
                height={400}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-[#4A90D9]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#4A90D9]">
                    {app.icon}
                  </div>
                  <h3 className="text-gray-900 font-bold mb-2">{app.title}</h3>
                  <p className="text-gray-600 text-sm">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              SCO-Wall 제품에 대해 더 알고 싶으신가요?
            </h2>
            <p className="text-white/80 mb-8">
              전문 상담원이 귀사에 최적화된 솔루션을 제안해 드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#4A90D9] px-8 py-4 rounded font-semibold hover:bg-white/90 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
