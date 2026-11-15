import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./env";

// Client tied to the signed-in admin's session (stored in cookies).
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called while rendering a page, where cookies are read-only.
          // src/proxy.ts refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}

// Client with no session: saving enquiries, sign-up, password-reset emails.
export function createAnonClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Full-access client for the few admin tasks Supabase only allows with the
// secret key (setting another user's password). Server only: the key is read
// from .env and never sent to the browser. Returns null when it is not set.
export function createServiceClient() {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!key) return null;
  return createSupabaseClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
