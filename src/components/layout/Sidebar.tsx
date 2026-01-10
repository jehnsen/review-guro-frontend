"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sun,
  Moon,
  User,
  Crown,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/practice", label: "Practice Mode", icon: BookOpen },
  { href: "/mock-exam", label: "Mock Exam", icon: ClipboardCheck },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        transition-all duration-300 z-40 flex flex-col
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Review<span className="text-blue-700">Guro</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        {/* Upgrade Banner (for non-premium users) */}
        {!user?.isPremium && (
          <Link
            href="/pricing"
            className={`
              mb-2 flex items-center gap-3 px-3 py-2.5 w-full rounded-lg
              bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20
              border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700
              transition-colors group
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
              <Crown size={16} className="text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  Upgrade
                  <Sparkles size={12} className="text-amber-500" />
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-500">
                  Get Season Pass
                </p>
              </div>
            )}
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600
            hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors
          `}
        >
          {theme === "light" ? (
            <Moon size={20} className="flex-shrink-0" />
          ) : (
            <Sun size={20} className="flex-shrink-0" />
          )}
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div
          className={`
            mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-blue-700 dark:text-blue-400" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                {user?.isPremium ? (
                  <>
                    <Crown size={10} className="text-amber-500" />
                    Season Pass
                  </>
                ) : (
                  "Free Plan"
                )}
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            mt-2 flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600
            hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors
          `}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
}
