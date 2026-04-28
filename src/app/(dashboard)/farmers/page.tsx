"use client";

import { useSession } from "next-auth/react";
import { Users, Search, Plus, MapPin, Phone, Mail, Filter, GraduationCap, AlertCircle, UserCheck } from "lucide-react";

export default function FarmersPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Farmers Management
          </h1>
          <p className="page-subtitle">Recruit participants, conduct training, and provide technical support</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <GraduationCap size={16} />
            Training Session
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Recruit Farmer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <Users size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Farmers</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>120</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <GraduationCap size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Trained</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>108</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <MapPin size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>ME/AEZs</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>8</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
              <AlertCircle size={20} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Support Requests</p>
              <p className="text-xl font-bold text-red-600">5</p>
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
                placeholder="Search farmers..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All ME/AEZs</option>
            <option value="me-1">ME-1 (Northern)</option>
            <option value="me-2">ME-2 (Eastern)</option>
            <option value="aez-1">AEZ-1 (Highland)</option>
            <option value="aez-2">AEZ-2 (Lowland)</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Trials</option>
            <option value="tr-a2025-001">TR-A2025-001</option>
            <option value="tr-a2025-002">TR-A2025-002</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="training-pending">Training Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Farmers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Farmer ID</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Name</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>ME/AEZ</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Training Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Contact</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { id: "FRM-001", name: "Jean Claude Niyonzima", meaez: "ME-1 (Northern)", trial: "TR-A2025-001", training: "Completed", contact: "+250788123456", status: "Active" },
                { id: "FRM-002", name: "Marie Claire Uwimana", meaez: "AEZ-1 (Highland)", trial: "TR-A2025-001", training: "Completed", contact: "+250788234567", status: "Active" },
                { id: "FRM-003", name: "Pierre Ndayisaba", meaez: "ME-2 (Eastern)", trial: "TR-A2025-002", training: "Pending", contact: "+250788345678", status: "Training Pending" },
                { id: "FRM-004", name: "Anastase Bizimungu", meaez: "AEZ-2 (Lowland)", trial: "TR-A2025-001", training: "Completed", contact: "+250788456789", status: "Active" },
                { id: "FRM-005", name: "Claudine Mukandanga", meaez: "ME-1 (Northern)", trial: "TR-A2025-002", training: "Completed", contact: "+250788567890", status: "Active" },
                { id: "FRM-006", name: "Emmanuel Nsengiyumva", meaez: "AEZ-1 (Highland)", trial: "TR-A2025-001", training: "In Progress", contact: "+250788678901", status: "Training Pending" },
              ].map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{farmer.id}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{farmer.name}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{farmer.meaez}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{farmer.trial}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: farmer.training === "Completed" ? "rgba(58,125,68,0.08)" : 
                                       farmer.training === "In Progress" ? "rgba(245,196,0,0.08)" :
                                       "rgba(156,163,175,0.08)",
                        color: farmer.training === "Completed" ? "#3a7d44" : 
                               farmer.training === "In Progress" ? "#f5c400" :
                               "#6b7280",
                      }}
                    >
                      {farmer.training}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{farmer.contact}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: farmer.status === "Active" ? "rgba(58,125,68,0.08)" : 
                                       farmer.status === "Training Pending" ? "rgba(245,196,0,0.08)" :
                                       "rgba(156,163,175,0.08)",
                        color: farmer.status === "Active" ? "#3a7d44" : 
                               farmer.status === "Training Pending" ? "#f5c400" :
                               "#6b7280",
                      }}
                    >
                      {farmer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <MapPin size={12} />
                        Location
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <Phone size={12} />
                        Call
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <GraduationCap size={12} />
                        Train
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
