"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminMainRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/main/hero");
  }, [router]);
  return null;
}
