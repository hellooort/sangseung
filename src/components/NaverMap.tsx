"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 네이버 지도 (Maps JavaScript API v3) 컴포넌트.
 *
 * 환경변수
 *   - NEXT_PUBLIC_NAVER_MAP_KEY_ID    (권장)
 *   - NEXT_PUBLIC_NAVER_MAP_CLIENT_ID (별칭, 둘 다 같은 통합 ncpKeyId 로 호출)
 *
 *   2024년 NCP Maps 통합 이후 발급분은 모두 `ncpKeyId` 파라미터를 사용합니다
 *   (구 `ncpClientId` 는 deprecated). 따라서 어느 환경변수에 넣어도 동일하게
 *   ncpKeyId 로 호출합니다.
 *
 * - 같은 페이지에 여러 지도가 있어도 스크립트는 1회만 로드.
 * - 마커/주소를 props 로 받아 렌더링하고, 주소 클릭 시 새 탭에서
 *   네이버 지도 검색 결과로 이동(길찾기 편의).
 */

interface NaverMapProps {
  lat: number;
  lng: number;
  /** 마커에 표시할 사무실 이름 */
  title?: string;
  /** "네이버 지도에서 보기" 링크에 사용할 검색어(주소 등) */
  searchQuery?: string;
  /** 지도 zoom level (기본 16) */
  zoom?: number;
  /** 추가 className (높이 컨테이너에서 사용) */
  className?: string;
}

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: Record<string, unknown>) => unknown;
        Position: { TOP_RIGHT: number };
        MapTypeControlStyle: { BUTTON: number };
        ZoomControlStyle: { SMALL: number };
      };
    };
    __naverMapsScriptPromise?: Promise<void>;
  }
}

const SCRIPT_ID = "naver-maps-sdk";

function loadNaverMapsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  if (window.naver?.maps) return Promise.resolve();
  if (window.__naverMapsScriptPromise) return window.__naverMapsScriptPromise;

  // 둘 중 어느 변수에 넣어도 받을 수 있게 한다 (운영 편의).
  const keyId =
    process.env.NEXT_PUBLIC_NAVER_MAP_KEY_ID || process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  if (!keyId) {
    return Promise.reject(
      new Error(
        "NEXT_PUBLIC_NAVER_MAP_KEY_ID 또는 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 가 설정되지 않았습니다.",
      ),
    );
  }

  // 2024 NCP Maps 통합 이후 신규 발급분은 모두 ncpKeyId 파라미터를 사용한다.
  // (구 ncpClientId 는 deprecated)
  const src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(keyId)}`;

  window.__naverMapsScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("naver maps script load failed")));
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.naver?.maps) resolve();
      else reject(new Error("naver.maps not available after load"));
    };
    script.onerror = () => reject(new Error("naver maps script load failed"));
    document.head.appendChild(script);
  });

  return window.__naverMapsScriptPromise;
}

export default function NaverMap({
  lat,
  lng,
  title,
  searchQuery,
  zoom = 16,
  className = "w-full h-full",
}: NaverMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadNaverMapsScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.naver?.maps) return;
        const { Map, LatLng, Marker } = window.naver.maps;
        const center = new LatLng(lat, lng);
        const map = new Map(containerRef.current, {
          center,
          zoom,
          minZoom: 6,
          scaleControl: false,
          logoControl: true,
          mapDataControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
            style: window.naver.maps.ZoomControlStyle.SMALL,
          },
        });
        new Marker({
          position: center,
          map,
          title: title ?? "",
        });
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [lat, lng, zoom, title]);

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center text-center bg-[#1a1a1a]`}>
        <div className="px-6">
          <p className="text-[#888] text-sm mb-3">지도를 불러올 수 없습니다.</p>
          <p className="text-[#555] text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <div ref={containerRef} className="w-full h-full" />
      {searchQuery && (
        <a
          href={`https://map.naver.com/p/search/${encodeURIComponent(searchQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-3 z-10 bg-white/95 hover:bg-white text-[#222] text-xs font-medium px-3 py-1.5 rounded shadow"
        >
          네이버 지도에서 보기
        </a>
      )}
    </div>
  );
}
