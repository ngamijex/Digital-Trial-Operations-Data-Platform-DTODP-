"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Calendar, FlaskConical, Loader2, MapPin, Users,
  ClipboardList, FileText, CheckCircle2, Clock, AlertTriangle,
} from "lucide-react";
import { formatDate, PHASE_LABELS, STATUS_COLORS, TASK_STATUS_COLORS, getDaysUntilDue } from "@/lib/utils";

interface Trial {
  id: string;
  code: string;
  name: string;
  description: string | null;
  objectives: string | null;
  hypotheses: string | null;
  kpis: string | null;
  variables: string | null;
  cropType: string | null;
  season: string;
  year: number;
  phase: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  plotSize: string | null;
  sampleSize: number | null;
  experimentDesign: string | null;
  treatments: string | null;
  owner: { id: string; name: string; email: string; role: string };
  trialPhases: { id: string; phase: string; isComplete: boolean; startDate: string | null; endDate: string | null }[];
  tasks: { id: string; title: string; status: string; priority: string; dueDate: string | null; assignee: { name: string } | null }[];
  submissions: { id: string; status: string; submittedAt: string | null; submitter: { name: string } }[];
  trialLocations: { location: { name: string; district: string | null } }[];
  farmers: { farmer: { name: string; farmerId: string } }[];
}

export default function TrialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trialId = params.id as string;

  const { data: trial, isLoading, error } = useQuery<Trial>({
    queryKey: ["trial", trialId],
    queryFn: async () => {
      const res = await fetch(`/api/trials/${trialId}`);
      if (!res.ok) throw new Error("Failed to fetch trial");
      return res.json();
    },
    enabled: !!trialId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-24">
        <Loader2 size={32} className="animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (error || !trial) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-600">Trial not found or failed to load.</p>
        <button onClick={() => router.back()} className="btn-outline mt-4">Go Back</button>
      </div>
    );
  }

  const completedTasks = trial.tasks.filter((t) => t.status === "COMPLETED").length;
  const totalTasks = trial.tasks.length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/trials" className="mb-2 inline-flex items-center gap-1 text-sm transition-colors hover:underline" style={{ color: "var(--color-secondary)" }}>
            <ArrowLeft size={14} /> Back to Trials
          </Link>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="page-title mb-0">{trial.name}</h1>
            <span className={`badge ${STATUS_COLORS[trial.status] ?? ""}`}>{trial.status}</span>
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {trial.code} &middot; Season {trial.season} {trial.year} &middot; {PHASE_LABELS[trial.phase] ?? trial.phase}
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Design</p>
          <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-primary)" }}>{trial.experimentDesign ?? "—"}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Crop</p>
          <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-primary)" }}>{trial.cropType ?? "—"}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Sample Size</p>
          <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-primary)" }}>{trial.sampleSize ?? "—"}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Submissions</p>
          <p className="mt-1 text-sm font-bold" style={{ color: "var(--color-secondary)" }}>{trial.submissions.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Task Progress</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-gray-100">
              <div className="h-2 rounded-full" style={{ width: `${taskProgress}%`, backgroundColor: "var(--color-secondary)" }} />
            </div>
            <span className="text-xs font-bold" style={{ color: "var(--color-secondary)" }}>{taskProgress}%</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Details */}
        <div className="space-y-5 lg:col-span-2">
          {/* Description & Objectives */}
          <div className="card p-5">
            <h3 className="mb-3 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>Trial Details</h3>
            {trial.description && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Description</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-body)" }}>{trial.description}</p>
              </div>
            )}
            {trial.objectives && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Objectives</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-body)" }}>{trial.objectives}</p>
              </div>
            )}
            {trial.hypotheses && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Hypotheses</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-body)" }}>{trial.hypotheses}</p>
              </div>
            )}
            {trial.kpis && (
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>KPIs</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-body)" }}>{trial.kpis}</p>
              </div>
            )}
            {trial.treatments && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Treatments</p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-body)" }}>{trial.treatments}</p>
              </div>
            )}
          </div>

          {/* Timeline / Phase Progress */}
          <div className="card p-5">
            <h3 className="mb-4 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>Phase Progress</h3>
            <div className="space-y-3">
              {trial.trialPhases.map((tp) => (
                <div key={tp.id} className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: tp.isComplete ? "rgba(58,125,68,0.2)" : "rgba(58,125,68,0.08)", backgroundColor: tp.isComplete ? "rgba(58,125,68,0.03)" : "transparent" }}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: tp.isComplete ? "rgba(58,125,68,0.1)" : "rgba(0,0,0,0.04)" }}>
                    {tp.isComplete ? <CheckCircle2 size={16} style={{ color: "var(--color-secondary)" }} /> : <Clock size={16} style={{ color: "var(--color-text-muted)" }} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>{PHASE_LABELS[tp.phase] ?? tp.phase}</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {formatDate(tp.startDate)} {tp.endDate ? `— ${formatDate(tp.endDate)}` : "— Ongoing"}
                    </p>
                  </div>
                  <span className={`badge text-xs ${tp.isComplete ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                    {tp.isComplete ? "Completed" : "In Progress"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="card">
            <div className="border-b p-4" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
              <h3 className="font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
                <ClipboardList size={16} className="mr-1.5 inline" /> Tasks ({totalTasks})
              </h3>
            </div>
            {trial.tasks.length === 0 ? (
              <p className="p-5 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No tasks yet</p>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
                {trial.tasks.map((task) => {
                  const days = getDaysUntilDue(task.dueDate);
                  return (
                    <div key={task.id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        {task.status === "COMPLETED" ? (
                          <CheckCircle2 size={16} style={{ color: "var(--color-secondary)" }} />
                        ) : days !== null && days < 0 ? (
                          <AlertTriangle size={16} className="text-red-500" />
                        ) : (
                          <Clock size={16} style={{ color: "var(--color-text-muted)" }} />
                        )}
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>{task.title}</p>
                          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                            {task.assignee?.name ?? "Unassigned"} &middot; Due {formatDate(task.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge text-xs ${TASK_STATUS_COLORS[task.status] ?? ""}`}>{task.status.replace("_", " ")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-5">
          {/* Owner & Dates */}
          <div className="card p-5">
            <h3 className="mb-3 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: "var(--color-text-muted)" }} />
                <span style={{ color: "var(--color-text-muted)" }}>Owner:</span>
                <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>{trial.owner.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical size={14} style={{ color: "var(--color-text-muted)" }} />
                <span style={{ color: "var(--color-text-muted)" }}>Design:</span>
                <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>{trial.experimentDesign ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: "var(--color-text-muted)" }} />
                <span style={{ color: "var(--color-text-muted)" }}>Period:</span>
                <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>{formatDate(trial.startDate)} — {formatDate(trial.endDate)}</span>
              </div>
              {trial.plotSize && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "var(--color-text-muted)" }} />
                  <span style={{ color: "var(--color-text-muted)" }}>Plot Size:</span>
                  <span className="font-medium" style={{ color: "var(--color-text-dark)" }}>{trial.plotSize}</span>
                </div>
              )}
            </div>
          </div>

          {/* Locations */}
          {trial.trialLocations.length > 0 && (
            <div className="card p-5">
              <h3 className="mb-3 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
                <MapPin size={14} className="mr-1 inline" /> Locations
              </h3>
              <div className="space-y-2">
                {trial.trialLocations.map((tl, i) => (
                  <div key={i} className="rounded-md border p-2.5" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>{tl.location.name}</p>
                    {tl.location.district && <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{tl.location.district}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Farmers */}
          {trial.farmers.length > 0 && (
            <div className="card p-5">
              <h3 className="mb-3 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
                <Users size={14} className="mr-1 inline" /> Enrolled Farmers ({trial.farmers.length})
              </h3>
              <div className="max-h-48 space-y-1.5 overflow-y-auto">
                {trial.farmers.map((tf, i) => (
                  <div key={i} className="flex items-center justify-between rounded px-2 py-1.5 text-sm" style={{ backgroundColor: "rgba(58,125,68,0.03)" }}>
                    <span style={{ color: "var(--color-text-dark)" }}>{tf.farmer.name}</span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{tf.farmer.farmerId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submissions Summary */}
          <div className="card p-5">
            <h3 className="mb-3 font-display text-md font-bold" style={{ color: "var(--color-text-dark)" }}>
              <FileText size={14} className="mr-1 inline" /> Submissions ({trial.submissions.length})
            </h3>
            {trial.submissions.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No submissions yet</p>
            ) : (
              <div className="space-y-2">
                {trial.submissions.slice(0, 5).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between text-sm">
                    <span style={{ color: "var(--color-text-body)" }}>{sub.submitter.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{formatDate(sub.submittedAt)}</span>
                      <span className={`badge text-xs ${sub.status === "VALIDATED" ? "bg-emerald-50 text-emerald-700" : sub.status === "REJECTED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
