'use client';

import { useCallback, useRef, useEffect } from 'react';

interface AgentHookCallbacks {
  onMessageSent?: (message: string) => void;
  onMessageReceived?: (message: string) => void;
  onExpertChanged?: (expertId: string) => void;
  onSettingsChanged?: (settings: Record<string, any>) => void;
  onScroll?: (scrollTop: number, isAtBottom: boolean) => void;
  onInputChange?: (value: string) => void;
  onStreamingStart?: () => void;
  onStreamingEnd?: () => void;
  onThinkingStart?: () => void;
  onThinkingEnd?: () => void;
}

/**
 * Hook system for agent integration and dynamic UI updates
 * Provides ample hooks for advanced agent workflows
 */
export function useAgentHooks(callbacks: AgentHookCallbacks = {}) {
  const callbacksRef = useRef(callbacks);
  
  // Update callbacks ref when they change
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  const handleMessageSent = useCallback((message: string) => {
    callbacksRef.current.onMessageSent?.(message);
  }, []);

  const handleMessageReceived = useCallback((message: string) => {
    callbacksRef.current.onMessageReceived?.(message);
  }, []);

  const handleExpertChanged = useCallback((expertId: string) => {
    callbacksRef.current.onExpertChanged?.(expertId);
  }, []);

  const handleSettingsChanged = useCallback((settings: Record<string, any>) => {
    callbacksRef.current.onSettingsChanged?.(settings);
  }, []);

  const handleScroll = useCallback((scrollTop: number, isAtBottom: boolean) => {
    callbacksRef.current.onScroll?.(scrollTop, isAtBottom);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    callbacksRef.current.onInputChange?.(value);
  }, []);

  const handleStreamingStart = useCallback(() => {
    callbacksRef.current.onStreamingStart?.();
  }, []);

  const handleStreamingEnd = useCallback(() => {
    callbacksRef.current.onStreamingEnd?.();
  }, []);

  const handleThinkingStart = useCallback(() => {
    callbacksRef.current.onThinkingStart?.();
  }, []);

  const handleThinkingEnd = useCallback(() => {
    callbacksRef.current.onThinkingEnd?.();
  }, []);

  return {
    handleMessageSent,
    handleMessageReceived,
    handleExpertChanged,
    handleSettingsChanged,
    handleScroll,
    handleInputChange,
    handleStreamingStart,
    handleStreamingEnd,
    handleThinkingStart,
    handleThinkingEnd,
  };
}





