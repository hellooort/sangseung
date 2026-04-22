"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;
const getSupabase = (): SupabaseClient => {
  if (!_supabase) _supabase = createClient();
  return _supabase;
};

// =============================================================================
// useSiteSetting<T>(key, defaultValue)
//   - site_settings ???? ?? JSON row ??/?? (upsert)
// =============================================================================
export function useSiteSetting<T>(key: string, defaultValue: T) {
  const [value, setValueState] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await getSupabase()
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else if (data?.value) {
        setValueState(data.value as T);
      }
      setLoading(false);
      initialized.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const setValue = useCallback((updater: T | ((prev: T) => T)) => {
    setValueState((prev) =>
      typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater,
    );
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    const { error } = await getSupabase()
      .from("site_settings")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert({ key, value: value as any }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setError(error.message);
      return false;
    }
    return true;
  }, [key, value]);

  return { value, setValue, loading, saving, error, save, initialized: initialized.current };
}

// =============================================================================
// useTableList<T>(table)
//   - ?? ???? list CRUD (sort_order ?? ??)
// =============================================================================
export interface ListItem {
  id: number;
  sort_order?: number;
}

export function useTableList<T extends ListItem>(
  table: string,
  options?: { orderBy?: string; ascending?: boolean; filter?: { column: string; value: unknown } },
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderBy = options?.orderBy ?? "sort_order";
  const ascending = options?.ascending ?? true;
  const filterCol = options?.filter?.column;
  const filterVal = options?.filter?.value;

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = getSupabase().from(table).select("*").order(orderBy, { ascending });
    if (filterCol !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.eq(filterCol, filterVal as any);
    }
    const { data, error } = await query;
    if (error) setError(error.message);
    else setItems((data ?? []) as T[]);
    setLoading(false);
  }, [table, orderBy, ascending, filterCol, filterVal]);

  useEffect(() => {
    reload();
  }, [reload]);

  const insert = useCallback(
    async (row: Partial<T>): Promise<T | null> => {
      setSaving(true);
      setError(null);
      const { data, error } = await getSupabase()
        .from(table)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(row as any)
        .select()
        .single();
      setSaving(false);
      if (error) {
        setError(error.message);
        return null;
      }
      const newItem = data as T;
      setItems((prev) => [...prev, newItem]);
      return newItem;
    },
    [table],
  );

  const update = useCallback(
    async (id: number, patch: Partial<T>): Promise<boolean> => {
      setSaving(true);
      setError(null);
      const { error } = await getSupabase()
        .from(table)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update(patch as any)
        .eq("id", id);
      setSaving(false);
      if (error) {
        setError(error.message);
        return false;
      }
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
      return true;
    },
    [table],
  );

  const remove = useCallback(
    async (id: number): Promise<boolean> => {
      setSaving(true);
      setError(null);
      const { error } = await getSupabase().from(table).delete().eq("id", id);
      setSaving(false);
      if (error) {
        setError(error.message);
        return false;
      }
      setItems((prev) => prev.filter((it) => it.id !== id));
      return true;
    },
    [table],
  );

  // Save sort_order for all items in current order
  const persistOrder = useCallback(async (): Promise<boolean> => {
    setSaving(true);
    setError(null);
    const sb = getSupabase();
    const updates = items.map((it, idx) =>
      sb
        .from(table)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update({ sort_order: idx } as any)
        .eq("id", it.id),
    );
    const results = await Promise.all(updates);
    setSaving(false);
    const firstError = results.find((r) => r.error);
    if (firstError?.error) {
      setError(firstError.error.message);
      return false;
    }
    return true;
  }, [table, items]);

  return {
    items,
    setItems,
    loading,
    saving,
    error,
    reload,
    insert,
    update,
    remove,
    persistOrder,
  };
}
