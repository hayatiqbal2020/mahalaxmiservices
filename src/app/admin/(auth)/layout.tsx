import Link from "next/link";

// Shared frame for login, sign-up and password pages.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth">
      <div className="auth-card">
        <Link href="/" aria-label="Back to website">
          <div className="adm-mark"><svg width="24" height="24"><use href="#flame"></use></svg></div>
        </Link>
        {children}
      </div>
    </main>
  );
}
