"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { tr } from "@/lib/locale";

export interface PopupItem {
  id: string;
  enabled?: boolean;
  title_ko?: string;
  title_en?: string;
  body_ko?: string;
  body_en?: string;
  image?: string;
  link_url?: string;
  link_label_ko?: string;
  link_label_en?: string;
  start_at?: string;
  end_at?: string;
  width?: number;
}

interface Props {
  popups: PopupItem[];
  locale: Locale;
}

const STORAGE_PREFIX = "ss_popup_";

const isWithinRange = (p: PopupItem) => {
  const today = new Date().toISOString().slice(0, 10);
  if (p.start_at && p.start_at > today) return false;
  if (p.end_at && p.end_at < today) return false;
  return true;
};

const isDismissed = (id: string) => {
  if (typeof window === "undefined") return false;
  try {
    const v = window.localStorage.getItem(STORAGE_PREFIX + id);
    if (!v) return false;
    const until = parseInt(v, 10);
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
};

export default function PopupModal({ popups, locale }: Props) {
  const t = (ko: string, en: string) => (locale === "en" ? en : ko);
  const [active, setActive] = useState<PopupItem[]>([]);

  useEffect(() => {
    const visible = popups
      .filter((p) => p.enabled !== false)
      .filter(isWithinRange)
      .filter((p) => !isDismissed(p.id));
    setActive(visible);
  }, [popups]);

  const dismiss = (id: string, hideForToday: boolean) => {
    setActive((prev) => prev.filter((p) => p.id !== id));
    if (hideForToday && typeof window !== "undefined") {
      try {
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        window.localStorage.setItem(STORAGE_PREFIX + id, String(tomorrow.getTime()));
      } catch { /* ignore */ }
    }
  };

  if (active.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-wrap items-start justify-center gap-4 max-w-full">
        {active.map((p) => {
          const title = tr(locale, p.title_ko, p.title_en);
          const body = tr(locale, p.body_ko, p.body_en);
          const linkLabel = tr(locale, p.link_label_ko, p.link_label_en);
          const width = Math.max(280, Math.min(900, p.width ?? 480));
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ width: `${width}px`, maxWidth: "100%" }}
            >
              {p.image && (
                <div className="relative w-full bg-gray-100" style={{ aspectRatio: "16 / 10" }}>
                  <Image src={p.image} alt={title || "popup"} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="p-6">
                {title && <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>}
                {body && <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{body}</p>}
                {p.link_url && (
                  <div className="mt-5">
                    <Link
                      href={p.link_url}
                      onClick={() => dismiss(p.id, false)}
                      className="inline-block bg-[#4A90D9] text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-[#3A7BC8] transition-colors"
                    >
                      {linkLabel || t("자세히 보기", "Learn More")}
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between bg-gray-50 px-6 py-3 border-t border-gray-100 text-sm">
                <button
                  onClick={() => dismiss(p.id, true)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  {t("오늘 하루 보지 않기", "Don't show today")}
                </button>
                <button
                  onClick={() => dismiss(p.id, false)}
                  className="text-gray-700 hover:text-black font-semibold"
                >
                  {t("닫기", "Close")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
