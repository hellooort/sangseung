import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getRowById } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";

interface PressRow {
  id: number;
  title_ko: string;
  title_en: string | null;
  summary_ko: string | null;
  summary_en: string | null;
  content_ko: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
  external_link: string | null;
  published_at: string | null;
}

function formatDate(d: string | null) {
  if (!d) return "";
  return d.slice(0, 10).replace(/-/g, ".");
}

export default async function PressDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const article = await getRowById<PressRow>("press_releases", id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <main className="pt-20">
          <section className="py-24 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                {t("게시글을 찾을 수 없습니다", "Article not found")}
              </h1>
              <Link href="/resources/press" className="text-[#4A90D9] hover:underline">
                {t("목록으로 돌아가기", "Back to list")}
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const title = locale === "en" && article.title_en ? article.title_en : article.title_ko;
  const content = locale === "en" && article.content_en ? article.content_en : article.content_ko;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <Link href="/resources/press" className="inline-flex items-center gap-2 text-[#888] hover:text-white text-sm mb-8 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("목록으로", "Back to list")}
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#666] text-sm">{formatDate(article.published_at)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
            </div>

            <div className="aspect-video bg-[#1a1a1a] rounded-xl mb-8 flex items-center justify-center overflow-hidden relative">
              {article.thumbnail_url ? (
                <Image src={article.thumbnail_url} alt={title} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-[#333] text-6xl font-bold">{id}</span>
              )}
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-[#ccc] leading-loose whitespace-pre-line">
                {content ?? t("본문 내용이 없습니다.", "No content available.")}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <Link href="/resources/press" className="inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded hover:bg-[#222] transition-colors">
                {t("목록으로 돌아가기", "Back to list")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
