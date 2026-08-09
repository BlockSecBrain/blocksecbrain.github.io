import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlockSecBrain — Independent Cybersecurity Services",
    template: "%s | BlockSecBrain",
  },
  description:
    "Firmware, hardware, IoT/OT, cloud, and AI security assessments. We break things professionally — before attackers break your business. Unbiased, expert-driven security validation.",
  keywords: [
    "penetration testing",
    "firmware security",
    "IoT security",
    "OT security",
    "cloud security",
    "AI security",
    "LLM red teaming",
    "RED & CRA compliance",
    "IEC 62443",
    "security assessment",
  ],
  authors: [{ name: "BlockSecBrain" }],
  icons: {
    icon: "/logo-white.svg",
    apple: "/logo-white.svg",
  },
  openGraph: {
    title: "BlockSecBrain — Independent Cybersecurity Services",
    description:
      "Firmware, hardware, IoT/OT, cloud, and AI security assessments. Unbiased, expert-driven security validation.",
    siteName: "BlockSecBrain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
