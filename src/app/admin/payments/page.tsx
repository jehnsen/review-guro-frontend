"use client";

import { useState, useEffect, useCallback } from "react";
import {
  adminApi,
  AdminPaymentFilters,
  AdminPaymentResponse,
  PaymentReconciliation,
  SubscriptionStatistics,
} from "@/server/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { PaymentFilters } from "@/components/admin/PaymentFilters";
import {
  CreditCard,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function AdminPaymentsPage() {
  // State
  const [payments, setPayments] = useState<AdminPaymentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<AdminPaymentFilters>({
    page: 1,
    limit: 20,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentStats, setPaymentStats] = useState<PaymentReconciliation | null>(
    null
  );
  const [subscriptionStats, setSubscriptionStats] =
    useState<SubscriptionStatistics | null>(null);

  // Fetch payments
  const fetchPayments = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await adminApi.listPayments(filters);

      setPayments(response.data);
      setTotal(response.meta.total);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const [paymentStatsRes, subscriptionStatsRes] = await Promise.all([
        adminApi.getPaymentStats(),
        adminApi.getSubscriptionStats(),
      ]);

      setPaymentStats(paymentStatsRes.data);
      setSubscriptionStats(subscriptionStatsRes.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Handle filter change
  const handleFilterChange = (newFilters: AdminPaymentFilters) => {
    setFilters({
      ...newFilters,
      page: 1,
      limit: filters.limit,
    });
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ page: 1, limit: 20 });
  };

  // Pagination
  const handlePrevPage = () => {
    if (filters.page && filters.page > 1) {
      setFilters({ ...filters, page: filters.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (filters.page && filters.page < totalPages) {
      setFilters({ ...filters, page: filters.page + 1 });
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Payment Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View and manage all payment transactions and subscriptions
        </p>
      </div>

      {/* Payment Stats Cards */}
      {paymentStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={18} />
                Total Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {paymentStats.totalPayments}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={18} />
                Successful
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {paymentStats.successfulPayments}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle size={18} />
                Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {paymentStats.failedPayments}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={18} />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                {formatCurrency(paymentStats.totalRevenue)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subscription Stats Cards */}
      {subscriptionStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                {subscriptionStats.total}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {subscriptionStats.active}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {formatCurrency(subscriptionStats.monthlyRevenue)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {formatCurrency(subscriptionStats.averageSubscriptionValue)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <PaymentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Payments Table */}
      <PaymentTable
        payments={payments}
        isLoading={isLoading}
        onRefresh={fetchPayments}
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {payments.length} of {total} payments
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={!filters.page || filters.page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={!filters.page || filters.page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
