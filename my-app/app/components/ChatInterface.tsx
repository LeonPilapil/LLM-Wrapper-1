'use client';

import { useState, useEffect } from 'react';
import { ChatLayout } from './layout/ChatLayout';
import { ChatHeader } from './layout/ChatHeader';
import { ExpertSelector } from './layout/ExpertSelector';
import { ChatViewport } from './chat/ChatViewport';
import { MessageBubble } from './chat/MessageBubble';
import { MessageComposer } from './chat/MessageComposer';
import { WelcomeScreen } from './chat/WelcomeScreen';
import { ThinkingIndicator } from './chat/ThinkingIndicator';
import { StreamingIndicator } from './chat/StreamingIndicator';
import { useStreamingChat } from '../hooks/useStreamingChat';
import { useAgentHooks } from '../hooks/useAgentHooks';
import { EXPERT_METADATA } from '../lib/prompts';
import { type ExpertType, type ReasoningEffort, type Verbosity } from '../lib/types';
import { GPT5_CONFIG, STORAGE_KEYS } from '../lib/config';
import { SettingsPanel } from './settings-panel';
import { Zap, Settings } from 'lucide-react';

interface ChatInterfaceProps {
  className?: string;
  'data-agent-hook'?: string;
}

/**
 * Main chat interface with clean, modular architecture
 * Perfect for agentic AI workflows with ample hooks and clear props
 */
export function ChatInterface({ 
  className = '', 
  'data-agent-hook': dataAgentHook 
}: ChatInterfaceProps) {
  // Expert selection
  const [expertType, setExpertType] = useState<ExpertType>('marketer');
  
  // GPT-5 settings with defaults
  const [reasoningEffort, setReasoningEffort] = useState<ReasoningEffort>(
    GPT5_CONFIG.defaultReasoningEffort
  );
  const [verbosity, setVerbosity] = useState<Verbosity>(
    GPT5_CONFIG.defaultVerbosity
  );
  
  // Settings panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Chat functionality
  const { messages, isLoading, isStreaming, sendMessage, clearMessages, resetStreamingState } = useStreamingChat({
    onMessageSent: (message) => console.log('Message sent:', message),
    onMessageReceived: (message) => console.log('Message received:', message),
    onStreamingStart: () => console.log('Streaming started'),
    onStreamingEnd: () => console.log('Streaming ended'),
    onError: (error) => console.error('Chat error:', error),
  });

  // Cleanup streaming state on unmount
  useEffect(() => {
    return () => {
      resetStreamingState();
    };
  }, [resetStreamingState]);

  // Agent hooks
  const agentHooks = useAgentHooks({
    onMessageSent: (message) => console.log('Agent: Message sent', message),
    onMessageReceived: (message) => console.log('Agent: Message received', message),
    onExpertChanged: (expertId) => console.log('Agent: Expert changed', expertId),
    onSettingsChanged: (settings) => console.log('Agent: Settings changed', settings),
    onScroll: (scrollTop, isAtBottom) => console.log('Agent: Scroll', { scrollTop, isAtBottom }),
    onInputChange: (value) => console.log('Agent: Input changed', value),
    onStreamingStart: () => console.log('Agent: Streaming started'),
    onStreamingEnd: () => console.log('Agent: Streaming ended'),
    onThinkingStart: () => console.log('Agent: Thinking started'),
    onThinkingEnd: () => console.log('Agent: Thinking ended'),
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReasoningEffort = localStorage.getItem(STORAGE_KEYS.REASONING_EFFORT) as ReasoningEffort;
      const savedVerbosity = localStorage.getItem(STORAGE_KEYS.VERBOSITY) as Verbosity;
      const savedExpertType = localStorage.getItem(STORAGE_KEYS.EXPERT_TYPE) as ExpertType;

      if (savedReasoningEffort) setReasoningEffort(savedReasoningEffort);
      if (savedVerbosity) setVerbosity(savedVerbosity);
      if (savedExpertType) setExpertType(savedExpertType);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REASONING_EFFORT, reasoningEffort);
      localStorage.setItem(STORAGE_KEYS.VERBOSITY, verbosity);
      localStorage.setItem(STORAGE_KEYS.EXPERT_TYPE, expertType);
    }
  }, [reasoningEffort, verbosity, expertType]);

  const currentExpert = EXPERT_METADATA[expertType];
  
  const expertOptions = Object.entries(EXPERT_METADATA).map(([id, metadata]) => ({
    id,
    label: metadata.label,
    description: metadata.description,
    icon: metadata.icon,
    isActive: id === expertType,
    'data-agent-hook': `expert-${id}`,
  }));

  const exampleQuestions = [
    {
      question: "How do I launch my new product successfully?",
      category: "Product Launch",
      onClick: () => sendMessage("How do I launch my new product successfully?", expertType, reasoningEffort, verbosity),
      'data-agent-hook': 'example-product-launch',
    },
    {
      question: "What's the best way to acquire my first 100 customers?",
      category: "Customer Acquisition",
      onClick: () => sendMessage("What's the best way to acquire my first 100 customers?", expertType, reasoningEffort, verbosity),
      'data-agent-hook': 'example-customer-acquisition',
    },
    {
      question: "Help me create a content marketing strategy",
      category: "Content Strategy",
      onClick: () => sendMessage("Help me create a content marketing strategy", expertType, reasoningEffort, verbosity),
      'data-agent-hook': 'example-content-strategy',
    },
    {
      question: "How can I improve my Facebook ads performance?",
      category: "Paid Advertising",
      onClick: () => sendMessage("How can I improve my Facebook ads performance?", expertType, reasoningEffort, verbosity),
      'data-agent-hook': 'example-paid-ads',
    },
  ];

  const handleSend = (message: string) => {
    agentHooks.handleMessageSent(message);
    sendMessage(message, expertType, reasoningEffort, verbosity);
  };

  const handleExpertChange = (expertId: string) => {
    setExpertType(expertId as ExpertType);
    agentHooks.handleExpertChanged(expertId);
  };

  const handleSettingsChange = (newReasoningEffort: ReasoningEffort, newVerbosity: Verbosity) => {
    setReasoningEffort(newReasoningEffort);
    setVerbosity(newVerbosity);
    agentHooks.handleSettingsChanged({ reasoningEffort: newReasoningEffort, verbosity: newVerbosity });
  };

  return (
    <ChatLayout 
      className={className}
      data-agent-hook={dataAgentHook}
    >
      {/* Header */}
      <ChatHeader
        title={`AI ${currentExpert.label}`}
        subtitle={currentExpert.description}
        icon={<Zap className="w-5 h-5 text-white" />}
        badges={[
          {
            label: `Reasoning: ${reasoningEffort}`,
            variant: 'outline',
            'data-agent-hook': 'reasoning-badge',
          },
          {
            label: `Verbosity: ${verbosity}`,
            variant: 'outline',
            'data-agent-hook': 'verbosity-badge',
          },
        ]}
        onSettingsClick={() => setIsSettingsOpen(true)}
        data-agent-hook="main-header"
      />

      {/* Expert Selector */}
      <ExpertSelector
        experts={expertOptions}
        selectedExpert={expertType}
        onExpertChange={handleExpertChange}
        data-agent-hook="expert-selector"
      />

      {/* Chat Viewport */}
      <ChatViewport
        onScroll={agentHooks.handleScroll}
        data-agent-hook="chat-viewport"
      >
        {messages.length === 0 ? (
          <WelcomeScreen
            title="Welcome to AI Expert Wrapper"
            subtitle={`Powered by GPT-5, ready to provide expert-level guidance tailored to your needs.`}
            examples={exampleQuestions}
            data-agent-hook="welcome-screen"
          />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                isStreaming={message.isStreaming}
                data-agent-hook={`message-${message.role}`}
                data-message-id={message.id}
              />
            ))}
            
            {/* Thinking indicator for GPT-5 reasoning mode */}
            <ThinkingIndicator
              isVisible={isLoading && !isStreaming}
              message="Analyzing your request..."
              data-agent-hook="thinking-indicator"
            />
            
            {/* Streaming indicator */}
            <StreamingIndicator
              isVisible={isStreaming}
              data-agent-hook="streaming-indicator"
            />
          </>
        )}
      </ChatViewport>

      {/* Message Composer */}
      <MessageComposer
        onSend={handleSend}
        placeholder={`Ask me anything about ${currentExpert.label.toLowerCase()}...`}
        disabled={isLoading}
        onInputChange={agentHooks.handleInputChange}
        data-agent-hook="message-composer"
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        reasoningEffort={reasoningEffort}
        verbosity={verbosity}
        onReasoningEffortChange={(value) => handleSettingsChange(value, verbosity)}
        onVerbosityChange={(value) => handleSettingsChange(reasoningEffort, value)}
      />
    </ChatLayout>
  );
}
