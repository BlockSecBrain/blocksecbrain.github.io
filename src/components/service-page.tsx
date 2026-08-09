import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Check,
  FileText,
  Target,
  Workflow,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/sections/contact-form";
import { getService, SERVICES } from "@/lib/services";

const DELIVERABLES = [
  "Technical Findings Report",
  "Executive Summary",
  "Remediation Tracker",
  "Retest Certificate",
  "Attack Path Narrative",
  "Debrief Session",
  "Risk Rating Model",
];

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
            <Link href="/#services" className="hover:text-primary">
              Services
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="cyber-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary">
                {service.index}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {service.tag}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              {service.heroDesc}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="cyber-glow">
                <Link href="/#contact">
                  Request Assessment
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#pricing">View Engagement Models</Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-3">
              {service.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Test */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Target className="size-4" />
                What We Test
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Focus Areas</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.focusAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-xl border border-border/60 bg-card/50 p-4"
                >
                  <p className="text-sm font-medium">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Workflow className="size-4" />
                Methodology
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Our Process</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.methodology.map((step) => (
                <div
                  key={step.num}
                  className="relative rounded-xl border border-border/60 bg-card/50 p-5"
                >
                  <span className="font-mono text-2xl font-bold text-primary/40">
                    {step.num}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <FileText className="size-4" />
                Deliverables
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                What You Receive
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERABLES.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 p-3"
                >
                  <Check className="size-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Boxes className="size-4" />
                Coverage
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Technologies We Test
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.coverage.map((group) => (
                <div
                  key={group.category}
                  className="rounded-xl border border-border/60 bg-card/50 p-5"
                >
                  <h3 className="mb-3 text-sm font-semibold">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <ShieldCheck className="size-4" />
                Standards
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Compliance Mapping
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.standards.map((std) => (
                <span
                  key={std}
                  className="rounded-lg border border-border/60 bg-card/50 px-3 py-1.5 text-sm font-medium"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
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
            {service.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* More Services */}
      <section className="border-b border-border/60 py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            More Services
          </p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Related Assessments
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="group rounded-xl border border-border/60 bg-card/50 p-5 transition-all hover:border-primary/50"
              >
                <h3 className="font-semibold">{rel.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {rel.shortDesc}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
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

export function generateServiceMetadata(slug: string) {
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.heroDesc,
  };
}
