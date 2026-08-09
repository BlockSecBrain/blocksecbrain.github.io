"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  PRICING,
  SEVERITY_ORDER,
  formatCurrency,
  type Severity,
} from "@/lib/pricing";

export function PricingEstimator() {
  const [counts, setCounts] = React.useState<Record<Severity, number>>({
    critical: PRICING.critical.defaultCount,
    high: PRICING.high.defaultCount,
    medium: PRICING.medium.defaultCount,
    low: PRICING.low.defaultCount,
  });

  const lineItems = SEVERITY_ORDER.map((sev) => ({
    sev,
    count: counts[sev],
    rate: PRICING[sev].rate,
    total: counts[sev] * PRICING[sev].rate,
  }));

  const grandTotal = lineItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Sliders */}
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Adjust the expected finding counts to estimate your Hybrid engagement
          cost. You pay only for vulnerabilities that BlockSecBrain has
          independently reviewed and reproduced.
        </p>
        {SEVERITY_ORDER.map((sev) => {
          const config = PRICING[sev];
          const value = counts[sev];
          return (
            <div key={sev} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label} · ${formatCurrency(config.rate)}/finding
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums">
                  {value}
                </span>
              </div>
              <Slider
                value={[value]}
                min={config.min}
                max={config.max}
                step={1}
                onValueChange={(v) =>
                  setCounts((prev) => ({ ...prev, [sev]: v[0] }))
                }
                aria-label={`${config.label} finding count`}
              />
            </div>
          );
        })}
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Estimated cost
        </p>
        <p className="mb-4 font-mono text-3xl font-bold tabular-nums">
          ${formatCurrency(grandTotal)}{" "}
          <span className="text-base font-normal text-muted-foreground">
            USD · illustrative
          </span>
        </p>
        <div className="space-y-2 border-t border-border/40 pt-4">
          {lineItems.map((item) => (
            <div
              key={item.sev}
              className="flex items-center justify-between text-sm"
            >
              <span className={PRICING[item.sev].color}>
                {PRICING[item.sev].label} × {item.count}
              </span>
              <span className="font-mono tabular-nums text-foreground/80">
                ${formatCurrency(item.total)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Final pricing is confirmed after a scope walkthrough. If no
          vulnerabilities are verified, you pay only the minimum engagement fee
          agreed in writing during scoping.
        </p>
        <Button asChild className="mt-4 w-full cyber-glow">
          <a href="/#contact">
            Get a precise quote
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
