import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trần Thới Long - Fullstack Developer Portfolio",
  description: "Professional portfolio of Trần Thới Long - A passionate Fullstack Developer specializing in React, Next.js, and modern web technologies",
  keywords: ["Fullstack Developer", "React Developer", "Next.js", "Web Development", "Software Engineer", "Trần Thới Long"],
  authors: [{ name: "Trần Thới Long" }],
  openGraph: {
    title: "Trần Thới Long - Fullstack Developer",
    description: "Professional portfolio showcasing fullstack development projects and expertise",
    url: "https://your-domain.com",
    siteName: "Trần Thới Long Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trần Thới Long - Fullstack Developer",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Thới Long - Fullstack Developer",
    description: "Professional portfolio showcasing fullstack development projects and expertise",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      <Toaster />
      </body>
    </html>
  );
}
