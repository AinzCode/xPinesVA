// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          user_id: string | null
          name: string
          role: 'admin' | 'super_admin'
          created_at: string
          updated_at: string
          email: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          role?: 'admin' | 'super_admin'
          created_at?: string
          updated_at?: string
          email: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          role?: 'admin' | 'super_admin'
          created_at?: string
          updated_at?: string
          email?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          age: number | null
          expertise: string | null
          company_name: string | null
          message: string | null
          status: 'new' | 'in_progress' | 'completed' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          age?: number | null
          expertise?: string | null
          company_name?: string | null
          message?: string | null
          status?: 'new' | 'in_progress' | 'completed' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          age?: number | null
          expertise?: string | null
          company_name?: string | null
          message?: string | null
          status?: 'new' | 'in_progress' | 'completed' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          pricing_min: number | null
          pricing_max: number | null
          pricing_type: 'hourly' | 'monthly' | 'project' | 'commission'
          features: string[] | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          pricing_min?: number | null
          pricing_max?: number | null
          pricing_type?: 'hourly' | 'monthly' | 'project' | 'commission'
          features?: string[] | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          pricing_min?: number | null
          pricing_max?: number | null
          pricing_type?: 'hourly' | 'monthly' | 'project' | 'commission'
          features?: string[] | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          email: string
          role: string | null
          specialization: string | null
          bio: string | null
          skills: string[] | null
          experience_years: number | null
          is_active: boolean
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: string | null
          specialization?: string | null
          bio?: string | null
          skills?: string[] | null
          experience_years?: number | null
          is_active?: boolean
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string | null
          specialization?: string | null
          bio?: string | null
          skills?: string[] | null
          experience_years?: number | null
          is_active?: boolean
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author_id: string | null
          category: string | null
          tags: string[] | null
          featured_image_url: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author_id?: string | null
          category?: string | null
          tags?: string[] | null
          featured_image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author_id?: string | null
          category?: string | null
          tags?: string[] | null
          featured_image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_company: string | null
          client_role: string | null
          testimonial: string
          rating: number | null
          service_type: string | null
          is_featured: boolean
          is_approved: boolean
          client_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_company?: string | null
          client_role?: string | null
          testimonial: string
          rating?: number | null
          service_type?: string | null
          is_featured?: boolean
          is_approved?: boolean
          client_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_company?: string | null
          client_role?: string | null
          testimonial?: string
          rating?: number | null
          service_type?: string | null
          is_featured?: boolean
          is_approved?: boolean
          client_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type AdminUser = Database['public']['Tables']['admin_users']['Row']
export type AdminUserInsert = Database['public']['Tables']['admin_users']['Insert']

export type ContactInquiry = Database['public']['Tables']['contact_inquiries']['Row']
export type ContactInquiryInsert = Database['public']['Tables']['contact_inquiries']['Insert']
export type ContactInquiryUpdate = Database['public']['Tables']['contact_inquiries']['Update']

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']

export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']

export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']