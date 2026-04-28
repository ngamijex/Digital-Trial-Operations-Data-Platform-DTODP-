"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Presentation from "@/components/presentation";
import {
  ChevronRight,
  Play,
  FlaskConical,
  ClipboardList,
  BarChart3,
  Shield,
  Users,
  Zap,
  ArrowRight,
  ChevronLeft,
  Leaf,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";
/* eslint-disable @next/next/no-img-element */

const SLIDES = [
  { type: "video" as const, src: "/media/video.mp4", alt: "Agricultural field operations" },
  { type: "image" as const, src: "/media/hero1.jpg", alt: "Maize field trial" },
  { type: "image" as const, src: "/media/hero2.jpg", alt: "Farmers harvesting" },
  { type: "image" as const, src: "/media/hero3.jpg", alt: "Modern agricultural machinery" },
  { type: "image" as const, src: "/media/hero4.jpg", alt: "Aerial view of agricultural field" },
  { type: "image" as const, src: "/media/hero.jpg", alt: "Green valley landscape" },
];

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (SLIDES[currentSlide].type === "video") return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, nextSlide]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafdf7" }}>
      {/* ─── Sticky Navbar ─── */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(26, 60, 31, 0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Image src="/media/OAF_Logo.png" alt="One Acre Fund" width={120} height={30} className="brightness-0 invert" />
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#problem" className="text-xs font-medium text-white/80 transition-colors hover:text-white">
              The Challenge
            </a>
            <a href="#how-it-works" className="text-xs font-medium text-white/80 transition-colors hover:text-white">
              How It Works
            </a>
            <a href="#features" className="text-xs font-medium text-white/80 transition-colors hover:text-white">
              Features
            </a>
            <a href="#impact" className="text-xs font-medium text-white/80 transition-colors hover:text-white">
              Impact
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPresentation(true)}
              className="flex items-center gap-1.5 rounded-full border-2 border-white/30 px-4 py-1.5 text-xs font-bold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
            >
              <Play size={13} />
              Present
            </button>
            <Link
              href="/login"
              className="rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section with Slideshow ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0, zIndex: currentSlide === index ? 1 : 0 }}
          >
            {slide.type === "video" ? (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                onEnded={nextSlide}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index <= 1}
              />
            )}
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg, rgba(26,60,31,0.82) 0%, rgba(26,60,31,0.55) 50%, rgba(58,125,68,0.45) 100%)" }} />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-in-up max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Leaf size={14} className="text-yellow-400" />
              <span className="text-xs font-medium text-white/90">One Acre Fund &middot; Agricultural Innovations</span>
            </div>

            <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Transforming
              <span className="block" style={{ color: "var(--color-accent)" }}>
                Trial Data Management
              </span>
              Through Digital Innovation
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
              A unified platform to collect, validate, store, and analyze agricultural trial data &mdash;
              replacing fragmented tools with a single source of truth that empowers
              evidence-based decisions for smallholder farmers across East Africa.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}
              >
                Get Started
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10"
              >
                <Play size={16} /> See How It Works
              </a>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-center gap-2">
            <button onClick={prevSlide} className="rounded-full bg-white/10 p-1.5 text-white backdrop-blur-sm transition hover:bg-white/20">
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: currentSlide === i ? 24 : 6,
                    backgroundColor: currentSlide === i ? "var(--color-accent)" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="rounded-full bg-white/10 p-1.5 text-white backdrop-blur-sm transition hover:bg-white/20">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Problem Section ─── */}
      <section id="problem" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "rgba(245,196,0,0.15)", color: "var(--color-accent-dark, #b8940a)" }}>
                The Challenge
              </span>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight" style={{ color: "var(--color-primary)" }}>
                Trial Data Is Scattered. <br />
                <span style={{ color: "var(--color-secondary)" }}>Managing It Shouldn&apos;t Be.</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                One Acre Fund&apos;s Agricultural Innovations department runs <strong>50+ trials each season</strong> across
                multiple locations, teams, and crops. Today, data lives in 15+ disconnected spreadsheets,
                Google Drive folders, and various collection tools &mdash; leading to data silos, quality issues, and delayed
                insights that ultimately impact the farmers we serve.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: "More time spent fixing data than using data for decisions" },
                  { icon: Target, text: "Data collection scattered across Google Sheets, Kobo, CommCare, and Excel" },
                  { icon: TrendingUp, text: "No centralized storage or institutional memory across seasons" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(26,60,31,0.07)" }}>
                      <item.icon size={16} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <p className="text-base" style={{ color: "var(--color-text-body)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image src="/media/hero2.jpg" alt="Farmers collaborating" width={640} height={420} className="h-auto w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,60,31,0.5) 0%, transparent 60%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-lg font-bold text-white">Empowering Smallholder Farmers</p>
                  <p className="text-sm text-white/80">Better trials. Better evidence. Better livelihoods.</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl" style={{ backgroundColor: "rgba(58,125,68,0.1)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24" style={{ backgroundColor: "var(--color-primary)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "rgba(245,196,0,0.2)", color: "var(--color-accent)" }}>
              How It Works
            </span>
            <h2 className="mb-4 font-display text-4xl font-bold text-white">
              One Platform. All Your Data. Total Clarity.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              DTODP covers the full data lifecycle &mdash; from standardized collection through validation,
              centralized storage, and automated reporting &mdash; ensuring every team works from one source of truth.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: FlaskConical,
                title: "Design & Plan",
                desc: "Create trial protocols with hypotheses, KPIs, treatments, and experimental designs. Assign owners and set seasonal timelines.",
                phase: "Phase 0",
              },
              {
                step: "02",
                icon: ClipboardList,
                title: "Collect & Validate",
                desc: "Station and field teams collect structured data through dynamic forms with built-in validation rules. Errors caught at the point of entry.",
                phase: "Phase 1 & 2",
              },
              {
                step: "03",
                icon: Shield,
                title: "Store & Monitor",
                desc: "Clean data flows into a centralized database. Real-time dashboards track collection progress, data quality, and team performance.",
                phase: "Ongoing",
              },
              {
                step: "04",
                icon: BarChart3,
                title: "Analyze & Report",
                desc: "Transform trial data into actionable insights with dashboards, charts, and exportable reports that drive farmer-facing recommendations.",
                phase: "Analysis",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
              >
                <div className="absolute -right-4 -top-4 font-display text-7xl font-bold leading-none text-white/5">
                  {item.step}
                </div>
                <div className="relative">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(245,196,0,0.15)" }}
                  >
                    <item.icon size={24} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <span className="mb-2 inline-block rounded-full border border-white/20 px-3 py-0.5 text-xs font-semibold text-white/60">{item.phase}</span>
                  <h3 className="mb-2 font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting arrows (decorative) */}
          <div className="mt-12 hidden items-center justify-center gap-4 lg:flex">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-px w-24" style={{ backgroundColor: "rgba(245,196,0,0.3)" }} />
                <ChevronRight size={16} style={{ color: "var(--color-accent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "rgba(245,196,0,0.15)", color: "var(--color-accent-dark, #b8940a)" }}>
              Platform Features
            </span>
            <h2 className="mb-4 font-display text-4xl font-bold" style={{ color: "var(--color-primary)" }}>
              Built for How Your Teams Actually Work
            </h2>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: "var(--color-text-body)" }}>
              Every feature addresses a specific data management bottleneck identified in the Agricultural Innovations department.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FlaskConical,
                title: "Trial Management",
                desc: "Full lifecycle tracking from Phase 0 research design through station trials, field trials, and final reporting. Every trial has a clear owner and timeline.",
                color: "#1a3c1f",
              },
              {
                icon: ClipboardList,
                title: "Dynamic Data Collection",
                desc: "Build custom data entry forms per trial. Capture agronomic observations, farmer feedback, and lab results through structured, validated forms.",
                color: "#3a7d44",
              },
              {
                icon: Shield,
                title: "Automated Data Quality",
                desc: "Built-in validation rules at data entry, structured review-and-approve workflows, and automated quality checks replace manual spreadsheet audits.",
                color: "#f5c400",
              },
              {
                icon: Users,
                title: "Multi-Team Collaboration",
                desc: "Seven specialized teams work together seamlessly: Trial Owners, Station, Field, Data, Lab, Inventory, and High-touch Extension teams.",
                color: "#1a3c1f",
              },
              {
                icon: BarChart3,
                title: "Reports & Analytics",
                desc: "Real-time dashboards with KPIs, trial progress charts, task distribution, and monthly submission trends. Export-ready for stakeholder reviews.",
                color: "#3a7d44",
              },
              {
                icon: Zap,
                title: "Centralized Data Storage",
                desc: "All trial data stored in a structured relational database. Search, access, and reuse historical data across seasons. Build institutional memory.",
                color: "#f5c400",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(58,125,68,0.12)", backgroundColor: "white" }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}10` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold" style={{ color: "var(--color-primary)" }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact / Stats Strip ─── */}
      <section id="impact" className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image src="/media/hero1.jpg" alt="Maize field" fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,60,31,0.92) 0%, rgba(58,125,68,0.88) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-white">Designed for Real Impact</h2>
            <p className="mt-3 text-lg text-white/70">Numbers that reflect the scale of our data management challenge</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50+", label: "Trials per Season" },
              { value: "7", label: "Specialized Teams" },
              { value: "3", label: "Seasons per Year" },
              { value: "1M+", label: "Farmers Served" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-5xl font-bold" style={{ color: "var(--color-accent)" }}>{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── System Description ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image src="/media/hero3.jpg" alt="Agricultural technology" width={320} height={220} className="rounded-xl object-cover shadow-lg" />
                <Image src="/media/hero4.jpg" alt="Aerial farm view" width={320} height={220} className="mt-8 rounded-xl object-cover shadow-lg" />
              </div>
              <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl" style={{ backgroundColor: "rgba(245,196,0,0.08)" }} />
            </div>

            <div>
              <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "rgba(245,196,0,0.15)", color: "var(--color-accent-dark, #b8940a)" }}>
                About the Platform
              </span>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight" style={{ color: "var(--color-primary)" }}>
                Data Management <br />
                <span style={{ color: "var(--color-secondary)" }}>Improvement Platform</span>
              </h2>
              <p className="mb-4 text-base leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                <strong>DTODP</strong> is purpose-built for One Acre Fund&apos;s Agricultural Innovations department.
                It replaces fragmented spreadsheets and disconnected tools with a single source of truth for
                data collection, validation, storage, and reporting.
              </p>
              <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                The platform standardizes how 7 specialized teams collect, manage, and utilize trial data &mdash;
                ensuring that Trial Owners, Station Teams, Field Teams, Data Teams, Lab, Inventory, and
                High-touch Extension teams work from one connected system with clear accountability.
              </p>
              <div className="space-y-3">
                {[
                  "Standardized data collection with shared variable dictionary",
                  "Automated validation replacing manual spreadsheet audits",
                  "Centralized PostgreSQL database for all trial data",
                  "Real-time dashboards and exportable reports",
                  "Role-based access for 7 specialized teams",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-secondary)" }}>
                      <ChevronRight size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-body)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl p-12 shadow-2xl" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #2d5a33 100%)" }}>
            <Image src="/media/OAF_Logo.png" alt="One Acre Fund" width={180} height={45} className="mx-auto mb-8 brightness-0 invert" />
            <h2 className="mb-4 font-display text-4xl font-bold text-white">
              Ready to Fix Your Data?
            </h2>
            <p className="mb-8 text-lg text-white/75">
              Sign in to access the platform and start managing your trial data
              with the standardization and visibility your teams and farmers deserve.
            </p>
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}
            >
              Sign In to DTODP
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t py-10" style={{ borderColor: "rgba(58,125,68,0.1)", backgroundColor: "var(--color-primary)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <Image src="/media/OAF_Logo.png" alt="One Acre Fund" width={120} height={30} className="brightness-0 invert" />
              <span className="text-sm text-white/40">|</span>
              <span className="text-sm font-medium text-white/60">Agricultural Innovations</span>
            </div>
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} One Acre Fund. Digital Trial Operations & Data Platform.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Presentation Modal ─── */}
      <Presentation isOpen={showPresentation} onClose={() => setShowPresentation(false)} />

      {/* ─── Animations ─── */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
