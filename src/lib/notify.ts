import "server-only";
import nodemailer from "nodemailer";
import { site } from "./site";

type NewEnquiry = {
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
};

// Email settings, from .env (see .env.example). With a Gmail account only
// SMTP_USER and SMTP_PASS (a Google "app password") are needed.
const smtp = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  user: process.env.SMTP_USER || "",
  pass: (process.env.SMTP_PASS || "").replace(/\s+/g, ""), // app passwords are shown with spaces
  to: process.env.ENQUIRY_ALERT_TO || site.email,
};
export const alertsConfigured = Boolean(smtp.user && smtp.pass);

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();
const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Emails the business about a new website enquiry. Never throws: a failed
// email must not affect the customer, whose enquiry is already saved.
export async function sendEnquiryAlert(e: NewEnquiry) {
  if (!alertsConfigured) return;
  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const adminLink = `${site.url}/admin/enquiries?status=new`;
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Phone", e.phone],
    ["Email", e.email || "—"],
    ["Service", e.service || "—"],
    ["Message", e.message || "—"],
    ["Received", when],
  ];
  const digits = e.phone.replace(/[^0-9]/g, "");
  const whatsapp = `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;

  try {
    await nodemailer
      .createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: { user: smtp.user, pass: smtp.pass },
      })
      .sendMail({
        from: { name: `${site.name} Website`, address: smtp.user },
        to: smtp.to,
        replyTo: e.email ? { name: oneLine(e.name), address: oneLine(e.email) } : undefined,
        subject: oneLine(`New enquiry: ${e.name}${e.service ? ` – ${e.service}` : ""}`).slice(0, 150),
        text: [
          "A new enquiry came in from the website.",
          "",
          ...rows.map(([k, v]) => `${k}: ${v}`),
          "",
          `Call: tel:${digits}`,
          `WhatsApp: ${whatsapp}`,
          `Open in admin: ${adminLink}`,
        ].join("\n"),
        html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#33333a;max-width:560px">
<h2 style="margin:0 0 4px;font-size:18px;color:#d7261e">New website enquiry</h2>
<p style="margin:0 0 16px;color:#6b6b75">${esc(when)}</p>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #eee;color:#6b6b75;width:90px;vertical-align:top">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
          )
          .join("")}</table>
<p style="margin:20px 0 0">
<a href="tel:${digits}" style="display:inline-block;padding:10px 16px;margin:0 6px 6px 0;background:#d7261e;color:#fff;border-radius:6px;text-decoration:none">Call ${esc(e.phone)}</a>
<a href="${whatsapp}" style="display:inline-block;padding:10px 16px;margin:0 6px 6px 0;background:#25d366;color:#fff;border-radius:6px;text-decoration:none">WhatsApp</a>
<a href="${adminLink}" style="display:inline-block;padding:10px 16px;margin:0 6px 6px 0;background:#6676f4;color:#fff;border-radius:6px;text-decoration:none">Open in admin</a>
</p></div>`,
      });
  } catch (err) {
    console.error("Enquiry alert email failed:", err instanceof Error ? err.message : err);
  }
}
