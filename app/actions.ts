"use server";

import { z } from "zod";

export type ContactState = {
  ok: boolean;
  message: string;
  simulated?: boolean;
};

const contactSchema = z.object({
  name: z.string().min(1, "name is required").max(100),
  email: z.string().email("invalid email"),
  message: z
    .string()
    .min(10, "message should be at least 10 characters")
    .max(4000),
});

export async function sendContact(
  prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const data = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    message: String(formData.get("message") || ""),
  };

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    // Zod exposes "issues" (not "errors")
    const first = parsed.error.issues[0]?.message ?? "invalid input";
    return { ok: false, message: first };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.log("Simulated contact message:", parsed.data);
    return {
      ok: true,
      message:
        "message captured (simulation). set RESEND_API_KEY and CONTACT_TO_EMAIL to send real mail.",
      simulated: true,
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sugarangel Contact <noreply@mail.sugarangel>",
      to: [CONTACT_TO_EMAIL],
      subject: `New message from ${parsed.data.name}`,
      reply_to: parsed.data.email,
      html: `<h2>New Contact Message</h2>
             <p><strong>From:</strong> ${parsed.data.name} (${parsed.data.email})</p>
             <pre style="white-space:pre-wrap">${parsed.data.message}</pre>`,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, message: `failed to send: ${res.status} ${text}` };
  }

  return { ok: true, message: "message sent! thank you." };
}
