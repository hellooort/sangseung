"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locale";

const EMPTY_FORM = {
  company: "",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactClient({ locale }: { locale: Locale }) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // 저장 + 담당자 알림 메일 발송을 서버 라우트에서 함께 처리한다.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      alert(t(
        "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        "Your inquiry has been received. We will contact you shortly.",
      ));
      setFormData(EMPTY_FORM);
    } catch {
      alert(t(
        "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        "An error occurred while submitting your inquiry. Please try again later.",
      ));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">CONTACT</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("문의하기", "Contact Us")}</h1>
        <p className="text-[#888] mb-16">
          {t(
            "프로젝트 문의나 궁금한 사항이 있으시면 아래 양식을 작성해 주세요. 담당자가 빠른 시일 내에 연락드리겠습니다.",
            "For project inquiries or questions, please fill out the form below. Our team will get back to you shortly.",
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm mb-2">{t("회사명", "Company")}</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("회사명을 입력하세요", "Enter your company name")}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">{t("이름 *", "Name *")}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("이름을 입력하세요", "Enter your full name")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm mb-2">{t("이메일 *", "Email *")}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("이메일을 입력하세요", "Enter your email")}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">{t("연락처 *", "Phone *")}</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                placeholder={t("연락처를 입력하세요", "Enter your phone number")}
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm mb-2">{t("문의 제목 *", "Subject *")}</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
              placeholder={t("문의 제목을 입력하세요", "Enter the subject")}
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">{t("문의 내용 *", "Message *")}</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors resize-none"
              placeholder={t("문의 내용을 입력하세요", "Enter your message")}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black py-4 rounded font-semibold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting
              ? t("전송 중...", "Submitting...")
              : t("문의 보내기", "Submit Inquiry")}
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("전화", "Phone")}</h3>
            <p className="text-white">02-953-0056</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("팩스", "Fax")}</h3>
            <p className="text-white">02-953-0118</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-[#4A90D9] font-semibold mb-2">{t("이메일", "Email")}</h3>
            <p className="text-white">info@sangseung.co.kr</p>
          </div>
        </div>
      </div>
    </section>
  );
}
