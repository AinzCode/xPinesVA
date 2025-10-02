'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { ContactInquiry } from '@/lib/supabase/types';

interface RecentActivityProps {
  activities?: ContactInquiry[];
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'new':
      return 'text-blue-500';
    case 'in_progress':
      return 'text-orange-500';
    case 'completed':
      return 'text-green-500';
    case 'archived':
      return 'text-gray-500';
    default:
      return 'text-gray-500';
  }
}

export const RecentActivity = memo(({ activities = [] }: RecentActivityProps) => {
  return (
    <div className="border-border bg-card/40 rounded-xl border p-6">
      <h3 className="mb-4 text-xl font-semibold">Recent Inquiries</h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-muted-foreground text-center text-sm py-4">
            No recent inquiries
          </div>
        ) : (
          activities.slice(0, 5).map((activity, index) => {
            const statusColor = getStatusColor(activity.status);
            const Icon = MessageSquare;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
              >
                <div className={`bg-accent/50 rounded-lg p-2`}>
                  <Icon className={`h-4 w-4 ${statusColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{activity.name}</div>
                  <div className="text-muted-foreground truncate text-xs">
                    {activity.email}
                  </div>
                </div>
                <div className="text-muted-foreground text-xs">
                  {getTimeAgo(activity.created_at)}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
});

RecentActivity.displayName = 'RecentActivity';
