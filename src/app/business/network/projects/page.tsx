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

const fallbackProjectsByYear: Record<string, YearData> = {
  "2025": {
    capacity: "90.3억",
    projects: [
      "서울아산병원 신관 중환자실 증설 정보통신공사",
      "한화시스템(주) 정보통신공사",
      "쿠팡 G-IDC센터 GPU node 추가 네트워크 구축",
    ],
  },
  "2024": {
    capacity: "74.9억",
    projects: ["서울아산병원 서관 NRICU/공용ICU 환경개선 정보통신공사"],
  },
  "2023": {
    capacity: "60.4억",
    projects: ["서울아산병원 정보통신공사"],
  },
  "2014": {
    projects: ["롯데호텔 Guam 네트워크 인프라 구축공사"],
  },
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  const rows = await getList<ProjectRecordRow>(
    "project_records",
    { orderBy: "sort_order" },
    [],
  );

  let projectsByYear: Record<string, YearData>;

  if (rows.length === 0) {
    projectsByYear = fallbackProjectsByYear;
  } else {
    projectsByYear = {};
    for (const row of rows) {
      const year = row.year?.trim();
      if (!year) continue;
      if (!projectsByYear[year]) projectsByYear[year] = { projects: [] };
      const bucket = projectsByYear[year];
      if (!bucket.capacity && row.capacity && row.capacity.trim().length > 0) {
        bucket.capacity = row.capacity.trim();
      }
      const label = tr(locale, row.name_ko, row.name_en);
      if (label) bucket.projects.push(label);
    }
  }

  return <ProjectsClient projectsByYear={projectsByYear} locale={locale} />;
}
