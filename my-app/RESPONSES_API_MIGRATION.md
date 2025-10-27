# Responses API Migration - Conversation State Management

## Overview

This document details the migration from OpenAI's Chat Completions API to the Responses API for implementing conversation state management using `previous_response_id` chaining.

## What Was Changed

### 1. API Migration (Chat Completions → Responses API)

**Before:**
```typescript
const completion = await client.chat.completions.create({
  model: 'gpt-5',
  messages: formattedMessages,
  reasoning_effort: reasoningEffort,
  verbosity: verbosity,
});
```

**After:**
```typescript
const response = await client.responses.create({
  model: 'gpt-5',
  input: input,
  store: true, // Required for response chaining
  reasoning: {
    effort: reasoningEffort
  },
  text: {
    verbosity: verbosity
  },
  previous_response_id: previous_response_id, // Optional for chaining
});
```

### 2. Message Interface Updates

Added `responseId` field to track OpenAI response IDs:

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  responseId?: string; // NEW: OpenAI response ID for chaining
}
```

### 3. Chat Request Interface Updates

Added `previous_response_id` parameter:

```typescript
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
```

### 4. Conversation State Management Logic

**Key Changes in `useStreamingChat.ts`:**

- **Find last assistant message with responseId:**
```typescript
const lastAssistantMessage = messages
  .filter(m => m.role === 'assistant' && m.responseId)
  .pop();
```

- **Send only current message (not full history):**
```typescript
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
```

- **Store response ID for chaining:**
```typescript
if (data.responseId) {
  setMessages(prev => 
    prev.map(msg => 
      msg.id === assistantMessage.id 
        ? { ...msg, responseId: data.responseId }
        : msg
    )
  );
}
```

## How Conversation State Management Works

### 1. Initial Message
- User sends first message
- API call made without `previous_response_id`
- OpenAI returns response with unique `id`
- Response ID stored in assistant message

### 2. Follow-up Messages
- User sends subsequent message
- System finds last assistant message with `responseId`
- API call includes `previous_response_id` from last response
- OpenAI maintains full conversation context via response chain
- New response ID stored for next turn

### 3. Conversation Reset
- When `clearMessages()` is called, all messages (including response IDs) are cleared
- Next message starts fresh without `previous_response_id`

## Benefits

1. **Reduced Token Usage**: Only current message sent instead of full conversation history
2. **Simplified State Management**: OpenAI manages conversation context server-side
3. **Automatic Context Retention**: Model has access to full conversation via response chain
4. **30-day Response Retention**: Responses stored by OpenAI for 30 days by default
5. **Better Performance**: Smaller request payloads and faster processing

## API Parameter Changes

### Responses API Parameter Structure

The Responses API uses a different parameter structure than Chat Completions:

| Chat Completions | Responses API |
|------------------|---------------|
| `reasoning_effort` | `reasoning.effort` |
| `verbosity` | `text.verbosity` |
| `messages` | `input` |
| `choices[0].message.content` | `output_text` |

### Required Parameters

- `store: true` - Required for response chaining
- `previous_response_id` - Optional, used for conversation continuity

## Testing Results

### ✅ Multi-turn Conversation Context
- **Test**: Sent joke, then asked for explanation
- **Result**: AI successfully referenced previous joke and explained why it works
- **Verification**: Context maintained across turns without sending full message history

### ✅ Response ID Chaining
- **Test**: Verified network requests include `previous_response_id`
- **Result**: Subsequent requests properly chain responses
- **Verification**: Each assistant message stores response ID for next turn

### ✅ Conversation Reset
- **Test**: Clear messages and start new conversation
- **Result**: New conversation starts fresh without `previous_response_id`
- **Verification**: No context carried over from previous conversation

### ✅ Network Efficiency
- **Test**: Compared request payloads before/after
- **Result**: Only current message sent instead of full history
- **Verification**: Reduced token usage and faster API calls

## Code Examples

### API Route Implementation

```typescript
// Extract previous_response_id from request
const { messages, previous_response_id, reasoningEffort, verbosity } = body;

// Prepare request parameters
const requestParams: any = {
  model: 'gpt-5',
  input: input,
  store: true,
  reasoning: { effort: reasoningEffort },
  text: { verbosity: verbosity },
};

// Add previous_response_id if provided
if (previous_response_id) {
  requestParams.previous_response_id = previous_response_id;
}

const response = await client.responses.create(requestParams);

// Return response text and ID
return NextResponse.json({ 
  text: response.output_text,
  role: 'assistant',
  responseId: response.id
});
```

### Client-side State Management

```typescript
// Find last assistant message with responseId
const lastAssistantMessage = messages
  .filter(m => m.role === 'assistant' && m.responseId)
  .pop();

// Send only current message with previous_response_id
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    messages: [userMessage],
    previous_response_id: lastAssistantMessage?.responseId,
    expertType,
    reasoningEffort,
    verbosity,
  }),
});

// Store response ID for chaining
if (data.responseId) {
  setMessages(prev => 
    prev.map(msg => 
      msg.id === assistantMessage.id 
        ? { ...msg, responseId: data.responseId }
        : msg
    )
  );
}
```

## Trade-offs

### Advantages
- Reduced token usage and costs
- Simplified client-side state management
- Better performance with smaller payloads
- Automatic context management by OpenAI

### Considerations
- Dependency on OpenAI's response storage (30-day TTL)
- Requires Responses API access (newer API)
- Different parameter structure than Chat Completions
- Response IDs must be tracked client-side

## Migration Checklist

- [x] Update Message interface with `responseId` field
- [x] Update ChatRequest interface with `previous_response_id` parameter
- [x] Migrate API route from Chat Completions to Responses API
- [x] Update parameter structure (`reasoning.effort`, `text.verbosity`)
- [x] Implement response ID tracking in chat hook
- [x] Update conversation state management logic
- [x] Test multi-turn conversation context
- [x] Verify response ID chaining
- [x] Test conversation reset functionality
- [x] Document changes and implementation

## Conclusion

The migration to the Responses API with `previous_response_id` chaining successfully implements conversation state management while reducing token usage and simplifying client-side state management. The implementation maintains full conversation context across turns while only sending the current message in each request.

The testing confirms that:
- Multi-turn conversations maintain context properly
- Response IDs are correctly chained
- Conversation reset works as expected
- Network efficiency is improved

This approach provides a robust foundation for conversation state management in the AI Expert Wrapper application.
