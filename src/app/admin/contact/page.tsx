"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Contact {
  id: number;
  company: string | null;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminContactPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await createClient()
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setItems((data ?? []) as Contact[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (c: Contact) => {
    const next = !c.is_read;
    setItems((prev) => prev.map((it) => (it.id === c.id ? { ...it, is_read: next } : it)));
    const { error } = await createClient()
      .from("contacts")
      .update({ is_read: next })
      .eq("id", c.id);
    if (error) {
      setItems((prev) => prev.map((it) => (it.id === c.id ? { ...it, is_read: c.is_read } : it)));
      alert("상태 변경 실패: " + error.message);
    }
  };

  const openDetail = async (c: Contact) => {
    const willOpen = openId !== c.id;
    setOpenId(willOpen ? c.id : null);
    if (willOpen && !c.is_read) {
      setItems((prev) => prev.map((it) => (it.id === c.id ? { ...it, is_read: true } : it)));
      await createClient().from("contacts").update({ is_read: true }).eq("id", c.id);
    }
  };

  const removeItem = async (id: number) => {
    if (!confirm("이 문의를 삭제하시겠습니까?")) return;
    const prev = items;
    setItems((p) => p.filter((it) => it.id !== id));
    const { error } = await createClient().from("contacts").delete().eq("id", id);
    if (error) {
      setItems(prev);
      alert("삭제 실패: " + error.message);
    }
  };

  const visible = filter === "unread" ? items.filter((c) => !c.is_read) : items;
  const unreadCount = items.filter((c) => !c.is_read).length;

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">상담신청 / 문의</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              안읽음 {unreadCount}
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              전체 ({items.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 text-sm font-medium ${filter === "unread" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              안읽음 ({unreadCount})
            </button>
          </div>
          <button
            onClick={load}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
          >
            새로고침
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((c) => {
          const isOpen = openId === c.id;
          return (
            <div
              key={c.id}
              className={`bg-white rounded-xl border ${c.is_read ? "border-gray-200" : "border-blue-300 ring-1 ring-blue-100"}`}
            >
              <button
                onClick={() => openDetail(c)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${c.is_read ? "bg-gray-300" : "bg-blue-500"}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm truncate ${c.is_read ? "text-gray-700" : "font-semibold text-gray-900"}`}>
                      {c.subject}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {c.name}
                    {c.company ? ` · ${c.company}` : ""} · {c.phone}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{formatDateTime(c.created_at)}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/60 rounded-b-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                    <div><span className="text-gray-400">이름</span> <span className="text-gray-900">{c.name}</span></div>
                    <div><span className="text-gray-400">회사</span> <span className="text-gray-900">{c.company || "-"}</span></div>
                    <div>
                      <span className="text-gray-400">이메일</span>{" "}
                      <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a>
                    </div>
                    <div>
                      <span className="text-gray-400">연락처</span>{" "}
                      <a href={`tel:${c.phone}`} className="text-blue-600 hover:underline">{c.phone}</a>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-800 whitespace-pre-line break-words mb-4">
                    {c.message}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(c)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      {c.is_read ? "안읽음으로 표시" : "읽음으로 표시"}
                    </button>
                    <button
                      onClick={() => removeItem(c.id)}
                      className="ml-auto px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
            {filter === "unread" ? "안읽은 문의가 없습니다." : "접수된 문의가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
}
