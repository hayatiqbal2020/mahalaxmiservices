"use client";

import { useRef, useState, useTransition } from "react";
import {
  setUserActive,
  setUserPassword,
  updateUser,
  type FormState,
} from "@/app/admin/actions";
import { Icon, useAdminSearch } from "./AdminShell";

type User = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  joined: string;
};

const blank: FormState = { ok: false, message: "" };

// A readable random password: letters (no look-alikes) and digits.
function generatePassword() {
  const letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const all = letters + digits;
  const random = new Uint32Array(12);
  crypto.getRandomValues(random);
  const chars = [...random].map((v) => all[v % all.length]);
  chars[3] = digits[random[3] % digits.length];
  chars[8] = letters[random[8] % letters.length];
  return `${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}-${chars.slice(8).join("")}`;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoFocus,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="adm-pass">
        <input id={id} type={show ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={72} required autoFocus={autoFocus} value={value} onChange={(e) => onChange(e.target.value)} />
        <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((s) => !s)}>
          <Icon name={show ? "eyeOff" : "eye"} />
        </button>
      </div>
    </div>
  );
}

export default function UsersTable({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const [toast, setToast] = useState(blank);
  const [editing, setEditing] = useState<User | null>(null);
  const [passFor, setPassFor] = useState<User | null>(null);
  const [pass, setPass] = useState({ password: "", confirm: "", generated: false, copied: false, error: "" });
  const [pending, startTransition] = useTransition();
  const editDialog = useRef<HTMLDialogElement>(null);
  const passDialog = useRef<HTMLDialogElement>(null);
  const search = useAdminSearch();
  const shown = search
    ? users.filter((u) =>
        [u.full_name, u.email, u.phone, u.is_active ? "active" : "inactive"]
          .join(" ")
          .toLowerCase()
          .includes(search),
      )
    : users;

  // Runs a server action; `after` gets its answer.
  function run(
    action: (s: FormState, f: FormData) => Promise<FormState>,
    fields: Record<string, string>,
    after: (r: FormState) => void,
  ) {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.set(k, v));
    startTransition(async () => {
      after(
        await action(blank, form).catch(() => ({
          ok: false,
          message: "Something went wrong. Please try again.",
        })),
      );
    });
  }

  function openEdit(u: User) {
    setEditing(u);
    editDialog.current?.showModal();
  }

  function openPassword(u: User) {
    setPass({ password: "", confirm: "", generated: false, copied: false, error: "" });
    setPassFor(u);
    passDialog.current?.showModal();
  }

  function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    run(
      updateUser,
      {
        id: editing?.id ?? "",
        full_name: String(data.get("full_name") ?? ""),
        phone: String(data.get("phone") ?? ""),
      },
      (r) => {
        setToast(r);
        if (r.ok) editDialog.current?.close();
      },
    );
  }

  function onPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pass.password !== pass.confirm) {
      setPass((p) => ({ ...p, error: "The two passwords do not match." }));
      return;
    }
    run(
      setUserPassword,
      { id: passFor?.id ?? "", password: pass.password, confirm: pass.confirm },
      (r) => {
        if (r.ok) {
          setToast(r);
          passDialog.current?.close();
        } else setPass((p) => ({ ...p, error: r.message }));
      },
    );
  }

  function fillGenerated() {
    const value = generatePassword();
    setPass({ password: value, confirm: value, generated: true, copied: false, error: "" });
  }

  async function copyGenerated() {
    try {
      await navigator.clipboard.writeText(pass.password);
      setPass((p) => ({ ...p, copied: true }));
    } catch {}
  }

  return (
    <>
      {toast.message && (
        <p className={`note adm-toast ${toast.ok ? "ok" : "err"}`} role="status">{toast.message}</p>
      )}
      <section className="adm-card">
        <div className="adm-card-head">
          <div>
            <h2>Admin users <span className="adm-count">{shown.length}</span></h2>
            <p>{search ? `Matching “${search}”` : "People who can log in to this admin panel"}</p>
          </div>
        </div>
        {shown.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {shown.map((u) => {
                  const self = u.id === currentUserId;
                  const toggleLabel = self
                    ? "You cannot deactivate your own account"
                    : u.is_active
                      ? "Deactivate"
                      : "Activate";
                  return (
                    <tr key={u.id}>
                      <td data-label="Name"><strong>{u.full_name || "—"}{self && " (you)"}</strong></td>
                      <td data-label="Email">{u.email}</td>
                      <td data-label="Phone" className="nowrap">{u.phone || "—"}</td>
                      <td data-label="Status"><span><span className={`pill ${u.is_active ? "on" : "off"}`}><i></i>{u.is_active ? "Active" : "Inactive"}</span></span></td>
                      <td data-label="Joined" className="nowrap">{u.joined}</td>
                      <td data-label="Actions">
                        <div className="adm-actions">
                          <button type="button" className="adm-act" disabled={pending} title="Edit" aria-label={`Edit ${u.email}`} onClick={() => openEdit(u)}><Icon name="edit" size={16} /></button>
                          <button
                            type="button"
                            className={`adm-act ${u.is_active ? "warn" : "good"}`}
                            disabled={pending || self}
                            title={toggleLabel}
                            aria-label={`${toggleLabel} ${u.email}`}
                            onClick={() => {
                              if (u.is_active && !window.confirm(`Deactivate ${u.email}? They will not be able to log in.`)) return;
                              run(setUserActive, { id: u.id, active: String(!u.is_active) }, setToast);
                            }}
                          >
                            <Icon name={u.is_active ? "userOff" : "userOn"} size={16} />
                          </button>
                          <button type="button" className="adm-act" disabled={pending} title="Change password" aria-label={`Change password for ${u.email}`} onClick={() => openPassword(u)}><Icon name="key" size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">{search ? "No users match your search." : "No users yet."}</p>
        )}
      </section>

      <dialog ref={editDialog} className="adm-dialog" onClose={() => setEditing(null)}>
        {editing && (
          <form onSubmit={onSave} key={editing.id}>
            <div className="adm-dialog-head">
              <div><h2>Edit user</h2><p className="sub">{editing.email}</p></div>
              <button type="button" className="adm-x" aria-label="Close" onClick={() => editDialog.current?.close()}><Icon name="close" /></button>
            </div>
            <div className="field"><label htmlFor="edit_name">Full name</label><input id="edit_name" name="full_name" type="text" maxLength={120} defaultValue={editing.full_name} /></div>
            <div className="field"><label htmlFor="edit_phone">Phone number</label><input id="edit_phone" name="phone" type="tel" maxLength={20} defaultValue={editing.phone} /></div>
            <div className="adm-dialog-btns">
              <button type="button" className="btn btn-plain" onClick={() => editDialog.current?.close()}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
            </div>
          </form>
        )}
      </dialog>

      <dialog ref={passDialog} className="adm-dialog" onClose={() => setPassFor(null)}>
        {passFor && (
          <form onSubmit={onPassword} key={passFor.id}>
            <div className="adm-dialog-head">
              <div><h2>Change password</h2><p className="sub">{passFor.full_name ? `${passFor.full_name} · ` : ""}{passFor.email}</p></div>
              <button type="button" className="adm-x" aria-label="Close" onClick={() => passDialog.current?.close()}><Icon name="close" /></button>
            </div>
            {pass.error && <p className="note err" role="alert">{pass.error}</p>}
            <PasswordField id="new_password" label="New password" autoFocus value={pass.password} onChange={(v) => setPass((p) => ({ ...p, password: v, generated: false, error: "" }))} />
            <PasswordField id="confirm_password" label="Confirm new password" value={pass.confirm} onChange={(v) => setPass((p) => ({ ...p, confirm: v, generated: false, error: "" }))} />
            <div className="adm-pass-tools">
              <button type="button" className="btn btn-plain" disabled={pending} onClick={fillGenerated}>Generate a strong password</button>
              {pass.generated && (
                <span className="adm-generated"><code>{pass.password}</code><button type="button" onClick={copyGenerated}>{pass.copied ? "Copied" : "Copy"}</button></span>
              )}
            </div>
            <p className="adm-hint">8–72 characters. No email is sent, so share the new password with them privately. Their other signed-in devices stay signed in until their session ends.</p>
            <div className="adm-dialog-btns">
              <button type="button" className="btn btn-plain" disabled={pending} onClick={() => passDialog.current?.close()}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Update password"}</button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
