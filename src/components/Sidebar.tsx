"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  nameEn?: string;
  href: string;
  icon: string;
  badge?: number | string;
}

const navItems: NavItem[] = [
  {
    name: "ภาพรวม (Dashboard)",
    href: "/dashboard",
    icon: "grid_view",
  },
  {
    name: "รายชื่อผู้ติดต่อ (Contacts)",
    href: "/contacts",
    icon: "contacts",
  },
  {
    name: "ติดตามวันนี้ (Today Tasks)",
    href: "/today-tasks",
    icon: "checklist",
    badge: 8,
  },
  {
    name: "ประวัติการติดต่อ (Activity Log)",
    href: "/activity-log",
    icon: "history",
  },
  {
    name: "การตั้งค่า (Settings)",
    href: "/settings",
    icon: "settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-outline-variant/20">
      <div className="flex flex-col">
        {/* Brand / Logo */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm border-b border-outline-variant/10">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">view_kanban</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[17px] text-on-surface leading-tight">
              Follow-up Board
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              CRM Suite
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-space-md mt-space-md">
          <div className="px-space-sm mb-space-xs text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
            เมนูหลัก
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-space-md py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-surface-container text-secondary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        isActive
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container text-on-surface"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer KPI Box */}
      <div className="p-space-md">
        <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase">
              อัตราความสำเร็จ
            </span>
            <span className="font-mono text-[12px] text-secondary font-bold">
              84%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: "84%" }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-1">
            <span>ปิดการขายแล้ว</span>
            <span className="font-mono text-on-surface font-semibold">
              42 / 50
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
