"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FileInput, Send, Loader2, CheckCircle2, Upload, Search, Filter, Tablet } from "lucide-react";
import toast from "react-hot-toast";

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
}

export default function DataEntryPage() {
  const queryClient = useQueryClient();
  const [selectedFormId, setSelectedFormId] = useState("");
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: formsData, isLoading: formsLoading } = useQuery({
    queryKey: ["data-forms"],
    queryFn: async () => {
      const res = await fetch("/api/data-forms");
      if (!res.ok) throw new Error("Failed to fetch forms");
      return res.json();
    },
  });

  const forms = formsData?.forms ?? [];
  const selectedForm = forms.find((f: { id: string }) => f.id === selectedFormId);
  const formSchema = selectedForm?.schema as { fields: FormField[] } | undefined;

  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: selectedFormId,
          trialId: selectedForm?.trialId,
          data,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Data submitted successfully!");
      setFormData({});
      setErrors({});
    },
    onError: () => {
      toast.error("Submission failed");
    },
  });

  const validateAndSubmit = () => {
    if (!formSchema) return;
    const newErrors: Record<string, string> = {};

    formSchema.fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && (value === undefined || value === "")) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "number" && value !== undefined && value !== "") {
        const num = Number(value);
        if (field.min !== undefined && num < field.min) {
          newErrors[field.name] = `Minimum value is ${field.min}`;
        }
        if (field.max !== undefined && num > field.max) {
          newErrors[field.name] = `Maximum value is ${field.max}`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    submitMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Data Entry
          </h1>
          <p className="page-subtitle">Submit trial data according to protocols and measurement periods</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.08)" }}>
              <Upload size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Submissions</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>156</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
              <CheckCircle2 size={20} style={{ color: "var(--color-secondary)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Validated</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>142</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.08)" }}>
              <Tablet size={20} style={{ color: "var(--color-accent-dark)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Tablets Active</p>
              <p className="text-xl font-bold" style={{ color: "var(--color-accent-dark)" }}>8</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.08)" }}>
              <FileInput size={20} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Forms Available</p>
              <p className="text-xl font-bold" style={{ color: "#3b82f6" }}>{forms.length}</p>
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
                placeholder="Search forms..."
                className="input-field pl-10"
              />
            </div>
          </div>
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

      <div className="card p-6">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Select Data Collection Form</label>
          <select
            className="input-field w-full"
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
          >
            <option value="">Choose a form...</option>
            {forms.map((form: { id: string; name: string; trial: { code: string } }) => (
              <option key={form.id} value={form.id}>
                {form.name} - {form.trial.code}
              </option>
            ))}
          </select>
        </div>

        {selectedForm && formSchema && (
          <div className="space-y-6">
            <h3 className="font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>{selectedForm.name}</h3>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {formSchema.fields.map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                    {field.unit && <span className="text-xs ml-1" style={{ color: "var(--color-text-muted)" }}>({field.unit})</span>}
                  </label>
                  
                  {field.type === "select" ? (
                    <select
                      className="input-field w-full"
                      value={formData[field.name] as string || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "number" ? (
                    <input
                      type="number"
                      className="input-field w-full"
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      value={formData[field.name] as number || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: Number(e.target.value) })}
                    />
                  ) : (
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder={field.placeholder}
                      value={formData[field.name] as string || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  )}
                  
                  {errors[field.name] && (
                    <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "rgba(58,125,68,0.1)" }}>
              <button onClick={validateAndSubmit} disabled={submitMutation.isPending} className="btn-primary">
                {submitMutation.isPending ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : (
                  <><Send size={16} /> Submit Data</>
                )}
              </button>
              <button onClick={() => { setFormData({}); setErrors({}); }} className="btn-outline">
                Clear Form
              </button>
              {submitMutation.isSuccess && (
                <span className="flex items-center gap-1 text-sm" style={{ color: "var(--color-secondary)" }}>
                  <CheckCircle2 size={14} /> Submitted successfully
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
