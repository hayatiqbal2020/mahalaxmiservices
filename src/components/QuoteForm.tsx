"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);

  // Enquiry form -> WhatsApp message
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = (id: string) =>
      encodeURIComponent(
        (form.querySelector<HTMLInputElement>(`#${id}`)?.value ?? "").trim(),
      );
    const text = `Hello Mahalaxmi Services,%0A%0AName: ${v("name")}%0APhone: ${v("phone")}%0AEmail: ${v("email")}%0AService: ${v("service")}%0AMessage: ${v("msg")}`;
    setSent(true);
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
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
      <button type="submit" className="btn btn-primary">Send Enquiry →</button>
      <div className="form-msg" id="formMsg" style={{ display: sent ? "block" : "none" }}>Opening WhatsApp with your enquiry… We&apos;ll get back to you shortly!</div>
    </form>
  );
}
