"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart3, Download, FileText, TrendingUp, Database, Plus, CheckCircle, CloudSun, Brain, Search, Filter } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#1a3c1f", "#3a7d44", "#f5c400", "#d4a900", "#4e9e5a", "#2e6634"];

export default function ReportsPage() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const trialsByPhase = stats?.trialsByPhase ?? [];
  const tasksByStatus = stats?.tasksByStatus ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Data Analytics & Reports
          </h1>
          <p className="page-subtitle">Design data tools, validate data, and generate trial analytics</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Database size={16} />
            Data Tools
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <Database size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Data Tools</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>{stats?.dataTools ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <CheckCircle size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Validated Records</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>{stats?.validatedRecords ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <CloudSun size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Weather Sensors</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>{stats?.weatherSensors ?? 0} Active</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.08)" }}>
              <Brain size={20} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>ML Analyses</p>
              <p className="text-xl font-bold" style={{ color: "#3b82f6" }}>{stats?.mlAnalyses ?? 0}</p>
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
                placeholder="Search..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All Types</option>
            <option value="tool">Data Tool</option>
            <option value="validation">Data Validation</option>
            <option value="dashboard">Dashboard</option>
            <option value="analysis">Analysis</option>
            <option value="ml">ML Analysis</option>
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
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Name</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Type</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Date</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { name: "Data Collection Form - Maize", type: "Data Tool", trial: "TR-A2025-001", status: "Published", date: "2025-02-15" },
                { name: "Data Validation - Phase 2", type: "Data Validation", trial: "TR-A2025-001", status: "In Progress", date: "2025-02-20" },
                { name: "Trial Dashboard V2", type: "Dashboard", trial: "All Trials", status: "Active", date: "2025-02-18" },
                { name: "Yield Analysis ML Model", type: "ML Analysis", trial: "TR-A2025-001", status: "Training", date: "2025-02-22" },
                { name: "Weather Data Integration", type: "Analysis", trial: "TR-A2025-001", status: "Completed", date: "2025-02-10" },
                { name: "Bean Data Collection Form", type: "Data Tool", trial: "TR-A2025-002", status: "Published", date: "2025-02-12" },
              ].map((item) => (
                <tr key={item.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{item.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: item.type === "Data Tool" ? "rgba(26,60,31,0.08)" : 
                                       item.type === "Data Validation" ? "rgba(58,125,68,0.08)" :
                                       item.type === "Dashboard" ? "rgba(245,196,0,0.08)" :
                                       item.type === "ML Analysis" ? "rgba(59,130,246,0.08)" :
                                       "rgba(220,38,38,0.08)",
                        color: item.type === "Data Tool" ? "#1a3c1f" : 
                               item.type === "Data Validation" ? "#3a7d44" :
                               item.type === "Dashboard" ? "#f5c400" :
                               item.type === "ML Analysis" ? "#3b82f6" :
                               "#dc2626",
                      }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.trial}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: item.status === "Published" || item.status === "Active" || item.status === "Completed" ? "rgba(58,125,68,0.08)" : 
                                       item.status === "In Progress" || item.status === "Training" ? "rgba(245,196,0,0.08)" :
                                       "rgba(220,38,38,0.08)",
                        color: item.status === "Published" || item.status === "Active" || item.status === "Completed" ? "#3a7d44" : 
                               item.status === "In Progress" || item.status === "Training" ? "#f5c400" :
                               "#dc2626",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <FileText size={12} />
                        View
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-secondary)" }}>
                        <Download size={12} />
                        Export
                      </button>
                      <button className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
                        <TrendingUp size={12} />
                        Analyze
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
