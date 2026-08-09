"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/glossary";
import { cn } from "@/lib/utils";

export function SecurityGlossary() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    return GLOSSARY.filter((t) => {
      const matchesQuery =
        !query ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "all" || t.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            className="pl-10"
            aria-label="Search glossary"
          />
        </div>
      </div>
      <ToggleGroup
        type="single"
        value={category}
        onValueChange={(v) => setCategory(v || "all")}
        className="flex flex-wrap justify-start gap-2"
      >
        <ToggleGroupItem value="all" variant="outline" className="rounded-full">
          All
        </ToggleGroupItem>
        {GLOSSARY_CATEGORIES.map((cat) => (
          <ToggleGroupItem
            key={cat}
            value={cat}
            variant="outline"
            className="rounded-full"
          >
            {cat}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t.term}
            className={cn(
              "rounded-xl border border-border/60 bg-card/50 p-4 transition-colors",
              "hover:border-primary/40"
            )}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <h4 className="font-mono text-sm font-semibold">{t.term}</h4>
              <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t.definition}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No terms match your search.
        </p>
      )}
    </div>
  );
}
