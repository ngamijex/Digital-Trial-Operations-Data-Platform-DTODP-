"use client";

import { useSession } from "next-auth/react";
import { Warehouse, Search, Plus, Filter, Package, Truck, AlertTriangle, TrendingUp, Wrench } from "lucide-react";

export default function InventoryPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Inventory Management
          </h1>
          <p className="page-subtitle">Forecast, source, and distribute trial materials and equipment</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Wrench size={16} />
            Calibration
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <Package size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Items</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>156</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <Truck size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Distributed</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>89</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <Warehouse size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>In Stock</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>67</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
              <AlertTriangle size={20} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Low Stock</p>
              <p className="text-xl font-bold text-red-600">8</p>
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
                placeholder="Search items..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <select className="input-field w-[150px]">
            <option value="">All Categories</option>
            <option value="seeds">Seeds</option>
            <option value="fertilizer">Fertilizer</option>
            <option value="chemicals">Chemicals</option>
            <option value="equipment">Equipment</option>
            <option value="consumables">Consumables</option>
            <option value="measurement_tools">Measurement Tools</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="distributed">Distributed</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="calibration-due">Calibration Due</option>
          </select>
          <select className="input-field w-[150px]">
            <option value="">All Trials</option>
            <option value="tr-a2025-001">TR-A2025-001</option>
            <option value="tr-a2025-002">TR-A2025-002</option>
            <option value="-">General Stock</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Item Code</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Name</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Category</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Quantity</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Min Stock</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Unit</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
              {[
                { code: "INV-001", name: "Maize Seeds (Hybrid A)", category: "Seeds", quantity: 50, minStock: 30, unit: "kg", trial: "TR-A2025-001", status: "Distributed" },
                { code: "INV-002", name: "Bean Seeds (Variety C)", category: "Seeds", quantity: 30, minStock: 20, unit: "kg", trial: "TR-A2025-002", status: "In Stock" },
                { code: "INV-003", name: "NPK Fertilizer", category: "Fertilizer", quantity: 200, minStock: 100, unit: "kg", trial: "TR-A2025-001", status: "In Stock" },
                { code: "INV-004", name: "Soil Moisture Meters", category: "Measurement Tools", quantity: 8, minStock: 10, unit: "units", trial: "TR-A2025-002", status: "Low Stock" },
                { code: "INV-005", name: "Sample Bags (Plastic)", category: "Consumables", quantity: 500, minStock: 100, unit: "pcs", trial: "-", status: "In Stock" },
                { code: "INV-006", name: "pH Test Kits", category: "Measurement Tools", quantity: 15, minStock: 20, unit: "kits", trial: "TR-A2025-001", status: "Low Stock" },
                { code: "INV-007", name: "Calipers (Plant Measurement)", category: "Measurement Tools", quantity: 12, minStock: 15, unit: "units", trial: "TR-A2025-001", status: "Calibration Due" },
              ].map((item) => (
                <tr key={item.code} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{item.code}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.name}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.category}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.quantity}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{item.minStock}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.unit}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-body)" }}>{item.trial}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: item.status === "In Stock" ? "rgba(58,125,68,0.08)" : 
                                       item.status === "Distributed" ? "rgba(59,130,246,0.08)" :
                                       item.status === "Low Stock" ? "rgba(245,196,0,0.08)" :
                                       item.status === "Calibration Due" ? "rgba(220,38,38,0.08)" :
                                       "rgba(156,163,175,0.08)",
                        color: item.status === "In Stock" ? "#3a7d44" : 
                               item.status === "Distributed" ? "#3b82f6" :
                               item.status === "Low Stock" ? "#f5c400" :
                               item.status === "Calibration Due" ? "#dc2626" :
                               "#6b7280",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs" style={{ color: "var(--color-secondary)" }}>View</button>
                      <button className="text-xs" style={{ color: "var(--color-text-muted)" }}>Edit</button>
                      <button className="text-xs" style={{ color: "var(--color-secondary)" }}>Distribute</button>
                      {item.category === "Measurement Tools" && (
                        <button className="text-xs" style={{ color: "var(--color-accent-dark)" }}>Calibrate</button>
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
