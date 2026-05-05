import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

let _client: SupabaseClient | null | undefined;

function getPublicClient(): SupabaseClient | null {
  if (_client !== undefined) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    _client = null;
    return null;
  }
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

const FETCH_TIMEOUT_MS = 4000;

function withTimeout<T>(p: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("supabase fetch timeout")), ms);
    Promise.resolve(p).then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

// React `cache()`로 동일 RSC 렌더 트리 내 중복 호출 메모이제이션 (dedupe).
// 같은 페이지에서 Header / Footer / Section 들이 같은 key 를 여러 번 호출해도 1회만 실행.
const _getSiteSettingRaw = cache(async <T>(key: string, fallbackJson: string): Promise<T> => {
  const fallback = JSON.parse(fallbackJson) as T;
  const client = getPublicClient();
  if (!client) return fallback;
  try {
    const { data, error } = await withTimeout(
      client.from("site_settings").select("value").eq("key", key).maybeSingle(),
      FETCH_TIMEOUT_MS,
    );
    if (error || !data?.value) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
});

export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  return _getSiteSettingRaw<T>(key, JSON.stringify(fallback));
}

export async function getRowById<T>(
  table: string,
  id: string | number,
  fallback: T | null = null,
): Promise<T | null> {
  const client = getPublicClient();
  if (!client) return fallback;
  try {
    const { data, error } = await withTimeout(
      client.from(table).select("*").eq("id", id).maybeSingle(),
      FETCH_TIMEOUT_MS,
    );
    if (error || !data) return fallback;
    return data as T;
  } catch {
    return fallback;
  }
}

// 동일한 (table, options) 조합은 한 RSC 렌더 안에서 1회만 실행되도록 dedupe.
const _getListRaw = cache(async <T>(
  table: string,
  optionsKey: string,
  fallbackJson: string,
): Promise<T[]> => {
  const fallback = JSON.parse(fallbackJson) as T[];
  const options = JSON.parse(optionsKey) as {
    orderBy?: string;
    ascending?: boolean;
    limit?: number;
    filter?: { column: string; value: unknown };
  };
  const client = getPublicClient();
  if (!client) return fallback;
  try {
    const orderBy = options.orderBy ?? "sort_order";
    const ascending = options.ascending ?? true;
    let query = client.from(table).select("*").order(orderBy, { ascending });
    if (options.filter) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.eq(options.filter.column, options.filter.value as any);
    }
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await withTimeout(query, FETCH_TIMEOUT_MS);
    if (error || !data || data.length === 0) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
});

export async function getList<T>(
  table: string,
  options?: {
    orderBy?: string;
    ascending?: boolean;
    limit?: number;
    filter?: { column: string; value: unknown };
  },
  fallback: T[] = [],
): Promise<T[]> {
  return _getListRaw<T>(table, JSON.stringify(options ?? {}), JSON.stringify(fallback));
}
