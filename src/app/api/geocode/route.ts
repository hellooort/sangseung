import { NextResponse } from "next/server";

/**
 * NAVER Cloud Platform Geocoding API 프록시.
 *
 * 클라이언트(=admin 페이지)에서 ?address=... 로 호출하면 위·경도를 반환한다.
 * Client Secret 은 서버에서만 보유하므로 NEXT_PUBLIC_* 가 아닌
 * `NAVER_MAP_CLIENT_SECRET` (서버 전용) 환경변수를 사용.
 *
 * 환경변수
 *   - NAVER_MAP_CLIENT_ID     (서버 전용, 없으면 NEXT_PUBLIC_NAVER_MAP_KEY_ID/CLIENT_ID 사용)
 *   - NAVER_MAP_CLIENT_SECRET (필수, 서버 전용)
 *
 * 응답: { lat, lng, roadAddress, jibunAddress } 또는 { error }
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GEOCODE_ENDPOINT =
  "https://maps.apigw.ntruss.com/map-geocode/v2/geocode";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address")?.trim();

  if (!address) {
    return NextResponse.json(
      { error: "address 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  const clientId =
    process.env.NAVER_MAP_CLIENT_ID ||
    process.env.NEXT_PUBLIC_NAVER_MAP_KEY_ID ||
    process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const clientSecret = process.env.NAVER_MAP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error:
          "Geocoding 자격증명이 설정되지 않았습니다. NAVER_MAP_CLIENT_SECRET (서버 전용) 환경변수를 채워주세요.",
      },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(
      `${GEOCODE_ENDPOINT}?query=${encodeURIComponent(address)}`,
      {
        method: "GET",
        headers: {
          "X-NCP-APIGW-API-KEY-ID": clientId,
          "X-NCP-APIGW-API-KEY": clientSecret,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      return NextResponse.json(
        {
          error: `NCP Geocoding 응답 오류 (${upstream.status})`,
          detail: text.slice(0, 500),
        },
        { status: upstream.status },
      );
    }

    const data = (await upstream.json()) as {
      addresses?: Array<{
        x?: string;
        y?: string;
        roadAddress?: string;
        jibunAddress?: string;
      }>;
      errorMessage?: string;
    };

    const first = data.addresses?.[0];
    if (!first || !first.x || !first.y) {
      return NextResponse.json(
        {
          error:
            "해당 주소로 좌표를 찾지 못했습니다. 도로명/지번을 정확히 입력해주세요.",
          detail: data.errorMessage,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      lat: Number(first.y),
      lng: Number(first.x),
      roadAddress: first.roadAddress ?? null,
      jibunAddress: first.jibunAddress ?? null,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Geocoding 호출 실패" },
      { status: 500 },
    );
  }
}
