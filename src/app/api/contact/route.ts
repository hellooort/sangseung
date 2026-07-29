import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * 문의(상담신청) 접수 엔드포인트.
 *
 * /contact 폼이 POST 하면
 *   1) contacts 테이블에 저장하고
 *   2) Resend 로 담당자들에게 알림 메일을 보낸다.
 *
 * 메일 발송이 실패해도 접수 자체는 성공 처리한다(관리자 페이지에서 조회 가능).
 *
 * 환경변수
 *   - RESEND_API_KEY        (필수, 서버 전용)
 *   - CONTACT_NOTIFY_TO     (선택, 쉼표 구분 수신자 목록 — 없으면 아래 기본값)
 *   - CONTACT_NOTIFY_FROM   (선택, 발신자 — Resend 에 인증된 도메인이어야 함)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_NOTIFY_TO = [
  "info@sangseung.co.kr",
  "yu6625@stcnet.co.kr",
  "njs702@stcnet.co.kr",
  "yun980220@gmail.com",
];

// Resend 에 인증된 도메인(stcnet.co.kr)으로만 발송할 수 있다.
const DEFAULT_NOTIFY_FROM = "상승종합통신 <noreply@stcnet.co.kr>";

const FIELD_MAX = {
  company: 200,
  name: 100,
  email: 200,
  phone: 50,
  subject: 300,
  message: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Inquiry = {
  company: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function buildHtml(f: Inquiry, receivedAt: string): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 14px;background:#f5f7fa;border:1px solid #e3e8ef;font-weight:600;color:#334155;white-space:nowrap;">${esc(label)}</td>
      <td style="padding:10px 14px;border:1px solid #e3e8ef;color:#0f172a;">${esc(value) || "-"}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:'Malgun Gothic',AppleSDGothicNeo,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:20px 24px;">
        <p style="margin:0;color:#4A90D9;font-size:12px;letter-spacing:2px;">CONTACT</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">홈페이지 문의가 접수되었습니다</h1>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("접수일시", receivedAt)}
          ${row("회사명", f.company)}
          ${row("이름", f.name)}
          ${row("이메일", f.email)}
          ${row("연락처", f.phone)}
          ${row("문의 제목", f.subject)}
        </table>
        <p style="margin:24px 0 8px;font-weight:600;color:#334155;font-size:14px;">문의 내용</p>
        <div style="padding:16px;background:#f8fafc;border:1px solid #e3e8ef;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(f.message)}</div>
        <p style="margin:24px 0 0;color:#64748b;font-size:12px;">
          이 메일에 그대로 답장하면 문의자(${esc(f.email)})에게 전송됩니다.
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function buildText(f: Inquiry, receivedAt: string): string {
  return [
    "홈페이지 문의가 접수되었습니다.",
    "",
    `접수일시: ${receivedAt}`,
    `회사명: ${f.company || "-"}`,
    `이름: ${f.name}`,
    `이메일: ${f.email}`,
    `연락처: ${f.phone}`,
    `문의 제목: ${f.subject}`,
    "",
    "문의 내용",
    "--------------------------------------",
    f.message,
  ].join("\n");
}

async function sendNotification(form: Inquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY 가 설정되지 않아 알림 메일을 보내지 못했습니다.");
    return false;
  }

  const to = (process.env.CONTACT_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const receivedAt = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_NOTIFY_FROM || DEFAULT_NOTIFY_FROM,
        to: to.length > 0 ? to : DEFAULT_NOTIFY_TO,
        reply_to: form.email,
        subject: `[홈페이지 문의] ${form.subject} - ${form.name}`,
        html: buildHtml(form, receivedAt),
        text: buildText(form, receivedAt),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[contact] Resend 발송 실패:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[contact] Resend 호출 중 오류:", e);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const form: Inquiry = {
    company: str(body.company),
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    subject: str(body.subject),
    message: str(body.message),
  };

  if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
    return NextResponse.json(
      { error: "필수 항목을 모두 입력해 주세요." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(form.email)) {
    return NextResponse.json(
      { error: "이메일 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }
  for (const [key, max] of Object.entries(FIELD_MAX)) {
    if (form[key as keyof Inquiry].length > max) {
      return NextResponse.json(
        { error: "입력 가능한 길이를 초과했습니다." },
        { status: 400 },
      );
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "서버 설정 오류로 문의를 접수하지 못했습니다." },
      { status: 500 },
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("contacts").insert({
    company: form.company || null,
    name: form.name,
    email: form.email,
    phone: form.phone,
    subject: form.subject,
    message: form.message,
  });

  if (error) {
    console.error("[contact] contacts INSERT 실패:", error.message);
    return NextResponse.json(
      { error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }

  // 저장은 끝났으므로 메일 실패는 접수 실패로 취급하지 않는다.
  const notified = await sendNotification(form);

  return NextResponse.json({ ok: true, notified });
}
