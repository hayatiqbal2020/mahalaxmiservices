import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { supabaseConfigured } from "./supabase/env";
import { createClient } from "./supabase/server";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
};

export type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  created_at: string;
};

// Every admin page and admin action calls this first. It sends anyone who is
// not signed in, or whose account is switched off, back to the login page.
export const requireAdmin = cache(async () => {
  await connection(); // always decided per request, never at build time
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  // The token is verified here; the database checks it again on every query.
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, is_active, created_at")
    .eq("id", userId)
    .maybeSingle<Profile>();
  if (!profile?.is_active) redirect("/admin/signout?reason=inactive");

  return { supabase, profile };
});

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
