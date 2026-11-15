import Link from "next/link";
import { Icon } from "@/components/admin/AdminShell";
import PageHead from "@/components/admin/PageHead";
import { formatDate, requireAdmin, type Enquiry } from "@/lib/admin";

const MONTHS = 8;
const TZ = "Asia/Kolkata";
const parts = (d: Date) => {
  // "2026-11-15" in Indian time
  const s = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
  return { day: s, month: s.slice(0, 7) };
};

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();
  const now = new Date();
  const today = parts(now);
  const [year, month] = today.month.split("-").map(Number);
  // The last 8 months, oldest first, as "YYYY-MM" keys with short labels.
  const months = Array.from({ length: MONTHS }, (_, i) => {
    const d = new Date(Date.UTC(year, month - 1 - (MONTHS - 1 - i), 1));
    return {
      key: d.toISOString().slice(0, 7),
      label: d.toLocaleString("en-IN", { month: "short", timeZone: "UTC" }),
    };
  });
  const since = `${months[0].key}-01T00:00:00+05:30`;

  const count = { count: "exact", head: true } as const;
  const [total, users, pending, recent, latest] = await Promise.all([
    supabase.from("enquiry").select("*", count),
    supabase.from("profiles").select("*", count),
    supabase.from("profiles").select("*", count).eq("is_active", false),
    supabase
      .from("enquiry")
      .select("service, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000)
      .returns<Pick<Enquiry, "service" | "created_at">[]>(),
    supabase
      .from("enquiry")
      .select("id, name, phone, email, service, message, created_at")
      .order("created_at", { ascending: false })
      .limit(5)
      .returns<Enquiry[]>(),
  ]);

  const perMonth = new Map(months.map((m) => [m.key, 0]));
  const perService = new Map<string, number>();
  let todayCount = 0;
  for (const e of recent.data ?? []) {
    const p = parts(new Date(e.created_at));
    if (perMonth.has(p.month)) perMonth.set(p.month, perMonth.get(p.month)! + 1);
    if (p.day === today.day) todayCount++;
    const s = e.service || "Not specified";
    perService.set(s, (perService.get(s) ?? 0) + 1);
  }
  const values = months.map((m) => perMonth.get(m.key) ?? 0);
  const thisMonth = values[values.length - 1];
  const top = Math.max(...values, 1);
  const pts = values.map((v, i) => ({
    x: (i / (MONTHS - 1)) * 100,
    y: 100 - (v / top) * 100,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const services = [...perService.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topService = services[0]?.[1] ?? 1;

  const stats = [
    { label: "Total enquiries", value: total.count ?? 0, detail: "From the website form", icon: "enquiry", tone: "purple", href: "/admin/enquiries" },
    { label: "This month", value: thisMonth, detail: `${todayCount} received today`, icon: "dashboard", tone: "green", href: "/admin/enquiries" },
    { label: "Users", value: users.count ?? 0, detail: "Can log in to this panel", icon: "users", tone: "blue", href: "/admin/users" },
    { label: "Waiting for activation", value: pending.count ?? 0, detail: "New sign-ups to review", icon: "users", tone: "orange", href: "/admin/users" },
  ] as const;

  return (
    <>
      <PageHead title="Dashboard" note={<><span className="adm-live"></span>Live website data</>} />

      <div className="adm-stats">
        {stats.map((s) => (
          <Link href={s.href} className="adm-stat" key={s.label}>
            <div>
              <span className="adm-stat-label">{s.label}</span>
              <span className="adm-stat-value">{s.value}</span>
              <span className="adm-stat-detail">{s.detail}</span>
            </div>
            <span className={`adm-stat-icon ${s.tone}`}><Icon name={s.icon} size={21} /></span>
          </Link>
        ))}
      </div>

      <div className="adm-grid">
        <section className="adm-card pad">
          <div className="adm-card-head">
            <div><h2>Enquiries overview</h2><p>Enquiries received per month · last {MONTHS} months</p></div>
          </div>
          <div className="adm-chart">
            <div className="adm-chart-axis"><span>{top}</span><span>{top / 2 >= 1 ? Math.round(top / 2) : ""}</span><span>0</span></div>
            <div className="adm-chart-plot">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="admArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6676f4" stopOpacity=".28"></stop><stop offset="1" stopColor="#6676f4" stopOpacity="0"></stop></linearGradient></defs>
                <polygon points={`0,100 ${line} 100,100`} fill="url(#admArea)"></polygon>
                <polyline points={line} fill="none" stroke="#6676f4" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></polyline>
              </svg>
              {pts.map((p, i) => (
                <span className="adm-chart-dot" key={months[i].key} style={{ left: `${p.x}%`, top: `${p.y}%` }} title={`${months[i].label}: ${values[i]}`}></span>
              ))}
            </div>
            <div className="adm-chart-labels">{months.map((m) => <span key={m.key}>{m.label}</span>)}</div>
          </div>
        </section>

        <section className="adm-card pad">
          <div className="adm-card-head">
            <div><h2>Services in demand</h2><p>What customers asked for · last {MONTHS} months</p></div>
          </div>
          {services.length ? (
            <div className="adm-bars">
              {services.map(([name, n], i) => (
                <div key={name}>
                  <div className="adm-bar-meta"><span>{name}</span><small>{n} enquir{n === 1 ? "y" : "ies"}</small></div>
                  <div className="adm-bar-track"><span className={`bar${i}`} style={{ width: `${Math.max((n / topService) * 100, 4)}%` }}></span></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="adm-empty" style={{ padding: "24px 0 6px" }}>No enquiries yet.</p>
          )}
        </section>
      </div>

      <section className="adm-card">
        <div className="adm-card-head">
          <div><h2>Recent enquiries</h2><p>The five newest</p></div>
          <Link href="/admin/enquiries" className="adm-text-link">View all →</Link>
        </div>
        {latest.data?.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Service</th><th>Received</th></tr></thead>
              <tbody>
                {latest.data.map((e) => (
                  <tr key={e.id}>
                    <td data-label="Name"><strong>{e.name}</strong></td>
                    <td data-label="Phone" className="nowrap"><a href={`tel:${e.phone}`}>{e.phone}</a></td>
                    <td data-label="Service">{e.service || "—"}</td>
                    <td data-label="Received" className="nowrap">{formatDate(e.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">{latest.error ? "Could not load enquiries." : "No enquiries yet."}</p>
        )}
      </section>
    </>
  );
}
