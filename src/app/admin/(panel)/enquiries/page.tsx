import { Suspense } from "react";
import EnquiryTable from "@/components/admin/EnquiryTable";
import Loader from "@/components/admin/Loader";
import PageHead from "@/components/admin/PageHead";
import { formatDate, requireAdmin, type Enquiry } from "@/lib/admin";
import { followupSetupMessage, MISSING_COLUMN } from "@/lib/enquiry-status";

const LIMIT = 500; // the newest 500 are loaded

async function Enquiries() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("enquiry")
    .select("id, name, phone, email, service, message, created_at, status, notes")
    .order("created_at", { ascending: false })
    .limit(LIMIT)
    .returns<Enquiry[]>();
  const rows = (data ?? []).map(({ created_at, ...e }) => ({
    ...e,
    received: formatDate(created_at),
  }));
  const message = !error
    ? ""
    : error.code === MISSING_COLUMN
      ? followupSetupMessage
      : "Could not load enquiries.";
  return <EnquiryTable rows={rows} error={message} />;
}

// The heading and card frame show at once; the list loads inside the card.
export default function EnquiriesPage() {
  return (
    <>
      <PageHead title="Enquiry" />
      <Suspense
        fallback={
          <section className="adm-card">
            <div className="adm-card-head"><div><h2>Customer enquiries</h2><p>From the website form, newest first</p></div></div>
            <Loader label="Loading enquiries…" />
          </section>
        }
      >
        <Enquiries />
      </Suspense>
    </>
  );
}
