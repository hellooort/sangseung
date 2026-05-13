import Link from "next/link";
import { getSiteSetting } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";

// admin/settings/footer 의 저장 형식과 동일.
// 과거 형식(name/address) 으로 저장된 row 도 자동 마이그레이션해서 표시.
interface OfficeInfo {
  id: number;
  nameKo: string;
  nameEn: string;
  addressKo: string;
  addressEn: string;
  tel: string;
  fax: string;
}

interface FooterData {
  companyName: string;
  companyNameEn: string;
  copyright: string;
  copyrightEn: string;
  offices: OfficeInfo[];
}

const fallback: FooterData = {
  companyName: "상승종합통신㈜",
  companyNameEn: "SANGSEUNG Co., Ltd.",
  copyright: "© 2025 상승종합통신㈜. All Rights Reserved.",
  copyrightEn: "© 2025 SANGSEUNG Co., Ltd. All Rights Reserved.",
  offices: [
    {
      id: 1,
      nameKo: "본사",
      nameEn: "Head Office",
      addressKo: "서울시 강서구 양천로 551-24 한화비즈메트로 2차 903호",
      addressEn: "#903, Hanwha Bizmetro 2, 551-24 Yangcheon-ro, Gangseo-gu, Seoul",
      tel: "02-953-0056",
      fax: "02-953-0118",
    },
    {
      id: 2,
      nameKo: "미디어시스템사업부",
      nameEn: "Media System Division",
      addressKo: "경기도 구리시 갈매순환로 154 현대테라타워지식산업센터 A동 1040호",
      addressEn: "#A1040, Hyundai Terra Tower, 154 Galmaesunhwan-ro, Guri-si, Gyeonggi-do",
      tel: "031-512-0110",
      fax: "031-512-0120",
    },
    {
      id: 3,
      nameKo: "양주공장",
      nameEn: "Yangju Factory",
      addressKo: "경기도 양주시 율정로 20 양주옥정메타엑스 지식산업센터 514, 515호",
      addressEn: "#514-515, Yangju Okjeong Metax, 20 Yuljeong-ro, Yangju-si, Gyeonggi-do",
      tel: "031-512-0110",
      fax: "031-512-0120",
    },
  ],
};

// DB raw → FooterData 정규화. 누락/구형식 모두 안전 처리.
function normalizeFooter(raw: unknown): FooterData {
  const r = (raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {}) as Record<string, unknown>;
  const officesRaw: unknown[] = Array.isArray(r.offices) ? (r.offices as unknown[]) : [];
  const offices: OfficeInfo[] = (officesRaw.length > 0 ? officesRaw : fallback.offices).map((o, i) => {
    const oo = (o && typeof o === "object" ? (o as Record<string, unknown>) : {}) as Record<string, unknown>;
    const pickStr = (...keys: string[]): string => {
      for (const k of keys) {
        const v = oo[k];
        if (typeof v === "string" && v.length > 0) return v;
      }
      return "";
    };
    return {
      id: typeof oo.id === "number" ? oo.id : i + 1,
      nameKo:    pickStr("nameKo", "name_ko", "name"),
      nameEn:    pickStr("nameEn", "name_en"),
      addressKo: pickStr("addressKo", "address_ko", "address"),
      addressEn: pickStr("addressEn", "address_en"),
      tel:       pickStr("tel", "phone"),
      fax:       pickStr("fax"),
    };
  });
  // 구형식 호환: tel/fax 가 root 에 있던 경우 첫 office 에 보충
  if (offices.length > 0) {
    if (!offices[0].tel && typeof r.tel === "string") offices[0].tel = r.tel;
    if (!offices[0].fax && typeof r.fax === "string") offices[0].fax = r.fax;
  }
  return {
    companyName:   typeof r.companyName   === "string" ? r.companyName   : (typeof r.companyname === "string" ? (r.companyname as string) : fallback.companyName),
    companyNameEn: typeof r.companyNameEn === "string" ? r.companyNameEn : (typeof r.companyName_en === "string" ? (r.companyName_en as string) : fallback.companyNameEn),
    copyright:     typeof r.copyright     === "string" ? r.copyright     : fallback.copyright,
    copyrightEn:   typeof r.copyrightEn   === "string" ? r.copyrightEn   : (typeof r.copyright_en === "string" ? (r.copyright_en as string) : fallback.copyrightEn),
    offices,
  };
}

export default async function Footer() {
  const [rawData, locale] = await Promise.all([
    getSiteSetting<unknown>("footer", fallback),
    getLocale(),
  ]);
  const data = normalizeFooter(rawData);

  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const pick = (ko: string | undefined, en: string | undefined) =>
    locale === "en" && en ? en : ko ?? "";

  const primaryTel = data.offices.find((o) => o.tel)?.tel ?? "";
  const primaryFax = data.offices.find((o) => o.fax)?.fax ?? "";

  const footerLinks: Record<string, { name: string; href: string }[]> = locale === "en"
    ? {
        About: [
          { name: "Greeting", href: "/about" },
          { name: "History", href: "/about/history" },
          { name: "Organization", href: "/about/organization" },
          { name: "Location", href: "/about/location" },
        ],
        Business: [
          { name: "Network", href: "/business/network" },
          { name: "LED Display", href: "/business/led" },
        ],
        Support: [
          { name: "Works", href: "/works" },
          { name: "Resources", href: "/resources/downloads" },
          { name: "Contact", href: "/contact" },
        ],
      }
    : {
        회사소개: [
          { name: "인사말", href: "/about" },
          { name: "연혁", href: "/about/history" },
          { name: "조직도", href: "/about/organization" },
          { name: "오시는 길", href: "/about/location" },
        ],
        사업소개: [
          { name: "네트워크 사업", href: "/business/network" },
          { name: "LED 디스플레이", href: "/business/led" },
        ],
        고객지원: [
          { name: "시공사례", href: "/works" },
          { name: "자료실", href: "/resources/downloads" },
          { name: "문의하기", href: "/contact" },
        ],
      };

  return (
    <footer className="w-full bg-[#050505] pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          <div className="lg:w-72">
            <h3 className="text-white text-xl font-bold mb-4">{pick(data.companyName, data.companyNameEn)}</h3>
            <p className="text-[#666] text-sm leading-relaxed">
              SANGSEUNG Co., Ltd.
              <br />
              ONE-STOP SOLUTION
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white text-sm font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[#666] text-sm hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-8 lg:gap-12 py-8 border-t border-white/10">
          {data.offices.map((office) => (
            <div key={office.id}>
              <span className="text-[#4A90D9] text-xs block mb-2">{pick(office.nameKo, office.nameEn)}</span>
              <p className="text-[#666] text-xs whitespace-pre-line leading-relaxed">{pick(office.addressKo, office.addressEn)}</p>
              {(office.tel || office.fax) && (
                <p className="text-[#555] text-xs mt-2">
                  {office.tel && <>TEL {office.tel}</>}
                  {office.tel && office.fax && " | "}
                  {office.fax && <>FAX {office.fax}</>}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4">
          <p className="text-[#444] text-xs">{pick(data.copyright, data.copyrightEn)}</p>
          {(primaryTel || primaryFax) && (
            <p className="text-[#444] text-xs">
              {primaryTel && <>{t("TEL", "TEL")} {primaryTel}</>}
              {primaryTel && primaryFax && " | "}
              {primaryFax && <>{t("FAX", "FAX")} {primaryFax}</>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
