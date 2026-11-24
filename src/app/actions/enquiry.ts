"use server";

import { after } from "next/server";
import { sendEnquiryAlert } from "@/lib/notify";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  website?: string; // hidden field; real visitors leave it empty
};

// Saves a website enquiry to the `enquiry` table in Supabase.
export async function saveEnquiry(input: EnquiryInput): Promise<{ ok: boolean }> {
  const clean = (v: unknown, max: number) =>
    (typeof v === "string" ? v : "").trim().slice(0, max);

  if (clean(input.website, 10)) return { ok: true }; // bot filled the hidden field
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 20);
  if (!name || phone.length < 5) return { ok: false };
  if (!supabaseConfigured) return { ok: false };

  const enquiry = {
    name,
    phone,
    email: clean(input.email, 200) || null,
    service: clean(input.service, 120) || null,
    message: clean(input.message, 2000) || null,
  };
  const { error } = await createAnonClient().from("enquiry").insert(enquiry);
  if (error) {
    console.error("Saving enquiry failed:", error.message);
    return { ok: false };
  }
  // Email the business once the customer has had their answer.
  after(() => sendEnquiryAlert(enquiry));
  return { ok: true };
}
