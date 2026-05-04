# Supabase 설정 가이드

## 1. 데이터베이스 스키마 적용

1. Supabase 대시보드 → SQL Editor 열기
2. `schema.sql` 내용을 **전체 선택해서 붙여넣은 후 Run**
3. 이후 SQL Editor 에서 `seed.sql` 도 동일하게 실행 (초기 데이터 입력)
4. 생성된 테이블은 `Table Editor` 에서 확인 가능

이 스크립트는 다음을 자동으로 만들어줍니다:
- Storage 버킷 2개: `images`, `files` (공개)
- 모든 테이블 RLS 정책 (공개 읽기, 인증된 사용자만 쓰기/삭제)
- 모든 테이블 + 트리거 + `updated_at` 자동 갱신 함수

## 2. 관리자 계정 생성

Supabase 대시보드 → **Authentication → Users → Add user → Create new user**

- Email: `admin@sangseung.co.kr` (원하는 이메일)
- Password: 강한 비밀번호
- ✓ Auto Confirm User 체크 (이메일 인증 생략)

## 3. 환경 변수 설정

프로젝트 루트의 `.env.local` 에 다음 두 줄을 입력:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

## 4. 로컬 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000/admin` 진입 시 로그인 화면 `/admin/login` 으로 이동되고
2단계에서 만든 계정으로 로그인할 수 있습니다.

## 테이블 매핑 표

| 메뉴 | 테이블명 |
|---|---|
| 연혁 | `histories` |
| 파트너사 | `partners` |
| 인증서 | `certificate_categories`, `certificates` |
| 자료실 다운로드 | `resources` |
| 보도자료 | `press_releases` |
| 시공사례 | `work_categories`, `works` |
| 제품 라인업 | `product_categories`, `products` |
| 사업장 위치 | `office_locations` |
| IBS / 해외프로젝트 / 공사실적 | `ibs_*`, `overseas_*`, `project_records`, `project_record_categories` |
| 사업소개 (네트워크/LED/Video-Wall/유지보수) | `business_sections` |
| 헤더/푸터 등 단일 JSON | `site_settings` |

## 스토리지 폴더 구조

이미지는 `images` 버킷 아래의 다음 폴더에 업로드 됩니다:
- `partners/` — 파트너사 로고
- `certificates/` — 인증서
- `works/` — 시공사례
- `press/` — 보도자료 썸네일
- `products/` — 제품 이미지
- `business/` — 사업소개 히어로 이미지
- `misc/` — 기타

파일(다운로드 자료)은 `files` 버킷:
- `downloads/` — 자료실 다운로드 파일

## 5. 중복 데이터 정리 (`seed.sql` 을 두 번 이상 실행했을 때)

`seed.sql` 은 1.x 버전에서 BIGSERIAL PK 테이블에 대해 멱등성이 보장되지 않았습니다.
이미 두 번 실행해서 중복이 생긴 경우 `dedupe.sql` 을 한 번 실행하면 자동으로 정리됩니다.
이후 버전의 `seed.sql` 은 `WHERE NOT EXISTS` 패턴으로 멱등하게 동작합니다.