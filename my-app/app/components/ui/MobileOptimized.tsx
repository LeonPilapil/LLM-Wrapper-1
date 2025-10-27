'use client';

import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface MobileOptimizedProps {
  children: ReactNode;
  className?: string;
  'data-agent-hook'?: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  touchOptimized?: boolean;
}

/**
 * Mobile-optimized component with touch interactions and responsive behavior
 * Including swipes or gestures for agentic controls
 */
export function MobileOptimized({
  children,
  className = '',
  'data-agent-hook': dataAgentHook,
  hideOnMobile = false,
  hideOnDesktop = false,
  touchOptimized = true
}: MobileOptimizedProps) {
  const visibilityClasses = cn(
    hideOnMobile && 'hidden sm:block',
    hideOnDesktop && 'block sm:hidden'
  );

  const touchClasses = touchOptimized ? 'touch-manipulation select-none' : '';

  return (
    <div
      className={cn(
        'transition-all duration-200',
        visibilityClasses,
        touchClasses,
        className
      )}
      data-agent-hook={dataAgentHook}
      data-component="mobile-optimized"
      style={{
        WebkitTouchCallout: touchOptimized ? 'none' : 'default',
        WebkitUserSelect: touchOptimized ? 'none' : 'auto',
        userSelect: touchOptimized ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  );
}





