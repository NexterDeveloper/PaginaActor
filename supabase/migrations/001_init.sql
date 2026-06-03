-- Tabla de mensajes de contacto
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Tabla de proyectos/filmografía
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  role        text not null,
  year        int  not null,
  type        text not null check (type in ('film','tv','theater','short')),
  description text not null default '',
  image_url   text,
  trailer_url text,
  order_index int  not null default 0,
  created_at  timestamptz not null default now()
);

-- Tabla de galería
create table if not exists public.gallery_images (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  alt         text not null default '',
  caption     text,
  order_index int  not null default 0,
  created_at  timestamptz not null default now()
);

-- Tabla de contenido editable del sitio
create table if not exists public.site_content (
  id          uuid primary key default gen_random_uuid(),
  section     text not null,
  key         text not null,
  value       text not null default '',
  updated_at  timestamptz not null default now(),
  unique(section, key)
);

-- Row-Level Security
alter table public.contact_messages enable row level security;
alter table public.projects         enable row level security;
alter table public.gallery_images   enable row level security;
alter table public.site_content     enable row level security;

-- Las lecturas públicas para proyectos, galería y contenido del sitio son segúras
create policy "projects_public_read"       on public.projects       for select using (true);
create policy "gallery_public_read"        on public.gallery_images for select using (true);
create policy "site_content_public_read"   on public.site_content   for select using (true);

-- Solo el service role puede escribir/leer mensajes de contacto
create policy "contact_insert"             on public.contact_messages for insert with check (true);
