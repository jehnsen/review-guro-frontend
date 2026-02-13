"use client";

import { useState } from "react";
import { AdminPaymentFilters } from "@/server/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Filter, X } from "lucide-react";

interface PaymentFiltersProps {
  filters: AdminPaymentFilters;
  onFilterChange: (filters: AdminPaymentFilters) => void;
  onClearFilters: () => void;
}

export function PaymentFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: PaymentFiltersProps) {
  const [localFilters, setLocalFilters] = useState<AdminPaymentFilters>(filters);

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({ page: 1, limit: 20 });
    onClearFilters();
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={localFilters.status || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  status: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Provider Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Provider
            </label>
            <select
              value={localFilters.provider || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  provider: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Providers</option>
              <option value="paymongo">PayMongo</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Email or transaction ID..."
              value={localFilters.search || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  search: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date From
            </label>
            <input
              type="date"
              value={localFilters.dateFrom || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  dateFrom: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date To
            </label>
            <input
              type="date"
              value={localFilters.dateTo || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  dateTo: e.target.value || undefined,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleApply} className="flex items-center gap-2">
            <Filter size={16} />
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
