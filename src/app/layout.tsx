import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ReviewGuro - AI-Powered Civil Service Exam Reviewer",
  description:
    "Pass your Civil Service Exam with confidence. AI-powered tutoring, practice questions, and mock exams designed for Filipino government job seekers.",
  keywords: [
    "civil service exam",
    "CSE reviewer",
    "Philippine government exam",
    "career service exam",
    "AI tutor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
