"use client";

import { useSession } from "next-auth/react";
import { FileText, Search, Plus, Filter, Download, Eye, Trash2, ClipboardList, BookOpen, FileSpreadsheet, TrendingUp } from "lucide-react";

export default function DocumentsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Trial Documents
          </h1>
          <p className="page-subtitle">Manage protocols, datasheets, measurement protocols, and trial reports</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <FileSpreadsheet size={16} />
            Create Datasheet
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <FileText size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Documents</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>42</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <ClipboardList size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Protocols</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>15</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <FileSpreadsheet size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Datasheets</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>12</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.08)" }}>
              <TrendingUp size={20} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Trial Reports</p>
              <p className="text-xl font-bold" style={{ color: "#3b82f6" }}>18</p>
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
                placeholder="Search documents..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All Types</option>
            <option value="protocol">Implementation Protocol</option>
            <option value="measurement_protocol">Measurement Protocol</option>
            <option value="datasheet">Datasheet</option>
            <option value="report">Trial Report</option>
            <option value="reference">Reference</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Trials</option>
            <option value="tr-a2025-001">TR-A2025-001</option>
            <option value="tr-a2025-002">TR-A2025-002</option>
            <option value="-">General</option>
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
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Name</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Type</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Version</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Uploaded By</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Date</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { name: "Maize Hybrid Trial Implementation Protocol", type: "Implementation Protocol", trial: "TR-A2025-001", version: "2.0", uploadedBy: "Marie Uwimana", date: "2025-02-01" },
                { name: "Maize Plant Height Measurement Protocol", type: "Measurement Protocol", trial: "TR-A2025-001", version: "1.5", uploadedBy: "Marie Uwimana", date: "2025-02-02" },
                { name: "Maize Datasheet with Plot Randomization", type: "Datasheet", trial: "TR-A2025-001", version: "3.0", uploadedBy: "Marie Uwimana", date: "2025-02-03" },
                { name: "Bean Trial Implementation Protocol", type: "Implementation Protocol", trial: "TR-A2025-002", version: "1.0", uploadedBy: "Marie Uwimana", date: "2025-02-10" },
                { name: "Bean Yield Measurement Protocol", type: "Measurement Protocol", trial: "TR-A2025-002", version: "1.0", uploadedBy: "Marie Uwimana", date: "2025-02-11" },
                { name: "Season A 2025 Progress Report", type: "Trial Report", trial: "TR-A2025-001", version: "1.0", uploadedBy: "Eric Nkurunziza", date: "2025-02-20" },
                { name: "Bean Tricot Methodology Guide", type: "Reference", trial: "General", version: "1.0", uploadedBy: "Eric Nkurunziza", date: "2025-01-15" },
                { name: "Soil Sampling SOP", type: "Reference", trial: "General", version: "3.1", uploadedBy: "Grace Ingabire", date: "2025-01-10" },
              ].map((doc) => (
                <tr key={doc.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{doc.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: doc.type === "Implementation Protocol" ? "rgba(26,60,31,0.08)" : 
                                       doc.type === "Measurement Protocol" ? "rgba(58,125,68,0.08)" :
                                       doc.type === "Datasheet" ? "rgba(245,196,0,0.08)" :
                                       doc.type === "Trial Report" ? "rgba(59,130,246,0.08)" :
                                       "rgba(156,163,175,0.08)",
                        color: doc.type === "Implementation Protocol" ? "#1a3c1f" : 
                               doc.type === "Measurement Protocol" ? "#3a7d44" :
                               doc.type === "Datasheet" ? "#f5c400" :
                               doc.type === "Trial Report" ? "#3b82f6" :
                               "#6b7280",
                      }}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{doc.trial}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{doc.version}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{doc.uploadedBy}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{doc.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <Eye size={12} />
                        View
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <Download size={12} />
                        Download
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
                        <Trash2 size={12} />
                        Delete
                      </button>
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
