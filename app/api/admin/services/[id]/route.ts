import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use service role to bypass RLS for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { id } = params;
    const body = await request.json();

    const updates: {
      name?: string;
      description?: string;
      short_description?: string;
      pricing_min?: number;
      pricing_max?: number;
      pricing_type?: string;
      features?: string[];
      is_active?: boolean;
      sort_order?: number;
      updated_at: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    // Validate and add allowed fields
    if ('name' in body && typeof body.name === 'string') {
      updates.name = body.name;
    }
    if ('description' in body) {
      updates.description = body.description;
    }
    if ('short_description' in body) {
      updates.short_description = body.short_description;
    }
    if ('pricing_min' in body && typeof body.pricing_min === 'number') {
      updates.pricing_min = body.pricing_min;
    }
    if ('pricing_max' in body && typeof body.pricing_max === 'number') {
      updates.pricing_max = body.pricing_max;
    }
    if ('pricing_type' in body) {
      const validTypes = ['hourly', 'monthly', 'project', 'commission'];
      if (!validTypes.includes(body.pricing_type)) {
        return NextResponse.json(
          { error: `Invalid pricing_type. Must be one of: ${validTypes.join(', ')}` },
          { status: 400 }
        );
      }
      updates.pricing_type = body.pricing_type;
    }
    if ('features' in body && Array.isArray(body.features)) {
      updates.features = body.features;
    }
    if ('is_active' in body && typeof body.is_active === 'boolean') {
      updates.is_active = body.is_active;
    }
    if ('sort_order' in body && typeof body.sort_order === 'number') {
      updates.sort_order = body.sort_order;
    }

    const { data, error } = await supabase
      .from('services')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service:', error);
      return NextResponse.json(
        { error: 'Failed to update service' },
        { status: 500 }
      );
    }

    return NextResponse.json({ service: data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use service role to bypass RLS for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { id } = params;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      return NextResponse.json(
        { error: 'Failed to delete service' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
