const WEB3_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "d7a53461-cf51-4d90-a0c0-2d1240fceb17";

function getStatusNode(form) {
  let status = form.querySelector("[data-form-status]");
  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("data-form-status", "");
    form.appendChild(status);
  }
  return status;
}

function setStatus(form, type, message) {
  const status = getStatusNode(form);
  status.textContent = message;
  status.dataset.state = type;
}

function resetStatus(form) {
  const status = getStatusNode(form);
  status.textContent = "";
  status.dataset.state = "";
}

function getFallbackMailto(payload) {
  const subject = encodeURIComponent(
    `BlockSecBrain Inquiry - ${payload.service || "General Inquiry"}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Service: ${payload.service || "General Inquiry"}`,
      "",
      payload.message,
    ].join("\n")
  );

  return `mailto:salse@blocksecbrain.com?subject=${subject}&body=${body}`;
}

export function initContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const submitButton = form.querySelector(".form-submit");
  const serviceField = form.querySelector("#service");
  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");
  const honeypot = form.querySelector('input[name="company"]');

  if (!submitButton || !nameField || !emailField || !messageField) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    resetStatus(form);

    if (honeypot && honeypot.value.trim()) {
      setStatus(form, "success", "Request received. We will be in touch shortly.");
      form.reset();
      return;
    }

    const payload = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      service: serviceField ? serviceField.value.trim() : "",
      message: messageField.value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus(
        form,
        "warning",
        "Please provide your name, email, and project requirements before submitting."
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending Request...";

    try {
      const response = await fetch(WEB3_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "BlockSecBrain Website",
          subject: `BlockSecBrain Inquiry - ${payload.service || "General Inquiry"} | ${payload.name}`,
          ...payload,
        }),
      });

      if (!response.ok) {
        throw new Error(`Web3Forms returned ${response.status}`);
      }

      setStatus(
        form,
        "success",
        "Request securely received. Our specialists will review your scope and contact you within 24 hours."
      );
      form.reset();
    } catch (error) {
      setStatus(
        form,
        "error",
        "Secure transmission failed. Please use the direct email fallback below."
      );

      const fallback = form.querySelector("[data-mailto-fallback]");
      if (fallback) {
        fallback.setAttribute("href", getFallbackMailto(payload));
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Request Assessment";
    }
  });
}
