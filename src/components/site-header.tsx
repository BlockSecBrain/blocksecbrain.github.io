"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, FOOTER_SERVICES, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo + brand name */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label={`${SITE.name} home`}
        >
          { }
          <img
            src="/logo-white.svg"
            alt=""
            className="h-8 w-auto"
          />
          <span className="text-lg font-bold tracking-tight">
            Block<span className="text-primary">Sec</span>Brain
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-80 rounded-xl border border-border/60 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}`}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/50"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {s.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {s.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                isActive(link.href) ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="hidden cyber-glow sm:inline-flex"
            size="sm"
          >
            <Link href="/#contact">
              Request Assessment
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs overflow-y-auto p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex flex-col gap-1 p-6">
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/50"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
                <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Services
                </div>
                {FOOTER_SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent/50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-border/40" />
                {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 cyber-glow">
                  <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                    Request Assessment
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
