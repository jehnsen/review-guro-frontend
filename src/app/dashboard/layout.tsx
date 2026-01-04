import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | ReviewGuro",
  description: "Your personal Civil Service Exam review dashboard",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
