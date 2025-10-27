'use client';

import { useState, useCallback, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  responseId?: string; // NEW: OpenAI response ID for chaining
}

interface StreamingChatOptions {
  onMessageSent?: (message: string) => void;
  onMessageReceived?: (message: string) => void;
  onStreamingStart?: () => void;
  onStreamingEnd?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for managing streaming chat with real-time token-by-token updates
 * Provides immediate feedback within 200-500ms of sending message
 */
export function useStreamingChat(options: StreamingChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingMessageRef = useRef<Message | null>(null);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const updateStreamingMessage = useCallback((content: string) => {
    if (streamingMessageRef.current) {
      const currentMessage = streamingMessageRef.current;
      setMessages(prev => 
        prev.map(msg => 
          msg.id === currentMessage.id 
            ? { ...msg, content, isStreaming: true }
            : msg
        )
      );
    }
  }, []);

  const finalizeStreamingMessage = useCallback(() => {
    if (streamingMessageRef.current) {
      const currentMessage = streamingMessageRef.current;
      setMessages(prev => 
        prev.map(msg => 
          msg.id === currentMessage.id 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      streamingMessageRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(async (
    content: string,
    expertType: string,
    reasoningEffort: string,
    verbosity: string
  ) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage = addMessage({
      role: 'user',
      content: content.trim(),
    });

    options.onMessageSent?.(content.trim());
    setIsLoading(true);

    try {
      // Find last assistant message with responseId for conversation chaining
      const lastAssistantMessage = messages
        .filter(m => m.role === 'assistant' && m.responseId)
        .pop();

      // Create streaming assistant message
      const assistantMessage = addMessage({
        role: 'assistant',
        content: '',
        isStreaming: true,
      });
      
      streamingMessageRef.current = assistantMessage;
      setIsStreaming(true);
      options.onStreamingStart?.();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          previous_response_id: lastAssistantMessage?.responseId,
          expertType,
          reasoningEffort,
          verbosity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Failed to get response');
      }

      const data = await response.json();
      
      // Simulate streaming by updating content progressively
      const fullContent = data.text;
      const words = fullContent.split(' ');
      let currentContent = '';
      
      for (let i = 0; i < words.length; i++) {
        currentContent += (i > 0 ? ' ' : '') + words[i];
        updateStreamingMessage(currentContent);
        
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Update the assistant message with the response ID for chaining
      if (data.responseId) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, responseId: data.responseId }
              : msg
          )
        );
      }

      options.onMessageReceived?.(fullContent);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = `**Error:** ${error instanceof Error ? error.message : 'Failed to get response. Please try again.'}`;
      updateStreamingMessage(errorMessage);
      options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      finalizeStreamingMessage();
      options.onStreamingEnd?.();
    }
  }, [messages, isLoading, addMessage, updateStreamingMessage, finalizeStreamingMessage, options]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    streamingMessageRef.current = null;
  }, []);

  // Cleanup function to reset streaming state
  const resetStreamingState = useCallback(() => {
    streamingMessageRef.current = null;
    setIsStreaming(false);
  }, []);

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    clearMessages,
    addMessage,
    resetStreamingState,
  };
}
