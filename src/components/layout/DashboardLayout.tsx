"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-4">
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          Review<span className="text-blue-700">Guro</span>
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div
        className={`
          lg:block
          ${isMobileMenuOpen ? "block" : "hidden"}
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className="
          lg:ml-64 min-h-screen pt-16 lg:pt-0
          transition-all duration-300
        "
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
