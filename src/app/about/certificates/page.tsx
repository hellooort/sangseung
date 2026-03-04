import Header from "@/components/Header";
import Footer from "@/components/Footer";

const certificates = [
  { id: 1, title: "IT 스마트코리아 표창", category: "표창", year: "2020" },
  { id: 2, title: "기업부설연구소 인정서", category: "인증", year: "2020" },
  { id: 3, title: "직접생산확인증명서 (기상전광판)", category: "인증", year: "2020" },
  { id: 4, title: "직접생산확인증명서 (교통정보전광판)", category: "인증", year: "2020" },
  { id: 5, title: "직접생산확인증명서 (안내전광판)", category: "인증", year: "2020" },
  { id: 6, title: "직접생산확인증명서 (영상정보디스플레이장치)", category: "인증", year: "2020" },
  { id: 7, title: "우수기술기업 인증서", category: "인증", year: "2018" },
  { id: 8, title: "정보통신공사업 등록증", category: "등록", year: "2002" },
  { id: 9, title: "소프트웨어사업자 신고확인서", category: "등록", year: "2008" },
  { id: 10, title: "공장등록증", category: "등록", year: "2019" },
  { id: 11, title: "사업자등록증", category: "등록", year: "2001" },
  { id: 12, title: "ISO 9001 인증서", category: "품질", year: "2018" },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              CERTIFICATES
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">인증서</h1>

            {/* 갤러리 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden"
                >
                  {/* 이미지 영역 */}
                  <div className="aspect-[3/4] bg-[#2a2a2a] flex items-center justify-center relative">
                    <div className="text-center p-4">
                      <span className="text-[#333] text-4xl font-bold block mb-2">{cert.id}</span>
                      <span className="text-[#444] text-xs">이미지 영역</span>
                    </div>
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#4A90D9] text-xs px-2 py-0.5 bg-[#4A90D9]/10 rounded">
                        {cert.category}
                      </span>
                      <span className="text-[#666] text-xs">{cert.year}</span>
                    </div>
                    <h3 className="text-white text-sm font-medium line-clamp-2">
                      {cert.title}
                    </h3>
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
