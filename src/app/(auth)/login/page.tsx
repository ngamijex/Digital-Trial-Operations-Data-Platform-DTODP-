"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FlaskConical, Eye, EyeOff, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const DEMO_USERS = [
  { role: "Admin", name: "Dr. Jean-Claude Habimana", email: "admin@oneacrefund.org", dept: "Agricultural Innovations" },
  { role: "Trial Owner", name: "Marie Uwimana", email: "marie@oneacrefund.org", dept: "Agricultural Innovations" },
  { role: "Data Team", name: "Eric Nkurunziza", email: "eric@oneacrefund.org", dept: "Data Operations" },
  { role: "Station Team", name: "Alice Mukamana", email: "alice@oneacrefund.org", dept: "Station Trials" },
  { role: "Field Trials", name: "Jean-Pierre Mugabo", email: "jean@oneacrefund.org", dept: "On-Farm Trials" },
  { role: "Lab Team", name: "Grace Ingabire", email: "grace@oneacrefund.org", dept: "Laboratory" },
  { role: "Inventory", name: "Patrick Nshimiyimana", email: "patrick@oneacrefund.org", dept: "Inventory" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-off-white)" }}
    >
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <FlaskConical size={28} />
          </div>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            DTODP
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Digital Trial Operations & Data Platform
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
            Agricultural Innovations Department — One Acre Fund Rwanda
          </p>
        </div>

        {/* Login form */}
        <div
          className="rounded-lg border bg-white p-8"
          style={{
            borderColor: "rgba(58,125,68,0.12)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2
            className="mb-6 text-center font-display text-lg font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="mb-1.5 block text-sm font-medium"
                style={{ color: "var(--color-text-dark)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your.name@oneacrefund.org"
                required
              />
            </div>

            <div>
              <label
                className="mb-1.5 block text-sm font-medium"
                style={{ color: "var(--color-text-dark)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 rounded-lg border" style={{ borderColor: "rgba(58,125,68,0.12)" }}>
            <button
              type="button"
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="flex w-full items-center justify-between rounded-t-lg px-4 py-3 text-left transition-colors hover:bg-gray-50"
              style={{ backgroundColor: "var(--color-accent-pale)" }}
            >
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--color-accent-dark)" }}>
                  Demo Credentials
                </p>
                <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                  Click any user to auto-fill &middot; Password: <strong>password123</strong>
                </p>
              </div>
              {showAllUsers ? (
                <ChevronUp size={14} style={{ color: "var(--color-accent-dark)" }} />
              ) : (
                <ChevronDown size={14} style={{ color: "var(--color-accent-dark)" }} />
              )}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${showAllUsers ? "max-h-[400px]" : "max-h-0"}`}>
              <div className="divide-y" style={{ borderColor: "rgba(58,125,68,0.06)" }}>
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.email}
                    type="button"
                    onClick={() => {
                      setEmail(user.email);
                      setPassword("password123");
                      setError("");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      {user.role.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold" style={{ color: "var(--color-text-dark)" }}>
                        {user.name}
                      </p>
                      <p className="truncate text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        {user.role} &middot; {user.dept}
                      </p>
                    </div>
                    <p className="shrink-0 text-[10px] font-medium" style={{ color: "var(--color-secondary)" }}>
                      {user.email}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
