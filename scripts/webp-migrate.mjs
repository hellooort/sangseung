// 기존 Storage 이미지 일괄 webp 변환 + DB URL 교체 + 원본 삭제
//
// 사용법:
//   1) .env.local 에 service_role 키 추가:
//        SUPABASE_SERVICE_ROLE_KEY=eyJ...   (Supabase 대시보드 → Settings → API → service_role)
//   2) 미리보기(아무것도 안 바꿈):   node scripts/webp-migrate.mjs
//   3) 실제 실행:                    node scripts/webp-migrate.mjs --apply
//
// 동작: images 버킷의 png/jpg 를 webp(품질 82, 최대 1920px)로 변환 → 업로드 →
//       DB 여러 테이블의 이미지 URL 을 새 webp URL 로 교체 → 원본 png/jpg 삭제.
// 안전장치: 변환 결과가 원본보다 크면 건너뜀. svg/gif/webp 는 건드리지 않음.

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const APPLY = process.argv.includes("--apply");
const DELETE_ORIG = process.argv.includes("--delete-originals");
const BUCKET = "images";
const MAX_DIM = 1920;
const QUALITY = 82;

// .env.local 파싱
function loadEnv() {
  const p = path.resolve(process.cwd(), ".env.local");
  const env = {};
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return { ...env, ...process.env };
}
const env = loadEnv();
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 가 .env.local 에 없습니다.");
  process.exit(1);
}
const PUBLIC_PREFIX = `${URL}/storage/v1/object/public/${BUCKET}/`;
const sb = createClient(URL, KEY, { auth: { persistSession: false } });

// DB URL 교체 대상 테이블 (id 기반). site_settings 는 key 기반이라 별도 처리.
const TABLES = [
  "products", "product_categories", "works", "work_categories",
  "certificates", "certificate_categories", "partners", "business_sections",
  "ibs_categories", "ibs_items", "overseas_categories", "overseas_projects",
  "project_record_categories", "project_records", "resources", "histories",
  "office_locations",
];

const CONVERTIBLE = /\.(png|jpe?g)$/i;
const SKIP = /\.(webp|svg|gif|avif)$/i;

async function listAll(prefix = "") {
  const out = [];
  let offset = 0;
  for (;;) {
    const { data, error } = await sb.storage.from(BUCKET).list(prefix, { limit: 1000, offset, sortBy: { column: "name", order: "asc" } });
    if (error) { console.warn(`list 실패 [${prefix}]: ${error.message}`); break; }
    if (!data || data.length === 0) break;
    for (const item of data) {
      const full = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null || item.metadata == null) {
        // 폴더 → 재귀
        out.push(...await listAll(full));
      } else {
        out.push(full);
      }
    }
    if (data.length < 1000) break;
    offset += 1000;
  }
  return out;
}

function fmt(b) { return b < 1024 ? `${b}B` : b < 1048576 ? `${(b/1024).toFixed(1)}KB` : `${(b/1048576).toFixed(2)}MB`; }

async function deleteOriginalsPhase() {
  console.log(`\n=== 원본 삭제 단계 (webp 짝이 있는 png/jpg만 삭제) ===`);
  const all = await listAll("");
  const webpSet = new Set(all.filter((p) => /\.webp$/i.test(p)));
  const origs = all.filter((p) => CONVERTIBLE.test(p) && webpSet.has(p.replace(CONVERTIBLE, ".webp")));
  console.log(`webp 짝이 있는 원본 ${origs.length}개 삭제`);
  for (let i = 0; i < origs.length; i += 100) {
    const { error } = await sb.storage.from(BUCKET).remove(origs.slice(i, i + 100));
    if (error) console.warn(`삭제 실패: ${error.message}`);
  }
  console.log("원본 삭제 완료");
}

async function main() {
  if (DELETE_ORIG && !APPLY) { await deleteOriginalsPhase(); return; }
  console.log(`\n=== webp 마이그레이션 (${APPLY ? "실제 실행" : "미리보기"}) ===`);
  const all = await listAll("");
  const targets = all.filter((p) => CONVERTIBLE.test(p) && !SKIP.test(p));
  console.log(`전체 객체 ${all.length}개 중 변환 대상(png/jpg) ${targets.length}개\n`);

  const mapping = {}; // oldUrl -> newUrl
  let oldTotal = 0, newTotal = 0, converted = 0, skipped = 0;
  const toDelete = [];

  for (const p of targets) {
    const { data: dl, error: de } = await sb.storage.from(BUCKET).download(p);
    if (de || !dl) { console.warn(`다운로드 실패 ${p}: ${de?.message}`); continue; }
    const buf = Buffer.from(await dl.arrayBuffer());
    let webp;
    try {
      webp = await sharp(buf).rotate().resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer();
    } catch (e) { console.warn(`변환 실패 ${p}: ${e.message}`); continue; }

    if (webp.length >= buf.length) { skipped++; continue; } // 원본이 더 작으면 패스

    const newPath = p.replace(CONVERTIBLE, ".webp");
    oldTotal += buf.length; newTotal += webp.length; converted++;
    const oldUrl = PUBLIC_PREFIX + p;
    const newUrl = PUBLIC_PREFIX + newPath;
    mapping[oldUrl] = newUrl;
    if (newPath !== p) toDelete.push(p);

    console.log(`${APPLY ? "변환" : "[예정]"} ${p}  ${fmt(buf.length)} → ${fmt(webp.length)}`);

    if (APPLY) {
      const { error: ue } = await sb.storage.from(BUCKET).upload(newPath, webp, { contentType: "image/webp", upsert: true, cacheControl: "3600" });
      if (ue) { console.warn(`업로드 실패 ${newPath}: ${ue.message}`); delete mapping[oldUrl]; continue; }
    }
  }

  console.log(`\n변환 ${converted}개 | 건너뜀(원본이 더 작음) ${skipped}개`);
  console.log(`용량: ${fmt(oldTotal)} → ${fmt(newTotal)}  (절감 ${oldTotal ? (100*(1-newTotal/oldTotal)).toFixed(1) : 0}%)`);

  // DB URL 교체
  const remap = (v) => {
    if (typeof v === "string") { let s = v; for (const [o, n] of Object.entries(mapping)) if (s.includes(o)) s = s.split(o).join(n); return s; }
    if (Array.isArray(v)) return v.map(remap);
    if (v && typeof v === "object") { const o = {}; for (const k of Object.keys(v)) o[k] = remap(v[k]); return o; }
    return v;
  };

  let rowUpdates = 0;
  // site_settings (key 기반)
  {
    const { data, error } = await sb.from("site_settings").select("key,value");
    if (!error && data) for (const row of data) {
      const nv = remap(row.value);
      if (JSON.stringify(nv) !== JSON.stringify(row.value)) {
        rowUpdates++;
        console.log(`${APPLY ? "DB" : "[예정]"} site_settings.${row.key}`);
        if (APPLY) { const { error: e } = await sb.from("site_settings").update({ value: nv }).eq("key", row.key); if (e) console.warn(`  실패: ${e.message}`); }
      }
    }
  }
  // id 기반 테이블
  for (const t of TABLES) {
    const { data, error } = await sb.from(t).select("*");
    if (error) { /* 테이블 없을 수 있음 */ continue; }
    for (const row of data) {
      const nr = remap(row);
      if (JSON.stringify(nr) !== JSON.stringify(row)) {
        rowUpdates++;
        const { id, ...rest } = nr;
        console.log(`${APPLY ? "DB" : "[예정]"} ${t}.id=${row.id}`);
        if (APPLY) { const { error: e } = await sb.from(t).update(rest).eq("id", row.id); if (e) console.warn(`  실패: ${e.message}`); }
      }
    }
  }
  console.log(`\nDB 업데이트 대상 행: ${rowUpdates}개`);

  // 원본은 기본적으로 보존. 삭제는 webp 확인 후 별도 단계(--delete-originals)에서.
  if (APPLY && DELETE_ORIG && toDelete.length) {
    for (let i = 0; i < toDelete.length; i += 100) {
      const { error } = await sb.storage.from(BUCKET).remove(toDelete.slice(i, i + 100));
      if (error) console.warn(`원본 삭제 실패: ${error.message}`);
    }
    console.log(`원본 ${toDelete.length}개 삭제 완료`);
  } else if (APPLY) {
    console.log(`\n✅ 원본 ${toDelete.length}개는 보존했습니다. 사이트에서 webp 정상 표시 확인 후`);
    console.log(`   node scripts/webp-migrate.mjs --delete-originals  로 원본을 삭제하세요.`);
  } else {
    console.log(`\n원본 삭제 예정 수: ${toDelete.length}개 (실제 실행 시 보존, 이후 --delete-originals 로 삭제)`);
  }

  console.log(`\n=== ${APPLY ? "변환 완료(원본 보존)" : "미리보기 끝 — 실제 실행하려면 --apply"} ===`);
}
main().catch((e) => { console.error(e); process.exit(1); });
