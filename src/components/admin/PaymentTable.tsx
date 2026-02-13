"use client";

import { useState } from "react";
import { AdminPaymentResponse, adminApi } from "@/server/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CreditCard,
  Eye,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

interface PaymentTableProps {
  payments: AdminPaymentResponse[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function PaymentTable({
  payments,
  isLoading,
  onRefresh,
}: PaymentTableProps) {
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] =
    useState<AdminPaymentResponse | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "success" | "warning" | "danger" | "default"
    > = {
      paid: "success",
      pending: "warning",
      failed: "danger",
      refunded: "default",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleRefund = async () => {
    if (!selectedPayment) return;

    try {
      setRefundingId(selectedPayment.id);
      await adminApi.refundPayment(selectedPayment.id, refundReason);
      alert("Payment marked as refunded successfully");
      setShowRefundModal(false);
      setRefundReason("");
      onRefresh();
    } catch (error) {
      console.error("Failed to refund payment:", error);
      alert("Failed to refund payment");
    } finally {
      setRefundingId(null);
      setSelectedPayment(null);
    }
  };

  const openRefundModal = (payment: AdminPaymentResponse) => {
    setSelectedPayment(payment);
    setShowRefundModal(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            Loading payments...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CreditCard
            size={48}
            className="mx-auto text-slate-400 dark:text-slate-600 mb-4"
          />
          <p className="text-slate-600 dark:text-slate-400">
            No payments found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-mono">
                      {payment.providerPaymentId?.substring(0, 16) || "N/A"}...
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {payment.user.firstName || payment.user.email}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {payment.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white capitalize">
                      {payment.provider}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {payment.status === "paid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openRefundModal(payment)}
                            disabled={refundingId === payment.id}
                          >
                            <RefreshCw
                              size={14}
                              className={
                                refundingId === payment.id
                                  ? "animate-spin"
                                  : ""
                              }
                            />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Refund Modal */}
      {showRefundModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={24} className="text-amber-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Refund Payment
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Are you sure you want to refund this payment? This will revoke
                the user's premium access.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Refund Reason (Optional)
                </label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reason for refund..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRefundModal(false);
                    setSelectedPayment(null);
                    setRefundReason("");
                  }}
                  disabled={refundingId !== null}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleRefund}
                  disabled={refundingId !== null}
                >
                  {refundingId ? "Processing..." : "Refund Payment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
