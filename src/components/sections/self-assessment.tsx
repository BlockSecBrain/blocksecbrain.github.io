"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  domain: string;
  icon: string;
  text: string;
  options: { label: string; level: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    domain: "FIRMWARE",
    icon: "🔧",
    text: "How do you handle firmware signing & secure boot?",
    options: [
      { label: "No signing", level: "Initial", score: 0 },
      { label: "Signed but not enforced", level: "Developing", score: 1 },
      { label: "Signed + verified boot", level: "Managed", score: 2 },
      { label: "Signed + rotated keys + HSM", level: "Optimized", score: 3 },
    ],
  },
  {
    domain: "WEB/API",
    icon: "🌐",
    text: "How is authentication & authorization tested in your web apps?",
    options: [
      { label: "Manual only, ad-hoc", level: "Initial", score: 0 },
      { label: "Automated scanning", level: "Developing", score: 1 },
      { label: "Regular pentests", level: "Managed", score: 2 },
      { label: "Continuous + threat modelling", level: "Optimized", score: 3 },
    ],
  },
  {
    domain: "CLOUD",
    icon: "☁️",
    text: "How do you manage cloud IAM privilege paths?",
    options: [
      { label: "No review process", level: "Initial", score: 0 },
      { label: "Periodic audits", level: "Developing", score: 1 },
      { label: "CSPM + attack-path mapping", level: "Managed", score: 2 },
      { label: "Continuous least-privilege", level: "Optimized", score: 3 },
    ],
  },
  {
    domain: "IoT/OT",
    icon: "🏭",
    text: "How do you validate OT network segmentation?",
    options: [
      { label: "Not validated", level: "Initial", score: 0 },
      { label: "Config review only", level: "Developing", score: 1 },
      { label: "Zone & conduit testing", level: "Managed", score: 2 },
      { label: "Continuous monitoring", level: "Optimized", score: 3 },
    ],
  },
  {
    domain: "AI",
    icon: "🤖",
    text: "How do you test LLM / agentic systems for abuse?",
    options: [
      { label: "Not tested", level: "Initial", score: 0 },
      { label: "Ad-hoc prompt tests", level: "Developing", score: 1 },
      { label: "Structured red teaming", level: "Managed", score: 2 },
      { label: "Continuous guardrail validation", level: "Optimized", score: 3 },
    ],
  },
  {
    domain: "COMPLIANCE",
    icon: "📋",
    text: "How do you map findings to compliance frameworks?",
    options: [
      { label: "No mapping", level: "Initial", score: 0 },
      { label: "Manual one-off", level: "Developing", score: 1 },
      { label: "Per-engagement mapping", level: "Managed", score: 2 },
      { label: "Automated evidence pipeline", level: "Optimized", score: 3 },
    ],
  },
];

export function SelfAssessment() {
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [showResults, setShowResults] = React.useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;

  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const maxScore = QUESTIONS.length * 3;
  const maturityPct = Math.round((totalScore / maxScore) * 100);

  const maturityLabel =
    maturityPct < 25
      ? "Initial"
      : maturityPct < 50
        ? "Developing"
        : maturityPct < 75
          ? "Managed"
          : "Optimized";

  const selectAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [current]: score }));
    if (current < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 200);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Your security maturity score
          </p>
          <p className="mt-2 font-mono text-5xl font-bold text-primary">
            {maturityPct}%
          </p>
          <p className="mt-1 text-lg font-semibold">{maturityLabel}</p>
        </div>
        <Progress value={maturityPct} className="h-2" />
        <div className="grid gap-3 sm:grid-cols-2">
          {QUESTIONS.map((q, i) => {
            const score = answers[i] ?? 0;
            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-card/50 p-3"
              >
                <span className="text-sm font-medium">
                  {q.icon} {q.domain}
                </span>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-xs font-medium",
                    score === 3
                      ? "bg-emerald-500/15 text-emerald-400"
                      : score === 2
                        ? "bg-primary/15 text-primary"
                        : score === 1
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-destructive/15 text-destructive"
                  )}
                >
                  {q.options[score].level}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" />
            Retake assessment
          </Button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {QUESTIONS.length}
        </span>
        <span className="font-mono text-sm text-muted-foreground">
          {answeredCount}/{QUESTIONS.length} answered
        </span>
      </div>
      <Progress value={progress} className="h-1.5" />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{q.icon}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {q.domain}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{q.text}</h3>
        <div className="grid gap-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(opt.score)}
              className={cn(
                "flex items-center justify-between rounded-lg border p-3 text-left transition-all hover:border-primary/50 hover:bg-accent/30",
                answers[current] === opt.score
                  ? "border-primary bg-primary/5"
                  : "border-border/60"
              )}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.level}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        {current === QUESTIONS.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setShowResults(true)}
            disabled={answeredCount < QUESTIONS.length}
            className="cyber-glow"
          >
            View results
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrent((c) => Math.min(QUESTIONS.length - 1, c + 1))}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
