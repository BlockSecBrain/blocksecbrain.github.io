import type { Metadata } from "next";
import { ServicePage, generateServiceMetadata } from "@/components/service-page";

export const metadata: Metadata = generateServiceMetadata("ai-security");

export default function Page() {
  return <ServicePage slug="ai-security" />;
}
