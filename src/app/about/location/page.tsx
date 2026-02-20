import Header from "@/components/Header";
import Footer from "@/components/Footer";

const locations = [
  {
    name: "본사",
    address: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호",
    tel: "02-953-0056",
    fax: "02-953-0118",
    mapQuery: "서울시 강서구 양천로 551-24",
  },
  {
    name: "미디어시스템사업부",
    address: "경기도 구리시 갈매순환로166번길 46 금강펜테리움IX타워 제5층 020, 021호",
    tel: "031-512-0110",
    fax: "031-512-0120",
    mapQuery: "경기도 구리시 갈매순환로166번길 46",
  },
  {
    name: "양주공장",
    address: "경기도 양주시 율정로 20(옥정동) 양주옥정메타엑스 지식산업센터 514,515호",
    tel: "031-512-0110",
    fax: "031-512-0120",
    mapQuery: "경기도 양주시 율정로 20",
  },
];

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              LOCATION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">오시는 길</h1>

            <div className="space-y-12">
              {locations.map((location, index) => (
                <div key={location.name} className="bg-[#111] rounded-2xl overflow-hidden">
                  {/* 지도 영역 */}
                  <div className="aspect-video md:aspect-[21/9] bg-[#1a1a1a] relative">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* 정보 영역 */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[#4A90D9] text-sm px-3 py-1 bg-[#4A90D9]/10 rounded font-medium">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-white text-xl md:text-2xl font-bold">
                            {location.name}
                          </h2>
                        </div>
                        <p className="text-[#ccc] text-sm md:text-base leading-relaxed">
                          {location.address}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                        <div>
                          <span className="text-[#666] text-xs block mb-1">TEL</span>
                          <a
                            href={`tel:${location.tel}`}
                            className="text-white font-medium hover:text-[#4A90D9] transition-colors"
                          >
                            {location.tel}
                          </a>
                        </div>
                        <div>
                          <span className="text-[#666] text-xs block mb-1">FAX</span>
                          <span className="text-white font-medium">{location.fax}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
