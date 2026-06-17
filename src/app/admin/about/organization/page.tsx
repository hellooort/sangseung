"use client";

import { useState } from "react";
import { useSiteSetting } from "@/lib/supabase/hooks";

interface OrgTeam {
  id: string;
  ko: string;
  en: string;
}

interface OrgDepartment {
  id: string;
  name_ko: string;
  name_en: string;
  teams: OrgTeam[];
}

interface OrgDivision {
  id: string;
  name_ko: string;
  name_en: string;
  teams: OrgTeam[];
  departments: OrgDepartment[];
}

interface OrganizationData {
  ceo_ko: string;
  ceo_en: string;
  divisions: OrgDivision[];
}

const fallback: OrganizationData = {
  ceo_ko: "대표이사",
  ceo_en: "CEO",
  divisions: [
    {
      id: "div-1",
      name_ko: "관리본부",
      name_en: "Management HQ",
      teams: [
        { id: "t-1", ko: "경영지원팀", en: "General Affairs" },
        { id: "t-2", ko: "회계관리팀", en: "Accounting" },
      ],
      departments: [],
    },
    {
      id: "div-2",
      name_ko: "통신사업본부",
      name_en: "Network Business HQ",
      teams: [],
      departments: [
        {
          id: "dept-1",
          name_ko: "영업부",
          name_en: "Sales",
          teams: [
            { id: "t-3", ko: "NI 사업팀", en: "NI Team" },
            { id: "t-4", ko: "SI 사업팀", en: "SI Team" },
          ],
        },
        {
          id: "dept-2",
          name_ko: "네트워크사업부",
          name_en: "Network Division",
          teams: [
            { id: "t-5", ko: "네트워크 1팀", en: "Network Team 1" },
            { id: "t-6", ko: "네트워크 2팀", en: "Network Team 2" },
            { id: "t-7", ko: "기술지원팀",   en: "Technical Support" },
          ],
        },
      ],
    },
    {
      id: "div-3",
      name_ko: "미디어사업본부",
      name_en: "Media Business HQ",
      teams: [],
      departments: [
        {
          id: "dept-3", name_ko: "영업부", name_en: "Sales",
          teams: [
            { id: "t-8", ko: "국내 영업팀", en: "Domestic Sales" },
            { id: "t-9", ko: "해외 영업팀", en: "Overseas Sales" },
          ],
        },
        { id: "dept-4", name_ko: "디자인팀", name_en: "Design",      teams: [] },
        { id: "dept-5", name_ko: "설계팀",   name_en: "Engineering", teams: [] },
        {
          id: "dept-6", name_ko: "생산공장", name_en: "Manufacturing",
          teams: [
            { id: "t-10", ko: "생산제작팀", en: "Production" },
            { id: "t-11", ko: "설치시공팀", en: "Installation" },
            { id: "t-12", ko: "QC팀",       en: "QC" },
            { id: "t-13", ko: "유지보수팀", en: "Maintenance" },
            { id: "t-14", ko: "자재관리팀", en: "Materials" },
          ],
        },
      ],
    },
    {
      id: "div-4", name_ko: "기업부설연구소", name_en: "R&D Center",
      teams: [
        { id: "t-15", ko: "하드웨어팀", en: "Hardware" },
        { id: "t-16", ko: "소프트웨어팀", en: "Software" },
      ],
      departments: [],
    },
  ],
};

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export default function AdminOrganizationPage() {
  const { value, setValue, loading, saving, save, error } = useSiteSetting<OrganizationData>("organization", fallback);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = async () => { const ok = await save(); if (ok) { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); } };

  // ----- division CRUD -----
  const addDivision = () => setValue({ ...value, divisions: [...value.divisions, { id: newId(), name_ko: "새 본부", name_en: "New Division", teams: [], departments: [] }] });
  const removeDivision = (id: string) => { if (!confirm("이 본부를 삭제하시겠습니까?")) return; setValue({ ...value, divisions: value.divisions.filter((d) => d.id !== id) }); };
  const updateDivision = (id: string, patch: Partial<OrgDivision>) => setValue({ ...value, divisions: value.divisions.map((d) => (d.id === id ? { ...d, ...patch } : d)) });

  // ----- team helpers -----
  const addDivTeam = (divId: string) => updateDivision(divId, { teams: [...(value.divisions.find((d) => d.id === divId)?.teams ?? []), { id: newId(), ko: "", en: "" }] });
  const updateDivTeam = (divId: string, teamId: string, patch: Partial<OrgTeam>) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    updateDivision(divId, { teams: div.teams.map((t) => (t.id === teamId ? { ...t, ...patch } : t)) });
  };
  const removeDivTeam = (divId: string, teamId: string) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    updateDivision(divId, { teams: div.teams.filter((t) => t.id !== teamId) });
  };

  // ----- department helpers -----
  const addDept = (divId: string) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    updateDivision(divId, { departments: [...div.departments, { id: newId(), name_ko: "새 부서", name_en: "New Dept", teams: [] }] });
  };
  const updateDept = (divId: string, deptId: string, patch: Partial<OrgDepartment>) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    updateDivision(divId, { departments: div.departments.map((dp) => (dp.id === deptId ? { ...dp, ...patch } : dp)) });
  };
  const removeDept = (divId: string, deptId: string) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    if (!confirm("이 부서를 삭제하시겠습니까?")) return;
    updateDivision(divId, { departments: div.departments.filter((dp) => dp.id !== deptId) });
  };
  const addDeptTeam = (divId: string, deptId: string) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    const dept = div.departments.find((dp) => dp.id === deptId); if (!dept) return;
    updateDept(divId, deptId, { teams: [...dept.teams, { id: newId(), ko: "", en: "" }] });
  };
  const updateDeptTeam = (divId: string, deptId: string, teamId: string, patch: Partial<OrgTeam>) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    const dept = div.departments.find((dp) => dp.id === deptId); if (!dept) return;
    updateDept(divId, deptId, { teams: dept.teams.map((t) => (t.id === teamId ? { ...t, ...patch } : t)) });
  };
  const removeDeptTeam = (divId: string, deptId: string, teamId: string) => {
    const div = value.divisions.find((d) => d.id === divId); if (!div) return;
    const dept = div.departments.find((dp) => dp.id === deptId); if (!dept) return;
    updateDept(divId, deptId, { teams: dept.teams.filter((t) => t.id !== teamId) });
  };

  if (loading) return <div className="text-gray-400 text-sm">로딩 중...</div>;

  return (
    <div>
      <div className="sticky top-16 z-20 py-4 mb-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">조직도 관리</h1>
          <p className="text-sm text-gray-500 mt-1">대표이사 → 본부(또는 연구소) → 부서(선택) → 팀 구조로 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "저장 중..." : savedMsg ? "저장 완료!" : "저장"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">최상단 (대표이사)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" value={value.ceo_ko} onChange={(e) => setValue({ ...value, ceo_ko: e.target.value })} placeholder="대표이사 (KO)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={value.ceo_en} onChange={(e) => setValue({ ...value, ceo_en: e.target.value })} placeholder="CEO (EN)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {value.divisions.map((div) => (
          <div key={div.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-center mb-4 pb-4 border-b">
              <input type="text" value={div.name_ko} onChange={(e) => updateDivision(div.id, { name_ko: e.target.value })} placeholder="본부 이름 (KO)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" value={div.name_en} onChange={(e) => updateDivision(div.id, { name_en: e.target.value })} placeholder="Division (EN)" className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => removeDivision(div.id)} className="text-red-500 text-xs hover:underline">본부 삭제</button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">직속 팀 (부서 없이 바로 표시)</h3>
                <button onClick={() => addDivTeam(div.id)} className="text-blue-600 text-xs hover:underline">+ 팀 추가</button>
              </div>
              <div className="space-y-2">
                {div.teams.map((t) => (
                  <div key={t.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
                    <input type="text" value={t.ko} onChange={(e) => updateDivTeam(div.id, t.id, { ko: e.target.value })} placeholder="팀 (KO)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={t.en} onChange={(e) => updateDivTeam(div.id, t.id, { en: e.target.value })} placeholder="Team (EN)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={() => removeDivTeam(div.id, t.id)} className="text-red-400 text-xs px-2">삭제</button>
                  </div>
                ))}
                {div.teams.length === 0 && <p className="text-gray-400 text-xs">직속 팀이 없습니다.</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">부서 (부서마다 팀 가능)</h3>
                <button onClick={() => addDept(div.id)} className="text-blue-600 text-xs hover:underline">+ 부서 추가</button>
              </div>
              <div className="space-y-3">
                {div.departments.map((dept) => (
                  <div key={dept.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                      <input type="text" value={dept.name_ko} onChange={(e) => updateDept(div.id, dept.id, { name_ko: e.target.value })} placeholder="부서 (KO)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 font-medium outline-none focus:ring-2 focus:ring-blue-500" />
                      <input type="text" value={dept.name_en} onChange={(e) => updateDept(div.id, dept.id, { name_en: e.target.value })} placeholder="Dept (EN)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => removeDept(div.id, dept.id)} className="text-red-500 text-xs px-2">부서 삭제</button>
                    </div>
                    <div className="pl-3 border-l-2 border-blue-200 space-y-2">
                      {dept.teams.map((t) => (
                        <div key={t.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
                          <input type="text" value={t.ko} onChange={(e) => updateDeptTeam(div.id, dept.id, t.id, { ko: e.target.value })} placeholder="팀 (KO)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                          <input type="text" value={t.en} onChange={(e) => updateDeptTeam(div.id, dept.id, t.id, { en: e.target.value })} placeholder="Team (EN)" className="px-3 py-1.5 rounded border border-gray-200 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
                          <button onClick={() => removeDeptTeam(div.id, dept.id, t.id)} className="text-red-400 text-xs px-2">삭제</button>
                        </div>
                      ))}
                      <button onClick={() => addDeptTeam(div.id, dept.id)} className="text-blue-600 text-xs hover:underline">+ 팀 추가</button>
                    </div>
                  </div>
                ))}
                {div.departments.length === 0 && <p className="text-gray-400 text-xs">부서가 없습니다.</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addDivision} className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 text-sm font-medium hover:border-blue-500 hover:bg-blue-50">
        + 본부 / 연구소 추가
      </button>
    </div>
  );
}
