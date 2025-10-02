import { createClient } from '@/lib/supabase/server';
import BlogClient from './client';

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return <BlogClient initialData={{ blogPosts: blogPosts || [] }} />;
}
