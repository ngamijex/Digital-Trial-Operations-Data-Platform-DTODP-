import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createTrialSchema = z.object({
  name: z.string().min(2, "Trial name is required"),
  description: z.string().optional(),
  objectives: z.string().optional(),
  hypotheses: z.string().optional(),
  kpis: z.string().optional(),
  variables: z.string().optional(),
  cropType: z.string().optional(),
  season: z.enum(["A", "B", "C"]),
  year: z.number().int().min(2020).max(2030),
  phase: z.enum(["PHASE_0", "PHASE_1", "PHASE_2", "ANALYSIS", "REPORTING", "COMPLETED"]).optional(),
  plotSize: z.string().optional(),
  sampleSize: z.number().int().positive().optional(),
  experimentDesign: z.string().optional(),
  locations: z.string().optional(),
  treatments: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(2, "Task title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  dueDate: z.string().optional(),
  trialId: z.string().optional(),
  assigneeId: z.string().optional(),
  slaTemplateId: z.string().optional(),
  season: z.enum(["A", "B", "C"]).optional(),
  year: z.number().int().optional(),
});

export const updateTaskSchema = z.object({
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "OVERDUE", "BLOCKED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
  description: z.string().optional(),
});

export const dataSubmissionSchema = z.object({
  formId: z.string(),
  trialId: z.string(),
  data: z.record(z.unknown()),
});

export const createFormSchema = z.object({
  trialId: z.string(),
  name: z.string().min(2),
  description: z.string().optional(),
  schema: z.object({
    fields: z.array(
      z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(["text", "number", "select", "date", "textarea", "checkbox"]),
        required: z.boolean().default(false),
        options: z.array(z.string()).optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        unit: z.string().optional(),
        placeholder: z.string().optional(),
      })
    ),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTrialInput = z.infer<typeof createTrialSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DataSubmissionInput = z.infer<typeof dataSubmissionSchema>;
export type CreateFormInput = z.infer<typeof createFormSchema>;
