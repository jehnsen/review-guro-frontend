"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminApi, AdminUserDetails } from "@/server/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  Crown,
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function AdminUserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [userDetails, setUserDetails] = useState<AdminUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Subscription form state
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState("");
  const [unlimitedAccess, setUnlimitedAccess] = useState(false);

  // Role form state
  const [selectedRole, setSelectedRole] = useState<"USER" | "ADMIN">("USER");

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await adminApi.getUser(userId);
        setUserDetails(response.data);
        setIsPremium(response.data.user.isPremium);
        setSelectedRole(response.data.user.role);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        alert("Failed to load user details. Redirecting to users list.");
        router.push("/admin/users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, router]);

  const handleGrantSubscription = async () => {
    if (!userDetails) return;

    try {
      setIsUpdating(true);

      await adminApi.grantSubscription(userId, {
        isPremium,
        premiumExpiry: unlimitedAccess ? null : premiumExpiry ? new Date(premiumExpiry) : undefined,
      });

      alert("Subscription updated successfully!");
      setShowSubscriptionModal(false);

      // Refresh user details
      const response = await adminApi.getUser(userId);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Failed to update subscription:", error);
      alert("Failed to update subscription. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeRole = async () => {
    if (!userDetails) return;

    const confirmMessage =
      selectedRole === "ADMIN"
        ? "Are you sure you want to promote this user to Admin? They will have full access to admin features."
        : "Are you sure you want to demote this user to regular User? They will lose admin privileges.";

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setIsUpdating(true);

      await adminApi.changeUserRole(userId, selectedRole);

      alert("User role updated successfully!");
      setShowRoleModal(false);

      // Refresh user details
      const response = await adminApi.getUser(userId);
      setUserDetails(response.data);
    } catch (error: unknown) {
      console.error("Failed to change role:", error);
      const message = error instanceof Error ? error.message : "Failed to change user role. Please try again.";
      alert(message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!userDetails) {
    return null;
  }

  const { user, stats, subscription } = userDetails;

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm" className="mb-3">
            <ArrowLeft size={16} className="mr-2" />
            Back to Users
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              User Details
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage user account and subscription
            </p>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </p>
                <p className="text-lg text-slate-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                {user.role === "ADMIN" && (
                  <Badge variant="primary" className="inline-flex items-center gap-1">
                    <Shield size={12} />
                    Admin
                  </Badge>
                )}
                {user.isPremium && (
                  <Badge variant="warning" className="inline-flex items-center gap-1">
                    <Crown size={12} />
                    Premium
                  </Badge>
                )}
                {user.emailVerified ? (
                  <Badge variant="success" className="inline-flex items-center gap-1">
                    <CheckCircle size={12} />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="danger" className="inline-flex items-center gap-1">
                    <XCircle size={12} />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </p>
                <p className="text-slate-900 dark:text-white">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                    : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Exam Date
                </p>
                <p className="text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(user.examDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Joined
                </p>
                <p className="text-slate-900 dark:text-white">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Last Active
                </p>
                <p className="text-slate-900 dark:text-white">
                  {formatDate(user.lastActivityDate)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Performance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Questions Answered
              </p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
                <Target size={20} />
                {stats.totalQuestions}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Accuracy
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
                <TrendingUp size={20} />
                {stats.accuracy.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
                🔥 {stats.currentStreak}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Mock Exams
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
                <Award size={20} />
                {stats.completedMockExams}/{stats.totalMockExams}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subscription Management</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSubscriptionModal(true)}
            >
              Manage Subscription
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Current Status
              </p>
              <p className="text-lg text-slate-900 dark:text-white">
                {user.isPremium ? "Season Pass (Premium)" : "Free Tier"}
              </p>
            </div>
            {user.isPremium && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Expires
                </p>
                <p className="text-lg text-slate-900 dark:text-white">
                  {user.premiumExpiry ? formatDate(user.premiumExpiry) : "Unlimited"}
                </p>
              </div>
            )}
            {subscription && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subscription Started
                </p>
                <p className="text-lg text-slate-900 dark:text-white">
                  {formatDate(subscription.purchaseDate)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role Management Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Role Management</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRoleModal(true)}
            >
              Change Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Role
            </p>
            {user.role === "ADMIN" ? (
              <Badge variant="primary" className="inline-flex items-center gap-1">
                <Shield size={14} />
                Administrator
              </Badge>
            ) : (
              <Badge variant="default">Regular User</Badge>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {user.role === "ADMIN"
                ? "This user has full access to admin features and can manage other users."
                : "This user has standard access to practice and exam features."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Manage Subscription
            </h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Grant Season Pass (Premium)
                  </span>
                </label>
              </div>
              {isPremium && (
                <>
                  <div>
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={unlimitedAccess}
                        onChange={(e) => setUnlimitedAccess(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Unlimited Access (No Expiry)
                      </span>
                    </label>
                  </div>
                  {!unlimitedAccess && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={premiumExpiry}
                        onChange={(e) => setPremiumExpiry(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleGrantSubscription}
                disabled={isUpdating}
                className="flex-1"
              >
                {isUpdating ? "Updating..." : "Update Subscription"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionModal(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Change User Role
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={selectedRole === "USER"}
                  onChange={(e) => setSelectedRole(e.target.value as "USER" | "ADMIN")}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">
                    Regular User
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Standard access to practice and exams
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={selectedRole === "ADMIN"}
                  onChange={(e) => setSelectedRole(e.target.value as "USER" | "ADMIN")}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield size={16} className="text-purple-600" />
                    Administrator
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Full access to admin features
                  </p>
                </div>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleChangeRole}
                disabled={isUpdating || selectedRole === user.role}
                className="flex-1"
              >
                {isUpdating ? "Updating..." : "Change Role"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRoleModal(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
