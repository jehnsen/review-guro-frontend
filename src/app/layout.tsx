import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reviewguro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReviewGuro - AI-Powered Civil Service Exam Reviewer",
    template: "%s | ReviewGuro",
  },
  description:
    "Pass your Civil Service Exam with confidence. AI-powered tutoring, practice questions, and mock exams designed for Filipino government job seekers.",
  keywords: [
    "civil service exam",
    "CSE reviewer",
    "Philippine government exam",
    "career service exam",
    "AI tutor",
    "civil service reviewer",
    "CSE practice test",
    "Philippine civil service",
    "government job exam",
    "career service professional",
    "sub-professional exam",
  ],
  authors: [{ name: "ReviewGuro" }],
  creator: "ReviewGuro",
  publisher: "ReviewGuro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: "ReviewGuro",
    title: "ReviewGuro - AI-Powered Civil Service Exam Reviewer",
    description:
      "Pass your Civil Service Exam with confidence. AI-powered tutoring, practice questions, and mock exams designed for Filipino government job seekers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReviewGuro - AI-Powered Civil Service Exam Reviewer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewGuro - AI-Powered Civil Service Exam Reviewer",
    description:
      "Pass your Civil Service Exam with confidence. AI-powered tutoring, practice questions, and mock exams.",
    images: ["/og-image.png"],
    creator: "@reviewguro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
