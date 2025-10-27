# GPT-5 Migration Guide

This document explains the migration from GPT-4o to GPT-5, including all changes, new features, and best practices.

## Overview

The AI Expert Wrapper has been upgraded from GPT-4o to **GPT-5**, OpenAI's most advanced model with significantly improved reasoning, instruction-following, and coding capabilities.

## What Changed

### 1. Model Upgrade

**Before (GPT-4o):**
```typescript
model: openai('gpt-4o')
```

**After (GPT-5):**
```typescript
model: openai('gpt-5'),
experimental_providerMetadata: {
  openai: {
    reasoning_effort: 'medium',
    verbosity: 'medium',
  }
}
```

### 2. New Parameters

GPT-5 introduces two new configurable parameters:

#### Reasoning Effort
Controls how deeply the model thinks before responding:

| Level | Description | Use Case |
|-------|-------------|----------|
| **minimal** | Fastest responses | Quick questions, simple tasks |
| **low** | Quick reasoning | Straightforward problems |
| **medium** | Balanced (default) | Most expert conversations |
| **high** | Deep reasoning | Complex, multi-step problems |

#### Verbosity
Controls the length and detail of responses:

| Level | Description | Use Case |
|-------|-------------|----------|
| **low** | Concise, brief | Quick answers, summaries |
| **medium** | Standard (default) | Balanced explanations |
| **high** | Thorough | Detailed guides, extensive context |

### 3. Removed Parameters

The following parameters are **incompatible with GPT-5** and have been removed:

- ❌ `temperature` 
- ❌ `top_p`
- ❌ `logprobs`

GPT-5 uses reasoning effort and verbosity instead for controlling output behavior.

### 4. Expanded Expert System

**Before:** 1 expert (Marketing Strategist)

**After:** 5 experts with GPT-5 optimized prompts:
- 🎨 **UX/UI Designer** - User experience, visual design, accessibility
- 📊 **Business Analyst** - Requirements, process optimization, strategy
- ✍️ **Content Writer** - Copywriting, SEO, storytelling
- 🚀 **Product Manager** - Product strategy, roadmaps, prioritization
- 📈 **Marketing Strategist** - Digital marketing, growth, brand strategy

Each expert has structured prompts following OpenAI's GPT-5 best practices:
- Clear, non-contradictory instructions
- XML-style tags for organization
- Explicit markdown formatting directives
- Role, expertise, approach, and constraints clearly defined

## API Changes

### Request Body Structure

**Before:**
```json
{
  "messages": [...],
  "expertType": "marketer"
}
```

**After:**
```json
{
  "messages": [...],
  "expertType": "marketer",
  "reasoningEffort": "medium",
  "verbosity": "medium"
}
```

### Error Handling

GPT-5 has specific error messages:
- Model access errors (if API key lacks GPT-5 access)
- Parameter validation errors
- Enhanced error details for debugging

## Performance Comparison

### GPT-4o vs GPT-5

| Metric | GPT-4o | GPT-5 |
|--------|--------|-------|
| **Reasoning** | Good | Excellent |
| **Instruction Following** | Good | Exceptional ("surgical precision") |
| **Code Generation** | Good | Best-in-class |
| **Long Context** | 128K tokens | 128K tokens |
| **Speed (minimal)** | N/A | Very fast |
| **Speed (medium)** | Standard | Comparable |
| **Speed (high)** | N/A | Slower (more thinking) |

## Prompt Engineering Changes

### GPT-5 Best Practices

1. **No Contradictory Instructions**
   - GPT-5 will struggle with conflicting directives
   - Review prompts carefully for consistency

2. **Structured Prompts**
   - Use XML-style tags: `<role>`, `<expertise>`, `<approach>`
   - Clear sections improve instruction adherence

3. **Explicit Markdown Instructions**
   - Tell GPT-5 to use Markdown formatting
   - Specify when to use code blocks, lists, etc.

4. **Clear Stop Conditions**
   - Define when tasks are complete
   - Be explicit about expected outputs

### Example: Marketing Expert Prompt

```text
<role>
You are a senior Marketing Strategist with 15+ years of experience...
</role>

<expertise>
- Digital marketing strategy (paid, organic, social)
- Customer acquisition and retention strategies
- Brand positioning and messaging
...
</expertise>

<approach>
- Start with business goals and target audience
- Use data and analytics to inform strategy
...
</approach>

<output_format>
- Use Markdown where semantically correct
- Use backticks for marketing terms, platforms, and metrics
- Be direct, practical, and action-oriented
</output_format>

<constraints>
- Focus on ROI and business impact
- Provide actionable, data-driven recommendations
...
</constraints>
```

## Cost Implications

### Token Usage

GPT-5 pricing varies by reasoning effort:
- **Minimal/Low**: Fewer tokens, lower cost
- **Medium**: Standard cost (recommended default)
- **High**: More tokens due to deeper reasoning

**Tip**: Use medium reasoning for most tasks, only increase to high when needed.

### Optimization Strategies

1. **Start with medium** reasoning and adjust based on task complexity
2. **Use low verbosity** for simple queries to save tokens
3. **Monitor token usage** through your OpenAI dashboard
4. **Cache conversations** - GPT-5 supports prompt caching

## Breaking Changes

### For Developers

1. **Import New Types**
   ```typescript
   import type { ReasoningEffort, Verbosity } from '@/app/lib/types';
   ```

2. **Update API Calls**
   - Add `reasoningEffort` and `verbosity` to requests
   - Remove `temperature`, `top_p`, `logprobs`

3. **Update Expert Types**
   ```typescript
   // Old
   type ExpertType = 'marketer';
   
   // New
   type ExpertType = 'designer' | 'analyst' | 'writer' | 'product-manager' | 'marketer';
   ```

4. **Update Prompts**
   - Follow new structured format
   - Add markdown formatting instructions
   - Remove contradictory instructions

### For Users

- **Settings Panel**: New UI for controlling reasoning effort and verbosity
- **Expert Selection**: 5 experts instead of 1
- **Preferences**: Settings saved to localStorage
- **Better Responses**: More intelligent and instruction-following

## Migration Checklist

- [x] Update model from `gpt-4o` to `gpt-5`
- [x] Add `reasoning_effort` and `verbosity` parameters
- [x] Remove incompatible parameters
- [x] Create 5 expert prompts with GPT-5 optimization
- [x] Add settings panel UI
- [x] Implement localStorage persistence
- [x] Update error handling
- [x] Create configuration system
- [x] Add TypeScript types
- [x] Update documentation

## Testing Recommendations

### Functional Tests

1. **Test each expert** with various queries
2. **Test all reasoning levels** (minimal, low, medium, high)
3. **Test all verbosity levels** (low, medium, high)
4. **Verify settings persistence** (reload page)
5. **Test error scenarios** (API errors, invalid parameters)

### Quality Tests

1. **Compare responses** between different reasoning efforts
2. **Verify markdown rendering** (code blocks, lists, tables)
3. **Check instruction adherence** (format, style, constraints)
4. **Test edge cases** (very long conversations, quick switches)

## Resources

- [OpenAI GPT-5 Documentation](https://platform.openai.com/docs/guides/latest-model)
- [GPT-5 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
- [API Reference](https://platform.openai.com/docs/api-reference)

## Troubleshooting

### "GPT-5 model access error"

**Cause**: Your API key doesn't have GPT-5 access.

**Solution**:
1. Check your OpenAI account tier
2. Ensure GPT-5 is available for your account
3. Verify your API key is correct in `.env.local`

### Responses are too verbose

**Solution**:
1. Open Settings (gear icon)
2. Set Verbosity to "Low"
3. Or adjust in expert-specific prompts

### Responses are too slow

**Solution**:
1. Open Settings
2. Set Reasoning Effort to "Low" or "Minimal"
3. Use for simpler queries

### Settings not persisting

**Solution**:
1. Check browser localStorage is enabled
2. Clear browser cache and reload
3. Try different browser

## Future Enhancements

Potential upgrades leveraging GPT-5 capabilities:

- **Tool calling**: Add function calling for data retrieval
- **Responses API**: Migrate to Responses API for multi-turn reasoning
- **Custom tools**: Add domain-specific tools for experts
- **Streaming reasoning**: Show reasoning process in real-time
- **Model variants**: Support gpt-5-mini and gpt-5-nano

---

**Last Updated**: Migration completed October 2025

