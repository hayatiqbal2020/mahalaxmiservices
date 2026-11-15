import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin";

// Name and avatar in the top bar, for whoever is signed in.
async function UserBadge() {
  const { profile } = await requireAdmin();
  const name = profile.full_name || profile.email;
  return (
    <div className="adm-user">
      <span className="adm-avatar">{name.charAt(0).toUpperCase()}</span>
      <span className="adm-user-id"><strong>{name}</strong><small>Administrator</small></span>
    </div>
  );
}

// The frame shows at once. Each page draws its own heading and card frames
// straight away and loads its data inside them (see the Suspense boundaries
// in the pages), so clicking a menu item never waits on the database.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminShell
        user={
          <Suspense fallback={<div className="adm-user"><span className="adm-avatar"></span></div>}>
            <UserBadge />
          </Suspense>
        }
      >
        {children}
      </AdminShell>
    </Suspense>
  );
}
