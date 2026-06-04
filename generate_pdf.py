"""한국어 A4 보고서 HTML → PDF 변환기 (Playwright + Chromium).

사용법:
    1) 같은 폴더에 report.html 을 둔다 (template.html 을 복사해서 채움).
    2) 출력 파일명을 바꾸려면 PDF_PATH 변수만 수정한다.
    3) python generate_pdf.py

특징:
    - A4, 페이지 자동 번호, Pretendard/Malgun Gothic 한글 폰트
    - 표/제목의 페이지 분할 규칙 (page-break-inside / page-break-after) 자동 처리
    - 기존 PDF 파일이 열려있어 잠긴 경우: <이름>_HHMMSS.pdf 로 자동 fallback
"""
import sys
from datetime import datetime
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")

BASE = Path(__file__).parent
HTML_PATH = BASE / "report.html"
PDF_PATH = BASE / "상승종합통신_수정보고서.pdf"


def _resolve_output() -> Path:
    """기존 PDF가 잠겨 있으면 timestamp suffix를 붙여 새 파일로 출력."""
    if not PDF_PATH.exists():
        return PDF_PATH
    try:
        with open(PDF_PATH, "ab"):
            return PDF_PATH
    except PermissionError:
        ts = datetime.now().strftime("%H%M%S")
        return PDF_PATH.with_name(f"{PDF_PATH.stem}_{ts}.pdf")


def main() -> None:
    if not HTML_PATH.exists():
        sys.exit(f"[ERROR] HTML 파일이 없습니다: {HTML_PATH}")

    out = _resolve_output()
    url = HTML_PATH.resolve().as_uri()
    print(f"[INFO] HTML : {url}")
    print(f"[INFO] PDF  : {out}")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        page.emulate_media(media="print")
        page.pdf(
            path=str(out),
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            prefer_css_page_size=True,
        )
        browser.close()

    size_kb = out.stat().st_size / 1024
    print(f"[DONE] PDF 생성 완료 ({size_kb:,.1f} KB)")


if __name__ == "__main__":
    main()
