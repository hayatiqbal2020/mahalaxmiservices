"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { updateEnquiry, type FormState } from "@/app/admin/actions";
import {
  ENQUIRY_STATUSES,
  statusInfo,
  type EnquiryStatus,
} from "@/lib/enquiry-status";
import { Icon, useAdminSearch } from "./AdminShell";

type Row = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  status: string;
  notes: string;
  received: string;
};

type Filter = "all" | EnquiryStatus;
const blank: FormState = { ok: false, message: "" };

export default function EnquiryTable({
  rows: initial,
  error,
}: {
  rows: Row[];
  error: string;
}) {
  const search = useAdminSearch();
  const fromUrl = useSearchParams().get("status");
  const [filter, setFilter] = useState<Filter>(
    ENQUIRY_STATUSES.some((s) => s.value === fromUrl) ? (fromUrl as EnquiryStatus) : "all",
  );
  // Changes saved in this visit, shown straight away (the server copy follows).
  const [edits, setEdits] = useState<Record<number, Partial<Row>>>({});
  const [toast, setToast] = useState(blank);
  const [noteFor, setNoteFor] = useState<Row | null>(null);
  const [pending, startTransition] = useTransition();
  const dialog = useRef<HTMLDialogElement>(null);

  const rows = initial.map((r) => ({ ...r, ...edits[r.id] }));
  const matching = search
    ? rows.filter((e) =>
        [e.name, e.phone, e.email, e.service, e.message, e.notes, e.received, statusInfo(e.status).label]
          .join(" ")
          .toLowerCase()
          .includes(search),
      )
    : rows;
  const counts = Object.fromEntries(
    ENQUIRY_STATUSES.map((s) => [s.value, matching.filter((e) => e.status === s.value).length]),
  );
  const shown = filter === "all" ? matching : matching.filter((e) => e.status === filter);

  function save(row: Row, change: { status?: string; notes?: string }, after?: () => void) {
    const previous = edits[row.id];
    setEdits((all) => ({ ...all, [row.id]: { ...all[row.id], ...change } }));
    const form = new FormData();
    form.set("id", String(row.id));
    Object.entries(change).forEach(([k, v]) => form.set(k, v));
    startTransition(async () => {
      const result = await updateEnquiry(blank, form).catch(() => ({
        ok: false,
        message: "Something went wrong. Please try again.",
      }));
      if (!result.ok) {
        setEdits((all) => ({ ...all, [row.id]: previous ?? {} })); // undo
        setToast(result);
        return;
      }
      setToast(blank);
      after?.();
    });
  }

  function openNotes(row: Row) {
    setNoteFor(row);
    dialog.current?.showModal();
  }

  function onSaveNotes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!noteFor) return;
    const data = new FormData(e.currentTarget);
    save(
      noteFor,
      { status: String(data.get("status")), notes: String(data.get("notes") ?? "").trim() },
      () => {
        dialog.current?.close();
        setToast({ ok: true, message: `Follow-up saved for ${noteFor.name}.` });
      },
    );
  }

  return (
    <>
      {toast.message && (
        <p className={`note adm-toast ${toast.ok ? "ok" : "err"}`} role="status">{toast.message}</p>
      )}
      <section className="adm-card">
        <div className="adm-card-head">
          <div>
            <h2>Customer enquiries <span className="adm-count">{shown.length}</span></h2>
            <p>{search ? `Matching “${search}”` : "From the website form, newest first"}</p>
          </div>
        </div>
        <div className="adm-tabs" role="tablist" aria-label="Filter by status">
          <button type="button" role="tab" aria-selected={filter === "all"} className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>
            All <span>{matching.length}</span>
          </button>
          {ENQUIRY_STATUSES.map((s) => (
            <button type="button" role="tab" key={s.value} aria-selected={filter === s.value} className={filter === s.value ? "on" : ""} onClick={() => setFilter(s.value)}>
              {s.label} <span>{counts[s.value]}</span>
            </button>
          ))}
        </div>
        {error ? (
          <p className="adm-empty">{error}</p>
        ) : shown.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Received</th><th>Customer</th><th>Service</th><th>Message</th><th>Follow-up</th><th></th></tr></thead>
              <tbody>
                {shown.map((e) => (
                  <tr key={e.id} className={e.status === "new" ? "is-new" : undefined}>
                    <td data-label="Received" className="nowrap">{e.received}</td>
                    <td data-label="Customer">
                      <div>
                        <strong>{e.name}</strong>
                        <span className="adm-sub"><a href={`tel:${e.phone}`}>{e.phone}</a></span>
                        {e.email && <span className="adm-sub"><a href={`mailto:${e.email}`}>{e.email}</a></span>}
                      </div>
                    </td>
                    <td data-label="Service">{e.service || "—"}</td>
                    <td data-label="Message"><div className="adm-msg">{e.message || "—"}</div></td>
                    <td data-label="Follow-up">
                      <div className="adm-follow">
                        <select
                          className={`adm-status ${statusInfo(e.status).tone}`}
                          aria-label={`Status of ${e.name}'s enquiry`}
                          value={e.status}
                          disabled={pending}
                          onChange={(ev) => save(e, { status: ev.target.value })}
                        >
                          {ENQUIRY_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        {e.notes && <div className="adm-note-text">{e.notes}</div>}
                      </div>
                    </td>
                    <td data-label="Notes">
                      <button type="button" className="adm-act" title={e.notes ? "Edit notes" : "Add notes"} aria-label={`${e.notes ? "Edit" : "Add"} notes for ${e.name}`} disabled={pending} onClick={() => openNotes(e)}>
                        <Icon name="edit" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">
            {search || filter !== "all"
              ? "No enquiries match."
              : "No enquiries yet."}
          </p>
        )}
      </section>

      <dialog ref={dialog} className="adm-dialog" onClose={() => setNoteFor(null)}>
        {noteFor && (
          <form onSubmit={onSaveNotes} key={noteFor.id}>
            <div className="adm-dialog-head">
              <div>
                <h2>Follow-up</h2>
                <p className="sub">{noteFor.name} · {noteFor.phone}{noteFor.service ? ` · ${noteFor.service}` : ""}</p>
              </div>
              <button type="button" className="adm-x" aria-label="Close" onClick={() => dialog.current?.close()}><Icon name="close" /></button>
            </div>
            <div className="field">
              <label htmlFor="fu_status">Status</label>
              <select id="fu_status" name="status" defaultValue={noteFor.status}>
                {ENQUIRY_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="fu_notes">Notes</label>
              <textarea id="fu_notes" name="notes" maxLength={4000} rows={5} defaultValue={noteFor.notes} placeholder="e.g. Called on 24 Nov, sending quote for 4 ABC 6 kg. Call back Friday." autoFocus></textarea>
            </div>
            <div className="adm-dialog-btns">
              <button type="button" className="btn btn-plain" disabled={pending} onClick={() => dialog.current?.close()}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
