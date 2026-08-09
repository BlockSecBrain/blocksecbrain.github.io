export interface ServiceFocusArea {
  title: string;
  points: string[];
}

export interface ServiceMethodologyStep {
  num: string;
  title: string;
  desc: string;
}

export interface ServiceCoverageGroup {
  category: string;
  items: string[];
}

export interface ServiceData {
  slug: string;
  index: string;
  tag: string;
  title: string;
  shortDesc: string;
  heroDesc: string;
  bullets: string[];
  focusAreas: string[];
  methodology: ServiceMethodologyStep[];
  coverage: ServiceCoverageGroup[];
  standards: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "ai-security",
    index: "S / 01",
    tag: "LLM RED TEAMING · AGENTIC SYSTEMS",
    title: "AI Security Assessment",
    shortDesc:
      "Adversarial security testing for LLMs, GenAI applications, agentic systems, and shadow AI. Aligned to OWASP Top 10 for LLM Applications, NIST AI RMF, and MITRE ATLAS.",
    heroDesc:
      "Adversarial security testing for LLMs, GenAI applications, agentic systems, and shadow AI. Aligned to OWASP Top 10 for LLM Applications, NIST AI RMF, and MITRE ATLAS.",
    bullets: [
      "OWASP LLM Top 10 + MITRE ATLAS mapping",
      "Guardrail hardening recommendations",
      "Shadow AI inventory & governance plan",
    ],
    focusAreas: [
      "Prompt injection & jailbreaking",
      "Agentic AI tool-call abuse & excessive agency",
      "Shadow AI discovery & governance",
      "AI supply chain & model integrity review",
    ],
    methodology: [
      {
        num: "01",
        title: "AI Asset Mapping",
        desc: "Inventory models, agents, prompts, and shadow AI in use.",
      },
      {
        num: "02",
        title: "Threat Modelling",
        desc: "Map abuse cases against OWASP LLM Top 10 and MITRE ATLAS.",
      },
      {
        num: "03",
        title: "Adversarial Testing",
        desc: "Prompt injection, jailbreaks, tool-call abuse, data exfiltration.",
      },
      {
        num: "04",
        title: "Guardrail Verification",
        desc: "Validate filters, system prompts, and agent permission boundaries.",
      },
      {
        num: "05",
        title: "Risk-Rated Report",
        desc: "Attack success rates, blast radius, and hardening priorities.",
      },
    ],
    coverage: [
      {
        category: "Models & Providers",
        items: ["OpenAI", "Anthropic", "Azure OpenAI", "Open-weight LLMs"],
      },
      {
        category: "Orchestration",
        items: ["LangChain", "LlamaIndex", "Agent frameworks", "RAG pipelines"],
      },
      {
        category: "Serving & Infra",
        items: ["Vector DBs", "Model APIs", "Inference endpoints"],
      },
      {
        category: "Guardrails",
        items: ["System prompts", "Content filters", "Tool-call scopes"],
      },
    ],
    standards: [
      "OWASP Top 10 for LLM Applications",
      "NIST AI Risk Management Framework",
      "ISO/IEC 42001:2023",
      "MITRE ATLAS",
      "ISO/IEC 27001:2022",
      "EU AI Act (Regulation 2024/1689)",
    ],
    faqs: [
      {
        q: "What's different about testing AI systems vs. a normal web app?",
        a: "Traditional web testing focuses on input validation and access control. AI systems introduce new attack surfaces: prompt manipulation, tool-call abuse, training-data leakage, and agent permission boundaries. We test all of these with adversarial techniques purpose-built for generative models.",
      },
      {
        q: "Do you test agentic / tool-calling AI systems?",
        a: "Yes. We map the full tool-call surface, test for excessive agency, and validate that permission boundaries actually constrain what an agent can do — including chained tool use and indirect prompt injection through retrieved content.",
      },
      {
        q: "Can you find AI systems we didn't know were deployed?",
        a: "Yes. Our shadow AI discovery identifies unsanctioned models, endpoints, and integrations across your environment, then assesses the risk each one introduces.",
      },
    ],
    related: [
      "web-application-security",
      "mobile-application-security",
      "cloud-security",
    ],
  },
  {
    slug: "web-application-security",
    index: "S / 02",
    tag: "OWASP TOP 10 · BUSINESS LOGIC",
    title: "Web Application Security",
    shortDesc:
      "Enterprise web application penetration testing covering OWASP Top 10, API security, business logic abuse, and authentication flaws with manual exploitation and proof-of-concept evidence.",
    heroDesc:
      "Enterprise web application penetration testing covering OWASP Top 10, API security, business logic abuse, and authentication flaws with manual exploitation and proof-of-concept evidence.",
    bullets: [
      "Proof-driven findings with PoC evidence",
      "Risk-rated remediation roadmap",
      "False-positive reduced reporting",
    ],
    focusAreas: [
      "Authentication, access control & input handling",
      "Business logic & workflow abuse paths",
      "API security & trust boundary testing",
      "AI-assisted recon & exploit chaining",
    ],
    methodology: [
      {
        num: "01",
        title: "Information Gathering",
        desc: "Recon, tech stack fingerprinting, and attack surface mapping.",
      },
      {
        num: "02",
        title: "Vulnerability Identification",
        desc: "OWASP Top 10, API, and business-logic weakness discovery.",
      },
      {
        num: "03",
        title: "Exploitation & PoC Development",
        desc: "Manual exploitation and proof-of-concept development.",
      },
      {
        num: "04",
        title: "Report Writing",
        desc: "Risk-rated findings with reproducible evidence.",
      },
      {
        num: "05",
        title: "Verification Retest",
        desc: "Retest remediated findings and confirm closure.",
      },
    ],
    coverage: [
      {
        category: "Frameworks & Runtimes",
        items: ["React", "Next.js", "Node.js", "Java", ".NET", "PHP"],
      },
      {
        category: "APIs & Protocols",
        items: ["REST", "GraphQL", "gRPC", "WebSockets"],
      },
      {
        category: "Identity & Access",
        items: ["OAuth2", "OIDC", "SAML", "JWT"],
      },
      {
        category: "Data Layers",
        items: ["SQL", "NoSQL", "Caching layers"],
      },
    ],
    standards: [
      "OWASP Top 10 & ASVS",
      "OWASP API Security Top 10",
      "ISO/IEC 27001:2022",
      "NIST Cybersecurity Framework 2.0",
      "NIST SP 800-53 Rev. 5",
      "MITRE ATT&CK",
    ],
    faqs: [
      {
        q: "Do you test APIs as well as the front end?",
        a: "Yes. Every web engagement includes API testing — REST, GraphQL, gRPC, and WebSocket endpoints. We test authentication, authorisation, input validation, and business-logic flaws across the full API surface.",
      },
      {
        q: "How do you handle business logic flaws automated scanners miss?",
        a: "Business-logic flaws require manual analysis. We model your workflows, identify abuse paths, and manually validate each one with proof-of-concept evidence — something no scanner can do reliably.",
      },
      {
        q: "Is a retest included?",
        a: "Yes. Once your team has patched the reported findings, we re-test every remediated issue to confirm the fix is effective and the vulnerability is genuinely closed. This post-remediation retest is available at a minimal charge — far below a full paid add-on, with no hidden fees. We don't impose an arbitrary time limit, because patching timelines vary and new vulnerabilities emerge continuously.",
      },
    ],
    related: ["ai-security", "mobile-application-security", "cloud-security"],
  },
  {
    slug: "mobile-application-security",
    index: "S / 03",
    tag: "ANDROID · iOS · MASVS",
    title: "Mobile Application Security",
    shortDesc:
      "Android and iOS application penetration testing covering OWASP MASVS, insecure storage, runtime tampering, API trust boundaries, and platform hardening.",
    heroDesc:
      "Android and iOS application penetration testing covering OWASP MASVS, insecure storage, runtime tampering, API trust boundaries, and platform hardening.",
    bullets: [
      "OWASP MASVS-aligned findings",
      "Store-readiness hardening plan",
      "Reproducible PoCs per finding",
    ],
    focusAreas: [
      "Static, runtime, transport & data exposure checks",
      "Secure storage & secret/token review",
      "Root/jailbreak & runtime hook testing",
      "API & backend trust boundary validation",
    ],
    methodology: [
      {
        num: "01",
        title: "Package Review",
        desc: "Static analysis of the compiled app binary and configuration.",
      },
      {
        num: "02",
        title: "Authentication Review",
        desc: "Session handling, biometrics, and token storage.",
      },
      {
        num: "03",
        title: "API & Transport Testing",
        desc: "Backend trust boundaries and transport security.",
      },
      {
        num: "04",
        title: "Runtime Analysis",
        desc: "Dynamic instrumentation, root/jailbreak, and hook testing.",
      },
      {
        num: "05",
        title: "Verification Testing",
        desc: "Retest fixes on real devices.",
      },
    ],
    coverage: [
      {
        category: "Platforms",
        items: ["Android", "iOS"],
      },
      {
        category: "Frameworks",
        items: ["React Native", "Flutter", "Native Swift/Kotlin"],
      },
      {
        category: "Toolchain",
        items: ["Static & dynamic instrumentation", "Real-device testing"],
      },
      {
        category: "Backends & SDKs",
        items: ["Mobile backend APIs", "Push/analytics SDKs"],
      },
    ],
    standards: [
      "OWASP MASVS & MASTG",
      "OWASP API Security Top 10",
      "ISO/IEC 27001:2022",
      "NIST Cybersecurity Framework 2.0",
      "IEC 81001-5-1",
      "EU Cyber Resilience Act",
    ],
    faqs: [
      {
        q: "Do you test on real devices or just emulators?",
        a: "Both. We start on emulators for broad coverage, then validate critical findings on real devices — including different OS versions and hardware configurations — to ensure issues are reproducible in production conditions.",
      },
      {
        q: "Do you cover both Android and iOS in one engagement?",
        a: "Yes. A single engagement can cover both platforms. We test platform-specific issues (root/jailbreak detection, secure storage, runtime hooks) alongside shared concerns like API trust boundaries and transport security.",
      },
      {
        q: "What if our app uses React Native or Flutter?",
        a: "We test cross-platform frameworks regularly. The compiled binary still exposes native APIs and JavaScript/Dart bridge surfaces — both of which we test for insecure storage, runtime tampering, and code extraction.",
      },
    ],
    related: ["ai-security", "web-application-security", "cloud-security"],
  },
  {
    slug: "cloud-security",
    index: "S / 04",
    tag: "AWS · AZURE · GCP · K8S",
    title: "Cloud Security",
    shortDesc:
      "Cloud security assessment across AWS, Azure, GCP, and Kubernetes covering IAM privilege paths, workload hardening, network exposure, and CIS benchmark alignment.",
    heroDesc:
      "Cloud security assessment across AWS, Azure, GCP, and Kubernetes covering IAM privilege paths, workload hardening, network exposure, and CIS benchmark alignment.",
    bullets: [
      "Identity attack-path maps",
      "CSPM-aligned hardening plan",
      "Audit-ready control evidence",
    ],
    focusAreas: [
      "IAM role design & privilege pathway review",
      "Container & workload runtime hardening",
      "Network exposure & data path validation",
      "CIS benchmark & CSPM alignment",
    ],
    methodology: [
      {
        num: "01",
        title: "Cloud Asset Mapping",
        desc: "Inventory accounts, workloads, and exposed services.",
      },
      {
        num: "02",
        title: "Identity & Access Review",
        desc: "IAM roles, privilege pathways, and trust relationships.",
      },
      {
        num: "03",
        title: "Platform Hardening Review",
        desc: "Workload, container, and configuration hardening.",
      },
      {
        num: "04",
        title: "Network & Data Path Validation",
        desc: "Exposure, segmentation, and data-flow testing.",
      },
      {
        num: "05",
        title: "Verification Testing",
        desc: "Retest fixes and confirm closure.",
      },
    ],
    coverage: [
      {
        category: "Providers",
        items: ["AWS", "Azure", "GCP"],
      },
      {
        category: "Orchestration",
        items: ["Kubernetes", "Docker", "Serverless"],
      },
      {
        category: "Identity",
        items: ["IAM roles", "SSO/Federation", "Service accounts"],
      },
      {
        category: "IaC & Data",
        items: ["Terraform", "CloudFormation", "Managed databases"],
      },
    ],
    standards: [
      "ISO/IEC 27001:2022",
      "NIST Cybersecurity Framework 2.0",
      "NIST SP 800-53 Rev. 5",
      "MITRE ATT&CK for Cloud",
      "IEC 62443-3-3",
      "OWASP API Security Top 10",
    ],
    faqs: [
      {
        q: "Which cloud providers do you cover?",
        a: "AWS, Azure, and GCP — including Kubernetes (self-managed and managed), serverless functions, and the full IAM, storage, and networking surface on each provider.",
      },
      {
        q: "Do you test IAM privilege escalation paths?",
        a: "Yes. We map identity attack paths across roles, policies, trust relationships, and service accounts — identifying privilege escalation chains that could let an attacker move from a low-privilege foothold to full account compromise.",
      },
      {
        q: "Can this align with our CSPM / benchmark tooling?",
        a: "Yes. Our findings map to CIS benchmarks and common CSPM controls, so you can feed them directly into your existing remediation workflows and evidence trail.",
      },
    ],
    related: ["ai-security", "web-application-security", "mobile-application-security"],
  },
  {
    slug: "firewall-infrastructure-security",
    index: "S / 05",
    tag: "SEGMENTATION · AD · DETECTION",
    title: "Firewall & Infrastructure Security",
    shortDesc:
      "Network perimeter and infrastructure penetration testing covering firewall rule review, segmentation validation, Active Directory attack paths, and detection coverage.",
    heroDesc:
      "Network perimeter and infrastructure penetration testing covering firewall rule review, segmentation validation, Active Directory attack paths, and detection coverage.",
    bullets: [
      "Segmentation & firewall hardening plan",
      "AD attack-path & privilege gap analysis",
      "Detection coverage recommendations",
    ],
    focusAreas: [
      "Firewall ACL, NAT & policy order review",
      "Network architecture & segmentation validation",
      "Active Directory privilege & trust path testing",
      "Logging, monitoring & detection assessment",
    ],
    methodology: [
      {
        num: "01",
        title: "Firewall Configuration Review",
        desc: "ACL, NAT, and policy order review.",
      },
      {
        num: "02",
        title: "Network Architecture & Segmentation",
        desc: "Validate zone boundaries actually hold.",
      },
      {
        num: "03",
        title: "Vulnerability Scanning & Penetration",
        desc: "Perimeter and internal infrastructure testing.",
      },
      {
        num: "04",
        title: "Access Control & Identity",
        desc: "Active Directory privilege and trust path testing.",
      },
      {
        num: "05",
        title: "Monitoring & Logging Review",
        desc: "Detection coverage and alerting validation.",
      },
    ],
    coverage: [
      {
        category: "Firewalls & Edge",
        items: ["Perimeter firewalls", "WAFs", "VPN gateways"],
      },
      {
        category: "Network Infrastructure",
        items: ["Switching", "Routing", "Segmentation zones"],
      },
      {
        category: "Identity Infrastructure",
        items: ["Active Directory", "LDAP", "RADIUS"],
      },
      {
        category: "Detection Stack",
        items: ["SIEM", "IDS/IPS", "Logging pipelines"],
      },
    ],
    standards: [
      "ISO/IEC 27001:2022",
      "IEC 62443-3-3 & 62443-2-1",
      "NIST Cybersecurity Framework 2.0",
      "NIST SP 800-53 Rev. 5",
      "MITRE ATT&CK Enterprise",
      "MITRE ATT&CK for ICS",
    ],
    faqs: [
      {
        q: "Do you test Active Directory attack paths?",
        a: "Yes. We map privilege escalation paths across AD — including Kerberos abuse, trust relationship exploitation, and ACL misconfigurations — to show how an attacker could move from a standard user to domain admin.",
      },
      {
        q: "Will this disrupt production network traffic?",
        a: "No. All testing is operations-safe. We coordinate timing windows, avoid disruptive techniques on production segments, and follow agreed rules of engagement throughout the assessment.",
      },
      {
        q: "Do you validate our detection coverage, not just find gaps?",
        a: "Yes. Beyond finding gaps, we assess whether your SIEM, IDS/IPS, and logging pipelines would actually detect the attack techniques we use — and provide recommendations to close detection blind spots.",
      },
    ],
    related: ["ai-security", "web-application-security", "mobile-application-security"],
  },
  {
    slug: "iot-ot-security",
    index: "S / 06",
    tag: "FIRMWARE · IEC 62443 · RED & CRA",
    title: "IoT / OT Security",
    shortDesc:
      "IoT and OT penetration testing covering firmware analysis, hardware interfaces, industrial protocols, and IEC 62443 alignment with operations-safe methodology. RED & CRA product readiness.",
    heroDesc:
      "IoT and OT penetration testing covering firmware analysis, hardware interfaces, industrial protocols, and IEC 62443 alignment with operations-safe methodology. RED & CRA product readiness.",
    bullets: [
      "IEC 62443 / ISO 21434 evidence",
      "RED & CRA product readiness validation",
      "Operations-safe, non-disruptive testing",
    ],
    focusAreas: [
      "Device & firmware security analysis",
      "Network & protocol analysis (Modbus, OPC-UA, MQTT)",
      "Data & access control review",
      "Industrial OT & safety-instrumented system testing",
    ],
    methodology: [
      {
        num: "01",
        title: "Device & Firmware Testing",
        desc: "Boot chain, update paths, and binary analysis.",
      },
      {
        num: "02",
        title: "Network & Protocol Analysis",
        desc: "Modbus, OPC-UA, MQTT, and field-bus protocols.",
      },
      {
        num: "03",
        title: "Data & Access Control",
        desc: "Credential storage and access boundary review.",
      },
      {
        num: "04",
        title: "Industrial OT Security",
        desc: "Operations-safe testing of control and safety systems.",
      },
      {
        num: "05",
        title: "Risk & Compliance Advisory",
        desc: "IEC 62443 / RED / CRA readiness evidence.",
      },
    ],
    coverage: [
      {
        category: "Silicon & Platforms",
        items: ["ARM", "MIPS", "RTOS", "Embedded Linux"],
      },
      {
        category: "Wireless Protocols",
        items: ["BLE", "Zigbee", "LoRaWAN", "Wi-Fi"],
      },
      {
        category: "Industrial Protocols",
        items: ["Modbus", "OPC-UA", "MQTT", "PROFINET"],
      },
      {
        category: "Hardware Toolchain",
        items: ["JTAG/SWD", "UART", "Logic analysis"],
      },
    ],
    standards: [
      "IEC 62443-4-1, 4-2 & 3-3",
      "ISO/SAE 21434",
      "OWASP IoT Top 10",
      "MITRE ATT&CK for ICS",
      "EU Cyber Resilience Act",
      "RED Delegated Regulation 2022/30",
    ],
    faqs: [
      {
        q: "Is testing safe to run on live industrial systems?",
        a: "Yes. All OT testing is operations-safe. We coordinate with your control engineers, use read-only techniques on production systems, and isolate disruptive tests to staging or maintenance windows.",
      },
      {
        q: "Do you test firmware as well as the network layer?",
        a: "Yes. We extract and analyse firmware — boot chain, update mechanisms, hardcoded credentials, and binary protections — alongside the network and protocol layer for full-stack coverage.",
      },
      {
        q: "Can this support RED / CRA product certification?",
        a: "Yes. We map findings to RED and CRA requirements, identify gaps before a notified body assessment, and produce the evidence you need for product readiness — though we do not issue conformity certificates ourselves.",
      },
    ],
    related: ["ai-security", "web-application-security", "mobile-application-security"],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
