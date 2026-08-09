// Pricing configuration for the Hybrid pay-per-finding model.
// These are the authoritative rates — the single source of truth for all
// pricing display and calculation across the site.

export type Severity = "critical" | "high" | "medium" | "low";

export interface SeverityPricing {
  label: string;
  rate: number;
  color: string; // tailwind text color class for severity
  defaultCount: number;
  min: number;
  max: number;
}

export const PRICING: Record<Severity, SeverityPricing> = {
  critical: {
    label: "Critical",
    rate: 1800,
    color: "sev-critical",
    defaultCount: 1,
    min: 0,
    max: 20,
  },
  high: {
    label: "High",
    rate: 1400,
    color: "sev-high",
    defaultCount: 3,
    min: 0,
    max: 30,
  },
  medium: {
    label: "Medium",
    rate: 800,
    color: "sev-medium",
    defaultCount: 5,
    min: 0,
    max: 50,
  },
  low: {
    label: "Low",
    rate: 200,
    color: "sev-low",
    defaultCount: 4,
    min: 0,
    max: 50,
  },
};

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US");
}
