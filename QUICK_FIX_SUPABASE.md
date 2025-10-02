# 🚨 QUICK FIX - Supabase Environment Variables

## The Problem
```
Error: Your project's URL and Key are required to create a Supabase client!
```

## The Solution (3 Steps)

### Step 1️⃣: Get Your Supabase Credentials

Go to: **https://supabase.com/dashboard**

1. Select your project
2. Click ⚙️ **Settings** → **API**
3. Copy these two values:
   - **Project URL**
   - **anon public key**

### Step 2️⃣: Update `.env.local`

Open the `.env.local` file I created in your project root and replace:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

With your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

### Step 3️⃣: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then start again:
npm run dev
```

## ✅ Done!

Visit: **http://localhost:3000/admin/dashboard**

---

## 🗄️ Need to Set Up Database Tables?

If you see "relation does not exist" errors:

1. Go to **Supabase SQL Editor**: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Click **"New Query"**
3. Copy the SQL from `SUPABASE_SETUP_GUIDE.md` (search for "CREATE TABLE")
4. Run it

Then add sample data to see your dashboard populate!

---

**Full Guide:** See `SUPABASE_SETUP_GUIDE.md` for detailed instructions
