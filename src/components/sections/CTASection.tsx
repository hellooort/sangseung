import Link from "next/link";
import type { Locale } from "@/lib/locale";

export default function CTASection({ locale }: { locale: Locale }) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  return (
    <section className="w-full bg-gradient-to-r from-[#4A90D9] to-[#3A7BC8] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t("프로젝트를 시작할 준비가 되셨나요?", "Ready to start your project?")}
        </h2>
        <p className="text-white/80 text-lg mb-10">
          {t(
            "네트워크 인프라부터 LED 디스플레이까지, 최적의 솔루션을 제안해 드립니다.",
            "From network infrastructure to LED displays — we propose the optimal solution for you.",
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="bg-white text-[#4A90D9] px-10 py-4 rounded text-base font-semibold hover:bg-white/90 transition-colors"
          >
            {t("무료 상담 신청", "Request Free Consultation")}
          </Link>
          <a
            href="tel:02-953-0056"
            className="border border-white/50 text-white px-10 py-4 rounded text-base font-medium hover:bg-white/10 transition-colors"
          >
            02-953-0056
          </a>
        </div>
      </div>
    </section>
  );
}
