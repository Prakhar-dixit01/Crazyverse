-- CrazyVerse Database Schema

-- Enums
CREATE TYPE universe_type AS ENUM ('tool', 'game');
CREATE TYPE interaction_type AS ENUM ('view', 'favorite', 'rating', 'comment');

-- USERS
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  avatar_url text,
  xp_points integer DEFAULT 0,
  level integer DEFAULT 1,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CATEGORIES
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  universe universe_type NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text
);

-- ITEMS (Tools & Games)
CREATE TABLE public.items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  universe universe_type NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  author_id uuid REFERENCES public.users(id),
  status text DEFAULT 'pending' check (status in ('pending', 'approved', 'rejected')),
  metadata jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ITEM_CATEGORIES (Many-to-Many)
CREATE TABLE public.item_categories (
  item_id uuid REFERENCES public.items(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (item_id, category_id)
);

-- INTERACTIONS (Favorites, Views, Ratings)
CREATE TABLE public.interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  item_id uuid REFERENCES public.items(id) ON DELETE CASCADE,
  type interaction_type NOT NULL,
  value numeric,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- COLLECTIONS
CREATE TABLE public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_public boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- COLLECTION_ITEMS
CREATE TABLE public.collection_items (
  collection_id uuid REFERENCES public.collections(id) ON DELETE CASCADE,
  item_id uuid REFERENCES public.items(id) ON DELETE CASCADE,
  PRIMARY KEY (collection_id, item_id)
);

-- XP_LOGS
CREATE TABLE public.xp_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  amount integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Setup
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Basic Public Policies
CREATE POLICY "Allow public read access for approved items" ON public.items FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow public read access for categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access for public collections" ON public.collections FOR SELECT USING (is_public = true);
CREATE POLICY "Allow users to see their own xp" ON public.xp_logs FOR SELECT USING (auth.uid() = user_id);
