# BlockSecBrain

Independent cybersecurity services website. Firmware, hardware, IoT/OT, cloud, and AI security assessments — with zero vendor bias.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Theming:** next-themes (dark-first, with light mode)
- **Icons:** Lucide React
- **Fonts:** Geist Sans + Geist Mono
- **ORM:** Prisma (SQLite, for local development)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero with terminal mockup, services, pricing, FAQ, OSINT teaser, glossary, tooling |
| `/osint-console` | Live OSINT console — 14 passive intelligence modules |
| `/ai-security` | AI Security Assessment service page |
| `/web-application-security` | Web Application Security service page |
| `/mobile-application-security` | Mobile Application Security service page |
| `/cloud-security` | Cloud Security service page |
| `/firewall-infrastructure-security` | Firewall & Infrastructure Security service page |
| `/iot-ot-security` | IoT / OT Security service page |
| `/about` | About — story, values, methodology, FAQ |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (port 3000)
bun run dev

# Lint
bun run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── osint-console/      # OSINT Console page
│   ├── about/              # About page
│   ├── privacy-policy/     # Privacy Policy
│   ├── terms-of-service/   # Terms of Service
│   └── [service-slug]/     # 6 service pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections (pricing, contact, OSINT, etc.)
│   ├── site-header.tsx     # Global header with nav + theme toggle
│   ├── site-footer.tsx     # Global footer
│   ├── service-page.tsx    # Reusable service page template
│   └── legal-page.tsx      # Reusable legal page template
└── lib/
    ├── pricing.ts          # Hybrid pay-per-finding pricing config
    ├── services.ts         # Service data (6 services)
    ├── glossary.ts         # Security glossary terms
    └── site.ts             # Nav, footer, industries, tools config
```

## Pricing

The Hybrid pay-per-finding model uses these rates (single source of truth in `src/lib/pricing.ts`):

| Severity | Rate |
|----------|------|
| Critical | $1,800/finding |
| High | $1,400/finding |
| Medium | $800/finding |
| Low | $200/finding |

## License

Proprietary — © BlockSecBrain. All rights reserved.
