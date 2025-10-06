import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { NotificationUpdate } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export async function PATCH() {
  try {
    const supabase = await createClient();
    
    // Verify admin authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const userRole = (adminData as { role: string }).role;

    // Mark all unread notifications as read
    const updateData: NotificationUpdate = { is_read: true };
    const { data: notifications, error: updateError } = await supabase
      .from('notifications')
      // @ts-expect-error - Supabase type inference issue
      .update(updateData)
      .eq('is_read', false)
      .or(`recipient_id.eq.${user.id},recipient_role.eq.${userRole}`)
      .select();

    if (updateError) {
      console.error('Error marking all notifications as read:', updateError);
      return NextResponse.json(
        { error: 'Failed to mark all notifications as read', details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: notifications?.length || 0,
    });

  } catch (error) {
    console.error('Error in mark all notifications as read API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
