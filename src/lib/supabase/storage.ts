import { createClient } from "./client";

const IMAGES_BUCKET = "images";
const FILES_BUCKET = "files";

function sanitizeFileName(name: string) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const base = name.slice(0, name.length - ext.length).replace(/[^a-zA-Z0-9._-]/g, "_");
  const stamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `${stamp}_${rand}_${base || "file"}${ext}`;
}

export async function uploadImage(file: File, folder = "misc"): Promise<string> {
  const supabase = createClient();
  const filePath = `${folder}/${sanitizeFileName(file.name)}`;

  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

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
