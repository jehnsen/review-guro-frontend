"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  Mail,
  Calendar,
  Clock,
  Volume2,
  Eye,
  Smartphone,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge, Input } from "@/components/ui";
import { useTheme } from "@/contexts/ThemeContext";
import { mockUser } from "@/lib/mock-data";

type SettingsTab = "profile" | "preferences" | "notifications" | "subscription" | "security";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [dailyGoal, setDailyGoal] = useState(25);
  const [studyReminder, setStudyReminder] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "preferences" as const, label: "Preferences", icon: Globe },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "subscription" as const, label: "Subscription", icon: CreditCard },
    { id: "security" as const, label: "Security", icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                defaultValue={mockUser.firstName}
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                defaultValue={mockUser.lastName}
                placeholder="Enter last name"
              />
              <Input
                label="Email Address"
                type="email"
                defaultValue={mockUser.email}
                placeholder="Enter email"
                icon={Mail}
              />
              <Input
                label="Exam Date"
                type="date"
                defaultValue={mockUser.examDate.split("T")[0]}
                icon={Calendar}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button>Save Changes</Button>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            {/* Theme */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Appearance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === "light"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Sun size={24} className="text-amber-500" />
                    </div>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-white">Light</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Clean and bright
                  </p>
                  {theme === "light" && (
                    <div className="mt-2">
                      <Badge variant="primary" size="sm">
                        <Check size={12} className="mr-1" /> Active
                      </Badge>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === "dark"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <Moon size={24} className="text-slate-300" />
                    </div>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-white">Dark</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Easy on the eyes
                  </p>
                  {theme === "dark" && (
                    <div className="mt-2">
                      <Badge variant="primary" size="sm">
                        <Check size={12} className="mr-1" /> Active
                      </Badge>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Daily Goal
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <span className="w-20 text-center font-semibold text-slate-900 dark:text-white">
                  {dailyGoal} questions
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Set your daily practice goal
              </p>
            </div>

            {/* Study Preferences */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Study Preferences
              </h3>
              <div className="space-y-4">
                <ToggleOption
                  icon={Eye}
                  label="Show explanations after each question"
                  description="Automatically display explanations after answering"
                  checked={showExplanations}
                  onChange={setShowExplanations}
                />
                <ToggleOption
                  icon={Volume2}
                  label="Sound effects"
                  description="Play sounds for correct/incorrect answers"
                  checked={soundEffects}
                  onChange={setSoundEffects}
                />
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                <ToggleOption
                  icon={Mail}
                  label="Weekly progress report"
                  description="Receive a summary of your weekly progress"
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
                <ToggleOption
                  icon={Calendar}
                  label="Exam reminders"
                  description="Get reminded as your exam date approaches"
                  checked={true}
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Push Notifications */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Study Reminders
              </h3>
              <div className="space-y-4">
                <ToggleOption
                  icon={Clock}
                  label="Daily study reminder"
                  description="Get reminded to study at your preferred time"
                  checked={studyReminder}
                  onChange={setStudyReminder}
                />
                {studyReminder && (
                  <div className="ml-12">
                    <Input
                      label="Reminder Time"
                      type="time"
                      defaultValue="09:00"
                      className="max-w-xs"
                    />
                  </div>
                )}
                <ToggleOption
                  icon={Smartphone}
                  label="Push notifications"
                  description="Receive notifications on your device"
                  checked={true}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        );

      case "subscription":
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white">Current Plan</Badge>
                <Badge className="bg-emerald-500 text-white">Active</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">Season Pass</h3>
              <p className="text-blue-100 mb-4">
                Full access to all features until you pass
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">₱399</span>
                <span className="text-blue-200">one-time payment</span>
              </div>
            </div>

            {/* Plan Features */}
            <Card>
              <CardTitle className="mb-4">Your Plan Includes</CardTitle>
              <div className="space-y-3">
                {[
                  "50,000+ practice questions",
                  "AI Tutor - unlimited questions",
                  "Detailed explanations",
                  "Progress tracking & analytics",
                  "Timed mock exams",
                  "Mobile-friendly access",
                  "Valid until you pass",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Billing Info */}
            <Card>
              <CardTitle className="mb-4">Billing Information</CardTitle>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Purchase Date</span>
                  <span className="text-slate-900 dark:text-white">November 1, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Payment Method</span>
                  <span className="text-slate-900 dark:text-white">GCash</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Amount Paid</span>
                  <span className="text-slate-900 dark:text-white">₱399.00</span>
                </div>
              </div>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            {/* Change Password */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Change Password
              </h3>
              <div className="space-y-4 max-w-md">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                />
                <Button>Update Password</Button>
              </div>
            </div>

            {/* Sessions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Smartphone size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Current Device
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Chrome on macOS • Active now
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Current</Badge>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-4">
                Danger Zone
              </h3>
              <Card className="border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-rose-900 dark:text-rose-100">
                      Delete Account
                    </p>
                    <p className="text-sm text-rose-700 dark:text-rose-300">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <Card padding="sm">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="mt-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <HelpCircle size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Need Help?</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Contact our support team for assistance.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Contact Support
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="flex-1">
            <CardTitle className="mb-6">
              {tabs.find((t) => t.id === activeTab)?.label}
            </CardTitle>
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Toggle Option Component
function ToggleOption({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: typeof Bell;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-slate-600 dark:text-slate-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{label}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
          <button
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                checked ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
