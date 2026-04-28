"use client";

import { useSession } from "next-auth/react";
import { FlaskConical, Search, Plus, Filter, Download, Eye, CheckCircle2, Clock, FileText, AlertCircle } from "lucide-react";

export default function LabSamplesPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Laboratory Sample Processing
          </h1>
          <p className="page-subtitle">Receive, process, and analyze soil, plant, and compost samples</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <FileText size={16} />
            Results Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Receive Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <FlaskConical size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Samples</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>85</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <Clock size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>In Processing</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>13</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <CheckCircle2 size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Results Issued</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>68</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
              <AlertCircle size={20} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Overdue</p>
              <p className="text-xl font-bold text-red-600">4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--color-text-muted)" }} />
              <input
                type="text"
                placeholder="Search samples..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All Types</option>
            <option value="soil">Soil</option>
            <option value="plant">Plant</option>
            <option value="compost">Compost</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Status</option>
            <option value="received">Received</option>
            <option value="processing">Processing</option>
            <option value="analyzed">Analyzed</option>
            <option value="completed">Completed</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Trials</option>
            <option value="tr-a2025-001">TR-A2025-001</option>
            <option value="tr-a2025-002">TR-A2025-002</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Sample ID</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Type</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Source</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Received</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Analysis Type</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { id: "SMP-001", type: "Soil", trial: "TR-A2025-001", source: "Station A", received: "2025-02-20", analysis: "NPK + pH", status: "Completed" },
                { id: "SMP-002", type: "Plant", trial: "TR-A2025-001", source: "Farm B", received: "2025-02-19", analysis: "Nutrient Analysis", status: "Processing" },
                { id: "SMP-003", type: "Compost", trial: "TR-A2025-002", source: "Station C", received: "2025-02-18", analysis: "Organic Matter", status: "Analyzed" },
                { id: "SMP-004", type: "Soil", trial: "TR-A2025-002", source: "Farm D", received: "2025-02-17", analysis: "NPK + pH", status: "Completed" },
                { id: "SMP-005", type: "Plant", trial: "TR-A2025-001", source: "Station A", received: "2025-02-16", analysis: "Biomass", status: "Received" },
                { id: "SMP-006", type: "Soil", trial: "TR-A2025-001", source: "Farm E", received: "2025-02-15", analysis: "NPK + pH", status: "Overdue" },
              ].map((sample) => (
                <tr key={sample.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{sample.id}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{sample.type}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{sample.trial}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{sample.source}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{sample.received}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{sample.analysis}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: sample.status === "Completed" ? "rgba(58,125,68,0.08)" : 
                                       sample.status === "Analyzed" ? "rgba(59,130,246,0.08)" :
                                       sample.status === "Processing" ? "rgba(245,196,0,0.08)" :
                                       sample.status === "Overdue" ? "rgba(220,38,38,0.08)" :
                                       "rgba(156,163,175,0.08)",
                        color: sample.status === "Completed" ? "#3a7d44" : 
                               sample.status === "Analyzed" ? "#3b82f6" :
                               sample.status === "Processing" ? "#f5c400" :
                               sample.status === "Overdue" ? "#dc2626" :
                               "#6b7280",
                      }}
                    >
                      {sample.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <Eye size={12} />
                        View
                      </button>
                      {sample.status === "Analyzed" && (
                        <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <FileText size={12} />
                          Issue Results
                        </button>
                      )}
                      {sample.status === "Completed" && (
                        <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <Download size={12} />
                          Download
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
