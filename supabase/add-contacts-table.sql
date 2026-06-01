-- =====================================================================
-- TABLE: contacts (상담신청 / 문의 접수)
-- Supabase Dashboard > SQL Editor 에서 실행하세요.
-- 공개 사이트의 /contact 폼이 INSERT, 관리자만 조회/수정/삭제합니다.
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  company TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts (created_at DESC);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 누구나(익명 방문자 포함) 문의를 등록할 수 있다.
DROP POLICY IF EXISTS "Public insert contacts" ON public.contacts;
CREATE POLICY "Public insert contacts" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- 조회/수정/삭제는 로그인된 관리자만.
DROP POLICY IF EXISTS "Auth read contacts" ON public.contacts;
CREATE POLICY "Auth read contacts" ON public.contacts
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Auth update contacts" ON public.contacts;
CREATE POLICY "Auth update contacts" ON public.contacts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Auth delete contacts" ON public.contacts;
CREATE POLICY "Auth delete contacts" ON public.contacts
  FOR DELETE TO authenticated USING (true);
