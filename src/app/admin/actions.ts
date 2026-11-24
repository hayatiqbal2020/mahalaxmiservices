"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import {
  followupSetupMessage,
  isEnquiryStatus,
  MISSING_COLUMN,
} from "@/lib/enquiry-status";
import { site } from "@/lib/site";
import { notConfiguredMessage, supabaseConfigured } from "@/lib/supabase/env";
import {
  createAnonClient,
  createClient,
  createServiceClient,
} from "@/lib/supabase/server";

export type FormState = { ok: boolean; message: string };

const str = (form: FormData, key: string, max = 200) => {
  const v = form.get(key);
  return (typeof v === "string" ? v : "").trim().slice(0, max);
};

async function origin() {
  return (await headers()).get("origin") ?? site.url;
}

async function sendResetEmail(email: string) {
  return createAnonClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${await origin()}/admin/reset-password`,
  });
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!supabaseConfigured) return { ok: false, message: notConfiguredMessage };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: str(form, "email"),
    password: str(form, "password"),
  });
  if (error || !data.user) {
    const unconfirmed = error?.code === "email_not_confirmed";
    return {
      ok: false,
      message: unconfirmed
        ? "Please confirm your email first. Open the link we sent you."
        : "Wrong email or password.",
    };
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_active")
    .eq("id", data.user.id)
    .maybeSingle();
  if (!profile?.is_active) {
    await supabase.auth.signOut();
    return {
      ok: false,
      message:
        "Your account is not active yet. Ask an admin to activate it.",
    };
  }
  redirect("/admin/dashboard");
}

export async function signup(_: FormState, form: FormData): Promise<FormState> {
  if (!supabaseConfigured) return { ok: false, message: notConfiguredMessage };
  const password = str(form, "password");
  if (password.length < 8)
    return { ok: false, message: "Password must be at least 8 characters." };
  if (password !== str(form, "confirm"))
    return { ok: false, message: "The two passwords do not match." };

  const { error } = await createAnonClient().auth.signUp({
    email: str(form, "email"),
    password,
    options: {
      emailRedirectTo: `${await origin()}/admin/login`,
      data: {
        full_name: str(form, "full_name", 120),
        phone: str(form, "phone", 20),
      },
    },
  });
  if (error) return { ok: false, message: error.message };
  return {
    ok: true,
    message:
      "Account created. If we sent you a confirmation email, open the link in it. An admin must then activate your account before you can log in.",
  };
}

export async function forgotPassword(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  if (!supabaseConfigured) return { ok: false, message: notConfiguredMessage };
  const { error } = await sendResetEmail(str(form, "email"));
  if (error) console.error("Password reset email failed:", error.message);
  // Same answer either way, so this form cannot be used to check who has an account.
  return {
    ok: true,
    message: "If that email has an account, a reset link is on its way.",
  };
}

export async function logout() {
  if (supabaseConfigured) await (await createClient()).auth.signOut();
  redirect("/admin/login");
}

// ---- Enquiry page ---------------------------------------------------------

// Saves an enquiry's follow-up status and/or notes. Only the fields sent are changed.
export async function updateEnquiry(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = Number(str(form, "id", 20));
  if (!Number.isInteger(id) || id <= 0)
    return { ok: false, message: "Enquiry not found." };

  const change: { status?: string; notes?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };
  if (form.has("status")) {
    const status = str(form, "status", 20);
    if (!isEnquiryStatus(status)) return { ok: false, message: "Unknown status." };
    change.status = status;
  }
  if (form.has("notes")) change.notes = str(form, "notes", 4000);

  const { data, error } = await supabase
    .from("enquiry")
    .update(change)
    .eq("id", id)
    .select("id");
  if (error?.code === MISSING_COLUMN) return { ok: false, message: followupSetupMessage };
  if (error || !data?.length)
    return { ok: false, message: "Could not save. Please try again." };
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  return { ok: true, message: "Saved." };
}

// ---- Users page -----------------------------------------------------------

export async function updateUser(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: str(form, "full_name", 120),
      phone: str(form, "phone", 20),
    })
    .eq("id", str(form, "id"));
  if (error) return { ok: false, message: "Could not save. Please try again." };
  revalidatePath("/admin/users");
  return { ok: true, message: "Saved." };
}

export async function setUserActive(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const { supabase, profile } = await requireAdmin();
  const id = str(form, "id");
  const active = str(form, "active") === "true";
  if (id === profile.id)
    return { ok: false, message: "You cannot deactivate your own account." };
  const { error } = await supabase
    .from("profiles")
    .update({ is_active: active })
    .eq("id", id);
  if (error) return { ok: false, message: "Could not update. Please try again." };
  revalidatePath("/admin/users");
  return { ok: true, message: active ? "User activated." : "User deactivated." };
}

// Sets a new password for a user straight away. No email is sent.
export async function setUserPassword(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = str(form, "id");
  const raw = form.get("password");
  const password = typeof raw === "string" ? raw : "";
  if (password.length < 8 || password.length > 72)
    return { ok: false, message: "Use 8 to 72 characters." };
  if (password !== form.get("confirm"))
    return { ok: false, message: "The two passwords do not match." };

  const { data: target } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("id", id)
    .maybeSingle();
  if (!target) return { ok: false, message: "User not found." };

  const service = createServiceClient();
  if (!service)
    return {
      ok: false,
      message:
        "Password changes are not set up yet. Add SUPABASE_SERVICE_ROLE_KEY (the Supabase secret key) to .env and restart the site.",
    };
  const { error } = await service.auth.admin.updateUserById(target.id, { password });
  if (error)
    return { ok: false, message: `Could not change the password: ${error.message}` };
  return {
    ok: true,
    message: `Password updated for ${target.email}. Share it with them privately.`,
  };
}
