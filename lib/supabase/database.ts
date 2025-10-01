// Simple database helper functions
import { createClient } from './client'
import { createClient as createServerClient } from './server'

// Client-side database operations
export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  age?: number
  expertise?: string
  company_name?: string
  message?: string
}) {
  const supabase = createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('contact_inquiries')
    .insert([formData])
    .select()
    .single()

  if (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
  return data
}

export async function getServices() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }
  return data
}

export async function getTestimonials(featured = false) {
  const supabase = createClient()
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)

  if (featured) {
    query = query.eq('is_featured', true)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data
}

// Server-side database operations
export async function getServicesServer() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }
  return data
}

export async function getTestimonialsServer(featured = false) {
  const supabase = await createServerClient()
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)

  if (featured) {
    query = query.eq('is_featured', true)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data
}

export async function getTeamMembersServer() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('experience_years', { ascending: false })

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }
  return data
}