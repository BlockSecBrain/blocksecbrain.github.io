import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BlockSecBrain handles website inquiries, assessment scoping details, and communication data.",
};

const SECTIONS = [
  {
    num: "1",
    title: "Information We Collect",
    body: "When you contact BlockSecBrain, we may collect your name, email address, selected service area, and the project details you choose to share through the contact form or direct email.",
  },
  {
    num: "2",
    title: "How We Use Information",
    body: "We use inquiry data to understand your security assessment needs, respond to your request, prepare scoping discussions, and maintain appropriate communication records for authorised engagements.",
  },
  {
    num: "3",
    title: "Confidentiality",
    body: "Security testing discussions may include sensitive technical context. We treat shared information as confidential and restrict use to scoping, delivery, reporting, and client communication.",
  },
  {
    num: "4",
    title: "Third-Party Form Processing",
    body: "The website contact form may use a secure form-processing provider to transmit inquiries. You can always use direct email instead if your organisation requires a specific communication path.",
  },
  {
    num: "5",
    title: "Data Retention",
    body: "We retain inquiry data only as long as necessary to respond to your request and maintain communication records. Engagement-specific data is handled under the terms of the signed Statement of Work and NDA.",
  },
  {
    num: "6",
    title: "Contact",
    body: "For privacy questions or data handling requests, contact sales@blocksecbrain.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How BlockSecBrain handles website inquiries, assessment scoping details, and communication data."
      activeTab="privacy"
      sections={SECTIONS}
    />
  );
}
