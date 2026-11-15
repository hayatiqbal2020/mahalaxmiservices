import EnquiryTable from "@/components/admin/EnquiryTable";
import PageHead from "@/components/admin/PageHead";
import { formatDate, requireAdmin, type Enquiry } from "@/lib/admin";

const LIMIT = 500;

export default async function EnquiriesPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("enquiry")
    .select("id, name, phone, email, service, message, created_at")
    .order("created_at", { ascending: false })
    .limit(LIMIT)
    .returns<Enquiry[]>();
  const rows = (data ?? []).map(({ created_at, ...e }) => ({
    ...e,
    received: formatDate(created_at),
  }));

  return (
    <>
      <PageHead title="Enquiry" note={rows.length === LIMIT ? `Showing the latest ${LIMIT}` : undefined} />
      <EnquiryTable rows={rows} failed={Boolean(error)} />
    </>
  );
}
