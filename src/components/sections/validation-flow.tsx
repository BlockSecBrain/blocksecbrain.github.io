import {
  Target,
  Search,
  FileSearch,
  Crosshair,
  ShieldCheck,
  FileText,
  RefreshCw,
  Scale,
  UserCheck,
  Ban,
} from "lucide-react";

const FLOW_STEPS = [
  {
    icon: Target,
    title: "Scope",
    desc: "Targets, depth, and rules of engagement agreed in writing.",
  },
  {
    icon: Search,
    title: "Discover",
    desc: "Attack surface mapped across the agreed environment.",
  },
  {
    icon: FileSearch,
    title: "Analyze",
    desc: "Manual review of logic, controls, and trust boundaries.",
  },
  {
    icon: Crosshair,
    title: "Exploit",
    desc: "Controlled exploitation to prove real-world impact.",
  },
  {
    icon: ShieldCheck,
    title: "Validate",
    desc: "Independently reproduced and evidenced before it counts.",
  },
  {
    icon: FileText,
    title: "Report",
    desc: "Risk-rated findings with remediation guidance.",
  },
  {
    icon: RefreshCw,
    title: "Retest",
    desc: "Every fix re-tested to confirm the issue is closed.",
  },
];

const ASSURANCES = [
  {
    icon: UserCheck,
    title: "Independent review",
    desc: "Every submitted vulnerability is independently reviewed and validated by BlockSecBrain before it becomes a verified finding.",
  },
  {
    icon: Scale,
    title: "No incentive to inflate",
    desc: "Researchers are not compensated based on the number or severity of vulnerabilities they report.",
  },
  {
    icon: Ban,
    title: "Unproven issues are not billed",
    desc: "Scanner output, duplicates, theoretical issues, and anything we cannot reproduce never become billable findings.",
  },
];

export function ValidationFlow() {
  return (
    <div className="space-y-10">
      {/* Process flow */}
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {FLOW_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="relative rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-primary/50"
          >
            <div className="mb-2 flex items-center gap-2">
              <step.icon className="size-4 shrink-0 text-primary" />
              <span className="font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-sm font-semibold">{step.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>

      {/* Validation assurances */}
      <div className="grid gap-4 md:grid-cols-3">
        {ASSURANCES.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-primary/25 bg-primary/5 p-5"
          >
            <item.icon className="mb-3 size-5 text-primary" />
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
