import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "checkbox";
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
}

export interface FormSchema {
  fields: FormField[];
}

export interface DashboardStats {
  totalTrials: number;
  activeTrials: number;
  totalTasks: number;
  overdueTasks: number;
  completedTasks: number;
  pendingSubmissions: number;
  slaCompliance: number;
}

export interface TrialWithRelations {
  id: string;
  code: string;
  name: string;
  description: string | null;
  season: string;
  year: number;
  phase: string;
  status: string;
  cropType: string | null;
  startDate: string | null;
  endDate: string | null;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    tasks: number;
    submissions: number;
    farmers: number;
  };
}

export interface TaskWithRelations {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  completedAt: string | null;
  isOverdue: boolean;
  escalationLevel: string;
  trial: {
    id: string;
    code: string;
    name: string;
  } | null;
  assignee: {
    id: string;
    name: string;
    email: string;
  } | null;
  creator: {
    id: string;
    name: string;
  };
}
