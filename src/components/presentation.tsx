"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  FlaskConical,
  Database,
  Shield,
  Users,
  BarChart3,
  ClipboardList,
  Zap,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Server,
  Lock,
  Globe,
  GitBranch,
  Calendar,
  TrendingUp,
  ArrowRight,
  Leaf,
  FileSearch,
  Eye,
  Archive,
  Workflow,
  Lightbulb,
} from "lucide-react";

/* eslint-disable @next/next/no-img-element */

/* ================================================================
   TYPES & HELPERS
   ================================================================ */

interface Slide {
  id: string;
  category: string;
  render: () => React.ReactNode;
}

/* Decorative accent bar */
const AccentBar = () => (
  <div className="my-5 flex items-center gap-2">
    <div className="h-1 w-10 rounded-full" style={{ backgroundColor: "#f5c400" }} />
    <div className="h-1 w-5 rounded-full" style={{ backgroundColor: "#f5c400", opacity: 0.4 }} />
    <div className="h-1 w-2 rounded-full" style={{ backgroundColor: "#f5c400", opacity: 0.2 }} />
  </div>
);

/* Section chip label */
const SectionLabel = ({ text, light }: { text: string; light?: boolean }) => (
  <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ backgroundColor: light ? "rgba(255,255,255,0.15)" : "rgba(245,196,0,0.1)" }}>
    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#f5c400" }} />
    <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: light ? "#f5c400" : "#b8940a" }}>{text}</span>
  </div>
);

/* Highlighted key phrase */
const Highlight = ({ children, color = "#f5c400" }: { children: React.ReactNode; color?: string }) => (
  <span className="relative inline">
    <span className="relative z-10">{children}</span>
    <span className="absolute bottom-0 left-0 z-0 h-[35%] w-full rounded-sm" style={{ backgroundColor: color, opacity: 0.25 }} />
  </span>
);

/* Photo background wrapper with overlay */
const PhotoBg = ({ src, overlay = "rgba(26,60,31,0.82)", children }: { src: string; overlay?: string; children: React.ReactNode }) => (
  <div className="relative flex h-full w-full flex-col overflow-hidden">
    <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
  </div>
);

/* Gantt row */
const GanttRow = ({ task, start, end, color, responsible }: { task: string; start: number; end: number; color: string; responsible: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-[140px] shrink-0 text-[8px] font-medium" style={{ color: "#374151" }}>{task}</div>
    <div className="flex flex-1 gap-[2px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[14px] flex-1 rounded-sm transition-all"
          style={{
            backgroundColor: i >= start && i <= end ? color : "rgba(0,0,0,0.03)",
            boxShadow: i >= start && i <= end ? `0 1px 3px ${color}40` : "none",
          }}
        />
      ))}
    </div>
    <div className="w-[80px] shrink-0 text-right text-[8px]" style={{ color: "#6b7280" }}>{responsible}</div>
  </div>
);

/* Phase detail card */
const PhaseCard = ({ phase, title, duration, color, activities, deliverables, responsible }: {
  phase: string; title: string; duration: string; color: string;
  activities: string[]; deliverables: string[]; responsible: string[];
}) => (
  <div className="rounded-2xl border p-4" style={{ borderColor: `${color}20`, background: `linear-gradient(135deg, ${color}03 0%, ${color}08 100%)` }}>
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="rounded-lg px-2.5 py-1 text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: color }}>{phase}</span>
        <span className="text-xs font-bold" style={{ color: "#1a3c1f" }}>{title}</span>
      </div>
      <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${color}10`, color }}>{duration}</span>
    </div>
    <div className="mt-2 grid grid-cols-3 gap-3 text-[10px]">
      <div>
        <p className="mb-1.5 font-bold uppercase tracking-wider" style={{ color }}>Activities</p>
        {activities.map((a, i) => <p key={i} className="leading-relaxed" style={{ color: "#374151" }}>- {a}</p>)}
      </div>
      <div>
        <p className="mb-1.5 font-bold uppercase tracking-wider" style={{ color }}>Deliverables</p>
        {deliverables.map((d, i) => <p key={i} className="leading-relaxed" style={{ color: "#374151" }}>- {d}</p>)}
      </div>
      <div>
        <p className="mb-1.5 font-bold uppercase tracking-wider" style={{ color }}>Responsible</p>
        {responsible.map((r, i) => <p key={i} className="leading-relaxed" style={{ color: "#374151" }}>- {r}</p>)}
      </div>
    </div>
  </div>
);

/* ================================================================
   SLIDE DEFINITIONS -- PITCH DECK (DESIGN-UPGRADED)
   ================================================================ */

const PRESENTATION_SLIDES: Slide[] = [

  /* =========== SLIDE 1: TITLE =========== */
  {
    id: "title",
    category: "",
    render: () => (
      <PhotoBg src="/media/hero.jpg" overlay="linear-gradient(135deg, rgba(26,60,31,0.92) 0%, rgba(45,90,51,0.85) 50%, rgba(58,125,68,0.80) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <Image src="/media/OAF_Logo.png" alt="One Acre Fund" width={180} height={45} className="mb-10 brightness-0 invert drop-shadow-lg" />
          <h1 className="mb-3 font-display text-5xl font-bold leading-tight text-white drop-shadow-md">
            Data Management
          </h1>
          <h1 className="font-display text-5xl font-bold leading-tight drop-shadow-md" style={{ color: "#f5c400" }}>
            Improvement
          </h1>
          <AccentBar />
          <p className="text-lg font-medium text-white/85 drop-shadow-sm">Agricultural Innovations Department</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            Identifying bottlenecks in trial data management and building a digital platform to ensure data is managed, stored, and utilized effectively.
          </p>
          <p className="mt-8 text-xs text-white/30">Confidential &middot; {new Date().getFullYear()}</p>
        </div>
      </PhotoBg>
    ),
  },

  /* =========== SLIDE 2: THE ASSIGNMENT =========== */
  {
    id: "assignment",
    category: "Context",
    render: () => (
      <div className="relative flex h-full overflow-hidden">
        {/* Left accent strip */}
        <div className="w-2 shrink-0" style={{ background: "linear-gradient(180deg, #1a3c1f, #3a7d44, #f5c400)" }} />
        <div className="flex flex-1 flex-col justify-center px-14 py-10" style={{ backgroundColor: "#fafdf7" }}>
          <SectionLabel text="Our Assignment" />
          <h2 className="mb-6 font-display text-3xl font-bold" style={{ color: "#1a3c1f" }}>
            What We Were <Highlight>Asked To Do</Highlight>
          </h2>
          <div className="mb-6 rounded-2xl border-l-4 bg-white p-6 shadow-lg" style={{ borderColor: "#f5c400" }}>
            <p className="text-sm italic leading-relaxed" style={{ color: "#374151" }}>
              &ldquo;Identify the bottlenecks in the current process and recommend improvements to ensure trial data are managed effectively. Choose one opportunity and prepare a <Highlight>project plan for implementing it</Highlight> (critical path).&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md" style={{ borderColor: "rgba(26,60,31,0.08)" }}>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.07)" }}>
                  <FileSearch size={16} style={{ color: "#1a3c1f" }} />
                </div>
                <p className="text-xs font-bold" style={{ color: "#1a3c1f" }}>Part 1: Research &amp; Analysis</p>
              </div>
              <div className="space-y-2 text-[11px]" style={{ color: "#374151" }}>
                <p>- Current data management processes and practices</p>
                <p>- Tools used: collection, monitoring, and storage</p>
                <p>- Shortcomings identified through stakeholder consultation</p>
                <p>- Proposed improvements to observed challenges</p>
              </div>
            </div>
            <div className="group rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md" style={{ borderColor: "rgba(26,60,31,0.08)" }}>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245,196,0,0.1)" }}>
                  <Target size={16} style={{ color: "#b8940a" }} />
                </div>
                <p className="text-xs font-bold" style={{ color: "#1a3c1f" }}>Part 2: Critical Path</p>
              </div>
              <div className="space-y-2 text-[11px]" style={{ color: "#374151" }}>
                <p>- <strong>Key Result:</strong> The milestone to be achieved</p>
                <p>- <strong>Activity:</strong> Tasks per key result</p>
                <p>- <strong>Owner:</strong> Who will implement each task</p>
                <p>- <strong>Timeline:</strong> When tasks will be completed</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right side image strip */}
        <div className="relative w-[200px] shrink-0 overflow-hidden">
          <img src="/media/hero1.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, transparent, rgba(250,253,247,1) 0%, rgba(250,253,247,0.3) 60%, transparent)" }} />
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 3: OPENING HOOK =========== */
  {
    id: "opening-hook",
    category: "The Problem",
    render: () => (
      <PhotoBg src="/media/hero1.jpg" overlay="linear-gradient(135deg, rgba(26,60,31,0.93) 0%, rgba(26,60,31,0.88) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-400/30 shadow-lg shadow-red-500/10" style={{ backgroundColor: "rgba(220,38,38,0.15)" }}>
            <AlertTriangle size={36} className="text-red-400" />
          </div>
          <h2 className="mb-6 font-display text-4xl font-bold leading-snug text-white">
            &ldquo;We are spending more time<br />
            <span className="text-red-400">fixing data</span> than <span className="text-red-400">using data.</span>&rdquo;
          </h2>
          <AccentBar />
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            The core problem is not the absence of processes, but the <Highlight color="#f5c400">absence of a system</Highlight> that connects,
            standardizes, and enforces those processes across the entire trial lifecycle.
          </p>
          <div className="mt-8 rounded-full px-6 py-2" style={{ backgroundColor: "rgba(245,196,0,0.1)", border: "1px solid rgba(245,196,0,0.2)" }}>
            <p className="text-xs font-bold" style={{ color: "#f5c400" }}>
              8 interconnected bottlenecks identified through stakeholder consultation
            </p>
          </div>
        </div>
      </PhotoBg>
    ),
  },

  /* =========== SLIDE 4: CURRENT PROCESS =========== */
  {
    id: "current-process",
    category: "The Problem",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="How Data Flows Today" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          The Current Data Landscape
        </h2>
        <p className="mb-5 text-xs" style={{ color: "#6b7280" }}>
          Each team uses different tools with <Highlight color="#dc2626">no integration</Highlight> between them
        </p>
        <div className="mb-4 flex items-stretch gap-2">
          {[
            { step: "Trial Design", tool: "Google Sheets", who: "Trial Owners", icon: FlaskConical, issue: "No shared templates" },
            { step: "Data Collection", tool: "Kobo / CommCare", who: "Field Teams", icon: ClipboardList, issue: "Different tools per team" },
            { step: "Quality Check", tool: "Manual review", who: "Data Team", icon: Eye, issue: "Line-by-line in sheets" },
            { step: "Analysis", tool: "Excel / R (ad-hoc)", who: "Trial Owners", icon: BarChart3, issue: "Siloed, not standardized" },
            { step: "Storage", tool: "Google Drive", who: "Various", icon: Archive, issue: "No structured database" },
          ].map((s, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center rounded-2xl border bg-white p-3 shadow-sm" style={{ borderColor: "rgba(26,60,31,0.08)" }}>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(58,125,68,0.08)" }}>
                  <s.icon size={18} style={{ color: "#3a7d44" }} />
                </div>
                <p className="text-[11px] font-bold" style={{ color: "#1a3c1f" }}>{s.step}</p>
                <p className="mt-1 text-[9px] font-medium" style={{ color: "#3a7d44" }}>{s.tool}</p>
                <p className="text-[9px]" style={{ color: "#6b7280" }}>{s.who}</p>
                <div className="mt-auto pt-2">
                  <div className="rounded-lg px-2 py-1 text-center text-[8px] font-bold" style={{ backgroundColor: "rgba(220,38,38,0.06)", color: "#dc2626" }}>
                    {s.issue}
                  </div>
                </div>
              </div>
              {i < 4 && (
                <div className="flex h-6 items-center">
                  <div className="h-px w-full border-t-2 border-dashed" style={{ borderColor: "rgba(220,38,38,0.25)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.04), rgba(220,38,38,0.08))", border: "1px dashed rgba(220,38,38,0.2)" }}>
          <p className="text-xs font-bold" style={{ color: "#dc2626" }}>
            Vision: Data Team should own analysis &amp; ensure effective storage
          </p>
          <p className="mt-1 text-[10px]" style={{ color: "#6b7280" }}>
            Without a connected system, this vision cannot be realized.
          </p>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 5: PROBLEMS 1 & 2 =========== */
  {
    id: "problems-1-2",
    category: "The Problem",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Bottleneck Analysis (1 of 4)" />
        <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Data Ecosystem &amp; <Highlight>Standardization</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {/* Problem 1 */}
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #dc2626" }}>
            <div className="mb-3 flex items-center gap-2">
              <Database size={18} className="text-red-600" />
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-600">Problem 1</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Fragmented &amp; Unstructured Data Ecosystem</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              Data across <strong>Google Sheets, Kobo, CommCare, Excel, Google Drive</strong> with no integration. No single source of truth.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Data duplication across sources", "Data loss during handovers", "Cannot access past trials easily", "No cross-trial analysis"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.03), rgba(220,38,38,0.07))" }}>
              <p className="text-[11px] font-bold italic text-red-600">
                &ldquo;We don&apos;t have a data system -- we have <Highlight color="#dc2626">scattered data files</Highlight>.&rdquo;
              </p>
            </div>
          </div>
          {/* Problem 2 */}
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #f59e0b" }}>
            <div className="mb-3 flex items-center gap-2">
              <ClipboardList size={18} className="text-amber-500" />
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold text-amber-600">Problem 2</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Lack of Standardization in Data Collection</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              Each trial owner creates <strong>own sheets, variables, formats</strong>. No shared dictionary or reusable templates.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Incomparable datasets across trials", "Cannot aggregate seasonal data", "Reinventing tools every season", "Lost institutional knowledge"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.03), rgba(245,158,11,0.07))" }}>
              <p className="text-[11px] font-bold italic text-amber-600">
                &ldquo;Collecting data, but not building <Highlight color="#f59e0b">institutional knowledge</Highlight>.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 6: PROBLEMS 3 & 4 =========== */
  {
    id: "problems-3-4",
    category: "The Problem",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Bottleneck Analysis (2 of 4)" />
        <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Data Quality &amp; <Highlight>Visibility</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #dc2626" }}>
            <div className="mb-3 flex items-center gap-2">
              <FileSearch size={18} className="text-red-600" />
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-600">Problem 3</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Manual &amp; Inefficient Quality Management</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              QC done <strong>manually line-by-line</strong> in spreadsheets by Trial Owners and the Data Team. Time-consuming, error-prone, not scalable.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Incorrect data reaches analysis", "Late error detection", "Delayed analysis waiting on clean data", "Process does not scale"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.03), rgba(220,38,38,0.07))" }}>
              <p className="text-[11px] font-bold italic text-red-600">
                &ldquo;More time <Highlight color="#dc2626">fixing data</Highlight> than using data.&rdquo;
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #f59e0b" }}>
            <div className="mb-3 flex items-center gap-2">
              <Eye size={18} className="text-amber-500" />
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold text-amber-600">Problem 4</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>No Real-Time Visibility or Monitoring</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              No dashboards showing collection progress, submission rates, or trial performance. <strong>Tracked via calls &amp; meetings</strong>.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Delays go unnoticed", "Problems detected too late", "Poor cross-team coordination", "Leadership has no insight"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.03), rgba(245,158,11,0.07))" }}>
              <p className="text-[11px] font-bold italic text-amber-600">
                &ldquo;Managing operations <Highlight color="#f59e0b">without visibility</Highlight>.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 7: PROBLEMS 5 & 6 =========== */
  {
    id: "problems-5-6",
    category: "The Problem",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Bottleneck Analysis (3 of 4)" />
        <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Accountability &amp; <Highlight>Storage</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #dc2626" }}>
            <div className="mb-3 flex items-center gap-2">
              <Shield size={18} className="text-red-600" />
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-600">Problem 5</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Weak Enforcement of SLA &amp; Accountability</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              SLA defines responsibilities and deadlines, but <strong>tasks aren&apos;t tracked digitally</strong> and no system flags delays.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Missed seasonal deadlines", "Unclear task ownership", "Dependency breakdowns", "No structured escalation"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.03), rgba(220,38,38,0.07))" }}>
              <p className="text-[11px] font-bold italic text-red-600">
                &ldquo;The SLA exists, but is <Highlight color="#dc2626">not operationalized</Highlight>.&rdquo;
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #f59e0b" }}>
            <div className="mb-3 flex items-center gap-2">
              <Archive size={18} className="text-amber-500" />
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold text-amber-600">Problem 6</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>No Centralized Storage or Institutional Memory</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              Data in <strong>Google Drive folders</strong>, reports saved separately. No structured database. Past data hard to find or reuse.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Loss of historical insights", "No meta-analysis capability", "Repeating past work", "Zero institutional memory"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.03), rgba(245,158,11,0.07))" }}>
              <p className="text-[11px] font-bold italic text-amber-600">
                &ldquo;Generating valuable data but <Highlight color="#f59e0b">not preserving</Highlight> its value.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 8: PROBLEMS 7 & 8 =========== */
  {
    id: "problems-7-8",
    category: "The Problem",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Bottleneck Analysis (4 of 4)" />
        <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Pipeline &amp; <Highlight>Utilization</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #dc2626" }}>
            <div className="mb-3 flex items-center gap-2">
              <Workflow size={18} className="text-red-600" />
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-600">Problem 7</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Disconnected Data Pipeline</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              No seamless flow from <strong>Design &rarr; Collection &rarr; Validation &rarr; Analysis &rarr; Reporting</strong>. Each step manual &amp; isolated.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Delays in handovers", "Inconsistent data versions", "No traceability source-to-report", "Manual re-entry everywhere"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.03), rgba(220,38,38,0.07))" }}>
              <p className="text-[11px] font-bold italic text-red-600">
                &ldquo;We don&apos;t have a data pipeline -- we have <Highlight color="#dc2626">isolated steps</Highlight>.&rdquo;
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md" style={{ borderLeft: "4px solid #f59e0b" }}>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold text-amber-600">Problem 8</span>
            </div>
            <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>Limited Data Utilization for Decision-Making</h3>
            <p className="mb-3 text-[10px] leading-relaxed" style={{ color: "#374151" }}>
              Because of all the above: <strong>data not accessible, analysis delayed, insights underused</strong>. The purpose of trials is impact.
            </p>
            <div className="mb-3 space-y-1.5">
              {["Slower innovation cycles", "Reduced farmer impact", "Missed evidence-based decisions", "Wasted research investment"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {t}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.03), rgba(245,158,11,0.07))" }}>
              <p className="text-[11px] font-bold italic text-amber-600">
                &ldquo;Data collected, but <Highlight color="#f59e0b">not converted into decisions</Highlight>.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 9: COST OF INACTION =========== */
  {
    id: "cost-inaction",
    category: "The Problem",
    render: () => (
      <PhotoBg src="/media/hero4.jpg" overlay="linear-gradient(135deg, rgba(69,10,10,0.92) 0%, rgba(127,29,29,0.88) 50%, rgba(153,27,27,0.85) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <SectionLabel text="The Cost of Doing Nothing" light />
          <h2 className="mb-8 font-display text-3xl font-bold text-white">
            If We <Highlight color="#ef4444">Don&apos;t Act</Highlight> Now
          </h2>
          <div className="mb-8 grid grid-cols-4 gap-5">
            {[
              { value: "8", label: "Interconnected bottlenecks", icon: AlertTriangle },
              { value: "15+", label: "Disconnected spreadsheets per season", icon: Database },
              { value: "2-3 Mo", label: "Delay from trial to farmer impact", icon: Clock },
              { value: "0%", label: "Data reuse across seasons", icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                <s.icon size={18} className="mx-auto mb-2 text-red-300/60" />
                <p className="font-display text-3xl font-bold text-red-300">{s.value}</p>
                <p className="mt-2 text-[10px] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-white/75">
              Every season without a connected data system means <strong className="text-red-300">hundreds of hours lost</strong>,
              <strong className="text-red-300"> data that cannot be trusted</strong>, and
              <strong className="text-red-300"> evidence that never reaches our 1M+ farmers</strong> in time.
            </p>
          </div>
          <p className="mt-5 text-sm font-bold" style={{ color: "#f5c400" }}>Our farmers cannot wait. We need to act now.</p>
        </div>
      </PhotoBg>
    ),
  },

  /* =========== SLIDE 10: PROPOSED IMPROVEMENTS =========== */
  {
    id: "proposed-improvements",
    category: "Findings & Recommendations",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Our Recommendations" />
        <h2 className="mb-2 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          8 Problems. <Highlight>8 Targeted Improvements.</Highlight>
        </h2>
        <p className="mb-5 text-xs" style={{ color: "#6b7280" }}>Based on stakeholder consultations and process analysis</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { num: "01", problem: "Fragmented Ecosystem", fix: "Centralized digital platform -- single source of truth", icon: Database, color: "#dc2626" },
            { num: "02", problem: "No Standardization", fix: "Dynamic form builder with shared variable dictionary & reusable templates", icon: ClipboardList, color: "#dc2626" },
            { num: "03", problem: "Manual QC", fix: "Automated validation at entry + structured review-and-approve workflows", icon: CheckCircle2, color: "#dc2626" },
            { num: "04", problem: "No Visibility", fix: "Real-time dashboards: collection progress, submission rates, trial KPIs", icon: BarChart3, color: "#dc2626" },
            { num: "05", problem: "Weak SLA Enforcement", fix: "Digital SLA tracking with automated alerts & 3-level escalation", icon: Shield, color: "#dc2626" },
            { num: "06", problem: "No Centralized Storage", fix: "PostgreSQL database with structured storage, search & historical access", icon: Archive, color: "#dc2626" },
            { num: "07", problem: "Disconnected Pipeline", fix: "End-to-end: Design -> Collect -> Validate -> Analyze -> Report", icon: Workflow, color: "#dc2626" },
            { num: "08", problem: "Limited Utilization", fix: "Automated reporting, cross-trial analysis & exportable insights", icon: Lightbulb, color: "#dc2626" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(58,125,68,0.07)" }}>
                <item.icon size={15} style={{ color: "#3a7d44" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold" style={{ color: "#6b7280" }}>{item.num}</span>
                  <span className="text-[10px] font-bold text-red-600">{item.problem}</span>
                  <ArrowRight size={10} style={{ color: "#9ca3af" }} />
                  <span className="text-[10px] font-bold" style={{ color: "#3a7d44" }}>Fixed</span>
                </div>
                <p className="mt-0.5 text-[10px]" style={{ color: "#374151" }}>{item.fix}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl p-3 text-center" style={{ background: "linear-gradient(135deg, rgba(245,196,0,0.05), rgba(245,196,0,0.12))", border: "2px dashed rgba(245,196,0,0.3)" }}>
          <p className="text-[11px] font-bold" style={{ color: "#1a3c1f" }}>
            All 8 improvements converge into one intervention: <span className="text-base" style={{ color: "#f5c400" }}>Digital Trial Operations &amp; Data Platform (DTODP)</span>
          </p>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 11: INTRODUCING DTODP =========== */
  {
    id: "solution-intro",
    category: "The Intervention",
    render: () => (
      <PhotoBg src="/media/hero3.jpg" overlay="linear-gradient(135deg, rgba(26,60,31,0.90) 0%, rgba(45,90,51,0.85) 50%, rgba(58,125,68,0.80) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: "rgba(245,196,0,0.15)", border: "1px solid rgba(245,196,0,0.3)" }}>
            <Leaf size={30} style={{ color: "#f5c400" }} />
          </div>
          <SectionLabel text="The Chosen Intervention" light />
          <h2 className="mb-2 font-display text-4xl font-bold text-white leading-tight">
            Digital Trial Operations
          </h2>
          <h2 className="font-display text-4xl font-bold leading-tight" style={{ color: "#f5c400" }}>
            &amp; Data Platform
          </h2>
          <AccentBar />
          <p className="max-w-2xl text-base leading-relaxed text-white/75">
            A <strong className="text-white">purpose-built platform</strong> replacing scattered tools with a{" "}
            <Highlight color="#f5c400">single, unified system</Highlight> -- giving every team
            standardized collection, automated quality management, real-time visibility, and centralized storage.
          </p>
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { icon: Database, label: "Single Source of Truth" },
              { icon: CheckCircle2, label: "Automated QC" },
              { icon: BarChart3, label: "Real-Time Dashboards" },
              { icon: Archive, label: "Centralized Storage" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 backdrop-blur-sm">
                <f.icon size={13} style={{ color: "#f5c400" }} />
                <span className="text-[10px] font-medium text-white/80">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </PhotoBg>
    ),
  },

  /* =========== SLIDE 12: BEFORE & AFTER =========== */
  {
    id: "before-after",
    category: "The Intervention",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="The Transformation" />
        <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          From <span className="text-red-600">Fragmented</span> to <span style={{ color: "#3a7d44" }}>Connected</span>
        </h2>
        <div className="overflow-hidden rounded-2xl shadow-lg" style={{ border: "1px solid rgba(26,60,31,0.08)" }}>
          <table className="w-full text-[11px]">
            <thead>
              <tr style={{ background: "linear-gradient(135deg, #1a3c1f, #2d5a33)" }}>
                <th className="w-[22%] px-4 py-3 text-left font-bold text-white">Bottleneck</th>
                <th className="w-[39%] px-4 py-3 text-left font-bold text-red-300">Today (Without System)</th>
                <th className="w-[39%] px-4 py-3 text-left font-bold" style={{ color: "#f5c400" }}>Tomorrow (With DTODP)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { challenge: "Data Ecosystem", before: "15+ disconnected spreadsheets", after: "Single platform, one source of truth" },
                { challenge: "Standardization", before: "Each team creates own formats", after: "Shared variable dictionary & templates" },
                { challenge: "Data Quality", before: "Manual line-by-line reviews", after: "Automated validation at entry" },
                { challenge: "Visibility", before: "Manual follow-ups, no dashboards", after: "Real-time KPI dashboards" },
                { challenge: "SLA Enforcement", before: "Paper SLA, no digital tracking", after: "Auto deadline alerts & escalation" },
                { challenge: "Data Storage", before: "Google Drive folders, no DB", after: "PostgreSQL with search & history" },
                { challenge: "Data Pipeline", before: "Isolated manual steps", after: "Design->Collect->Validate->Report" },
                { challenge: "Utilization", before: "Delayed insights, underused data", after: "Instant reports, cross-trial analysis" },
              ].map((row, i) => (
                <tr key={i} className="transition-colors" style={{ backgroundColor: i % 2 === 0 ? "white" : "rgba(26,60,31,0.015)" }}>
                  <td className="px-4 py-2.5 font-bold" style={{ color: "#1a3c1f" }}>{row.challenge}</td>
                  <td className="px-4 py-2.5 text-red-500/80">{row.before}</td>
                  <td className="px-4 py-2.5 font-medium" style={{ color: "#3a7d44" }}>{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 13: PLATFORM FEATURES =========== */
  {
    id: "features",
    category: "The Intervention",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="What It Does" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          End-to-End <Highlight>Data Management</Highlight>
        </h2>
        <p className="mb-5 text-xs" style={{ color: "#6b7280" }}>Across the full trial lifecycle</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { step: "01", icon: FlaskConical, title: "Design & Plan", desc: "Create protocols with structured templates. Assign teams, set deadlines, define requirements in one place.", phase: "Phase 0", color: "#1a3c1f" },
            { step: "02", icon: ClipboardList, title: "Collect & Validate", desc: "Dynamic digital forms with built-in validation. Data validated at entry. No more fixing sheets later.", phase: "Phase 1 & 2", color: "#3a7d44" },
            { step: "03", icon: BarChart3, title: "Monitor & Track", desc: "Real-time dashboards: collection progress, SLA compliance, trial health. Everything at a glance.", phase: "Ongoing", color: "#f5c400" },
            { step: "04", icon: TrendingUp, title: "Analyze & Report", desc: "Data Team owns analysis in a structured environment. Cross-trial insights that reach farmers faster.", phase: "Analysis", color: "#dc2626" },
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-lg" style={{ borderColor: `${item.color}15` }}>
              <div className="absolute -right-3 -top-3 font-display text-7xl font-bold leading-none" style={{ color: `${item.color}08` }}>{item.step}</div>
              <div className="relative">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm" style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)` }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <span className="mb-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ backgroundColor: `${item.color}10`, color: item.color }}>{item.phase}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: "#1a3c1f" }}>{item.title}</h3>
                <p className="text-[10px] leading-relaxed" style={{ color: "#374151" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, rgba(245,196,0,0.05), rgba(245,196,0,0.12))" }}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: "#f5c400" }}>
              <Zap size={12} style={{ color: "#1a3c1f" }} />
            </div>
            <p className="text-[11px] font-bold" style={{ color: "#1a3c1f" }}>
              Live MVP demo available -- click &quot;Sign In&quot; on the welcome page to explore the platform
            </p>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 14: ARCHITECTURE =========== */
  {
    id: "architecture",
    category: "Technical",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Under the Hood" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Modern, Scalable, <Highlight>Secure</Highlight>
        </h2>
        <p className="mb-5 text-xs" style={{ color: "#6b7280" }}>Enterprise-grade architecture solving each bottleneck</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Globe, layer: "Frontend", tech: "Next.js 15 + React", items: ["Server-side rendering", "TypeScript strict mode", "Tailwind CSS + brand tokens", "Responsive on all devices"], color: "#1a3c1f" },
            { icon: Server, layer: "Backend", tech: "API Routes + Auth", items: ["RESTful endpoints", "Zod input validation", "NextAuth JWT sessions", "Role-based access (7 roles)"], color: "#3a7d44" },
            { icon: Database, layer: "Database", tech: "PostgreSQL (Neon)", items: ["Prisma ORM", "20+ relational tables", "Serverless auto-scaling", "Automated backups"], color: "#f5c400" },
            { icon: Lock, layer: "Security", tech: "Enterprise Grade", items: ["Bcrypt password hashing", "HTTPS enforced", "Audit trail logging", "Input sanitization"], color: "#dc2626" },
          ].map((col, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: `${col.color}12` }}>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${col.color}10, ${col.color}20)` }}>
                <col.icon size={18} style={{ color: col.color }} />
              </div>
              <p className="text-xs font-bold" style={{ color: "#1a3c1f" }}>{col.layer}</p>
              <p className="mb-3 text-[10px]" style={{ color: col.color }}>{col.tech}</p>
              {col.items.map((item, j) => (
                <div key={j} className="flex items-center gap-1.5 text-[10px]" style={{ color: "#374151" }}>
                  <div className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: col.color }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 15: HOW IT WORKS -- DATA FLOW =========== */
  {
    id: "how-it-works",
    category: "The Intervention",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="How It Works" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          End-to-End <Highlight>Data Flow</Highlight>
        </h2>
        <p className="mb-5 text-xs" style={{ color: "#6b7280" }}>From trial design to farmer impact -- every step connected, automated, and tracked</p>

        {/* Main flow */}
        <div className="mb-5 flex items-stretch gap-1">
          {[
            { step: "1", title: "Trial Design", icon: FlaskConical, color: "#1a3c1f", desc: "Trial Owners create protocols using standardized templates. Define objectives, treatments, variables, locations, and assign teams.", details: ["Protocol builder", "Variable dictionary", "Team assignment", "Season calendar"] },
            { step: "2", title: "Data Collection", icon: ClipboardList, color: "#3a7d44", desc: "Field & Station teams collect data via dynamic digital forms with built-in validation rules. No more spreadsheet chaos.", details: ["Dynamic form builder", "Offline-capable", "GPS & photo capture", "Real-time sync"] },
            { step: "3", title: "Quality Assurance", icon: CheckCircle2, color: "#f5c400", desc: "Automated validation at entry catches errors instantly. Data Team reviews submissions through structured QC workflows.", details: ["Auto-validation rules", "Outlier detection", "Review & approve flow", "Rejection feedback"] },
            { step: "4", title: "Analysis & Storage", icon: Database, color: "#dc2626", desc: "Clean data flows into a centralized PostgreSQL database. Data Team runs analysis. Historical data preserved forever.", details: ["Centralized DB", "Cross-trial queries", "Version history", "Export to R/Excel"] },
            { step: "5", title: "Reporting & Decisions", icon: TrendingUp, color: "#7c3aed", desc: "Auto-generated dashboards and reports. Evidence reaches leadership and farmers faster than ever before.", details: ["Live KPI dashboards", "Auto seasonal reports", "SLA compliance view", "PDF/CSV export"] },
          ].map((s, i) => (
            <div key={i} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col rounded-2xl border bg-white p-3 shadow-sm" style={{ borderColor: `${s.color}15` }}>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm" style={{ backgroundColor: s.color }}>{s.step}</div>
                  <div>
                    <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.title}</p>
                  </div>
                </div>
                <p className="mb-2 text-[9px] leading-relaxed" style={{ color: "#374151" }}>{s.desc}</p>
                <div className="mt-auto space-y-1">
                  {s.details.map((d, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-[8px]" style={{ color: "#374151" }}>
                      <div className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              {i < 4 && (
                <div className="flex justify-center py-1">
                  <ArrowRight size={12} style={{ color: "#9ca3af" }} className="rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar: monitoring layer */}
        <div className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, rgba(26,60,31,0.04), rgba(58,125,68,0.08))", border: "1px solid rgba(26,60,31,0.08)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={14} style={{ color: "#3a7d44" }} />
              <p className="text-[10px] font-bold" style={{ color: "#1a3c1f" }}>Continuous Monitoring Layer</p>
            </div>
            <div className="flex gap-4 text-[9px]" style={{ color: "#374151" }}>
              <span>Real-time dashboards</span>
              <span>SLA deadline tracking</span>
              <span>Auto escalation alerts</span>
              <span>Team performance scores</span>
              <span>Audit trail logging</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 16: DATABASE ARCHITECTURE =========== */
  {
    id: "db-architecture",
    category: "Technical",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Data Architecture" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          <Highlight>Relational Database</Highlight> Structure
        </h2>
        <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>20+ interconnected tables in PostgreSQL -- replacing scattered files with a single source of truth</p>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { group: "Core Entities", color: "#1a3c1f", icon: Database, tables: [
              { name: "User", fields: "id, name, email, role, team, status" },
              { name: "Trial", fields: "id, name, season, phase, owner, status" },
              { name: "TrialProtocol", fields: "id, trial, objectives, treatments, variables" },
              { name: "Season", fields: "id, name, start, end, deadlines" },
            ]},
            { group: "Data Management", color: "#3a7d44", icon: ClipboardList, tables: [
              { name: "DataForm", fields: "id, trial, template, fields, validations" },
              { name: "DataSubmission", fields: "id, form, submitter, status, data" },
              { name: "ValidationRule", fields: "id, form, field, rule, message" },
              { name: "DataReview", fields: "id, submission, reviewer, status" },
            ]},
            { group: "Operations", color: "#f5c400", icon: Shield, tables: [
              { name: "Task", fields: "id, trial, assignee, deadline, status" },
              { name: "SlaTemplate", fields: "id, service, provider, client, deadline" },
              { name: "Escalation", fields: "id, task, level, triggered_at" },
              { name: "Notification", fields: "id, user, type, message, read" },
            ]},
            { group: "Support & Reporting", color: "#7c3aed", icon: BarChart3, tables: [
              { name: "Farmer", fields: "id, name, location, group, trials" },
              { name: "Location", fields: "id, name, region, gps, type" },
              { name: "ActivityLog", fields: "id, user, action, entity, timestamp" },
              { name: "Document", fields: "id, trial, type, url, version" },
            ]},
          ].map((group, i) => (
            <div key={i} className="rounded-2xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: `${group.color}15` }}>
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: `linear-gradient(135deg, ${group.color}10, ${group.color}20)` }}>
                <group.icon size={13} style={{ color: group.color }} />
                <p className="text-[10px] font-bold" style={{ color: group.color }}>{group.group}</p>
              </div>
              <div className="p-2 space-y-1.5">
                {group.tables.map((t, j) => (
                  <div key={j} className="rounded-lg p-2" style={{ backgroundColor: "rgba(0,0,0,0.015)" }}>
                    <p className="text-[10px] font-bold" style={{ color: "#1a3c1f" }}>{t.name}</p>
                    <p className="text-[8px]" style={{ color: "#6b7280" }}>{t.fields}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Relationships */}
        <div className="rounded-2xl bg-white p-3 shadow-sm" style={{ border: "1px solid rgba(26,60,31,0.08)" }}>
          <p className="mb-2 text-[10px] font-bold" style={{ color: "#1a3c1f" }}>Key Relationships</p>
          <div className="flex flex-wrap gap-3">
            {[
              "User -> Trial (owns)",
              "Trial -> DataForm (has many)",
              "DataForm -> DataSubmission (receives)",
              "DataSubmission -> DataReview (reviewed by)",
              "Trial -> Task (generates)",
              "Task -> SlaTemplate (governed by)",
              "Task -> Escalation (triggers)",
              "User -> ActivityLog (tracked)",
            ].map((rel, i) => (
              <div key={i} className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(58,125,68,0.05)" }}>
                <div className="h-1 w-1 rounded-full" style={{ backgroundColor: "#3a7d44" }} />
                <span className="text-[8px] font-medium" style={{ color: "#374151" }}>{rel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 17: FEATURES -> PROBLEMS MAPPING =========== */
  {
    id: "features-solve-problems",
    category: "The Intervention",
    render: () => (
      <div className="flex h-full flex-col justify-center px-14 py-8" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Connecting the Dots" />
        <h2 className="mb-1 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          How Every Feature <Highlight>Answers a Problem</Highlight>
        </h2>
        <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Nothing in DTODP was built by accident -- every module directly addresses a specific bottleneck</p>

        <div className="space-y-2">
          {[
            { problem: "Fragmented Ecosystem", num: "P1", feature: "Centralized Platform", how: "All 7 teams work in one system. No more Google Sheets, Kobo, CommCare, Excel -- one tool, one database, one truth.", icon: Database, pColor: "#dc2626", fColor: "#1a3c1f" },
            { problem: "No Standardization", num: "P2", feature: "Dynamic Form Builder + Variable Dictionary", how: "Reusable templates with a shared variable library. Every trial collects comparable, aggregatable data from day one.", icon: ClipboardList, pColor: "#f59e0b", fColor: "#3a7d44" },
            { problem: "Manual QC", num: "P3", feature: "Automated Validation Engine", how: "Rules run at data entry. Outliers flagged instantly. Review-and-approve workflow replaces line-by-line spreadsheet checking.", icon: CheckCircle2, pColor: "#dc2626", fColor: "#1a3c1f" },
            { problem: "No Visibility", num: "P4", feature: "Real-Time Dashboards", how: "Collection progress, submission rates, SLA compliance, and trial health -- all visible live. No more manual follow-ups.", icon: BarChart3, pColor: "#f59e0b", fColor: "#3a7d44" },
            { problem: "Weak SLA Enforcement", num: "P5", feature: "SLA Engine + Escalation", how: "Every deadline tracked digitally. Auto-alerts at 7, 3, and 1 day before due. 3-level escalation if missed. Full accountability.", icon: Shield, pColor: "#dc2626", fColor: "#1a3c1f" },
            { problem: "No Centralized Storage", num: "P6", feature: "PostgreSQL Database (20+ tables)", how: "Structured, searchable, versioned storage. Historical data preserved and accessible. Meta-analysis finally possible.", icon: Archive, pColor: "#f59e0b", fColor: "#3a7d44" },
            { problem: "Disconnected Pipeline", num: "P7", feature: "End-to-End Workflow Engine", how: "Design -> Collect -> Validate -> Analyze -> Report in one continuous flow. No handover gaps, no manual re-entry.", icon: Workflow, pColor: "#dc2626", fColor: "#1a3c1f" },
            { problem: "Limited Utilization", num: "P8", feature: "Reporting & Cross-Trial Analysis", how: "Auto-generated reports, exportable insights, and cross-trial comparisons. Evidence reaches farmers faster.", icon: Lightbulb, pColor: "#f59e0b", fColor: "#3a7d44" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm" style={{ border: "1px solid rgba(26,60,31,0.06)" }}>
              {/* Problem */}
              <div className="flex w-[180px] shrink-0 items-center gap-2">
                <span className="rounded-md px-1.5 py-0.5 text-[8px] font-bold text-white" style={{ backgroundColor: row.pColor }}>{row.num}</span>
                <span className="text-[10px] font-bold" style={{ color: row.pColor }}>{row.problem}</span>
              </div>
              {/* Arrow */}
              <ArrowRight size={14} style={{ color: "#9ca3af" }} className="shrink-0" />
              {/* Feature */}
              <div className="flex w-[200px] shrink-0 items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: `${row.fColor}10` }}>
                  <row.icon size={12} style={{ color: row.fColor }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: row.fColor }}>{row.feature}</span>
              </div>
              {/* Arrow */}
              <ArrowRight size={14} style={{ color: "#9ca3af" }} className="shrink-0" />
              {/* How */}
              <p className="flex-1 text-[9px] leading-relaxed" style={{ color: "#374151" }}>{row.how}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 18: IMPLEMENTATION OVERVIEW =========== */
  {
    id: "impl-overview",
    category: "Critical Path",
    render: () => (
      <PhotoBg src="/media/hero.jpg" overlay="linear-gradient(135deg, rgba(26,60,31,0.93) 0%, rgba(45,90,51,0.88) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <SectionLabel text="The Critical Path" light />
          <h2 className="mb-2 font-display text-3xl font-bold text-white">From Concept to</h2>
          <h2 className="mb-2 font-display text-3xl font-bold" style={{ color: "#f5c400" }}>Production in 12 Months</h2>
          <AccentBar />
          <p className="mb-8 max-w-xl text-sm text-white/60">Key results, activities, owners, and timelines across 5 phases</p>
          <div className="grid grid-cols-5 gap-4">
            {[
              { phase: "Phase 1", title: "Discovery &\nPlanning", months: "Month 1-2", icon: Target, color: "#1a3c1f" },
              { phase: "Phase 2", title: "Foundation\nBuild", months: "Month 3-5", icon: Layers, color: "#3a7d44" },
              { phase: "Phase 3", title: "Core\nDevelopment", months: "Month 6-8", icon: GitBranch, color: "#f5c400" },
              { phase: "Phase 4", title: "Testing\n& Pilot", months: "Month 9-10", icon: Shield, color: "#dc2626" },
              { phase: "Phase 5", title: "Launch &\nHandover", months: "Month 11-12", icon: Zap, color: "#7c3aed" },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${p.color}30, ${p.color}50)` }}>
                  <p.icon size={22} style={{ color: "white" }} />
                </div>
                <p className="text-[10px] font-bold" style={{ color: p.color }}>{p.phase}</p>
                <p className="mt-1 whitespace-pre-line text-xs font-bold text-white">{p.title}</p>
                <p className="mt-2 text-[10px] text-white/50">{p.months}</p>
              </div>
            ))}
          </div>
        </div>
      </PhotoBg>
    ),
  },

  /* =========== SLIDE 16: PHASE 1 =========== */
  {
    id: "phase1",
    category: "Critical Path",
    render: () => (
      <div className="flex h-full flex-col justify-center px-12 py-7" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Phase 1 -- Discovery & Planning (Month 1-2)" />
        <h2 className="mb-4 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Understanding What We <Highlight>Need to Build</Highlight>
        </h2>
        <PhaseCard
          phase="P1" title="Discovery & Planning" duration="8 weeks" color="#1a3c1f"
          activities={[
            "Interview all 7 team leads + key data users",
            "Map current data flows end-to-end",
            "Document all data collection tools in use",
            "Audit existing data quality practices",
            "Define requirements (MoSCoW prioritization)",
            "Design system architecture & database schema (ERD)",
            "Create UI wireframes & interactive prototypes",
            "Draft project plan with milestones & risk register",
            "Present findings to leadership for sign-off",
          ]}
          deliverables={[
            "Software Requirements Specification (SRS)",
            "Digitized SLA Service Matrix",
            "System Architecture Document",
            "Database ERD (20+ tables)",
            "Figma wireframes (all screens)",
            "Approved project plan & budget",
            "Risk Register with mitigations",
            "Communication & change plan",
          ]}
          responsible={[
            "Project Manager (lead)",
            "Business Analyst",
            "Solution Architect",
            "UX Designer",
            "Dept. Head (sponsor)",
            "All 7 Team Leads (input)",
          ]}
        />
        <div className="mt-3 rounded-xl p-3" style={{ background: "linear-gradient(135deg, rgba(26,60,31,0.03), rgba(26,60,31,0.07))" }}>
          <p className="text-[10px]">
            <strong style={{ color: "#1a3c1f" }}>Key Milestone:</strong>{" "}
            <span style={{ color: "#374151" }}>Leadership sign-off on requirements, architecture, and project plan before any development begins.</span>
          </p>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 17: PHASES 2 & 3 =========== */
  {
    id: "phase2-3",
    category: "Critical Path",
    render: () => (
      <div className="flex h-full flex-col justify-center px-12 py-7" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Phase 2 & 3 -- Build (Month 3-8)" />
        <h2 className="mb-4 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          Building the <Highlight>Data Platform</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <PhaseCard
            phase="P2" title="Foundation Build" duration="12 weeks (M3-5)" color="#3a7d44"
            activities={[
              "Scaffold Next.js + TypeScript project",
              "Setup PostgreSQL + Prisma ORM",
              "Build authentication (7 RBAC roles)",
              "Implement design system & brand tokens",
              "Create dashboard layout & navigation",
              "Build user management module",
              "Configure CI/CD pipeline",
              "Setup staging environment",
            ]}
            deliverables={[
              "Working login with all 7 roles",
              "Production-ready database schema",
              "Design system + Tailwind config",
              "Dashboard with role-based navigation",
              "CI/CD pipeline running",
              "Staging URL for demos",
            ]}
            responsible={[
              "Lead Developer (lead)",
              "Frontend Developer",
              "Backend Developer",
              "DevOps Engineer",
            ]}
          />
          <PhaseCard
            phase="P3" title="Core Development" duration="12 weeks (M6-8)" color="#f5c400"
            activities={[
              "Trial lifecycle management module",
              "Dynamic data form builder",
              "Automated validation engine",
              "Data submission review workflows",
              "Real-time monitoring dashboards",
              "Notification & escalation engine",
              "Reporting module with exports",
              "Farmer & location registries",
            ]}
            deliverables={[
              "Full trial lifecycle tracking",
              "Standardized form templates",
              "Automated data QC at entry",
              "Submit->Review->Validate workflow",
              "Real-time KPI dashboards",
              "SLA tracking with escalation",
              "Exportable reports & charts",
              "Cross-trial analysis capability",
            ]}
            responsible={[
              "Lead Developer (lead)",
              "Frontend Developer x2",
              "Backend Developer",
              "QA Engineer",
              "Team Leads (feedback)",
            ]}
          />
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 18: PHASES 4 & 5 =========== */
  {
    id: "phase4-5",
    category: "Critical Path",
    render: () => (
      <div className="flex h-full flex-col justify-center px-12 py-7" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Phase 4 & 5 -- Test, Pilot & Launch (Month 9-12)" />
        <h2 className="mb-4 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          From Testing to <Highlight>Go-Live</Highlight>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <PhaseCard
            phase="P4" title="Testing & Pilot" duration="8 weeks (M9-10)" color="#dc2626"
            activities={[
              "Full integration testing",
              "UAT with all 7 teams",
              "Performance & load testing",
              "Security audit",
              "Pilot with 2 trial owner teams",
              "Bug fixing & UX refinement",
              "Create training materials",
              "Data migration scripts",
            ]}
            deliverables={[
              "Test report (95%+ pass rate)",
              "UAT sign-off from all teams",
              "Security audit clearance",
              "Pilot feedback report",
              "Training manual + videos",
              "Migration scripts tested",
            ]}
            responsible={[
              "QA Lead (lead)",
              "All developers",
              "Security consultant",
              "Pilot team leads",
              "Training coordinator",
            ]}
          />
          <PhaseCard
            phase="P5" title="Launch & Handover" duration="8 weeks (M11-12)" color="#7c3aed"
            activities={[
              "Production deployment",
              "Migrate historical trial data",
              "Onboard all 7 teams",
              "Go-Live (Season A start)",
              "2-week monitoring period",
              "Bug triage & hotfixes",
              "Knowledge transfer to IT",
              "Project closure report",
            ]}
            deliverables={[
              "Production system live",
              "Historical data migrated",
              "All teams trained & onboarded",
              "Go-Live confirmation",
              "Monitoring dashboard active",
              "Support runbook",
              "Project closure document",
            ]}
            responsible={[
              "Project Manager (lead)",
              "DevOps Engineer",
              "Lead Developer",
              "Training coordinator",
              "IT Support handover",
            ]}
          />
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 19: GANTT / CRITICAL PATH =========== */
  {
    id: "gantt",
    category: "Critical Path",
    render: () => (
      <div className="flex h-full flex-col justify-center px-10 py-7" style={{ backgroundColor: "#fafdf7" }}>
        <SectionLabel text="Project Timeline" />
        <h2 className="mb-2 font-display text-2xl font-bold" style={{ color: "#1a3c1f" }}>
          12-Month <Highlight>Critical Path</Highlight>
        </h2>
        <p className="mb-3 text-[10px]" style={{ color: "#6b7280" }}>Activities, owners, and timelines across all 5 phases</p>
        <div className="rounded-2xl bg-white p-4 shadow-sm" style={{ border: "1px solid rgba(26,60,31,0.08)" }}>
          <div className="mb-2 flex items-center gap-2 text-[8px] font-bold" style={{ color: "#6b7280" }}>
            <div className="w-[140px] shrink-0" />
            <div className="flex flex-1 gap-[2px]">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                <div key={m} className="flex-1 text-center">{m}</div>
              ))}
            </div>
            <div className="w-[80px] shrink-0 text-right">Owner</div>
          </div>
          <div className="space-y-1">
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: "#1a3c1f" }}>Phase 1: Discovery</p>
            <GanttRow task="Stakeholder Interviews" start={0} end={1} color="#1a3c1f" responsible="BA + PM" />
            <GanttRow task="Data Flow Mapping" start={0} end={0} color="#1a3c1f" responsible="BA" />
            <GanttRow task="Requirements Spec" start={0} end={1} color="#1a3c1f" responsible="BA" />
            <GanttRow task="Architecture Design" start={1} end={1} color="#1a3c1f" responsible="Architect" />
            <GanttRow task="UI Wireframes" start={1} end={1} color="#1a3c1f" responsible="UX Designer" />
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: "#3a7d44" }}>Phase 2: Foundation</p>
            <GanttRow task="Database + Auth" start={2} end={3} color="#3a7d44" responsible="Backend Dev" />
            <GanttRow task="Design System" start={2} end={3} color="#3a7d44" responsible="Frontend Dev" />
            <GanttRow task="Dashboard + Nav" start={3} end={4} color="#3a7d44" responsible="Frontend Dev" />
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: "#b8940a" }}>Phase 3: Core Build</p>
            <GanttRow task="Trial Management" start={5} end={6} color="#f5c400" responsible="Full Team" />
            <GanttRow task="Form Builder + QC" start={5} end={7} color="#f5c400" responsible="Frontend Dev" />
            <GanttRow task="SLA Engine" start={6} end={7} color="#f5c400" responsible="Backend Dev" />
            <GanttRow task="Dashboards + Reports" start={6} end={7} color="#f5c400" responsible="Frontend Dev" />
            <GanttRow task="Notifications" start={7} end={7} color="#f5c400" responsible="Backend Dev" />
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: "#dc2626" }}>Phase 4: Testing</p>
            <GanttRow task="Integration Testing" start={8} end={8} color="#dc2626" responsible="QA Lead" />
            <GanttRow task="UAT + Pilot" start={8} end={9} color="#dc2626" responsible="QA + Teams" />
            <p className="mt-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: "#7c3aed" }}>Phase 5: Launch</p>
            <GanttRow task="Data Migration" start={10} end={10} color="#7c3aed" responsible="DevOps" />
            <GanttRow task="Onboarding (7 teams)" start={10} end={11} color="#7c3aed" responsible="PM + Training" />
            <GanttRow task="Go-Live + Monitor" start={11} end={11} color="#7c3aed" responsible="Full Team" />
          </div>
        </div>
      </div>
    ),
  },

  /* =========== SLIDE 20: THE ASK =========== */
  {
    id: "the-ask",
    category: "Next Steps",
    render: () => (
      <PhotoBg src="/media/hero2.jpg" overlay="linear-gradient(135deg, rgba(26,60,31,0.90) 0%, rgba(45,90,51,0.85) 50%, rgba(58,125,68,0.80) 100%)">
        <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
          <Image src="/media/OAF_Logo.png" alt="One Acre Fund" width={140} height={35} className="mb-6 brightness-0 invert" />
          <h2 className="mb-8 font-display text-3xl font-bold text-white">Our Ask to Leadership</h2>
          <div className="mb-8 grid grid-cols-4 gap-4">
            {[
              { step: "1", title: "Approve the Project", desc: "Green-light the 12-month plan and budget allocation", when: "This Week" },
              { step: "2", title: "Assign the Team", desc: "Nominate project members and a department sponsor", when: "Week 2-3" },
              { step: "3", title: "Kick Off", desc: "Department-wide workshop to align all 7 teams", when: "Week 4" },
              { step: "4", title: "Begin Discovery", desc: "Start interviews and data flow mapping", when: "Week 5" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm transition-all hover:bg-white/10">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: "#f5c400", color: "#1a3c1f" }}>{s.step}</div>
                <p className="text-xs font-bold text-white">{s.title}</p>
                <p className="mt-1 text-[10px] text-white/60">{s.desc}</p>
                <p className="mt-3 text-[10px] font-bold" style={{ color: "#f5c400" }}>{s.when}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white/10 px-12 py-6 backdrop-blur-sm" style={{ border: "1px solid rgba(245,196,0,0.2)" }}>
            <p className="font-display text-xl font-bold text-white leading-relaxed">
              Better Data. Better Trials. Better Evidence.<br />
              <span style={{ color: "#f5c400" }}>Better Farmer Livelihoods.</span>
            </p>
            <p className="mt-3 text-sm text-white/60">
              Our farmers are waiting for better recommendations. Let&apos;s fix our data -- together.
            </p>
          </div>
          <p className="mt-6 text-xs text-white/30">Thank you for your time and consideration.</p>
        </div>
      </PhotoBg>
    ),
  },
];

/* ================================================================
   PRESENTATION COMPONENT
   ================================================================ */

interface PresentationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Presentation({ isOpen, onClose }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = PRESENTATION_SLIDES.length;

  const goNext = useCallback(() => setCurrentSlide((p) => Math.min(p + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setCurrentSlide((p) => Math.max(p - 1, 0)), []);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") { isFullscreen ? toggleFullscreen() : onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, goNext, goPrev, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    if (isOpen) setCurrentSlide(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const slide = PRESENTATION_SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
        style={{
          width: isFullscreen ? "100vw" : "min(92vw, 1100px)",
          height: isFullscreen ? "100vh" : "min(85vh, 680px)",
          borderRadius: isFullscreen ? 0 : undefined,
        }}
      >
        {/* Top Bar */}
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-2" style={{ borderColor: "rgba(26,60,31,0.08)", backgroundColor: "rgba(26,60,31,0.02)" }}>
          <div className="flex items-center gap-3">
            <Image src="/media/OAF_Logo.png" alt="OAF" width={80} height={20} />
            <div className="h-3 w-px bg-gray-200" />
            <span className="text-[10px] font-medium" style={{ color: "#6b7280" }}>{slide.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: "rgba(26,60,31,0.05)", color: "#6b7280" }}>
              {currentSlide + 1} / {total}
            </span>
            <button onClick={toggleFullscreen} className="rounded-lg p-1.5 transition hover:bg-gray-100">
              {isFullscreen ? <Minimize2 size={14} style={{ color: "#6b7280" }} /> : <Maximize2 size={14} style={{ color: "#6b7280" }} />}
            </button>
            <button onClick={onClose} className="rounded-lg p-1.5 transition hover:bg-gray-100">
              <X size={14} style={{ color: "#6b7280" }} />
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="relative flex-1 overflow-hidden">
          {slide.render()}
        </div>

        {/* Bottom Controls */}
        <div className="flex shrink-0 items-center justify-between border-t px-4 py-2" style={{ borderColor: "rgba(26,60,31,0.08)" }}>
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition disabled:opacity-30"
            style={{ color: "#1a3c1f" }}
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex gap-1">
            {PRESENTATION_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: currentSlide === i ? 18 : 6,
                  backgroundColor: currentSlide === i ? "#1a3c1f" : "rgba(26,60,31,0.12)",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentSlide === total - 1}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition disabled:opacity-30"
            style={{ color: "#1a3c1f" }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
