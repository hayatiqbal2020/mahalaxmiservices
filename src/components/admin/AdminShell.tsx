"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, use, useEffect, useRef, useState } from "react";
import { logout } from "@/app/admin/actions";

const ICONS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  enquiry: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  menu: "M4 6h16M4 12h16M4 18h16",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  logout: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  arrow: "M5 12h14M13 6l6 6-6 6",
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  key: "M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
  userOff: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 8l5 5M22 8l-5 5",
  userOn: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M16 11l2 2 4-4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeOff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22",
  close: "M18 6L6 18M6 6l12 12",
};

export function Icon({ name, size = 18 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]}></path>
    </svg>
  );
}

const GROUPS = [
  { heading: "OVERVIEW", items: [{ href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" as const }] },
  {
    heading: "MANAGE",
    items: [
      { href: "/admin/users", label: "Users", icon: "users" as const },
      { href: "/admin/enquiries", label: "Enquiry", icon: "enquiry" as const },
    ],
  },
];
const SEARCHABLE: Record<string, string> = {
  "/admin/users": "users",
  "/admin/enquiries": "enquiries",
};

// The search box in the top bar filters the list on the current page.
const SearchContext = createContext("");
export const useAdminSearch = () => use(SearchContext).trim().toLowerCase();

export default function AdminShell({
  user,
  children,
}: {
  user: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // phone: menu slid in
  const [hidden, setHidden] = useState(false); // desktop: menu tucked away
  const [query, setQuery] = useState({ path: pathname, text: "" });
  const search = query.path === pathname ? query.text : ""; // a new page starts with an empty search
  const input = useRef<HTMLInputElement>(null);
  const searchable = SEARCHABLE[pathname];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && input.current) {
        e.preventDefault();
        input.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleMenu() {
    if (window.matchMedia("(max-width: 900px)").matches) setOpen((o) => !o);
    else setHidden((h) => !h);
  }

  return (
    <div className={`adm-shell${hidden ? " menu-hidden" : ""}`}>
      {open && <button type="button" className="adm-scrim" aria-label="Close menu" onClick={() => setOpen(false)}></button>}
      <aside className={`adm-side${open ? " open" : ""}`}>
        <Link href="/admin/dashboard" className="adm-brand" onClick={() => setOpen(false)}>
          <span className="adm-mark"><svg width="20" height="20"><use href="#flame"></use></svg></span>
          <span className="adm-brand-name">Mahalaxmi Admin<small>FIRE SAFETY CONTROL</small></span>
        </Link>
        <nav className="adm-nav">
          {GROUPS.map((g) => (
            <div className="adm-nav-group" key={g.heading}>
              <p className="adm-nav-heading">{g.heading}</p>
              {g.items.map((m) => {
                const on = pathname.startsWith(m.href);
                return (
                  <Link key={m.href} href={m.href} className={`adm-nav-item${on ? " on" : ""}`} aria-current={on ? "page" : undefined} onClick={() => setOpen(false)}>
                    <Icon name={m.icon} />
                    <span>{m.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="adm-side-foot">
          <Link href="/" className="adm-site-link"><Icon name="arrow" size={15} />View website</Link>
          <small>Mahalaxmi Services · Admin</small>
        </div>
      </aside>

      <div className="adm-col">
        <header className="adm-top">
          <button type="button" className="adm-icon-btn" aria-label="Toggle menu" onClick={toggleMenu}><Icon name="menu" size={22} /></button>
          {searchable && (
            <label className="adm-search">
              <Icon name="search" size={17} />
              <input
                ref={input}
                type="search"
                aria-label={`Search ${searchable}`}
                placeholder={`Search ${searchable}...`}
                value={search}
                onChange={(e) => setQuery({ path: pathname, text: e.target.value })}
              />
              <kbd>⌘ K</kbd>
            </label>
          )}
          <div className="adm-top-actions">
            <span className="adm-top-divider"></span>
            {user}
            <form action={logout}>
              <button type="submit" className="adm-icon-btn" aria-label="Log out" title="Log out"><Icon name="logout" size={19} /></button>
            </form>
          </div>
        </header>
        <main className="adm-main">
          <SearchContext value={search}>{children}</SearchContext>
        </main>
      </div>
    </div>
  );
}
