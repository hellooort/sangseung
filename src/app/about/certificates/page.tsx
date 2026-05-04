import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
import CertificatesClient from "./CertificatesClient";

export interface CertCat {
  id: number;
  name_ko: string;
  sort_order: number;
}

export interface CertRow {
  id: number;
  category_id: number | null;
  title_ko: string;
  image_url: string | null;
  sort_order: number;
}

const fallbackCats: CertCat[] = [
  { id: 1, name_ko: "품질", sort_order: 0 },
  { id: 2, name_ko: "인증", sort_order: 1 },
  { id: 3, name_ko: "등록", sort_order: 2 },
  { id: 4, name_ko: "생산", sort_order: 3 },
  { id: 5, name_ko: "표창", sort_order: 4 },
  { id: 6, name_ko: "특허", sort_order: 5 },
];

const fallback: CertRow[] = [
  { id: 1, category_id: 1, title_ko: "ISO 14001 인증서 (EN)", image_url: "/image/cert/cert_1.jpg", sort_order: 0 },
  { id: 2, category_id: 1, title_ko: "ISO 45001 인증서 (EN)", image_url: "/image/cert/cert_2.jpg", sort_order: 1 },
  { id: 3, category_id: 1, title_ko: "ISO 9001 인증서 (EN)", image_url: "/image/cert/cert_3.jpg", sort_order: 2 },
  { id: 4, category_id: 2, title_ko: "LED 모듈 KC 인증서 P1.25mm ~ P2.976mm", image_url: "/image/cert/cert_4.jpg", sort_order: 3 },
  { id: 5, category_id: 2, title_ko: "LED 모듈 KC 인증서 P2.5mm", image_url: "/image/cert/cert_5.jpg", sort_order: 4 },
  { id: 6, category_id: 2, title_ko: "LED 모듈 KC 인증서 P3.91mm ~ P10mm", image_url: "/image/cert/cert_6.jpg", sort_order: 5 },
  { id: 7, category_id: 2, title_ko: "LED 디스플레이 국제안전인증서 P10mm (CB인증)", image_url: "/image/cert/cert_7.jpg", sort_order: 6 },
  { id: 8, category_id: 2, title_ko: "LED 컨트롤러 KC 인증서", image_url: "/image/cert/cert_8.jpg", sort_order: 7 },
  { id: 9, category_id: 2, title_ko: "경영혁신형 중소기업 (Main-Biz) 확인서", image_url: "/image/cert/cert_9.jpg", sort_order: 8 },
  { id: 10, category_id: 5, title_ko: "대한민국커뮤니티 표창장", image_url: "/image/cert/cert_10.png", sort_order: 9 },
  { id: 11, category_id: 2, title_ko: "벤처기업확인서", image_url: "/image/cert/cert_11.jpg", sort_order: 10 },
  { id: 12, category_id: 3, title_ko: "여신전문금융업 등록증", image_url: "/image/cert/cert_12.jpg", sort_order: 11 },
  { id: 13, category_id: 3, title_ko: "전기공사업등록증", image_url: "/image/cert/cert_13.jpg", sort_order: 12 },
  { id: 14, category_id: 3, title_ko: "소프트웨어사업자 신고확인서", image_url: "/image/cert/cert_14.jpg", sort_order: 13 },
  { id: 15, category_id: 3, title_ko: "전문건설업등록증", image_url: "/image/cert/cert_15.jpg", sort_order: 14 },
  { id: 16, category_id: 2, title_ko: "이노비즈 확인서", image_url: "/image/cert/cert_16.jpg", sort_order: 15 },
  { id: 17, category_id: 2, title_ko: "우수기술기업인증서", image_url: "/image/cert/cert_17.jpg", sort_order: 16 },
  { id: 18, category_id: 5, title_ko: "중소벤처기업부장관 표창장", image_url: "/image/cert/cert_18.jpg", sort_order: 17 },
  { id: 19, category_id: 4, title_ko: "직접생산확인증명서 - 데이터분석장치", image_url: "/image/cert/cert_19.jpg", sort_order: 18 },
  { id: 20, category_id: 4, title_ko: "직접생산확인증명서 - 스마트그린에너지디스플레이장치", image_url: "/image/cert/cert_20.jpg", sort_order: 19 },
  { id: 21, category_id: 4, title_ko: "직접생산확인증명서 - 안내전광판, 교통정보전광판, 기상전광판", image_url: "/image/cert/cert_21.jpg", sort_order: 20 },
  { id: 22, category_id: 4, title_ko: "직접생산확인증명서 - 영상정보디스플레이장치", image_url: "/image/cert/cert_22.jpg", sort_order: 21 },
  { id: 23, category_id: 4, title_ko: "직접생산확인증명서 - 정보표시판, 정보시스템유지관리용역", image_url: "/image/cert/cert_23.jpg", sort_order: 22 },
  { id: 24, category_id: 4, title_ko: "직접생산확인증명서 - 인터넷정보표시장치", image_url: "/image/cert/cert_24.jpg", sort_order: 23 },
  { id: 25, category_id: 4, title_ko: "직접생산확인증명서 - 전광표시판관리서버", image_url: "/image/cert/cert_25.jpg", sort_order: 24 },
  { id: 26, category_id: 4, title_ko: "직접생산확인증명서 - 패키지소프트웨어및멀티미디어소프트, 정보시스템개발서비스", image_url: "/image/cert/cert_26.jpg", sort_order: 25 },
  { id: 27, category_id: 6, title_ko: "특허증 - 클라우드 기반의 전광판 시스템", image_url: "/image/cert/cert_27.jpg", sort_order: 26 },
];

export default async function CertificatesPage() {
  const [cats, certs] = await Promise.all([
    getList<CertCat>("certificate_categories", { orderBy: "sort_order" }, fallbackCats),
    getList<CertRow>("certificates", { orderBy: "sort_order" }, fallback),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <CertificatesClient categories={cats} certificates={certs} />
      </main>
      <Footer />
    </div>
  );
}
