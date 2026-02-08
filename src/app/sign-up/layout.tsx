import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Join ReviewGuro and start your Civil Service Exam preparation. Free access to practice questions and study tools.",
  openGraph: {
    title: "Create Account | ReviewGuro",
    description:
      "Join ReviewGuro and start your Civil Service Exam preparation for free.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
