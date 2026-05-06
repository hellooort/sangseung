"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface NavItem {
  name: string;
  name_en?: string;
  href: string;
  submenu?: NavItem[];
}

const fallback: NavItem[] = [
  {
    name: "회사소개", name_en: "About", href: "/about",
    submenu: [
      { name: "인사말", name_en: "Greeting", href: "/about" },
      { name: "연혁", name_en: "History", href: "/about/history" },
      { name: "조직도", name_en: "Organization", href: "/about/organization" },
      { name: "인증서", name_en: "Certificates", href: "/about/certificates" },
      { name: "오시는 길", name_en: "Location", href: "/about/location" },
    ],
  },
  {
    name: "사업소개", name_en: "Business", href: "/business",
    submenu: [
      {
        name: "네트워크 사업", name_en: "Network", href: "/business/network",
        submenu: [
          { name: "IBS 통합시스템", name_en: "IBS Integrated System", href: "/business/network/ibs" },
          { name: "해외 프로젝트", name_en: "Overseas Projects", href: "/business/network/overseas" },
          { name: "공사실적", name_en: "Project Records", href: "/business/network/projects" },
        ],
      },
      {
        name: "LED 디스플레이", name_en: "LED Display", href: "/business/led",
        submenu: [
          { name: "COB LED", name_en: "COB LED", href: "/business/led/cob" },
          { name: "INDOOR FIXED", name_en: "Indoor Fixed", href: "/business/led/indoor" },
          { name: "OUTDOOR FIXED", name_en: "Outdoor Fixed", href: "/business/led/outdoor" },
          { name: "RENTAL", name_en: "Rental", href: "/business/led/rental" },
          { name: "MEDIA FACADE", name_en: "Media Facade", href: "/business/led/facade" },
          { name: "AD SIGN", name_en: "Ad Sign", href: "/business/led/adsign" },
        ],
      },
      { name: "Video-Wall", name_en: "Video-Wall", href: "/business/ip-wall" },
      { name: "유지보수", name_en: "Maintenance", href: "/business/maintenance" },
    ],
  },
  { name: "시공사례", name_en: "Projects", href: "/works" },
  { name: "자료실", name_en: "Downloads", href: "/resources/downloads" },
  { name: "보도자료", name_en: "Press", href: "/resources/press" },
  { name: "파트너사", name_en: "Partners", href: "/partners" },
];

// 깊은 복사 후 path([인덱스 경로]) 위치의 항목을 patch.
function updateAtPath(tree: NavItem[], path: number[], patch: Partial<NavItem>): NavItem[] {
  const next = JSON.parse(JSON.stringify(tree)) as NavItem[];
  let arr: NavItem[] = next;
  for (let i = 0; i < path.length - 1; i++) {
    const idx = path[i];
    if (!arr[idx].submenu) arr[idx].submenu = [];
    arr = arr[idx].submenu!;
  }
  const last = path[path.length - 1];
  arr[last] = { ...arr[last], ...patch };
  return next;
}
function removeAtPath(tree: NavItem[], path: number[]): NavItem[] {
  const next = JSON.parse(JSON.stringify(tree)) as NavItem[];
  let arr: NavItem[] = next;
  for (let i = 0; i < path.length - 1; i++) {
    arr = arr[path[i]].submenu!;
  }
  arr.splice(path[path.length - 1], 1);
  return next;
}
function addChild(tree: NavItem[], path: number[]): NavItem[] {
  const next = JSON.parse(JSON.stringify(tree)) as NavItem[];
  if (path.length === 0) {
    next.push({ name: "새 메뉴", name_en: "New", href: "/" });
    return next;
  }
  let arr: NavItem[] = next;
  for (let i = 0; i < path.length - 1; i++) {
    arr = arr[path[i]].submenu!;
  }
  const target = arr[path[path.length - 1]];
  if (!target.submenu) target.submenu = [];
  target.submenu.push({ name: "새 하위 메뉴", name_en: "New", href: "/" });
  return next;
}
function moveAtPath(tree: NavItem[], path: number[], dir: -1 | 1): NavItem[] {
  const next = JSON.parse(JSON.stringify(tree)) as NavItem[];
  let arr: NavItem[] = next;
  for (let i = 0; i < path.length - 1; i++) {
    arr = arr[path[i]].submenu!;
  }
  const last = path[path.length - 1];
  const target = last + dir;
  if (target < 0 || target >= arr.length) return tree;
  [arr[last], arr[target]] = [arr[target], arr[last]];
  return next;
}

const inputCls = "w-full px-3 py-2 rounded border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";

interface NavRowProps {
  item: NavItem;
  path: number[];
  siblings: number;
  depth: number;
  onUpdate: (path: number[], patch: Partial<NavItem>) => void;
  onRemove: (path: number[]) => void;
  onAddChild: (path: number[]) => void;
  onMove: (path: number[], dir: -1 | 1) => void;
}

function NavRow({ item, path, siblings, depth, onUpdate, onRemove, onAddChild, onMove }: NavRowProps) {
  const idx = path[path.length - 1];
  return (
    <div className={depth === 0 ? "bg-white rounded-xl border border-gray-200 p-5" : "border-l-2 border-gray-100 pl-4 mt-3"}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">한국어</label>
          <input type="text" value={item.name ?? ""} onChange={(e) => onUpdate(path, { name: e.target.value })} className={inputCls + (depth === 0 ? " font-semibold" : "")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">English</label>
          <input type="text" value={item.name_en ?? ""} onChange={(e) => onUpdate(path, { name_en: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">경로 (URL)</label>
          <input type="text" value={item.href ?? ""} onChange={(e) => onUpdate(path, { href: e.target.value })} placeholder="/about" className={inputCls + " font-mono text-xs"} />
        </div>
        <div className="flex items-center gap-1 pb-1">
          <button onClick={() => onMove(path, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2" title="위로">↑</button>
          <button onClick={() => onMove(path, 1)} disabled={idx === siblings - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-2" title="아래로">↓</button>
          <button onClick={() => onAddChild(path)} className="text-blue-600 text-xs hover:underline px-1" title="하위 메뉴 추가">+ 하위</button>
          <button onClick={() => onRemove(path)} className="text-red-500 text-xs hover:underline px-1">삭제</button>
        </div>
      </div>

      {item.submenu && item.submenu.length > 0 && (
        <div className="mt-3 space-y-3">
          {item.submenu.map((child, ci) => (
            <NavRow
              key={path.join("-") + "-" + ci}
              item={child}
              path={[...path, ci]}
              siblings={item.submenu!.length}
              depth={depth + 1}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onAddChild={onAddChild}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminNavigationPage() {
  const { value: nav, setValue: setNav, loading, saving, save, error } = useSiteSetting<NavItem[]>(
    "navigation",
    fallback,
  );
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = async () => {
    const ok = await save();
    if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); }
  };

  const onUpdate    = (path: number[], patch: Partial<NavItem>) => setNav(updateAtPath(nav, path, patch));
  const onRemove    = (path: number[]) => { if (confirm("이 메뉴(및 하위 메뉴 전부) 를 삭제하시겠습니까?")) setNav(removeAtPath(nav, path)); };
  const onAddChild  = (path: number[]) => setNav(addChild(nav, path));
  const onMove      = (path: number[], dir: -1 | 1) => setNav(moveAtPath(nav, path, dir));
  const addTopLevel = () => setNav(addChild(nav, []));

  const resetToFallback = () => {
    if (!confirm("저장된 내용을 모두 버리고 기본 메뉴로 되돌리시겠습니까?")) return;
    setNav(JSON.parse(JSON.stringify(fallback)));
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">네비게이션 관리</h1>
          <p className="text-sm text-gray-500 mt-1">상단 메뉴(헤더)와 모바일 메뉴에 동일하게 적용됩니다. 영문 칸이 비면 한국어로 폴백.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={resetToFallback} className="text-gray-500 text-xs hover:underline">기본값으로 초기화</button>
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {nav.map((item, idx) => (
          <NavRow
            key={idx}
            item={item}
            path={[idx]}
            siblings={nav.length}
            depth={0}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onAddChild={onAddChild}
            onMove={onMove}
          />
        ))}
      </div>

      <button onClick={addTopLevel} className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 text-sm font-medium hover:border-blue-500 hover:bg-blue-50">
        + 최상위 메뉴 추가
      </button>
    </div>
  );
}
