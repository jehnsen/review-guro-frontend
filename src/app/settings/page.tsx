"use client";

import { useState, useEffect, useRef } from "react";
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
  Loader2,
  Camera,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge, Input } from "@/components/ui";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  profileApi,
  settingsApi,
  securityApi,
  subscriptionApi,
  UserProfile,
  UserSettings,
  Subscription,
  ThemePreference,
  API_BASE_URL,
} from "@/lib/api";

type SettingsTab = "profile" | "preferences" | "notifications" | "subscription" | "security";

// Helper to get full image URL
const getImageUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  // If it's already a full URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Get base URL without /api suffix for static files
  const baseUrl = API_BASE_URL.replace(/\/api$/, "");
  return `${baseUrl}${url}`;
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [examDate, setExamDate] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings state
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [dailyGoal, setDailyGoal] = useState(25);
  const [showExplanations, setShowExplanations] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  // Notification state
  const [weeklyProgressReport, setWeeklyProgressReport] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [dailyStudyReminder, setDailyStudyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [pushNotifications, setPushNotifications] = useState(true);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Subscription state
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Track if data has been fetched
  const hasFetched = useRef(false);

  // Fetch initial data
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const [profileRes, settingsRes, subscriptionRes] = await Promise.all([
          profileApi.getProfile().catch(() => null),
          settingsApi.getSettings().catch(() => null),
          subscriptionApi.getSubscription().catch(() => null),
        ]);

        if (profileRes?.data) {
          setProfile(profileRes.data);
          setFirstName(profileRes.data.firstName);
          setLastName(profileRes.data.lastName);
          setExamDate(profileRes.data.examDate?.split("T")[0] || "");
        }

        if (settingsRes?.data) {
          setSettings(settingsRes.data);
          // Safely access nested properties with defaults
          const studyPrefs = settingsRes.data.studyPreferences || {};
          const notifs = settingsRes.data.notifications || {};

          setDailyGoal(studyPrefs.dailyGoal ?? 25);
          setShowExplanations(studyPrefs.showExplanations ?? true);
          setSoundEffects(studyPrefs.soundEffects ?? true);
          setWeeklyProgressReport(notifs.weeklyProgressReport ?? true);
          setExamReminders(notifs.examReminders ?? true);
          setDailyStudyReminder(notifs.dailyStudyReminder ?? true);
          setReminderTime(notifs.reminderTime || "09:00");
          setPushNotifications(notifs.pushNotifications ?? true);
        }

        if (subscriptionRes?.data) {
          setSubscription(subscriptionRes.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Save profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await profileApi.updateProfile({
        firstName,
        lastName,
        examDate: examDate || undefined,
      });
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Upload photo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await profileApi.uploadPhoto(file);
      if (response.data?.photoUrl && profile) {
        setProfile({ ...profile, photoUrl: response.data.photoUrl });
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  // Update theme
  const handleThemeChange = async (newTheme: ThemePreference) => {
    setTheme(newTheme);
    try {
      await settingsApi.updateAppearance({ theme: newTheme });
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  // Update daily goal
  const handleDailyGoalChange = async (value: number) => {
    setDailyGoal(value);
  };

  const handleDailyGoalSave = async () => {
    try {
      await settingsApi.updateDailyGoal(dailyGoal);
    } catch (error) {
      console.error("Error updating daily goal:", error);
    }
  };

  // Update study preferences
  const handleStudyPreferenceChange = async (key: "showExplanations" | "soundEffects", value: boolean) => {
    if (key === "showExplanations") setShowExplanations(value);
    if (key === "soundEffects") setSoundEffects(value);

    try {
      await settingsApi.updateStudyPreferences({ [key]: value });
    } catch (error) {
      console.error("Error updating study preferences:", error);
    }
  };

  // Update notifications
  const handleNotificationChange = async (
    key: keyof typeof notificationState,
    value: boolean | string
  ) => {
    const notificationState = {
      weeklyProgressReport,
      examReminders,
      dailyStudyReminder,
      reminderTime,
      pushNotifications,
    };

    // Update local state
    switch (key) {
      case "weeklyProgressReport":
        setWeeklyProgressReport(value as boolean);
        break;
      case "examReminders":
        setExamReminders(value as boolean);
        break;
      case "dailyStudyReminder":
        setDailyStudyReminder(value as boolean);
        break;
      case "reminderTime":
        setReminderTime(value as string);
        break;
      case "pushNotifications":
        setPushNotifications(value as boolean);
        break;
    }

    try {
      await settingsApi.updateNotifications({ [key]: value });
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsSaving(true);
    try {
      await securityApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError("Failed to update password. Please check your current password.");
    } finally {
      setIsSaving(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await securityApi.signOut();
      logout();
    } catch (error) {
      console.error("Error signing out:", error);
      logout();
    }
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "preferences" as const, label: "Preferences", icon: Globe },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "subscription" as const, label: "Subscription", icon: CreditCard },
    { id: "security" as const, label: "Security", icon: Shield },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }

    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
                  {profile?.photoUrl ? (
                    <img
                      src={getImageUrl(profile.photoUrl)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {profile?.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
              <Input
                label="Email Address"
                type="email"
                value={profile?.email || ""}
                disabled
                icon={Mail}
              />
              <Input
                label="Exam Date"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                icon={Calendar}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button onClick={handleSaveProfile} isLoading={isSaving}>
                Save Changes
              </Button>
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
                  onClick={() => handleThemeChange("light")}
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
                  onClick={() => handleThemeChange("dark")}
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
                  onChange={(e) => handleDailyGoalChange(Number(e.target.value))}
                  onMouseUp={handleDailyGoalSave}
                  onTouchEnd={handleDailyGoalSave}
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
                  onChange={(value) => handleStudyPreferenceChange("showExplanations", value)}
                />
                <ToggleOption
                  icon={Volume2}
                  label="Sound effects"
                  description="Play sounds for correct/incorrect answers"
                  checked={soundEffects}
                  onChange={(value) => handleStudyPreferenceChange("soundEffects", value)}
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
                  checked={weeklyProgressReport}
                  onChange={(value) => handleNotificationChange("weeklyProgressReport", value)}
                />
                <ToggleOption
                  icon={Calendar}
                  label="Exam reminders"
                  description="Get reminded as your exam date approaches"
                  checked={examReminders}
                  onChange={(value) => handleNotificationChange("examReminders", value)}
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
                  checked={dailyStudyReminder}
                  onChange={(value) => handleNotificationChange("dailyStudyReminder", value)}
                />
                {dailyStudyReminder && (
                  <div className="ml-12">
                    <Input
                      label="Reminder Time"
                      type="time"
                      value={reminderTime}
                      onChange={(e) => handleNotificationChange("reminderTime", e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                )}
                <ToggleOption
                  icon={Smartphone}
                  label="Push notifications"
                  description="Receive notifications on your device"
                  checked={pushNotifications}
                  onChange={(value) => handleNotificationChange("pushNotifications", value)}
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
                <Badge
                  className={
                    subscription?.status === "PREMIUM"
                      ? "bg-emerald-500 text-white"
                      : subscription?.status === "EXPIRED"
                        ? "bg-rose-500 text-white"
                        : "bg-slate-500 text-white"
                  }
                >
                  {subscription?.status || "FREE"}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {subscription?.plan || "Free Plan"}
              </h3>
              <p className="text-blue-100 mb-4">
                {subscription?.status === "PREMIUM"
                  ? "Full access to all features"
                  : "Upgrade to unlock all features"}
              </p>
              {subscription?.status === "PREMIUM" && subscription?.expiresAt && (
                <p className="text-sm text-blue-200">
                  Valid until: {new Date(subscription.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Plan Features */}
            <Card>
              <CardTitle className="mb-4">
                {subscription?.status === "PREMIUM" ? "Your Plan Includes" : "Premium Features"}
              </CardTitle>
              <div className="space-y-3">
                {(subscription?.features || [
                  "50,000+ practice questions",
                  "AI Tutor - unlimited questions",
                  "Detailed explanations",
                  "Progress tracking & analytics",
                  "Timed mock exams",
                  "Mobile-friendly access",
                  "Valid until you pass",
                ]).map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {subscription?.status !== "PREMIUM" && (
              <Button fullWidth size="lg">
                Upgrade to Premium - P399
              </Button>
            )}
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {passwordError && (
                  <p className="text-sm text-rose-600 dark:text-rose-400">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{passwordSuccess}</p>
                )}
                <Button onClick={handleChangePassword} isLoading={isSaving}>
                  Update Password
                </Button>
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
                        Active now
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
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                >
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
