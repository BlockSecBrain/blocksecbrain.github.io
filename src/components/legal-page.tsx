import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

interface LegalSection {
  num: string;
  title: string;
  body: string;
}

export function LegalPage({
  title,
  description,
  activeTab,
  sections,
}: {
  title: string;
  description: string;
  activeTab: "privacy" | "terms";
  sections: LegalSection[];
}) {
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
            <span className="text-foreground">{title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="border-b border-border/60 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            {activeTab === "privacy" ? "Legal & Privacy" : "Legal & Compliance"}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {description}
          </p>

          {/* Tab switcher */}
          <div className="mt-6 inline-flex rounded-lg border border-border/60 bg-card/50 p-1">
            <Link
              href="/privacy-policy"
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === "privacy"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === "terms"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.num}>
                <h2 className="flex items-baseline gap-3 text-lg font-semibold">
                  <span className="font-mono text-sm text-primary">
                    {section.num}
                  </span>
                  {section.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-xl border border-border/60 bg-card/50 p-6">
            <h3 className="text-sm font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For questions about this policy, contact us at:
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="size-4" />
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
