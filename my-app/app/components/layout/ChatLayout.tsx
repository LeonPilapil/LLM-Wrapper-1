'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ChatLayoutProps {
  children: ReactNode;
  className?: string;
  'data-agent-hook'?: string;
}

/**
 * Main chat layout container with agent-friendly data attributes
 * Provides clean structure for agentic AI workflows
 */
export function ChatLayout({ 
  children, 
  className = '', 
  'data-agent-hook': dataAgentHook 
}: ChatLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col h-screen bg-background ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="chat-layout"
    >
      {children}
    </motion.div>
  );
}





