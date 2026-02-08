import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your ReviewGuro account and continue your Civil Service Exam preparation journey.",
  openGraph: {
    title: "Sign In | ReviewGuro",
    description: "Sign in to your ReviewGuro account.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
