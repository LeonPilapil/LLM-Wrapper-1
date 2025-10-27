'use client';

import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  'data-agent-hook'?: string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Responsive container with utility classes that can be conditionally toggled by agents
 * Works beautifully on mobile, tablet, and desktop
 */
export function ResponsiveContainer({
  children,
  className = '',
  'data-agent-hook': dataAgentHook,
  breakpoint = 'lg'
}: ResponsiveContainerProps) {
  const responsiveClasses = {
    sm: 'max-w-sm mx-auto',
    md: 'max-w-md mx-auto',
    lg: 'max-w-3xl mx-auto',
    xl: 'max-w-4xl mx-auto',
  };

  return (
    <div
      className={cn(
        'w-full px-4 sm:px-6 lg:px-8',
        responsiveClasses[breakpoint],
        className
      )}
      data-agent-hook={dataAgentHook}
      data-component="responsive-container"
    >
      {children}
    </div>
  );
}





