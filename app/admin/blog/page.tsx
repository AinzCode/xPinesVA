import { createClient } from '@supabase/supabase-js';
import BlogClient from './client';

export default async function BlogPage() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return <BlogClient initialData={{ blogPosts: blogPosts || [] }} />;
}
