"use client";

import { useAdminSearch } from "./AdminShell";

type Row = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  received: string;
};

export default function EnquiryTable({ rows, failed }: { rows: Row[]; failed: boolean }) {
  const search = useAdminSearch();
  const shown = search
    ? rows.filter((e) =>
        [e.name, e.phone, e.email, e.service, e.message, e.received]
          .join(" ")
          .toLowerCase()
          .includes(search),
      )
    : rows;

  return (
    <section className="adm-card">
      <div className="adm-card-head">
        <div>
          <h2>Customer enquiries <span className="adm-count">{shown.length}</span></h2>
          <p>{search ? `Matching “${search}”` : "From the website form, newest first"}</p>
        </div>
      </div>
      {shown.length ? (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Received</th><th>Name</th><th>Phone</th><th>Email</th><th>Service</th><th>Message</th></tr></thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.id}>
                  <td data-label="Received" className="nowrap">{e.received}</td>
                  <td data-label="Name"><strong>{e.name}</strong></td>
                  <td data-label="Phone" className="nowrap"><a href={`tel:${e.phone}`}>{e.phone}</a></td>
                  <td data-label="Email">{e.email ? <a href={`mailto:${e.email}`}>{e.email}</a> : "—"}</td>
                  <td data-label="Service">{e.service || "—"}</td>
                  <td data-label="Message"><div className="adm-msg">{e.message || "—"}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="adm-empty">
          {failed ? "Could not load enquiries." : search ? "No enquiries match your search." : "No enquiries yet."}
        </p>
      )}
    </section>
  );
}
