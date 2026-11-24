// Follow-up stages of an enquiry, in order. Shared by the admin pages and
// the server action that saves them.
export const ENQUIRY_STATUSES = [
  { value: "new", label: "New", tone: "info" },
  { value: "contacted", label: "Contacted", tone: "warn" },
  { value: "quoted", label: "Quoted", tone: "purple" },
  { value: "won", label: "Won", tone: "on" },
  { value: "lost", label: "Lost", tone: "off" },
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number]["value"];

export function isEnquiryStatus(v: unknown): v is EnquiryStatus {
  return ENQUIRY_STATUSES.some((s) => s.value === v);
}

export function statusInfo(v: string) {
  return ENQUIRY_STATUSES.find((s) => s.value === v) ?? ENQUIRY_STATUSES[0];
}

// Postgres "column does not exist": the follow-up database update has not been run.
export const MISSING_COLUMN = "42703";
export const followupSetupMessage =
  "Enquiry follow-up needs a one-time database update: run supabase/002_enquiry_followup.sql in the Supabase SQL Editor.";
