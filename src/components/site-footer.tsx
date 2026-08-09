"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SITE,
  FOOTER_SERVICES,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              { }
              <img
                src="/logo-white.svg"
                alt=""
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold tracking-tight">
                Block<span className="text-primary">Sec</span>Brain
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Independent cybersecurity specialists. Firmware, hardware, cloud,
              and AI security assessments — with zero vendor bias.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              Accepting Q3 engagements
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Services</h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2">
              {FOOTER_COMPANY.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <ul className="mb-5 space-y-2">
              {FOOTER_LEGAL.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
              >
                <Mail className="size-3.5" />
                {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3.5" />
                Response within 24h
              </div>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/#contact">
                  Request assessment
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">{SITE.copyright}</p>
          <p className="text-xs text-muted-foreground">{SITE.taglineLong}</p>
        </div>
      </div>
    </footer>
  );
}
