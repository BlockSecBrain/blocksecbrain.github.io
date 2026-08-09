export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
}

export const GLOSSARY_CATEGORIES = [
  "Web/API",
  "Firmware",
  "IoT/OT",
  "AI",
  "Cloud",
  "Compliance",
  "General",
] as const;

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Agentic Workflow",
    category: "AI",
    definition:
      "An LLM-powered system that takes actions via tool-use (function calling) — a new class of attack surface for prompt injection.",
  },
  {
    term: "BOLA",
    category: "Web/API",
    definition:
      "Broken Object Level Authorization — an API flaw where an attacker can access objects they shouldn't by manipulating IDs. Also called IDOR.",
  },
  {
    term: "Canary Token",
    category: "General",
    definition:
      "A covert marker embedded in data or systems that alerts when triggered, detecting exfiltration or intrusion.",
  },
  {
    term: "CISA KEV",
    category: "General",
    definition:
      "Cybersecurity & Infrastructure Security Agency Known Exploited Vulnerabilities catalog — flaws actively exploited in the wild.",
  },
  {
    term: "CRA",
    category: "Compliance",
    definition:
      "Cyber Resilience Act — EU regulation mandating security-by-design, vulnerability reporting, and lifecycle obligations for products with digital elements (IoT/OT).",
  },
  {
    term: "CVE",
    category: "General",
    definition:
      "Common Vulnerabilities and Exposures — a standardized identifier for publicly disclosed security flaws.",
  },
  {
    term: "CVSS",
    category: "General",
    definition:
      "Common Vulnerability Scoring System — a standardized 0–10 severity score for security vulnerabilities.",
  },
  {
    term: "Fault Injection",
    category: "Firmware",
    definition:
      "A hardware attack technique (voltage/clock glitching) that induces errors to bypass security checks or extract secrets.",
  },
  {
    term: "HSM",
    category: "Firmware",
    definition:
      "Hardware Security Module — a tamper-resistant physical device for key management and cryptographic operations.",
  },
  {
    term: "IEC 62443",
    category: "Compliance",
    definition:
      "The international standard for industrial automation and control systems (IACS) security.",
  },
  {
    term: "IEC 81001",
    category: "Compliance",
    definition:
      "Health software security standard supporting FDA premarket cybersecurity documentation for medical devices.",
  },
  {
    term: "ISO 21434",
    category: "Compliance",
    definition:
      "The automotive cybersecurity engineering standard covering the full vehicle lifecycle.",
  },
  {
    term: "JTAG",
    category: "Firmware",
    definition:
      "A hardware debug interface (IEEE 1149.1) used for testing and debugging embedded devices — a common physical attack surface.",
  },
  {
    term: "JWT",
    category: "Web/API",
    definition:
      "JSON Web Token — a compact, signed token for stateless authentication. Vulnerable to algorithm-confusion attacks if misconfigured.",
  },
  {
    term: "Mass Assignment",
    category: "Web/API",
    definition:
      "A vulnerability where an API blindly accepts user-supplied object fields, allowing privilege escalation via hidden properties.",
  },
  {
    term: "MITRE ATT&CK",
    category: "General",
    definition:
      "A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.",
  },
  {
    term: "Modbus",
    category: "IoT/OT",
    definition:
      "A legacy unauthenticated protocol widely used in industrial control systems for PLC communication.",
  },
  {
    term: "NIST CSF",
    category: "Compliance",
    definition:
      "The NIST Cybersecurity Framework (2.0) — Govern, Identify, Protect, Detect, Respond, Recover functions.",
  },
  {
    term: "OWASP Top 10",
    category: "Web/API",
    definition:
      "The Open Worldwide Application Security Project's list of the ten most critical web application security risks.",
  },
  {
    term: "Prompt Injection",
    category: "AI",
    definition:
      "An attack where malicious input manipulates an LLM into ignoring its instructions or leaking protected data.",
  },
  {
    term: "RAG Poisoning",
    category: "AI",
    definition:
      "Injecting malicious content into a retrieval-augmented generation knowledge base to influence LLM outputs.",
  },
  {
    term: "RED",
    category: "Compliance",
    definition:
      "Radio Equipment Directive — EU regulation requiring security features, SBOM, and vulnerability disclosure for wireless/connected devices.",
  },
  {
    term: "SBOM",
    category: "General",
    definition:
      "Software Bill of Materials — a formal record of components and dependencies in a software product, required by RED/CRA and US Executive Order 14028.",
  },
  {
    term: "Secure Boot",
    category: "Firmware",
    definition:
      "A boot-chain verification mechanism that ensures only cryptographically signed firmware runs on a device.",
  },
  {
    term: "Shadow AI",
    category: "AI",
    definition:
      "Unsanctioned, unmonitored AI tools/endpoints used inside an organisation — a growing data-exfiltration surface.",
  },
  {
    term: "Side Channel",
    category: "Firmware",
    definition:
      "An attack that extracts secrets from a device's physical characteristics (power, timing, EM emissions) rather than algorithmic flaws.",
  },
  {
    term: "SSRF",
    category: "Cloud",
    definition:
      "Server-Side Request Forgery — tricking a server into making requests to unintended destinations, e.g. cloud metadata endpoints.",
  },
  {
    term: "TARA",
    category: "Compliance",
    definition:
      "Threat Analysis and Risk Assessment — the ISO 21434 methodology for evaluating automotive cybersecurity risk.",
  },
  {
    term: "Zone & Conduit",
    category: "IoT/OT",
    definition:
      "The IEC 62443 network-segmentation model: zones group assets by security level; conduits control traffic between them.",
  },
];
