import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ResultSection from "@/components/sections/ResultSection";
import WorksSection from "@/components/sections/WorksSection";
import HistorySection from "@/components/sections/HistorySection";
import BusinessSection from "@/components/sections/BusinessSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";
import PopupModal, { type PopupItem } from "@/components/PopupModal";
import { getLocale } from "@/lib/locale.server";
import { getSiteSetting } from "@/lib/supabase/public";

interface PopupsData {
  popups: PopupItem[];
}

export default async function Home() {
  const [locale, popupsData] = await Promise.all([
    getLocale(),
    getSiteSetting<PopupsData>("popups", { popups: [] }),
  ]);
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="flex flex-col">
        <HeroSection locale={locale} />
        <ServicesSection locale={locale} />
        <AboutSection locale={locale} />
        <ResultSection locale={locale} />
        <WorksSection locale={locale} />
        <HistorySection locale={locale} />
        <BusinessSection locale={locale} />
        <PartnersSection locale={locale} />
        <CTASection locale={locale} />
      </main>
      <Footer />
      <PopupModal popups={popupsData.popups ?? []} locale={locale} />
    </div>
  );
}
