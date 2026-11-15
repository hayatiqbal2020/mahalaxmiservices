import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

// Ends the session, then shows the login page. Used when an account that is
// signed in has been deactivated.
export async function GET(request: NextRequest) {
  if (supabaseConfigured) await (await createClient()).auth.signOut();
  const url = new URL("/admin/login", request.url);
  if (request.nextUrl.searchParams.get("reason") === "inactive")
    url.searchParams.set("reason", "inactive");
  return NextResponse.redirect(url);
}
