import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { getSiteSetting } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

interface MainCtaData {
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  primaryLabelKo: string;
  primaryLabelEn: string;
  primaryHref: string;
  phoneNumber: string;
}

const fallback: MainCtaData = {
  titleKo: "프로젝트를 시작할 준비가 되셨나요?",
  titleEn: "Ready to start your project?",
  descriptionKo: "네트워크 인프라부터 LED 디스플레이까지, 최적의 솔루션을 제안해 드립니다.",
  descriptionEn: "From network infrastructure to LED displays — we propose the optimal solution for you.",
  primaryLabelKo: "무료 상담 신청",
  primaryLabelEn: "Request Free Consultation",
  primaryHref: "/contact",
  phoneNumber: "02-953-0056",
};

export default async function CTASection({ locale }: { locale: Locale }) {
  const data = await getSiteSetting<MainCtaData>("main_cta", fallback);
  return (
    <section className="w-full bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {tr(locale, data.titleKo, data.titleEn)}
        </h2>
        <p className="text-white/80 text-lg mb-10">
          {tr(locale, data.descriptionKo, data.descriptionEn)}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={data.primaryHref || "/contact"}
            className="bg-white text-[#4A90D9] px-10 py-4 rounded text-base font-semibold hover:bg-white/90 transition-colors"
          >
            {tr(locale, data.primaryLabelKo, data.primaryLabelEn)}
          </Link>
          {data.phoneNumber && (
            <a
              href={`tel:${data.phoneNumber}`}
              className="border border-white/50 text-white px-10 py-4 rounded text-base font-medium hover:bg-white/10 transition-colors"
            >
              {data.phoneNumber}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
