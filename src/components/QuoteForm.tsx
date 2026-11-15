"use client";

import { useState } from "react";
import { saveEnquiry } from "@/app/actions/enquiry";
import { site } from "@/lib/site";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);

  // Enquiry form -> saved to the database, and opened as a WhatsApp message
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = (id: string) =>
      (
        form.querySelector<HTMLInputElement>(`#${id}`)?.value ?? ""
      ).trim();
    const v = (id: string) => encodeURIComponent(raw(id));
    const text = `Hello Mahalaxmi Services,%0A%0AName: ${v("name")}%0APhone: ${v("phone")}%0AEmail: ${v("email")}%0AService: ${v("service")}%0AMessage: ${v("msg")}`;
    // Saving runs in the background so WhatsApp still opens straight away.
    saveEnquiry({
      name: raw("name"),
      phone: raw("phone"),
      email: raw("email"),
      service: raw("service"),
      message: raw("msg"),
      website: raw("website"),
    }).catch(() => {});
    setSent(true);
    window.open(`${site.whatsappBase}?text=${text}`, "_blank");
    form.reset();
  }

  return (
    <form id="quoteForm" className="reveal" onSubmit={onSubmit}>
      <h3>Request a Free Quote</h3>
      <div className="form-row">
        <div className="field"><label htmlFor="name">Full Name *</label><input id="name" type="text" placeholder="Your name" required /></div>
        <div className="field"><label htmlFor="phone">Phone Number *</label><input id="phone" type="tel" placeholder="+91" required pattern="[0-9+ ]{10,15}" /></div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" placeholder="you@example.com" /></div>
        <div className="field"><label htmlFor="service">Service Required *</label>
          <select id="service" required>
            <option value="">Select a service</option>
            <option>New Fire Extinguisher Purchase</option>
            <option>Refilling</option>
            <option>Installation</option>
            <option>AMC (Annual Maintenance)</option>
            <option>Hydro Pressure Testing</option>
            <option>Fire Safety Training</option>
            <option>Fire Hydrant / Alarm System</option>
            <option>Fire Audit &amp; NOC</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="msg">Message</label><textarea id="msg" placeholder="Tell us about your requirement (type of premises, quantity, etc.)"></textarea></div>
      <input id="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
      <button type="submit" className="btn btn-primary">Send Enquiry →</button>
      <p className="form-alt">No WhatsApp? Call <a href={site.telHref}>{site.phone}</a> or <a href={site.mailHref}>email us</a>.</p>
      <div className="form-msg" id="formMsg" style={{ display: sent ? "block" : "none" }}>Enquiry sent. Opening WhatsApp too… We&apos;ll get back to you shortly!</div>
    </form>
  );
}
