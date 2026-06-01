import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // 인증(auth.getUser)은 관리자 보호 용도이므로 /admin 경로에서만 미들웨어를 실행한다.
  // 공개 페이지에서 매 요청 Supabase 인증 왕복을 돌던 것이 전체 TTFB를 크게 늘리던 원인.
  matcher: ["/admin/:path*"],
};
