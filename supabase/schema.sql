-- Mahalaxmi Services: database setup.
-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to run again.

-- 1. Enquiries sent from the website form --------------------------------
create table if not exists public.enquiry (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 120),
  phone      text not null check (char_length(phone) between 5 and 20),
  email      text check (email is null or char_length(email) <= 200),
  service    text check (service is null or char_length(service) <= 120),
  message    text check (message is null or char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
create index if not exists enquiry_created_at_idx on public.enquiry (created_at desc);

-- 2. Admin users -----------------------------------------------------------
-- Login itself lives in auth.users (managed by Supabase). This table holds
-- one row per login with the details the admin panel shows and edits.
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text not null default '' check (char_length(full_name) <= 120),
  phone      text not null default '' check (char_length(phone) <= 20),
  is_active  boolean not null default false,
  created_at timestamptz not null default now()
);

-- A new sign-up gets a profile automatically. The very first account is
-- activated straight away (it is the owner); every later account stays
-- inactive until an active admin switches it on in the Users page.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, phone, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 120),
    left(coalesce(new.raw_user_meta_data ->> 'phone', ''), 20),
    not exists (select 1 from public.profiles)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Accounts that already existed before this script ran.
insert into public.profiles (id, email, full_name, is_active)
select u.id, coalesce(u.email, ''), left(coalesce(u.raw_user_meta_data ->> 'full_name', ''), 120), false
from auth.users u
on conflict (id) do nothing;

-- If nobody is active yet, activate the oldest account so someone can get in.
update public.profiles set is_active = true
where id = (select id from public.profiles order by created_at limit 1)
  and not exists (select 1 from public.profiles where is_active);

-- True when the signed-in user is an active admin.
create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and is_active
  );
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.is_active_admin() from public, anon;
grant execute on function public.is_active_admin() to authenticated;

-- 3. Who may do what (row level security) ----------------------------------
alter table public.enquiry  enable row level security;
alter table public.profiles enable row level security;

revoke all on public.enquiry, public.profiles from anon, authenticated;
grant insert on public.enquiry to anon, authenticated;          -- website form
grant select on public.enquiry to authenticated;                -- admin panel
grant select on public.profiles to authenticated;
grant update (full_name, phone, is_active) on public.profiles to authenticated;

drop policy if exists "Anyone can send an enquiry" on public.enquiry;
create policy "Anyone can send an enquiry" on public.enquiry
  for insert to anon, authenticated with check (true);

drop policy if exists "Active admins read enquiries" on public.enquiry;
create policy "Active admins read enquiries" on public.enquiry
  for select to authenticated using ((select public.is_active_admin()));

drop policy if exists "Read own profile, admins read all" on public.profiles;
create policy "Read own profile, admins read all" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_active_admin()));

drop policy if exists "Active admins update profiles" on public.profiles;
create policy "Active admins update profiles" on public.profiles
  for update to authenticated
  using ((select public.is_active_admin()))
  with check (true);
