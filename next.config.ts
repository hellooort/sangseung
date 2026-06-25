import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  compiler: {
    // 프로덕션 빌드에서 console.* 제거 (error/warn 은 유지) — 보안/정보노출 방지
    removeConsole: { exclude: ["error", "warn"] },
  },
};

export default nextConfig;
