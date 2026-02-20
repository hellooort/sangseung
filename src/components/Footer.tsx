import Link from "next/link";

export default function Footer() {
  const footerLinks = {
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
      { name: "자료실", href: "/resources" },
      { name: "문의하기", href: "/contact" },
    ],
  };

  const offices = [
    {
      name: "본사",
      address: "서울시 강서구 양천로 551-24\n한화비즈메트로 2차 903호",
    },
    {
      name: "미디어시스템사업부",
      address: "경기도 구리시 갈매순환로 154\n현대테라타워지식산업센터 A동 1040호",
    },
    {
      name: "양주공장",
      address: "경기도 양주시 율정로 20\n양주옥정메타엑스 지식산업센터 514, 515호",
    },
  ];

  return (
    <footer className="w-full bg-[#050505] pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          <div className="lg:w-72">
            <h3 className="text-white text-xl font-bold mb-4">상승종합통신㈜</h3>
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
                      <Link
                        href={link.href}
                        className="text-[#666] text-sm hover:text-white transition-colors"
                      >
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
          {offices.map((office) => (
            <div key={office.name}>
              <span className="text-[#4A90D9] text-xs block mb-2">{office.name}</span>
              <p className="text-[#666] text-xs whitespace-pre-line leading-relaxed">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4">
          <p className="text-[#444] text-xs">
            © 2025 상승종합통신㈜. All Rights Reserved.
          </p>
          <p className="text-[#444] text-xs">
            TEL 02-953-0056 | FAX 02-953-0118
          </p>
        </div>
      </div>
    </footer>
  );
}
