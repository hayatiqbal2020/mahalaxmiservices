-- Enquiry follow-up: a status and notes on each enquiry.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run again.
-- (Already included in schema.sql for new projects.)

alter table public.enquiry
  add column if not exists status text not null default 'new',
  add column if not exists notes text not null default '',
  add column if not exists updated_at timestamptz;

alter table public.enquiry drop constraint if exists enquiry_status_check;
alter table public.enquiry add constraint enquiry_status_check
  check (status in ('new', 'contacted', 'quoted', 'won', 'lost'));
alter table public.enquiry drop constraint if exists enquiry_notes_check;
alter table public.enquiry add constraint enquiry_notes_check
  check (char_length(notes) <= 4000);

create index if not exists enquiry_status_idx on public.enquiry (status);

-- Admins may change only the follow-up fields, never what the customer sent.
grant update (status, notes, updated_at) on public.enquiry to authenticated;

drop policy if exists "Active admins update enquiries" on public.enquiry;
create policy "Active admins update enquiries" on public.enquiry
  for update to authenticated
  using ((select public.is_active_admin()))
  with check ((select public.is_active_admin()));
