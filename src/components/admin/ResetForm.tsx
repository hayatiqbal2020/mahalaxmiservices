"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/env";

// The reset link in the email lands here with a one-time token after the "#".
// The new password is set with that token; nothing is stored in this browser.
export default function ResetForm() {
  const [state, setState] = useState({ ok: false, message: "" });
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "");
    if (password !== String(data.get("confirm") ?? "")) {
      setState({ ok: false, message: "The two passwords do not match." });
      return;
    }
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    if (!access_token || !refresh_token) {
      setState({
        ok: false,
        message:
          "This reset link is invalid or has expired. Please request a new one.",
      });
      return;
    }
    setPending(true);
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const session = await supabase.auth.setSession({ access_token, refresh_token });
    const result = session.error
      ? session
      : await supabase.auth.updateUser({ password });
    setPending(false);
    if (result.error) {
      setState({ ok: false, message: result.error.message });
      return;
    }
    window.history.replaceState(null, "", window.location.pathname);
    setState({ ok: true, message: "Password changed. You can log in now." });
  }

  return (
    <form onSubmit={onSubmit}>
      {state.message && (
        <p className={`note ${state.ok ? "ok" : "err"}`} role="status">{state.message}</p>
      )}
      {!state.ok && (
        <>
          <div className="field"><label htmlFor="password">New Password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
          <div className="field"><label htmlFor="confirm">Confirm New Password</label><input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required /></div>
          <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Set New Password"}</button>
        </>
      )}
      <div className="auth-links">
        <Link href="/admin/login">Go to login</Link>
        {!state.ok && <Link href="/admin/forgot-password">Request a new link</Link>}
      </div>
    </form>
  );
}
