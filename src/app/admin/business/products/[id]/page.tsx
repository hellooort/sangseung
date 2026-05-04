"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";
import type { ProductDetail } from "@/components/ProductDetailRenderer";

interface ProductRow {
  id: number;
  category_id: number | null;
  name: string | null;
  name_ko: string | null;
  name_en: string | null;
  slug: string | null;
  category_slug: string | null;
  image_url: string | null;
  detail: ProductDetail | null;
}

interface CategoryRow {
  id: number;
  name_ko: string;
}

const emptyDetail = (): ProductDetail => ({
  hero: {
    tag: "",
    title: "",
    title_en: "",
    description_ko: "",
    description_en: "",
    image: "",
    summary: [],
    cta_label_ko: "????",
    cta_label_en: "Get a Quote",
    cta_link: "/contact",
  },
  gallery: {
    images: [],
    title_ko: "",
    title_en: "",
    subtitle_en: "",
    description_ko: "",
    description_en: "",
    options_label_ko: "?? ??",
    options_label_en: "Pixel Pitch",
    options: [],
  },
  banner: { image: "", title_ko: "", title_en: "", description_ko: "", description_en: "" },
  features: [],
  specs: [],
  applications: [],
  cta_section: { title_ko: "", title_en: "", description_ko: "", description_en: "" },
});

const TAB_LIST = [
  { id: "basic", label: "?? ??" },
  { id: "hero", label: "Hero" },
  { id: "gallery", label: "???" },
  { id: "banner", label: "??" },
  { id: "features", label: "??" },
  { id: "specs", label: "???" },
  { id: "applications", label: "???" },
  { id: "cta", label: "?? CTA" },
] as const;

type TabId = (typeof TAB_LIST)[number]["id"];

export default function AdminProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const [tab, setTab] = useState<TabId>("basic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [row, setRow] = useState<ProductRow | null>(null);
  const [detail, setDetail] = useState<ProductDetail>(emptyDetail());
  const [cats, setCats] = useState<CategoryRow[]>([]);

  useEffect(() => {
    if (!id) return;
    const sb = createClient();
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          sb.from("products").select("*").eq("id", id).maybeSingle(),
          sb.from("product_categories").select("id,name_ko").order("sort_order"),
        ]);
        if (pRes.error) throw pRes.error;
        if (cRes.error) throw cRes.error;
        setRow(pRes.data as ProductRow);
        setCats((cRes.data as CategoryRow[]) ?? []);
        const d = (pRes.data?.detail as ProductDetail | null) ?? {};
        setDetail({ ...emptyDetail(), ...d });
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const setRowField = <K extends keyof ProductRow>(field: K, value: ProductRow[K]) => {
    setRow((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const setDetailPath = (path: string, value: unknown) => {
    setDetail((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>;
      const segs = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < segs.length - 1; i++) {
        const key = segs[i];
        if (cur[key] === undefined || cur[key] === null) cur[key] = {};
        cur = cur[key] as Record<string, unknown>;
      }
      cur[segs[segs.length - 1]] = value;
      return next as ProductDetail;
    });
  };

  const handleUpload = async (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
    onUrl: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(key);
    try {
      const url = await uploadImage(file, "products");
      onUrl(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "??? ??");
    } finally {
      setUploadingKey(null);
      e.target.value = "";
    }
  };

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingKey("gallery-multi");
    try {
      const urls: string[] = [];
      for (const f of files) urls.push(await uploadImage(f, "products"));
      const cur = detail.gallery?.images ?? [];
      setDetailPath("gallery.images", [...cur, ...urls]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "??? ??");
    } finally {
      setUploadingKey(null);
      e.target.value = "";
    }
  };

  const save = async () => {
    if (!row) return;
    setSaving(true);
    setError(null);
    try {
      const sb = createClient();
      const { error: err } = await sb
        .from("products")
        .update({
          category_id: row.category_id,
          name: row.name_ko ?? row.name ?? "",
          name_ko: row.name_ko ?? "",
          name_en: row.name_en ?? "",
          slug: row.slug ?? "",
          category_slug: row.category_slug ?? "",
          image_url: row.image_url ?? "",
          detail,
        })
        .eq("id", id);
      if (err) throw err;
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const previewUrl = useMemo(() => {
    if (!row?.slug || !row?.category_slug) return null;
    return `/business/led/${row.category_slug}/${row.slug}`;
  }, [row?.slug, row?.category_slug]);

  if (loading) return <div className="text-gray-400 text-sm">?? ?...</div>;
  if (!row) return <div className="text-gray-400 text-sm">??? ?? ? ????.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/business/products" className="text-blue-600 text-sm hover:underline">
            ? ?? ????? ????
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">?? ?? ??</h1>
          <p className="text-sm text-gray-500 mt-1">
            ?? ???? ?? ?? (Hero / ??? / ?? / ?? / ?? / ??? / CTA) ? ?????.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ???? ?
            </Link>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "?? ?..." : savedMsg ? "?? ??!" : "?? ??"}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      <div className="flex gap-2 mb-6 flex-wrap">
        {TAB_LIST.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === t.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Basic */}
        {tab === "basic" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">?? ??</h2>
            <p className="text-xs text-gray-500">URL: <code className="bg-gray-100 px-2 py-0.5 rounded">/business/led/{row.category_slug || "????"}/{row.slug || "??"}</code></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="??? (KO)">
                <input value={row.name_ko ?? ""} onChange={(e) => setRowField("name_ko", e.target.value)} className={inputCls} />
              </Field>
              <Field label="??? (EN)">
                <input value={row.name_en ?? ""} onChange={(e) => setRowField("name_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="????">
                <select
                  value={row.category_id ?? ""}
                  onChange={(e) => setRowField("category_id", e.target.value ? Number(e.target.value) : null)}
                  className={inputCls}
                >
                  <option value="">??</option>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>{c.name_ko}</option>
                  ))}
                </select>
              </Field>
              <Field label="???? slug (URL)">
                <input value={row.category_slug ?? ""} onChange={(e) => setRowField("category_slug", e.target.value)} placeholder="indoor / outdoor / cob ..." className={inputCls} />
              </Field>
              <Field label="?? slug (URL)">
                <input value={row.slug ?? ""} onChange={(e) => setRowField("slug", e.target.value)} placeholder="s-wall / lflex ..." className={inputCls} />
              </Field>
              <Field label="?? ??? URL (???)">
                <ImageInput
                  value={row.image_url ?? ""}
                  uploadKey="thumb"
                  uploadingKey={uploadingKey}
                  onChange={(v) => setRowField("image_url", v)}
                  onUpload={(e) => handleUpload("thumb", e, (url) => setRowField("image_url", url))}
                />
              </Field>
            </div>
          </div>
        )}

        {/* Hero */}
        {tab === "hero" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Hero ??</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="?? (?: INDOOR FIXED LED)">
                <input value={detail.hero?.tag ?? ""} onChange={(e) => setDetailPath("hero.tag", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? ???">
                <ImageInput
                  value={detail.hero?.image ?? ""}
                  uploadKey="hero"
                  uploadingKey={uploadingKey}
                  onChange={(v) => setDetailPath("hero.image", v)}
                  onUpload={(e) => handleUpload("hero", e, (url) => setDetailPath("hero.image", url))}
                />
              </Field>
              <Field label="?? (KO)">
                <input value={detail.hero?.title ?? ""} onChange={(e) => setDetailPath("hero.title", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? (EN)">
                <input value={detail.hero?.title_en ?? ""} onChange={(e) => setDetailPath("hero.title_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="??? (KO)">
                <textarea rows={3} value={detail.hero?.description_ko ?? ""} onChange={(e) => setDetailPath("hero.description_ko", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="??? (EN)">
                <textarea rows={3} value={detail.hero?.description_en ?? ""} onChange={(e) => setDetailPath("hero.description_en", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="CTA ?? ??? (KO)">
                <input value={detail.hero?.cta_label_ko ?? ""} onChange={(e) => setDetailPath("hero.cta_label_ko", e.target.value)} className={inputCls} />
              </Field>
              <Field label="CTA ?? ??? (EN)">
                <input value={detail.hero?.cta_label_en ?? ""} onChange={(e) => setDetailPath("hero.cta_label_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="CTA ?? URL">
                <input value={detail.hero?.cta_link ?? ""} onChange={(e) => setDetailPath("hero.cta_link", e.target.value)} className={inputCls} />
              </Field>
            </div>

            <ListEditor
              title="?? ?? (Hero ?? 4?)"
              items={detail.hero?.summary ?? []}
              onChange={(arr) => setDetailPath("hero.summary", arr)}
              empty={() => ({ label_ko: "", value_ko: "", label_en: "", value_en: "" })}
              render={(item, update) => (
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="?? (KO)" value={item.label_ko ?? ""} onChange={(e) => update({ ...item, label_ko: e.target.value })} className={inputSmCls} />
                  <input placeholder="? (KO)" value={item.value_ko ?? ""} onChange={(e) => update({ ...item, value_ko: e.target.value })} className={inputSmCls} />
                  <input placeholder="Label (EN)" value={item.label_en ?? ""} onChange={(e) => update({ ...item, label_en: e.target.value })} className={inputSmCls} />
                  <input placeholder="Value (EN)" value={item.value_en ?? ""} onChange={(e) => update({ ...item, value_en: e.target.value })} className={inputSmCls} />
                </div>
              )}
            />
          </div>
        )}

        {/* Gallery */}
        {tab === "gallery" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">??? + ?? ??</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="?? ???? (KO)">
                <input value={detail.gallery?.title_ko ?? ""} onChange={(e) => setDetailPath("gallery.title_ko", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? ???? (EN)">
                <input value={detail.gallery?.title_en ?? ""} onChange={(e) => setDetailPath("gallery.title_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? ??? (?: Indoor Fixed LED Display)">
                <input value={detail.gallery?.subtitle_en ?? ""} onChange={(e) => setDetailPath("gallery.subtitle_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? ?? (KO)">
                <input value={detail.gallery?.options_label_ko ?? ""} onChange={(e) => setDetailPath("gallery.options_label_ko", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? (KO)">
                <textarea rows={4} value={detail.gallery?.description_ko ?? ""} onChange={(e) => setDetailPath("gallery.description_ko", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (EN)">
                <textarea rows={4} value={detail.gallery?.description_en ?? ""} onChange={(e) => setDetailPath("gallery.description_en", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (?: P1.2, P1.5, P1.8) - ??? ??">
                <input
                  value={(detail.gallery?.options ?? []).join(", ")}
                  onChange={(e) => setDetailPath("gallery.options", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">??? ??? ({detail.gallery?.images?.length ?? 0}?)</h3>
                <label className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-700">
                  {uploadingKey === "gallery-multi" ? "????..." : "+ ??? ?? ???"}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultiUpload} />
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(detail.gallery?.images ?? []).map((img, idx) => (
                  <div key={idx} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative aspect-square bg-gray-100">
                      {img && <Image src={img} alt="" fill className="object-contain p-2" unoptimized />}
                    </div>
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => {
                          const arr = [...(detail.gallery?.images ?? [])];
                          if (idx === 0) return;
                          [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                          setDetailPath("gallery.images", arr);
                        }}
                        className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded shadow"
                      >
                        ?
                      </button>
                      <button
                        onClick={() => {
                          const arr = [...(detail.gallery?.images ?? [])];
                          if (idx === arr.length - 1) return;
                          [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                          setDetailPath("gallery.images", arr);
                        }}
                        className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded shadow"
                      >
                        ?
                      </button>
                      <button
                        onClick={() => {
                          const arr = [...(detail.gallery?.images ?? [])];
                          arr.splice(idx, 1);
                          setDetailPath("gallery.images", arr);
                        }}
                        className="bg-red-500 text-white text-xs px-2 py-0.5 rounded shadow"
                      >
                        ??
                      </button>
                    </div>
                  </div>
                ))}
                {(detail.gallery?.images ?? []).length === 0 && (
                  <p className="text-gray-400 text-sm col-span-full text-center py-6">??? ???? ????.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Banner */}
        {tab === "banner" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">?? ?? (?? ???)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="?? ???">
                <ImageInput
                  value={detail.banner?.image ?? ""}
                  uploadKey="banner"
                  uploadingKey={uploadingKey}
                  onChange={(v) => setDetailPath("banner.image", v)}
                  onUpload={(e) => handleUpload("banner", e, (url) => setDetailPath("banner.image", url))}
                />
              </Field>
              <div />
              <Field label="?? (KO) - ???? Enter">
                <textarea rows={3} value={detail.banner?.title_ko ?? ""} onChange={(e) => setDetailPath("banner.title_ko", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (EN)">
                <textarea rows={3} value={detail.banner?.title_en ?? ""} onChange={(e) => setDetailPath("banner.title_en", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (KO)">
                <textarea rows={4} value={detail.banner?.description_ko ?? ""} onChange={(e) => setDetailPath("banner.description_ko", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (EN)">
                <textarea rows={4} value={detail.banner?.description_en ?? ""} onChange={(e) => setDetailPath("banner.description_en", e.target.value)} className={textareaCls} />
              </Field>
            </div>
          </div>
        )}

        {/* Features */}
        {tab === "features" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">?? ?? (?? ?? ????)</h2>
            <ListEditor
              title=""
              items={detail.features ?? []}
              onChange={(arr) => setDetailPath("features", arr)}
              empty={() => ({ subtitle_en: "", title_ko: "", title_en: "", description_ko: "", description_en: "", image: "" })}
              render={(item, update) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="?? ?? (?: HDR Processing)" value={item.subtitle_en ?? ""} onChange={(e) => update({ ...item, subtitle_en: e.target.value })} className={inputSmCls} />
                  <ImageInput
                    value={item.image ?? ""}
                    uploadKey={`feat-${Math.random()}`}
                    uploadingKey={uploadingKey}
                    onChange={(v) => update({ ...item, image: v })}
                    onUpload={(e) => handleUpload("feat", e, (url) => update({ ...item, image: url }))}
                  />
                  <input placeholder="?? (KO)" value={item.title_ko ?? ""} onChange={(e) => update({ ...item, title_ko: e.target.value })} className={inputSmCls} />
                  <input placeholder="?? (EN)" value={item.title_en ?? ""} onChange={(e) => update({ ...item, title_en: e.target.value })} className={inputSmCls} />
                  <textarea rows={3} placeholder="?? (KO)" value={item.description_ko ?? ""} onChange={(e) => update({ ...item, description_ko: e.target.value })} className={textareaSmCls} />
                  <textarea rows={3} placeholder="Description (EN)" value={item.description_en ?? ""} onChange={(e) => update({ ...item, description_en: e.target.value })} className={textareaSmCls} />
                </div>
              )}
            />
          </div>
        )}

        {/* Specs */}
        {tab === "specs" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">??? (Specifications)</h2>
            <ListEditor
              title=""
              items={detail.specs ?? []}
              onChange={(arr) => setDetailPath("specs", arr)}
              empty={() => ({ label: "", value: "" })}
              render={(item, update) => (
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="?? (?: Pixel Pitch)" value={item.label ?? ""} onChange={(e) => update({ ...item, label: e.target.value })} className={inputSmCls} />
                  <input placeholder="? (?: 1.2 / 1.5 / 1.8)" value={item.value ?? ""} onChange={(e) => update({ ...item, value: e.target.value })} className={inputSmCls} />
                </div>
              )}
            />
          </div>
        )}

        {/* Applications */}
        {tab === "applications" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">??? (Applications)</h2>
            <ListEditor
              title=""
              items={detail.applications ?? []}
              onChange={(arr) => setDetailPath("applications", arr)}
              empty={() => ({ title_ko: "", title_en: "", description_ko: "", description_en: "" })}
              render={(item, update) => (
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="?? (KO)" value={item.title_ko ?? ""} onChange={(e) => update({ ...item, title_ko: e.target.value })} className={inputSmCls} />
                  <input placeholder="?? (EN)" value={item.title_en ?? ""} onChange={(e) => update({ ...item, title_en: e.target.value })} className={inputSmCls} />
                  <input placeholder="?? (KO)" value={item.description_ko ?? ""} onChange={(e) => update({ ...item, description_ko: e.target.value })} className={inputSmCls} />
                  <input placeholder="Description (EN)" value={item.description_en ?? ""} onChange={(e) => update({ ...item, description_en: e.target.value })} className={inputSmCls} />
                </div>
              )}
            />
          </div>
        )}

        {/* CTA */}
        {tab === "cta" && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">?? CTA ??</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="?? (KO)">
                <input value={detail.cta_section?.title_ko ?? ""} onChange={(e) => setDetailPath("cta_section.title_ko", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? (EN)">
                <input value={detail.cta_section?.title_en ?? ""} onChange={(e) => setDetailPath("cta_section.title_en", e.target.value)} className={inputCls} />
              </Field>
              <Field label="?? (KO)">
                <textarea rows={3} value={detail.cta_section?.description_ko ?? ""} onChange={(e) => setDetailPath("cta_section.description_ko", e.target.value)} className={textareaCls} />
              </Field>
              <Field label="?? (EN)">
                <textarea rows={3} value={detail.cta_section?.description_en ?? ""} onChange={(e) => setDetailPath("cta_section.description_en", e.target.value)} className={textareaCls} />
              </Field>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "?? ?..." : savedMsg ? "?? ??!" : "?? ??"}
        </button>
      </div>

      <button
        onClick={() => router.push("/admin/business/products")}
        className="text-gray-400 text-sm hover:text-gray-600 mt-6"
      >
        ? ????
      </button>
    </div>
  );
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const inputSmCls = "w-full px-2 py-1.5 rounded border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const textareaCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white";
const textareaSmCls = "w-full px-2 py-1.5 rounded border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-gray-500 font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function ImageInput({
  value,
  uploadKey,
  uploadingKey,
  onChange,
  onUpload,
}: {
  value: string;
  uploadKey: string;
  uploadingKey: string | null;
  onChange: (v: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-20 h-16 bg-gray-100 rounded border border-gray-200 flex-shrink-0 overflow-hidden">
        {value ? <Image src={value} alt="" fill className="object-contain p-1" unoptimized /> : <div className="w-full h-full" />}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https:// ?? /image/..." className="w-full px-2 py-1 rounded border border-gray-200 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
        <label className="cursor-pointer text-xs text-blue-600 hover:underline">
          {uploadingKey === uploadKey ? "????..." : "+ ?? ???"}
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      </div>
    </div>
  );
}

function ListEditor<T>({
  title,
  items,
  onChange,
  empty,
  render,
}: {
  title: string;
  items: T[];
  onChange: (arr: T[]) => void;
  empty: () => T;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
}) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
        <button
          onClick={() => onChange([...items, empty()])}
          className="ml-auto text-blue-600 text-xs font-medium hover:underline"
        >
          + ??
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">#{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (idx === 0) return;
                    const arr = [...items];
                    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                    onChange(arr);
                  }}
                  className="text-gray-400 hover:text-gray-700 text-xs px-2"
                >
                  ?
                </button>
                <button
                  onClick={() => {
                    if (idx === items.length - 1) return;
                    const arr = [...items];
                    [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                    onChange(arr);
                  }}
                  className="text-gray-400 hover:text-gray-700 text-xs px-2"
                >
                  ?
                </button>
                <button
                  onClick={() => {
                    const arr = [...items];
                    arr.splice(idx, 1);
                    onChange(arr);
                  }}
                  className="text-red-400 hover:text-red-600 text-xs px-2"
                >
                  ??
                </button>
              </div>
            </div>
            {render(item, (next) => {
              const arr = [...items];
              arr[idx] = next;
              onChange(arr);
            })}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-400 text-xs text-center py-6 border border-dashed border-gray-200 rounded-lg">
            ??? ????. ?? ?? + ?? ??? ????.
          </p>
        )}
      </div>
    </div>
  );
}
