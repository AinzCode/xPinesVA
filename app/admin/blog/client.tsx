'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { FileText, Eye, Edit, Trash2, Plus, Calendar, Tag, Star, Image } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author_id: string | null;
  category: string | null;
  tags: string[] | null;
  featured_image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  views_count: number | null;
}

interface BlogClientProps {
  initialData: {
    blogPosts: BlogPost[];
  };
}

export default function BlogClient({ initialData }: BlogClientProps) {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTogglePublish = async (id: string) => {
    const post = data.blogPosts.find(p => p.id === id);
    if (!post) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        setData(prev => ({
          blogPosts: prev.blogPosts.map(post =>
            post.id === id
              ? {
                  ...post,
                  is_published: !post.is_published,
                  published_at: !post.is_published ? new Date().toISOString() : null,
                  updated_at: new Date().toISOString(),
                }
              : post
          )
        }));
      } else {
        console.error('Failed to update publish status');
        alert('Failed to update publish status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating publish status:', error);
      alert('Failed to update publish status. Please try again.');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const post = data.blogPosts.find(p => p.id === id);
    if (!post) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !post.is_featured }),
      });

      if (response.ok) {
        setData(prev => ({
          blogPosts: prev.blogPosts.map(post =>
            post.id === id ? { ...post, is_featured: !post.is_featured, updated_at: new Date().toISOString() } : post
          )
        }));
      } else {
        console.error('Failed to toggle featured status');
        alert('Failed to toggle featured status. Please try again.');
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      alert('Failed to toggle featured status. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(prev => ({
          blogPosts: prev.blogPosts.filter(post => post.id !== id)
        }));
      } else {
        console.error('Failed to delete blog post');
        alert('Failed to delete blog post. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const filteredPosts = data.blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && post.is_published && !post.is_featured) ||
      (statusFilter === 'draft' && !post.is_published) ||
      (statusFilter === 'featured' && post.is_featured);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: data.blogPosts.length,
    published: data.blogPosts.filter(p => p.is_published && !p.is_featured).length,
    draft: data.blogPosts.filter(p => !p.is_published).length,
    featured: data.blogPosts.filter(p => p.is_featured).length,
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={() => console.log('Export blog posts')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Create and manage blog content
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#052814] text-white hover:bg-[#074d24] transition-colors">
                  <Plus className="h-4 w-4" />
                  New Post
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                      <p className="text-3xl font-bold mt-2">{stats.total}</p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Published</p>
                      <p className="text-3xl font-bold mt-2">{stats.published}</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                      <p className="text-3xl font-bold mt-2">{stats.draft}</p>
                    </div>
                    <Edit className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Featured</p>
                      <p className="text-3xl font-bold mt-2">{stats.featured}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { key: 'all', label: 'All Posts', count: stats.total },
                  { key: 'published', label: 'Published', count: stats.published },
                  { key: 'draft', label: 'Drafts', count: stats.draft },
                  { key: 'featured', label: 'Featured', count: stats.featured },
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key as typeof statusFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      statusFilter === key
                        ? 'bg-[#052814] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      statusFilter === key ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg border bg-card hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Featured Image */}
                    {post.featured_image_url ? (
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#052814] to-[#0a6e33] flex items-center justify-center">
                        <Image className="h-16 w-16 text-white/30" aria-label="No featured image" />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Status Badges */}
                      <div className="flex gap-2 mb-3">
                        {post.is_featured && (
                          <span className="inline-flex px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
                            Featured
                          </span>
                        )}
                        {post.is_published ? (
                          <span className="inline-flex px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium">
                            Draft
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl mb-2 line-clamp-2">{post.title}</h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      )}

                      {/* Meta Info */}
                      <div className="space-y-2 mb-4">
                        {post.category && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Tag className="h-3 w-3" />
                            {post.category}
                          </div>
                        )}
                        {post.published_at && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {post.published_at.split('T')[0]}
                          </div>
                        )}
                        {post.views_count !== null && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {post.views_count} views
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-flex px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            post.is_published
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              : 'bg-green-50 hover:bg-green-100 text-green-600'
                          }`}
                        >
                          <Eye className="h-4 w-4" />
                          {post.is_published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(post.id)}
                          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            post.is_featured
                              ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <Star className={`h-4 w-4 ${post.is_featured ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => console.log('Edit post:', post.id)}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 rounded-lg border bg-card">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">No blog posts found</p>
                  <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#052814] text-white hover:bg-[#074d24] transition-colors mx-auto">
                    <Plus className="h-4 w-4" />
                    Create your first post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
