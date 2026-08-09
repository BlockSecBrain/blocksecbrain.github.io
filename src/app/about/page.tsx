import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Users,
  Target,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/sections/contact-form";
import { Certifications } from "@/components/sections/certifications";

export const metadata: Metadata = {
  title: "About",
  description:
    "BlockSecBrain is a team of independent cybersecurity specialists. No hardware sales, no vendor agenda — just senior-led, outcome-focused testing across firmware, cloud, applications, and AI.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "No Bias",
    desc: "We sell no hardware, software, or vendor products. Ever.",
  },
  {
    icon: Users,
    title: "Senior-Led",
    desc: "Every engagement is run by senior researchers, not handed to juniors.",
  },
  {
    icon: Target,
    title: "Outcome Focused",
    desc: "We measure success by risk reduced, not hours billed.",
  },
  {
    icon: HeartHandshake,
    title: "Client-First",
    desc: "Post-remediation retests at a reduced rate, plus direct engineer access throughout.",
  },
];

const METHODOLOGY = [
  {
    num: "01",
    title: "Scoping & Rules of Engagement",
    desc: "Align on targets, constraints, and success criteria up front.",
  },
  {
    num: "02",
    title: "Threat Modelling",
    desc: "Map realistic abuse cases before a single test begins.",
  },
  {
    num: "03",
    title: "Execution & Validation",
    desc: "Manual testing with proof-of-concept evidence, not scanner output.",
  },
  {
    num: "04",
    title: "Reporting & Risk Rating",
    desc: "Findings rated by real-world exploitability, not raw CVSS.",
  },
  {
    num: "05",
    title: "Remediation Support",
    desc: "Direct engineer access while your team fixes what we found.",
  },
  {
    num: "06",
    title: "Verification Retest",
    desc: "Once your team patches the findings, we re-test every fix to confirm the vulnerability is genuinely closed.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you sell hardware, software, or security products?",
    a: "No. We sell no hardware, software, or vendor products, and we take no referral fees or commissions. Our only revenue comes from the security assessments we deliver. This keeps every recommendation aligned with your risk reduction, not a sales quota.",
  },
  {
    q: "Who actually runs our engagement?",
    a: "Every engagement is led by senior researchers from start to finish. We do not hand testing off to junior staff after scoping. The engineers who scope the assessment are the same ones who execute it, report it, and support remediation.",
  },
  {
    q: "Is a verification retest included?",
    a: "Yes. Once your team has patched the reported findings, we re-test every remediated issue to confirm the fix is effective and the vulnerability is genuinely closed. Post-remediation retesting is offered at a reduced rate confirmed during scoping, with no hidden fees. We don't impose an arbitrary time limit, because patching timelines vary and new vulnerabilities emerge continuously.",
  },
  {
    q: "How is this different from an automated scan or a standard VAPT?",
    a: "Automated scanners report potential issues; they cannot tell you which ones an attacker could actually use against your business. Our work is manual security research: we threat-model the system, chain weaknesses together, and attempt controlled exploitation to prove real impact. Every reported issue is independently reproduced and evidenced with a proof-of-concept, and anything we cannot reproduce is discarded rather than padded into the report.",
  },
  {
    q: "Who is accountable for the quality of the assessment?",
    a: "BlockSecBrain. We own the engagement end to end — scoping, testing, validation of every finding, the final report, and the retest. You have a single accountable point of contact throughout, and we stand behind the technical accuracy of everything we deliver.",
  },
  {
    q: "How do you stay unbiased across firmware, cloud, and AI?",
    a: "We have no vendor partnerships, no reseller agreements, and no product commissions. Our methodology and tooling are selected per engagement based on the attack surface, not commercial incentives. We also build custom tooling and AI-assisted discovery pipelines where off-the-shelf tools fall short.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-card/30">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="cyber-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container relative mx-auto max-w-4xl px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Independent Cybersecurity Specialists
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            About BlockSecBrain
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            We were founded to bridge the gap between what organisations are
            sold and the security validation they actually need — no hardware
            sales, no vendor agenda, just senior-led, outcome-focused testing
            across firmware, cloud, applications, and AI.
          </p>
        </div>
      </section>

      {/* Our Story + Values */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                Our Story
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Honest guidance over sales targets
              </h2>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground md:text-base">
                <p>
                  We&apos;re a team of independent cybersecurity specialists who
                  believe honest guidance matters more than sales targets. We
                  don&apos;t sell hardware, promote products, or chase sales
                  quotas. Our focus is entirely on deep expertise and honest
                  guidance.
                </p>
                <p>
                  Our practice spans firmware, hardware, cloud, web and mobile
                  applications, and network infrastructure — now extended with
                  AI Security Assessment for LLMs, GenAI, and agentic systems.
                </p>
              </div>
              <Button asChild className="mt-6 cyber-glow">
                <Link href="/#contact">
                  Work with us
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {VALUES.map((val) => (
                <div
                  key={val.title}
                  className="rounded-xl border border-border/60 bg-card/50 p-5"
                >
                  <val.icon className="mb-3 size-6 text-primary" />
                  <h3 className="text-sm font-semibold">{val.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Methodology
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              How We Deliver
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY.map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-border/60 bg-card/50 p-5"
              >
                <span className="font-mono text-2xl font-bold text-primary/40">
                  {step.num}
                </span>
                <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              No product sales, ever
            </span>
            <span className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Senior researcher on every engagement
            </span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="size-4 text-primary" />
              Post-remediation retest available
            </span>
          </div>
        </div>
      </section>

      {/* Security Expertise & Certifications */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Credentials
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Security Expertise &amp; Certifications
            </h2>
            <p className="mt-4 text-muted-foreground">
              Selected professional certifications supporting our expertise
              across cloud security, offensive security, and infrastructure.
            </p>
          </div>
          <Certifications />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Questions
          </p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Frequently Asked
          </h2>
          <Accordion type="single" collapsible>
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

      {/* Contact */}
      <section id="contact" className="relative scroll-mt-20 py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
