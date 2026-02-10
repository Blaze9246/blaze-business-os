"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  CheckSquare,
  Store,
  Bot,
  Workflow,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { StoreSelector } from "./StoreSelector";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
  { icon: Bot, label: "AI Agents", href: "/dashboard/agents" },
  { icon: Workflow, label: "Workflows", href: "/dashboard/workflows" },
  { icon: Store, label: "Stores", href: "/dashboard/stores" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-surface border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-zinc-100">Blaze OS</span>
          )}
        </div>
      </div>

      {/* Store Selector */}
      {!collapsed && (
        <div className="p-3 border-b border-border">
          <StoreSelector />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-surface-elevated",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <>
              <div className="flex items-center gap-3 min-w-0">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="w-8 h-8 rounded-full bg-surface-elevated"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-400">
                      {user?.firstName?.[0] || "U"}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-100 truncate">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-surface-elevated transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
          {collapsed && (
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-surface-elevated transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-surface-elevated border border-border rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}
