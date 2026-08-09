import type { Metadata } from "next";
import { ServicePage, generateServiceMetadata } from "@/components/service-page";

export const metadata: Metadata = generateServiceMetadata("cloud-security");

export default function Page() {
  return <ServicePage slug="cloud-security" />;
}
