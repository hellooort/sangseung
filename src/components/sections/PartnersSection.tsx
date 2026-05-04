import Image from "next/image";
import { getList } from "@/lib/supabase/public";

interface PartnerRow {
  id: number;
  name_ko: string;
  name_en: string | null;
  logo_url: string | null;
  sort_order: number;
}

const fallback: PartnerRow[] = [
  { id: 1, name_ko: "한화", name_en: "Hanwha", logo_url: null, sort_order: 0 },
  { id: 2, name_ko: "롯데", name_en: "Lotte", logo_url: null, sort_order: 1 },
  { id: 3, name_ko: "현대", name_en: "Hyundai", logo_url: null, sort_order: 2 },
  { id: 4, name_ko: "삼성", name_en: "Samsung", logo_url: null, sort_order: 3 },
  { id: 5, name_ko: "AIG", name_en: "AIG", logo_url: null, sort_order: 4 },
  { id: 6, name_ko: "동국제강", name_en: "Dongkuk Steel", logo_url: null, sort_order: 5 },
  { id: 7, name_ko: "LS", name_en: "LS", logo_url: null, sort_order: 6 },
  { id: 8, name_ko: "기아", name_en: "Kia", logo_url: null, sort_order: 7 },
];

export default async function PartnersSection() {
  const partners = await getList<PartnerRow>(
    "partners",
    { orderBy: "sort_order" },
    fallback,
  );

  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PARTNERS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">신뢰할 수 있는 파트너</h2>
          <p className="text-[#888] text-base">국내외 주요 기업들과 함께 성공적인 프로젝트를 수행하고 있습니다</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) =>
            partner.logo_url ? (
              <div key={partner.id} className="relative h-12 w-32 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                <Image
                  src={partner.logo_url}
                  alt={partner.name_ko}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div
                key={partner.id}
                className="text-[#555] text-xl md:text-2xl lg:text-3xl font-bold hover:text-[#888] transition-colors cursor-default"
              >
                {partner.name_ko}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
