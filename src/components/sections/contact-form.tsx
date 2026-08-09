"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Clock, Lock, Phone, Loader2, Send, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { submitContactForm } from "@/lib/contact";

const SERVICE_OPTIONS = [
  {
    group: "Security Services",
    items: [
      "AI Security Assessment",
      "Web Application Security",
      "Mobile Application Security",
      "Cloud Security",
      "Firewall & Infrastructure Security",
      "IoT/OT Security",
      "Firmware Security Assessment",
      "Hardware Security Testing",
      "Penetration Testing",
      "Custom Security Research",
    ],
  },
  {
    group: "Testing Packages",
    items: ["Standard Security Testing", "Hybrid Security Testing", "Offensive Security Testing"],
  },
];

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [service, setService] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitContactForm(
      { name, email, company, service, message },
      honeypot
    );
    if (result.ok) {
      toast.success("Request received — we'll respond within 24 hours.");
      setSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setService("");
      setMessage("");
    } else {
      toast.error(result.error || "Submission failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Info column */}
      <div className="lg:col-span-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Get In Touch
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to find your real attack surface?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d
          break it — and how to stop us.
        </p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
            <Mail className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm font-semibold hover:text-primary"
              >
                {SITE.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
            <Clock className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Response Time
              </div>
              <div className="text-sm font-semibold">{SITE.responseTime}</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
            <Lock className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Confidentiality
              </div>
              <div className="text-sm font-semibold">NDA and strict OPSEC</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
            <Phone className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Prefer to talk?
              </div>
              <div className="text-sm font-semibold">
                Book a 15-minute intro call — no pitch, just technical scoping.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form column */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8">
          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Request received</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thanks — our team will respond within 24 hours. Check your
                inbox for a confirmation.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => setSubmitted(false)}
              >
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot spam trap — hidden from real users */}
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    Work Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="company"
                  className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Inc."
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Service Interest
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((group) => (
                      <SelectGroup key={group.group}>
                        <SelectLabel>{group.group}</SelectLabel>
                        {group.items.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  Tell us about your project
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="What are you building? What attack surface concerns you? Any compliance drivers?"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full cyber-glow"
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {submitting ? "Sending…" : "Send Message"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree to be contacted about your request.
                We never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
