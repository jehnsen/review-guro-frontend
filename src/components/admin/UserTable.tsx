"use client";

import { AdminUserResponse } from "@/server/api";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Eye, Crown, Shield, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface UserTableProps {
  users: AdminUserResponse[];
  isLoading?: boolean;
}

export function UserTable({ users, isLoading }: UserTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No users found. Try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {user.email}
                    </p>
                    {(user.firstName || user.lastName) && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.firstName} {user.lastName}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {user.role === "ADMIN" ? (
                    <Badge variant="primary" className="inline-flex items-center gap-1">
                      <Shield size={12} />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="default">User</Badge>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    {user.isPremium && (
                      <Badge variant="warning" className="inline-flex items-center gap-1 w-fit">
                        <Crown size={12} />
                        Premium
                      </Badge>
                    )}
                    {user.emailVerified ? (
                      <Badge variant="success" className="inline-flex items-center gap-1 w-fit">
                        <CheckCircle size={12} />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="danger" className="inline-flex items-center gap-1 w-fit">
                        <XCircle size={12} />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-xs">
                    <p className="text-slate-600 dark:text-slate-400">
                      {user.totalQuestions} questions
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {user.accuracy.toFixed(1)}% accuracy
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(user.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye size={14} className="mr-1" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-700">
        {users.map((user) => (
          <div key={user.id} className="p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                {user.email}
              </p>
              {(user.firstName || user.lastName) && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {user.firstName} {user.lastName}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {user.role === "ADMIN" ? (
                  <Badge variant="primary" className="inline-flex items-center gap-1 text-xs">
                    <Shield size={10} />
                    Admin
                  </Badge>
                ) : (
                  <Badge variant="default" className="text-xs">User</Badge>
                )}
                {user.isPremium && (
                  <Badge variant="warning" className="inline-flex items-center gap-1 text-xs">
                    <Crown size={10} />
                    Premium
                  </Badge>
                )}
                {user.emailVerified ? (
                  <Badge variant="success" className="inline-flex items-center gap-1 text-xs">
                    <CheckCircle size={10} />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="danger" className="inline-flex items-center gap-1 text-xs">
                    <XCircle size={10} />
                    Unverified
                  </Badge>
                )}
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                <p>{user.totalQuestions} questions • {user.accuracy.toFixed(1)}% accuracy</p>
                <p>Joined {formatDate(user.createdAt)}</p>
              </div>
            </div>
            <Link href={`/admin/users/${user.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                <Eye size={14} className="mr-1" />
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
