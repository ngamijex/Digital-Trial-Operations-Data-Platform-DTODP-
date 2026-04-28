"use client";

import { useSession } from "next-auth/react";
import { AlertTriangle, Search, Plus, Filter, CheckCircle, Clock, AlertOctagon, Timer, User, FileText } from "lucide-react";

export default function EscalationsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            SLA Escalations & Accountability
          </h1>
          <p className="page-subtitle">Track SLA breaches, service delays, and team accountability</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Raise Escalation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <AlertTriangle size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Escalations</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>15</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
              <Timer size={20} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>SLA Breaches</p>
              <p className="text-xl font-bold text-red-600">7</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <Clock size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pending Resolution</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>7</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <CheckCircle size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Resolved (Avg 48h)</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--color-text-muted)" }} />
              <input
                type="text"
                placeholder="Search escalations..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Service Types</option>
            <option value="data_validation">Data Validation</option>
            <option value="material_distribution">Material Distribution</option>
            <option value="lab_analysis">Lab Analysis</option>
            <option value="farmer_training">Farmer Training</option>
            <option value="weather_sensors">Weather Sensors</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Teams</option>
            <option value="data_team">Data Team</option>
            <option value="inventory_team">Inventory Team</option>
            <option value="lab_team">Lab Team</option>
            <option value="field_team">Field Team</option>
            <option value="station_team">Station Team</option>
            <option value="hte_team">HTE Team</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Escalations Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>ID</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Subject</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Service Type</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Serving Team</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Responsible</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>SLA Deadline</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { id: "ESC-001", subject: "Data submission delay - maize trial", service: "Data Validation", team: "Data Team", responsible: "Eric Nkurunziza", slaDeadline: "2025-02-22", status: "Pending" },
                { id: "ESC-002", subject: "Seed distribution incomplete", service: "Material Distribution", team: "Inventory Team", responsible: "Claude Bizimungu", slaDeadline: "2025-02-21", status: "Overdue" },
                { id: "ESC-003", subject: "Lab sample analysis overdue", service: "Lab Analysis", team: "Lab Team", responsible: "Marie Uwimana", slaDeadline: "2025-02-20", status: "Critical" },
                { id: "ESC-004", subject: "Farmer recruitment shortfall", service: "Farmer Training", team: "Field Team", responsible: "Jean-Pierre Mugabo", slaDeadline: "2025-02-18", status: "Resolved" },
                { id: "ESC-005", subject: "Weather sensor malfunction", service: "Weather Sensors", team: "Data Team", responsible: "Eric Nkurunziza", slaDeadline: "2025-02-23", status: "In Progress" },
                { id: "ESC-006", subject: "Station trial setup delay", service: "Material Distribution", team: "Inventory Team", responsible: "Claude Bizimungu", slaDeadline: "2025-02-19", status: "Resolved" },
              ].map((esc) => (
                <tr key={esc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{esc.id}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{esc.subject}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{esc.service}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{esc.team}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{esc.responsible}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{esc.slaDeadline}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: esc.status === "Resolved" ? "rgba(58,125,68,0.08)" : 
                                       esc.status === "In Progress" ? "rgba(59,130,246,0.08)" :
                                       esc.status === "Critical" || esc.status === "Overdue" ? "rgba(220,38,38,0.08)" :
                                       "rgba(245,196,0,0.08)",
                        color: esc.status === "Resolved" ? "#3a7d44" : 
                               esc.status === "In Progress" ? "#3b82f6" :
                               esc.status === "Critical" || esc.status === "Overdue" ? "#dc2626" :
                               "#f5c400",
                      }}
                    >
                      {esc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <FileText size={12} />
                        Details
                      </button>
                      {esc.status !== "Resolved" && (
                        <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <User size={12} />
                          Assign
                        </button>
                      )}
                      {esc.status === "In Progress" && (
                        <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                          <CheckCircle size={12} />
                          Resolve
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
