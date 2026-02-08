import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose your ReviewGuro plan. Get unlimited practice questions, AI tutoring, mock exams, and detailed analytics with Season Pass.",
  openGraph: {
    title: "Pricing | ReviewGuro",
    description:
      "Unlock unlimited Civil Service Exam preparation with Season Pass. AI tutoring, mock exams, and more.",
  },
  twitter: {
    title: "Pricing | ReviewGuro",
    description:
      "Unlock unlimited Civil Service Exam preparation with Season Pass.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
