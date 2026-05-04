import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
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
  sort_order: number;
  created_at?: string | null;
}

const fallback: DownloadRow[] = [
  { id: 1, title_ko: "LED 디스플레이 제품 카탈로그 2024",       title_en: "LED Display Product Catalog 2024", description_ko: null, description_en: null, file_url: null, file_name: "catalog-2024.pdf",     file_size: 12500000, sort_order: 0, created_at: "2024-01-15" },
  { id: 2, title_ko: "네트워크 솔루션 가이드",                   title_en: "Network Solution Guide",           description_ko: null, description_en: null, file_url: null, file_name: "network-guide.pdf",   file_size: 8200000,  sort_order: 1, created_at: "2023-11-20" },
  { id: 3, title_ko: "IBS 통합시스템 소개서",                    title_en: "IBS Integrated System Brochure",   description_ko: null, description_en: null, file_url: null, file_name: "ibs-intro.pdf",       file_size: 5700000,  sort_order: 2, created_at: "2023-09-05" },
  { id: 4, title_ko: "미디어 파사드 시공 사례집",                title_en: "Media Facade Portfolio",           description_ko: null, description_en: null, file_url: null, file_name: "facade-portfolio.pdf",file_size: 15300000, sort_order: 3, created_at: "2023-07-18" },
  { id: 5, title_ko: "회사소개서 국문",                           title_en: "Company Profile (Korean)",         description_ko: null, description_en: null, file_url: null, file_name: "company-ko.pdf",      file_size: 6800000,  sort_order: 4, created_at: "2023-06-01" },
  { id: 6, title_ko: "회사소개서 영문 (Company Profile)",         title_en: "Company Profile (English)",        description_ko: null, description_en: null, file_url: null, file_name: "company-en.pdf",      file_size: 6500000,  sort_order: 5, created_at: "2023-06-01" },
];

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

export default async function DownloadsPage() {
  const locale = await getLocale();
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const items = await getList<DownloadRow>("resources", { orderBy: "sort_order" }, fallback);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <span className="text-[#4A90D9] text-sm font-medium tracking-widest mb-4 block">DOWNLOADS</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">{t("자료실", "Downloads")}</h1>

            <div className="bg-[#111] rounded-xl overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1a1a] text-[#888] text-sm font-medium border-b border-white/10">
                <div className="col-span-1">{t("번호", "#")}</div>
                <div className="col-span-7">{t("제목", "Title")}</div>
                <div className="col-span-2">{t("등록일", "Date")}</div>
                <div className="col-span-2 text-right">{t("다운로드", "Download")}</div>
              </div>

              <div className="divide-y divide-white/5">
                {items.map((item, index) => {
                  const title = locale === "en" && item.title_en ? item.title_en : item.title_ko;
                  const desc = locale === "en" && item.description_en ? item.description_en : item.description_ko;
                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 hover:bg-[#1a1a1a] transition-colors group items-center">
                      <div className="hidden md:block col-span-1 text-[#666] text-sm">{items.length - index}</div>

                      <div className="col-span-1 md:col-span-7">
                        <h3 className="text-white text-sm md:text-base group-hover:text-[#4A90D9] transition-colors">{title}</h3>
                        {desc && <p className="text-[#888] text-xs mt-1 line-clamp-1">{desc}</p>}
                        <div className="flex items-center gap-3 mt-2 md:hidden">
                          <span className="text-[#666] text-xs">{formatDate(item.created_at)}</span>
                          {item.file_size && <span className="text-[#666] text-xs">{formatSize(item.file_size)}</span>}
                        </div>
                      </div>

                      <div className="hidden md:block col-span-2 text-[#888] text-sm">{formatDate(item.created_at)}</div>

                      <div className="col-span-1 md:col-span-2 md:text-right">
                        {item.file_url ? (
                          <a href={item.file_url} target="_blank" rel="noopener noreferrer" download={item.file_name ?? undefined} className="inline-flex items-center gap-1.5 text-[#4A90D9] text-sm hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t("다운로드", "Download")}
                            {item.file_size && <span className="text-[#666] text-xs">({formatSize(item.file_size)})</span>}
                          </a>
                        ) : (
                          <span className="text-[#444] text-sm">{t("파일 없음", "No file")}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {items.length === 0 && (
              <p className="text-[#666] text-center py-20">
                {t("등록된 자료가 없습니다.", "No resources available.")}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
