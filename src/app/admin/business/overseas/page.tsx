"use client";

import CategoryItemAdmin from "@/components/admin/CategoryItemAdmin";

export default function AdminOverseasPage() {
  return (
    <CategoryItemAdmin
      pageTitle="해외 프로젝트 관리"
      catTable="overseas_categories"
      itemTable="overseas_projects"
      uploadFolder="overseas"
    />
  );
}