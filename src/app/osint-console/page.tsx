import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Terminal, Info } from "lucide-react";
import { OsintConsole } from "@/components/sections/osint-console";

export const metadata: Metadata = {
  title: "OSINT Console — Attack-Surface Discovery",
  description:
    "Enter a domain, IP, ASN, or email. The console detects the type and fires every passive intelligence module at once — DNS, WHOIS, Shodan ports, certificate transparency, subdomains, email security, and tech stack fingerprinting.",
};

export default function OsintConsolePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Terminal className="size-5 text-primary" />
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
            Live OSINT Console
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Attack-surface discovery, with real data
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Enter a domain, IP, ASN, or email. The console detects the type and
          fires every passive intelligence module at once — real DNS records,
          WHOIS, Shodan ports, certificate transparency, subdomains, email
          security, tech stack, and more.
        </p>
      </div>

      <OsintConsole />

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-border/60 bg-card/30 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium">Passive intelligence only</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This console uses passive, publicly-available data sources only — no
            active scanning or intrusive probing of the target. It is intended
            for reconnaissance and attack-surface awareness on assets you own or
            are authorised to assess.
          </p>
        </div>
      </div>
    </div>
  );
}
