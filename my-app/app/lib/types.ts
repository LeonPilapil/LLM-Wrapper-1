/**
 * Type definitions for GPT-5 and expert system
 */

// GPT-5 reasoning effort levels
export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';

// GPT-5 verbosity levels
export type Verbosity = 'low' | 'medium' | 'high';

// Conversation mode tracking
export type ConversationMode = 'initial' | 'followup';

// Expert types available in the system
export type ExpertType = 'marketer';

// GPT-5 configuration settings
export interface GPT5Settings {
  reasoningEffort: ReasoningEffort;
  verbosity: Verbosity;
}

// Chat request structure
export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  expertType: ExpertType;
  reasoningEffort?: ReasoningEffort;
  verbosity?: Verbosity;
  previous_response_id?: string; // NEW: OpenAI response ID for conversation chaining
}

// Configuration option structure
export interface ConfigOption<T> {
  value: T;
  label: string;
  description: string;
}

// Token limits configuration
export interface TokenLimits {
  quick: {
    low: number;
    medium: number;
    high: number;
  };
  detailed: {
    low: number;
    medium: number;
    high: number;
  };
  followup: {
    low: number;
    medium: number;
    high: number;
  };
}

