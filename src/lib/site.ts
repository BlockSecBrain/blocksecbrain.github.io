export const SITE = {
  name: "BlockSecBrain",
  tagline: "Independent Cybersecurity Specialists",
  email: "sales@blocksecbrain.com",
  responseTime: "Within 24 hours",
  copyright: `© ${new Date().getFullYear()} BlockSecBrain. Independent security validation.`,
  taglineLong:
    "We break things professionally — before attackers break your business.",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/#services", hasDropdown: true },
  { label: "Pricing", href: "/#pricing" },
  { label: "OSINT Console", href: "/osint-console" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const FOOTER_SERVICES = [
  { label: "AI Security Assessment", href: "/ai-security" },
  { label: "Web Application Security", href: "/web-application-security" },
  { label: "Mobile Application Security", href: "/mobile-application-security" },
  { label: "Cloud Security", href: "/cloud-security" },
  { label: "Firewall & Infrastructure Security", href: "/firewall-infrastructure-security" },
  { label: "IoT / OT Security", href: "/iot-ot-security" },
] as const;

export const FOOTER_COMPANY = [
  { label: "About", href: "/about" },
  { label: "Engagement Models", href: "/#pricing" },
  { label: "OSINT Console", href: "/osint-console" },
  { label: "Contact", href: "/#contact" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

export interface ToolGroup {
  category: string;
  tools: { name: string; desc: string }[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    category: "Web & API",
    tools: [
      { name: "Burp Suite Pro", desc: "Web/API interception, fuzzing, active scanning" },
      { name: "OWASP ZAP", desc: "Automated web app vulnerability scanning" },
      { name: "Nuclei", desc: "Template-based vulnerability detection" },
    ],
  },
  {
    category: "Firmware & Hardware",
    tools: [
      { name: "Ghidra", desc: "Reverse engineering & binary analysis" },
      { name: "IDA Pro", desc: "Disassembly & decompilation" },
      { name: "Binwalk", desc: "Firmware extraction & analysis" },
      { name: "JTAGulator", desc: "Hardware debug interface discovery" },
    ],
  },
  {
    category: "Mobile",
    tools: [
      { name: "Frida", desc: "Dynamic instrumentation of mobile apps" },
      { name: "MobSF", desc: "Mobile security framework scanning" },
    ],
  },
  {
    category: "IoT / OT",
    tools: [
      { name: "ModbusPal", desc: "Modbus protocol simulation & testing" },
      { name: "Wireshark", desc: "Protocol analysis across OT/IoT traffic" },
      { name: "Pacemaker", desc: "ICS protocol fuzzing" },
    ],
  },
  {
    category: "Cloud",
    tools: [
      { name: "ScoutSuite", desc: "Multi-cloud posture auditing" },
      { name: "Pacu", desc: "AWS exploitation framework" },
      { name: "CloudFox", desc: "Cloud attack-path discovery" },
    ],
  },
  {
    category: "AI / LLM",
    tools: [
      { name: "Garak", desc: "LLM vulnerability probing" },
      { name: "Promptfoo", desc: "LLM red-team & eval automation" },
      { name: "PyRIT", desc: "Python Risk Identification Toolkit for generative AI" },
    ],
  },
  {
    category: "General",
    tools: [
      { name: "Metasploit Pro", desc: "Exploitation & validation framework" },
      { name: "BloodHound", desc: "Identity attack-path mapping" },
      { name: "Nmap", desc: "Network discovery & security auditing" },
      { name: "Custom tooling", desc: "In-house scripts & AI-assisted discovery pipelines" },
    ],
  },
];

export interface IndustryCard {
  title: string;
  desc: string;
  icon: string;
}

export const INDUSTRIES: IndustryCard[] = [
  {
    title: "Automotive & Connected Devices",
    desc: "ECUs, telematics, and connected vehicle platforms",
    icon: "car",
  },
  {
    title: "Industrial Automation",
    desc: "PLCs, SCADA, and plant-floor networks",
    icon: "factory",
  },
  {
    title: "IoT Manufacturers",
    desc: "RED & CRA product readiness, connected devices, gateways",
    icon: "cpu",
  },
  {
    title: "Medical Devices",
    desc: "Connected diagnostics, monitoring, and hospital systems",
    icon: "heart-pulse",
  },
  {
    title: "Cloud & SaaS",
    desc: "Multi-tenant platforms and customer-facing services",
    icon: "cloud",
  },
  {
    title: "Enterprise Security Teams",
    desc: "Internal validation, assurance, and audit support",
    icon: "building",
  },
];

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}

export const STATS: StatItem[] = [
  {
    value: "Manual",
    label: "Expert-Led Testing",
    sub: "Web, Cloud, Mobile, Firmware & AI",
  },
  {
    value: "0%",
    label: "Vendor Bias / Sales Agenda",
    sub: "100% Independent Validation",
  },
  {
    value: "< 24h",
    label: "Critical Vulnerability SLA",
    sub: "Immediate Triage & Escalation",
  },
  {
    value: "100%",
    label: "Manual Proof-of-Concept",
    sub: "Zero Noise or Scanner Swallowing",
  },
];

export interface CapabilityCard {
  title: string;
  desc: string;
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    title: "AI-assisted vulnerability discovery",
    desc: "Active mapping and validation",
  },
  {
    title: "Firmware analysis workflow",
    desc: "Deep binary introspection",
  },
  {
    title: "Threat intelligence automation",
    desc: "Continuous context gathering",
  },
  {
    title: "Security assessment pipeline",
    desc: "Enterprise-ready delivery",
  },
  {
    title: "Attack surface visualisation",
    desc: "Executive-level clarity",
  },
  {
    title: "Regulatory evidence mapping",
    desc: "CRA, RED, IEC 62443, ISO 27001",
  },
];
