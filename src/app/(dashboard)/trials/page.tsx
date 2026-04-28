"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Filter, FlaskConical, FileText, Users, Calendar, MapPin, Package } from "lucide-react";
import { PHASE_LABELS, STATUS_COLORS, formatDate } from "@/lib/utils";

export default function TrialsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["trials", statusFilter, phaseFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (phaseFilter) params.set("phase", phaseFilter);
      const res = await fetch(`/api/trials?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const trials = (data?.trials ?? []).filter(
    (t: { name: string; code: string; cropType: string | null }) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      (t.cropType ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Trials</h1>
          <p className="page-subtitle">Develop, manage, and monitor agricultural research trials</p>
        </div>
        <Link href="/trials/new" className="btn-accent">
          <Plus size={16} />
          New Trial
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <FlaskConical size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Trials</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>{data?.trials?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <Calendar size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Active Phase</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>{data?.trials?.filter((t: { status: string }) => t.status === "ACTIVE").length || 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <FileText size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pending Reports</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>{data?.trials?.filter((t: { phase: string }) => t.phase === "REPORTING").length || 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.08)" }}>
              <Users size={20} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Farmers Enrolled</p>
              <p className="text-xl font-bold" style={{ color: "#3b82f6" }}>120</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search trials..."
              className="input-field pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "var(--color-text-muted)" }} />
            <select
              className="input-field w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PLANNING">Planning</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
            <select
              className="input-field w-auto"
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
            >
              <option value="">All Phases</option>
              <option value="PHASE_0">Phase 0 (Research)</option>
              <option value="PHASE_1">Phase 1 (Station)</option>
              <option value="PHASE_2">Phase 2 (On-Farm)</option>
              <option value="ANALYSIS">Analysis</option>
              <option value="REPORTING">Reporting</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200" style={{ borderTopColor: "var(--color-primary)" }} />
              <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>Loading trials...</p>
            </div>
          </div>
        ) : trials.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12">
            <FlaskConical size={40} style={{ color: "var(--color-mid-gray)" }} />
            <p className="mt-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              No trials found
            </p>
            <Link href="/trials/new" className="btn-primary mt-4 text-sm">
              <Plus size={14} />
              Create your first trial
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Code</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial Name</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Crop</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Season</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Phase</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Owner</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Tasks</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
                {trials.map((trial: {
                  id: string; code: string; name: string; cropType: string | null;
                  season: string; year: number; phase: string; status: string;
                  owner: { name: string }; _count: { tasks: number; submissions: number };
                }) => (
                  <tr key={trial.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/trials/${trial.id}`}
                        className="font-mono text-xs font-semibold"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        {trial.code}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/trials/${trial.id}`} className="font-medium hover:underline" style={{ color: "var(--color-text-dark)" }}>
                        {trial.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{trial.cropType ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="badge" style={{ backgroundColor: "var(--color-accent-pale)", color: "var(--color-accent-dark)" }}>
                        {trial.season} {trial.year}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge" style={{ backgroundColor: "rgba(58,125,68,0.08)", color: "var(--color-secondary-dark)" }}>
                        {PHASE_LABELS[trial.phase] ?? trial.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${STATUS_COLORS[trial.status] ?? ""}`}>
                        {trial.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--color-text-body)" }}>
                      {trial.owner.name}
                    </td>
                    <td className="px-4 py-3 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {trial._count.tasks}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/trials/${trial.id}/protocol`} className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <FileText size={12} />
                          Protocol
                        </Link>
                        <Link href={`/trials/${trial.id}/materials`} className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <Package size={12} />
                          Materials
                        </Link>
                        <Link href={`/trials/${trial.id}/training`} className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <Users size={12} />
                          Training
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
