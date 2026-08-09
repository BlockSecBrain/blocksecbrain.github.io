const FORM_ENDPOINT = "https://form-handler.thelinuxr00tking.workers.dev/";

export interface ContactFields {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitContactForm(
  fields: ContactFields,
  honeypot: string
): Promise<SubmitResult> {
  if (honeypot.trim() !== "") return { ok: true };

  const payload = {
    from_name: "BlockSecBrain Website",
    subject: "New Contact Form Submission",
    ...fields,
  };

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) return { ok: true };
    return { ok: false, error: data.message || data.error || "Unable to send your request." };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to our secure contact service. Please try again later.",
    };
  }
}
