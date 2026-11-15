import PageHead from "@/components/admin/PageHead";
import UsersTable from "@/components/admin/UsersTable";
import { formatDate, requireAdmin, type Profile } from "@/lib/admin";

export default async function UsersPage() {
  const { supabase, profile } = await requireAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, is_active, created_at")
    .order("created_at", { ascending: true })
    .returns<Profile[]>();
  const users = (data ?? []).map((u) => ({ ...u, joined: formatDate(u.created_at) }));

  return (
    <>
      <PageHead title="Users" />
      {error ? (
        <section className="adm-card"><p className="adm-empty">Could not load users.</p></section>
      ) : (
        <UsersTable users={users} currentUserId={profile.id} />
      )}
    </>
  );
}
