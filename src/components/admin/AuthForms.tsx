"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import {
  forgotPassword,
  login,
  signup,
  type FormState,
} from "@/app/admin/actions";

const start: FormState = { ok: false, message: "" };

function Note({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p className={`note ${state.ok ? "ok" : "err"}`} role="status">
      {state.message}
    </p>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, start);
  const inactive = useSearchParams().get("reason") === "inactive";
  return (
    <form action={action}>
      {inactive && !state.message && (
        <p className="note err">Your account is not active. Ask an admin to activate it.</p>
      )}
      <Note state={state} />
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
      <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Logging in…" : "Log In"}</button>
      <div className="auth-links">
        <Link href="/admin/forgot-password">Forgot password?</Link>
        <span>New here? <Link href="/admin/signup">Create an account</Link></span>
      </div>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, start);
  return (
    <form action={action}>
      <Note state={state} />
      {!state.ok && (
        <>
          <div className="field"><label htmlFor="full_name">Full Name</label><input id="full_name" name="full_name" type="text" autoComplete="name" maxLength={120} required /></div>
          <div className="field"><label htmlFor="phone">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={20} pattern="[0-9+ ]{10,15}" /></div>
          <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
          <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
          <div className="field"><label htmlFor="confirm">Confirm Password</label><input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required /></div>
          <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Creating…" : "Sign Up"}</button>
        </>
      )}
      <div className="auth-links">
        <span>Already registered? <Link href="/admin/login">Log in</Link></span>
      </div>
    </form>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(forgotPassword, start);
  return (
    <form action={action}>
      <Note state={state} />
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
      <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Sending…" : "Send Reset Link"}</button>
      <div className="auth-links"><Link href="/admin/login">Back to login</Link></div>
    </form>
  );
}
