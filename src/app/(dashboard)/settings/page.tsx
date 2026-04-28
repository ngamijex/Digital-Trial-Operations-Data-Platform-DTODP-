"use client";

import { useSession } from "next-auth/react";
import { Settings, Users, Database, Bell, Shield, Palette, Save } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Settings
        </h1>
        <p className="page-subtitle">System configuration and administration</p>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card p-4">
          <nav className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors" style={{ backgroundColor: "rgba(26,60,31,0.08)", color: "var(--color-primary)" }}>
              <Users size={16} />
              User Management
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ color: "var(--color-text-body)" }}>
              <Database size={16} />
              SLA Templates
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ color: "var(--color-text-body)" }}>
              <Bell size={16} />
              Notifications
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ color: "var(--color-text-body)" }}>
              <Shield size={16} />
              Permissions
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ color: "var(--color-text-body)" }}>
              <Palette size={16} />
              Appearance
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Management Section */}
          <div className="card">
            <div className="border-b p-4" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
              <h2 className="font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>
                User Management
              </h2>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Manage system users and their roles
              </p>
            </div>
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input-field"
                  />
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Users size={16} />
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Name</th>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Email</th>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Role</th>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Department</th>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                      <th className="px-4 py-2 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
                    {[
                      { name: "Dr. Jean-Claude Habimana", email: "admin@oneacrefund.org", role: "ADMIN", department: "Agricultural Innovations", status: "Active" },
                      { name: "Marie Uwimana", email: "marie@oneacrefund.org", role: "TRIAL_OWNER", department: "Agricultural Innovations", status: "Active" },
                      { name: "Eric Nkurunziza", email: "eric@oneacrefund.org", role: "DATA_TEAM", department: "Data Operations", status: "Active" },
                      { name: "Alice Mukamana", email: "alice@oneacrefund.org", role: "STATION_TEAM", department: "Station Trials", status: "Active" },
                      { name: "Jean-Pierre Mugabo", email: "jean@oneacrefund.org", role: "FIELD_TRIALS_TEAM", department: "On-Farm Trials", status: "Active" },
                      { name: "Grace Ingabire", email: "grace@oneacrefund.org", role: "LAB_TEAM", department: "Laboratory", status: "Active" },
                      { name: "Patrick Nshimiyimana", email: "patrick@oneacrefund.org", role: "INVENTORY_TEAM", department: "Inventory", status: "Active" },
                    ].map((user) => (
                      <tr key={user.email} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium" style={{ color: "var(--color-text-dark)" }}>{user.name}</td>
                        <td className="px-4 py-2" style={{ color: "var(--color-text-body)" }}>{user.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                            style={{
                              backgroundColor: user.role === "ADMIN" ? "rgba(26,60,31,0.08)" : "rgba(58,125,68,0.08)",
                              color: user.role === "ADMIN" ? "#1a3c1f" : "#3a7d44",
                            }}
                          >
                            {user.role.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-4 py-2" style={{ color: "var(--color-text-body)" }}>{user.department}</td>
                        <td className="px-4 py-2">
                          <span className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold" style={{ backgroundColor: "rgba(58,125,68,0.08)", color: "#3a7d44" }}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button className="text-xs" style={{ color: "var(--color-secondary)" }}>Edit</button>
                            <button className="text-xs" style={{ color: "#dc2626" }}>Deactivate</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Settings Section */}
          <div className="card">
            <div className="border-b p-4" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
              <h2 className="font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>
                System Configuration
              </h2>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Configure system-wide settings
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}>Auto-escalation enabled</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Automatically escalate overdue SLAs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}">Email notifications</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}">Send email alerts for critical events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text-dark)" }}">Maintenance mode</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Disable system for maintenance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
                <button className="btn-primary flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
