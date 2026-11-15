"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Sends the customer's refill date to the business on WhatsApp.
export default function RefillReminder() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const text = [
      "Hello Mahalaxmi Services,",
      "",
      "Please remind me when my fire extinguishers are due for refilling.",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Refill due: ${get("due")}`,
      `Number of extinguishers: ${get("qty") || "-"}`,
    ].join("\n");
    setSent(true);
    window.open(`${site.whatsappBase}?text=${encodeURIComponent(text)}`, "_blank");
    form.reset();
  }

  return (
    <section className="reminder" id="reminder">
      <div className="container reminder-grid">
        <div className="reveal">
          <span className="tag">Refill Reminder</span>
          <h2>Never Miss a Refill Date</h2>
          <p>
            Tell us when your extinguishers are due. We will note it and contact
            you before the date, so they are never out of service.
          </p>
          <ul className="check-list">
            <li>Free reminder</li>
            <li>Doorstep refilling</li>
          </ul>
        </div>
        <form className="reveal" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field"><label htmlFor="r-name">Full Name *</label><input id="r-name" name="name" type="text" placeholder="Your name" required /></div>
            <div className="field"><label htmlFor="r-phone">Phone Number *</label><input id="r-phone" name="phone" type="tel" placeholder="+91" required pattern="[0-9+ ]{10,15}" /></div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="r-due">Refill Due Month *</label><input id="r-due" name="due" type="month" required /></div>
            <div className="field"><label htmlFor="r-qty">Number of Extinguishers</label><input id="r-qty" name="qty" type="number" min="1" placeholder="e.g. 4" /></div>
          </div>
          <button type="submit" className="btn btn-primary">Set My Reminder →</button>
          <div className="form-msg" style={{ display: sent ? "block" : "none" }}>Opening WhatsApp with your reminder request…</div>
        </form>
      </div>
    </section>
  );
}
