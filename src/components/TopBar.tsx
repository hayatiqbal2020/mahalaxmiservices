import { site } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <div>
          <span>📞 <b>{site.phone}</b></span>{" "}
          <span className="hide-sm">✉ {site.email}</span>
        </div>
        <div>
          <span className="hide-sm">🕘 Mon – Sat : 9:00 AM – 7:00 PM</span>{" "}
          <span>🚨 24×7 Emergency Support</span>
        </div>
      </div>
    </div>
  );
}
