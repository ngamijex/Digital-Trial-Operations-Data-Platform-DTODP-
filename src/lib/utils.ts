import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateTrialCode(season: string, year: number, index: number): string {
  return `TR-${season}${year}-${String(index).padStart(3, "0")}`;
}

export function isOverdue(dueDate: Date | string | null | undefined): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

export function getDaysUntilDue(dueDate: Date | string | null | undefined): number | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const PHASE_LABELS: Record<string, string> = {
  PHASE_0: "Phase 0 — Research & Design",
  PHASE_1: "Phase 1 — Station Trials",
  PHASE_2: "Phase 2 — Field Trials",
  ANALYSIS: "Analysis",
  REPORTING: "Reporting",
  COMPLETED: "Completed",
};

export const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PLANNING: "bg-blue-50 text-blue-700",
  ACTIVE: "bg-emerald-50 text-emerald-700",
  ON_HOLD: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-primary/10 text-primary",
  CANCELLED: "bg-red-50 text-red-700",
};

export const TASK_STATUS_COLORS: Record<string, string> = {
  NOT_STARTED: "bg-gray-100 text-gray-600",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  OVERDUE: "bg-red-50 text-red-700",
  BLOCKED: "bg-orange-50 text-orange-700",
};

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  TRIAL_OWNER: "Trial Owner",
  DATA_TEAM: "Data Team",
  FIELD_TRIALS_TEAM: "Field Trials Team",
  STATION_TEAM: "Station Team",
  LAB_TEAM: "Laboratory Team",
  INVENTORY_TEAM: "Inventory Team",
  HTE_TEAM: "HTE Team",
};
