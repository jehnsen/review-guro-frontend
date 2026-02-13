"use client";

import { AdminUserFilters } from "@/server/api";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface UserFiltersProps {
  filters: AdminUserFilters;
  onFilterChange: (filters: AdminUserFilters) => void;
  onClearFilters: () => void;
}

export function UserFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: UserFiltersProps) {
  const hasActiveFilters =
    filters.role || filters.isPremium !== undefined || filters.emailVerified !== undefined;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Role Filter */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Role
          </label>
          <select
            id="role"
            value={filters.role || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                role: e.target.value as AdminUserFilters["role"] || undefined,
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Premium Status Filter */}
        <div>
          <label
            htmlFor="isPremium"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Subscription
          </label>
          <select
            id="isPremium"
            value={
              filters.isPremium === undefined
                ? ""
                : filters.isPremium
                ? "true"
                : "false"
            }
            onChange={(e) =>
              onFilterChange({
                ...filters,
                isPremium:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true",
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="true">Premium</option>
            <option value="false">Free</option>
          </select>
        </div>

        {/* Email Verified Filter */}
        <div>
          <label
            htmlFor="emailVerified"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Email Status
          </label>
          <select
            id="emailVerified"
            value={
              filters.emailVerified === undefined
                ? ""
                : filters.emailVerified
                ? "true"
                : "false"
            }
            onChange={(e) =>
              onFilterChange({
                ...filters,
                emailVerified:
                  e.target.value === ""
                    ? undefined
                    : e.target.value === "true",
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            <X size={16} className="mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
