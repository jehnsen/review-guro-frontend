import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Mode",
  description:
    "Practice Civil Service Exam questions by category. Verbal Ability, Numerical Ability, Analytical Ability, and more with instant feedback.",
  openGraph: {
    title: "Practice Mode | ReviewGuro",
    description:
      "Practice Civil Service Exam questions by category with AI-powered explanations and instant feedback.",
  },
  twitter: {
    title: "Practice Mode | ReviewGuro",
    description:
      "Practice Civil Service Exam questions by category with instant feedback.",
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
