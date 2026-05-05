import MaintenanceClient, { type MaintenanceData } from "./MaintenanceClient";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";

const fallback: MaintenanceData = {
  hero: {
    badge_en: "Specialists in Reliable ICT",
    title_ko: "ICT 유지보수 및 관리",
    title_en: "ICT Maintenance & Management",
    description_ko: "상승종합통신은 최고의 품질로 신뢰를 제공하는 ICT 전문 기업입니다.",
    description_en: "SANGSEUNG is an ICT specialist delivering best-in-class quality.",
    image: "/image/reference/work_15.jpg",
    ctaLabel_ko: "문의하기",
    ctaLabel_en: "Contact Us",
    ctaHref: "/contact",
  },
  ctaPhone: {
    label_ko: "설계 / 시공 / 컨설팅",
    label_en: "Design / Build / Consulting",
    phone: "02-953-0056",
    description_ko: "자세한 상담 및 견적 문의는 전화로 연락주세요",
    description_en: "Call us for detailed consultation and quotation",
    button_ko: "문의하기",
    button_en: "Contact Us",
    button_href: "/contact",
  },
  benefits: [
    { id: "1", title_ko: "성능 보장", title_en: "Performance",  description_ko: "최상의 성능으로 시스템 운영", description_en: "Keep systems running at peak performance", image: "/image/reference/work_1.jpg" },
    { id: "2", title_ko: "보안 강화", title_en: "Security",     description_ko: "철저한 보안으로 안전 보호",   description_en: "Strict security for stronger protection",  image: "/image/reference/work_2.jpg" },
    { id: "3", title_ko: "장애 예방", title_en: "Prevention",   description_ko: "선제적 점검으로 장애 예방",   description_en: "Proactive checks prevent failures",        image: "/image/reference/work_3.jpg" },
    { id: "4", title_ko: "안정 운영", title_en: "Reliability",  description_ko: "지속 관리로 안정적인 운영",   description_en: "Stable operation through continuous care", image: "/image/reference/work_4.jpg" },
    { id: "5", title_ko: "비용 절감", title_en: "Cost Saving",  description_ko: "효율적 관리로 운영비 절감",   description_en: "Efficient management lowers OPEX",         image: "/image/reference/work_5.jpg" },
  ],
  expertiseCards: [
    { id: "1", title_ko: "설계/시공/감리/유지보수\n통합 보유 면허", title_en: "Integrated Licenses\nDesign / Build / Supervision / Maintenance", items_ko: "정보통신공사업\n정보통신엔지니어링\n소프트웨어사업", items_en: "ICT Construction\nICT Engineering\nSoftware Business" },
    { id: "2", title_ko: "정보통신 시스템 직접 생산", title_en: "Direct ICT System Production", items_ko: "IT 시스템 개발\nIT 시스템 유지보수\n소프트웨어 지원 및 컨설팅\nIT 인프라 구축", items_en: "IT System Development\nIT System Maintenance\nSoftware Support\nIT Infrastructure Build" },
    { id: "3", title_ko: "최신 ICT 기술과\n현장 경험을 갖춘 전문가", title_en: "Experts in Cutting-edge ICT\nand Hands-on Skill", items_ko: "기업부설 연구소\n20년 이상 축적된 노하우\n전문 자격 보유 인력", items_en: "In-house R&D Institute\n20+ Years of Know-how\nCertified Specialists" },
    { id: "4", title_ko: "검증된 안전관리 체계\n무사고/무재해", title_en: "Proven Safety Management\nZero Incidents", items_ko: "ISO 45001 안전보건경영시스템\nISO 9001 품질경영시스템\nISO 14001 환경경영시스템", items_en: "ISO 45001 OHS Management\nISO 9001 Quality Management\nISO 14001 Environmental Management" },
  ],
  performanceTabs: [
    { id: "maint", label_ko: "정보통신 유지보수 · 관리", label_en: "ICT Maintenance & Management", items: [
      { id: "1", title_ko: "대학 캠퍼스 유지보수",       title_en: "University Campus Maintenance",  subtitle_ko: "연 면적 5.3만㎡", subtitle_en: "53,000 m²/yr", image: "/image/reference/work_6.jpg" },
      { id: "2", title_ko: "식음료 공장 네트워크 구축", title_en: "Food/Beverage Plant Network",   subtitle_ko: "연 면적 3.6만㎡", subtitle_en: "36,000 m²/yr", image: "/image/reference/work_7.jpg" },
      { id: "3", title_ko: "생활용품 제조사 유지보수",   title_en: "Consumer Goods Factory",        subtitle_ko: "연 면적 2.7만㎡", subtitle_en: "27,000 m²/yr", image: "/image/reference/work_8.jpg" },
      { id: "4", title_ko: "철강 제조 공장 유지보수",   title_en: "Steel Manufacturing Plant",     subtitle_ko: "연 면적 1.5만㎡", subtitle_en: "15,000 m²/yr", image: "/image/reference/work_9.jpg" },
    ] },
    { id: "ict", label_ko: "정보통신 프로젝트", label_en: "ICT Projects", items: [
      { id: "1", title_ko: "쇼핑몰 옥외 LED 디스플레이 구축", title_en: "Mall LED Display Build",       subtitle_ko: "옥외 LED 600㎡",       subtitle_en: "600 m² Outdoor LED",          image: "/image/reference/work_11.jpg" },
      { id: "2", title_ko: "관제센터 Video-Wall 구축",         title_en: "Control Center Video-Wall",     subtitle_ko: "CALICO PRO 적용",      subtitle_en: "Powered by CALICO PRO",       image: "/image/reference/work_12.jpg" },
      { id: "3", title_ko: "기업 본사 IBS 구축",               title_en: "Corporate HQ IBS",              subtitle_ko: "지능형 빌딩 시스템",   subtitle_en: "Intelligent Building System", image: "/image/reference/work_13.jpg" },
      { id: "4", title_ko: "해외 호텔 네트워크 구축",          title_en: "Overseas Hotel Network",        subtitle_ko: "GUAM / Thailand",      subtitle_en: "Guam / Thailand",             image: "/image/reference/work_14.jpg" },
    ] },
  ],
};

export default async function MaintenancePage() {
  const [locale, data] = await Promise.all([
    getLocale(),
    getSiteSetting<MaintenanceData>("maintenance", fallback),
  ]);
  return <MaintenanceClient locale={locale} data={data} />;
}
