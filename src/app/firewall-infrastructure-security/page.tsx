import type { Metadata } from "next";
import { ServicePage, generateServiceMetadata } from "@/components/service-page";

export const metadata: Metadata = generateServiceMetadata("firewall-infrastructure-security");

export default function Page() {
  return <ServicePage slug="firewall-infrastructure-security" />;
}
