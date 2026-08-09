import type { Metadata } from "next";
import { ServicePage, generateServiceMetadata } from "@/components/service-page";

export const metadata: Metadata = generateServiceMetadata("web-application-security");

export default function Page() {
  return <ServicePage slug="web-application-security" />;
}
