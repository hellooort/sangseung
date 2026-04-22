"use client";

import CategoryItemAdmin from "@/components/admin/CategoryItemAdmin";

export default function AdminIBSPage() {
  return (
    <CategoryItemAdmin
      pageTitle="IBS 통합시스템 관리"
      catTable="ibs_categories"
      itemTable="ibs_items"
      uploadFolder="ibs"
    />
  );
}