-- Mesa de Ayuda TIC · 12_knowledge.sql

create table if not exists public.knowledge_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  icon text,
  color text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid references public.knowledge_categories(id) on delete set null,
  owner_team_id uuid references public.teams(id) on delete set null,
  title text not null,
  summary text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  audience text not null default 'all' check (audience in ('all','requesters','agents','admins')),
  current_version integer not null default 1,
  view_count bigint not null default 0,
  helpful_count bigint not null default 0,
  not_helpful_count bigint not null default 0,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_article_versions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  version integer not null,
  content text not null,
  content_format text not null default 'markdown' check (content_format in ('markdown','html','plain')),
  change_note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(article_id, version)
);

create table if not exists public.knowledge_article_services (
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  relevance numeric(5,2) not null default 1.0,
  primary key(article_id, service_id)
);

create table if not exists public.knowledge_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.knowledge_articles(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  ticket_id uuid references public.tickets(id) on delete set null,
  helpful boolean not null,
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists knowledge_articles_status_idx on public.knowledge_articles(status, category_id, published_at desc);
create index if not exists knowledge_articles_search_idx on public.knowledge_articles using gin ((coalesce(title,'') || ' ' || coalesce(summary,'')) gin_trgm_ops);

create trigger knowledge_categories_set_updated_at before update on public.knowledge_categories for each row execute function public.set_updated_at();
create trigger knowledge_articles_set_updated_at before update on public.knowledge_articles for each row execute function public.set_updated_at();
