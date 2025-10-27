'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
  avatar?: ReactNode;
  className?: string;
  'data-agent-hook'?: string;
  'data-message-id'?: string;
  onContentUpdate?: (content: string) => void;
}

/**
 * Professional message bubbles with proper spacing and agent-friendly data attributes
 * Markdown rendering with helper methods for agentic formatting
 */
export function MessageBubble({
  role,
  content,
  timestamp,
  isStreaming = false,
  avatar,
  className = '',
  'data-agent-hook': dataAgentHook,
  'data-message-id': dataMessageId,
  onContentUpdate
}: MessageBubbleProps) {
  const isUser = role === 'user';

  const defaultAvatar = isUser ? (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 flex ${isUser ? 'justify-end' : 'justify-start'} ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="message-bubble"
      data-message-id={dataMessageId}
      data-role={role}
    >
      {isUser ? (
        // User message
        <div className="max-w-[85%] rounded-2xl bg-primary px-4 py-3 shadow-sm">
          <div className="text-primary-foreground text-[15px] leading-relaxed whitespace-pre-wrap wrap-break-word">
            {content}
          </div>
          {timestamp && (
            <div className="text-xs text-primary-foreground/70 mt-2 text-right">
              {timestamp.toLocaleTimeString()}
            </div>
          )}
        </div>
      ) : (
        // Assistant message
        <div className="flex gap-3 max-w-[85%]">
          <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-sm">
            {avatar || defaultAvatar}
          </div>
          <div className="flex-1 rounded-2xl bg-muted px-4 py-3 shadow-sm">
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:text-zinc-100 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-1 [&_strong]:font-semibold [&_em]:italic [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-zinc-200 [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-zinc-900 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_h2:first-child]:mt-2 [&_h3:first-child]:mt-2 [&_p]:text-foreground [&_p]:dark:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            {timestamp && (
              <div className="text-xs text-muted-foreground mt-2">
                {timestamp.toLocaleTimeString()}
              </div>
            )}
            {isStreaming && (
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
