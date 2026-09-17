create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  role text not null check (role in ('customer', 'admin', 'manager', 'printing_staff', 'delivery_staff')),
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  author text,
  publisher text,
  isbn text,
  category text not null,
  class_name text,
  subject text,
  language text not null,
  description text not null,
  price numeric(12,2) not null,
  discount_price numeric(12,2),
  stock integer not null default 0,
  sku text unique not null,
  gst numeric(5,2) not null default 5,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  board text
);

create table school_packages (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references schools(id),
  class_name text not null,
  academic_year text not null,
  is_active boolean not null default true
);

create table school_package_items (
  package_id uuid references school_packages(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null default 1,
  primary key (package_id, product_id)
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  order_type text not null check (order_type in ('book', 'print', 'custom')),
  status text not null,
  payment_status text not null,
  total numeric(12,2) not null,
  delivery_address jsonb,
  created_at timestamptz not null default now()
);

create table print_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  file_url text not null,
  preview_url text,
  pages integer not null,
  copies integer not null,
  options jsonb not null,
  workflow_status text not null,
  assigned_role text,
  delete_after timestamptz
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  provider text not null,
  provider_order_id text,
  provider_payment_id text,
  status text not null,
  amount numeric(12,2) not null,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);
