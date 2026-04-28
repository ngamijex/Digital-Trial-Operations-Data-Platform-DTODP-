"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, LogOut, User } from "lucide-react";
import { getInitials, ROLE_LABELS } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b bg-white px-6"
      style={{ borderColor: "rgba(58,125,68,0.12)" }}
    >
      <div>
        <h2 className="text-sm font-semibold" style={{ color: "var(--color-text-dark)" }}>
          Agricultural Innovations Department
        </h2>
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          One Acre Fund — Rwanda
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <Bell size={18} style={{ color: "var(--color-text-body)" }} />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-full pr-2 transition-colors hover:bg-gray-50"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              {session?.user?.name ? getInitials(session.user.name) : "?"}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                {session?.user?.name ?? "User"}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {session?.user?.role ? ROLE_LABELS[session.user.role] : ""}
              </p>
            </div>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-white py-1 shadow-lg"
              style={{ borderColor: "rgba(58,125,68,0.12)" }}
            >
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                style={{ color: "var(--color-text-body)" }}
              >
                <User size={14} />
                Profile
              </button>
              <hr style={{ borderColor: "rgba(58,125,68,0.08)" }} />
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
