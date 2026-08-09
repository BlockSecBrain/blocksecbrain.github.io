import type { Metadata } from "next";
import { ServicePage, generateServiceMetadata } from "@/components/service-page";

export const metadata: Metadata = generateServiceMetadata("iot-ot-security");

export default function Page() {
  return <ServicePage slug="iot-ot-security" />;
}
