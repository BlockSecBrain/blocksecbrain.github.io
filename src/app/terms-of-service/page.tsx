import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Rules and guidelines that govern the use of BlockSecBrain services and website content.",
};

const SECTIONS = [
  {
    num: "1",
    title: "Acceptance of Terms",
    body: "By accessing or utilising BlockSecBrain services, you agree to comply with these terms. If you do not agree with any part of these terms, you must discontinue use immediately.",
  },
  {
    num: "2",
    title: "Service Usage & Authorisation",
    body: "Our security testing, including penetration testing and firmware analysis, must only be executed against systems, networks, or hardware that you explicitly own or hold written authorisation to test. Unauthorised use of our methodology is strictly prohibited.",
  },
  {
    num: "3",
    title: "Engagement Types & Offensive Operations",
    body: "BlockSecBrain conducts various security assessments, including black-box, grey-box, and white-box penetration testing, as well as full red teaming and offensive adversary simulations. Regardless of engagement depth, all offensive testing is strictly bound by a mutually agreed Rules of Engagement document.",
  },
  {
    num: "4",
    title: "Assessment Scope & Certification",
    body: "BlockSecBrain delivers security testing and advisory services. We are not a notified body or certification authority and do not issue conformity certificates, declarations, or compliance attestations on your behalf.",
  },
  {
    num: "5",
    title: "Liability Limitation",
    body: "BlockSecBrain acts as an advisory and testing service. We shall not be held liable for any direct, indirect, or consequential damages resulting from the exploitation of vulnerabilities discovered or undiscovered during our standard assessments or offensive operations.",
  },
  {
    num: "6",
    title: "Modifications to Service",
    body: "We reserve the right to modify or discontinue services, temporarily or permanently, with or without notice. Ongoing testing engagements will be honoured under their original Statement of Work agreements.",
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Rules and guidelines that govern the use of BlockSecBrain services and website content."
      activeTab="terms"
      sections={SECTIONS}
    />
  );
}
