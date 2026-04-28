"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function NewTrialPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    description: "",
    objectives: "",
    hypotheses: "",
    kpis: "",
    variables: "",
    cropType: "",
    season: "A" as "A" | "B" | "C",
    year: new Date().getFullYear(),
    phase: "PHASE_0",
    plotSize: "",
    sampleSize: "",
    experimentDesign: "",
    locations: "",
    treatments: "",
    startDate: "",
    endDate: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sampleSize: data.sampleSize ? parseInt(data.sampleSize) : undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create trial");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trials"] });
      toast.success("Trial created successfully");
      router.push(`/trials/${data.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Trial name is required");
      return;
    }
    mutation.mutate(form);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/trials" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
          <ArrowLeft size={18} style={{ color: "var(--color-text-body)" }} />
        </Link>
        <div>
          <h1 className="page-title">Create New Trial</h1>
          <p className="page-subtitle">Define the trial plan, objectives, and key parameters</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="mb-4 font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Trial Name *</label>
              <input className="input-field" value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g., Maize Hybrid Variety Evaluation" required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Description</label>
              <textarea className="input-field" rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Brief description of the trial..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Crop Type</label>
              <input className="input-field" value={form.cropType} onChange={(e) => updateField("cropType", e.target.value)} placeholder="e.g., Maize, Beans, Rice" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Phase</label>
              <select className="input-field" value={form.phase} onChange={(e) => updateField("phase", e.target.value)}>
                <option value="PHASE_0">Phase 0 — Research & Design</option>
                <option value="PHASE_1">Phase 1 — Station Trials</option>
                <option value="PHASE_2">Phase 2 — Field Trials</option>
                <option value="ANALYSIS">Analysis</option>
                <option value="REPORTING">Reporting</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Season *</label>
              <select className="input-field" value={form.season} onChange={(e) => updateField("season", e.target.value)}>
                <option value="A">Season A</option>
                <option value="B">Season B</option>
                <option value="C">Season C</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Year *</label>
              <input type="number" className="input-field" value={form.year} onChange={(e) => updateField("year", e.target.value)} min={2020} max={2030} />
            </div>
          </div>
        </div>

        {/* Research Details */}
        <div className="card p-6">
          <h2 className="mb-4 font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>
            Research Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Objectives</label>
              <textarea className="input-field" rows={2} value={form.objectives} onChange={(e) => updateField("objectives", e.target.value)} placeholder="Primary and secondary objectives..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Hypotheses</label>
              <textarea className="input-field" rows={2} value={form.hypotheses} onChange={(e) => updateField("hypotheses", e.target.value)} placeholder="Research hypotheses..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>KPIs</label>
              <textarea className="input-field" rows={2} value={form.kpis} onChange={(e) => updateField("kpis", e.target.value)} placeholder="Key performance indicators..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Variables</label>
              <textarea className="input-field" rows={2} value={form.variables} onChange={(e) => updateField("variables", e.target.value)} placeholder="Variables to measure..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Treatments</label>
              <textarea className="input-field" rows={2} value={form.treatments} onChange={(e) => updateField("treatments", e.target.value)} placeholder="Treatment definitions..." />
            </div>
          </div>
        </div>

        {/* Trial Design */}
        <div className="card p-6">
          <h2 className="mb-4 font-display text-lg font-bold" style={{ color: "var(--color-text-dark)" }}>
            Trial Design
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Plot Size</label>
              <input className="input-field" value={form.plotSize} onChange={(e) => updateField("plotSize", e.target.value)} placeholder="e.g., 5m x 5m" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Sample Size</label>
              <input type="number" className="input-field" value={form.sampleSize} onChange={(e) => updateField("sampleSize", e.target.value)} placeholder="Number of plots/farmers" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Experimental Design</label>
              <select className="input-field" value={form.experimentDesign} onChange={(e) => updateField("experimentDesign", e.target.value)}>
                <option value="">Select design...</option>
                <option value="RCBD">Randomized Complete Block Design</option>
                <option value="CRD">Completely Randomized Design</option>
                <option value="SPLIT_PLOT">Split Plot</option>
                <option value="TRICOT">Tricot (citizen science)</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Locations</label>
              <input className="input-field" value={form.locations} onChange={(e) => updateField("locations", e.target.value)} placeholder="e.g., Rubona, Karama, Bugesera" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>Start Date</label>
              <input type="date" className="input-field" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>End Date</label>
              <input type="date" className="input-field" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/trials" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={mutation.isPending} className="btn-primary">
            {mutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={16} />
                Create Trial
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
