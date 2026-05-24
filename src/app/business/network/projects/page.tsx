import ProjectsClient from "./ProjectsClient";
import { getLocale } from "@/lib/locale.server";
import { getList } from "@/lib/supabase/public";
import { tr } from "@/lib/locale";

export interface YearData {
  capacity?: string;
  projects: string[];
}

interface ProjectRecordRow {
  id: number;
  category_id: number | null;
  name_ko: string;
  name_en: string | null;
  year: string | null;
  capacity: string | null;
  sort_order: number;
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  // id DESC: 최근 등록된 항목이 각 연도 섹션에서 위로 오도록
  const rows = await getList<ProjectRecordRow>(
    "project_records",
    { orderBy: "id", ascending: false },
  );

  const projectsByYear: Record<string, YearData> = {};
  // 같은 연도 내 모든 row 의 capacity 를 합산.
  // capacity 컬럼은 숫자만 입력받지만 과거 텍스트("90.3억") 도 parseFloat 로 흡수.
  const capacitySum: Record<string, number> = {};

  for (const row of rows) {
    const year = row.year?.trim();
    if (!year) continue;
    if (!projectsByYear[year]) projectsByYear[year] = { projects: [] };
    const num = parseFloat(row.capacity ?? "");
    if (!Number.isNaN(num) && num > 0) {
      capacitySum[year] = (capacitySum[year] ?? 0) + num;
    }
    const label = tr(locale, row.name_ko, row.name_en);
    if (label) projectsByYear[year].projects.push(label);
  }

  // 합산된 금액을 "5.3억" / "KRW 5.3억" 형태로 포맷. 정수는 소수점 떼기.
  for (const year of Object.keys(capacitySum)) {
    const sum = capacitySum[year];
    const rounded = Math.round(sum * 10) / 10;
    const formatted = (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)) + "억";
    projectsByYear[year].capacity = locale === "en" ? `KRW ${formatted}` : formatted;
  }

  return <ProjectsClient projectsByYear={projectsByYear} locale={locale} />;
}
