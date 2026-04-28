"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";
import {
  LayoutDashboard,
  FlaskConical,
  ClipboardCheck,
  FileInput,
  BarChart3,
  Settings,
  ChevronLeft,
  Beaker,
  Warehouse,
  Users,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { hasPermission, Permission } from "@/lib/permissions";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: null },
  { name: "Trials", href: "/trials", icon: FlaskConical, permission: Permission.TRIAL_VIEW_OWN },
  { name: "Tasks & SLAs", href: "/tasks", icon: ClipboardCheck, permission: Permission.TASK_VIEW_OWN },
  { name: "Data Entry", href: "/data-entry", icon: FileInput, permission: Permission.DATA_SUBMIT },
  { name: "Reports", href: "/reports", icon: BarChart3, permission: Permission.REPORTS_VIEW },
  { name: "Farmers", href: "/farmers", icon: Users, permission: Permission.FARMER_VIEW },
  { name: "Lab Samples", href: "/lab-samples", icon: Beaker, permission: Permission.LAB_SAMPLE_VIEW },
  { name: "Inventory", href: "/inventory", icon: Warehouse, permission: Permission.INVENTORY_VIEW },
  { name: "Escalations", href: "/escalations", icon: AlertTriangle, permission: Permission.ESCALATION_VIEW },
  { name: "Documents", href: "/documents", icon: FileText, permission: null },
];

const adminNav = [
  { name: "Settings", href: "/settings", icon: Settings, permission: Permission.SETTINGS_VIEW },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();
  const { data: session } = useSession();
  const role = session?.user?.role as any;

  // Filter navigation based on user role
  const filteredNav = navigation.filter(item => {
    if (!item.permission) return true;
    return hasPermission(role, item.permission);
  });

  const filteredAdminNav = adminNav.filter(item => {
    if (!item.permission) return true;
    return hasPermission(role, item.permission);
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-white transition-all duration-300",
        isOpen ? "w-[240px]" : "w-[68px]"
      )}
      style={{ borderColor: "rgba(58,125,68,0.12)" }}
    >
      {/* Brand */}
      <div
        className="flex h-[60px] items-center gap-3 border-b px-4"
        style={{ borderColor: "rgba(58,125,68,0.12)" }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white font-bold text-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          DT
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold" style={{ color: "var(--color-text-dark)" }}>
              DTODP
            </p>
            <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
              Data Management
            </p>
          </div>
        )}
        <button
          onClick={toggle}
          className={cn(
            "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all hover:bg-gray-100",
            !isOpen && "ml-0 rotate-180"
          )}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "text-white"
                  : "hover:bg-gray-50"
              )}
              style={
                isActive
                  ? { backgroundColor: "var(--color-primary)" }
                  : { color: "var(--color-text-body)" }
              }
              title={!isOpen ? item.name : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}

        {filteredAdminNav.length > 0 && (
          <>
            <div className="my-3 border-t" style={{ borderColor: "rgba(58,125,68,0.1)" }} />
            {filteredAdminNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "text-white"
                      : "hover:bg-gray-50"
                  )}
                  style={
                    isActive
                      ? { backgroundColor: "var(--color-primary)" }
                      : { color: "var(--color-text-body)" }
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Season indicator */}
      {isOpen && (
        <div className="border-t p-4" style={{ borderColor: "rgba(58,125,68,0.12)" }}>
          <div
            className="rounded-md p-3 text-center"
            style={{ backgroundColor: "var(--color-accent-pale)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "var(--color-accent-dark)" }}>
              CURRENT SEASON
            </p>
            <p className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
              A 2026
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
