import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";

const services = [
  {
    label: "LED DISPLAY",
    title_ko: "대형 LED 전광판",
    title_en: "Large LED Display",
    description_ko: "설계, 제작, 시공까지 원스톱 솔루션",
    description_en: "One-stop solution from design to installation",
    image: "/image/services/led.jpg",
    href: "/business/led",
  },
  {
    label: "NETWORK",
    title_ko: "네트워크 인프라",
    title_en: "Network Infrastructure",
    description_ko: "유무선 네트워크 통합 구축",
    description_en: "Integrated wired and wireless network",
    image: "/image/services/network.jpg",
    href: "/business/network",
  },
];

export default function ServicesSection({ locale }: { locale: Locale }) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  return (
    <section className="w-full bg-[#0A0A0A] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("핵심 사업 영역", "Core Business Areas")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="group relative overflow-hidden rounded-xl h-80 flex flex-col justify-end p-8 hover:scale-[1.02] transition-transform"
            >
              <Image
                src={service.image}
                alt={t(service.title_ko, service.title_en)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <div className="relative z-10">
                <span className="text-[#4A90D9] text-sm font-semibold tracking-wider mb-2 block">
                  {service.label}
                </span>
                <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-[#4A90D9] transition-colors">
                  {t(service.title_ko, service.title_en)}
                </h3>
                <p className="text-[#cfcfcf] text-sm">{t(service.description_ko, service.description_en)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
