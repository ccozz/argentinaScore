-- Ejecutar una sola vez en Supabase: SQL Editor > New query > Run.
create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  rater_name text not null check (char_length(trim(rater_name)) between 1 and 60),
  scores jsonb not null,
  created_at timestamptz not null default now()
);

create unique index if not exists evaluations_rater_name_unique
on public.evaluations (lower(trim(rater_name)));

alter table public.evaluations enable row level security;

create policy "Public can read evaluations"
on public.evaluations for select to anon using (true);

create policy "Public can submit one evaluation"
on public.evaluations for insert to anon with check (true);

create policy "Public can delete evaluations"
on public.evaluations for delete to anon using (true);

alter publication supabase_realtime add table public.evaluations;
