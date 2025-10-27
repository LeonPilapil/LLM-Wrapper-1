import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getExpertPrompt, type ExpertType } from '@/app/lib/prompts';
import { GPT5_CONFIG } from '@/app/lib/config';
import type { Verbosity, ConversationMode } from '@/app/lib/types';

// GPT-5 parameter types
type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';

// Initialize OpenAI client with API key from environment
const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY! 
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    // Extract messages and GPT-5 settings from request body
    const {
      messages,
      previous_response_id,
      reasoningEffort = 'low',
      verbosity = 'medium',
      conversationMode = 'initial' as ConversationMode
    } = body;

    // Validation
    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages:', messages);
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Validate GPT-5 parameters
    const validReasoningEfforts: ReasoningEffort[] = ['minimal', 'low', 'medium', 'high'];
    const validVerbosities: Verbosity[] = ['low', 'medium', 'high'];
    
    if (!validReasoningEfforts.includes(reasoningEffort)) {
      return NextResponse.json(
        { error: `Invalid reasoning_effort. Must be one of: ${validReasoningEfforts.join(', ')}` },
        { status: 400 }
      );
    }
    
    if (!validVerbosities.includes(verbosity)) {
      return NextResponse.json(
        { error: `Invalid verbosity. Must be one of: ${validVerbosities.join(', ')}` },
        { status: 400 }
      );
    }

    // Get the expert prompt based on the selected expert type
    const systemPrompt = getExpertPrompt('marketer');
    console.log('Using marketer expert');
    console.log('GPT-5 settings - Reasoning:', reasoningEffort, 'Verbosity:', verbosity);
    console.log('Conversation mode:', conversationMode);
    console.log('System prompt:', systemPrompt.substring(0, 100) + '...');
    
    // Calculate max_completion_tokens based on conversation mode and verbosity
    const getMaxCompletionTokens = (
      mode: ConversationMode,
      verbosity: Verbosity
    ): number => {
      if (mode === 'followup') {
        return GPT5_CONFIG.TOKEN_LIMITS.followup[verbosity];
      }
      // For initial messages, detect if it's detailed mode based on user's question
      const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      const isDetailedMode = userMessage.includes('step-by-step') || 
                            userMessage.includes('detailed') || 
                            userMessage.includes('plan') ||
                            userMessage.includes('guide');
      
      if (isDetailedMode) {
        return GPT5_CONFIG.TOKEN_LIMITS.detailed[verbosity];
      }
      return GPT5_CONFIG.TOKEN_LIMITS.quick[verbosity];
    };
    
    const maxCompletionTokens = getMaxCompletionTokens(conversationMode, verbosity);
    console.log('Max completion tokens:', maxCompletionTokens);

    // Call GPT-5 using OpenAI SDK's Responses API
    console.log('Calling OpenAI GPT-5 Responses API');
    
    // Format input for Responses API
    const input = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'system' as const, content: 'IMPORTANT: You MUST format your entire response in Markdown format for proper rendering.' },
      ...messages.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];
    
    // Prepare request parameters for Responses API
    const requestParams: any = {
      model: 'gpt-5',
      input: input,
      store: true, // Required for response chaining
      // GPT-5 parameters with correct Responses API format
      // @ts-ignore - These parameters may not be in SDK types yet
      reasoning: {
        effort: reasoningEffort
      },
      // @ts-ignore
      text: {
        verbosity: verbosity
      },
      // @ts-ignore - Token limit parameter
      max_completion_tokens: maxCompletionTokens,
    };

    // Add previous_response_id if provided
    if (previous_response_id) {
      requestParams.previous_response_id = previous_response_id;
      console.log('Using previous_response_id:', previous_response_id);
    }

    const response = await client.responses.create(requestParams);

    console.log('GPT-5 Response received');
    
    // Return the response text and ID
    const responseText = response.output_text || 'No response generated';
    return NextResponse.json({ 
      text: responseText,
      role: 'assistant',
      responseId: response.id
    });
    
  } catch (error) {
    console.error('API Route Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Enhanced error handling for GPT-5 specific errors
    let errorMessage = 'Internal server error';
    let errorDetails = error instanceof Error ? error.message : 'Unknown error';
    
    if (error instanceof Error) {
      // Check for GPT-5 specific errors
      if (error.message.includes('model') && error.message.includes('gpt-5')) {
        errorMessage = 'GPT-5 model access error';
        errorDetails = 'Unable to access GPT-5. Please check your API key has GPT-5 access.';
      } else if (error.message.includes('reasoning_effort') || error.message.includes('verbosity')) {
        errorMessage = 'Invalid GPT-5 parameter';
        errorDetails = error.message;
      } else if (error.message.includes('API key')) {
        errorMessage = 'API key error';
        errorDetails = 'Please ensure OPENAI_API_KEY is set in your .env.local file';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

