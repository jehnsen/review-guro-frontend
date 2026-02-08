import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Exam",
  description:
    "Take full-length Civil Service Exam mock tests with real exam timing. Simulate actual exam conditions and track your readiness.",
  openGraph: {
    title: "Mock Exam | ReviewGuro",
    description:
      "Simulate real Civil Service Exam conditions with timed mock tests and detailed results analysis.",
  },
  twitter: {
    title: "Mock Exam | ReviewGuro",
    description:
      "Simulate real Civil Service Exam conditions with timed mock tests.",
  },
};

export default function MockExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
