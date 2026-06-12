-- =============================================
-- ICELINE PRO — Schema SQL for Supabase
-- Run in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  phone TEXT,
  city TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- CATEGORIES
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PRODUCTS
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL CHECK (price > 0),
  old_price INT CHECK (old_price > price),
  images TEXT[] DEFAULT '{}',
  badge TEXT CHECK (badge IN ('new', 'sale', 'hit')),
  age_group TEXT CHECK (age_group IN ('SR', 'INT', 'JR', 'YTH')),
  in_stock BOOLEAN DEFAULT TRUE,
  stock_qty INT DEFAULT 0,
  rating NUMERIC(3,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  specs JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS
-- =============================================
CREATE TYPE order_status AS ENUM (
  'new', 'paid', 'assembly', 'shipped', 'delivered', 'cancelled'
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_method TEXT NOT NULL,
  delivery_address TEXT,
  payment_method TEXT NOT NULL,
  status order_status DEFAULT 'new',
  subtotal INT NOT NULL,
  delivery_cost INT DEFAULT 0,
  discount INT DEFAULT 0,
  total INT NOT NULL,
  promo_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ICE-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS order_seq START 1000;

DROP TRIGGER IF EXISTS set_order_number ON orders;
CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- =============================================
-- ORDER ITEMS
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_brand TEXT,
  product_slug TEXT,
  size TEXT,
  qty INT NOT NULL DEFAULT 1,
  price INT NOT NULL,
  total INT NOT NULL
);

-- =============================================
-- REVIEWS
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  author_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products SET
    rating = (SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id AND status = 'approved'),
    review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id AND status = 'approved')
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- =============================================
-- PROMO CODES
-- =============================================
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percent INT CHECK (discount_percent BETWEEN 1 AND 100),
  discount_amount INT,
  min_order_amount INT DEFAULT 0,
  uses_count INT DEFAULT 0,
  uses_limit INT,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default promo codes
INSERT INTO promo_codes (code, discount_percent, uses_limit, expires_at)
VALUES
  ('PROMO10', 10, 100, NOW() + INTERVAL '30 days'),
  ('SUMMER20', 20, 50, NOW() + INTERVAL '60 days')
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- FAVORITES
-- =============================================
CREATE TABLE IF NOT EXISTS favorites (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);

-- =============================================
-- NEWSLETTER SUBSCRIBERS
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- UPDATED_AT TRIGGERS
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: users see only their own
CREATE POLICY "Users see own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admin sees all profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Orders: users see only their own
CREATE POLICY "Users see own orders" ON orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users create own orders" ON orders FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY "Admin manages orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Products: public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products read" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin manages products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Reviews: approved are public
CREATE POLICY "Public approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================
-- SEED DEMO DATA
-- =============================================
INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('Хоккейные коньки', 'konki', '⛸️', 1),
  ('Хоккейные клюшки', 'klyushki', '🏒', 2),
  ('Хоккейные шлемы', 'shlemy', '⛑️', 3),
  ('Хоккейные перчатки', 'perchatki', '🥊', 4),
  ('Хоккейная защита', 'zashita', '🛡️', 5),
  ('Для вратаря', 'vratar', '🥅', 6),
  ('Аксессуары', 'aksessuary', '🎒', 7),
  ('Детское снаряжение', 'detskaya', '👦', 8)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- USEFUL VIEWS
-- =============================================
CREATE OR REPLACE VIEW orders_with_items AS
SELECT
  o.*,
  p.name as customer_profile_name,
  COUNT(oi.id) as items_count
FROM orders o
LEFT JOIN profiles p ON p.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, p.name;
