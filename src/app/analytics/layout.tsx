import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "View detailed analytics of your Civil Service Exam preparation. Track strengths, weaknesses, and get AI-powered study insights.",
  openGraph: {
    title: "Analytics | ReviewGuro",
    description:
      "Get AI-powered insights into your Civil Service Exam preparation progress.",
  },
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
