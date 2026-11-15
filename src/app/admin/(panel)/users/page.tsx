import { Suspense } from "react";
import Loader from "@/components/admin/Loader";
import PageHead from "@/components/admin/PageHead";
import UsersTable from "@/components/admin/UsersTable";
import { formatDate, requireAdmin, type Profile } from "@/lib/admin";

async function Users() {
  const { supabase, profile } = await requireAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, is_active, created_at")
    .order("created_at", { ascending: true })
    .returns<Profile[]>();
  if (error)
    return <section className="adm-card"><p className="adm-empty">Could not load users.</p></section>;
  const users = (data ?? []).map((u) => ({ ...u, joined: formatDate(u.created_at) }));
  return <UsersTable users={users} currentUserId={profile.id} />;
}

// The heading and card frame show at once; the list loads inside the card.
export default function UsersPage() {
  return (
    <>
      <PageHead title="Users" />
      <Suspense
        fallback={
          <section className="adm-card">
            <div className="adm-card-head"><div><h2>Admin users</h2><p>People who can log in to this admin panel</p></div></div>
            <Loader label="Loading users…" />
          </section>
        }
      >
        <Users />
      </Suspense>
    </>
  );
}
