import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getList } from "@/lib/supabase/public";
import HistoryClient from "./HistoryClient";

export interface HistoryRow {
  id: number;
  year: string;
  month: string | null;
  text_ko: string;
  text_en: string | null;
  sort_order: number;
}

const fallback: HistoryRow[] = [
  { id: 1, year: "2020", month: null, text_ko: "IT 스마트코리아 표창", text_en: null, sort_order: 0 },
  { id: 2, year: "2020", month: null, text_ko: "기업부설연구소 설립", text_en: null, sort_order: 1 },
  { id: 3, year: "2020", month: null, text_ko: "직접생산확인증명 (기상전광판 / 교통정보전광판 / 안내전광판)", text_en: null, sort_order: 2 },
  { id: 4, year: "2020", month: null, text_ko: "직접생산확인증명 (영상정보디스플레이장치)", text_en: null, sort_order: 3 },
  { id: 5, year: "2019", month: null, text_ko: "공장등록 (일산공장이전)", text_en: null, sort_order: 0 },
  { id: 6, year: "2019", month: null, text_ko: "태국지사 설립", text_en: null, sort_order: 1 },
  { id: 7, year: "2019", month: null, text_ko: "일본지사 설립", text_en: null, sort_order: 2 },
  { id: 8, year: "2018", month: null, text_ko: "우수기술기업 인증", text_en: null, sort_order: 0 },
  { id: 9, year: "2018", month: null, text_ko: "LED Display 중국공장 설립 (GAMIN & SANGSEUNG)", text_en: null, sort_order: 1 },
  { id: 10, year: "2017", month: null, text_ko: "미디어시스템사업부 설립", text_en: null, sort_order: 0 },
  { id: 11, year: "2008", month: null, text_ko: "소프트웨어 사업자등록", text_en: null, sort_order: 0 },
  { id: 12, year: "2005", month: null, text_ko: "한화 S&C 파트너체결", text_en: null, sort_order: 0 },
  { id: 13, year: "2003", month: null, text_ko: "한국 Carrefour 네트워크 인프라구축", text_en: null, sort_order: 0 },
  { id: 14, year: "2002", month: null, text_ko: "정보통신공사업 등록", text_en: null, sort_order: 0 },
  { id: 15, year: "2001", month: null, text_ko: "상승종합통신㈜ 설립", text_en: null, sort_order: 0 },
];

export default async function HistoryPage() {
  const rows = await getList<HistoryRow>("histories", { orderBy: "sort_order" }, fallback);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main className="pt-20">
        <HistoryClient rows={rows} />
      </main>
      <Footer />
    </div>
  );
}
