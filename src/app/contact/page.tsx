"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
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
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#0A0A0A]">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">
              CONTACT
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">문의하기</h1>
            <p className="text-[#888] mb-16">
              프로젝트 문의나 궁금한 사항이 있으시면 아래 양식을 작성해 주세요.
              <br />
              담당자가 확인 후 빠르게 연락드리겠습니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm mb-2">회사명</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                    placeholder="회사명을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">담당자명 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                    placeholder="성함을 입력하세요"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                    placeholder="연락처를 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">문의 제목 *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors"
                  placeholder="문의 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">문의 내용 *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-3 text-white focus:border-[#4A90D9] focus:outline-none transition-colors resize-none"
                  placeholder="문의 내용을 입력하세요"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded font-semibold hover:bg-white/90 transition-colors"
              >
                문의하기
              </button>
            </form>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <h3 className="text-[#4A90D9] font-semibold mb-2">전화 문의</h3>
                <p className="text-white">02-953-0056</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <h3 className="text-[#4A90D9] font-semibold mb-2">팩스</h3>
                <p className="text-white">02-953-0118</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <h3 className="text-[#4A90D9] font-semibold mb-2">이메일</h3>
                <p className="text-white">info@sangseung.co.kr</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
