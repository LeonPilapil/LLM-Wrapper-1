'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Send, Paperclip, Mic } from 'lucide-react';

interface MessageComposerProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'data-agent-hook'?: string;
  onInputChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  showAttachments?: boolean;
  showVoiceInput?: boolean;
}

/**
 * Fixed composer at bottom with input handling and send functionality
 * Provide onInput/onSend hooks for agent use
 */
export function MessageComposer({
  onSend,
  placeholder = "Ask me anything...",
  disabled = false,
  className = '',
  'data-agent-hook': dataAgentHook,
  onInputChange,
  onKeyDown,
  maxLength = 2000,
  showAttachments = false,
  showVoiceInput = false
}: MessageComposerProps) {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setInput(value);
      onInputChange?.(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else {
      onKeyDown?.(e);
    }
  };

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    
    onSend(input.trim());
    setInput('');
    onInputChange?.('');
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={`border-t border-border bg-background/95 backdrop-blur-sm ${className}`}
      data-agent-hook={dataAgentHook}
      data-component="message-composer"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          {/* Attachment button */}
          {showAttachments && (
            <Button
              variant="ghost"
              size="sm"
              className="m-2 shrink-0"
              data-agent-hook="attachment-button"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          )}

          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            className="flex-1 resize-none bg-transparent px-4 py-3 text-[15px] placeholder:text-muted-foreground focus:outline-none max-h-32 min-h-[44px]"
            rows={1}
            disabled={disabled}
            data-agent-hook="message-input"
          />

          {/* Voice input button */}
          {showVoiceInput && (
            <Button
              variant="ghost"
              size="sm"
              className="m-2 shrink-0"
              data-agent-hook="voice-input-button"
            >
              <Mic className="w-4 h-4" />
            </Button>
          )}

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled || isComposing}
            className="m-2 flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all shadow-sm"
            data-agent-hook="send-button"
          >
            <Send className="w-4 h-4" />
            <span className="ml-2 font-medium hidden sm:inline">Send</span>
          </Button>
        </div>

        {/* Character count */}
        {input.length > maxLength * 0.8 && (
          <div className="text-xs text-muted-foreground mt-2 text-right">
            {input.length}/{maxLength}
          </div>
        )}
      </div>
    </motion.div>
  );
}
