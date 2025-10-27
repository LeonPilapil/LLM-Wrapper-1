import type { ConfigOption, ReasoningEffort, Verbosity, TokenLimits } from './types';

/**
 * GPT-5 Configuration
 * Following OpenAI's best practices and recommendations
 */
export const GPT5_CONFIG = {
  // Model selection
  model: 'gpt-5',
  
  // Default settings
  defaultReasoningEffort: 'medium' as ReasoningEffort,
  defaultVerbosity: 'medium' as Verbosity,
  defaultExpert: 'marketer',
  
  // Token limits
  maxOutputTokens: 16000,
  
  // Dynamic token limits based on conversation mode and verbosity
  TOKEN_LIMITS: {
    quick: {
      low: 800,
      medium: 1200,
      high: 1800,
    },
    detailed: {
      low: 1500,
      medium: 2500,
      high: 3500,
    },
    followup: {
      low: 400,
      medium: 600,
      high: 800,
    },
  } as TokenLimits,
  
  // Streaming options
  streamOptions: {
    includeUsage: true,
  },
  
  // Reasoning effort options with descriptions
  reasoningEffortOptions: [
    {
      value: 'minimal' as ReasoningEffort,
      label: 'Minimal',
      description: 'Fastest responses, best for simple queries and quick answers',
    },
    {
      value: 'low' as ReasoningEffort,
      label: 'Low',
      description: 'Quick reasoning, good for straightforward tasks',
    },
    {
      value: 'medium' as ReasoningEffort,
      label: 'Medium',
      description: 'Balanced performance - recommended for most expert conversations',
    },
    {
      value: 'high' as ReasoningEffort,
      label: 'High',
      description: 'Deep reasoning for complex, multi-step problems',
    },
  ] as ConfigOption<ReasoningEffort>[],
  
  // Verbosity options with descriptions
  verbosityOptions: [
    {
      value: 'low' as Verbosity,
      label: 'Low',
      description: 'Concise, brief responses with essential information',
    },
    {
      value: 'medium' as Verbosity,
      label: 'Medium',
      description: 'Standard detail level with balanced explanations',
    },
    {
      value: 'high' as Verbosity,
      label: 'High',
      description: 'Thorough explanations with examples and detailed context',
    },
  ] as ConfigOption<Verbosity>[],
} as const;

// Local storage keys for user preferences
export const STORAGE_KEYS = {
  REASONING_EFFORT: 'gpt5_reasoning_effort',
  VERBOSITY: 'gpt5_verbosity',
  EXPERT_TYPE: 'expert_type',
} as const;

