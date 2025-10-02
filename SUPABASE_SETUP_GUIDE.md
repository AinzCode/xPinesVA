# 🔧 Supabase Setup Guide - Fix Environment Variables

## ❌ Current Error

```
Error: Your project's URL and Key are required to create a Supabase client!
```

This means your Supabase environment variables are not configured.

## ✅ Solution: Configure Supabase Credentials

### Step 1: Get Your Supabase Credentials

1. **Go to your Supabase Dashboard:**
   ```
   https://supabase.com/dashboard
   ```

2. **Select your project** (or create a new one if you don't have one)

3. **Navigate to Project Settings:**
   - Click the ⚙️ **Settings** icon in the sidebar
   - Click **API** in the settings menu
   - Or go directly to: `https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api`

4. **Copy these two values:**
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### Step 2: Update Your `.env.local` File

I've created a `.env.local` file for you. Now you need to fill it with your actual values:

1. **Open** `.env.local` in your project root

2. **Replace the placeholder values:**

```env
# Replace these with your actual Supabase values:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_KEY_HERE
```

**Example (with fake values):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzabcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.FAKE_SIGNATURE_HERE
```

### Step 3: Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)

# Start it again
npm run dev
```

## 🗄️ Set Up Your Database Tables

You provided the schema earlier. Let's create the tables in Supabase:

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to SQL Editor:**
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT/sql
   ```

2. **Click "New Query"**

3. **Paste and run this SQL:**

```sql
-- Create admin_users table
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'admin'::text CHECK (role = ANY (ARRAY['admin'::text, 'super_admin'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  email character varying NOT NULL UNIQUE,
  CONSTRAINT admin_users_pkey PRIMARY KEY (id),
  CONSTRAINT admin_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  author_id uuid,
  category character varying,
  tags text[],
  featured_image_url character varying,
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_posts_pkey PRIMARY KEY (id),
  CONSTRAINT blog_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.team_members(id)
);

-- Create contact_inquiries table
CREATE TABLE public.contact_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying,
  age integer,
  expertise character varying,
  company_name character varying,
  message text,
  status character varying DEFAULT 'new'::character varying CHECK (status::text = ANY (ARRAY['new'::character varying, 'in_progress'::character varying, 'completed'::character varying, 'archived'::character varying]::text[])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_inquiries_pkey PRIMARY KEY (id)
);

-- Create services table
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  short_description character varying,
  pricing_min numeric,
  pricing_max numeric,
  pricing_type character varying DEFAULT 'hourly'::character varying CHECK (pricing_type::text = ANY (ARRAY['hourly'::character varying, 'monthly'::character varying, 'project'::character varying, 'commission'::character varying]::text[])),
  features text[],
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

-- Create team_members table
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  role character varying,
  specialization character varying,
  bio text,
  skills text[],
  experience_years integer,
  is_active boolean DEFAULT true,
  profile_image_url character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id)
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_name character varying NOT NULL,
  client_company character varying,
  client_role character varying,
  testimonial text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  service_type character varying,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  client_image_url character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (adjust as needed)
-- For now, allowing public read on most tables (you can restrict later)

CREATE POLICY "Allow public read access on services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on team_members" ON public.team_members
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON public.blog_posts
  FOR SELECT USING (true);

-- Contact inquiries: Allow insert for public (form submissions)
CREATE POLICY "Allow public insert on contact_inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Admin access policies (for authenticated users)
-- You'll need to adjust these based on your auth setup
CREATE POLICY "Allow authenticated read on contact_inquiries" ON public.contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on contact_inquiries" ON public.contact_inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');
```

4. **Click "Run"** to execute the SQL

### Option B: Using SQL file in your project

The SQL is also available in `/supabase/schema.sql` in your project.

## 📝 Add Sample Data (Optional)

After creating tables, add some test data:

```sql
-- Add sample contact inquiries
INSERT INTO contact_inquiries (name, email, expertise, message, status)
VALUES 
  ('John Doe', 'john@example.com', 'GVA', 'Interested in general VA services', 'new'),
  ('Jane Smith', 'jane@example.com', 'EVA', 'Need executive assistance', 'new'),
  ('Bob Johnson', 'bob@example.com', 'ISA', 'Looking for social media help', 'in_progress');

-- Add sample team members
INSERT INTO team_members (name, email, role, specialization, is_active)
VALUES 
  ('Sarah Williams', 'sarah@pinesva.com', 'Virtual Assistant', 'General Admin', true),
  ('Mike Chen', 'mike@pinesva.com', 'Executive Assistant', 'Executive Support', true),
  ('Emily Davis', 'emily@pinesva.com', 'Social Media Manager', 'Instagram Marketing', true);

-- Add sample testimonials
INSERT INTO testimonials (client_name, client_company, testimonial, rating, is_approved)
VALUES 
  ('Robert Brown', 'Tech Startup Inc', 'Excellent service! Pines VA helped streamline our operations.', 5, true),
  ('Lisa Anderson', 'Marketing Agency', 'Professional and reliable. Highly recommend!', 5, true),
  ('David Wilson', 'E-commerce Store', 'Great experience with the team. Very responsive.', 4, true);

-- Add sample services
INSERT INTO services (name, slug, description, is_active)
VALUES 
  ('General Virtual Assistant', 'gva', 'General administrative and operational support', true),
  ('Executive Virtual Assistant', 'eva', 'High-level executive and strategic support', true),
  ('Instagram Social Assistant', 'isa', 'Social media management and Instagram growth', true),
  ('Medical Virtual Assistant', 'mva', 'Medical support and healthcare assistance', true);

-- Add sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, is_published)
VALUES 
  ('Getting Started with Virtual Assistants', 'getting-started-vas', 'Content about VAs...', 'Learn the basics', true),
  ('5 Ways VAs Can Transform Your Business', '5-ways-vas-transform', 'Content here...', 'Productivity tips', true);
```

## ✅ Verify Setup

1. **Check your `.env.local` file exists and has real values**
2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

3. **Visit the dashboard:**
   ```
   http://localhost:3000/admin/dashboard
   ```

4. **You should see:**
   - No errors in the terminal
   - Dashboard loads successfully
   - Real data from Supabase displayed

## 🔍 Troubleshooting

### Still getting errors?

#### 1. Check `.env.local` format:
```bash
# View your env file (make sure values are correct)
cat .env.local
```

#### 2. Verify Supabase connection:
```bash
# Check if variables are loaded
npm run dev
# Look for startup logs
```

#### 3. Test Supabase connection manually:

Create a test file `/app/test-supabase/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function TestPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('count');
  
  return (
    <div className="p-8">
      <h1>Supabase Connection Test</h1>
      {error ? (
        <div className="text-red-500">
          <p>Error: {error.message}</p>
        </div>
      ) : (
        <div className="text-green-500">
          <p>✅ Connected successfully!</p>
          <p>Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
}
```

Visit: `http://localhost:3000/test-supabase`

#### 4. Common Issues:

**Issue**: "relation does not exist"
- **Fix**: Tables not created. Run the SQL schema in Supabase

**Issue**: "permission denied"
- **Fix**: Check RLS policies. May need to temporarily disable RLS for testing

**Issue**: Variables not loading
- **Fix**: Restart dev server after creating `.env.local`

## 📚 Next Steps

Once connected:

1. ✅ Dashboard will show real data
2. ✅ Auto-refresh will work
3. ✅ All stats will be live
4. ✅ Recent activity will display

## 🔐 Security Notes

- **`.env.local`** is already in `.gitignore` (never commit this file!)
- The **anon key** is safe to use in the browser (public API key)
- Enable **RLS policies** for production security
- Add **authentication** before deploying

---

**Need Help?** 
- Supabase Docs: https://supabase.com/docs
- Next.js Env Vars: https://nextjs.org/docs/basic-features/environment-variables
