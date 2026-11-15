// Supabase connection details, set in .env.local (see .env.example).
// Both values are safe to expose to the browser: access is controlled by the
// row level security rules in supabase/schema.sql.
// Only the address is used, so a pasted "https://xyz.supabase.co/rest/v1" works too.
function baseUrl(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}
export const supabaseUrl = baseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const notConfiguredMessage =
  "Supabase is not connected yet. Add the project URL and key to .env.local.";
