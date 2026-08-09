import { BadgeCheck } from "lucide-react";

interface Certification {
  name: string;
  abbr: string;
  issuer: string;
  domain: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    abbr: "CCSK",
    name: "Certificate of Cloud Security Knowledge",
    issuer: "Cloud Security Alliance (CSA)",
    domain: "Cloud security",
  },
  {
    abbr: "AWS SAA",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    domain: "Cloud architecture",
  },
  {
    abbr: "CEH",
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    domain: "Offensive security",
  },
  {
    abbr: "RHCE",
    name: "Red Hat Certified Engineer",
    issuer: "Red Hat",
    domain: "Infrastructure",
  },
  {
    abbr: "RHCSA",
    name: "Red Hat Certified System Administrator",
    issuer: "Red Hat",
    domain: "Infrastructure",
  },
];

export function Certifications() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.abbr}
            className="rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-3">
              <BadgeCheck className="size-5 shrink-0 text-primary" />
              <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {cert.domain}
              </span>
            </div>
            <p className="mt-3 font-mono text-sm font-bold text-primary">
              {cert.abbr}
            </p>
            <h3 className="mt-1 text-sm font-semibold leading-snug">
              {cert.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        These are individual professional credentials held by members of the
        BlockSecBrain team, not certifications of BlockSecBrain as a legal
        entity. They are listed to illustrate the expertise applied to
        engagements.
      </p>
    </div>
  );
}
