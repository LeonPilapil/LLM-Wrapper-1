'use client';

import { motion } from 'motion/react';

interface StreamingIndicatorProps {
  isVisible: boolean;
  className?: string;
  'data-agent-hook'?: string;
}

/**
 * Token-by-token streaming indicator for real-time response visibility
 * Emitted as events for agent-coded features
 */
export function StreamingIndicator({
  isVisible,
  className = '',
  'data-agent-hook': dataAgentHook
}: StreamingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`mb-6 flex justify-start ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="streaming-indicator"
    >
      <div className="flex gap-3 max-w-[85%]">
        <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1 rounded-2xl bg-muted px-4 py-3 shadow-sm">
          <div className="flex gap-1">
            <motion.div
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
