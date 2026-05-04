"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

export default function ContactClient({ locale }: { locale: Locale }) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t(
      "??? ???????. ?? ?? ?? ????????.",
      "Your inquiry has been received. We will contact you shortly.",
    ));
  };

  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">CONTACT</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("????", "Contact Us")}</h1>
        <p className="text-[#888] mb-16">
          {t(
            "???? ??? ??? ??? ???? ?? ??? ??? ???. ???? ?? ? ??? ????????.",
            "For project inquiries or questions, please fill out the form below. Our team will get back to you shortly.",
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm mb-2">{t("???", "Company")}</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("???? ?????", "Enter your company name")}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">{t("???? *", "Name *")}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("??? ?????", "Enter your full name")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm mb-2">{t("??? *", "Email *")}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("???? ?????", "Enter your email")}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">{t("??? *", "Phone *")}</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("???? ?????", "Enter your phone number")}
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm mb-2">{t("?? ?? *", "Subject *")}</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
              placeholder={t("?? ??? ?????", "Enter the subject")}
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">{t("?? ?? *", "Message *")}</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors resize-none"
              placeholder={t("?? ??? ?????", "Enter your message")}
            />
          </div>

          <button type="submit" className="w-full bg-white text-black py-4 rounded font-semibold hover:bg-white/90 transition-colors">
            {t("????", "Submit Inquiry")}
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("?? ??", "Phone")}</h3>
            <p className="text-white">02-953-0056</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("??", "Fax")}</h3>
            <p className="text-white">02-953-0118</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("???", "Email")}</h3>
            <p className="text-white">info@sangseung.co.kr</p>
          </div>
        </div>
      </div>
    </section>
  );
}
