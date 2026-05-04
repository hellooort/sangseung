import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getRowById } from "@/lib/supabase/public";
import { getLocale } from "@/lib/locale.server";

interface DownloadRow {
  id: number;
  title_ko: string;
  title_en: string | null;
  description_ko: string | null;
  description_en: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  created_at?: string | null;
}

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)}MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(0)}KB`;
}

function formatDate(d: string | null | undefined) {
  if (!d) return "";
  return d.slice(0, 10).replace(/-/g, ".");
}

export default async function DownloadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const item = await getRowById<DownloadRow>("resources", id);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <main className="pt-20">
          <section className="py-24 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                {t("자료를 찾을 수 없습니다", "Resource not found")}
              </h1>
              <Link href="/resources/downloads" className="text-[#4A90D9] hover:underline">
                {t("목록으로 돌아가기", "Back to list")}
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const title = locale === "en" && item.title_en ? item.title_en : item.title_ko;
  const description = locale === "en" && item.description_en ? item.description_en : item.description_ko;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <Link href="/resources/downloads" className="inline-flex items-center gap-2 text-[#888] hover:text-white text-sm mb-8 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("목록으로", "Back to list")}
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#666] text-sm">{formatDate(item.created_at)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#4A90D9]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.file_name ?? title}</p>
                    {item.file_size && <p className="text-[#888] text-sm">{formatSize(item.file_size)}</p>}
                  </div>
                </div>
                {item.file_url ? (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" download={item.file_name ?? undefined} className="flex items-center justify-center gap-2 bg-[#4A90D9] text-white px-6 py-3 rounded-lg hover:bg-[#3A80C9] transition-colors font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t("다운로드", "Download")}
                  </a>
                ) : (
                  <span className="text-[#666] text-sm">{t("파일 없음", "No file")}</span>
                )}
              </div>
            </div>

            {description && (
              <div className="bg-[#111] rounded-xl p-8">
                <h2 className="text-white text-lg font-bold mb-4">{t("자료 설명", "Description")}</h2>
                <div className="text-[#ccc] leading-loose whitespace-pre-line">{description}</div>
              </div>
            )}

            <div className="mt-16 pt-8 border-t border-white/10">
              <Link href="/resources/downloads" className="inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded hover:bg-[#222] transition-colors">
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
