import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getList } from "@/lib/supabase/public";

interface PressRow {
  id: number;
  title_ko: string;
  summary_ko: string | null;
  thumbnail_url: string | null;
  external_link: string | null;
  published_at: string | null;
  sort_order: number;
}

const fallback: PressRow[] = [
  { id: 1, title_ko: "상승종합통신, IT 스마트코리아 표창 수상", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2020-12-15", sort_order: 0 },
  { id: 2, title_ko: "기업부설연구소 설립, R&D 역량 강화", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2020-08-20", sort_order: 1 },
  { id: 3, title_ko: "태국지사 설립으로 동남아 시장 진출", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2019-06-10", sort_order: 2 },
  { id: 4, title_ko: "일본지사 설립, 글로벌 네트워크 확장", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2019-04-05", sort_order: 3 },
  { id: 5, title_ko: "우수기술기업 인증 획득", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2018-11-22", sort_order: 4 },
  { id: 6, title_ko: "중국 LED Display 공장 설립", summary_ko: null, thumbnail_url: null, external_link: null, published_at: "2018-07-15", sort_order: 5 },
];

function formatDate(d: string | null) {
  if (!d) return "";
  return d.slice(0, 10).replace(/-/g, ".");
}

export default async function PressPage() {
  const articles = await getList<PressRow>(
    "press_releases",
    { orderBy: "published_at", ascending: false },
    fallback,
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">PRESS</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">보도자료</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => {
                const Wrapper = article.external_link ? "a" : Link;
                const href = article.external_link ?? `/resources/press/${article.id}`;
                return (
                  <Wrapper
                    key={article.id}
                    href={href}
                    {...(article.external_link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-all block"
                  >
                    <div className="aspect-video bg-[#2a2a2a] relative overflow-hidden">
                      {article.thumbnail_url ? (
                        <Image
                          src={article.thumbnail_url}
                          alt={article.title_ko}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#333] text-4xl font-bold">{article.id}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#4A90D9]/0 group-hover:bg-[#4A90D9]/10 transition-colors" />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[#666] text-xs">{formatDate(article.published_at)}</span>
                      </div>
                      <h3 className="text-white text-base font-medium leading-snug group-hover:text-[#4A90D9] transition-colors line-clamp-2">
                        {article.title_ko}
                      </h3>
                      {article.summary_ko && (
                        <p className="text-[#888] text-xs mt-2 line-clamp-2">{article.summary_ko}</p>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {articles.length === 0 && (
              <p className="text-[#666] text-center py-20">등록된 보도자료가 없습니다.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
