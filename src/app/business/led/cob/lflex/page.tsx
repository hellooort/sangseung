import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const keyFeatures = [
  "High Brightness LED Chip",
  "Free Extended Mode",
  "Various Size Configuration",
  "Easy & Simple Extended",
  "Operating Monitoring",
  "Plug and Play",
];

const specifications = [
  { label: "Model", value: "LFlex" },
  { label: "Pixel Pitch(mm)", value: "0.93 / 1.25 / 1.56" },
  { label: "Cabinet Dimensions(WxHxD)(mm)", value: "600 x 337.5 x 45" },
  { label: "Cabinet Resolution(WxH)(pixels)", value: "640 x 360" },
  { label: "Module Size(WxH)(mm)", value: "150 x 168.75" },
  { label: "Brightness(nit)", value: "600" },
  { label: "Refresh(Hz)", value: "3,840" },
  { label: "Viewing Angle(H/V)(°)", value: "170 / 170" },
  { label: "IP Rating", value: "Front IP30" },
  { label: "Power Consumption(Max./Avg.)(W/㎡)", value: "350 / 120" },
];

const sizeConfigs = [
  { name: "LFlex 55", size: "55 Inch", displaySize: "1,200 x 675mm" },
  { name: "LFlex 82", size: "82 Inch", displaySize: "1,800 x 1,012.5mm" },
  { name: "LFlex 110", size: "110 Inch", displaySize: "2,400 x 1,350mm" },
  { name: "LFlex 137", size: "137 Inch", displaySize: "3,000 x 1,687.5mm" },
];

export default function LFlexPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section - 제품 소개 */}
        <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/business/led" className="hover:text-[#4A90D9]">LED 디스플레이</Link>
              <span>/</span>
              <Link href="/business/led/cob" className="hover:text-[#4A90D9]">COB LED</Link>
              <span>/</span>
              <span className="text-[#4A90D9]">LFlex</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 제품 이미지 */}
              <div className="relative">
                <Image
                  src="/image/LFlex/LFlex_01.jpg"
                  alt="LFlex LED Display"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>

              {/* Key Features */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">LFlex</h1>
                <p className="text-gray-600 text-lg mb-8">
                  COB 기술이 적용된 고화질 플렉시블 LED 디스플레이로,
                  뛰어난 화질과 자유로운 확장성을 제공합니다.
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

        {/* Free Extended Mode */}
        <section className="py-20 px-6 lg:px-20 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Extended Mode</h2>
            <p className="text-gray-600 mb-12">
              베젤 없이 최대 9개까지 스크린 확장이 가능합니다.
            </p>
            <div className="bg-gray-100 rounded-2xl p-8">
              <Image
                src="/image/LFlex/LFlex_trans.jpg"
                alt="Free Extended Mode"
                width={800}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Various Size Configuration */}
        <section className="py-20 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Various Size Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sizeConfigs.map((config, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src="/image/LFlex/cob-tv_black_screen.png"
                      alt={config.name}
                      width={300}
                      height={200}
                      className="max-h-32 object-contain"
                    />
                  </div>
                  <p className="text-gray-900 font-medium">
                    {config.name}({config.size}) Display Size: {config.displaySize}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-20 px-6 lg:px-20 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Operating Monitoring</h2>
            <p className="text-gray-600 mb-12">
              Windows, Android 등 다양한 플랫폼을 지원합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <Image
                  src="/image/LFlex/LFlex_win10.png"
                  alt="Windows Support"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-gray-700 font-medium">Windows 10/11 지원</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <Image
                  src="/image/LFlex/LFlex_android.png"
                  alt="Android Support"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-gray-700 font-medium">Android 지원</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessories */}
        <section className="py-20 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Accessories</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Image
                src="/image/LFlex/Accessories.jpg"
                alt="LFlex Accessories"
                width={800}
                height={400}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              LFlex 제품에 대해 더 알고 싶으신가요?
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
