import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Track your Civil Service Exam preparation progress. View your stats, streak, and performance across all categories.",
  openGraph: {
    title: "Dashboard | ReviewGuro",
    description:
      "Track your Civil Service Exam preparation progress. View your stats, streak, and performance.",
  },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
