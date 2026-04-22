"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage, deleteImage } from "@/lib/supabase/storage";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
  previewClassName?: string;
  label?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUpload({
  value,
  onChange,
  folder = "misc",
  className = "",
  previewClassName = "w-40 h-24",
  label = "이미지 업로드",
  aspectRatio = "auto",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    if (!confirm("이미지를 삭제하시겠습니까?")) return;
    try {
      await deleteImage(value);
    } catch {
      // ignore delete errors (already removed, etc)
    }
    onChange("");
  };

  const aspectClass =
    aspectRatio === "square" ? "aspect-square" : aspectRatio === "video" ? "aspect-video" : "";

  return (
    <div className={className}>
      <div className="flex items-start gap-4">
        <div
          className={`relative ${previewClassName} ${aspectClass} bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0`}
        >
          {value ? (
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="text-xs text-gray-400">미리보기</span>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xs">업로드 중...</span>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="inline-block">
            <span className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
              {uploading ? "업로드 중..." : label}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="ml-2 text-red-500 text-sm hover:underline"
            >
              삭제
            </button>
          )}
          {value && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      </div>
    </div>
  );
}