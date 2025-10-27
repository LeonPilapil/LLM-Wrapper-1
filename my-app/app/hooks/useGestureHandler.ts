'use client';

import { useCallback, useRef, useEffect } from 'react';

interface GestureCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onLongPress?: () => void;
}

interface GestureOptions {
  threshold?: number;
  maxDuration?: number;
  longPressDelay?: number;
}

/**
 * Hook for handling mobile gestures and touch interactions
 * Including swipes or gestures for agentic controls
 */
export function useGestureHandler(
  callbacks: GestureCallbacks = {},
  options: GestureOptions = {}
) {
  const {
    threshold = 50,
    maxDuration = 500,
    longPressDelay = 500,
  } = options;

  const startPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Start long press timer
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      callbacks.onLongPress?.();
    }, longPressDelay);
  }, [callbacks, longPressDelay]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Cancel long press if user moves
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!startPosRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;
    const deltaTime = Date.now() - startPosRef.current.time;

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Check if it's a quick tap
    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold && deltaTime < maxDuration && !isLongPressRef.current) {
      callbacks.onTap?.();
    }

    // Check for swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold && deltaTime < maxDuration) {
        if (deltaX > 0) {
          callbacks.onSwipeRight?.();
        } else {
          callbacks.onSwipeLeft?.();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold && deltaTime < maxDuration) {
        if (deltaY > 0) {
          callbacks.onSwipeDown?.();
        } else {
          callbacks.onSwipeUp?.();
        }
      }
    }

    // Reset
    startPosRef.current = null;
    isLongPressRef.current = false;
  }, [callbacks, threshold, maxDuration]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Handle pinch gestures on trackpad
    if (e.ctrlKey) {
      e.preventDefault();
      const scale = e.deltaY > 0 ? 0.9 : 1.1;
      callbacks.onPinch?.(scale);
    }
  }, [callbacks]);

  const attachGestures = useCallback((element: HTMLElement) => {
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('wheel', handleWheel);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleWheel]);

  return {
    attachGestures,
  };
}





