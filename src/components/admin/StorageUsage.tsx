"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// 무료 플랜 스토리지 한도 (1GB)
const FREE_LIMIT = 1024 * 1024 * 1024;
const BUCKETS = ["images", "files"];

interface BucketStat {
  bucket: string;
  count: number;
  bytes: number;
}

function fmt(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function StorageUsage() {
  const [stats, setStats] = useState<BucketStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sb = createClient();

    async function listAll(bucket: string, prefix = ""): Promise<{ count: number; bytes: number }> {
      let count = 0;
      let bytes = 0;
      let offset = 0;
      for (;;) {
        const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 1000, offset });
        if (error) throw error;
        if (!data || data.length === 0) break;
        for (const item of data) {
          const full = prefix ? `${prefix}/${item.name}` : item.name;
          // 폴더(id/metadata 없음)는 재귀 탐색
          if (item.id === null || item.metadata == null) {
            const sub = await listAll(bucket, full);
            count += sub.count;
            bytes += sub.bytes;
          } else {
            count += 1;
            bytes += (item.metadata?.size as number) ?? 0;
          }
        }
        if (data.length < 1000) break;
        offset += 1000;
      }
      return { count, bytes };
    }

    (async () => {
      try {
        const results: BucketStat[] = [];
        for (const b of BUCKETS) {
          try {
            const { count, bytes } = await listAll(b);
            results.push({ bucket: b, count, bytes });
          } catch {
            // 버킷이 없거나 접근 불가하면 건너뜀
          }
        }
        setStats(results);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalBytes = (stats ?? []).reduce((s, x) => s + x.bytes, 0);
  const totalCount = (stats ?? []).reduce((s, x) => s + x.count, 0);
  const pct = Math.min(100, (totalBytes / FREE_LIMIT) * 100);
  const barColor = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-blue-600";
  const label = (b: string) => (b === "images" ? "이미지" : b === "files" ? "문서/파일" : b);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">스토리지 사용량</h2>
        <span className="text-xs text-gray-400">무료 한도 1GB</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">계산 중…</p>
      ) : error ? (
        <p className="text-sm text-red-500">사용량을 불러오지 못했습니다: {error}</p>
      ) : (
        <>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">{fmt(totalBytes)}</span>
            <span className="text-sm text-gray-500">/ 1 GB · {pct.toFixed(1)}% 사용</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${Math.max(pct, 1)}%` }} />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
            {(stats ?? []).map((s) => (
              <span key={s.bucket}>
                {label(s.bucket)}: <strong className="text-gray-900">{fmt(s.bytes)}</strong>{" "}
                <span className="text-gray-400">({s.count}개)</span>
              </span>
            ))}
            <span className="text-gray-400">총 {totalCount}개 파일</span>
          </div>
          {totalBytes === 0 && totalCount > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              파일 용량 정보를 읽지 못했습니다(권한). 파일 개수만 표시됩니다.
            </p>
          )}
        </>
      )}
    </div>
  );
}
