'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className
}: ShinyTextProps) {
  return (
    <div
      className={cn(
        'relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-300 via-amber-400 to-green-600 animate-shimmer',
        disabled && 'animate-none',
        className
      )}
      style={{
        backgroundSize: disabled ? '100%' : '200% 100%',
        animationDuration: `${speed}s`
      }}
    >
      {text}
    </div>
  );
}