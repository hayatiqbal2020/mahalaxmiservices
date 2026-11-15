import { site } from "@/lib/site";

const faqs = [
  {
    q: "How often should a fire extinguisher be refilled?",
    a: "After every use, even a partial one. Otherwise it depends on the type: many extinguishers are refilled once a year, and every unit should be inspected regularly. The due date is written on the service tag, and we can check it for you free of charge.",
  },
  {
    q: "Which fire extinguisher do I need?",
    a: "An ABC dry powder extinguisher covers most homes, shops and offices. Electrical rooms and server rooms are better protected by CO₂ or clean agent types, and places that store petrol, diesel or oil need foam. Use the extinguisher finder above, or ask us for a free site visit.",
  },
  {
    q: "Do you come to my location for refilling?",
    a: `Yes. We offer doorstep refilling and maintenance across ${site.city}, so you do not need to bring the extinguishers to us.`,
  },
  {
    q: "What is included in an AMC?",
    a: "An annual maintenance contract covers periodic inspection, pressure checks, refilling reminders and service records, so your extinguishers are always ready and your paperwork is in order for inspections.",
  },
  {
    q: "What is hydro pressure testing?",
    a: "It is a pressure test of the cylinder itself, to confirm it is still strong enough to be used safely. It is done periodically as per IS standards, and we will tell you when your cylinders are due.",
  },
  {
    q: "Can you help with a Fire NOC?",
    a: "Yes. We carry out a fire safety audit of your premises and support you with the documentation needed to apply for a Fire NOC.",
  },
  {
    q: "How do I get a quote?",
    a: "Call us, message us on WhatsApp or fill in the form below. Tell us the type of premises and roughly how many extinguishers you need, and we will arrange a free site visit.",
  },
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to the questions we hear most often.</p>
        </div>
        <div className="faq-list reveal">
          {faqs.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
