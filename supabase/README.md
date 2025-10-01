# Database Setup Instructions

Follow these steps to set up your Supabase database for the Pines VA website.

## Prerequisites
- You should have a Supabase project created
- Your environment variables should be set in `.env.local`

## Setup Steps

### 1. Access Supabase SQL Editor
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `iswbqabqsbxrunisztqw`
3. Navigate to the **SQL Editor** in the left sidebar

### 2. Run Database Schema
1. Open the **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click **Run** to create all tables, indexes, and triggers

### 3. Insert Sample Data
1. Copy and paste the contents of `supabase/seed-data.sql`
2. Click **Run** to insert sample services, team members, and testimonials

### 4. Set Up Row Level Security
1. Copy and paste the contents of `supabase/rls-policies.sql`
2. Click **Run** to enable RLS and create security policies

## Database Tables Created

### Core Tables:
- **contact_inquiries** - Store contact form submissions
- **services** - Store VA service information
- **team_members** - Store team member profiles
- **testimonials** - Store client testimonials
- **blog_posts** - Store blog content (for future use)

### Key Features:
- ✅ **Row Level Security (RLS)** enabled
- ✅ **Automatic timestamps** with triggers
- ✅ **UUID primary keys** for better security
- ✅ **Indexes** for optimal performance
- ✅ **Type safety** with TypeScript definitions

## Environment Variables Required

Make sure your `.env.local` contains:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://iswbqabqsbxrunisztqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Verify Setup

After running all SQL scripts, verify in Supabase dashboard:

1. **Tables**: Check that all 6 tables are created
2. **Data**: Verify sample data is inserted
3. **RLS**: Confirm RLS is enabled on all tables

## Next Steps

1. **Contact Form Integration** - Connect your contact form to `contact_inquiries` table
2. **Dynamic Content** - Load services and testimonials from database
3. **Admin Dashboard** - Build admin interface to manage data

## Troubleshooting

If you encounter issues:
1. Check that your Supabase project is active
2. Verify environment variables are correct
3. Ensure you have proper permissions in Supabase
4. Check the Supabase logs for detailed error messages

## Security Notes

- RLS policies allow anonymous users to submit forms
- Only authenticated users can view/edit admin data
- All sensitive operations require authentication
- Consider setting up user roles for different admin levels