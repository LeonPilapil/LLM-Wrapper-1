'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface ChatViewportProps {
  children: ReactNode;
  className?: string;
  'data-agent-hook'?: string;
  autoScroll?: boolean;
  onScroll?: (scrollTop: number, isAtBottom: boolean) => void;
  onScrollToBottom?: () => void;
}

/**
 * Main chat viewport with auto-scrolling and agent hooks
 * Structure conversations so agent-coded modules can listen or inject
 */
export function ChatViewport({
  children,
  className = '',
  'data-agent-hook': dataAgentHook,
  autoScroll = true,
  onScroll,
  onScrollToBottom
}: ChatViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (autoScroll && viewportRef.current && !isScrollingRef.current) {
      const viewport = viewportRef.current;
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [children, autoScroll]);

  const handleScroll = () => {
    if (!viewportRef.current || !onScroll) return;
    
    const viewport = viewportRef.current;
    const scrollTop = viewport.scrollTop;
    const scrollHeight = viewport.scrollHeight;
    const clientHeight = viewport.clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
    
    onScroll(scrollTop, isAtBottom);
  };

  const handleScrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
      onScrollToBottom?.();
    }
  };

  return (
    <motion.div
      ref={viewportRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={`flex-1 overflow-y-auto px-4 py-8 scroll-smooth bg-background ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="chat-viewport"
      onScroll={handleScroll}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      
      {/* Scroll to bottom button - appears when not at bottom */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleScrollToBottom}
        className="fixed bottom-24 right-6 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow z-10"
        data-agent-hook="scroll-to-bottom"
      >
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
