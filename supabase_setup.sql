-- ============================================================
-- RealistisEA - Supabase Schema Setup
-- Jalankan file ini di: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Buat tabel products
create table if not exists products (
  id text primary key,
  name text not null,
  category text default '',
  badge_text text default '',
  badge_color text default '',
  rental_price text default '',
  min_duration text default '',
  vps_price text default '',
  target_profit text default '',
  max_risk text default '',
  min_deposit text default '',
  platform text default '',
  image text default '',
  backtest_image text default '',
  features jsonb default '[]',
  backtest_details jsonb default '{}',
  active boolean default true,
  created_at timestamptz default now()
);

-- 2. Buat tabel settings
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- 3. Beri izin akses tabel ke role Supabase (WAJIB agar API tidak 401 permission denied)
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.products to anon, authenticated, service_role;
grant all on table public.settings to anon, authenticated, service_role;

-- 4. Enable Row Level Security
alter table products enable row level security;
alter table settings enable row level security;

-- 5. Hapus policy lama jika ada
drop policy if exists "Public read products" on products;
drop policy if exists "Public write products" on products;
drop policy if exists "Public read settings" on settings;
drop policy if exists "Public write settings" on settings;

-- 6. Buat policy baru: semua bisa read & write (auth ditangani di app)
create policy "Public read products" on products for select using (true);
create policy "Public write products" on products for all using (true) with check (true);
create policy "Public read settings" on settings for select using (true);
create policy "Public write settings" on settings for all using (true) with check (true);

-- 7. Enable Realtime untuk kedua tabel
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table settings;

-- ============================================================
-- SELESAI! Sekarang seed data awal (opsional, app akan auto-seed)
-- ============================================================
