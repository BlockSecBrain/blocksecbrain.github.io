import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Car,
  Factory,
  HeartPulse,
  Cloud,
  Building2,
  Terminal,
  Wrench,
  Search,
  BookOpen,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingEstimator } from "@/components/sections/pricing-estimator";
import { ValidationFlow } from "@/components/sections/validation-flow";
import { ContactForm } from "@/components/sections/contact-form";
import { SecurityGlossary } from "@/components/sections/security-glossary";
import { SelfAssessment } from "@/components/sections/self-assessment";
import { SERVICES } from "@/lib/services";
import {
  SITE,
  STATS,
  INDUSTRIES,
  CAPABILITIES,
  TOOL_GROUPS,
} from "@/lib/site";

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  car: Car,
  factory: Factory,
  cpu: Cpu,
  "heart-pulse": HeartPulse,
  cloud: Cloud,
  building: Building2,
};

const FAQ_ITEMS = [
  {
    q: "Are you really vendor-independent?",
    a: "Yes. We sell no hardware, software, or vendor products — ever. We take no referral fees or commissions. Every recommendation is based solely on what reduces your risk, not what generates a sale.",
  },
  {
    q: "How fast can you start an engagement?",
    a: "Most engagements start within 1–2 weeks of a signed scope. For critical situations, we can begin within 24–48 hours. Book a scoping call and we'll confirm availability immediately.",
  },
  {
    q: "Do you sign NDAs and follow OPSEC?",
    a: "Yes. We sign mutual NDAs before any technical discussion, follow strict OPSEC throughout the engagement, and restrict access to your data to the senior researchers running the assessment.",
  },
  {
    q: "Is a verification retest included after we patch?",
    a: "Yes. Once your team has patched the reported findings, we re-test every remediated issue to confirm the fix is effective and the vulnerability is genuinely closed. Post-remediation retesting is offered at a reduced rate confirmed during scoping, with no hidden fees. We don't impose an arbitrary time limit, because patching timelines vary and new vulnerabilities emerge continuously.",
  },
  {
    q: "Can you map findings to our compliance frameworks?",
    a: "Yes. We map findings to your specific frameworks — CRA, RED, IEC 62443, ISO 27001, NIST CSF, OWASP, and others — in a single engagement, so you get compliance evidence alongside technical findings.",
  },
  {
    q: "How does the Hybrid 'pay-per-finding' model actually work?",
    a: "You pay for verified vulnerabilities, priced per severity. A vulnerability becomes billable only after BlockSecBrain has independently reviewed it, reproduced it, and documented proof-of-concept evidence — unreproducible or duplicate issues are never charged. If no verified vulnerabilities are found, you pay only the agreed minimum engagement fee, which is set in writing during scoping before testing begins.",
  },
  {
    q: "What counts as a 'verified' vulnerability?",
    a: "A finding is verified only when it has been independently reproduced by BlockSecBrain against the agreed scope and documented with proof-of-concept evidence and a severity rating. Scanner output, theoretical issues, duplicates, and findings we cannot reproduce do not qualify and are never billed.",
  },
];

const PIPELINE_STEPS = [
  {
    num: "01",
    title: "Scoping & Recon",
    desc: "Define targets, depth, timing, safety constraints, and escalation paths before testing begins.",
  },
  {
    num: "02",
    title: "AI-Assisted Discovery",
    desc: "Accelerate recon, highlight likely abuse paths, and correlate signals across binaries, apps, telemetry, and docs.",
  },
  {
    num: "03",
    title: "Firmware & Hardware Analysis",
    desc: "Review extracted filesystems, boot logic, hardcoded material, binary protections, and hardware interfaces.",
  },
  {
    num: "04",
    title: "Threat Intelligence Correlation",
    desc: "Map issues to exploitability, known attacker patterns, supply-chain exposure, and business-specific blast radius.",
  },
  {
    num: "05",
    title: "Executive Security Reporting",
    desc: "Risk-rated remediation guidance, proof-of-concept evidence, and sections tailored for both technical and leadership teams.",
  },
];

const PRICING_TIERS = [
  {
    name: "Standard Security Testing",
    badge: "ENTERPRISE GRADE",
    desc: "Full-cycle security testing with transparent pricing after a scope walkthrough. Suitable for well-defined applications and enterprise-grade systems.",
    features: [
      "Full test planning, execution, and reporting",
      "Covers OWASP Top 10 and SANS 25",
      "Custom business-logic flaw testing",
      "Transparent pricing after scope walkthrough",
      "Ideal for enterprise-grade systems",
    ],
    cta: "Request Scope",
    href: "/#contact",
    popular: false,
  },
  {
    name: "Hybrid Security Testing",
    badge: "BEST VALUE",
    desc: "Outcome-based assessment. You pay for verified vulnerabilities — each one independently reviewed and reproduced by BlockSecBrain before it becomes a billable finding.",
    features: [
      "Pay per verified, reproduced finding",
      "Web, mobile, API, and infrastructure testing",
      "Source code and wildcard domain coverage",
      "Scalable to any budget or team size",
      "Post-remediation retest at a reduced rate",
    ],
    cta: "Start Hybrid Assessment",
    href: "/#contact",
    popular: true,
  },
  {
    name: "Offensive Security Testing",
    badge: "ADVERSARY SIMULATION",
    desc: "Combines external attacker simulation with insider insights. Flexible post-assessment billing for mature applications needing deeper privilege and business-logic validation.",
    features: [
      "External attacker simulation",
      "Internal logic validation",
      "Deep privilege escalation testing",
      "Flexible post-assessment billing",
      "Ideal for mature, complex applications",
    ],
    cta: "Discuss Advanced Testing",
    href: "/#contact",
    popular: false,
  },
];

const COMPARISON_ROWS = [
  {
    category: "Independence",
    feature: "Sells hardware or software products",
    blocksecbrain: "Never",
    typicalVendor: "Often",
    reseller: "Always",
  },
  {
    category: "Independence",
    feature: "Takes vendor referral fees / commissions",
    blocksecbrain: "Never",
    typicalVendor: "Sometimes",
    reseller: "Always",
  },
  {
    category: "Independence",
    feature: "Recommendations tied to a sales quota",
    blocksecbrain: "Never",
    typicalVendor: "Often",
    reseller: "Always",
  },
  {
    category: "Expertise",
    feature: "Every engagement led by senior researchers",
    blocksecbrain: "Always",
    typicalVendor: "Sometimes",
    reseller: "Rarely",
  },
  {
    category: "Expertise",
    feature: "Manual proof-of-concept for every finding",
    blocksecbrain: "100%",
    typicalVendor: "Mixed",
    reseller: "Rarely",
  },
  {
    category: "Expertise",
    feature: "Firmware / hardware / IoT-OT depth",
    blocksecbrain: "Full",
    typicalVendor: "Limited",
    reseller: "None",
  },
  {
    category: "Expertise",
    feature: "AI / LLM red-teaming capability",
    blocksecbrain: "Full",
    typicalVendor: "Emerging",
    reseller: "None",
  },
  {
    category: "Delivery",
    feature: "Critical-vulnerability SLA",
    blocksecbrain: "< 24h",
    typicalVendor: "3–7 days",
    reseller: "Varies",
  },
  {
    category: "Delivery",
    feature: "Post-remediation retest",
    blocksecbrain: "Minimal charge",
    typicalVendor: "Paid add-on",
    reseller: "None",
  },
  {
    category: "Delivery",
    feature: "Multi-framework compliance mapping (one engagement)",
    blocksecbrain: "Yes",
    typicalVendor: "Sometimes",
    reseller: "No",
  },
  {
    category: "Value",
    feature: "Pay-per-finding (Hybrid) model",
    blocksecbrain: "Yes",
    typicalVendor: "No",
    reseller: "No",
  },
  {
    category: "Value",
    feature: "Transparent pricing after scope walkthrough",
    blocksecbrain: "Yes",
    typicalVendor: "Sometimes",
    reseller: "Rarely",
  },
];

function SectionHeading({
  label,
  title,
  desc,
  className,
}: {
  label?: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className ?? ""}`}>
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}

function HeroTerminal() {
  return (
    <div className="relative">
      {/* Ambient glow behind terminal */}
      <div className="glow-blue pointer-events-none absolute -inset-8 -z-10 blur-2xl" />

      {/* Terminal window */}
      <div className="relative rounded-2xl border border-primary/20 bg-card/60 p-1 backdrop-blur-xl cyber-glow">
        <div className="rounded-xl bg-[#070b14]/90 p-4">
          {/* Title bar */}
          <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/10 pb-2 font-mono text-xs text-muted-foreground">
            <span>blocksecbrain — sample report output</span>
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
              Illustrative
            </span>
          </div>
          {/* Terminal content */}
          <div className="space-y-1 font-mono text-xs leading-relaxed">
            <div>
              <span className="text-emerald-400">$</span>{" "}
              <span className="text-foreground">blocksecbrain scan</span>{" "}
              <span className="text-foreground/70">--target=acme.io</span>{" "}
              <span className="text-foreground/70">--depth=full</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">▸</span> Scope agreed &amp; rules of engagement confirmed
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">▸</span> Recon: DNS, WHOIS, cert transparency, subdomains
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">▸</span> Firmware extraction &amp; binary analysis
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">▸</span> Cloud IAM attack-path mapping
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">▸</span> LLM red-team: prompt injection &amp; tool-call abuse
            </div>
            <div className="mt-2 text-muted-foreground">
              Findings independently reproduced and rated:
            </div>
            <div className="pl-3">
              <span className="sev-critical">[!!] CRITICAL</span>{" "}
              <span className="text-foreground">Boot chain signature bypass</span>
            </div>
            <div className="pl-3">
              <span className="sev-high">[!!] HIGH</span>{" "}
              <span className="text-foreground">IAM privilege escalation path</span>
            </div>
            <div className="pl-3">
              <span className="sev-medium">[!] MEDIUM</span>{" "}
              <span className="text-foreground">Prompt injection via RAG</span>
            </div>
            <div className="pl-3">
              <span className="sev-low">[*] LOW</span>{" "}
              <span className="text-foreground">Verbose error in /api/v2</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
              <span>
                <span className="text-emerald-400">[✓]</span>{" "}
                <span className="text-foreground">
                  Every finding evidenced with a proof-of-concept
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <ShieldCheck className="size-3" />
          Independent Security Validation
        </span>
        <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
          Firmware
        </span>
        <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
          IoT / OT
        </span>
        <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
          Cloud
        </span>
        <span className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
          AI Security
        </span>
      </div>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Assessment Pipeline · Scope → Test → Validate → Report
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />
        {/* Radial glows */}
        <div className="glow-blue pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl" />
        <div className="glow-cyan pointer-events-none absolute -right-20 top-40 h-[24rem] w-[24rem] rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="container relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left: text */}
            <div className="lg:col-span-7">
              <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-primary">
                BLOCKSECBRAIN // Independent Cybersecurity Services
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
                We break things{" "}
                <span className="text-glow text-primary">professionally</span> —
                <br />
                before attackers break your business.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
                Firmware Security. Hardware Security. Penetration Testing.
                Threat Intelligence. AI-Powered Security Research. We don&apos;t
                sell hardware, promote products, or chase sales targets — we
                deliver unbiased, expert-driven security assessments your
                organisation truly needs. We help with RED &amp; CRA product
                readiness for IoT and OT devices, plus AI Security Assessment
                for LLMs, GenAI, and agentic systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="cyber-glow">
                  <Link href="/#contact">
                    Request Assessment
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/osint-console">
                    <Terminal className="size-4" />
                    Try Live OSINT Console
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <ShieldCheck className="mb-2 size-5 text-primary" />
                  <p className="text-sm font-semibold">Unbiased Services</p>
                  <p className="text-xs text-muted-foreground">
                    No product pushing. No hardware sales agenda.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <Factory className="mb-2 size-5 text-primary" />
                  <p className="text-sm font-semibold">RED &amp; CRA Ready</p>
                  <p className="text-xs text-muted-foreground">
                    IoT/OT product compliance: RED, CRA, IEC 62443.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <Cpu className="mb-2 size-5 text-primary" />
                  <p className="text-sm font-semibold">AI-Ready Defense</p>
                  <p className="text-xs text-muted-foreground">
                    LLM red teaming, agentic testing, prompt injection.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: terminal mockup */}
            <div className="lg:col-span-5">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Independent Security Validation ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Attack Surfaces"
            title="Independent Security Validation"
            desc="Four attack surfaces. One senior-led team. Every finding manually reproduced and evidenced."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Firmware", desc: "Boot chain, update paths, binaries", icon: Cpu },
              { title: "IoT / OT", desc: "Protocols, field devices, industrial edge", icon: Factory },
              { title: "Cloud", desc: "Identity, workloads, exposed services", icon: Cloud },
              { title: "AI Security", desc: "LLM red teaming and agent guardrails", icon: Terminal },
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded-xl border border-border/60 bg-card/50 p-5 transition-all hover:border-primary/50"
              >
                <card.icon className="mb-3 size-6 text-primary" />
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card/50 p-6 text-center"
              >
                <p className="font-mono text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Industry Expertise ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Industry Expertise"
            title="Built for Regulated and Safety-Critical Industries"
            desc="We work where a security failure carries operational, contractual, and certification consequences — not just reputational ones."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.icon] ?? Building2;
              return (
                <div
                  key={ind.title}
                  className="rounded-xl border border-border/60 bg-card/50 p-5 transition-all hover:border-primary/50"
                >
                  <Icon className="mb-3 size-6 text-primary" />
                  <h3 className="font-semibold">{ind.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Our Services ===== */}
      <section id="services" className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Our Services"
            title="Real-World Security Testing With a Futuristic Enterprise Edge"
            desc="Our specialists run real-world simulations to uncover risk, validate exploitability, and help your organisation remediate with confidence across enterprise, embedded, cloud, and AI attack surfaces."
          />

          {/* Featured AI Security */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-card/50 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                New 2026 Service
              </span>
            </div>
            <h3 className="text-xl font-bold md:text-2xl">
              AI Security Assessment &amp; LLM Red Teaming
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              We red team LLMs, GenAI apps, agentic workflows, and shadow AI
              deployments using adversarial testing methods that expose control
              failures before attackers can turn them into business risk.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Prompt injection & jailbreak testing",
                "Agentic workflow abuse-path mapping",
                "Tool-use & function-calling guardrail review",
                "Training-data & RAG poisoning analysis",
                "Shadow AI & unsanctioned model discovery",
                "Model supply-chain & weight integrity review",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6 cyber-glow" size="sm">
              <Link href="/ai-security">
                Explore AI Security
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Service cards grid */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="group flex flex-col rounded-xl border border-border/60 bg-card/50 p-5 transition-all hover:border-primary/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {s.shortDesc}
                </p>
                <ul className="mt-4 space-y-1">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-3">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/${s.slug}`}>Learn more</Link>
                  </Button>
                  <Button asChild variant="link" size="sm" className="text-primary">
                    <Link href="/#contact">Request</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Assessment Pipeline ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Assessment Pipeline"
            title="From recon to executive report"
            desc="A repeatable pipeline that combines manual expertise, AI-assisted discovery, and threat intelligence correlation — so every finding is reproducible and business-relevant."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {PIPELINE_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-border/60 bg-card/50 p-5"
              >
                <span className="font-mono text-2xl font-bold text-primary/40">
                  {step.num}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Capability cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-border/60 bg-card/30 p-4"
              >
                <h4 className="text-sm font-medium">{cap.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Research & Validation Flow ===== */}
      <section
        id="validation"
        className="border-b border-border/60 py-16 md:py-20"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Research & Validation"
            title="Pay only for verified vulnerabilities"
            desc="BlockSecBrain focuses on validated security impact. Potential vulnerabilities are reviewed, reproduced and verified before they become accepted findings — so what you pay for is proven, not theoretical."
          />
          <div className="mt-10">
            <ValidationFlow />
          </div>
        </div>
      </section>

      {/* ===== Pricing / Testing Packages ===== */}
      <section id="pricing" className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Testing Packages"
            title="BlockSecBrain Security Testing Models"
            desc="Flexible engagement models for organisations that need focused testing, hybrid validation, or deeper adversarial assessment across complex environments."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  tier.popular
                    ? "border-primary/50 bg-primary/5 cyber-glow"
                    : "border-border/60 bg-card/50"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {tier.badge}
                </p>
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.desc}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-6"
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link href={tier.href}>
                    {tier.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Hybrid Estimator */}
          <div className="mt-12 rounded-2xl border border-border/60 bg-card/30 p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold">
                Hybrid Model · Pay-Per-Finding Estimator
              </h3>
            </div>
            <PricingEstimator />
          </div>
        </div>
      </section>

      {/* ===== Why BlockSecBrain (Comparison) ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Why BlockSecBrain"
            title="Unbiased by design — not just a marketing claim"
            desc="Most “security” providers sell hardware, take vendor commissions, or chase sales quotas. Here's exactly how we differ from typical vendors and resellers."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-left font-medium text-muted-foreground">
                    Capability
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    BlockSecBrain
                    <br />
                    <span className="text-xs font-normal text-primary">
                      independent
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    Typical vendor
                    <br />
                    <span className="text-xs font-normal">product-tied</span>
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                    Reseller
                    <br />
                    <span className="text-xs font-normal">commission-led</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/40 hover:bg-accent/20"
                  >
                    <td className="py-3 pr-4 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-center font-medium text-foreground">
                      {row.blocksecbrain}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {row.typicalVendor}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {row.reseller}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Comparisons are illustrative of common industry patterns, not
            specific named vendors.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading label="Questions" title="Frequently asked" />
          <Accordion type="single" collapsible className="mt-8">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="relative scroll-mt-20 py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* ===== OSINT Console Teaser ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Live OSINT Console
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Attack-surface discovery, with real data
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Enter a domain, IP, ASN, or email. The console detects the type
              and fires every passive intelligence module at once — DNS records,
              WHOIS, Shodan ports, certificate transparency, subdomains, email
              security, and tech stack fingerprinting.
            </p>
            <Button asChild size="lg" className="mt-8 cyber-glow">
              <Link href="/osint-console">
                <Search className="size-4" />
                Open OSINT Console
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Self-Assessment ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading
            label="Self-Assessment"
            title="Security Maturity Self-Assessment"
            desc="Answer 6 questions across 6 security domains to get an instant maturity score, per-domain breakdown, and tailored service recommendations."
          />
          <div className="mt-8 rounded-2xl border border-border/60 bg-card/50 p-6 md:p-8">
            <SelfAssessment />
          </div>
        </div>
      </section>

      {/* ===== Security Glossary ===== */}
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Reference"
            title="Security Glossary"
            desc="A quick reference for the security terms, frameworks, and attack patterns we use across our engagements. Search or filter by domain."
          />
          <div className="mt-8">
            <SecurityGlossary />
          </div>
        </div>
      </section>

      {/* ===== Tooling & Methodology ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Tooling & Methodology"
            title="Our security toolchain"
            desc="We combine industry-standard tooling with custom AI-assisted pipelines. Vendor-neutral by design — we pick the right tool for each attack surface, not the one with the best reseller margin."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border/60 bg-card/50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{group.category}</h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {group.tools.length} tools
                  </span>
                </div>
                <ul className="space-y-2">
                  {group.tools.map((tool) => (
                    <li key={tool.name}>
                      <p className="text-sm font-medium">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tool.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border/60 bg-card/30 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Wrench className="size-4 text-primary" />
              Tool-agnostic methodology
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our assessments never rely on a single scanner&apos;s output.
              Every finding is manually validated, reproduced, and evidenced —
              tools accelerate, but senior researchers decide. We also build
              custom tooling and AI-assisted discovery pipelines where
              off-the-shelf tools fall short.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
