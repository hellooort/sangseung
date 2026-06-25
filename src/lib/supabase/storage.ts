import { createClient } from "./client";

const IMAGES_BUCKET = "images";
const FILES_BUCKET = "files";

function sanitizeFileName(name: string, forceExt?: string) {
  const rawExt = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const ext = forceExt ?? rawExt;
  const base = name.slice(0, name.length - rawExt.length).replace(/[^a-zA-Z0-9._-]/g, "_");
  const stamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `${stamp}_${rand}_${base || "file"}${ext}`;
}

// 업로드 전 이미지를 webp 로 변환 + 최대 변(邊) 길이로 리사이즈해 용량을 크게 줄인다.
// SVG/GIF(벡터·애니메이션) 는 변환 시 손상되므로 원본 그대로 둔다.
async function compressToWebp(
  file: File,
  maxDim = 1920,
  quality = 0.82,
): Promise<{ blob: Blob; ext: string }> {
  const noConvert = /image\/(svg\+xml|gif)/i.test(file.type);
  if (noConvert || typeof document === "undefined") {
    return { blob: file, ext: "" };
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { blob: file, ext: "" };
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality),
    );
    // 변환 실패하거나 오히려 원본이 더 작으면 원본 사용
    if (!blob || blob.size >= file.size) return { blob: file, ext: "" };
    return { blob, ext: ".webp" };
  } catch {
    return { blob: file, ext: "" };
  }
}

export async function uploadImage(file: File, folder = "misc"): Promise<string> {
  const supabase = createClient();
  const { blob, ext } = await compressToWebp(file);
  const filePath = `${folder}/${sanitizeFileName(file.name, ext || undefined)}`;

  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .upload(filePath, blob, {
      cacheControl: "3600",
      upsert: false,
      contentType: ext ? "image/webp" : file.type || undefined,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function uploadFile(file: File, folder = "misc"): Promise<{
  url: string;
  name: string;
  size: number;
}> {
  const supabase = createClient();
  const filePath = `${folder}/${sanitizeFileName(file.name)}`;

  const { error } = await supabase.storage
    .from(FILES_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(FILES_BUCKET).getPublicUrl(filePath);
  return { url: data.publicUrl, name: file.name, size: file.size };
}

export async function deleteImage(url: string): Promise<void> {
  const supabase = createClient();
  const path = extractPath(url, IMAGES_BUCKET);
  if (!path) return;
  await supabase.storage.from(IMAGES_BUCKET).remove([path]);
}

export async function deleteFile(url: string): Promise<void> {
  const supabase = createClient();
  const path = extractPath(url, FILES_BUCKET);
  if (!path) return;
  await supabase.storage.from(FILES_BUCKET).remove([path]);
}

function extractPath(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx < 0) return null;
  return url.slice(idx + marker.length);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
