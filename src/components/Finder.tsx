"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const options = [
  {
    id: "home",
    label: "🏠 Home / Flat",
    picks: ["ABC Dry Powder, 1 kg or 2 kg"],
    note: "Keep one near the kitchen and one near the main electrical board.",
  },
  {
    id: "shop",
    label: "🏢 Shop / Office",
    picks: ["ABC Dry Powder, 4 kg or 6 kg", "CO₂, 2 kg near electrical panels"],
    note: "Place them near exits and where they are easy to see and reach.",
  },
  {
    id: "kitchen",
    label: "🍳 Restaurant / Kitchen",
    picks: [
      "Modular ceiling-mounted unit above the cooking area",
      "ABC Dry Powder, 4 kg or 6 kg",
      "Mechanical Foam, 9 L",
    ],
    note: "Automatic units react to heat even when nobody is in the kitchen.",
  },
  {
    id: "server",
    label: "🖥️ Server / Electrical Room",
    picks: ["CO₂, 2 kg to 4.5 kg", "Clean Agent, 2 kg or 4 kg"],
    note: "Both leave no residue, so equipment is not damaged.",
  },
  {
    id: "factory",
    label: "🏭 Factory / Warehouse",
    picks: [
      "ABC Dry Powder, 6 kg or 9 kg",
      "Mechanical Foam, 50 L trolley where liquids are stored",
      "Fire hydrant and alarm system",
    ],
    note: "Larger premises usually need a mix of types and a hydrant system.",
  },
  {
    id: "petrol",
    label: "⛽ Petrol Pump / Garage",
    picks: ["Mechanical Foam, 9 L or 50 L", "ABC Dry Powder, 6 kg or 9 kg"],
    note: "Foam smothers petrol, diesel and oil fires.",
  },
  {
    id: "school",
    label: "🏫 School / Hospital",
    picks: [
      "ABC Dry Powder, 4 kg or 6 kg on every floor",
      "Clean Agent near sensitive equipment",
      "Fire alarm system",
    ],
    note: "Staff training and mock drills matter as much as the equipment.",
  },
  {
    id: "vehicle",
    label: "🚚 Vehicle",
    picks: ["ABC Dry Powder, 1 kg or 2 kg", "Clean Agent, 2 kg"],
    note: "Mount it within reach of the driver.",
  },
];

export default function Finder() {
  const [id, setId] = useState(options[0].id);
  const current = options.find((o) => o.id === id) ?? options[0];
  const ask = `${site.whatsappBase}?text=${encodeURIComponent(
    `Hello Mahalaxmi Services, I need fire extinguishers for: ${current.label.replace(/^\S+\s/, "")}. Please share a quote.`,
  )}`;

  return (
    <section className="finder" id="finder">
      <div className="container">
        <div className="section-head reveal">
          <span className="tag">Extinguisher Finder</span>
          <h2>Which Extinguisher Do You Need?</h2>
          <p>Choose your type of premises to see what we usually recommend.</p>
        </div>
        <div className="finder-box reveal">
          <div className="finder-tabs" role="tablist" aria-label="Type of premises">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={o.id === id}
                className={o.id === id ? "active" : ""}
                onClick={() => setId(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="finder-result" role="tabpanel">
            <h3>We usually recommend</h3>
            <ul className="check-list">
              {current.picks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>{current.note}</p>
            <small>
              This is a general guide. The exact type, size and number depend on
              a site survey.
            </small>
            <a href={ask} target="_blank" rel="noopener" className="btn btn-primary">
              Ask for a Quote on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
