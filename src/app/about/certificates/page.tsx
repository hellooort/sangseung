import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const certificates = [
  { id: 1, title: "ISO 14001 인증서 (EN)", category: "품질", image: "/image/cert/cert_1.jpg" },
  { id: 2, title: "ISO 45001 인증서 (EN)", category: "품질", image: "/image/cert/cert_2.jpg" },
  { id: 3, title: "ISO 9001 인증서 (EN)", category: "품질", image: "/image/cert/cert_3.jpg" },
  { id: 4, title: "LED 모듈 KC 인증서 P1.25mm ~ P2.976mm", category: "인증", image: "/image/cert/cert_4.jpg" },
  { id: 5, title: "LED 모듈 KC 인증서 P2.5mm", category: "인증", image: "/image/cert/cert_5.jpg" },
  { id: 6, title: "LED 모듈 KC 인증서 P3.91mm ~ P10mm", category: "인증", image: "/image/cert/cert_6.jpg" },
  { id: 7, title: "LED 디스플레이 국제안전인증서 P10mm (CB인증)", category: "인증", image: "/image/cert/cert_7.jpg" },
  { id: 8, title: "LED 컨트롤러 KC 인증서", category: "인증", image: "/image/cert/cert_8.jpg" },
  { id: 9, title: "경영혁신형 중소기업 (Main-Biz) 확인서", category: "인증", image: "/image/cert/cert_9.jpg" },
  { id: 10, title: "대한민국커뮤니티 표창장", category: "표창", image: "/image/cert/cert_10.png" },
  { id: 11, title: "벤처기업확인서", category: "인증", image: "/image/cert/cert_11.jpg" },
  { id: 12, title: "여신전문금융업 등록증", category: "등록", image: "/image/cert/cert_12.jpg" },
  { id: 13, title: "전기공사업등록증", category: "등록", image: "/image/cert/cert_13.jpg" },
  { id: 14, title: "소프트웨어사업자 신고확인서", category: "등록", image: "/image/cert/cert_14.jpg" },
  { id: 15, title: "전문건설업등록증", category: "등록", image: "/image/cert/cert_15.jpg" },
  { id: 16, title: "이노비즈 확인서", category: "인증", image: "/image/cert/cert_16.jpg" },
  { id: 17, title: "우수기술기업인증서", category: "인증", image: "/image/cert/cert_17.jpg" },
  { id: 18, title: "중소벤처기업부장관 표창장", category: "표창", image: "/image/cert/cert_18.jpg" },
  { id: 19, title: "직접생산확인증명서 - 데이터분석장치", category: "생산", image: "/image/cert/cert_19.jpg" },
  { id: 20, title: "직접생산확인증명서 - 스마트그린에너지디스플레이장치", category: "생산", image: "/image/cert/cert_20.jpg" },
  { id: 21, title: "직접생산확인증명서 - 안내전광판, 교통정보전광판, 기상전광판", category: "생산", image: "/image/cert/cert_21.jpg" },
  { id: 22, title: "직접생산확인증명서 - 영상정보디스플레이장치", category: "생산", image: "/image/cert/cert_22.jpg" },
  { id: 23, title: "직접생산확인증명서 - 정보표시판, 정보시스템유지관리용역", category: "생산", image: "/image/cert/cert_23.jpg" },
  { id: 24, title: "직접생산확인증명서 - 인터넷정보표시장치", category: "생산", image: "/image/cert/cert_24.jpg" },
  { id: 25, title: "직접생산확인증명서 - 전광표시판관리서버", category: "생산", image: "/image/cert/cert_25.jpg" },
  { id: 26, title: "직접생산확인증명서 - 패키지소프트웨어및멀티미디어소프트, 정보시스템개발서비스", category: "생산", image: "/image/cert/cert_26.jpg" },
  { id: 27, title: "특허증 - 클라우드 기반의 전광판 시스템", category: "특허", image: "/image/cert/cert_27.jpg" },
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">인증서</h1>
            <p className="text-[#888] mb-12">상승종합통신㈜의 기술력과 품질을 증명하는 인증서입니다.</p>

            {/* 갤러리 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group bg-[#1a1a1a] rounded-xl overflow-hidden"
                >
                  {/* 이미지 영역 */}
                  <div className="aspect-[3/4] bg-[#2a2a2a] relative overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#4A90D9] text-xs px-2 py-0.5 bg-[#4A90D9]/10 rounded">
                        {cert.category}
                      </span>
                    </div>
                    <h3 className="text-white text-xs font-medium line-clamp-2 leading-relaxed">
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
