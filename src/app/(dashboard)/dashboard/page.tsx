"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  FlaskConical,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileInput,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import Link from "next/link";

const COLORS = ["#1a3c1f", "#3a7d44", "#f5c400", "#d4a900", "#4e9e5a", "#2e6634"];

export default function DashboardPage() {
  const { data: session } = useSession();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const { data: recentTrials } = useQuery({
    queryKey: ["recent-trials"],
    queryFn: async () => {
      const res = await fetch("/api/trials?limit=5");
      if (!res.ok) throw new Error("Failed to fetch trials");
      return res.json();
    },
  });

  const { data: upcomingTasks } = useQuery({
    queryKey: ["upcoming-tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks?limit=5&sort=dueDate");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  const trialsByPhase = stats?.trialsByPhase ?? [];
  const tasksByStatus = stats?.tasksByStatus ?? [];
  const monthlySubmissions = stats?.monthlySubmissions ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, {session?.user?.name ?? "User"}. Here&apos;s your data management overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FlaskConical}
          label="Active Trials"
          value={stats?.activeTrials ?? 0}
          total={stats?.totalTrials ?? 0}
          suffix="total"
          color="var(--color-primary)"
          bgColor="rgba(26,60,31,0.08)"
        />
        <StatCard
          icon={ClipboardCheck}
          label="Tasks Completed"
          value={stats?.completedTasks ?? 0}
          total={stats?.totalTasks ?? 0}
          suffix="total"
          color="var(--color-secondary)"
          bgColor="rgba(58,125,68,0.08)"
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue Tasks"
          value={stats?.overdueTasks ?? 0}
          total={stats?.totalTasks ?? 0}
          suffix="of total"
          color="#dc2626"
          bgColor="rgba(220,38,38,0.08)"
        />
        <StatCard
          icon={TrendingUp}
          label="Data Quality Score"
          value={`${stats?.slaCompliance ?? 0}%`}
          color="var(--color-accent-dark)"
          bgColor="var(--color-accent-pale)"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Trials by Phase */}
        <div className="card p-5">
          <h3 className="mb-4 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
            Trials by Phase
          </h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trialsByPhase} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(58,125,68,0.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid rgba(58,125,68,0.15)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#3a7d44" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="card p-5">
          <h3 className="mb-4 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
            Tasks by Status
          </h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="count"
                  nameKey="name"
                  label={({ name, count }) => `${name}: ${count}`}
                  labelLine={false}
                >
                  {tasksByStatus.map((_: unknown, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Submissions Chart */}
      <div className="card p-5">
        <h3 className="mb-4 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
          Data Submissions Over Time
        </h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySubmissions} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(58,125,68,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid rgba(58,125,68,0.15)",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="submissions" stroke="#3a7d44" strokeWidth={2} dot={{ fill: "#1a3c1f" }} />
              <Line type="monotone" dataKey="validated" stroke="#f5c400" strokeWidth={2} dot={{ fill: "#d4a900" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Trials & Upcoming Tasks */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Trials */}
        <div className="card">
          <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
            <h3 className="font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
              Recent Trials
            </h3>
            <Link href="/trials" className="text-xs font-medium" style={{ color: "var(--color-secondary)" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
            {(recentTrials?.trials ?? []).length === 0 ? (
              <p className="p-4 text-sm" style={{ color: "var(--color-text-muted)" }}>No trials yet</p>
            ) : (
              (recentTrials?.trials ?? []).slice(0, 5).map((trial: { id: string; code: string; name: string; phase: string; status: string }) => (
                <Link
                  key={trial.id}
                  href={`/trials/${trial.id}`}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                      {trial.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {trial.code}
                    </p>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: trial.status === "ACTIVE" ? "rgba(58,125,68,0.1)" : "rgba(26,60,31,0.06)",
                      color: trial.status === "ACTIVE" ? "var(--color-secondary)" : "var(--color-text-muted)",
                    }}
                  >
                    {trial.phase.replace("_", " ")}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
            <h3 className="font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
              Upcoming SLA Tasks
            </h3>
            <Link href="/tasks" className="text-xs font-medium" style={{ color: "var(--color-secondary)" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
            {(upcomingTasks?.tasks ?? []).length === 0 ? (
              <p className="p-4 text-sm" style={{ color: "var(--color-text-muted)" }}>No tasks yet</p>
            ) : (
              (upcomingTasks?.tasks ?? []).slice(0, 5).map((task: { id: string; title: string; dueDate: string; status: string; priority: string }) => (
                <div key={task.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {task.status === "COMPLETED" ? (
                      <CheckCircle2 size={16} style={{ color: "var(--color-secondary)" }} />
                    ) : (
                      <Clock size={16} style={{ color: task.status === "OVERDUE" ? "#dc2626" : "var(--color-text-muted)" }} />
                    )}
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                        {task.title}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                      </p>
                    </div>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor:
                        task.priority === "CRITICAL"
                          ? "rgba(220,38,38,0.1)"
                          : task.priority === "HIGH"
                          ? "rgba(245,196,0,0.15)"
                          : "rgba(58,125,68,0.08)",
                      color:
                        task.priority === "CRITICAL"
                          ? "#dc2626"
                          : task.priority === "HIGH"
                          ? "#7a5900"
                          : "var(--color-secondary)",
                    }}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  total,
  suffix,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  total?: number;
  suffix?: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold" style={{ color }}>
            {value}
          </p>
          {total !== undefined && suffix && (
            <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
              {total} {suffix}
            </p>
          )}
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={20} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
