"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Search, Clock, CheckCircle2, AlertTriangle, Loader2, Users, FileText, Package, TrendingUp } from "lucide-react";
import { TASK_STATUS_COLORS, formatDate, getDaysUntilDue } from "@/lib/utils";
import toast from "react-hot-toast";

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "", serviceType: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      params.set("limit", "100");
      const res = await fetch(`/api/tasks?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (taskData: typeof newTask) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error("Failed to create task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created");
      setShowNewTask(false);
      setNewTask({ title: "", description: "", priority: "MEDIUM", dueDate: "", serviceType: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
    },
  });

  const tasks = data?.tasks ?? [];
  const overdue = tasks.filter((t: { status: string }) => t.status === "OVERDUE").length;
  const completed = tasks.filter((t: { status: string }) => t.status === "COMPLETED").length;
  const inProgress = tasks.filter((t: { status: string }) => t.status === "IN_PROGRESS").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Tasks & SLA Tracker</h1>
          <p className="page-subtitle">Monitor service level agreements and team deliverables across trial lifecycle</p>
        </div>
        <button onClick={() => setShowNewTask(true)} className="btn-accent">
          <Plus size={16} />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <FileText size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Tasks</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>{data?.total ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <Clock size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>In Progress</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>{inProgress}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <CheckCircle2 size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Completed</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>{completed}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(220,38,38,0.08)" }}>
              <AlertTriangle size={20} style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>SLA Breaches</p>
              <p className="text-xl font-bold text-red-600">{overdue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {["", "NOT_STARTED", "IN_PROGRESS", "COMPLETED", "OVERDUE", "BLOCKED"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`badge cursor-pointer px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === s ? "ring-2 ring-offset-1" : ""
            }`}
            style={{
              backgroundColor: s === "" ? (statusFilter === "" ? "var(--color-primary)" : "var(--color-light-gray)") : undefined,
              color: s === "" ? (statusFilter === "" ? "white" : "var(--color-text-body)") : undefined,
              ringColor: "var(--color-secondary)",
            }}
          >
            <span className={s ? TASK_STATUS_COLORS[s] : ""}>{s ? s.replace("_", " ") : "All"}</span>
          </button>
        ))}
      </div>

      {showNewTask && (
        <div className="card p-5">
          <h3 className="mb-4 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>Create New SLA Task</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <input className="input-field" placeholder="Task title..." value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <textarea className="input-field" rows={2} placeholder="Description..." value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            </div>
            <select className="input-field" value={newTask.serviceType} onChange={(e) => setNewTask({ ...newTask, serviceType: e.target.value })}>
              <option value="">Service Type...</option>
              <option value="data_collection">Data Collection Tools</option>
              <option value="translation">Translation Services</option>
              <option value="dashboard">Dashboard Development</option>
              <option value="validation">Data Validation</option>
              <option value="analysis">Data Analysis</option>
              <option value="materials">Materials Sourcing</option>
              <option value="distribution">Materials Distribution</option>
              <option value="calibration">Equipment Calibration</option>
              <option value="sample_analysis">Sample Analysis</option>
              <option value="training">Training Delivery</option>
            </select>
            <select className="input-field" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <input type="date" className="input-field" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => createMutation.mutate(newTask)} disabled={!newTask.title || createMutation.isPending} className="btn-primary text-sm">
              {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : "Create Task"}
            </button>
            <button onClick={() => setShowNewTask(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-primary)" }} />
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No tasks found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--color-light-gray)" }}>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Task</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Trial</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Service Type</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Assignee</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Priority</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Due Date</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Status</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--color-text-dark)" }}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
                {tasks.map((task: {
                  id: string; title: string; description: string | null; status: string;
                  priority: string; dueDate: string | null;
                  trial: { code: string; name: string } | null;
                  assignee: { name: string } | null;
                }) => {
                  const days = getDaysUntilDue(task.dueDate);
                  return (
                    <tr key={task.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium" style={{ color: "var(--color-text-dark)" }}>{task.title}</p>
                          {task.description && <p className="mt-0.5 text-xs truncate max-w-[300px]" style={{ color: "var(--color-text-muted)" }}>{task.description}</p>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-text-body)" }}>{task.trial?.code ?? "—"}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--color-text-body)" }}>General Service</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--color-text-body)" }}>{task.assignee?.name ?? "Unassigned"}</td>
                      <td className="px-4 py-3">
                        <span className="badge" style={{
                          backgroundColor: task.priority === "CRITICAL" ? "rgba(220,38,38,0.1)" : task.priority === "HIGH" ? "rgba(245,196,0,0.15)" : "rgba(58,125,68,0.08)",
                          color: task.priority === "CRITICAL" ? "#dc2626" : task.priority === "HIGH" ? "#7a5900" : "var(--color-text-body)",
                        }}>{task.priority}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {days !== null && days < 0 ? <AlertTriangle size={12} className="text-red-500" /> : days !== null && days <= 3 ? <Clock size={12} className="text-amber-500" /> : null}
                          <span className="text-xs" style={{ color: days !== null && days < 0 ? "#dc2626" : "var(--color-text-body)" }}>{formatDate(task.dueDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${TASK_STATUS_COLORS[task.status] ?? ""}`}>{task.status.replace("_", " ")}</span>
                      </td>
                      <td className="px-4 py-3">
                        {task.status !== "COMPLETED" && (
                          <select
                            className="input-field py-1 text-xs w-auto"
                            value={task.status}
                            onChange={(e) => updateMutation.mutate({ id: task.id, status: e.target.value })}
                          >
                            <option value="NOT_STARTED">Not Started</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="BLOCKED">Blocked</option>
                          </select>
                        )}
                        {task.status === "COMPLETED" && <CheckCircle2 size={16} style={{ color: "var(--color-secondary)" }} />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
