"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Search,
  Loader2,
  Terminal,
  Network,
  FileText,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Mail,
  Server,
  Cpu,
  History,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TargetType =
  | "domain"
  | "subdomain"
  | "ipv4"
  | "ipv6"
  | "cidr"
  | "asn"
  | "mac"
  | "hash"
  | "email"
  | "unknown";

interface Target {
  type: TargetType;
  value: string;
  domain?: string;
}

type RowStatus = "ok" | "warn" | "bad" | "info" | "none";

interface Row {
  k: string;
  v: string;
  status?: RowStatus;
  html?: boolean;
}

interface ModuleResult {
  rows: Row[];
  status: string;
  statusClass: RowStatus;
}

interface ModuleState {
  id: string;
  title: string;
  status: string;
  statusClass: RowStatus | "";
  rows: Row[];
  loading: boolean;
}

// ===== Fetch helpers =====
// Most of these public OSINT APIs are keyless and CORS-open (DNS-over-HTTPS,
// RDAP, Shodan InternetDB, archive.org). crt.sh and raw page fetches are not,
// so those go through a public CORS proxy with a fallback proxy on failure.

const fetchCache = new Map<string, unknown>();

async function cachedFetch(url: string, timeout: number, type: "json" | "text"): Promise<unknown> {
  const key = `${type}::${url}`;
  if (fetchCache.has(key)) return fetchCache.get(key);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = type === "json" ? await res.json() : await res.text();
    fetchCache.set(key, data);
    return data;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson<T = any>(url: string, timeout = 9000): Promise<T | null> {
  try {
    return (await cachedFetch(url, timeout, "json")) as T;
  } catch {
    try {
      return (await cachedFetch(url, timeout, "json")) as T;
    } catch {
      return null;
    }
  }
}

async function fetchText(url: string, timeout = 9000): Promise<string | null> {
  try {
    return (await cachedFetch(url, timeout, "text")) as string;
  } catch {
    return null;
  }
}

async function corsJson<T = any>(url: string): Promise<T | null> {
  const direct = await fetchJson<T>("https://api.allorigins.win/raw?url=" + encodeURIComponent(url), 12000);
  return direct ?? (await fetchJson<T>("https://corsproxy.io/?url=" + encodeURIComponent(url), 12000));
}

async function corsBody(url: string): Promise<{ body: string }> {
  const wrapped = await fetchJson<{ contents?: string }>(
    "https://api.allorigins.win/get?url=" + encodeURIComponent(url),
    11000
  );
  if (wrapped && typeof wrapped.contents === "string") return { body: wrapped.contents };
  return { body: (await fetchText("https://corsproxy.io/?url=" + encodeURIComponent(url), 11000)) || "" };
}

async function resolveDns(name: string, type: string): Promise<any> {
  const viaGoogle = await fetchJson(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`, 7000);
  return viaGoogle ?? (await fetchJson(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, 7000));
}

function countryFlag(code?: string): string {
  if (!code || code.length !== 2) return "";
  return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function classifyHostname(hostname: string): "domain" | "subdomain" {
  const h = hostname.replace(/^www\./, "");
  const parts = h.split(".");
  const isCcSld = /\.(co|com|org|net|gov|ac|edu)\.[a-z]{2}$/i.test(h);
  return parts.length > (isCcSld ? 3 : 2) ? "subdomain" : "domain";
}

function apexDomain(hostname: string): string {
  const h = hostname.replace(/^www\./, "");
  const parts = h.split(".");
  const isCcSld = /\.(co|com|org|net|gov|ac|edu)\.[a-z]{2}$/i.test(h);
  return parts.slice(isCcSld ? -3 : -2).join(".");
}

function matchProvider(haystack: string, table: [string, string][]): string | null {
  const h = (haystack || "").toLowerCase();
  for (const [needle, label] of table) if (h.includes(needle)) return label;
  return null;
}

const CLOUD_PROVIDERS: [string, string][] = [
  ["amazon", "AWS"], ["aws", "AWS"], ["google", "Google Cloud"], ["microsoft", "Microsoft Azure"],
  ["azure", "Microsoft Azure"], ["cloudflare", "Cloudflare"], ["digitalocean", "DigitalOcean"],
  ["ovh", "OVH"], ["hetzner", "Hetzner"], ["linode", "Akamai/Linode"], ["akamai", "Akamai"],
  ["oracle", "Oracle Cloud"], ["alibaba", "Alibaba Cloud"], ["leaseweb", "Leaseweb"],
  ["fastly", "Fastly"], ["vultr", "Vultr"], ["godaddy", "GoDaddy"], ["namecheap", "Namecheap"],
];

const DNS_PROVIDERS: [string, string][] = [
  ["cloudflare", "Cloudflare"], ["awsdns", "AWS Route 53"], ["googledomains", "Google"],
  ["google", "Google"], ["azure-dns", "Azure DNS"], ["domaincontrol", "GoDaddy"],
  ["dnsmadeeasy", "DNS Made Easy"], ["nsone", "NS1"], ["akam", "Akamai"],
  ["digitalocean", "DigitalOcean"], ["registrar-servers", "Namecheap"],
  ["name-services", "eNom"], ["dnsimple", "DNSimple"],
];

const DKIM_SELECTORS = ["default", "google", "selector1", "selector2", "k1", "dkim", "mail", "s1", "zoho", "protonmail", "fm1"];

// Shared scratch space that modules progressively fill in for the summary panel.
interface ScanContext {
  ips?: string[];
  ip?: string;
  asn?: string;
  org?: string;
  country?: string;
  countryCode?: string;
}

// ===== Module implementations — each hits a real, free, keyless public API =====

async function moduleDns(name: string, ctx: ScanContext): Promise<ModuleResult> {
  const types = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA", "CAA"];
  const answers = await Promise.all(types.map((t) => resolveDns(name, t)));
  const rows: Row[] = [];
  let dnssec = false;
  const byType: Record<string, string[]> = {};
  answers.forEach((res, i) => {
    if (res?.AD) dnssec = true;
    const items = (res?.Answer || []) as { data: string }[];
    byType[types[i]] = items.map((a) => a.data);
    if (items.length) {
      items.forEach((a, j) => rows.push({ k: j === 0 ? types[i] : "", v: a.data, status: "info" }));
    } else {
      rows.push({ k: types[i], v: "", status: "none" });
    }
  });
  const wildcardProbe = await resolveDns(`zz${Math.random().toString(36).slice(2, 8)}.${name}`, "A");
  const wildcard = !!wildcardProbe?.Answer?.length;
  const dnsProvider = matchProvider((byType.NS || []).join(" "), DNS_PROVIDERS);

  rows.push({ k: "DNSSEC", v: dnssec ? "Signed & validated" : "Not enabled", status: dnssec ? "ok" : "warn" });
  rows.push({ k: "Wildcard", v: wildcard ? `Detected (*.${name})` : "Not detected", status: wildcard ? "warn" : "ok" });
  rows.push({ k: "DNS provider", v: dnsProvider || "Unknown", status: "info" });

  Object.assign(ctx, { ips: byType.A || [] });

  return {
    rows,
    status: byType.A?.length ? "resolves" : "no A",
    statusClass: byType.A?.length ? "ok" : "warn",
  };
}

async function moduleWhois(domain: string): Promise<ModuleResult> {
  const data = await fetchJson<any>(`https://rdap.org/domain/${domain}`);
  if (!data) return { rows: [{ k: "RDAP", v: "No record / not found", status: "warn" }], status: "n/a", statusClass: "warn" };

  const registrarEntity = (data.entities || []).find((e: any) => (e.roles || []).includes("registrar"));
  const eventDate = (action: string) => {
    const ev = data.events?.find((e: any) => e.eventAction === action);
    return ev ? ev.eventDate.slice(0, 10) : "";
  };
  const expires = eventDate("expiration");
  let expiryStatus: RowStatus = "info";
  if (expires) {
    const daysLeft = (new Date(expires).getTime() - Date.now()) / 86400000;
    expiryStatus = daysLeft < 30 ? "bad" : daysLeft < 90 ? "warn" : "ok";
  }
  const registrarName = registrarEntity
    ? (registrarEntity.vcardArray?.[1] || []).find((f: any) => f[0] === "fn")?.[3] ?? null
    : null;

  return {
    rows: [
      { k: "Domain", v: data.ldhName, status: "info" },
      { k: "Registrar", v: registrarName || "—" },
      { k: "Registered", v: eventDate("registration") },
      { k: "Updated", v: eventDate("last changed") },
      { k: "Expires", v: expires, status: expiryStatus },
      { k: "Status", v: (data.status || []).join(", ") },
      { k: "Nameservers", v: (data.nameservers || []).map((n: any) => n.ldhName).join("\n") },
    ],
    status: registrarName ? "ok" : "partial",
    statusClass: registrarName ? "ok" : "warn",
  };
}

async function moduleGeo(ip: string, ctx: ScanContext): Promise<ModuleResult & { mapUrl?: string }> {
  let data = await fetchJson<any>(`https://ipwho.is/${ip}`);
  if (!data?.success) {
    const alt = await fetchJson<any>(`https://ipapi.co/${ip}/json/`);
    if (alt) {
      data = {
        success: true,
        ip: alt.ip,
        city: alt.city,
        region: alt.region,
        country: alt.country_name,
        country_code: alt.country_code,
        latitude: alt.latitude,
        longitude: alt.longitude,
        connection: { org: alt.org, isp: alt.org, asn: (alt.asn || "").replace("AS", "") },
        timezone: { id: alt.timezone },
        type: alt.version,
      };
    }
  }
  if (!data?.success) return { rows: [{ k: "GeoIP", v: "Unavailable", status: "warn" }], status: "n/a", statusClass: "warn" };

  const cloud = matchProvider(data.connection?.org || data.connection?.isp || "", CLOUD_PROVIDERS);
  let ptr = "";
  if (ip.includes(".")) {
    const reverse = await resolveDns(`${ip.split(".").reverse().join(".")}.in-addr.arpa`, "PTR");
    ptr = reverse?.Answer?.[0]?.data || "";
  }

  Object.assign(ctx, {
    ip: data.ip,
    asn: data.connection?.asn ? "AS" + data.connection.asn : ctx.asn,
    org: data.connection?.org || data.connection?.isp,
    country: data.country,
    countryCode: data.country_code,
  });

  const lat = data.latitude;
  const lon = data.longitude;
  const mapUrl =
    lat != null
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.35).toFixed(4)}%2C${(lat - 0.25).toFixed(4)}%2C${(lon + 0.35).toFixed(4)}%2C${(lat + 0.25).toFixed(4)}&layer=mapnik&marker=${lat}%2C${lon}`
      : undefined;

  return {
    rows: [
      { k: "IP", v: data.ip, status: "info" },
      { k: "Type", v: data.type },
      { k: "Country", v: `${countryFlag(data.country_code)} ${data.country || ""}`.trim() },
      { k: "City / Region", v: [data.city, data.region].filter(Boolean).join(", ") },
      { k: "Timezone", v: data.timezone?.id },
      { k: "Org / ISP", v: data.connection?.org || data.connection?.isp },
      { k: "ASN", v: data.connection?.asn ? "AS" + data.connection.asn : "" },
      { k: "Cloud/Hosting", v: cloud || "Unknown", status: cloud ? "info" : "none" },
      { k: "Reverse DNS", v: ptr, status: ptr ? "ok" : "none" },
    ],
    status: "ok",
    statusClass: "ok",
    mapUrl,
  };
}

async function modulePorts(ip: string): Promise<ModuleResult> {
  let data = await fetchJson<any>(`https://internetdb.shodan.io/${ip}`);
  if (!data) data = await corsJson<any>(`https://internetdb.shodan.io/${ip}`);
  if (!data || data.detail) {
    return { rows: [{ k: "Shodan", v: `No indexed exposure for ${ip}`, status: "ok" }], status: "clean", statusClass: "ok" };
  }
  const ports: number[] = data.ports || [];
  const vulns: string[] = data.vulns || [];
  const cpes: string[] = data.cpes || [];
  const hostnames: string[] = data.hostnames || [];
  const tags: string[] = data.tags || [];

  return {
    rows: [
      { k: "IP", v: ip, status: "info" },
      { k: `Open ports (${ports.length})`, v: ports.length ? ports.join(", ") : "none indexed", status: ports.length ? "warn" : "ok" },
      {
        k: `Known CVEs (${vulns.length})`,
        v: vulns.length ? vulns.slice(0, 20).join(", ") + (vulns.length > 20 ? ` +${vulns.length - 20}` : "") : "none indexed",
        status: vulns.length ? "bad" : "ok",
      },
      { k: "Products (CPE)", v: cpes.join("\n") },
      { k: "Hostnames", v: hostnames.join("\n") },
      { k: "Tags", v: tags.join(", ") },
    ],
    status: `${ports.length} ports`,
    statusClass: vulns.length ? "bad" : ports.length ? "warn" : "ok",
  };
}

async function moduleCerts(domain: string): Promise<ModuleResult> {
  const certs = await corsJson<any[]>(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`);
  if (!Array.isArray(certs) || !certs.length) {
    return { rows: [{ k: "Certificates", v: "No certificates found", status: "warn" }], status: "n/a", statusClass: "warn" };
  }
  const sorted = certs.slice().sort((a, b) => new Date(b.not_before).getTime() - new Date(a.not_before).getTime());
  const latest = sorted[0];
  const issuerMatch = (latest.issuer_name || "").match(/O=([^,]+)/);
  const rows: Row[] = [
    { k: "Log entries", v: String(certs.length), status: "info" },
    { k: "Latest issuer", v: issuerMatch ? issuerMatch[1] : latest.issuer_name },
    {
      k: "Latest validity",
      v: `${(latest.not_before || "").slice(0, 10)} → ${(latest.not_after || "").slice(0, 10)}`,
      status: latest.not_after && new Date(latest.not_after) < new Date() ? "bad" : "ok",
    },
  ];
  const sans = [
    ...new Set(sorted.slice(0, 10).flatMap((c) => (c.name_value || "").split("\n").map((s: string) => s.trim()).filter(Boolean))),
  ];
  if (sans.length) rows.push({ k: "SANs (sample)", v: sans.slice(0, 10).join("\n"), status: "info" });

  return { rows, status: issuerMatch ? issuerMatch[1] : "ok", statusClass: "ok" };
}

async function moduleSubdomains(domain: string): Promise<ModuleResult> {
  const certs = await corsJson<any[]>(`https://crt.sh/?q=${encodeURIComponent("%." + domain)}&output=json`);
  const found = new Set<string>();
  (certs || []).forEach((c) =>
    String(c.name_value || "")
      .split("\n")
      .forEach((raw: string) => {
        const h = raw.trim().toLowerCase();
        if (h && !h.startsWith("*.") && h.endsWith(domain)) found.add(h);
      })
  );
  const list = [...found].sort();
  if (!list.length) return { rows: [{ k: "Subdomains", v: "None found", status: "warn" }], status: "n/a", statusClass: "warn" };
  return { rows: list.map((h) => ({ k: "host", v: h, status: "info" as const })), status: `${list.length} hosts`, statusClass: "ok" };
}

async function moduleEmailAuth(domain: string): Promise<ModuleResult> {
  const [txt, dmarcTxt, mx] = await Promise.all([
    resolveDns(domain, "TXT"),
    resolveDns("_dmarc." + domain, "TXT"),
    resolveDns(domain, "MX"),
  ]);
  const spf = (txt?.Answer || []).map((a: any) => a.data.replace(/"/g, "")).find((v: string) => v.includes("v=spf1"));
  const dmarc = (dmarcTxt?.Answer || []).map((a: any) => a.data.replace(/"/g, "")).find((v: string) => v.includes("v=DMARC1"));
  const mxRecords: string[] = (mx?.Answer || []).map((a: any) => a.data);
  const policy = dmarc ? /p=(\w+)/.exec(dmarc)?.[1] : undefined;

  const dkimSelectors: string[] = [];
  await Promise.all(
    DKIM_SELECTORS.map(async (sel) => {
      const res = await resolveDns(`${sel}._domainkey.${domain}`, "TXT");
      if (res?.Answer?.some((a: any) => /v=DKIM1|k=rsa|p=/.test(a.data))) dkimSelectors.push(sel);
    })
  );

  return {
    rows: [
      { k: "SPF", v: spf || "Not set", status: spf ? "ok" : "bad" },
      { k: "DKIM", v: dkimSelectors.length ? "Found: " + dkimSelectors.join(", ") : "No common selector", status: dkimSelectors.length ? "ok" : "warn" },
      { k: "DMARC", v: dmarc || "Not set — domain can be spoofed", status: policy === "reject" ? "ok" : dmarc ? "warn" : "bad" },
      { k: "Policy", v: policy ? "p=" + policy : "", status: policy === "reject" ? "ok" : policy ? "warn" : "none" },
      { k: "MX", v: mxRecords.join("\n"), status: mxRecords.length ? "info" : "warn" },
    ],
    status: policy ? "DMARC " + policy : spf ? "SPF only" : "open",
    statusClass: policy === "reject" ? "ok" : spf ? "warn" : "bad",
  };
}

async function moduleHeaders(host: string, ctx: { cdn?: string; waf?: string }): Promise<ModuleResult> {
  const headers: Record<string, string> = {};
  try {
    const res = await fetch("https://corsproxy.io/?url=" + encodeURIComponent("https://" + host), {
      signal: AbortSignal.timeout ? AbortSignal.timeout(9000) : undefined,
    });
    res.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
  } catch {
    /* fall through to proxy-json fallback below */
  }
  if (!Object.keys(headers).length) {
    const wrapped = await fetchJson<any>("https://api.allorigins.win/get?url=" + encodeURIComponent("https://" + host), 11000);
    const proxied = wrapped?.status?.headers;
    if (proxied) for (const k in proxied) headers[k.toLowerCase()] = proxied[k];
  }
  if (!Object.keys(headers).length) {
    return { rows: [{ k: "Headers", v: "Couldn't read (CORS limit)", status: "warn" }], status: "n/a", statusClass: "warn" };
  }

  const server = (headers.server || "").toLowerCase();
  let cdn: string | null = null;
  let waf: string | null = null;
  if (headers["cf-ray"] || server.includes("cloudflare")) { cdn = "Cloudflare"; waf = "Cloudflare"; }
  if (headers["x-amz-cf-id"] || server.includes("cloudfront")) cdn = cdn || "AWS CloudFront";
  if (server.includes("fastly") || (headers["x-served-by"] || "").includes("cache")) cdn = cdn || "Fastly";
  if (headers["x-akamai-transformed"] || server.includes("akamai")) cdn = cdn || "Akamai";
  if (headers["x-sucuri-id"] || headers["x-sucuri-cache"]) { cdn = cdn || "Sucuri"; waf = waf || "Sucuri"; }
  if ((headers["x-cdn"] || "").toLowerCase().includes("incapsula") || headers["x-iinfo"]) { cdn = cdn || "Imperva"; waf = waf || "Imperva Incapsula"; }
  if (headers["x-amzn-requestid"] || headers["x-amz-apigw-id"]) waf = waf || "AWS WAF/API GW";
  ctx.cdn = cdn || ctx.cdn;
  ctx.waf = waf || undefined;

  const checks: [string, string][] = [
    ["strict-transport-security", "HSTS"],
    ["content-security-policy", "CSP"],
    ["x-frame-options", "X-Frame-Options"],
    ["x-content-type-options", "X-Content-Type-Options"],
    ["referrer-policy", "Referrer-Policy"],
    ["permissions-policy", "Permissions-Policy"],
  ];
  const present = checks.filter(([h]) => headers[h]).length;
  const grade = ["F", "F", "E", "D", "C", "B", "A"][present] || "A";

  const rows: Row[] = [{ k: "Header grade", v: `${grade} · ${present}/${checks.length}`, status: present >= 5 ? "ok" : present >= 3 ? "warn" : "bad" }];
  for (const [h, label] of checks) rows.push({ k: label, v: headers[h] || "Not set", status: headers[h] ? "ok" : "bad" });
  if (headers.server) rows.push({ k: "Server", v: headers.server, status: "info" });
  if (headers["x-powered-by"]) rows.push({ k: "X-Powered-By", v: headers["x-powered-by"], status: "warn" });
  if (cdn) rows.push({ k: "CDN", v: cdn, status: "info" });
  if (waf) rows.push({ k: "WAF", v: waf, status: "ok" });

  return { rows, status: "grade " + grade, statusClass: present >= 5 ? "ok" : present >= 3 ? "warn" : "bad" };
}

const TECH_SIGNATURES: [string, string, string][] = [
  ["wp-content", "CMS", "WordPress"], ["__next_data__", "Framework", "Next.js"], ["data-reactroot", "Framework", "React"],
  ["cdn.shopify", "CMS", "Shopify"], ["squarespace", "CMS", "Squarespace"], ["drupal", "CMS", "Drupal"],
  ["ng-version", "Framework", "Angular"], ["__nuxt__", "Framework", "Nuxt"], ["jquery", "JS", "jQuery"],
  ["bootstrap", "JS", "Bootstrap"], ["tailwind", "JS", "Tailwind"], ["googletagmanager", "Analytics", "GTM"],
  ["gtag(", "Analytics", "GA4"], ["google-analytics", "Analytics", "GA"], ["connect.facebook", "Analytics", "Meta Pixel"],
  ["hotjar", "Analytics", "Hotjar"], ["plausible", "Analytics", "Plausible"], ["stripe", "Payments", "Stripe"],
  ["paypal", "Payments", "PayPal"], ["recaptcha", "Security", "reCAPTCHA"], ["hcaptcha", "Security", "hCaptcha"],
  ["cloudflare", "Infra", "Cloudflare"], ["fonts.googleapis", "Fonts", "Google Fonts"],
];

async function moduleTech(host: string, ctx: { server?: string; cdn?: string }): Promise<ModuleResult> {
  const { body } = await corsBody("https://" + host);
  if (!body) return { rows: [{ k: "Tech", v: "Couldn't fetch homepage", status: "warn" }], status: "n/a", statusClass: "warn" };

  const lower = body.toLowerCase();
  const buckets: Record<string, string[]> = { CMS: [], Framework: [], JS: [], Analytics: [], Payments: [], Security: [], Fonts: [], Infra: [] };
  for (const [needle, bucket, label] of TECH_SIGNATURES) {
    if (lower.includes(needle) && !buckets[bucket].includes(label)) buckets[bucket].push(label);
  }
  if (ctx.server) buckets.Infra.push("Server: " + ctx.server);
  if (ctx.cdn) buckets.Infra.push(ctx.cdn);

  const rows: Row[] = Object.keys(buckets).map((bucket) => {
    const values = [...new Set(buckets[bucket])];
    return { k: bucket, v: values.length ? values.join(", ") : "—", status: values.length ? "ok" : "none" };
  });
  const total = Object.values(buckets).reduce((sum, v) => sum + v.length, 0);
  return { rows, status: `${total} detected`, statusClass: total ? "ok" : "warn" };
}

async function moduleWayback(host: string): Promise<ModuleResult> {
  const availability = await fetchJson<any>(`https://archive.org/wayback/available?url=${encodeURIComponent(host)}`);
  const closest = availability?.archived_snapshots?.closest;
  let cdx = await fetchJson<any[]>(
    `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(host)}/*&output=json&collapse=urlkey&limit=40&filter=statuscode:200`
  );
  if (!cdx) {
    cdx = await corsJson<any[]>(
      `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(host)}/*&output=json&collapse=urlkey&limit=40&filter=statuscode:200`
    );
  }
  let count: number | null = null;
  let first: string | null = null;
  let last: string | null = null;
  if (Array.isArray(cdx) && cdx.length > 1) {
    const entries = cdx.slice(1);
    count = entries.length;
    const stamps = entries.map((e) => e[1]).sort();
    first = stamps[0];
    last = stamps[stamps.length - 1];
  }
  const fmt = (s: string | null) => (s ? `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}` : "");

  return {
    rows: [
      { k: "Latest snapshot", v: closest ? fmt(closest.timestamp) : "—", status: closest ? "ok" : "none" },
      { k: "First seen", v: fmt(first) },
      { k: "Last seen", v: fmt(last) },
      { k: "Captured URLs", v: count != null ? String(count) : "", status: "info" },
    ],
    status: count ? `${count} caps` : "none",
    statusClass: count ? "ok" : "warn",
  };
}

function modulePivots(target: Target): ModuleResult {
  const v = target.value;
  const links: [string, string][] =
    target.type === "ipv4" || target.type === "ipv6"
      ? [
          ["Shodan", `https://www.shodan.io/host/${encodeURIComponent(v)}`],
          ["Censys", `https://search.censys.io/hosts/${encodeURIComponent(v)}`],
          ["VirusTotal", `https://www.virustotal.com/gui/ip-address/${encodeURIComponent(v)}`],
          ["AbuseIPDB", `https://www.abuseipdb.com/check/${encodeURIComponent(v)}`],
          ["BGP.HE", `https://bgp.he.net/ip/${encodeURIComponent(v)}`],
        ]
      : [
          ["Shodan", `https://www.shodan.io/search?query=hostname:${encodeURIComponent(v)}`],
          ["VirusTotal", `https://www.virustotal.com/gui/domain/${encodeURIComponent(v)}`],
          ["URLScan", `https://urlscan.io/domain/${encodeURIComponent(v)}`],
          ["SecurityTrails", `https://securitytrails.com/domain/${encodeURIComponent(v)}/dns`],
          ["crt.sh", `https://crt.sh/?q=${encodeURIComponent(v)}`],
          ["Wayback", `https://web.archive.org/web/*/${encodeURIComponent(v)}/*`],
        ];
  return { rows: links.map(([label, url]) => ({ k: label, v: url, status: "info", html: true })), status: `${links.length} links`, statusClass: "ok" };
}

// ===== Target classification =====

function classifyTarget(raw: string): Target | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  if (/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}\/\d{1,2}$/.test(trimmed)) return { type: "cidr", value: trimmed };
  if (/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(trimmed)) return { type: "ipv4", value: trimmed };
  if (/^as\d{1,10}$/i.test(trimmed)) return { type: "asn", value: trimmed.toUpperCase() };
  if (/^([0-9a-f]{2}[:-]){5}[0-9a-f]{2}$/i.test(trimmed)) return { type: "mac", value: trimmed.toUpperCase() };
  if (/^[a-f0-9]{64}$/i.test(trimmed)) return { type: "hash", value: lower };
  if (/^[a-f0-9]{40}$/i.test(trimmed)) return { type: "hash", value: lower };
  if (/^[a-f0-9]{32}$/i.test(trimmed)) return { type: "hash", value: lower };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return { type: "email", value: lower, domain: lower.split("@")[1] };
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return { type: classifyHostname(url.hostname), value: url.hostname };
    } catch {
      /* not a valid URL, fall through */
    }
  }
  if (/^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i.test(trimmed) && trimmed.includes(":")) return { type: "ipv6", value: lower };
  const bareHost = lower.replace(/^www\./, "").replace(/\/.*$/, "").replace(/:.*/, "");
  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(bareHost)) return { type: classifyHostname(bareHost), value: bareHost };
  return { type: "unknown", value: trimmed };
}

const MODULE_META: Record<string, { title: string; icon: React.ComponentType<{ className?: string }> }> = {
  dns: { title: "DNS Records", icon: Network },
  whois: { title: "WHOIS / RDAP", icon: FileText },
  geo: { title: "GeoIP & Map", icon: MapPin },
  ports: { title: "Ports & CVEs", icon: ShieldAlert },
  certs: { title: "TLS Certificates", icon: ShieldCheck },
  subs: { title: "Subdomains", icon: Globe },
  email: { title: "Email Authentication", icon: Mail },
  headers: { title: "Security Headers", icon: Server },
  tech: { title: "Technology Stack", icon: Cpu },
  wayback: { title: "Wayback History", icon: History },
  pivots: { title: "Pivots & Links", icon: ExternalLink },
};

const STATUS_TEXT: Record<string, string> = {
  ok: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-red-400",
  info: "text-muted-foreground",
  none: "text-muted-foreground/60",
};
const STATUS_DOT: Record<string, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  bad: "bg-red-400",
  info: "bg-muted-foreground",
  none: "bg-muted-foreground/30",
};

function ModuleRow({ row }: { row: Row }) {
  if (row.html && row.v.startsWith("http")) {
    return (
      <a
        href={row.v}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
      >
        open <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  return <span className={cn("text-xs", !row.v && "text-muted-foreground/40")}>{row.v || "—"}</span>;
}

function ModuleCard({ mod }: { mod: ModuleState }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const meta = MODULE_META[mod.id];
  const Icon = meta?.icon ?? FileText;

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition hover:bg-accent/10"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-semibold">{mod.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {mod.loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
          ) : (
            <span className={cn("font-mono text-[10px]", STATUS_TEXT[mod.statusClass] || "text-muted-foreground")}>{mod.status}</span>
          )}
          <span className="text-xs text-muted-foreground">{collapsed ? "▸" : "▾"}</span>
        </div>
      </button>
      {!collapsed && (
        <div className="border-t border-border/40 p-3">
          {mod.loading ? (
            <div className="space-y-2">
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted/40" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted/40" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-muted/40" />
            </div>
          ) : (
            <div className="space-y-1">
              {mod.rows.map((row, i) => (
                <div key={i} className="flex items-start gap-2 border-b border-border/20 py-1 last:border-0">
                  {row.status && <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[row.status])} />}
                  <span className="w-32 shrink-0 font-mono text-[11px] text-muted-foreground">{row.k}</span>
                  <div className="min-w-0 flex-1">
                    <ModuleRow row={row} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function OsintConsole() {
  const [target, setTarget] = React.useState("");
  const [scanning, setScanning] = React.useState(false);
  const [modules, setModules] = React.useState<ModuleState[]>([]);
  const [current, setCurrent] = React.useState<Target | null>(null);
  const [summary, setSummary] = React.useState<ScanContext>({});
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const runScan = React.useCallback(
    async (raw?: string) => {
      const input = (raw ?? target).trim();
      if (!input) {
        toast.error("Enter a domain, IP, or target");
        return;
      }
      const parsed = classifyTarget(input);
      if (!parsed || parsed.type === "unknown") {
        toast.error("Couldn't classify that input");
        return;
      }

      setTarget(input);
      setCurrent(parsed);
      setScanning(true);
      const ctx: ScanContext & { cdn?: string; waf?: string; server?: string } = {};
      setSummary(ctx);

      const isDomainLike = parsed.type === "domain" || parsed.type === "subdomain" || parsed.type === "email";
      const isIp = parsed.type === "ipv4" || parsed.type === "ipv6";

      const ids = isDomainLike
        ? ["dns", "whois", "geo", "ports", "certs", "subs", "email", "headers", "tech", "wayback", "pivots"]
        : isIp
        ? ["geo", "ports", "pivots"]
        : ["pivots"];

      setModules(ids.map((id) => ({ id, title: MODULE_META[id].title, status: "…", statusClass: "", rows: [], loading: true })));

      const setModule = (id: string, result: ModuleResult) =>
        setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...result, loading: false } : m)));

      const failWarn = (id: string, label: string): ModuleResult => ({
        rows: [{ k: label, v: "Failed", status: "warn" }],
        status: "error",
        statusClass: "warn",
      });

      if (isDomainLike) {
        const host = parsed.type === "email" ? parsed.domain! : parsed.value;
        const apex = apexDomain(host);
        const jobs: Promise<unknown>[] = [];

        jobs.push(
          moduleDns(host, ctx)
            .then((r) => setModule("dns", r))
            .catch(() => setModule("dns", failWarn("dns", "DNS")))
        );
        await new Promise((r) => setTimeout(r, 100));

        jobs.push(
          moduleWhois(apex)
            .then((r) => setModule("whois", r))
            .catch(() => setModule("whois", failWarn("whois", "WHOIS")))
        );

        const ip = ctx.ips?.[0];
        if (ip) {
          jobs.push(
            moduleGeo(ip, ctx)
              .then((r) => setModule("geo", r))
              .catch(() => setModule("geo", failWarn("geo", "GeoIP")))
          );
          jobs.push(
            modulePorts(ip)
              .then((r) => setModule("ports", r))
              .catch(() => setModule("ports", failWarn("ports", "Ports")))
          );
        } else {
          setModule("geo", { rows: [{ k: "geo", v: "Domain has no A record", status: "warn" }], status: "no IP", statusClass: "warn" });
          setModule("ports", { rows: [{ k: "ports", v: "Domain has no A record", status: "warn" }], status: "no IP", statusClass: "warn" });
        }

        jobs.push(moduleCerts(apex).then((r) => setModule("certs", r)).catch(() => setModule("certs", failWarn("certs", "Certs"))));
        jobs.push(moduleSubdomains(apex).then((r) => setModule("subs", r)).catch(() => setModule("subs", failWarn("subs", "Subs"))));
        jobs.push(moduleEmailAuth(apex).then((r) => setModule("email", r)).catch(() => setModule("email", failWarn("email", "Email"))));
        jobs.push(moduleHeaders(host, ctx).then((r) => setModule("headers", r)).catch(() => setModule("headers", failWarn("headers", "Headers"))));
        jobs.push(moduleTech(host, ctx).then((r) => setModule("tech", r)).catch(() => setModule("tech", failWarn("tech", "Tech"))));
        jobs.push(moduleWayback(host).then((r) => setModule("wayback", r)).catch(() => setModule("wayback", failWarn("wayback", "Wayback"))));
        setModule("pivots", modulePivots(parsed));

        const summaryTimer = setInterval(() => setSummary({ ...ctx }), 900);
        await Promise.allSettled(jobs);
        clearInterval(summaryTimer);
        setSummary({ ...ctx });
      } else if (isIp) {
        const jobs = [
          moduleGeo(parsed.value, ctx).then((r) => setModule("geo", r)).catch(() => setModule("geo", failWarn("geo", "GeoIP"))),
          modulePorts(parsed.value).then((r) => setModule("ports", r)).catch(() => setModule("ports", failWarn("ports", "Ports"))),
        ];
        setModule("pivots", modulePivots(parsed));
        await Promise.allSettled(jobs);
        setSummary({ ...ctx });
      } else {
        setModule("pivots", modulePivots(parsed));
      }

      setScanning(false);
      toast.success(`Scan complete for ${parsed.value}`);
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
    [target]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !scanning) runScan();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="domain · IP · ASN · email (e.g. google.com, 1.1.1.1)"
            className="pl-10 font-mono"
            aria-label="OSINT target"
          />
        </div>
        <Button onClick={() => runScan()} disabled={scanning} size="lg" className="cyber-glow">
          {scanning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Terminal className="mr-2 h-4 w-4" />}
          {scanning ? "Scanning…" : "Scan"}
        </Button>
      </div>

      {!current && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {["google.com", "1.1.1.1", "github.com", "cloudflare.com"].map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setTarget(ex);
                runScan(ex);
              }}
              className="rounded-full border border-border/50 bg-background/40 px-3 py-1 font-mono text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {current && (
        <div ref={resultsRef} className="space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-primary">{current.value}</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {current.type}
                  </Badge>
                  {scanning && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {summary.ip || ""}
                  {summary.asn ? ` · ${summary.asn}` : ""}
                  {summary.org ? ` · ${summary.org}` : ""}
                  {summary.country ? ` · ${countryFlag(summary.countryCode)} ${summary.country}` : ""}
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/#contact">Request full assessment</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {modules.map((m) => (
              <ModuleCard key={m.id} mod={m} />
            ))}
          </div>

          <div className="rounded-lg border border-border/40 bg-background/40 p-3 text-center text-xs text-muted-foreground">
            Passive OSINT from public sources (DNS-over-HTTPS, RDAP, Shodan InternetDB, crt.sh, Archive.org). Data is
            real but read-only — no active scanning or exploitation. For active validation,{" "}
            <Link href="/#contact" className="text-primary hover:underline">
              request an assessment
            </Link>
            .
          </div>
        </div>
      )}
    </div>
  );
}
