import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  const client = getPublicClient();
  if (!client) return fallback;
  try {
    const { data, error } = await client
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error || !data?.value) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

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
  const client = getPublicClient();
  if (!client) return fallback;
  try {
    const orderBy = options?.orderBy ?? "sort_order";
    const ascending = options?.ascending ?? true;
    let query = client.from(table).select("*").order(orderBy, { ascending });
    if (options?.filter) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.eq(options.filter.column, options.filter.value as any);
    }
    if (options?.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}
